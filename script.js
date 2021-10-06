let weather = {
    "apiKey": "1d1fce82f4dfd59cc524b6c7e70e6f7b",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="
            + city 
            +"&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    fetchForecast: function (lon, lat) {
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.apiKey}&units=metric`
            )
            .then((response) => response.json())
            .then((data) => this.displayForecast(data));
    },

    displayWeather: function (data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText= "Humidity: " + humidity + " %";
        document.querySelector(".wind").innerText= "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
        const lat=data.coord.lat;
        const lon=data.coord.lon;
        this.fetchForecast(lon, lat)
    },

    displayForecast: function (data) {
        for (x=0;x<5;x++){
            let date=unixToDate(data.daily[x].dt).split(", ")
            console.log(date)
            let minTemp=data.daily[x].temp.min;
            let maxTemp=data.daily[x].temp.max;
            let icon=data.daily[x].weather[0].icon;
            let iconsrc="http://openweathermap.org/img/wn/" + icon + ".png";
            let forecastData=data.daily[x].weather[0].main;
    
            document.getElementById("day"+(x+1)).innerHTML=
            "<b>"+ date[0]+"</b><p>"+
            "<img src=" + iconsrc +"></img>"+
            forecastData+
            "<br>"+
            "Mintemp:" + minTemp.toFixed(0)+" °C"+
            "<br>"+
            "Maxtemp:" + maxTemp.toFixed(0)+" °C"+"</p>"
        }
    },

    search: function (){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

function unixToDate(unixDate) {
    let dateOptions = {
      weekday: "long",
           year: "numeric",
      month: "long",
      day: "numeric",
      time: "numeric",
    };
    let clockOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    const dateConvert = new Date(unixDate * 1000);
    const date = dateConvert.toLocaleDateString("en-EN", dateOptions);
    console.log(date);
    return date;
  }

document.querySelector(".search button")
.addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter"){
        weather.search();
    }
});
weather.fetchWeather("Gävle")
