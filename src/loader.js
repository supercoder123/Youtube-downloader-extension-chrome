let script = document.createElement("script");

script.src = chrome.extension.getURL("src/youtubeDownloader.js");

script.onload = function() {
  this.remove();
};

(document.head || document.documentElement).appendChild(script);
