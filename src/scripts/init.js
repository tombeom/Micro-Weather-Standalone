function init(position) {
  setCoordinate(position);
  setAddress();
  setGeoCoordToGridCoord();
  getNowcast();
  getForecast();
  setTimeout(function () {
    drawNcst();
    drawFcst();
  }, 700);
}

navigator.geolocation.getCurrentPosition(
  init,
  getPositionError,
  (options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  })
);

// $refresh.addEventListener("click", () => {
//   navigator.geolocation.getCurrentPosition(
//     init,
//     getPositionError,
//     (options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     })
//   );
// });
