function getDate() {
  const todayDate = new Date();
  const year = todayDate.getFullYear().toString();
  const month = ("00" + (todayDate.getMonth() + 1).toString()).slice(-2);
  const day = ("00" + todayDate.getDate().toString()).slice(-2);
  const dateFormat = year + month + day;

  return dateFormat;
}

function getTime() {
  const todayTime = new Date();
  const rawHour = parseInt(("0" + todayTime.getHours().toString()).slice(-2));
  const rawMinute = parseInt(("0" + todayTime.getMinutes().toString()).slice(-2));

  let hourFormat = "";

  if (rawMinute < 45) {
    hourFormat = (rawHour - 1).toString() + "00";
  } else {
    hourFormat = rawHour.toString() + "00";
  }
  return hourFormat;
}

async function getWeather(gridX, gridY) {
  const url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
  const params = {
    serviceKey: "YOUR API KEY",
    numOfRows: 30,
    pageNo: 1,
    dataType: "JSON",
    base_date: getDate(),
    base_time: getTime(),
    nx: gridX,
    ny: gridY,
  };

  const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
  console.log(requestUrl);
  const c = await fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.response);

      //document.querySelector("body").insertAdjacentHTML("afterbegin", response.response.body.items.item[0].obsrValue);
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

navigator.geolocation.getCurrentPosition(getCoord, getCoordError, getCoordOptions);
