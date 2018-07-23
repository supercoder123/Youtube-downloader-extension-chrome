const downloadVideo = () => {
  console.log("downloadVideo()");
  let dropdownClick = document.getElementById("videoDownloadDropdown");
  if (dropdownClick.className.indexOf("shown") > -1) {
    dropdownClick.className = dropdownClick.className.replace("shown", "");
  } else {
    dropdownClick.className += "shown";
  }
};

const downloadURI = e => {
  e.preventDefault();

  const url = e.currentTarget.getAttribute("href");
  const name = document.getElementsByTagName("title")[0].innerText;
  var dataType = event.currentTarget.getAttribute("data-type");
  const data = { url: url, name: name, sender: "YTDL", type: dataType };

  window.postMessage(data, "*");
};

window.onload = function() {
  let videoUrl = window.ytplayer.config.args.url_encoded_fmt_stream_map
    .split(",")
    .map(item => {
      return item.split("&").reduce((pre, cur) => {
        cur = cur.split("=");
        return Object.assign(pre, { [cur[0]]: decodeURIComponent(cur[1]) });
      }, {});
    });

  const container = document.getElementById("info");
  const btn = document.createElement("button");
  btn.className = "style-scope ytd-video-primary-info-renderer";
  btn.setAttribute("role", "button");
  btn.id = "downloadVideoButton";
  btn.innerText = "Download";

  btn.addEventListener("click", downloadVideo);

  container.appendChild(btn);

  let dropdown = document.createElement("div");
  dropdown.id = "videoDownloadDropdown";
  btn.appendChild(dropdown);

  const dropList = document.createElement("ul");
  dropdown.appendChild(dropList);

  for (i in videoUrl) {
    var item = document.createElement("a");
    item.innerText = videoUrl[i].quality;
    item.setAttribute("href", videoUrl[i].url);
    item.setAttribute("data-type", videoUrl[i].type);
    item.addEventListener("click", downloadURI);
    dropList.appendChild(item);
  }
};
