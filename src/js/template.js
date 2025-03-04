import Player from "../../template/player.art";
import utils from "./utils";
class Template {
  constructor(options) {
    this.container = options.container;
    options.isFireFox = utils.isFirefox;
    this.init(options);
    if (!options.blackBorder) {
      this.videoMask.style.height = "100%";
      this.bezel.style.bottom = "50px";
    }
    this.videoWrap.style.height =
      ((this.videoWrap.clientWidth * 9) / 16 + (options.blackBorder ? 100 : 0)).toFixed(2) + "px";
  }
  init(options) {
    this.container.innerHTML = Player(options);
    const $ = this.container.querySelector.bind(this.container);
    const $all = this.container.querySelectorAll.bind(this.container);
    // this.container = $(".mfunsPlayer");
    this.mask = $(".mfunsPlayer-mask");
    this.canvas = $(".mfuns_canvas");
    this.video = $(".mfunsPlayer-video");
    this.videoMask = $(".mfunsPlayer-video-mask");
    this.videoWrap = $(".mfunsPlayer-video-wrap");
    this.emit = $(".emit");
    this.fullButton = $(".mfunsPlayer-controller-fullButton");
    this.danmakuRoot = $(".mfunsPlayer-video-danmaku-root");

    // this.control_right = $(".control_right");
    // this.emitTop = $(".top");
    this.menu = $(".mfunsPlayer-menu");
    this.menuItem = $all(".mfunsPlayer-menu-item");
    this.danmaku = $(".mfunsPlayer-danmaku");
    this.danmakuCount = $(".mfunsPlayer-video-danmaku-count");
    this.danmakuButton = $(".mfunsPlayer-video-danmaku-button");
    this.danmakuSet = $(".mfunsPlayer-video-danmaku-set");
    this.text = $(".mfunsPlayer-danmaku-text");
    this.color = $(".color");
    this.headBar = $(".mfunsPlayer-headBar");
    this.barWrap = $(".mfunsPlayer-bar-wrap");
    this.bar = $(".mfunsPlayer-bar");
    this.playedBar = $(".mfunsPlayer-playedBar");
    this.bufferedBar = $(".mfunsPlayer-bufferedBar");
    this.thumb = $(".mfunsPlayer-thumb");
    this.barTime = $(".mfunsPlayer-barTime");
    this.bezel = $(".mfunsPlayer-bezel");
    this.tipItem = $all(".mfunsPlayer-controller-tip");
    this.speedInfo = $(".mfunsPlayer-speed-info");
    this.speedItem = $all(".mfunsPlayer-speed-item");
    this.squirtleItem = $all(".mfunsPlayer-squirtle-item");
    this.volume = $(".mfunsPlayer-controller-volume");
    this.volumeMask = $(".mfunsPlayer-controller-volume-mask");
    this.volumeBarWrap = $(".mfunsPlayer-controller-volume-wrap");
    this.volumeBar = $(".mfunsPlayer-controller-volume-bar");
    this.volumeNum = $(".mfunsPlayer-controller-volume-num");
    this.volumePercentage = $(".mfunsPlayer-controller-volume-percentage");
    this.volumeIcon = $(".mfunsPlayer-controller-volume-icon");
    this.webFullButton = $(".mfunsPlayer-controller-web-full");
    this.browserFullButton = $(".mfunsPlayer-controller-full");
    this.browserFullButtonIcon = $(".mfunsPlayer-controller-full-icon");
    this.switch_btn = $(".switch");
    this.range = $(".range");
    this.player_btn = $(".player_btn");
    this.controllerMask = $(".mfunsPlayer-controller-mask");
    this.controller = $(".mfunsPlayer-controller");
    this.controllerWrap = $(".mfunsPlayer-controller-wrap");
    this.footBar = $(".mfunsPlayer-footBar");
    this.loading = $(".mfunsPlayer-loading");
    this.load = $(".loader_box");
    this.list_btn = $(".list_danmaku");
    this.troggle = $(".mfunsPlayer-controller-troggle");
    this.play_btn = $(".play_button");
    this.notice = $(".mfunsPlayer-notice");
    this.currentTime = $(".currentTime");
    this.total = $(".total");
    this.danmakuList = $(".danmakuList");
    this.danmakuListContent = $(".danmakuList_content");
    this.headOfList = $(".headOfList");
    this.footOfList = $(".footOfList");
    this.closeList = $(".closeList_btn");
    this.advancedDanmaku_btn = $(".advancedDanmaku_btn");
    this.advancePre = $(".advanceDanmaku_pre_box");
    this.ade_mask = $(".advanceDanmakuEditor_mask");
    this.ade = $(".advanceDanmakuEditor");
    this.ade_footer = $(".editor_footer");
    this.ade_close = $(".exit_edit");
    this.ade_code = $("#danmaku_code");
    this.editor_clear = $(".editor_clear");
    this.editor_preview = $(".editor_preview");
    this.editor_emit = $(".editor_emit");
    this.danmakuEditor = $(".danmakuEditor");
    this.danmaku_style = $(".danmaku_style");
    this.danmaku_type = $(".danmaku_type");
    this.danmaku_color = $(".danmaku_color");
    this.voice = $(".voice");
  }
}
export default Template;
