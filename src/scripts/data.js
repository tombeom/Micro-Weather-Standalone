// index.html 로드 시 사용되는 날씨 데이터를 초기화 해둔 javascript

// 기상 상태 이미지
const imgData = [
  {
    idx: "0",
    src: "images/clear.png",
    alt: "맑음",
    id: "clear",
  },
  {
    idx: "1",
    src: "images/mostlyCloudy.png",
    alt: "구름많음",
    id: "mostlyCloudy",
  },
  {
    idx: "2",
    src: "images/cloudy.png",
    alt: "흐림",
    id: "cloudy",
  },
  {
    idx: "3",
    src: "images/rain.png",
    alt: "비 혹은 비/눈",
    id: "rain",
  },
  {
    idx: "4",
    src: "images/snow.png",
    alt: "눈",
    id: "snow",
  },
  {
    idx: "5",
    src: "images/shower.png",
    alt: "빗방울 혹은 빗방울눈날림 (강수량 0.1mm 미만)",
    id: "shower",
  },
  {
    idx: "6",
    src: "images/snowDrifting.png",
    alt: "눈날림 (적설량 0.1cm 미만)",
    id: "snowDrifting",
  },
  {
    idx: "7",
    src: "images/lightning.png",
    alt: "낙뢰",
    id: "lightning",
  },
  {
    idx: "8",
    src: "images/thunderStorm.png",
    alt: "뇌우",
    id: "thunderStorm",
  },
  {
    idx: "9",
    src: "images/rainUmbrella.png",
    alt: "비 오는 우산",
    id: "rainUmbrella",
  },
  {
    idx: "10",
    src: "images/foldedUmbrella.png",
    alt: "접힌 우산",
    id: "foldedUmbrella",
  },
];

// 현재 위치 데이터
const position = {
  coordinate: {latitude: "", longitude: ""}, // 위경도 데이터
  gridCoordinate: {x: "", y: ""}, // 기상청 좌표계 데이터
  tmCoordinate: {x: "", y: ""}, // TM 중부원점 좌표계 데이터
  address: { // 위경도 기반 역지오코딩 데이터
    country: "",
    province: "",
    city: "",
    quarter: "",
    road: "",
    building: "",
  },
};

// 일출, 일몰 데이터
const sunRiseSetData = {
  sunrise: "",
  sunset: "",
}

// 초단기실황 데이터
const nowcastData = {
  pty: [],
  reh: [],
  rn1: [],
  t1h: [],
};

// 초단기예보 데이터
const forecastData = {
  fcstTime: [],
  lgt: [],
  pty: [],
  rn1: [],
  sky: [],
  t1h: [],
};

// 미세먼지 데이터
const particulateMatterData = {
  // 가장 가까운 대기 측정소 3곳의 데이터를 저장하기 위한 3개의 미세먼지 데이터
  // 0번 데이터만 불러와서 사용
  0: {
    stationName: "", // 측정소 명
    pm10: "", // PM 10 농도
    // pm10Flag: "", // PM 10 측정 자료 상태 정보 (데이터가 불안정함으로 사용하지 않음)
    // pm10Grade: "", // PM 10 24시간 등급 (24시간 등급이기 때문에 측정소 통신장애 시 불안정 데이터가 생기므로 사용하지 않음, 대신 checkPMGrade() - draw.js 사용)
    pm25: "", // PM 2.5 농도
    // pm25Flag: "", // PM 2.5 측정 자료 상태 정보 (데이터가 불안정함으로 사용하지 않음)
    // pm25Grade: "", // PM 2.5  24시간 등급 (24시간 등급이기 때문에 측정소 통신장애 시 불안정 데이터가 생기므로 사용하지 않음, 대신 checkPMGrade() - draw.js 사용)
  },
  // 1: {
  //   stationName: "",
  //   pm10: "",
  //   pm10Flag: "",
  //   pm10Grade: "",
  //   pm25: "",
  //   pm25Flag: "",
  //   pm25Grade: "",
  // },
  // 2: {
  //   stationName: "",
  //   pm10: "",
  //   pm10Flag: "",
  //   pm10Grade: "",
  //   pm25: "",
  //   pm25Flag: "",
  //   pm25Grade: "",
  // },
  nearestStation: [], // 가장 가까운 대기 측정소 3곳을 저장
};
