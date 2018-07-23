let script = document.createElement("script");

script.src = chrome.extension.getURL("src/youtubeDownloader.js");

script.onload = function() {
  this.remove();
};

(document.head || document.documentElement).appendChild(script);

window.addEventListener("message", function(e) {
  console.log(e.data);
  const fileExtension = e.data.type.split("/")[1].split(";")[0];
  const downloadFileName = e.data.name + "." + fileExtension;
  chrome.downloads.download({ url: e.data.url, filename: downloadFileName });
});
