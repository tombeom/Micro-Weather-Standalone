const $ncstImg = document.querySelector("#ncstImg");
const $ncstPrecipitationImg = document.querySelector("#ncstPrecipitationImg")
const $ncstTemp = document.querySelector("#ncstTemp");
const $location = document.querySelector("#location");
const $ncstPrecipitation = document.querySelector("#ncstPrecipitation");
const $ncstHumidity = document.querySelector("#ncstHumidity");
const $station = document.querySelector("#station");
const $pm25 = document.querySelector("#pm25");
const $pm25Grade = document.querySelector("#pm25Grade");
const $pm10 = document.querySelector("#pm10");
const $pm10Grade = document.querySelector("#pm10Grade");


function drawPosition() {
  $location.innerText = `${position.address.city} ${position.address.quarter}`
}

function drawNcst() {
  const weatherImg = getWeatherImage(forecastData.lgt[0], nowcastData.pty[0], forecastData.sky[0], nowcastData.rn1[0])
  $ncstImg.src = weatherImg.src
  $ncstImg.alt = weatherImg.alt

  const umbrellaImg = getUmbrellaImg(nowcastData.rn1[0])
  $ncstPrecipitationImg.src = umbrellaImg.src
  $ncstPrecipitationImg.alt = umbrellaImg.alt

  $ncstTemp.innerText = `${nowcastData.t1h[0]}°`;
  $ncstPrecipitation.innerText = `강수량 ${nowcastData.rn1[0]} mm`;
  $ncstHumidity.innerText = `습도 ${nowcastData.reh[0]} %`
}

function drawFcst() {
  const $fcstData = document.querySelector("#fcstData")

  for (let i = 0; i < forecastData.fcstTime.length; i++) {
    const weatherImg = getWeatherImage(forecastData.lgt[i], forecastData.pty[i], forecastData.sky[i], forecastData.rn1[i])
    const umbrellaImg = getUmbrellaImg(forecastData.rn1[i])
    let rn1Str = ""
    const rn1 = forecastData.rn1[i]

    if (rn1 === "0") {
      rn1Str = `강수 없음`
    } else {
      rn1Str = `${rn1}`
    }
    
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

    $fcstData.insertAdjacentHTML("beforeend", fcstDataForm);
  }
}

function drawPM() {
  const pm = checkPM(particulateMatterData[0])

  $station.innerText = `${pm.station} 측정소`
  $pm25.innerText = `${pm.pm25}`
  $pm25.style.backgroundColor = setPMBackgroundColor(pm.pm25Grade)
  $pm25Grade.innerText = `${pm.pm25Grade}`
  $pm10.innerText = `${pm.pm10}`
  $pm10.style.backgroundColor = setPMBackgroundColor(pm.pm10Grade)
  $pm10Grade.innerText = `${pm.pm10Grade}`
}

function checkPM(pmData) {
  let returnData = {
    station: "",
    pm10: "",
    pm10Grade: "",
    pm25: "",
    pm25Grade: "",
  }

  returnData.station = pmData.stationName;

  if (pmData.pm10 != "-") {
    returnData.pm10 = pmData.pm10
    returnData.pm10Grade = checkPMGrade("pm10", pmData.pm10)
  } else {
    returnData.pm10 = "-"
    returnData.pm10Grade = "데이터 없음"
  }

  if (pmData.pm25 != "-") {
    returnData.pm25 = pmData.pm25
    returnData.pm25Grade = checkPMGrade("pm25", pmData.pm25)
  } else {
    returnData.pm25 = "-"
    returnData.pm25Grade = "데이터 없음"
  }
  return returnData
}

function checkPMGrade(type, pmGradeData) {
  if (type === "pm10") {
    if (pmGradeData > 0 && pmGradeData <= 30) {
      return "좋음"
    } else if (pmGradeData > 31 && pmGradeData <= 80) {
      return "보통"
    } else if (pmGradeData > 81 && pmGradeData <= 150) {
      return "나쁨"
    } else if (pmGradeData > 151) {
      return "매우 나쁨"
    } else {
      return "데이터 없음"
    }
  } else if (type === "pm25") {
    if (pmGradeData > 0 && pmGradeData <= 15) {
      return "좋음"
    } else if (pmGradeData > 16 && pmGradeData <= 35) {
      return "보통"
    } else if (pmGradeData > 36 && pmGradeData <= 75) {
      return "나쁨"
    } else if (pmGradeData > 76) {
      return "매우 나쁨"
    } else {
      return "데이터 없음"
    }
  }
}

function setPMBackgroundColor (pmGradeData) {
  if (pmGradeData === "좋음") {
    return "#5ca0ff"
  } else if (pmGradeData === "보통") {
    return "#5cc339"
  } else if (pmGradeData === "나쁨") {
    return "#eda05c"
  } else if (pmGradeData === "매우 나쁨") {
    return "#ea665c"
  } else {
    return ""
  }
}

function getWeatherImage(lightning, precipitationType, sky, rn1) {
  if (lightning === "0") {
    // 번개 칠 때
    if (precipitationType === "0") {
      // 비가 안올 때
      if (rn1 != "강수없음" && rn1 > 0) {
        // pty가 0이지만 강수량이 있을 때
        return imgData[5]
      } else {
        if (sky === "1") {
          // 맑음 (구름이 0~5할의 상태)
          return imgData[0]
        } else if (sky === "3") {
          // 구름많음 (구름이 6~8할의 상태)
          return imgData[1]
        } else if (sky === "4") {
          // 흐림 (구름이 9~10할의 상태)
          return imgData[2]
        }
      }
    } else if (precipitationType === "1" || precipitationType === "2") {
      // 비 or 비/눈
      // 비
      return imgData[3]
    } else if (precipitationType === "3") {
      // 눈
      return imgData[4]
    } else if (precipitationType === "5" || precipitationType === "6") {
      // 빗방울 or 빗방울눈날림 (비 0.1mm 미만)
      // shower
      return imgData[5]
    } else if (precipitationType === "7") {
      // 눈날림 (눈 0.1cm 미만)
      // 눈송이
      return imgData[6]
    }
  } else if (lightning < 0) {
    // 번개 안칠 때
    if (rn1 != "강수없음" || "0") {
      // 번개 치는데 비가 안올 때
      return imgData[7]
    } else {
      // 번개 치면서 비도 올 때
      return imgData[8]
    }
  }
}

function getUmbrellaImg(rn1) {
  if (rn1 != "강수없음" && rn1 > 0) {
    return imgData[9]
  } else {
    return imgData[10]
  }
}