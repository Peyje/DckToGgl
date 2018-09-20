var GOOGLE_URL = "http://google.com/";

// switch to the google url
function switchURL() {
	console.log('Switch ausgeführt');
	browser.tabs.update({url: GOOGLE_URL});
}

// call switchURL when button is pressed
browser.browserAction.onClicked.addListener(switchURL);

