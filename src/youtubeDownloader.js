console.log("Our extension has loaded");
// ytplayer.config.args.url_encoded_fmt_stream_map

let videoUrl = window.ytplayer.config.args.url_encoded_fmt_stream_map.split(
  ","
);
