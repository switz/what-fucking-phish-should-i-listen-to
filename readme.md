# What Fucking Phish Should I Listen To?

## If you're just looking for the website (or a demo)
Go to http://WhatFuckingPhishShouldIListenTo.com

## What is this?
This is a website that is half humor, half useful, and half an example of the Phish.net API (Yes I know that's three halves, but they overlap so in the end its really a whole; which is the same as two halves). It will use the Phish.net API and extensive setlist catalogue to deliver a random show to the user. You can see the setlist in the page or click on the show date to go directly to the Phish.net show page. Click _listen_ to go directly to the [spreadsheet](https://spreadsheets.google.com/pub?key=p8WKkpP-TKpO1VnQgcff6EQ&gid=1) to download the show. Play around with the website. If you can't figure it out, then click on the _"How do I Use This?"_. This website uses no client-side javascript. It is built entirely in server-side javascript using Node.js.

## How do I run this?
Go to `routes/index.js` and fill in your Phish.net API key. You can get one [here](http://api.phish.net/keys/).

Make sure you have [node.js](http://nodejs.org) installed and then run `node wtfphish.js` from the command line. Visit [http://localhost:3000] to view it in the browser.

## Who are you?
I'm Daniel Saewitz. Check me out at http://www.saewitz.com/. I'm also the creator of [Phish Vids](http://www.PhishVids.com/). This website was also the brainchild of [Parker Harrington](http://twitter.com/tmwsiy). Feel free to contact me at d [AT] phishvids.com with any questions or comments.

## Note:
This website was built with cooperation from Adam Scheinberg and the Phish.net staff. We use a special method to randomly choose a show live. The `pnet.shows.setlists.random` method is cached and only returns a new show every few minutes. This code is for learning purposes. Do not just download this code and make a new website. We already have one (http://www.WhatFuckingPhishShouldIListenTo.com). If you'd like to use any part of this code in your project, feel free to fork and play around.

**ALL USES OF THE PHISH.NET API MUST INCLUDE A NOTE SAYING THAT THE SETLIST DATA IS COURTESY OF PHISH.NET AND THE MOCKINGBIRD FOUNDATION (HTTP://MBIRD.ORG)**