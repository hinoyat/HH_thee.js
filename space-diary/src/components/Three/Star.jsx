import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * 3D 공간에서 일기 항목을 별로 표현하는 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.entry - 일기 항목 객체
 * @param {Function} props.onClick - 클릭 시 실행될 함수
 */
const Star = ({ entry, onClick }) => {
  // 별의 위치
  const { x, y, z } = entry.position;
  
  // 마우스 호버 상태 관리
  const [hovered, setHovered] = useState(false);
  
  // ref를 통해 메쉬 객체에 직접 접근
  const meshRef = useRef();
  
  // 별이 빛나는 효과를 위한 스케일 애니메이션
  useFrame((state, delta) => {
    if (meshRef.current) {
      // 약간의 크기 변화로 반짝이는 효과
      const pulseFactor = 0.05; // 맥박 강도
      const pulseSpeed = 1.5;   // 맥박 속도
      const scale = 1 + pulseFactor * Math.sin(state.clock.elapsedTime * pulseSpeed);
      
      // 호버 시 강조 효과
      const baseScale = hovered ? 1.2 : 1.0;
      
      meshRef.current.scale.set(
        baseScale * scale,
        baseScale * scale,
        baseScale * scale
      );
    }
  });
  
  // 마우스 이벤트 핸들러
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  
  return (
    <group position={[x, y, z]}>
      {/* 별(일기 항목) 메쉬 */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(entry)}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* 별 모양을 위한 구체 형태 */}
        <sphereGeometry args={[entry.size / 2, 16, 16]} />
        
        {/* 빛나는 재질 */}
        <meshStandardMaterial
          color={entry.color}
          emissive={entry.color}
          emissiveIntensity={hovered ? 2 : 1}
        />
      </mesh>
      
      {/* 호버 시 표시될 일기 미리보기 */}
      {hovered && (
        <Html
          position={[0, entry.size / 2 + 1, 0]}
          center
          distanceFactor={10}
        >
          <div className="diary-preview">
            <p className="diary-date">{entry.date.toLocaleDateString()}</p>
            <p className="diary-content">
              {entry.content.length > 50
                ? `${entry.content.substring(0, 50)}...`
                : entry.content}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Star;