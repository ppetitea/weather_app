const form = document.querySelector('form')
const search = document.querySelector('input')

const display_forecast = (message = '', location = '', summary = '', iconPath = null) => {
	const messageEl = document.getElementById('message')
	const locationEl = document.getElementById('location')
	const summaryEl = document.getElementById('forecast')
	const weatherLogo = document.getElementById('forecast-logo')

	messageEl.innerHTML = message
	locationEl.innerHTML = location
	summaryEl.innerHTML = summary
	if (iconPath) {
		weatherLogo.style.display = 'flex'
		weatherLogo.src = iconPath
	} else {
		weatherLogo.style.display = 'none'
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
		message.innerHTML = 'Loading...'
		fetch('/weather?address=' + search.value).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				display_forecast(data.error)
			} else {
				display_forecast('', data.address,
					data.summary + ' ' + data.temperature,
					'/img/' + data.weatherIcon)
			}
		})
	})
})
