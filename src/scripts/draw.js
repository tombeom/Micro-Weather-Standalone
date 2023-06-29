// index.html 로드 시 API 데이터를 받아와서 HTML로 출력하는 javascript

// 데이터 출력 위치를 지정하기 위한 QuerySelector
// 초단기실황
const $ncstImg = document.querySelector("#ncstImg");
const $ncstPrecipitationImg = document.querySelector("#ncstPrecipitationImg")
const $ncstTemp = document.querySelector("#ncstTemp");
const $location = document.querySelector("#location");
const $ncstPrecipitation = document.querySelector("#ncstPrecipitation");
const $ncstHumidity = document.querySelector("#ncstHumidity");
// 미세먼지
const $station = document.querySelector("#station");
const $pm25 = document.querySelector("#pm25");
const $pm25Grade = document.querySelector("#pm25Grade");
const $pm10 = document.querySelector("#pm10");
const $pm10Grade = document.querySelector("#pm10Grade");
// 초단기예보
const $fcstData = document.querySelector("#fcstData");

/**
 * 사용자의 위치를 출력하는 함수 - draw.js
 */
function drawPosition() {
  $location.innerText = `${position.address.city} ${position.address.quarter}`;
}

/**
 * 초단기실황 데이터를 출력하는 함수 - draw.js
 */
function drawNcst() {
  // 날씨에 맞는 이미지를 불러와서 적용
  const weatherImg = getWeatherImage(forecastData.lgt[0], nowcastData.pty[0], forecastData.sky[0], nowcastData.rn1[0]);
  $ncstImg.src = weatherImg.src;
  $ncstImg.alt = weatherImg.alt;

  // 강우 여부에 따라 강수량 우산 이미지 설정
  const umbrellaImg = getUmbrellaImg(nowcastData.rn1[0]);
  $ncstPrecipitationImg.src = umbrellaImg.src;
  $ncstPrecipitationImg.alt = umbrellaImg.alt;

  // 초단기 실황 데이터 값 출력
  $ncstTemp.innerText = `${nowcastData.t1h[0]}°`;
  $ncstPrecipitation.innerText = `강수량 ${nowcastData.rn1[0]} mm`;
  $ncstHumidity.innerText = `습도 ${nowcastData.reh[0]} %`;
}

/**
 * 초단기예보 데이터를 출력하는 함수 - draw.js
 */
function drawFcst() {

  // 총 6개의 초단기예보 데이터를 출력
  for (let i = 0; i < forecastData.fcstTime.length; i++) {
    const weatherImg = getWeatherImage(forecastData.lgt[i], forecastData.pty[i], forecastData.sky[i], forecastData.rn1[i]);
    const umbrellaImg = getUmbrellaImg(forecastData.rn1[i]);
    let rn1Str = "";
    const rn1 = forecastData.rn1[i];

    //초단기예보과 초단기실황의 강수 값이 달라 수정
    if (rn1 === "0") {
      rn1Str = `강수 없음`;
    } else {
      rn1Str = `${rn1}`;
    }
    
    // 초단기예보 출력을 위한 HTML
    const fcstDataForm = `
        <li>
          <div class="pl-5">
            <div class="flex mb-2">
              <img class="w-6 mr-2" src="${weatherImg.src}" alt="${weatherImg.alt}" />
              <p>${forecastData.t1h[i]}°</p>
            </div>
            <div class="flex mb-2">
              <img class="w-6 mr-2" src="${umbrellaImg.src}" alt="${umbrellaImg.alt}" />
              <p>${rn1Str}</p>
            </div>
            <h3 class="font-bold text-center">${forecastData.fcstTime[i].slice(0, 2)}:00</h3>
          </div>
        </li>
      `;

    // 초기단기예보 데이터 출력
    $fcstData.insertAdjacentHTML("beforeend", fcstDataForm);
  }
}

/**
 * 미세먼지 데이터를 출력하는 함수 - draw.js
 */
function drawPM() {
  const pm = checkPM(particulateMatterData[0]);

  $station.innerText = `${pm.station} 측정소`;
  $pm25.innerText = `${pm.pm25}`;
  $pm25.style.backgroundColor = setPMBackgroundColor(pm.pm25Grade);
  $pm25Grade.innerText = `${pm.pm25Grade}`;
  $pm10.innerText = `${pm.pm10}`;
  $pm10.style.backgroundColor = setPMBackgroundColor(pm.pm10Grade);
  $pm10Grade.innerText = `${pm.pm10Grade}`;
}

/**
 * API로부터 받아온 미세먼지 데이터를 가져와서 값을 확인 및 수정해서 return 해주는 함수- draw.js
 * @param {Object} pmData 
 */
function checkPM(pmData) {
  // return 할 미세먼지 데이터
  let returnData = {
    station: "",
    pm10: "",
    pm10Grade: "",
    pm25: "",
    pm25Grade: "",
  };

  // 미세먼지 측정소 저장
  returnData.station = pmData.stationName;

  // 미세먼지 값이 있다면 checkPMGrade() - draw.js 실행해서 미세먼지 등급 저장. 그렇지 않다면 "데이터 없음"을 반환
  if (pmData.pm10 != "-") {
    returnData.pm10 = pmData.pm10;
    returnData.pm10Grade = checkPMGrade("pm10", pmData.pm10);
  } else {
    returnData.pm10 = "-";
    returnData.pm10Grade = "데이터 없음";
  }

  if (pmData.pm25 != "-") {
    returnData.pm25 = pmData.pm25;
    returnData.pm25Grade = checkPMGrade("pm25", pmData.pm25);
  } else {
    returnData.pm25 = "-";
    returnData.pm25Grade = "데이터 없음";
  }
  return returnData
}

/**
 * 미세먼지 값을 받아서 등급 값을 String Type으로 return 해주는 함수- draw.js
 * @param {String} type
 * @param {String} pmGradeData 
 */
function checkPMGrade(type, pmGradeData) {
  if (type === "pm10") {
    // PM 10 미세먼지 값이 들어왔을 때 기준
    if (pmGradeData > 0 && pmGradeData <= 30) {
      return "좋음";
    } else if (pmGradeData > 31 && pmGradeData <= 80) {
      return "보통";
    } else if (pmGradeData > 81 && pmGradeData <= 150) {
      return "나쁨";
    } else if (pmGradeData > 151) {
      return "매우 나쁨";
    } else {
      return "데이터 없음";
    }
  } else if (type === "pm25") {
    // PM 2.5 미세먼지 값이 들어왔을 때 기준
    if (pmGradeData > 0 && pmGradeData <= 15) {
      return "좋음";
    } else if (pmGradeData > 16 && pmGradeData <= 35) {
      return "보통";
    } else if (pmGradeData > 36 && pmGradeData <= 75) {
      return "나쁨";
    } else if (pmGradeData > 76) {
      return "매우 나쁨";
    } else {
      return "데이터 없음";
    }
  }
}

/**
 * 미세먼지 등급 값을 받아서 등급에 맞는 Background Color를 String Type으로 return 해주는 함수 - draw.js
 * @param {String} pmGradeData 
 */
function setPMBackgroundColor (pmGradeData) {
  if (pmGradeData === "좋음") {
    return "#5ca0ff";
  } else if (pmGradeData === "보통") {
    return "#5cc339";
  } else if (pmGradeData === "나쁨") {
    return "#eda05c";
  } else if (pmGradeData === "매우 나쁨") {
    return "#ea665c";
  } else {
    return "";
  }
}

/**
 * 각 예보 별 값을 받아서 상황에 맞는 날씨 별 이미지를 return 해주는 함수 - draw.js
 * @param {String} lightning
 * @param {String} precipitationType
 * @param {String} sky
 * @param {String} rn1
 */
function getWeatherImage(lightning, precipitationType, sky, rn1) {
  if (lightning === "0") {
    // 번개 칠 때
    if (precipitationType === "0") {
      // 비가 안올 때
      if (rn1 != "강수없음" && rn1 > 0) {
        // 강수형태 값이 0이지만 강수량이 있을 때 - shower.png
        return imgData[5];
      } else {
        if (sky === "1") {
          // 맑음 (구름이 0~5할의 상태) - clear.png
          return imgData[0];
        } else if (sky === "3") {
          // 구름많음 (구름이 6~8할의 상태) - mostlyCloudy.png
          return imgData[1];
        } else if (sky === "4") {
          // 흐림 (구름이 9~10할의 상태) - cloudy.png
          return imgData[2];
        }
      }
    } else if (precipitationType === "1" || precipitationType === "2") {
      // 비 or 비/눈 - rain.png
      return imgData[3];
    } else if (precipitationType === "3") {
      // 눈 - snow.png
      return imgData[4];
    } else if (precipitationType === "5" || precipitationType === "6") {
      // 빗방울 or 빗방울눈날림 (비 0.1mm 미만) - shower.png
      return imgData[5];
    } else if (precipitationType === "7") {
      // 눈날림 (눈 0.1cm 미만) - snowDrifting.png
      return imgData[6];
    }
  } else if (lightning < 0) {
    // 번개 안칠 때
    if (rn1 != "강수없음" || "0") {
      // 번개 치는데 비가 안올 때 - lightning.png
      return imgData[7];
    } else {
      // 번개 치면서 비도 올 때 - thunderStorm.png
      return imgData[8];
    }
  }
}

/**
 * 1시간 강수량 값을 받아서 상황에 맞는 강수량 이미지를 return 해주는 함수 - draw.js
 * @param {String} rn1 
 */
function getUmbrellaImg(rn1) {
  if (rn1 != "강수없음" && rn1 != "0") {
    return imgData[9];
  } else {
    return imgData[10];
  }
}