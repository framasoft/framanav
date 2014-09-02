var f$_config = 'local';

var f$_jquery = 'fQuery';

var f$_audio_js = true;
var f$_video_js = true;

// Sous-titres dans les vidéos (jQuery 1.4.2 est déjà présent sur le framablog)
jQuery(document).ready(function() {
  jQuery('video').each(function(){
    id = jQuery(this).attr('id').replace('k-','');
    if(jQuery(this).children('track').attr('src').indexOf('framatube.org') > -1) {
      jQuery(this).children('track').attr('src','http://www.framablog.org/public/playk/cache/'+id+'/fr.vtt');
    }
  });
});

// Opt-in
var f$_email_field1 = '#c_mail';

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "3"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
