function getDate() {
  const todayDate = new Date();
  const year = todayDate.getFullYear().toString();
  const month = ("00" + (todayDate.getMonth() + 1).toString()).slice(-2);
  const day = ("00" + todayDate.getDate().toString()).slice(-2);
  const dateFormat = year + month + day;

  return dateFormat;
}

function getTime(type) {
  const todayTime = new Date();
  let rawHour = parseInt(("0" + todayTime.getHours().toString()).slice(-2));
  const rawMinute = parseInt("0" + todayTime.getMinutes().toString().slice(-2));

  let hourFormat = "";

  if (type === "ncst") {
    if (rawMinute <= 40) {
      if (rawHour <= 10) {
        hourFormat = "0" + (rawHour - 1).toString() + "00";
      } else {
        hourFormat = (rawHour - 1).toString() + "00";
      }
    } else if (rawHour) {
      if (rawHour <= 10) {
        hourFormat = "0" + (rawHour - 1).toString() + "00";
      } else {
        hourFormat = rawHour.toString() + "00";
      }
    }
    return hourFormat;
  } else if (type === "fcst") {
    if (rawMinute <= 45) {
      if (rawHour <= 10) {
        hourFormat = "0" + (rawHour - 1).toString() + "00";
      } else {
        hourFormat = (rawHour - 1).toString() + "00";
      }
    } else if (rawHour) {
      if (rawHour <= 10) {
        hourFormat = "0" + (rawHour - 1).toString() + "00";
      } else {
        hourFormat = rawHour.toString() + "00";
      }
    }
    return hourFormat;
  }
}

async function getNowcast() {
  const url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
  const params = {
    serviceKey: "YOUR API KEY",
    numOfRows: 30,
    pageNo: 1,
    dataType: "JSON",
    base_date: getDate(),
    base_time: getTime("ncst"),
    nx: gridCoordinate.x,
    ny: gridCoordinate.y,
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        for (const i of res.response.body.items.item) {
          nowcastData.push(new NowcastWeather(i));
        }
      } else {
        console.log("API Error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

async function getForecast() {
  const url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
  const params = {
    serviceKey: "YOUR API KEY",
    numOfRows: 30,
    pageNo: 1,
    dataType: "JSON",
    base_date: getDate(),
    base_time: getTime("fcst"),
    nx: gridCoordinate.x,
    ny: gridCoordinate.y,
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        for (const i of res.response.body.items.item) {
          forecastData.push(new ForecastWeather(i));
        }
      } else {
        console.log("API Error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

/*
[0]PTY : 강수형태 (없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7))
[1]REH : 습도 (%)
[2]RN1 : 1시간 강수량 (mm)
[3]T1H : 기온 (℃)
[4]UUU : 동서바람성분 (m/s)
[5]VEC : 풍향 (deg)
[6]VVV : 남북바람성분 (m/s)
[7]WSD : 풍속 (m/s)
*/

/*
[0]LGT : 낙뢰 (kA)
[1]PTY : 강수형태 (없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7))
[2]RN1 : 1시간 강수량 (mm)
[3]SKY : 하늘상태 (맑음(1), 구름많음(3), 흐림(4))
[4]T1H : 기온 (℃)
[5]REH : 습도 (%)
[6]UUU : 동서바람성분 (m/s)
[7]VVV : 남북바람성분 (m/s)
[8]VEC : 풍향 (deg)
[9]WSD : 풍속 (m/s)
*/
