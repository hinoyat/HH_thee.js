import { useState, useEffect } from 'react';
import DiaryEntry from '../models/DiaryEntry';

/**
 * 일기 항목을 관리하는 커스텀 훅
 * 로컬 스토리지에서 일기 데이터를 가져오고 저장하는 기능을 제공합니다.
 * 
 * @returns {Object} - 일기 목록과 관련 함수들
 */
const useDiaryEntries = () => {
  // 더미 데이터 생성 함수
  const createDummyEntries = () => {
    const dummyData = [
      {
        id: '1',
        content: '오늘은 정말 좋은 하루였다. 친구들과 함께 놀이공원에 가서 재미있게 놀았다.',
        date: new Date(2023, 2, 15), // 2023년 3월 15일
        position: { x: 75, y: 30, z: 20 }
      },
      {
        id: '2',
        content: '시험 준비가 힘들었지만 좋은 결과를 얻어서 기분이 좋다. 내일은 휴식을 취해야겠다.',
        date: new Date(2023, 3, 2), // 2023년 4월 2일
        position: { x: -50, y: 60, z: -30 }
      },
      {
        id: '3',
        content: '새로운 프로젝트를 시작했다. Three.js와 React를 사용해서 우주 테마 일기장을 만들고 있다.',
        date: new Date(2023, 4, 10), // 2023년 5월 10일
        position: { x: 20, y: -40, z: 80 }
      },
      {
        id: '4',
        content: '오늘은 비가 왔다. 창밖을 바라보며 책을 읽었다. 평온한 하루였다.',
        date: new Date(2023, 5, 5), // 2023년 6월 5일
        position: { x: -80, y: -20, z: -60 }
      },
      {
        id: '5',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 60, y: 70, z: 10 }
      }
    ];
    
    // DiaryEntry 객체로 변환
    return dummyData.map(entry => 
      new DiaryEntry(
        entry.id,
        entry.content,
        entry.date,
        entry.position
      )
    );
  };
  
  // 일기 항목 목록 상태
  const [entries, setEntries] = useState([]);
  
  // 컴포넌트 마운트 시 로컬 스토리지에서 일기 데이터 로드
  useEffect(() => {
    const storedEntries = localStorage.getItem('diaryEntries');
    if (storedEntries) {
      try {
        // 저장된 JSON을 파싱하고 DiaryEntry 객체로 변환
        const parsedEntries = JSON.parse(storedEntries).map(entry => 
          new DiaryEntry(
            entry.id,
            entry.content,
            new Date(entry.date),
            entry.position
          )
        );
        setEntries(parsedEntries);
      } catch (error) {
        console.error('일기 데이터를 불러오는 중 오류 발생:', error);
        // 오류 발생 시 더미 데이터로 초기화
        setEntries(createDummyEntries());
      }
    } else {
      // 저장된 데이터가 없는 경우 더미 데이터 사용
      setEntries(createDummyEntries());
    }
  }, []);
  
  // 일기 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  /**
   * 새 일기 추가
   * @param {string} content - 일기 내용
   */
  const addEntry = (content) => {
    const newEntry = new DiaryEntry(
      Date.now().toString(), // 고유 ID로 현재 타임스탬프 사용
      content,
      new Date()
    );
    
    setEntries(prevEntries => [...prevEntries, newEntry]);
  };
  
  /**
   * ID로 일기 삭제
   * @param {string} id - 삭제할 일기의 ID
   */
  const removeEntry = (id) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };
  
  return {
    entries,
    addEntry,
    removeEntry
  };
};

export default useDiaryEntries;