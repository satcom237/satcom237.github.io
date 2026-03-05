
(function(){
  if (typeof jQuery === 'undefined') {
    console.warn('jQuery is required for script.js but not found.');
    return;
  }

  $(function(){
    var $win = $(window);
    var $top = $('.top');
    var $nav = $('.navlist');
    var threshold = 100;
    var ticking = false;

    function updateOnScroll(){
      var st = $win.scrollTop();

      // hero fade
      var op = 1 - st / threshold;
      if (op < 0) op = 0;
      if (op > 1) op = 1;
      $top.css('opacity', op);

      // navbar show/hide
      if (st > threshold) {
        if (!$nav.hasClass('show')) $nav.addClass('show');
      } else {
        if ($nav.hasClass('show')) $nav.removeClass('show');
      }

      ticking = false;
    }

    $win.on('scroll', function(){
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    });

    // set initial state
    updateOnScroll();

    // delegated smooth scrolling for links with class "scroll"
    $(document).on('click', '.scroll', function(e){
      var hash = this.hash;
      if (!hash) return;
      var $target = $(hash);
      if ($target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top }, 800);
      }
    });

    // expose popup for inline onclick handlers
    window.popup = function(){
      var el = document.getElementById('myPopup');
      if (el) el.classList.toggle('show');
    };
  });
})();
