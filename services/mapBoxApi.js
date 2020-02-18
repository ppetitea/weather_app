const request = require('request')

const geocode = (place, callback) => {
	const locationApi = {
		root: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
		place: place,
		format: 'json',
		params: {
			key: 'access_token=pk.eyJ1IjoicHBldCIsImEiOiJjazZvOGQ0cDgxMW5hM2xsaXlqcnNqMHFwIn0.hRTzEogiEhG_vEDPrUoGmA',
			limit: 'limit=1',
			getUrlParams() {
				return (this.key + '&' + this.limit)
			}
		},
		getUrl() {
			return (this.root + this.place + '.' + this.format + '?'
					+ this.params.getUrlParams())
		}
	}
	request({ url: locationApi.getUrl(), json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to location services', null)
		} else if (response.body.features.length === 0) {
			callback('Unable to find location, Try another search.', undefined)
		} else {
			callback(null, {
				longitude: response.body.features[0].center[0],
				latitude: response.body.features[0].center[1],
				place: response.body.features[0].place_name
			})
		}
	})
}

exports.geocode = geocode