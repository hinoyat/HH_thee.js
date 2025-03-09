import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Stars as DreiStars, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import DiaryStars from './Stars'; // 위에서 만든 Stars 컴포넌트

/**
 * 우주 배경을 설정하는 컴포넌트
 */
const SpaceBackground = () => {
  return (
    <>
      {/* 우주 배경에 작은 별들을 많이 생성 */}
      <DreiStars
        radius={300}       // 별들이 분포할 구의 반지름
        depth={100}        // 별들의 깊이 분포
        count={5000}       // 별의 개수
        factor={4}         // 별들의 크기 요소
        saturation={0.5}   // 별들의 색상 채도
      />
      
      {/* 은하수 느낌의 더 밝은 별들을 추가 */}
      <DreiStars
        radius={150}
        depth={50}
        count={1000}
        factor={6}
        saturation={1}
      />
    </>
  );
};

/**
 * 카메라 컨트롤을 관리하는 컴포넌트
 */
const CameraControls = ({ cameraDistance, setOrbitControlsRef }) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  // 카메라 거리 업데이트
  useEffect(() => {
    if (camera && controlsRef.current) {
      camera.position.setLength(cameraDistance);
      controlsRef.current.update();
    }
  }, [camera, cameraDistance]);
  
  // 컨트롤 참조 설정
  useEffect(() => {
    if (controlsRef.current && setOrbitControlsRef) {
      setOrbitControlsRef(controlsRef.current);
    }
  }, [controlsRef, setOrbitControlsRef]);
  
  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}          // 확대/축소 가능
      enablePan={false}          // 패닝(이동) 불가능
      enableDamping={true}       // 부드러운 움직임
      dampingFactor={0.05}       // 감쇠 계수
      autoRotate={false}         // 자동 회전 비활성화
      rotateSpeed={0.5}          // 회전 속도
      minDistance={5}            // 최소 줌 거리
      maxDistance={200}          // 최대 줌 거리
    />
  );
};

/**
 * 3D 우주 공간을 표현하는 메인 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.diaryEntries - 일기 항목 배열
 * @param {Function} props.onSelectEntry - 일기 항목 선택 시 실행될 함수
 * @param {number} props.cameraDistance - 카메라 거리
 * @param {Function} props.setOrbitControlsRef - OrbitControls 참조 설정 함수
 */
const SpaceScene = ({ 
  diaryEntries, 
  onSelectEntry, 
  cameraDistance = 30,
  setOrbitControlsRef
}) => {
  // 씬에 대한 참조
  const sceneRef = useRef();
  
  return (
    <div className="space-scene-container" style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, cameraDistance], fov: 75 }}
        style={{ background: 'black' }}
      >
        <Suspense fallback={null}>
          {/* 우주 배경 */}
          <SpaceBackground />
          
          {/* 카메라 컨트롤 */}
          <CameraControls 
            cameraDistance={cameraDistance}
            setOrbitControlsRef={setOrbitControlsRef}
          />
          
          {/* 주변 조명 */}
          <ambientLight intensity={0.1} />
          
          {/* 중앙에서 빛이 퍼져나가는 효과 */}
          <pointLight position={[0, 0, 0]} intensity={1} distance={300} decay={2} />
          
          {/* 일기 항목들을 별로 표현 */}
          <DiaryStars
            entries={diaryEntries}
            onSelectEntry={onSelectEntry}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpaceScene;