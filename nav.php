<?php
if (!defined('FNAV_CONFIG')) {
    if (file_exists(dirname(__FILE__)."/conf/config.php")) {
	include_once(dirname(__FILE__)."/conf/config.php");
    } elseif (file_exists(dirname(__FILE__)."/conf/config.default.php")) {
	include_once(dirname(__FILE__)."/conf/config.default.php");
    } else {
	echo "Fichier de config Framanav absent !";
	exit;
    }
}
?>
<!-- - - - - - - - - - - - - - - - Framanav - - - - - - - -  - - - - - - - - - - - -->
    <?php echo FNAV_EXTRA_START == true ? $fnav_extra_start : ''; ?>
    <link href="<?php echo FNAV_RPATH; ?>/nav.css" rel="stylesheet">
    <?php echo FNAV_EXTRA_CSS == true ? '<link href="'. FNAV_EXTRA_CSS .'" rel="stylesheet">' : ''; ?>	
    <?php echo FNAV_LOCAL_JQUERY == true ? '<script src="' . FNAV_RPATH .'/fnav_bootstrap/js/jquery.min.js"></script>' : ''; ?>
    <?php echo FNAV_LOCAL_BOOTSTRAP_JS == true  ? '<script src="' . FNAV_RPATH .'/fnav_bootstrap/js/bootstrap.min.js"></script>' : ''; ?>

    <script src="http://www.google.com/coop/cse/brand?form=searchbox_002138387073339262058:qhubrzuwlhg&amp;lang=fr" type="text/javascript"></script>

    <?php echo FNAV_LOCAL_BOOTSTRAP_CSS == true ? '<link href="' . FNAV_RPATH .'/fnav_bootstrap/css/bootstrap.min.css" rel="stylesheet">' : ''; ?>
    <?php echo FNAV_LOCAL_BOOTSTRAP_RESPONSIVE_CSS == true ? '<link href="' . FNAV_RPATH .'/fnav_bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">' : ''; ?>
    
	<a href="http://soutenir.framasoft.org" id="framanav_donation" rel="donBadge">Faire un don</a>
            <div class="navbar  <?php echo FNAV_STATIC==true ? 'navbar-fixed-top' : ''; ?>" id="framanav">
              <div class="navbar-inner">			  
				<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
				  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				  </a>
				  
                <div class="framanav_container">
                  <a class="brand" href="http://framasoft.org"><img src="<?php echo FNAV_RPATH; ?>/img/manchot.png" alt="Framasoft" class="dd_icon"/> <span style="color: #6b6bb5;">Frama</span><span style="color: #FF8103;">soft</span></a>
                  <div class="nav-collapse collapse">  <!-- automatiquement referm&eacute; en cas de petit &eacute;cran -->
                    <ul class="nav">

                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"> Logiciel libre <b class="caret"></b></a>
                        <ul class="dropdown-menu">
							<li><a href="http://framasoft.org" rel="popover" data-content="Le r&eacute;seau Framasoft" title="Framasoft"><i class="icon-home"></i>&nbsp;Framasoft</a></li>
							<li class="divider"></li>
							<li><a href="http://framasoft.org" rel="popover" data-content="L'annuaire de logiciels libres. <div class='framanav_scr framanav_framasoft'></div>" title="Framalibre"><i class="icon-list"></i>&nbsp;Framalibre</a></li>
							<li><a href="http://framastart.org" rel="popover" data-content="Le meilleur des logiciels libres sur une seule page." title="Framastart"><i class="icon-bookmark"></i>&nbsp;Framastart</a></li>
							<li><a href="http://framadvd.org" rel="popover" data-content="Compilations de logiciels libres sur DVD. <div class='framanav_scr framanav_framadvd'></div>" title="FramaDVD"><i class="icon-forward"></i>&nbsp;FramaDVD</a></li>
							<li><a href="http://framapack.org" rel="popover" data-content="Installation rapide de multiples logiciels libres. <div class='framanav_scr framanav_framapack'></div>" title="Framapack"><i class="icon-download-alt"></i>&nbsp;Framapack</a></li>
							<li><a href="http://framakey.org" rel="popover" data-content="Applications nomades pour cl&eacute;s USB. <div class='framanav_scr framanav_framakey'></div>" title="Framakey"><img src="<?php echo FNAV_RPATH; ?>/img/small_usb.png" alt="Framakey"/>&nbsp;Framakey</a></li>
	                          </ul>
                      </li>											


                       <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"> Culture libre <b class="caret"></b></a>
                        <ul class="dropdown-menu">
							<li><a href="http://framablog.org" rel="popover" data-content="Le blog de Framasoft. <div class='framanav_scr framanav_framablog'></div>" title="Framablog"><i class="icon-pencil"></i>&nbsp;Framablog</a></li>
							<li><a href="http://framabook.org" rel="popover" data-content="Collection de livres libres.  <div class='framanav_scr framanav_framabook'></div>" title="Framabook"><i class="icon-book"></i>&nbsp;Framabook</a></li>
							<li><a href="http://www.framablog.org/index.php/pages/framalang" rel="popover" data-content="La communaut&eacute; de traducteurs du r&eacute;seau Framalang." title="Framalang"><i class="icon-flag"></i>&nbsp;Framalang</a></li>
                      		<li><a href="http://framatube.org" rel="popover" data-content="Les vid&eacute;os du libre.<div class='framanav_scr framanav_framatube'></div>" title="Framatube"><i class="icon-facetime-video"></i>&nbsp;Framatube</a></li>
							<li><a href="http://framazic.org" rel="popover" data-content="Tout savoir sur la musique libre.<div class='framanav_scr framanav_framazic'></div>" title="Framazic"><i class="icon-music"></i>&nbsp;Framazic</a></li>
					
                          </ul>
                      </li>
     
     
                       <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"> Services libres <b class="caret"></b></a>
                        <ul class="dropdown-menu">
							<li><a href="http://framapad.org" rel="popover" data-content="Editeur de texte collaboratif. <div class='framanav_scr framanav_framapad'></div>" title="Framapad"><i class="icon-align-left"></i>&nbsp;Framapad</a></li>
							<li><a href="http://framacalc.org" rel="popover" data-content="Tableur collaboratif en temps r&eacute;el.<div class='framanav_scr framanav_framacalc'></div>" title="Framacalc"><i class="icon-th"></i>&nbsp;Framacalc</a></li>
							<li><a href="http://framadate.org" rel="popover" data-content="Sondages et organisation de rendez-vous. <div class='framanav_scr framanav_framadate'></div>" title="Framadate"><i class="icon-calendar"></i>&nbsp;Framadate</a></li>
							<li><a href="http://framindmap.org" rel="popover" data-content="Carte heuristique en ligne. <div class='framanav_scr framanav_framindmap'></div>" title="Framindmap"><i class="icon-edit"></i>&nbsp;Framindmap</a></li>
							<li><a href="http://framavectoriel.org" rel="popover" data-content="Dessin vectoriel. <div class='framanav_scr framanav_framavectoriel'></div>" title="Framavectoriel"><i class="icon-tint"></i>&nbsp;Framavectoriel</a></li>
							<li><a href="http://framaphonie.org" rel="popover" data-content="Diffusion de produits libres dans les zones faiblement connect&eacute;es. <div class='framanav_scr framanav_framaphonie'></div>" title="Framaphonie"><i class="icon-map-marker"></i>&nbsp;Framaphonie</a></li>
	
                          </ul>
                      </li>     

                       <li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown"> Libr'en vrac <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="http://framalab.org" rel="popover" data-content="Le laboratoire de Framasoft" title="Framalab"><i class="icon-refresh"></i>&nbsp;Framalab</a></li>
								<li><a href="http://wiki.framasoft.org" rel="popover" data-content="Le wiki de Framasoft. <div class='framanav_scr framanav_framawiki'></div>" title="Framawiki"><i class="icon-font"></i>&nbsp;Framawiki</a></li>
								<li><a href="http://framacode.org" rel="popover" data-content="T&eacute;l&eacute;charger nos applications ou contribuer &acute; leur d&eacute;veloppement." title="Framacode"><i class="icon-wrench"></i>&nbsp;Framacode</a></li>
								<li><a href="http://forum.framasoft.org" rel="popover" data-content="Les forums de Framasoft. <div class='framanav_scr framanav_framagora'></div>" title="Framagora"><i class="icon-comment"></i>&nbsp;Framagora</a></li>
								<li><a href="http://soutenir.framasoft.org" rel="popover" data-content="Framasoft ne vit que gr&acirc;ce &acute; vos dons.<br/>Soutenez-nous ! <div class='framanav_scr framanav_soutenir'></div>" title="Faire un don"><i class="icon-gift"></i>&nbsp;Faire un don</a></li>
								<li class="divider"></li>
								<li><a href="http://geektionnerd.net" rel="popover" data-content="La BD des Geeks libres !<div class='framanav_scr framanav_gknd'></div>" title="Geektionnerd"><i class="icon-picture"></i>&nbsp;Geektionnerd</a></li>
								<li><a href="http://enventelibre.org" rel="popover" data-content="Boutique de produits libres.<div class='framanav_scr framanav_enventelibre'></div>" title="EnVenteLibre"><i class="icon-shopping-cart"></i>&nbsp;EnVenteLibre</a></li>
								<li><a href="http://planet-libre.org" rel="popover" data-content="S&eacute;lection de nouvelles du libre francophone.<div class='framanav_scr framanav_planete'></div>" title="Planet-libre"><i class="icon-globe"></i>&nbsp;Planete-libre</a></li>
								<li><a href="http://vvlibri.org" rel="popover" data-content="Tout ce que vous avez toujours voulu savoir sur les licences libres. <div class='framanav_scr framanav_vvl'></div>" title="Veni Vidi Libri"><i class="icon-cog"></i>&nbsp;Veni Vidi Libri</a></li>
							</ul>
                      </li>     
 
					<form class="navbar-search pull-right" action="http://www.google.com/cse"> 
						<input type="hidden" value="002138387073339262058:qhubrzuwlhg" name="cx"/> 
						<input type="text" size="25" name="q" placeholder="Rechercher" class="search-query span2"/> 
						<input type="submit" value="Go" name="sa" style="display:none"/> 
					</form> 

                    <ul class="nav pull-right">
                      <li class="dropdown" class="nous_suivre">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="<?php echo FNAV_RPATH; ?>/img/contact.png" class="dd_icon" alt="contact"/>Nous suivre</a>
                        <ul class="dropdown-menu">
							<li><a href="http://twitter.com/framasoft" rel="popover" data-content="Notre compte de microblogging" title="Twitter / Framasoft"><i class="icon-search"></i>&nbsp;Twitter Framasoft</a></li>
							<li><a href="http://identi.ca/framasoft" rel="popover" data-content="Notre compte de microblogging <strong>libre</strong> !" title="Identi.ca / Framasoft"><i class="icon-search"></i>&nbsp;Identi.ca Framasoft</a></li>
							<li><a href="http://twitter.com/framaka" rel="popover" data-content="Le compte de microblogging d'aKa, le fondateur de Framasoft." title="Twitter / aKa"><i class="icon-user"></i>&nbsp;Twitter Framaka</a></li>
							<li><a href="https://www.facebook.com/framasoft" data-content="Framasoft est <em>aussi</em> sur Facebook (oui, on sait...)." title="Facebook / Framasoft"><i class="icon-thumbs-up"></i>&nbsp;Facebook</a></li>
							<li><a href="http://soutenir.framasoft.org/newsletter" data-content="Rejoignez nos 5000 abonn&eacute;s &agrave; notre lettre d'informations." title="Lettre d'informations"><i class="icon-bullhorn"></i>&nbsp;Newsletter</a></li>
							<li><a href="http://framapack.org/~framaflux/rss.php"  data-content="Flux RSS agr&eacute;g&eacute; des diff&eacute;rents sites." title="Flux RSS"><img src="<?php echo FNAV_RPATH; ?>/img/small_rss.png" alt="RSS" />&nbsp;Flux RSS</a></li>
							<li><a href="http://fr.wikipedia.org/wiki/Framasoft"  data-content="Parcourez le (long) article Framasoft sur (l'incontournable) encyclop&eacute;die libre Wikip&eacute;dia." title="Framasoft sur Wikip&eacute;dia"><img src="<?php echo FNAV_RPATH; ?>/img/wikipedia_logo.png" alt="Wikipedia" />&nbsp;Page Wikip&eacute;dia</a></li>
							<li><a href="http://contact.framasoft.org" data-content="Vous souhaitez prendre contact avec nous ?" title="Contacter Framasoft"><i class="icon-envelope"></i>&nbsp;Contact</a></li>
                        </ul>
                      </li>
	              	
					<li class="divider-vertical"></li>
	              	<li class="nous_soutenir"><a href="http://soutenir.framasoft.org" style="font-weight:bold">Soutenir <span style="color: #6b6bb5;">Frama</span><span style="color: #FF8103;">soft</span></a></li>
                    </ul>
				<!-- /automatiquement referm&eacute; en cas de petit &eacute;cran -->
                  </div>
                </div>
		
	        <?php echo FNAV_EXTRA_ALERT == true ? $fnav_extra_alert : ""; ?>		
		
              </div><!-- /navbar-inner -->
            </div><!-- /navbar -->
		<script type="text/javascript">
		jQuery(document).ready(function() {
			jQuery('.navbar a').popover(
				{
				html: true,
				trigger: 'hover'
				}
			);
			p_donationsTimer(false)
			
		});
		
		function p_donationsTimer(t) {
			if (t) jQuery('#framanav_donation').fadeOut(600).fadeIn(600);
			t = <?php echo FNAV_DONATE_BLINK_TIME; ?> + Math.floor(Math.random()*<?php echo FNAV_DONATE_BLINK_TIME; ?> ); 
			setTimeout('p_donationsTimer(1)',t);
		}
		
		</script>
    
    <?php echo FNAV_EXTRA_END == true ? $fnav_extra_end : ''; ?>
<!-- - - - - - - - - - - - - - - - - - /Framanav - - - - - - - - -  - - - - -->
