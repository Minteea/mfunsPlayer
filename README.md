# mfunsPlayer 弹幕播放器

自研的弹幕播放器，没啥优点，能用就行 Ծ‸Ծ

### 功能

- 视频的暂停/播放（快捷键 space）
- 进度条
- 全屏/退出全屏
- 弹幕开关
- 发送弹幕
- 编辑弹幕/高级弹幕
- 控制音量（快捷键 ↑ ↓）
- 快进快退（快捷键 ← →）
- 画中画

### 使用方法

- 下载 dist/mfunsPlayer.js 文件
- 使用 script 标签导入到 目标 html 中

- 如果需要编辑高级弹幕，请自行用 script 标签引入 ace.js
  cdn 引入地址:

  > 编辑器：[http://cdn.bootcss.com/ace/1.4.9/ace.js](http://cdn.bootcss.com/ace/1.4.9/ace.js)

  > 语言工具：[http://cdn.bootcss.com/ace/1.4.9/ext-language_tools.js](http://cdn.bootcss.com/ace/1.4.9/ext-language_tools.js)

### 初始化弹幕播放器

```js
//播放器的容器（示例）
const container = document.querySelector(".content");

// 回调函数（示例）
function emitDanmaku(danmaku, type) {
  console.log("发送弹幕", danmaku, type);
}
function checkLogin() {
  console.log("检测用户登录");
}
function play(time) {
  console.log("播放时调用", time);
}
function pause(time) {
  console.log("暂停时调用", time);
}
//初始化播放器
new mfunsPlayer({
  container, //容器dom
  theme: "#666", //主题
  autoPlay: false, //自动播放
  blackBorder: false, // 播放器黑边
  dragable: false, //进度条是否可拖拽
  hotkey: true, //是否启用快捷键
  volume: 0.7, //视频初始音量
  currentVideo:0 //当前播放视频的下标
  video: [ //type:ObjectArray
    {
      url: "", //视频链接地址（必传）
      pic: "", //视频预览图链接地址（不传默认为视频第1帧）
      type: "mp4", //视频类型
      title: "", //视频标题（选传）
      danId:100 //弹幕id(选传)
    },
  ],
  //以下为选传配置
  danmaku: {
    api: "", //弹幕接口基准地址
    bottom: "0", //弹幕距离视频底部的距离
    showDanmaku: true, //初始化完成是否自动开启弹幕
  },
  advanceDanmaku: {
    api: "", //高级弹幕接口地址
    editor: true, //是否启用编辑器
  },
  asyncCallback: {
    checkLogin: checkLogin, //检查用户登录状态回调函数
    emitDanmaku: emitDanmaku, //发送弹幕回调函数（函数默认接收2个参数：弹幕对象，弹幕类型）如： (danmaku,type)=>{}
  },
  playCallback: play, //播放器播放回调函数（函数默认接收1个参数：播放器当前播放时间）如： (currentTime)=>{}
  pauseCallback: pause, // //播放器播放回调函数（函数默认接收1个参数：播放器当前播放时间）如： (currentTime)=>{}
  mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
});
```
