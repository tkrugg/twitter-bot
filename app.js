"use strict";

const Twitter = require("./Twitter"),
	ParisWeather = require("./ParisWeather");

Twitter.onMention(function (tweet) {
	var asker = tweet.user.screen_name;
	var text = tweet.text;

	if (isAskingForName(text)) {
		console.log(`@${asker} is asking for my name`);
		Twitter.reply(tweet.id, "@" + asker + " man has no name");
	} else if (isAskingForWeather(text)) {
		console.log(`@${asker} is asking for current weather in paris`);

		ParisWeather.get().then(function (weather) {
			console.log("... answering", weather);
			Twitter.reply(tweet.id, `@${asker} currently the weather in Paris is ${weather.desc}.
					Temperature feels like ${weather.temp}°C`);
		});
	}
});

function isAskingForName(text) {
	return (new RegExp("What's( +)your( +)name", "gi")).test(text)
}

function isAskingForWeather(text) {
	return (new RegExp("weather", "gi")).test(text)
}
