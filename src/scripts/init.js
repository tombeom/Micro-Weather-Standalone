function init(position) {
  setCoordinate(position);
  setAddress();
  convertCoordToGridCoord();
  convertCoordToTMCoord();
  getNowcast();
  setTimeout(() => {
    drawPM();
  }, '1500');
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
