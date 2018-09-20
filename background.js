var currentTab;
var currentURL;
var isDCK; // is the current page a duckduckgo.com page?

// switch to the google url
function switchURL() {
	if (isDCK) {
		var searchTerm;
		var splitted = currentURL.split(/(\?|\&)/);

		for (var i = 0; i < splitted.length; i++) {	
			if (splitted[i].match(/^q=.*$/)) {
  				searchTerm = splitted[i];
 			}
		}
		
		var google_url = "https://google.com/search?" + searchTerm;
		browser.tabs.update({url: google_url});
	} else {
		console.log('Error: Not a duckduckgo.com site');
	}
}

// call switchURL when button is pressed
browser.browserAction.onClicked.addListener(switchURL);


// check if switching is possible
function updateDCK() {
	var pattern = /^(http|https):\/\/duckduckgo\.com\/[^\s]*(\?|\&)q=.{1,}$/;
	isDCK = pattern.test(currentURL);
}

// update the icon to show weather switching is possible
function updateIcon() {
	browser.browserAction.setIcon({
    path: isDCK ? {
      48: "icons/switch_true.svg",
      92: "icons/switch_true.svg"
    } : {
      48: "icons/switch_false.svg",
      92: "icons/switch_false.svg"
    },
    tabId: currentTab.id
});
}

// update everything for the current tab
function updateActiveTab(tabs) {

	function updateTab(tabs) {
    	if (tabs[0]) {
    		currentTab = tabs[0];
      		currentURL = tabs[0].url;
      		updateDCK();
      		updateIcon();	
		}
  	}

  	var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
	gettingActiveTab.then(updateTab);
}


// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

// update when the extension loads initially
updateActiveTab();