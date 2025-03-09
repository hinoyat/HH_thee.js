import React, { useState } from 'react';
import DiaryForm from './DiaryForm';
import DiaryDetail from './DiaryDetail';

/**
 * 사용자 컨트롤 UI를 모아둔 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onAddEntry - 일기 추가 시 실행될 함수
 * @param {Function} props.onDeleteEntry - 일기 삭제 시 실행될 함수
 * @param {Object} props.selectedEntry - 현재 선택된 일기 항목
 * @param {Function} props.onClearSelection - 선택 해제 시 실행될 함수
 * @param {Function} props.onZoomIn - 확대 함수
 * @param {Function} props.onZoomOut - 축소 함수
 */
const Controls = ({
  onAddEntry,
  onDeleteEntry,
  selectedEntry,
  onClearSelection,
  onZoomIn,
  onZoomOut
}) => {
  // 폼 표시 여부 상태
  const [showForm, setShowForm] = useState(false);
  
  /**
   * 일기 작성 폼 제출 핸들러
   * @param {string} content - 일기 내용
   */
  const handleFormSubmit = (content) => {
    onAddEntry(content);
    setShowForm(false); // 폼 숨기기
  };
  
  /**
   * 일기 삭제 핸들러
   * @param {string} id - 삭제할 일기의 ID
   */
  const handleDeleteEntry = (id) => {
    onDeleteEntry(id);
    onClearSelection(); // 선택 해제
  };
  
  return (
    <div className="controls-container">
      {/* 일기 작성 버튼 */}
      <button
        className="create-diary-button"
        onClick={() => setShowForm(true)}
      >
        새 일기 작성하기
      </button>
      
      {/* 확대/축소 컨트롤 */}
      <div className="zoom-controls">
        <button 
          className="zoom-button zoom-in" 
          onClick={onZoomIn}
          title="확대"
        >
          +
        </button>
        <button 
          className="zoom-button zoom-out" 
          onClick={onZoomOut}
          title="축소"
        >
          -
        </button>
      </div>
      
      {/* 일기 작성 폼 (조건부 렌더링) */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <DiaryForm onSubmit={handleFormSubmit} />
            <button
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}
      
      {/* 선택된 일기 상세 정보 (조건부 렌더링) */}
      {selectedEntry && (
        <div className="detail-overlay">
          <DiaryDetail
            entry={selectedEntry}
            onClose={onClearSelection}
            onDelete={handleDeleteEntry}
          />
        </div>
      )}
    </div>
  );
};

export default Controls;