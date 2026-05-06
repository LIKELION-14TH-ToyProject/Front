// 일기 CRUD 관련 로직을 담당하는 커스텀 훅!!!! 을 만들어보자...
// 일단 임시로 localStorage를 임시 데이터베이스로 사용할까?
// 실제 API 연동 시 fetch 교체하면 될 듯!!!! ㅜ.ㅜ

import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ROUTES from "../Routes";

// ─── localStorage 관련 함수 로직 >.<
// 저장된 모든 일기 가져오기
function getDiariesFromStorage() {
  const data = localStorage.getItem("diaries");
  return data ? JSON.parse(data) : [];
}

// 일기 배열 객체 localStorage에 저장하기
function saveDiariesToStorage(diaries) {
  localStorage.setItem("diaries", JSON.stringify(diaries));
}

// ─── 1-1. 일기 목록 훅
export function useDiaryList() {
  const [diaries, setDiaries] = useState([]); // 컴포넌트가 마운트될 때 localStorage에서 일기 목록을 불러옴

  useEffect(() => {
    // api 연동하면 바꿀 것!!!
    const stored = getDiariesFromStorage(); // 최신 글이 위로 오도록 내림차순!
    setDiaries([...stored].reverse());
  }, []); //빈 배열이니까 처음 1번 실행됨

  return { diaries };
}

// ─── 1-1-1. 태그 필터 훅 .....하 죽겠다 ㅠ.ㅠ
// 전체 태그 보여주고! 다이어리 선택하고! -> 마운팅 관련 에러 나서 list로 넘김
export function useDiaryFilter(diaries, selectedTags) {
  const allTags = [...new Set(diaries.flatMap((d) => d.tags || []))];

  const filteredDiaries =
    selectedTags.length === 0
      ? diaries
      : diaries.filter((d) =>
          selectedTags.every((tag) => (d.tags || []).includes(tag)),
        );

  return { allTags, filteredDiaries };
}

// ─── 1-2. 일기 작성 훅
export function useDiaryWrite() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null); // 업로드한 이미지 파일 객체
  const [imagePreview, setImagePreview] = useState(""); // 미리보기용 URL
  const [tags, setTags] = useState([]); // 태그 배열
  const [content, setContent] = useState(""); // 본문 텍스트
  const [isLoading, setIsLoading] = useState(false); // 등록 중이면, 버튼 비활성화!

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 임시: localStorage에 저장, 나중에 api 연동 시 수정
      const newDiary = {
        id: Date.now().toString(), // 임시 고유 ID? key?
        date: new Date().toLocaleDateString("ko-KR"), // 오늘 날짜
        tags,
        content,
        imageUrl: imagePreview, // 임시로 base64 URL 저장
      };

      const existing = getDiariesFromStorage();
      saveDiariesToStorage([...existing, newDiary]);
      navigate(ROUTES.DIARY_LIST);
    } catch (err) {
      console.error("일기 등록 실패:", err);
    } finally {
      setIsLoading(false);
    }
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
  const { id } = useParams(); // URL에서 :id 가져오기
  const navigate = useNavigate();

  const [diary, setDiary] = useState(null); // 현재 상세 일기 데이터, 마운트 시에 일기 불러옴

  useEffect(() => {
    // api 연동 시 바꾸기~
    const stored = getDiariesFromStorage();
    const found = stored.find((d) => String(d.id) === String(id));
    setDiary(found || null);
  }, [id]);

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

  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 버튼 클릭 -> 확인 모달 열기

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // api 연동 시에 바꾸기!!
    const stored = getDiariesFromStorage();
    const updated = stored.filter((d) => d.id !== diaryId);
    saveDiariesToStorage(updated);

    setIsModalOpen(false);

    navigate(ROUTES.DIARY_LIST); // 삭제 후에 목록으로 이동
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

  const location = useLocation(); // 추가
  const editDiary = location.state?.editDiary; // 추가
  const id = editDiary?.id;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 수정 모드 위해 내용 setting
  const initWithExistingData = (diary) => {
    setImagePreview(diary.imageUrl || "");
    setTags(diary.tags || []);
    setContent(diary.content || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // id가 없으면 수정 불가 - 경로 오류 해결/ 작성모드랑 같이 쓰니까
    if (!id) {
      console.error("수정할 일기를 찾을 수 없습니다 ㅠ.ㅠ");
      return;
    }

    setIsLoading(true);

    try {
      // api 연동하면 바꿔야 해요~~
      const stored = getDiariesFromStorage();
      const updated = stored.map((d) =>
        d.id === id ? { ...d, tags, content, imageUrl: imagePreview } : d,
      ); //map으로 update 돌리기
      saveDiariesToStorage(updated); // 수정 완료 후 상세 페이지로 돌아감
      navigate(ROUTES.DIARY_DETAIL.replace(":id", id));
    } catch (err) {
      console.error("일기 수정 실패:", err);
    } finally {
      setIsLoading(false);
    }
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

// 이거 하느라 머리 쥐어뜯음 ㅠ.ㅠ 울지말자
