   $(function(){
    $('#masonry-container').masonry({
      itemSelector: '.box',
      columnWidth: 110,
      isFitWidth: true
    });
  });

  $(window).scroll(function(){
    var wScroll = $(this).scrollTop();

    $(".name-box").css({
      'transform' : 'translate(0px, '+ wScroll/3  + '%)'
    });

    $(".quote-box").css({
      'transform' : 'translate(0px, '+ wScroll + '%)'
    });

    if(wScroll>650){
      $(".quote-box").text('');
    }

    if(wScroll > $('.projects').offset().top - ($(window).height() / 1.2)) {
      $('.projects figure').each(function(i){
        setTimeout(function(){
          $('.projects figure').eq(i).addClass('is-showing');
        }, (700 * (Math.exp(i * 0.14))) - 700);
      });
    }
  });




