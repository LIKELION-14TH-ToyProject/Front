const Modal = ({ isOpen, title, onConfirm, onCancel }) => {
    // isOpen이 false면 렌더링 안 되게! 
    if (!isOpen) return null;
   
    return (
      // 배경 어둡게 처리하려면 혹시 모르니까 일단은?? 
      <div>
        <section>
          <h2 id="modal-title">{title}</h2>
          <div>
            <button type="button" onClick={onCancel}>
              취소
            </button>
   
            <button type="button" onClick={onConfirm}>
              삭제
            </button>
          </div>
        </section>
      </div>
    );
  }
   
  export default Modal;