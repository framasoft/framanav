/* global n$:{} */
/* Obsolète avec MyPads 1.3 */
const expandIframe = function expandIframe() {
  $('#mypads header, #mypads aside, #mypads footer').hide();
  $('#mypads main.container').removeClass('container').addClass('container-fluid');
  $('section.pad iframe').css('height', '80vh');
  $('.btn.expand-toggle i').removeClass(' glyphicon-resize-full').addClass(' glyphicon-resize-small').attr('title', 'Réduire');
  $('.btn.expand-toggle .sr-only').text('Réduire');
};
const compressIframe = function compressIframe() {
  $('#mypads header, #mypads aside, #mypads footer').show();
  $('#mypads main.container-fluid').removeClass('container-fluid').addClass('container');
  $('section.pad iframe').css('height', '40em');
  $('.btn.expand-toggle i').removeClass(' glyphicon-resize-small').addClass(' glyphicon-resize-full').attr('title', 'Agrandir');
  $('.btn.expand-toggle .sr-only').text('Agrandir');
};

setInterval(() => {
  // Sur la page du pad (avec iframe)
  if (jQuery('section.pad iframe').length > 0) {
    // Aide placé en bas
    jQuery('main section.col-md-9').removeClass('col-md-9').addClass('col-md-12');
    jQuery('main aside.col-md-3').removeClass('col-md-3').addClass('col-md-12');

    // Ajout bouton Agrandir/Réduire
    if ($('.expand-toggle').length === 0) {
      $('.btn.new-window').before([
        '<button class="btn btn-default expand-toggle new-window" style="margin-right: -1px; border-radius: 5px 0 0 0;">',
        '<i class="glyphicon" aria-hidden="true" title=""></i><span class="sr-only"></span>',
        '</button>',
      ].join('')).css('border-radius', '0 5px 0 0');

      const iframeFP = n$.cookie('r', 'iframeFP');

      if (iframeFP === 'true') {
        expandIframe();
      } else {
        compressIframe();
      }

      $('.btn.expand-toggle').click(() => {
        if ($('.btn.expand-toggle i').hasClass('glyphicon-resize-full')) {
          expandIframe();
          n$.cookie('w', 'iframeFP', 'true', 365 * 24 * 60 * 60 * 1000);
        } else {
          compressIframe();
          n$.cookie('w', 'iframeFP', 'false', 365 * 24 * 60 * 60 * 1000);
        }
      });
    }
  // Ailleurs remise en place des colonnes, entêtes, etc
  } else {
    jQuery('main section.col-md-12').removeClass('col-md-12').addClass('col-md-9');
    jQuery('main aside.col-md-12').removeClass('col-md-12').addClass('col-md-3');
    compressIframe();
  }

  // Bouton « Quitter le dossier »
  if (jQuery('#mypads .col-md-9 h2 button.cancel').length > 0) {
    jQuery('#mypads .col-md-9 h2 .btn-group').append(jQuery('#mypads .col-md-9 h2 button.cancel'));
    jQuery('#mypads .col-md-9 h2 button.cancel').addClass('btn btn-warning').css('font-size', '14px');
    jQuery('#mypads .col-md-9 h2 button.cancel i').removeClass('glyphicon-remove').addClass('glyphicon-fire').css('margin-right', '5px');
  }
}, 1000);

/* jQuery.getJSON( "/stats.json", function(data) {
  jQuery('#statsMyPads').text(data.padsCount);
}); */
