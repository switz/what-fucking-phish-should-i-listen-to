/*
 * GET home page.
 */

var http = require('http'),
	keys = require('keygrip')(),
	Cookies = require('cookies'),
	// This holds the gid inside the spreadsheet for each year so we can directly link it
	spreadsheet = {
		"1983": 3,
		"1984": 3,
		"1985": 3,
		"1986": 3,
		"1987": 3,
		"1988": 5,
		"1989": 6,
		"1990": 1,
		"1991": 13,
		"1992": 14,
		"1993": 15,
		"1994": 12,
		"1995": 11,
		"1996": 10,
		"1997": 9,
		"1998": 8,
		"1999": 4,
		"2000": 0,
		"2002": 18,
		"2003": 19,
		"2004": 20,
		"2008": 27,
		"2009": 17,
		"2010": 24,
		"2011": 25
	};

exports.index = function(req, res) {
	// Set path for phish.net api
	var phishnetPath = '/api.js';
	// Set method
	phishnetPath += '?method=pnet.shows.setlists.random';
	phishnetPath += '&api=2.0';
	phishnetPath += '&format=json';
	// Replace with your private API key
	phishnetPath += '&apikey=XXXXXXXXXXXXXX';
	
	var cookies = new Cookies(req, res, keys),
		pointCookie, data = '',
		// shuffle the links so we get a random order
		links = shuffle([
			["Donate to Mockingbird", "http://mbird.org/"],
			["Phish Videos", "http://www.phishvids.com/"],
			["Phish.net", "http://www.phish.net/"],
			["@PhishVids", "http://twitter.com/phishvids"],
			["@TMWSIY", "http://twitter.com/tmwsiy"],
			["Hidden Track", "http://www.glidemagazine.com/hiddentrack/"],
			["Phish.net Merch", "http://www.phishnet.portmerch.com/stores/home.php"],
			["Jamming Charts", "http://phish.net/song/jamming-charts"],
			["Long Jams", "http://phish.net/setlists/twenty-minute-jams.php"],
			["etree", "http://bt.etree.org/?searchss=phish&amp;cat=0"],
			["Dry Goods", "http://drygoods.phish.com/"]
		]),
		options = {
			host: 'api.phish.net',
			port: 80,
			path: phishnetPath
		};

	http.get(options, function(json) {
		// Get data chunks
		json.on('data', function(chunk) {
			data += chunk;
		});

		// End data transmission, send variables to index.jade
		json.on('end', function() {
			var obj = JSON.parse(data)[0],
				year = obj.showyear,
				pointCookie = cookies.get('point'),
				pointoh = which_pointoh(year);
			
			// Cookie expires in two minutes
			var twoMinutes = new Date();
			twoMinutes.setMinutes(twoMinutes.getMinutes() + 2);
			
			// Set cookie
			cookies.set("point", pointoh, {
				expires: twoMinutes
			});
			
			// Send message to user if they don't want X.0, but it's the same X.0
			if (typeof req.query['point'] !== 'undefined' && pointoh === pointCookie) {
				switch (pointCookie) {
				case "1.0":
					var prelisten = "LOL. ";
					break;
				case "2.0":
					var prelisten = "Jams too long brah? ";
					break;
				case "3.0":
					var prelisten = "Okay, Mr. Jaded Vet. ";
					break;
				}
			} 
			// If user gets sent to ?point, but does not have any cookies set, redirect to /
			else if (typeof pointCookie === 'undefined') {
				res.writeHead(302, {
					'Location': '/'
				});
				res.end();
				return;
			}
			
			// City/Venue/State/Country manipulation
			var venue = obj.venue,
			city = obj.city,
			venueid = obj.venueid,
			country = obj.country;
			
			venue = (typeof venue !== 'undefined' && venue !== null) ? venue+', ' : '';

			city = (typeof city !== 'undefined' && city !== null) ? city + ', ' : '';
			
			if (country == "USA") {
				venue = venue + city + obj.state;
			} else {
				venue = venue + city + country;
			} 
			
			
			//Render index.jade page
			res.render('index', {
				showdate: obj.mmddyy,
				showurl: obj.url,
				spreadsheet: spreadsheet[year],
				pointoh: pointoh,
				venueid: venueid,
				venue: venue,
				setlist: obj.setlistdata,
				prelisten: prelisten,
				random1: links[0][0],
				random1Link: links[0][1],
				random2: links[1][0],
				random2Link: links[1][1],
				random3: links[2][0],
				random3Link: links[2][1],
				random4: links[3][0],
				random4Link: links[3][1],
				links: links,
				dir: __dirname
			});
			res.end();
		})
	}).on('error', function(error) {
		console.log(error);
	});
};

// Figure out what #.0 from year
function which_pointoh(year) {
	if (year <= 2000) {
		return "1.0";
	} else if (year <= 2004) {
		return "2.0";
	} else {
		return "3.0";
	}
}

// Shuffle array
function shuffle(myArray) {
	var i = myArray.length;
	if (i == 0) return false;
	while (--i) {
		var j = Math.floor(Math.random() * (i + 1));
		var tempi = myArray[i];
		var tempj = myArray[j];
		myArray[i] = tempj;
		myArray[j] = tempi;
	}
	return myArray;
}