var Discord = require('discord.io');
var request = require('request');
var fs = require('fs');
var download = require('download-file');

var config = require("config.json");
var previousNum = 0;

try {
	previousNum = parseInt(fs.readFileSync("previousNum.txt", "utf8"));
} catch (e) {
	fs.writeFileSync("previousNum.txt", "0", "utf8");
	previousNum = 0;
}

var bot = new Discord.Client({
	token: config.token,
	autorun: true
});

function printComic(comic, channel) {
	bot.sendMessage({
		to: channel,
		message: "XKCD #" + comic.num,
	}, function () {
		bot.sendMessage({
			to: channel,
			message: "__**" + comic.title + "**__",
		}, function () {
			bot.sendMessage({
				to: channel,
				message: comic.img
			}, function () {
				bot.sendMessage({
					to: channel,
					message: "*" + comic.alt + "*",
				}, function () {

				});
			});
		});
	});
	//Old style of sending comics
	/*	bot.sendMessage({
			to: xkcdChannel,
			message: "XKCD #" + comic.num,
		}, function () {
			bot.sendMessage({
				to: xkcdChannel,
				message: "https://xkcd.com/"+comic.num
			}, function () {});
		});*/
}

function getComic(num, channel) {
	var URL;
	if (num == undefined || num == null || num == 404) {
		URL = "https://xkcd.com/info.0.json";
		num = null;
	} else {
		URL = "https://xkcd.com/" + num + "/info.0.json";
	}
	request.get(URL, function (e, r, b) {
		if (e == null) {
			var comic = JSON.parse(b);
			if (comic.num != previousNum && num == null) {
				previousNum = comic.num;
				fs.writeFileSync("previousNum.txt", comic.num, "utf8");
				printComic(comic, channel);
			} else if (num != null) {
				printComic(comic, channel);
			}
		}
	});
}

function channelCall() {
	getComic(null, config.channel);
}
bot.on('ready', function () {
	if (typeof (config.channel) == "string" && config.channel.trim() != "") {
		channelCall();
		setInterval(channelCall, 20 * 60 * 1000);
	}
});

bot.on('message', function (user, userID, channelID, message, evt) {
	if (userID == bot.id) {
		return;
	}
	if (message.startsWith("/xkcd")) {
		var params = message.split(" ");
		if (params.length === 2) {
			if (!isNaN(parseInt(params[1]))) {
				var num = parseInt(params[1]);
				if (num != 404 && 1 <= num && num <= previousNum) {
					getComic(parseInt(params[1]), channelID);
				} else {
					bot.sendMessage({
						to: channelID,
						message: "This is not a valid comic."
					});
				}
			} else {
				getComic(previousNum, channelID);
			}
		} else if (params.length === 1) {
			getComic(Math.floor(Math.random() * (previousNum - 1) + 1), channelID);
		} else {
			bot.sendMessage({
				to: channelID,
				message: "This is not a valid command.\n The following are possible:\nTo get a random comic: `/xkcd`\nTo get the latest comic: `/xkcd latest`\nTo get a specific comic: `/xkcd <number>`"
			});
		}
	}
});

bot.on("disconnect", function (e) {
	setTimeout(function () {
		bot.connect();
	}, 1000);
});