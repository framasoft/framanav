/* global n$:{} */

if (n$.is.url('https://framavox.org/dashboard') && jQuery('.lmo-navbar .navbar__sign-in:visible').length) {
  jQuery('body').append('<div id="framahome_container"></div>');
  jQuery('#framahome_container').load('https://framasoft.org/nav/ext/vox.html #framahome', () => {
    jQuery('.md-dialog-container, .md-scroll-mask,.md-dialog-backdrop,.lmo-navbar').hide();
    jQuery('#play-pause a').on('click', function playPause() {
      if (jQuery(this).children('.glyphicon').hasClass('glyphicon-pause')) {
        jQuery(this).children('.glyphicon').addClass('glyphicon-play').removeClass('glyphicon-pause');
        jQuery(this).attr('title', 'Lecture');
        jQuery(this).children('.sr-only').text('Lecture');
        jQuery('#carousel-vox').carousel('pause');
      } else {
        jQuery(this).children('.glyphicon').addClass('glyphicon-pause').removeClass('glyphicon-play');
        jQuery(this).attr('title', 'Pause');
        jQuery(this).children('.sr-only').text('Pause');
        jQuery('#carousel-vox').carousel('cycle');
      }
      return false;
    });
    jQuery('#carousel-vox').carousel({ cycle: true, interval: 7000 });

    jQuery('#framahome a[href="/dashboard"]').on('click', () => {
      jQuery('.md-dialog-container, .md-scroll-mask,.md-dialog-backdrop,.lmo-navbar').show();
      jQuery('#framahome_container').remove();
      return false;
    });
  });
}
