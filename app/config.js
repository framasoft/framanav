/** ****************************************************************** *
 *                          Config des sites                           *
 * ******************************************************************* */
function siteConfig(vue) {
  let l$ = {};

  switch (vue.site) {
    case 'bee':
      l$ = {
        js: {
          ext() {
            if (jQuery('.explain').length) { jQuery('#q').focus(); }
            jQuery('.footer').hide();
            jQuery('body').css('margin-bottom', '0');
            // Default search in fr
            if (vue.isLang('fr', 'b') && document.cookie.indexOf('language=') === -1) {
              jQuery('select[name="language"] option[value="fr"]').prop('selected', true);
            }
            // Active search engine list
            let engines = '';
            jQuery('#main_results .label-default').each((i) => {
              const html = jQuery('<div />')
                .append(jQuery('#main_results .label-default')
                  .eq(i).clone())
                .html();
              if (engines.indexOf(html) === -1) {
                engines += `${html} `;
              }
            });
            jQuery('#sidebar_results').append(`
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">${vue.$i18n.t('bee.search')}</h4>
                </div>
                <div class="panel-body">
                  <p>truc</p>
                  <p>${vue.$i18n.t('bee.pref')}</p>
                </div>
              </div>
            `);
          },
        },
      };
      break;
    case 'board':
      if (/\.framaboard/.test(vue.$root.host)) { // dans Kanboard
        l$ = {
          js: {
            ext() {
              jQuery('h1 .logo a').html(vue.$root.color.board);
              jQuery('h1 .logo').removeClass('logo');
              jQuery([
                'a[href$="?controller=UserCreationController&action=show&remote=1"]',
                'a[href^="/?controller=UserViewController&action=external"]',
                'input[name="is_ldap_user"]'].join())
                .parent().hide();
            },
          },
        };
      }
      break;

    case 'calc':
      if (/accueil\.framacalc\.org/.test(vue.$root.host)) {
        // Si on est sur la page d'accueil
        l$ = {
          js: {
            ext() {
              if (vue.$root.cookie('r', 'calc-alert')) { jQuery('#classic .alert').hide(); }
              jQuery('#classic .alert').on('closed.bs.alert', () => {
                vue.$root.cookie('w', 'calc-alert', true, 31536000000);
              });
            },
          },
        };
      } else { // dans Ethercalc
        l$ = {
          js: {
            ext() {
              try {
                if (window.top.location.href.indexOf('framacalc.org/=') > -1) {
                  document.getElementById('framanav_container').style = 'height:42px; opacity:0';
                  document.getElementsByTagName('html')[0].setAttribute('data-inframe', 'false');
                }
              } catch (e) {
                // continue regardless of error
              }
              jQuery(window).trigger('resize');
            },
          },
        };
      }
      break;

    case 'drop':
      l$ = {
        js: {
          ext() {
            if (vue.$root.url !== 'https://framadrop.org/') {
              jQuery('main .row:last,main hr:last').hide();
            }
          },
        },
      };
      break;

    case 'libre':
      l$ = {
        js: {
          ext() {
            if (vue.$root.inframe) {
              document.querySelectorAll('a').forEach(a => Object.assign(a, { target: '_blank' }));
            }
          },
        },
      };
      break;

    case 'mindmap':
      if (/framindmap.org\/c\/maps\/(.*?)\/edit/.test(vue.$root.url)) {
        // [Fix] Suppression de la nav dans l'éditeur
        const f$NavContainer = document.getElementById('framanav_container');
        f$NavContainer.parentNode.removeChild(f$NavContainer);
      }
      break;

    case 'my':
      if (/source=bookmarklet/.test(vue.$root.url)) {
        document.getElementsByTagName('html')[0].setAttribute('data-inframe', 'true');
        l$ = {
          js: {
            ext() {
              document.getElementById('loginform').insertAdjacentHTML('beforeEnd',
                `<p class="alert alert-warning"><b>Rappel&nbsp;:</b> MyFrama sert à
                regrouper en un même endroit vos liens (notament vos pads, calcs, sondages, etc).
                Il ne permet <strong>pas de créer un compte unique</strong> pour
                accéder à l’ensemble des services de Framasoft.</p>`);
            },
          },
        };
      } else {
        l$ = {
          js: {
            ext() {
              if (vue.$root.inframe) {
                document.getElementById('linklist').classList.add('container-fluid');
                document.getElementById('linklist').classList.remove('container');
                document.getElementById('pageheader').style.display = 'none';
                document.querySelectorAll('a').forEach(a => Object.assign(a, { target: '_blank' }));
              }
            },
          },
        };
      }
      break;

    // <framapad> --------------------------------------------------------
    case 'etherpad': // dans Etherpad
      l$ = {
        js: {
          ext() {
            jQuery('#loading').delay(2000).append(`
              <p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br>
              l’export <a href="${vue.$root.url}/export/html">html</a>
              ou <a href="${vue.$root.url}/export/txt">txt</a>
              de votre document et <a href="${vue.$root.link.contact}/#framapad">contactez-nous</a>.</p>`);
            if (!vue.$root.inframe) {
              const addMaestroBtn = setInterval(() => {
                if (jQuery('#editbar .menu_right').length && !jQuery('#maestroBtn').length) {
                  jQuery('#editbar .menu_right').prepend(`
                    <li id="maestroBtn">
                      <a title="Ajouter une visio-conférence"
                        href="${vue.maestro}">
                        <button class="buttonicon fa fa-video-camera"
                          style="top:0 !important;"></button>
                        <span class="sr-only">Visio-conférence</span>
                      </a>
                    </li>`);
                  clearInterval(addMaestroBtn);
                }
              }, 1000);
            }
          },
        },
      };
      break;
      // </framapad> -------------------------------------------------------

    case 'piaf':
      l$ = {
        js: {
          ext() {
            jQuery('img[src*="/packs/logo"]').attr('src', 'https://framasoft.org/nav/img/icons/piaf.png');
          },
        },
      };
      break;

    case 'sphere':
      l$ = {
        js: {
          ext() {
            jQuery('#inscription-email').text(function emailReplace() {
              return jQuery(this).text()
                .replace('inscription-framasphere@framalistes.org', 'rt+framasphere@framasoft.org');
            });
            jQuery.getJSON('https://framasphere.org/nodeinfo/2.0').done((data) => {
              jQuery('#userFramasphere').text(data.usage.users.total);
            });
          },
        },
      };
      break;

    case 'status':
      l$ = {
        js: {
          ext() {
            jQuery('.section-components:eq(0) li.sub-component').each(function addContactLink() {
              const framatruc = jQuery(this).children('a');
              framatruc.after(`
                <span class="col-xs-1 pull-right">
                  <a
                    href="${vue.$root.link.contact}/#${framatruc.text().split(' ', 1)[0].toLowerCase().replace(/è/g, 'e')}"
                    class="btn btn-success btn-outline btn-xs"
                    title="Signaler une panne concernant ${framatruc.text()}">
                    <i class="fa fa-fw fa-lg fa-bug" aria-hidden="true"></i>
                    <span class="sr-only">Signaler</span>
                  </a>
                </span>`);
            });
            jQuery('.section-components:eq(0) li.sub-component a.btn[title]').tooltip();
            jQuery('.section-status').append(`
              <p class="well"><i class="fa fa-warning" aria-hidden="true"></i>
              Le statut des services n’est pas détecté automatiquement.
              Cette page est actualisée manuellement par l’équipe technique
              lorsqu’un incident est constaté ou qu’une opération de maintenance
              est programmée afin d’en informer le public.
              Si un service vous semble en panne mais n’est pas indiqué
              comme tel ici, merci de <a href="${vue.$root.link.contact}/#aide">
              nous le signaler</a>.</p>`);
          },
        },
      };
      break;

    case 'team':
      // l$.js = { ext: true }, // TODO Import team.js
      break;

    case 'zic':
      l$ = {
        js: {
          ext() {
            jQuery('button[name^="sp_"]').each(function clickableMoreBtn() {
              jQuery(this).on('click', function toggleMoreSection() {
                jQuery(['.', jQuery(this).attr('name')].join('')).toggle();
              });
            });
          },
        },
      };
      break;

    // no default
  }

  return l$;
}

export {
  siteConfig, // eslint-disable-line
};

