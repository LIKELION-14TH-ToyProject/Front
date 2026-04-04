// 일기 CRUD 관련 로직을 담당하는 커스텀 훅!!!! 을 만들어보자... 
// 일단 임시로 localStorage를 임시 데이터베이스로 사용할까? 
// 실제 API 연동 시 fetch 부분만 교체하면 될 듯!!!! ㅜ.ㅜ

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
  }, []); //빈 배열이니까 처음 1번 실행됨. 

  return { diaries };
}

// ─── 1-2. 일기 작성 훅
export function useDiaryWrite() {
  const navigate = useNavigate(); // 폼 입력값 상태

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
    reader.onload = (event) => { // 파일 정상 업로드 시 실행되는 이벤트
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
      saveDiariesToStorage([...existing, newDiary]); // 등록 완료 후 일기 목록으로 이동

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
    initWithExistingData: undefined,
  };
}

// ─── 1-3. 일기 상세 훅 
export function useDiaryDetail() {
  const { id } = useParams(); // URL에서 :id 가져오기
  const navigate = useNavigate();

  const [diary, setDiary] = useState(null); // 현재 상세 일기 데이터, 마운트 시에 일기 불러옴

  const {diaries} = useDiaryList();

  useEffect(() => {
    // api 연동 시 바꾸기~
    const stored = getDiariesFromStorage();
    const found = stored.find((d) => String(d.id) === String(id));
    setDiary(found || null);
  }, [id]) 

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
  const navigate = useNavigate(); // 삭제 확인 모달 표시 여부

  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 버튼 클릭 -> 확인 모달 열기

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  }; // 모달에서 취소 클릭 → 모달 닫기

  const handleCancel = () => {
    setIsModalOpen(false);
  }; // 모달에서 삭제 확인 클릭

  const handleConfirmDelete = () => {
    // api 연동 시에 바꾸기!! 
    const stored = getDiariesFromStorage();
    const updated = stored.filter((d) => d.id !== diaryId);
    saveDiariesToStorage(updated);

    setIsModalOpen(false); // 삭제 후 목록으로 이동 (토스트는 useToast 훅으로 처리)

    navigate(ROUTES.DIARY_LIST);
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
  const location = useLocation();                          // 추가
  const editDiary = location.state?.editDiary;            // 추가
  const id = editDiary?.id;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 기존 데이터 초기화 (수정 모드일 때 기존 값으로 폼 채우기)

  const initWithExistingData = (diary) => {
    setImagePreview(diary.imageUrl || "");
    setTags(diary.tags || []);
    setContent(diary.content || "");
  }; // 데이터 넣어주기

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