window.addEventListener('load', () => {
  let lat;
  let long;
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector('.temperature-description');
  let locationTimezone = document.querySelector('.location-timezone');
  let iconDescription = document.querySelector('.icon-description');
  let temperature = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //proxy for log in chrome;
      //const proxy = 'http://cors-anywhere.herokuapp.com/';
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3f89622dbe62bef8423e3ec6a9908af3&units=metric&lang=vi`;

      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          const locationName = data.name;
          const { country } = data.sys;

          //set DOM elements from API

          temperatureDegree.textContent = Math.round((temp) * 100) / 100;
          //not format for integer
          // temperatureDegree.textContent = (temp - 273.15).toFixed(2);

          temperatureDescription.textContent = description;
          locationTimezone.textContent = `${locationName}, ${country}`;

          iconDescription.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>`;

          //change temperature
          temperature.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'C') {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = Math.round(((temp * 9 / 5) + 32) * 100) / 100;
              console.log('abc');
            } else {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.round(temp * 100) / 100;
            }
          });
        });
    });
  } else {
    console.log('Cant get Location!!!');
  }
});