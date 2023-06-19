const $refresh = document.querySelector("#refresh");

function init(position) {
  setCoordinate(position);
  setAddress();
  setGeoCoordToGridCoord();
}

$refresh.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    init,
    getPositionError,
    (options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
  );
});
