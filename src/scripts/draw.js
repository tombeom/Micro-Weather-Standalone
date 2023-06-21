const $ncstImg = document.querySelector("#ncstImg");
const $ncstTemp = document.querySelector("#ncstTemp");
const $location = document.querySelector("#location");
const $ncstPrecipitation = document.querySelector("#ncstPrecipitation");
const $ncstHumidity = document.querySelector("#ncstHumidity");

function drawNcst() {
  const img = getImage(forecastData.lgt[0], nowcastData.pty[0], forecastData.sky[0], nowcastData.rn1[0])

  $ncstImg.src = img.src
  $ncstImg.alt = img.alt

  $ncstTemp.innerText = `${nowcastData.t1h[0]}°`;
  $location.innerText = `${address.city.toString()} ${address.quarter.toString()}`
  $ncstPrecipitation.innerText = `강수량 ${nowcastData.rn1[0]} mm`;
  $ncstHumidity.innerText = `습도 ${nowcastData.reh[0]} %`
}

function drawFcst() {
  const $fcstData = document.querySelector("#fcstData")

  for (let i = 0; i < forecastData.fcstTime.length; i++) {
    const img = getImage(forecastData.lgt[i], forecastData.pty[i], forecastData.sky[i], forecastData.rn1[i])
    const fcstDataForm = `
        <li>
          <div class="mx-2">
            <div class="flex mb-2">
              <img class="w-6 mr-2" src="${img.src}" alt="${img.alt}" />
              <p>${forecastData.t1h[i]}°</p>
            </div>
            <div class="flex mb-2">
              <img class="w-6 mr-2" src="images/umbrella.png" alt="precipitation" />
              <p>${forecastData.rn1[i]}mm</p>
            </div>
            <h3 class="font-bold text-center">${forecastData.fcstTime[i].slice(0, 2)}:00</h3>
          </div>
        </li>
      `;

    $fcstData.insertAdjacentHTML("beforeend", fcstDataForm);
  }
}


function getImage(lightning, precipitationType, sky, rn1) {
  if (lightning === "0") {
    // 번개 칠 때
    if (precipitationType === "0") {
      // 비가 안올 때
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