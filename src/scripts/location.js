// index.html 로드 시 위치 데이터 설정 및 좌표를 변환하는 javascript

/**
 * Nominatim API를 사용해 위경도 데이터를 역지오코딩 하여 OpenStreetMap의 주소로 변환하는 함수 - location.js
 */
async function setAddress() {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coordinate.latitude}&lon=${position.coordinate.longitude}&zoom=18`;
  const c = await fetch(url)
    .then((response) => response.json())
    .then((response) => {
      // 역지오코딩한 데이터를 주소 데이터로 저장
      position.address.country = response.address.country;
      position.address.province = response.address.province;
      position.address.city = response.address.city;
      position.address.quarter = response.address.quarter;
      position.address.road = response.address.road;
      position.address.building = response.address.building;

      drawPosition(); // drawPosition() - draw.js 실행
      getSunRiseSetData(); // getSunRiseSetData() - sunRiseSet.js 실행
    })
    .catch((e) => {
      console.log(`Couldn't Get Address Data`);
    });
}

/**
 * 사용자의 위치(위경도 데이터)를 저장하는 함수- location.js
 * @param {Object} coordinate 
 */
function setCoordinate(coordinate) {
  position.coordinate.latitude = coordinate.coords.latitude;
  position.coordinate.longitude = coordinate.coords.longitude;
  setAddress() // setAddress() - location.js 실행
}

/**
 * 사용자의 위치(위경도 데이터)를 불러오면서 에러가 발생했을 때 실행되는 함수 - location.js
 * @param {unsigned short} e 
 */
function getPositionError(e) {
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
  switch (e.code) {
    case 1:
      alert("위치 권한이 거부되었습니다."); // PERMISSION_DENIED
      break;
    case 2:
      alert("위치 정보를 사용할 수 없습니다."); // POSITION_UNAVAILABLE
      break;
    case 3:
      alert("시간 초과"); // TIMEOUT
      break;
  }
}

/**
 * 위경도 데이터를 단기예보 API에서 사용하는 기상청 좌표계 데이터로 변환하는 함수 - location.js
 */
// 원본 코드는 [기상청 단기예보 조회서비스 Open API 활용가이드] (API 명세) 문서에 C 용으로 작성
function convertCoordToGridCoord() {
  const earthRadius = 6371.00877; // 지구 반경(km)
  const gridScale = 5.0; // 격자 간격(km)
  const standardParallelLatitude1 = 30.0; // Lambert 정형원추도법 실측거리 대응 위도 1(북위 30 °N)
  const standardParallelLatitude2 = 60.0; // Lambert 정형원추도법 실측거리 대응 위도 2(북위 60 °N)
  const originLatitude = 38.0; // 기준점 위도(degree)
  const originLongitude = 126.0; // 기준점 경도(degree)
  const originLatitudeToGrid = 43; // 기준 위도 대응 격자점(GRID)
  const originLongitudeToGrid = 136; // 기준 위경도 대응 격자점(GRID)

  const oneDegree = Math.PI / 180.0; // about 0.017453292519943295 radian

  const re = earthRadius / gridScale;
  const slat1 = standardParallelLatitude1 * oneDegree;
  const slat2 = standardParallelLatitude2 * oneDegree;
  const olon = originLongitude * oneDegree;
  const olat = originLatitude * oneDegree;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + position.coordinate.latitude * oneDegree * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = position.coordinate.longitude * oneDegree - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  position.gridCoordinate.x = Math.floor(ra * Math.sin(theta) + originLatitudeToGrid + 0.5);
  position.gridCoordinate.y = Math.floor(ro - ra * Math.cos(theta) + originLongitudeToGrid + 0.5);
}