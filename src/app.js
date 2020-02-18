const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mapBox = require('../services/mapBoxApi')
const darkSky = require('../services/darkSkyApi')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

/*
**	Faire un site de presentation de mes projets persos en web
**	Integrer une page meteo qui prends en input une adresse et en output sors la meteo actuelle
*/

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			title: 'Weather App',
			error: 'L\'adresse fournie est invalide',
		})
	}
	mapBox.geocode(req.query.address, (error, {latitude, longitude, place}) => {
		if (error) {
			return console.log('Error', error)
		}
		darkSky.weather(latitude, longitude, (error, {temperature, summary, rainPourcent}) => {
			if (error) {
				return console.log('Error', error)
			}
			res.send({
				title: 'Weather App',
				message: '',
				address: place,
				temperature: temperature + '°C',
				weatherIcon: 'meteo-logo.png',
				summary: summary
			})
		})
	})
})

app.get('*', (req, res) => {
	if (!req.query.address) {
		return res.render('index', {
			title: 'Weather App',
			message: '',
			address: '',
			temperature: '',
			weatherIcon: 'meteo-logo.png',
			summary: ''
		})
	}
	mapBox.geocode(req.query.address, (error, {latitude, longitude, place}) => {
		if (error) {
			return console.log('Error', error)
		}
		darkSky.weather(latitude, longitude, (error, {temperature, summary, rainPourcent}) => {
			if (error) {
				return console.log('Error', error)
			}
			res.render('index', {
				title: 'Weather App',
				message: '',
				address: place,
				temperature: temperature + '°C',
				weatherIcon: 'meteo-logo.png',
				summary: summary
			})
		})
	})
	
})

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})
