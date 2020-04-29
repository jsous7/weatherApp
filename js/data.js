window.addEventListener("load", () => {

    const apiKey = '577b04da4348454d19cdf298223b8163';

    const locationElement = document.querySelector('.location-timezone');
    const iconElement = document.querySelector('.weather_icons');
    const degreeElement = document.querySelector('.temperature-degree');
    const descriptionElement = document.querySelector('.temperature-description');

    //Getting the geolocation of the client's browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            
            //Setting the public API endpoint
            const endpoint = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;
            
            //Performing the API request
            fetch(endpoint)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //Getting only the required attributes for the frontend
                    const { temperature, weather_descriptions, weather_icons} = data.current;
                    const { timezone_id} = data.location;

                    //Setting new values on the DOM elements
                    locationElement.textContent = timezone_id;
                    iconElement.src = weather_icons.toString();
                    degreeElement.textContent = temperature + ' °C';
                    descriptionElement.textContent = weather_descriptions;
                }).catch((error) => {
                    console.log(error);
                });
        });
    }
});