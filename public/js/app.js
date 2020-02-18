const form = document.querySelector('form')
const search = document.querySelector('input')
const forecastLogo = document.getElementById('forecast-logo')

form.addEventListener('submit', (e) => {
	e.preventDefault()
		const message = document.getElementById('message')
		const location = document.getElementById('location')
		const forecast = document.getElementById('forecast')
		message.innerHTML = 'Loading...'
		fetch('/weather?address=' + search.value).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				message.innerHTML = data.error;
				forecastLogo.style.display = 'none';
				location.style.display = 'none';
				forecast.style.display = 'none';
			} else {
				message.innerHTML = ''
				forecastLogo.style.display = 'flex';
				forecastLogo.src = '/img/' + data.weatherIcon
				location.innerHTML = data.address;
				forecast.innerHTML = data.summary + ' ' + data.temperature;
			}
		})
	})
})
