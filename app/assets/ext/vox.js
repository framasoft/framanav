/* global n$:{} */

if (n$.is.url('https://framavox.org/dashboard') && jQuery('.lmo-navbar .navbar__sign-in:visible').length) {
  jQuery('body').append('<div id="framahome_container"></div>');
  jQuery('#framahome_container').load('https://framasoft.org/nav/ext/vox.html #framahome', () => {
    jQuery('.md-dialog-container, .md-scroll-mask,.md-dialog-backdrop,.lmo-navbar').hide();
    jQuery('#framahome a[href="/dashboard"]').on('click', () => {
      jQuery('.md-dialog-container, .md-scroll-mask,.md-dialog-backdrop,.lmo-navbar').show();
      jQuery('#framahome_container').remove();
      return false;
    });
  });
}
