import React, { useState, useRef, createContext } from 'react';
import SpaceScene from './components/Three/SpaceScene';
import Controls from './components/UI/Controls';
import useDiaryEntries from './hooks/useDiaryEntries';

// 카메라 컨트롤용 컨텍스트 생성
export const CameraContext = createContext(null);

/**
 * 애플리케이션의 메인 컴포넌트
 * 모든 컴포넌트를 조합하여 전체 앱을 구성합니다.
 */
const App = () => {
  // 일기 항목 관리 훅 사용
  const { entries, addEntry, removeEntry } = useDiaryEntries();
  
  // 현재 선택된 일기 항목
  const [selectedEntry, setSelectedEntry] = useState(null);
  
  // 카메라 및 컨트롤 관련 상태 및 참조
  const [cameraPosition, setCameraPosition] = useState(30); // 초기 카메라 거리
  const orbitControlsRef = useRef(null);
  
  /**
   * 일기 항목 선택 핸들러
   * @param {Object} entry - 선택된 일기 항목
   */
  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };
  
  /**
   * 선택 해제 핸들러
   */
  const handleClearSelection = () => {
    setSelectedEntry(null);
  };
  
  /**
   * 줌 인 함수
   */
  const handleZoomIn = () => {
    // 줌 인은 카메라를 더 가깝게 이동 (값 감소)
    setCameraPosition(prev => Math.max(prev - 5, 5)); // 최소 5까지
  };
  
  /**
   * 줌 아웃 함수
   */
  const handleZoomOut = () => {
    // 줌 아웃은 카메라를 더 멀리 이동 (값 증가)
    setCameraPosition(prev => Math.min(prev + 5, 200)); // 최대 200까지
  };
  
  return (
    <CameraContext.Provider value={{ 
      distance: cameraPosition, 
      setDistance: setCameraPosition,
      orbitControlsRef
    }}>
      <div className="app">
        {/* 3D 우주 공간 */}
        <SpaceScene
          diaryEntries={entries}
          onSelectEntry={handleSelectEntry}
          cameraDistance={cameraPosition}
          setOrbitControlsRef={(ref) => orbitControlsRef.current = ref}
        />
        
        {/* 사용자 UI 컨트롤 */}
        <Controls
          onAddEntry={addEntry}
          onDeleteEntry={removeEntry}
          selectedEntry={selectedEntry}
          onClearSelection={handleClearSelection}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>
    </CameraContext.Provider>
  );
};

export default App;