/**
 * DiaryEntry 클래스 - 일기 항목을 나타내는 데이터 모델
 * 각 일기는 내용, 날짜, 그리고 3D 공간에서의 위치(x, y, z) 정보를 가집니다.
 */
class DiaryEntry {
    constructor(id, content, date, position = null) {
      this.id = id;                 // 일기 고유 ID
      this.content = content;       // 일기 내용
      this.date = date;             // 일기 작성 날짜
      
      // 위치가 제공되지 않은 경우 랜덤한 구 좌표 생성
      if (!position) {
        this.position = DiaryEntry.generateRandomSpherePosition(100); // 반지름 100 내의 무작위 위치
      } else {
        this.position = position;
      }
      
      // 일기 내용 길이에 따라 별의 크기 결정 (길수록 더 큰 별)
      // this.size = Math.min(2 + (content.length / 100), 5);
      this.size = 2;
      
      // 별의 색상 (나중에 감정 분석 등으로 결정할 수 있음)
      this.color = DiaryEntry.getRandomColor();
    }
    
    /**
     * 구 표면 상의 랜덤한 위치 생성
     * @param {number} radius - 구의 반지름
     * @returns {Object} - x, y, z 좌표를 담은 객체
     */
    static generateRandomSpherePosition(radius) {
      // 구 좌표계 공식 사용
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      // 직교 좌표계로 변환
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      return { x, y, z };
    }
    
    /**
     * 랜덤한 별 색상 생성
     * @returns {string} - 별 색상의 16진수 표현
     */
    static getRandomColor() {
      // 별은 보통 파란색, 흰색, 노란색, 붉은색 등의 색상을 가집니다
      const colors = [
        '#FFFFFF', // 흰색
        '#FFFACD', // 밝은 노란색
        '#ADD8E6', // 밝은 파란색
        '#FFB6C1', // 분홍색
        '#FFA07A', // 연한 주황색
      ];
      
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }
  
  export default DiaryEntry;