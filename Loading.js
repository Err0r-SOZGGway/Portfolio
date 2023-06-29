$(function(){
  $(window).on('load',function(){
    //ローディングアニメーションをフェードアウト
    $('.loader').delay(300).fadeOut(300);
    //背景色をフェードアウト
    $('.loader-bg').delay(600).fadeOut(400);
});

  //ページの読み込みが完了してなくても5秒後にアニメーションを非表示にする
  setTimeout(function(){
    $('.loader-bg').fadeOut(400);
  },4000);
});