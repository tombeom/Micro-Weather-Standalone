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
];

class NowcastWeather {
  constructor(obj) {
    this.category = obj.category;
    this.obsrValue = obj.obsrValue;
  }
}

class ForecastWeather {
  constructor(obj) {
    this.fcstTime = obj.fcstTime;
    this.category = obj.category;
    this.fcstValue = obj.fcstValue;
  }
}

class ParticulateMatter {
  constructor() {}
}

const coordinate = {
  x: "",
  y: "",
};

const gridCoordinate = {
  x: "",
  y: "",
};

const address = {
  country: "",
  province: "",
  city: "",
  quarter: "",
  road: "",
  building: "",
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
}

const particulateMatterData = [];