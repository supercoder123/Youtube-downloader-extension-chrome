const downloadVideo = () => {
  console.log("download this video");
  let dropdownClick = document.getElementById("videoDownloadDropdown");
  if (dropdownClick.className.indexOf("shown") > -1) {
    dropdownClick.className = dropdownClick.className.replace("shown", "");
  } else {
    dropdownClick.className += "shown";
  }
};

window.onload = function() {
  console.log("shit has loaded again");
  let videoUrl = window.ytplayer.config.args.url_encoded_fmt_stream_map
    .split(",")
    .map(item => {
      return item.split("&").reduce((pre, cur) => {
        cur = cur.split("=");
        return Object.assign(pre, { [cur[0]]: decodeURIComponent(cur[1]) });
      }, {});
    });

  console.log("Our extension has loaded", videoUrl);

  const container = document.getElementById("info");
  const btn = document.createElement("button");
  btn.className = "style-scope ytd-video-primary-info-renderer";
  btn.setAttribute("role", "button");
  btn.id = "downloadVideoButton";
  btn.innerText = "Download";

  btn.addEventListener("click", downloadVideo);

  console.log(container, btn);
  container.appendChild(btn);

  let dropdown = document.createElement("div");
  dropdown.id = "videoDownloadDropdown";
  btn.appendChild(dropdown);

  console.log(videoUrl[0].quality);

  const dropList = document.createElement("ul");
  dropdown.appendChild(dropList);

  for (i in videoUrl) {
    var item = document.createElement("a");
    item.innerText = videoUrl[i].quality;
    item.setAttribute("href", videoUrl[i].url);
    dropList.appendChild(item);
  }
};

//const dropList = document.createElement("ul"); //dropdown.appendChild(dropList);

// for (i in videoUrls) {
//   var item = document.createElement("a");
//   item.innerHTML = videoUrls[i]["quality"];
//   dropList.appendChild(item);
//   console.log("urlsyoyu", videoUrls[i].quality);
// }
//};
