import React, { useState } from 'react';
import Star from './Star';

/**
 * 여러 일기 항목(별)들을 관리하는 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.entries - 일기 항목 배열
 * @param {Function} props.onSelectEntry - 별을 클릭했을 때 실행될 함수
 */
const Stars = ({ entries, onSelectEntry }) => {
  // 선택된 일기 항목
  const [selectedEntry, setSelectedEntry] = useState(null);
  
  /**
   * 별 클릭 핸들러
   * @param {Object} entry - 클릭된 일기 항목
   */
  const handleStarClick = (entry) => {
    setSelectedEntry(entry);
    if (onSelectEntry) {
      onSelectEntry(entry);
    }
  };
  
  return (
    <group>
      {/* 모든 일기 항목을 별로 렌더링 */}
      {entries.map((entry) => (
        <Star
          key={entry.id}
          entry={entry}
          onClick={handleStarClick}
          isSelected={selectedEntry?.id === entry.id}
        />
      ))}
    </group>
  );
};

export default Stars;