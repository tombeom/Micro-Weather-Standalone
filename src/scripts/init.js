// index.html 로드 시 위경도 좌표를 받아오고 실행에 필요한 함수를 순차적으로 실행시키는 javascript

/**
 * 위경도 좌표를 받아온 이후 실행에 필요한 함수들을 순차적으로 실행시키는 함수 - init.js
 */
function init(position) {
  setCoordinate(position);
  convertCoordToGridCoord();
  convertCoordToTMCoord();
  getNowcast();
}

// 현재 위경도 좌표를 받아오고 init() - init.js 실행
navigator.geolocation.getCurrentPosition(
  init,
  getPositionError,
  (options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  })
);