/** ****************************************************************** *
 *                          Config des sites                           *
 * ******************************************************************* */
function siteConfig(vue) {
  let l$; l$ = l$ || {}; // eslint-disable-line

  switch (vue.site) {
    case 'forum':
      l$ = {
        modal: {
          info: [
            'Fermeture de Framagora', `
            <p>
              Après 15 années d’existence, le forum historique de Framasoft,
              ferme ses portes.
              Pour les nostalgiques et les curieux, il reste toujours possible
              de consulter les discussions mais c’est maintenant le forum
              ${vue.$root.html.colibri} qui prend la relève.
            </p>
            <p>
              Nous avions mis en place ${vue.$root.html.colibri} en 2015
              pour permettre aux bénévoles souhaitant
              participer aux projets de Framasoft de s’organiser sur un
              forum vierge et moderne. Aujourd’hui, la dynamique est bien là.
            </p>
            <p>
              Nous y avons donc reporté les quelques catégories de Framagora
              qui étaient encore un peu actives&nbsp;:
            <p>
            <ul>
              <li><a href="${vue.$root.link.colibri}/c/framasoft-vous/cherche-logiciel-libre-pour">Cherche logiciel libre pour…</a></li>
              <li><a href="${vue.$root.link.colibri}/c/framasoft-vous/ask-frama">Questions / réponses</a></li>
              <li><a href="${vue.$root.link.colibri}/c/qualite/framakey">Framakey</a></li>
              <li><a href="${vue.$root.link.colibri}/c/qualite">Améliorons ensemble les outils Framasoft</a></li>
              <li><a href="${vue.$root.link.colibri}/c/framasoft-vous/presentations">Présentation des membres</a></li>
            </ul>
            <p>
              Si vous avez des questions, on se retrouve là-bas…
              <img src="${vue.$root.link.colibri}/images/emoji/emoji_one/wink.png?v=0" alt=";)" style="width:20px"/>
            </p>
            <p class="text-center">
              <a href="${vue.$root.link.colibri}" class="btn btn-default">
                <b>https://</b><b class="violet">frama</b><b class="jaune">colibri</b><b>.org</b>
              </a>
            </p>`,
          ],
        },
      };
      break;

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

    case 'bin':
      l$ = {
        js: {
          ext() {
            const container = document.querySelector('.container.ombre');
            container
              .insertBefore(document.getElementById('framabin_header'),
                container.firstChild);
            container
              .appendChild(document.getElementById('framabin_presentation'));
            document.getElementById('sendbutton').classList.add('btn-primary');
          },
        },
        modal: {
          don: ['onstart', 'txt.action.use', 'txt.actionBtn.use'],
        },
      };
      break;

    case 'blog':
      l$ = {
        optin: ['#commentform #email'],
      };
      break;

    case 'board':
      if (vue.isURL('.framaboard')) { // dans Kanboard
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
      } else {
        l$.optin = ['#registration #email'];
      }
      break;

    case 'book':
      l$ = {
        modal: { don: ['a[href*="download-monitor/download.php?id="]'] },
      };
      break;

    case 'calc':
      if (vue.isURL('accueil.framacalc.org')) {
        // Si on est sur la page d'accueil
        l$ = {
          modal: {
            don: ['a[href*="lite.framacalc.org/"]', 'txt.action.use', 'txt.actionBtn.calc'],
          },
          js: {
            ext() {
              if (vue.cookie('r', 'calc-alert')) { jQuery('#classic .alert').hide(); }
              jQuery('#classic .alert').on('closed.bs.alert', () => {
                vue.cookie('w', 'calc-alert', true, 31536000000);
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

    case 'carte':
      l$.modal = { don: ['a.btn-primary[href*="/map/new/"]', 'txt.action.use', 'txt.actionBtn.map'] };
      break;

    case 'date':
      l$ = {
        modal: {
          don: ['a[href*="create_poll.php?"]', 'txt.action.use', 'txt.actionBtn.poll'],
        },
        optin: (vue.isURL('create_poll.php?') ? ['#formulaire input#email'] : ['']),
      };
      break;

    case 'dvd':
      l$.modal = { don: ['a[href*="iso.framadvd.org"]'] };
      break;

    case 'drop':
      l$ = {
        js: {
          ext() {
            if (!vue.isURL('https://framadrop.org/', 'u')) {
              jQuery('main .row:last,main hr:last').hide();
            }
          },
        },
      };
      break;

    case 'games':
      l$.modal = { don: ['.play a', 'txt.action.use', 'txt.actionBtn.use'] };
      break;

    case 'key':
      l$.modal = { don: ['a[href*="framaclic.org"]'] };
      break;

    case 'libre':
      l$ = {
        js: {
          ext() {
            if (vue.inframe) {
              document.querySelectorAll('a').forEach(a => Object.assign(a, { target: '_blank' }));
            }
          },
        },
        alert: [
          'info',
          ` ${vue.$root.color.libre}, l’annuaire des logiciels libres de l’association
            ${vue.$root.color.soft}
            <a href="https://framablog.org/2017/03/21/framalibre-lannuaire-du-libre-renait-entre-vos-mains/"
            >fait peau neuve</a>.<br>
            Certains liens prééxistants ne sont plus valides.
            <a href="${vue.$root.link.contact}/fr/faq/#libre_v2">
            Vous avez du mal à vous y retrouver&nbsp;?</a>`,
        ],
      };
      break;

    case 'link':
      l$.modal = { don: ['onstart', 'txt.action.use', 'txt.actionBtn.use'] };
      break;

    case 'localhost:8080':
      l$ = {
        modal: { don: ['onstart', 'txt.action.use', 'txt.actionBtn.use'] },
      };
      break;

    case 'mindmap':
      l$ = {
        optin: ['#user #email'],
      };
      if (vue.isURL('framindmap.org/c/maps/') && !vue.isURL('/edit')) {
        l$.modal = { don: ['onstart', 'txt.action.use', 'txt.actionBtn.use'] };
      }
      if (vue.isURL('framindmap.org/c/maps') && vue.isURL('/edit')) {
        // [Fix] Suppression de la nav dans l'éditeur
        const f$NavContainer = document.getElementById('framanav_container');
        f$NavContainer.parentNode.removeChild(f$NavContainer);
      }
      break;

    case 'my':
      if (vue.isURL('source=bookmarklet')) {
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
              if (vue.inframe) {
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

    case 'pack':
      l$.modal = { don: ['onstart', 'txt.action.use', 'txt.actionBtn.use'] };
      break;

    // <framapad> --------------------------------------------------------
    case 'pad':
      l$.modal = { don: ['a[href*=".framapad.org/p/"]', 'txt.action.use', 'txt.actionBtn.pad'] };
      break;

    case 'mypads':
      l$ = { credits: 'pad' };
      break;

    case 'etherpad': // dans Etherpad
      l$ = {
        js: {
          ext() {
            jQuery('#loading').delay(2000).append(`
              <p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br>
              l’export <a href="${window.location.href}/export/html">html</a>
              ou <a href="${window.location.href}/export/txt">txt</a>
              de votre document et <a href="${vue.$root.link.contact}/#framapad">contactez-nous</a>.</p>`);
            if (!vue.inframe) {
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
        credits: 'pad',
      };
      if (vue.isURL(/(beta.framapad)/i, 'h')) {
        l$.modal = {
          info: [
            'Avertissement',
            ` <p>Cette instance de Framapad (<b>beta</b>.framapad.org) est
              instable et ne doit servir que pour des tests.<p>
              <p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>
              <p>Merci.<br>L’équipe technique</p>`,
          ],
        };
      }
      break;
      // </framapad> -------------------------------------------------------

    case 'phonie':
      break;

    case 'piaf':
      l$ = {
        js: {
          ext() {
            jQuery('img[src*="/packs/logo"]').attr('src', 'https://framasoft.org/nav/img/icons/piaf.png');
          },
        },
      };
      break;

    case 'pic':
      l$ = {
        modal: { don: ['onstart', 'txt.action.use', 'txt.actionBtn.use'] },
      };
      break;

    case 'site':
      l$ = {
        alert: [
          'info',
          ` ${vue.$root.color.site} est en phase de test.
            Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque.
            C’est à l’écoute de vos retours que nous allons l’améliorer
            et le documenter au cours des semaines à venir.`,
        ],
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

    case 'vectoriel':
      if (!vue.isURL('svg-editor')) { // Pas dans SVG-Editor
        l$.modal = { don: ['a[href$="svg-editor.html"]', 'txt.action.use', 'txt.actionBtn.img'] };
      }
      break;

    case 'wiki':
      if (vue.isURL('frama.wiki', 'h')) {
        l$ = {
          alert: [
            'info',
            ` ${vue.$root.color.wiki} est en phase de test.
              Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque.
              C’est à l’écoute de vos retours que nous allons l’améliorer
              et le documenter au cours des semaines à venir.`,
          ],
        };
      } else {
        // vue.isURL('mediamanager.php');
        l$ = {
          alert: ['', ''],
        };
      }
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

