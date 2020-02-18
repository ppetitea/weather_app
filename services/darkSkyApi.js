const request = require('request')

const weather = (latitude, longitude, callback) => {
	const weatherApi = {
		root: 'https://api.darksky.net/forecast/',
		key: 'fa6f80f40319fd5680f2f929253123f9',
		location: {
			lat: latitude,
			long: longitude,
			getLocation() {
				return (this.lat + ',' + this.long)
			}
		},
		params: {
			lang: 'lang=fr',
			units: 'units=si',
			getUrlParams() {
				return (this.lang + '&' + this.units)
			}
		},
		getUrl() {
			return (this.root + this.key + '/' + this.location.getLocation() + '?'
					+ this.params.getUrlParams())
		}
	}
	request({ url: weatherApi.getUrl(), json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to weather services', null)
		} else if (response.body.error) {
			callback(response.body.error, null)
		} else if (response.body.currently === undefined) {
			callback(response.body, null)
		} else {
			callback(null, {
				summary: response.body.currently.summary,
				temperature: response.body.currently.temperature,
				rainPourcent: response.body.currently.precipProbability,
			})
		}
	})
}

exports.weather = weather