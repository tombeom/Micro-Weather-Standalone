// index.html 로드 시 일출, 일몰 데이터를 받아오는 javascript

/**
 * 한국천문연구원 OPEN API를 사용해 위경도 데이터를 바탕으로 현재 위치의 일출, 일몰 데이터를 조회, 저장하는 함수 - sunRiseSet.js
 */
// https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012688
async function getSunRiseSetData() {
    const url = "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo";
    const params = {
      serviceKey: "YOUR API KEY",
      locdate: getDate(),
      latitude: position.coordinate.latitude,
      longitude: position.coordinate.longitude,
      dnYn: "Y",
    };
    const requestUrl = `${url}?${new URLSearchParams(params).toString()}`;
    const c = await fetch(requestUrl)
      .then((res) => res.text())
      .then((res) => {
        const domParser = new DOMParser();
        const data = domParser.parseFromString(res, "text/xml");
        sunRiseSetData.sunrise = data.getElementsByTagName("sunrise")[0].textContent.trim();
        sunRiseSetData.sunset = data.getElementsByTagName("sunset")[0].textContent.trim();
        setBG(); // setBG() - sunRiseSet.js 실행
      })
      .catch((e) => {
        console.log(`Couldn't Get Sun Rise Set Data\nAPI Call Failed`);
      });
  }

/**
 * 일출, 일몰 데이터를 바탕으로 body Backgroud Color를 설정하는 함수 - sunRiseSet.js
 */
function setBG() {
  const nowTime = new Date().getHours().toString() + new Date().getMinutes().toString();

  if (parseInt(nowTime) < parseInt(sunRiseSetData.sunrise) || parseInt(nowTime) > parseInt(sunRiseSetData.sunset)) {
    // 일몰 시간 이후, 일출 시간 전에는 어두운 배경색 설정
    document.querySelector("#popup").style.backgroundColor = "#1f242e";
  } else {
    // 이외에는 밝은 배경색 설정 (일출 시간 이후, 일몰 시간 전)
    document.querySelector("#popup").style.backgroundColor = "#5490e5";
  }
}