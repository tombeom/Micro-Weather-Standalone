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
        setBG();
      })
      .catch((e) => {
        console.log(`Couldn't Get Sun Rise Set Data\nAPI Call Failed`);
        console.log(e)
      });
  }

function setBG() {
  const nowTime = new Date().getHours().toString() + new Date().getMinutes().toString();

  if (parseInt(nowTime) < parseInt(sunRiseSetData.sunrise) || parseInt(nowTime) > parseInt(sunRiseSetData.sunset)) {
    document.querySelector("#popup").style.backgroundColor = "#1f242e";
  } else {
    document.querySelector("#popup").style.backgroundColor = "#5490e5";
  }
}