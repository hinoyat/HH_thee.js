import React from 'react';

/**
 * 선택된 일기의 상세 내용을 보여주는 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.entry - 선택된 일기 항목
 * @param {Function} props.onClose - 닫기 버튼 클릭 시 실행될 함수
 * @param {Function} props.onDelete - 삭제 버튼 클릭 시 실행될 함수
 */
const DiaryDetail = ({ entry, onClose, onDelete }) => {
  // 선택된 일기가 없으면 아무것도 렌더링하지 않음
  if (!entry) return null;
  
  return (
    <div className="diary-detail">
      <div className="diary-detail-header">
        <h2>일기 상세</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="diary-detail-content">
        <div className="diary-date">
          <span>작성일: {entry.date.toLocaleDateString()}</span>
        </div>
        
        <div className="diary-position">
          <span>위치: ({entry.position.x.toFixed(2)}, {entry.position.y.toFixed(2)}, {entry.position.z.toFixed(2)})</span>
        </div>
        
        <div className="diary-text">
          <p>{entry.content}</p>
        </div>
      </div>
      
      <div className="diary-detail-footer">
        <button
          className="delete-button"
          onClick={() => onDelete(entry.id)}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DiaryDetail;