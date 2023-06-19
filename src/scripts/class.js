const imgData = [
  {
    id: "0",
    src: "images/clear.png",
    alt: "맑음",
  },
  {
    id: "1",
    src: "images/mostlyCloudy.png",
    alt: "구름많음",
  },
  {
    id: "2",
    src: "images/cloudy.png",
    alt: "흐림",
  },
  {
    id: "3",
    src: "images/rain.png",
    alt: "비 혹은 비/눈",
  },
  {
    id: "4",
    src: "images/snow.png",
    alt: "눈",
  },
  {
    id: "5",
    src: "images/shower.png",
    alt: "빗방울 혹은 빗방울눈날림 (강수량 0.1mm 미만)",
  },
  {
    id: "6",
    src: "images/snowDrifting.png",
    alt: "눈날림 (적설량 0.1cm 미만)",
  },
  {
    id: "7",
    src: "images/lightning.png",
    alt: "낙뢰",
  },
  {
    id: "8",
    src: "images/thunderStorm.png",
    alt: "뇌우",
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

let nowcastData = [];
let forecastData = [];
let particulateMatterData = [];
