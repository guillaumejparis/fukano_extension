/**
 * Created by kunt on 10/03/2016.
 */
var live = 0;
var urlStream =     "https://www.twitch.tv/Fukano";
var urlApiStream =  "https://api.twitch.tv/kraken/streams/Fukano";
var openTwitch = function (){
    chrome.tabs.create({ url: urlStream });
};
var switchIcon = function (on){
    live = on;
    if (on) {
      chrome.browserAction.setIcon({
          path: "assets/fukano_logo.png"
      });
    }else {
      chrome.browserAction.setIcon({
          path: "assets/fukano_logo_dark.png"
      });
    }
};
chrome.notifications.onClicked.addListener(openTwitch);
chrome.browserAction.onClicked.addListener(function(activeTab){
    openTwitch();
});

var answer;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('test');
        answer = JSON.parse(xhttp.responseText);
        if (answer.stream == null) {
            switchIcon(0);
        } else {
            if (!live) {
                switchIcon(1);
                chrome.notifications.create(
                    {
                        type: "basic",
                        iconUrl: "assets/fukano_logo.png",
                        title: "Fukano",
                        message: "Live on Twitch"
                    }
                );
            }
        }
    }
};
xhttp.open("GET", urlApiStream, true);
xhttp.send();
setInterval(function(){
    xhttp.open("GET", urlApiStream, true);
    xhttp.send();
}, 20000);