$(function(){
  $(window).on('load',function(){
    //ローディングアニメーションをフェードアウト
    $('.loader').delay(200).fadeOut(200);
    //背景色をフェードアウト
    $('.loader-bg').delay(200).fadeOut(200);
});

  //ページの読み込みが完了してなくても4秒後にアニメーションを非表示にする
  setTimeout(function(){
    $('.loader-bg').fadeOut(200);
  },4000);
});