// index.html 로드 시 미세먼지 데이터를 받아오는 javascript

/**
 * kakao REST API를 사용해 위경도 데이터를 TM 중부원점 좌표계 데이터로 변환하는 함수 - particulateMatter.js
 */
// https://developers.kakao.com/docs/latest/ko/local/dev-guide#trans-coord 
async function convertCoordToTMCoord() {
  const url = "https://dapi.kakao.com/v2/local/geo/transcoord";
  const key = "YOUR API KEY"
  const params = {
    x: position.coordinate.longitude,
    y: position.coordinate.latitude,
    output_coord: "TM",
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl, {
    headers: {
      Authorization: `KakaoAK ${key}`
    }
  })
    .then((res) => res.json())
    .then((res) => {
      position.tmCoordinate.x = res.documents[0].x
      position.tmCoordinate.y = res.documents[0].y
      getStationInfo() // getStationInfo() - particulateMatter.js 실행
    })
    .catch((e) => {
      console.log(`Couldn't Translate Coordinate Data`);
    });
}

/**
 * 한국환경공단 OPEN API를 사용해 TM 좌표 주변 측정소 정보를 저장하는 함수 - particulateMatter.js
 */
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073877 
async function getStationInfo() {
  const url = "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList";
  const params = {
    serviceKey: "YOUR API KEY",
    returnType: "json",
    tmX: position.tmCoordinate.x,
    tmY: position.tmCoordinate.y,
    ver: "1.1",
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        for (const i of res.response.body.items) {
          particulateMatterData.nearestStation.push(i.stationName)
        }
        getPM(particulateMatterData.nearestStation[0], 0) // getPM() - particulateMatter.js 실행
      } else {
        console.log(`Couldn't Get PM Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get PM Data\nAPI Call Failed`);
    });
}

/**
 * 미세먼지 데이터를 저장하는 함수 - particulateMatter.js
 * @param {Object} res
 * @param {Number} idx
 */
// 2개 이상의 측정소(최대 3개) 데이터를 저장할 경우 idx Parameter 사용
function setPM(res, idx) {
  particulateMatterData[idx].stationName = res.response.body.items[0].stationName;
  particulateMatterData[idx].pm10 = res.response.body.items[0].pm10Value;
  particulateMatterData[idx].pm10Flag = res.response.body.items[0].pm10Flag;
  particulateMatterData[idx].pm10Grade = res.response.body.items[0].pm10Grade;
  particulateMatterData[idx].pm25 = res.response.body.items[0].pm25Value;
  particulateMatterData[idx].pm25Flag = res.response.body.items[0].pm25Flag;
  particulateMatterData[idx].pm25Grade = res.response.body.items[0].pm25Grade;
}

/**
 * 한국환경공단 OPEN API를 사용해 측정소명으로 실시간 대기 측정 정보를 조회하는 함수 - particulateMatter.js
 * @param {String} station
 * @param {Number} idx 
 */
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861
// 2개 이상의 측정소(최대 3개) 데이터를 조회할 경우 idx Parameter 사용
async function getPM(station, idx) {
  const url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";
  const params = {
    serviceKey: "YOUR API KEY",
    returnType: "json",
    stationName: station,
    dataTerm: "DAILY",
    ver: "1.4",
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        setPM(res, idx) // setPM() - particulateMatter.js 실행
        drawPM(); // drawPM() - draw.js 실행
      } else {
          console.log(`Couldn't Get PM Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get PM Data\nAPI Call Failed`);
    });
}