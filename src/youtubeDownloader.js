// ytplayer.config.args.url_encoded_fmt_stream_map

const downloadVideo = () => {
  console.log("download this video");
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

  console.log("Our extension has loaded", videoUrl);

  const container = document.getElementById("menu-container");
  const btn = document.createElement("button");
  btn.className = "style-scope ytd-menu-renderer force-icon-button style-text";
  btn.setAttribute("role", "button");
  btn.id = "downloadVideoButton";
  btn.innerText = "Download";

  btn.addEventListener("click", downloadVideo);

  container.prepend(btn);
};
