"use strict";

const Twit = require("twit");
const T = new Twit(require("./twitter_credentials"));

function reply(to, message) {
	T.post("statuses/update", {
		status: message,
		in_reply_to_status_id: to
	}, function (err, data, response) {
		console.info("tweet posted:", "<" + message + ">");
	});
}

function onMention(callback) {
	let stream = T.stream("statuses/filter", {
		track: "FacelessRob"
	});

	stream.start();

	stream.on("tweet", function (tweet) {
		console.log("**********\nheard a new mention");
		callback(tweet);
	});
	stream.on("limit", function (limitMessage) {
		console.log("limit has been reached")
	})

	stream.on("connect", function (limitMessage) {
		console.log("connecting...");
	});

	stream.on("error", function (err) {
		console.log("connecting...", err);
	});

	stream.on("connected", function (limitMessage) {
		console.log("...connected");
	});

	console.log("listening to mentions...");

	process.on("SIGINT", function () {
		console.log("\nstopped listening.");
		stream.stop();
		process.exit();
	});

}

module.exports = {
	reply: reply,
	onMention: onMention
};
