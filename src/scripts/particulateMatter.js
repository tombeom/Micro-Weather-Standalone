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
      getStationInfo()
    })
    .catch((e) => {
      console.log(e);
    });
}

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
        getPM(particulateMatterData.nearestStation[0], 0)
        // for(let i = 0; i < particulateMatterData.nearestStation.length; i++) {
        //   getPM(particulateMatterData.nearestStation[i], i)
        // }
      } else {
        console.log(`Couldn't Get PM Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get PM Data\nAPI Call Failed`);
    });
}

function setPM(res, idx) {
  particulateMatterData[idx].stationName = res.response.body.items[0].stationName;
  particulateMatterData[idx].pm10 = res.response.body.items[0].pm10Value;
  particulateMatterData[idx].pm10Flag = res.response.body.items[0].pm10Flag;
  particulateMatterData[idx].pm10Grade = res.response.body.items[0].pm10Grade;
  particulateMatterData[idx].pm25 = res.response.body.items[0].pm25Value;
  particulateMatterData[idx].pm25Flag = res.response.body.items[0].pm25Flag;
  particulateMatterData[idx].pm25Grade = res.response.body.items[0].pm25Grade;
}

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
          setPM(res, idx)
          drawPM();
        } else {
            console.log(`Couldn't Get PM Data\nError Code : ${res.response.header.resultCode}`);
        }
      })
      .catch((e) => {
        console.log(`Couldn't Get PM Data\nAPI Call Failed`);
        console.log(e)
      });
  }