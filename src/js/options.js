import defaultApiBackend from "./api.js";
import utils from "./utils.js";
export default (options) => {
  // default options
  const defaultOption = {
    container: options.element || document.getElementsByClassName("mfunsPlayer")[0],
    autoPlay: false,
    dragable: true,
    blackBorder: true,
    theme: "#b7daff",
    loop: false,
    hotkey: true,
    preload: "metadata",
    volume: 0.7,
    apiBackend: defaultApiBackend,
    video: {},
    contextmenu: [],
    mutex: true,
    pluginOptions: { hls: {}, flv: {}, dash: {}, webtorrent: {} },
  };
  options = Object.assign(defaultOption, options);
  if (options.video) {
    !options.video.type && (options.video.type = "auto");
  }
  options.contextmenu = options.contextmenu.concat([
    {
      text: "视频统计信息",
      click: (player) => {},
    },

    {
      text: `mfunsPlayer v2.1.0`,
      link: "https://github.com/Mfuns-cn",
    },
  ]);
  return options;
};
