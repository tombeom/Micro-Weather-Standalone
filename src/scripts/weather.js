function getDate() {
  const todayDate = new Date();
  const year = todayDate.getFullYear().toString();
  const month = ("00" + (todayDate.getMonth() + 1).toString()).slice(-2);
  
  let day = ("00" + todayDate.getDate().toString()).slice(-2);

  if (todayDate.getHours() === 0) {
    if (todayDate.getMinutes() < 40) {
      day = ("00" + (todayDate.getDate() - 1).toString()).slice(-2);
    }
  }

  const dateFormat = year + month + day;
  return dateFormat;
}

function getTime(type) {
  const todayTime = new Date();

  let hourFormat = "";

  if (type === "ncst") {
    // ncst 요청 시 API 제공 시간 40분 이후
    if (todayTime.getHours() === 0) {
      // 00시 getHour() 호출 시 0 출력
      if (todayTime.getMinutes() < 30) {
        // 40분 이전 시 "2300" 리턴
        hourFormat = `2300`
        return hourFormat
      } else {
        // 40분 이후 시 "0000" 리턴
        hourFormat = `0000`
        return hourFormat
      }
    } else if (todayTime.getHours() > 0 && todayTime.getHours() < 10) {
      // 01시 ~ 10시까지 getHour() 호출 시 한 자리 수 출력
      if (todayTime.getMinutes() < 40) {
        // 40분 이전 시 "0 + (현재 시각 - 1) + 00" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}00`
        return hourFormat
      } else {
        // 40분 이후 시 "0 + 현재 시각 + 00" 값 리턴
        hourFormat = `0${todayTime.getHours()}00`
        return hourFormat
      }
    } else if (todayTime.getHours() === 10){
      if (todayTime.getMinutes() < 40) {
        // 40분 이전 시 "현재 시각 + 00" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}00`
        return hourFormat
      } else {
        // 40분 이후 시 "현재 시각 + 00" 값 리턴
        hourFormat = `${todayTime.getHours()}00`
        return hourFormat
      }
    } else {
      if (todayTime.getMinutes() < 40) {
        // 40분 이전 시 "현재 시각 + 00" 값 리턴
        hourFormat = `${(todayTime.getHours()-1)}00`
        return hourFormat
      } else {
        // 40분 이후 시 "현재 시각 + 00" 값 리턴
        hourFormat = `${todayTime.getHours()}00`
        return hourFormat
      }
    }
  } else if (type === "fcst") {
    // fcst 요청 시 30분 단위 호출 및 API 제공 시간 45분 이후
    if (todayTime.getHours() === 0) {
      // 00시 getHour() 호출 시 0 출력
      if (todayTime.getMinutes() < 30) {
        // 40분 이전 시 "2330" 리턴
        hourFormat = `0030`
        return hourFormat
      } else {
        // 40분 이후 시 "0030" 리턴
        hourFormat = `0030`
        return hourFormat
      }
    } else if (todayTime.getHours() > 0 && todayTime.getHours() < 10) {
      // 01시 ~ 10시까지 getHour() 호출 시 한 자리 수 출력
      if (todayTime.getMinutes() < 45) {
        // 40분 이전 시 "0 + (현재 시각 - 1) + 30" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}30`
        return hourFormat
      } else {
        // 40분 이후 시 "0 + 현재 시각 + 30" 값 리턴
        hourFormat = `0${todayTime.getHours()}30`
        return hourFormat
      }
    } else if (todayTime.getHours() === 10){
      if (todayTime.getMinutes() < 45) {
        // 40분 이전 시 "현재 시각 + 00" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}30`
        return hourFormat
      } else {
        // 40분 이후 시 "현재 시각 + 00" 값 리턴
        hourFormat = `${todayTime.getHours()}30`
        return hourFormat
      }
    } else {
      if (todayTime.getMinutes() < 45) {
        // 40분 이전 시 "현재 시각 + 00" 값 리턴
        hourFormat = `${(todayTime.getHours()-1)}30`
        return hourFormat
      } else {
        // 40분 이후 시 "현재 시각 + 00" 값 리턴
        hourFormat = `${todayTime.getHours()}30`
        return hourFormat
      }
    }
  }
}

function setWeatherData(type, data) {
  if (type === "ncst") {
    if (data.category === "PTY") {
      nowcastData.pty.push(data.obsrValue)
    } else if (data.category === "REH") {
      nowcastData.reh.push(data.obsrValue)
    } else if (data.category === "RN1") {
      nowcastData.rn1.push(data.obsrValue)
    } else if (data.category === "T1H") {
      nowcastData.t1h.push(data.obsrValue)
    }
  } else if (type === "fcst") {
    if (data.category === "LGT") {
      forecastData.lgt.push(data.fcstValue)
      forecastData.fcstTime.push(data.fcstTime)
    } else if (data.category === "PTY") {
      forecastData.pty.push(data.fcstValue)
    } else if (data.category === "RN1") {
        if (data.fcstValue === "강수없음") {
          forecastData.rn1.push("0")
        } else {
          forecastData.rn1.push(data.fcstValue)
        }
    } else if (data.category === "SKY") {
      forecastData.sky.push(data.fcstValue)
    } else if (data.category === "T1H") {
      forecastData.t1h.push(data.fcstValue)
    }
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
    nx: position.gridCoordinate.x,
    ny: position.gridCoordinate.y,
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        for (const i of res.response.body.items.item) {
          setWeatherData("ncst", i)
        }
        getForecast()
      } else {
        console.log(`Couldn't Get Nowcast Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get Nowcast Data\nAPI Call Failed`);
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
    nx: position.gridCoordinate.x,
    ny: position.gridCoordinate.y,
  };
  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        for (const i of res.response.body.items.item) {
          setWeatherData("fcst", i)
        }
        drawNcst();
        drawFcst();
      } else {
        console.log(`Couldn't Get Forecast Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get Forecast Data\nAPI Call Failed`);
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
