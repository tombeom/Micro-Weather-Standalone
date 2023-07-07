// index.html 로드 시 날씨 데이터를 받아오는 javascript

/**
 * 현재 날짜를 API 호출 시 사용되는 포맷에 맞게 return 해주는 함수 - weather.js
 */
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

/**
 * 현재 시각을 API 호출 시 사용되는 포맷에 맞게 return 해주는 함수 - weather.js
 * @param {String} type 
 */
function getTime(type) {
  const todayTime = new Date();

  let hourFormat = "";

  if (type === "ncst") {
    // ncst 요청 시 API 제공 시간 30분 이후이지만 안정성을 위해 40분 이후로 설정하는 것을 추천
    ncstServeMinute = 30
    if (todayTime.getHours() === 0) {
      // 00시 getHour() 호출 시 0 출력
      if (todayTime.getMinutes() < ncstServeMinute) {
        // ncstServeTime 이전 "2300" 리턴
        hourFormat = `2300`
        return hourFormat
      } else {
        // ncstServeMinute 이후 "0000" 리턴
        hourFormat = `0000`
        return hourFormat
      }
    } else if (todayTime.getHours() > 0 && todayTime.getHours() < 10) {
      // 01시 ~ 10시까지 getHour() 호출 시 한 자리 수 출력
      if (todayTime.getMinutes() < ncstServeMinute) {
        // ncstServeMinute 이전 "0 + (현재 시각 - 1) + 00" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}00`
        return hourFormat
      } else {
        // ncstServeMinute 이후 "0 + 현재 시각 + 00" 값 리턴
        hourFormat = `0${todayTime.getHours()}00`
        return hourFormat
      }
    } else if (todayTime.getHours() === 10){
      if (todayTime.getMinutes() < ncstServeMinute) {
        // ncstServeMinute 이전 "현재 시각 + 00" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}00`
        return hourFormat
      } else {
        // ncstServeMinute 이후 "현재 시각 + 00" 값 리턴
        hourFormat = `${todayTime.getHours()}00`
        return hourFormat
      }
    } else {
      if (todayTime.getMinutes() < ncstServeMinute) {
        // ncstServeMinute 이전 "현재 시각 + 00" 값 리턴
        hourFormat = `${(todayTime.getHours()-1)}00`
        return hourFormat
      } else {
        // ncstServeMinute 이후 "현재 시각 + 00" 값 리턴
        hourFormat = `${todayTime.getHours()}00`
        return hourFormat
      }
    }
  } else if (type === "fcst") {
    // fcst 요청 시 30분 단위 호출 및 API 제공 시간 45분 이후
    fcstServeMinute = 45
    if (todayTime.getHours() === 0) {
      // 00시 getHour() 호출 시 0 출력
      if (todayTime.getMinutes() < fcstServeMinute) {
        // fcstServeMinute 이전 "2330" 리턴
        hourFormat = `0030`
        return hourFormat
      } else {
        // fcstServeMinute 이후 "0030" 리턴
        hourFormat = `0030`
        return hourFormat
      }
    } else if (todayTime.getHours() > 0 && todayTime.getHours() < 10) {
      // 01시 ~ 10시까지 getHour() 호출 시 한 자리 수 출력
      if (todayTime.getMinutes() < fcstServeMinute) {
        // fcstServeMinute 이전 "0 + (현재 시각 - 1) + 30" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}30`
        return hourFormat
      } else {
        // fcstServeMinute 이후 "0 + 현재 시각 + 30" 값 리턴
        hourFormat = `0${todayTime.getHours()}30`
        return hourFormat
      }
    } else if (todayTime.getHours() === 10){
      if (todayTime.getMinutes() < fcstServeMinute) {
        // fcstServeMinute 이전 "현재 시각 + 30" 값 리턴
        hourFormat = `0${(todayTime.getHours()-1)}30`
        return hourFormat
      } else {
        // fcstServeMinute 이후 "현재 시각 + 30" 값 리턴
        hourFormat = `${todayTime.getHours()}30`
        return hourFormat
      }
    } else {
      if (todayTime.getMinutes() < fcstServeMinute) {
        // fcstServeMinute 이전 "현재 시각 + 30" 값 리턴
        hourFormat = `${(todayTime.getHours()-1)}30`
        return hourFormat
      } else {
        // fcstServeMinute 이후 "현재 시각 + 30" 값 리턴
        hourFormat = `${todayTime.getHours()}30`
        return hourFormat
      }
    }
  }
}

/**
 * 날씨 데이터를 저장하는 함수 - weather.js
 * @param {String} type
 * @param {Object} data
 */
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

/**
 * 기상청 OPEN API를 사용해 초단기실황 데이터를 조회하는 함수 - weather.js
 */
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
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
  console.log(requestUrl)
  const c = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      if (res.response.header.resultCode === "00") {
        for (const i of res.response.body.items.item) {
          setWeatherData("ncst", i) // setWeatherData() - weather.js 실행
        }
        getForecast() // getForecast() - weather.js 실행
      } else {
        console.log(`Couldn't Get Nowcast Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get Nowcast Data\nAPI Call Failed`);
    });
}

/**
 * 기상청 OPEN API를 사용해 초단기예보 데이터를 조회하는 함수 - weather.js
 */
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
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
          setWeatherData("fcst", i) // setWeatherData() - weather.js 실행
        }
        drawNcst(); // drawNcst() - draw.js 실행
        drawFcst(); // drawFcst() - draw.js 실행
      } else {
        console.log(`Couldn't Get Forecast Data\nError Code : ${res.response.header.resultCode}`);
      }
    })
    .catch((e) => {
      console.log(`Couldn't Get Forecast Data\nAPI Call Failed`);
    });
}