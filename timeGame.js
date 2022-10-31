'use strict';
const game = {
  startTime: null,
  displayArea: document.getElementById('display-area'),
  start: function() {
    game.startTime = Date.now();
    this.displayArea.innerText = '20秒だと思ったら何かキーを押して下さい';
    document.body.onkeydown = game.stop;
  },
  stop: function() {
    const currentTime = Date.now();
    const seconds = (currentTime - game.startTime) / 1000;  // 20秒の挙動をテストする場合変数secondsに値を代入し処理をコメントアウト
    if ((19.5 < seconds && seconds < 20.5) && seconds != 20.0) {
      game.displayArea.innerText = seconds + '秒でした！スゴイ！';
    } else if(seconds === 20.0) {
      game.displayArea.innerText = seconds + '秒ピッタリ！！おめでとう！';
    } else {
      game.displayArea.innerText = seconds + '秒でした…残念…';
    }
    // TODO キーを押すたびに時間をリセットする
    document.body.onkeydown = game.stopPropagation;
  }
};
const startButton = document.getElementById('countTime');
startButton.onclick = () => {
  game.start();
};
