let weather = {
	apiKey: '58e30e9345aa1121bb7caba5ea34b2b9',
	fetchWeather: function (city) {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&units=metric&appid=' +
				this.apiKey,
		)
			.then((response) => {
				if (!response.ok) {
					alert('No weather found.');
					throw new Error('No weather found.');
				}
				return response.json();
			})
			.then((data) => this.displayWeather(data))
			.catch((err) => console.error('you have some code problem', err));
	},
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		document.querySelector('.city').innerText = 'Weather in ' + name;
		document.querySelector('.icon').src =
			'https://openweathermap.org/img/wn/' + icon + '.png';
		document.querySelector('.description').innerText = description;
		document.querySelector('.temp').innerText = temp + '°C';
		document.querySelector('.humidity').innerText =
			'Humidity : ' + humidity + '%';
		document.querySelector('.wind').innerText =
			'Wind speed : ' + speed + ' km/h';
		document.querySelector('.weather').classList.remove('reloading');
	},
	search: function () {
		this.fetchWeather(document.querySelector('.search-bar').value);
	},
};

document.querySelector('.search button').addEventListener('click', function () {
	weather.search();
});

document
	.querySelector('.search-bar')
	.addEventListener('keyup', function (event) {
		if (event.key == 'Enter') {
			weather.search();
		}
	});

weather.fetchWeather(init());

function init() {
	navigator.geolocation.getCurrentPosition(function (response) {
		var mapOptions = {
			center: new google.maps.LatLng(
				response.coords.latitude,
				response.coords.longitude,
			),
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.HYBRID,
		};

		var map = new google.maps.Map(document.getElementById('map'), mapOptions);

		google.maps.event.addListener(map, 'click', function (event) {
			var myLatLng = event.latLng;
			var lat = myLatLng.lat();
			var lng = myLatLng.lng();

			document.getElementById('lat').value = lat;
			document.getElementById('lang').value = lng;
		});
	});
}
