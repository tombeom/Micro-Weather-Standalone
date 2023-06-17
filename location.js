const getCoordOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

async function getAddress(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${parseFloat(latitude)}&lon=${parseFloat(
    longitude
  )}&zoom=18`;
  const c = await fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const loc = `${response.address.city} ${response.address.quarter}`;
    })
    .catch((e) => {
      console.log(e);
    });
}

function getCoord(position) {
  /*
  position.coords.latitude;
  position.coords.longitude;
  position.coords.accuracy;
  position.coords.altitude;
  position.coords.heading;
  position.coords.speed;
  */
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getAddress(latitude, longitude);
  getWeather(convertGeoCoordToGridCoord(latitude, longitude).x, convertGeoCoordToGridCoord(latitude, longitude).y);
}

function getCoordError(e) {
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
  switch (e.code) {
    case 1:
      alert("위치 권한이 거부되었습니다.");
      break;
    case 2:
      alert("비교하려는 값보다 작습니다.");
      break;
    case 3:
      alert("시간 초과");
      break;
  }
}

function convertGeoCoordToGridCoord(latitude, longitude) {
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

  let ra = Math.tan(Math.PI * 0.25 + latitude * oneDegree * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = longitude * oneDegree - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const gridCoord = {};
  gridCoord["x"] = Math.floor(ra * Math.sin(theta) + originLatitudeToGrid + 0.5);
  gridCoord["y"] = Math.floor(ro - ra * Math.cos(theta) + originLongitudeToGrid + 0.5);

  return gridCoord;
}
