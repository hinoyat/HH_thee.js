import React, { useState } from 'react';

/**
 * 일기 작성 폼 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onSubmit - 폼 제출 시 실행될 함수
 */
const DiaryForm = ({ onSubmit }) => {
  // 일기 내용 상태
  const [content, setContent] = useState('');
  
  /**
   * 폼 제출 핸들러
   * @param {Event} e - 폼 이벤트 객체
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 내용이 비어있지 않은 경우에만 제출
    if (content.trim()) {
      onSubmit(content);
      setContent(''); // 폼 초기화
    }
  };
  
  return (
    <div className="diary-form-container">
      <form onSubmit={handleSubmit} className="diary-form">
        <h2>오늘의 일기 작성하기</h2>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 있었던 일을 별에 담아보세요..."
          rows={5}
          required
        />
        
        <button type="submit" className="submit-button">
          별 만들기
        </button>
      </form>
    </div>
  );
};

export default DiaryForm;