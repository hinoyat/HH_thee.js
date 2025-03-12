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
        position: { x: 25.604, y: -96.667, z: 0.0 }
      },
      {
        id: '2',
        content: '시험 준비가 힘들었지만 좋은 결과를 얻어서 기분이 좋다. 내일은 휴식을 취해야겠다.',
        date: new Date(2023, 3, 2), // 2023년 4월 2일
        position: { x: -32.141, y: -90.0, z: 29.444 }
      },
      {
        id: '3',
        content: '새로운 프로젝트를 시작했다. Three.js와 React를 사용해서 우주 테마 일기장을 만들고 있다.',
        date: new Date(2023, 4, 10), // 2023년 5월 10일
        position: { x: 4.833, y: -83.333, z: -55.065 }
      },
      {
        id: '4',
        content: '오늘은 비가 왔다. 창밖을 바라보며 책을 읽었다. 평온한 하루였다.',
        date: new Date(2023, 5, 5), // 2023년 6월 5일
        position: { x: 39.065, y: -76.667, z: 50.953 }
      },
      {
        id: '5',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -70.323, y: -70.0, z: -12.439 }
      },
      {
        id: '6',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 65.296, y: -63.333, z: -41.536 }
      },
      {
        id: '7',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -21.390, y: -56.667, z: 79.570 }
      },
      {
        id: '8',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -39.916, y: -50.0, z: -76.855 }
      },
      {
        id: '9',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 84.655, y: -43.333, z: 30.916 }
      },
      {
        id: '10',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -85.997, y: -36.667, z: 35.498 }
      },
      {
        id: '11',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 40.432, y: -30.0, z: -86.402 }
      },
      {
        id: '12',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 29.102, y: -23.333, z: 92.783 }
      },
      {
        id: '13',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -85.311, y: -16.667, z: -49.439 }
      },
      {
        id: '14',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 97.178, y: -10.0, z: -21.364 }
      },
      {
        id: '15',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -57.481, y: -3.333, z: 81.761 }
      },
      {
        id: '16',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -12.844, y: 3.333, z: -99.116 }
      },
      {
        id: '17',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 76.082, y: 10.0, z: 64.122 }
      },
      {
        id: '18',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -98.517, y: 16.667, z: 4.074 }
      },
      {
        id: '19',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 68.926, y: 23.333, z: -68.591 }
      },
      {
        id: '20',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -4.406, y: 30.0, z: 95.292 }
      },
      {
        id: '21',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -59.609, y: 36.667, z: -71.431 }
      },
      {
        id: '22',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 89.319, y: 43.333, z: 12.018 }
      },
      {
        id: '23',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -71.088, y: 50.0, z: 49.461 }
      },
      {
        id: '24',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 18.084, y: 56.667, z: -80.386 }
      },
      {
        id: '25',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 38.476, y: 63.333, z: 67.145 }
      },
      {
        id: '26',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -68.036, y: 70.0, z: -21.705 }
      },
      {
        id: '27',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 58.284, y: 76.667, z: -26.929 }
      },
      {
        id: '28',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -21.340, y: 83.333, z: 50.992 }
      },
      {
        id: '29',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: -14.753, y: 90.0, z: -41.017 }
      },
      {
        id: '30',
        content: '친구와 오랜만에 만나서 이야기를 나눴다. 변함없는 우정이 있어 행복하다.',
        date: new Date(2023, 6, 20), // 2023년 7월 20일
        position: { x: 22.664, y: 96.667, z: 11.912 }
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