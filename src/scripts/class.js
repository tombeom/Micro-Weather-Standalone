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

const position = {
  coordinate: {latitude: "", longitude: ""},
  gridCoordinate: {x: "", y: ""},
  tmCoordinate: {x: "", y: ""},
  address: {
    country: "",
    province: "",
    city: "",
    quarter: "",
    road: "",
    building: "",
  },
};

const nowcastData = {
  pty: [],
  reh: [],
  rn1: [],
  t1h: [],
};

const forecastData = {
  fcstTime: [],
  lgt: [],
  pty: [],
  rn1: [],
  sky: [],
  t1h: [],
};

const particulateMatterData = {
  0: {
    stationName: "",
    pm10: "",
    pm10Flag: "",
    pm10Grade: "",
    pm25: "",
    pm25Flag: "",
    pm25Grade: "",
  },
  1: {
    stationName: "",
    pm10: "",
    pm10Flag: "",
    pm10Grade: "",
    pm25: "",
    pm25Flag: "",
    pm25Grade: "",
  },
  2: {
    stationName: "",
    pm10: "",
    pm10Flag: "",
    pm10Grade: "",
    pm25: "",
    pm25Flag: "",
    pm25Grade: "",
  },
  nearestStation: [],
};
