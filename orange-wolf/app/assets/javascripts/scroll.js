$(window).scroll(function(){
  var wScroll = $(this).scrollTop();

  $(".name-box").css({
    'transform' : 'translate(0px, '+ wScroll/3  + '%)'
  });

  $(".quote-box").css({
    'transform' : 'translate(0px, '+ wScroll + '%)'
  });
})