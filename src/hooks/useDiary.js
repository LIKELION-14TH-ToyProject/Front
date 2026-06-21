// 일기 CRUD 관련 로직을 담당하는 커스텀 훅!!!! 을 만들어보자...

import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ROUTES from "../Routes";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../api";

const diaryKeys = {
  // 쿼리 키 관리는...한번에 하는 게 좋다고 함!
  all: ["diaries"], // 목록 쿼리 키
  detail: (id) => ["diaries", id], // 상세 쿼리 키 (id별로 캐시 분리~.~)
};

// ─── 1-1. 일기 목록 훅
export function useDiaryList() {
  // 로딩/에러/데이터 상태를 useQuery로 리팩토링
  const {
    data: diaries = [],
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: diaryKeys.all,
    queryFn: async () => {
      // GET diary
      const response = await api.get("/diary/");
      return [...response.data].reverse(); // 최신순!
    },
  });

  const error = queryError ? "일기를 불러오지 못했습니다." : null;

  return { diaries, error, isLoading };
}

// ─── 1-1-1. 태그 필터 훅 .....하 죽겠다 ㅠ.ㅠ
// 전체 태그 보여주고! 다이어리 선택하고! -> 마운팅 관련 에러 나서 list로 넘김
export function useDiaryFilter(diaries, selectedTags) {
  const allTags = [...new Set(diaries.flatMap((d) => d.tag_list || []))];

  const filteredDiaries =
    selectedTags.length === 0
      ? diaries
      : diaries.filter((d) =>
          selectedTags.every((tag) => (d.tag_list || []).includes(tag)),
        );

  return { allTags, filteredDiaries };
}

// ─── 1-2. 일기 작성 훅
export function useDiaryWrite() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // 등록 성공 후 목록 캐시 정리용

  const [imageFile, setImageFile] = useState(null); // 업로드한 이미지 파일 객체
  const [imagePreview, setImagePreview] = useState(""); // 미리보기용 URL
  const [tags, setTags] = useState([]); // 태그 배열
  const [content, setContent] = useState(""); // 본문 텍스트

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //input event!, 파일 집어오기
    if (!file) return;

    setImageFile(file); // FileReader로 미리보기 URL 생성
    const reader = new FileReader();
    reader.onload = (event) => {
      // 파일 정상 업로드 시 실행되는 이벤트
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  }; //

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // POST diary useMutation으로 리팩토링
  const { mutate: createDiary, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", content.slice(0, 50)); // body 앞 50자 정도? title로 사용
      formData.append("body", content); // 본문 전체
      formData.append("language", 1); // 한국어 고정값으로 일단
      tags.forEach((tag) => formData.append("tag_names", tag)); // 태그 배열
      if (imageFile) formData.append("photo", imageFile); // 이미지 파일

      return api.post("/diary/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      // 일기 목록 캐시를 최신 반영 가능
      queryClient.invalidateQueries({ queryKey: diaryKeys.all });
      navigate(ROUTES.DIARY_LIST);
    },
    onError: (err) => {
      console.error("일기 등록 실패:", err);
      alert(err.response?.data?.message || "일기 등록에 실패했습니다.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createDiary();
  };

  return {
    imageFile,
    imagePreview,
    tags,
    setTags,
    content,
    setContent,
    handleImageChange,
    removeImage,
    handleSubmit,
    isLoading,
    initWithExistingData: undefined, // 작성 모드에선 초기화 함수 필요 없으니까
  };
}

// ─── 1-3. 일기 상세 훅
export function useDiaryDetail() {
  const { id } = useParams(); // URL에서 :id 가져오기 -pk
  const navigate = useNavigate();

  // fetch 과정 useQuery로 대체
  const { data: diary = null } = useQuery({
    queryKey: diaryKeys.detail(id),
    queryFn: async () => {
      // get- /diary/<int:pk>
      const response = await api.get(`/diary/${id}/`);
      return response.data;
    },
    enabled: !!id, // id 없으면 요청 자체 안 보내게 ㅠ 오류 방지
  });

  const handleEdit = () => {
    navigate(ROUTES.DIARY_WRITE, { state: { editDiary: diary } }); // 페이지 이동 시 파라미터 전달
  };

  return {
    diary,
    handleEdit,
  };
}

// ─── 1-3-3. 일기 삭제 훅
export function useDiaryDelete(diaryId) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 버튼 클릭 -> 확인 모달 열기

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Delete diary - useMutation으로 변경
  const { mutate: deleteDiary } = useMutation({
    mutationFn: async () => {
      return api.delete(`/diary/${diaryId}/`);
    },
    onError: (err) => {
      console.error("일기 삭제 실패:", err);
      alert(err.response?.data?.message || "일기 삭제에 실패했습니다.");
    },
  });

  const handleConfirmDelete = (onSuccess) => {
    deleteDiary(undefined, {
      onSuccess: () => {
        // 목록 캐시 무효화,,, 삭제된 상세 캐시도 제거
        queryClient.invalidateQueries({ queryKey: diaryKeys.all });
        queryClient.removeQueries({ queryKey: diaryKeys.detail(diaryId) });
        onSuccess?.();
      },
    });
  };

  return {
    isModalOpen,
    handleDeleteClick,
    handleCancel,
    handleConfirmDelete,
  };
}

// ─── 1-2. 일기 수정 훅 (상세페이지에서 수정 버튼 클릭 시 작성 페이지 재활용)
export function useDiaryEdit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation(); // 추가
  const editDiary = location.state?.editDiary; // 추가
  const id = editDiary?.id;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  // 수정 모드 위해 내용 setting
  const initWithExistingData = (diary) => {
    setContent(diary.body || "");
    setTags(diary.tag_list || []);
    setImagePreview(diary.photo || "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // PUT diary - useMutation 리팩토링
  const { mutate: editDiaryMutate, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", content.slice(0, 50));
      formData.append("body", content);
      formData.append("language", 1);
      tags.forEach((tag) => formData.append("tag_names", tag));
      if (imageFile) {
        formData.append("photo", imageFile); // 새 이미지로 변경
      } else if (!imagePreview) {
        formData.append("photo", ""); // 이미지 삭제 (빈 값으로 서버에 전달)
      }

      return api.put(`/diary/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      // 목록 캐시랑 해당 상세 캐시 수정 반영
      queryClient.invalidateQueries({ queryKey: diaryKeys.all });
      queryClient.invalidateQueries({ queryKey: diaryKeys.detail(id) });
      navigate(ROUTES.DIARY_DETAIL.replace(":id", id));
    },
    onError: (err) => {
      console.error("일기 수정 실패:", err);
      alert(err.response?.data?.message || "일기 수정에 실패했습니다.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // id가 없으면 수정 불가 - 경로 오류 해결/ 작성모드랑 같이 쓰니까
    if (!id) {
      console.error("수정할 일기를 찾을 수 없습니다 ㅠ.ㅠ");
      return;
    }

    editDiaryMutate();
  };

  return {
    imageFile,
    imagePreview,
    tags,
    setTags,
    content,
    setContent,
    handleImageChange,
    removeImage,
    handleSubmit,
    isLoading,
    initWithExistingData,
  };
}

// 이거 하느라 머리 쥐어뜯음 ㅠ.ㅠ 울지말자 +++
