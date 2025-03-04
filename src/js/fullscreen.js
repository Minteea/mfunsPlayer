import utils from "./utils";

class FullScreen {
  constructor(player) {
    this.player = player;
    this.lastScrollPosition = { left: 0, top: 0 };
    this.singleVideo = !!(this.player.options.video.length > 1) ? 1 : 0;
    this.player.events.on("webfullscreen", () => {
      this.player.resize();
    });
    this.player.events.on("webfullscreen_cancel", () => {
      this.player.resize();
      utils.setScrollPosition(this.lastScrollPosition);
    });

    const fullscreenchange = () => {
      this.player.resize();
      if (this.isFullScreen("browser")) {
        this.player.events.trigger("fullscreen");
      } else {
        utils.setScrollPosition(this.lastScrollPosition);
        this.player.events.trigger("fullscreen_cancel");
      }
    };
    const docfullscreenchange = () => {
      const fullEle = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      if (fullEle && fullEle !== this.player.template.videoWrap) {
        return;
      }
      this.player.resize();
      if (fullEle) {
        this.player.events.trigger("fullscreen");
      } else {
        utils.setScrollPosition(this.lastScrollPosition);
        this.player.events.trigger("fullscreen_cancel");
      }
    };
    if (/Firefox/.test(navigator.userAgent)) {
      document.addEventListener("mozfullscreenchange", docfullscreenchange);
      document.addEventListener("fullscreenchange", docfullscreenchange);
    } else {
      this.player.template.videoWrap.addEventListener("fullscreenchange", fullscreenchange);
      this.player.template.videoWrap.addEventListener("webkitfullscreenchange", fullscreenchange);
      document.addEventListener("msfullscreenchange", docfullscreenchange);
      document.addEventListener("MSFullscreenChange", docfullscreenchange);
    }
  }

  isFullScreen(type = "browser") {
    switch (type) {
      case "browser":
        return (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        );
      case "web":
        return this.player.template.videoWrap.classList.contains("mfunsPlayer-web-fullscreen");
    }
  }
  handleFullscrren(type) {
    const anotherType = type === "browser" ? "web" : "browser";
    const anotherTypeOn = this.isFullScreen(anotherType);
    if (anotherTypeOn) {
      this.cancel(anotherType);
    }
    const danmakuRoot = this.player.template.danmakuRoot;
    if (danmakuRoot) {
      this.player.template.controllerWrap.appendChild(danmakuRoot);
    }
  }
  request(type = "browser") {
    const anotherType = type === "browser" ? "web" : "browser";
    const anotherTypeOn = this.isFullScreen(anotherType);
    if (!anotherTypeOn) {
      this.lastScrollPosition = utils.getScrollPosition();
    }
    this.cancel(anotherType);
    // if (this.player.template.danmakuButton.className === "mfunsPlayer-video-danmaku-button open") {
    //   this.danmakuOpend = true;
    // }

    switch (type) {
      case "browser":
        if (this.player.template.videoWrap.requestFullscreen) {
          this.player.template.videoWrap.requestFullscreen();
        } else if (this.player.template.videoWrap.mozRequestFullScreen) {
          this.player.template.videoWrap.mozRequestFullScreen();
        } else if (this.player.template.videoWrap.webkitRequestFullscreen) {
          this.player.template.videoWrap.webkitRequestFullscreen();
        } else if (this.player.template.videoWrap.webkitEnterFullscreen) {
          // Safari for iOS
          this.player.template.videoWrap.webkitEnterFullscreen();
        } else if (this.player.template.videoWrap.webkitEnterFullScreen) {
          this.player.template.videoWrap.webkitEnterFullScreen();
        }
        const fullscreenTip = this.singleVideo + (utils.isFirefox ? 1 : 2);
        this.player.template.tipItem[fullscreenTip].innerHTML = "退出全屏";
        this.player.template.webFullButton.classList.add("hide");
        this.handleFullscrren();
        this.player.events.trigger("browserfullscreen");
        break;
      case "web":
        this.player.template.videoWrap.classList.add("mfunsPlayer-web-fullscreen");
        document.body.classList.add("mfunsPlayer-web-fullscreen-fix");
        const webscreenTip = this.singleVideo + (utils.isFirefox ? 0 : 1);
        this.player.template.tipItem[webscreenTip].innerHTML = "退出网页全屏";

        this.handleFullscrren();
        this.player.events.trigger("webfullscreen");
        break;
    }
  }
  handleExitFullscreen() {
    const danmakuRoot = this.player.template.controllerWrap.childNodes[5];
    if (danmakuRoot) {
      this.player.template.controllerWrap.removeChild(danmakuRoot);
      this.player.template.footBar.appendChild(danmakuRoot);
    }
  }
  cancel(type = "browser") {
    switch (type) {
      case "browser":
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.webkitCancelFullscreen) {
          document.webkitCancelFullscreen();
        } else if (document.msCancelFullScreen) {
          document.msCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.handleExitFullscreen("browser");
        const fullscreenTip = this.singleVideo + (utils.isFirefox ? 1 : 2);
        this.player.template.webFullButton.classList.remove("hide");
        if (!!this.player.template.tipItem.length) {
          this.player.template.tipItem[fullscreenTip].innerHTML = "进入全屏";
        }
        break;
      case "web":
        this.player.template.videoWrap.classList.remove("mfunsPlayer-web-fullscreen");
        document.body.classList.remove("mfunsPlayer-web-fullscreen-fix");
        const webscreenTip = this.singleVideo + (utils.isFirefox ? 0 : 1);
        this.player.template.tipItem[webscreenTip].innerHTML = "网页全屏";
        this.handleExitFullscreen("web");
        // this.player.events.trigger("webfullscreen");
        break;
    }
  }

  toggle(type = "browser") {
    if (this.isFullScreen(type)) {
      this.cancel(type);
    } else {
      this.request(type);
    }
  }
}

export default FullScreen;
