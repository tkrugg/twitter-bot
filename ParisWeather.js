"use strict";
const request = require("request");
const credentials = require("./weather_credentials");

function get() {
	let productGroup = "observations",
		geocode = "48.8534100,2.3488000",
		url = `https://${credentials.host}/api/weather/v2/${productGroup}/current?geocode=${geocode}&language=en&units=m`;

	return new Promise(function (resolve, reject) {
		request({
			uri: url,
			auth: {
				user: credentials.username,
				pass: credentials.password
			}
		}, function (err, response, body) {
			if (err) {
				console.log(err);
				reject(err);
			}
			body = JSON.parse(body);

			let desc = body.observation.phrase_22char,
				temp = body.observation.metric.temp;
			resolve({
				temp: temp,
				desc: desc
			});
		});
	});
}

module.exports = {
	get: get
}
