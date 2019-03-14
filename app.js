/**
 * After page loads.
 */
window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4849f4eaa5e0c3e55a9c93d25cbb52fd/${lat},${long}`;


            fetch(api).then((response) => {
                return response.json();
            }).then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                //Set DOM Elements from the API.
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Forumula for celcius:
                let celcius = (temperature - 32) * (5 / 9);


                setIcons(icon, document.querySelector(".icon"));

                //change temperature to celcius/fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                })
            })

        });


    } else {
        alert('wtf');
        h1.textContent = "Yo, f u"
    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);


    }


});