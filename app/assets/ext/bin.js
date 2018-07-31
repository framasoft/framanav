/* global n$:{} f$ */

if (window.top.location.href.indexOf('framabin.org/p/') > -1) {
  // Framabin text
  let i18n = {
    header: {
      lead: 'Send encrypted messages',
    },
    presentation: {
      h2_1: 'Getting started',
      serviceby: '<b class="violet">Frama</b><b class="vert">bin</b> is a free and minimalist online service that allows confidential and secure text sharing.',
      paste: 'Paste the text to be transmitted.',
      config: 'If needed, define its shelf life online, add a discussion space or enable code coloration.',
      share: 'Then share with your correspondents the link that is given to you.',
      crypto: 'Your data (including comments) is <b>encrypted in the web browser</b> using <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard">the algorithm <attr title="Advanced Encryption Standard">AES</attr> 256 bits</a>.<br>It is then transmitted and stored on our servers without us being able to decrypt it. Only you have the key</b> used to encrypt and decrypt the data.',
      h2_2: 'The software',
      framaware: '<b class="violet">Frama</b><b class="vert">bin</b> is based on the software <a href="https://privatebin.info/">PrivateBin</a>, a fork of ZeroBin originally developed by Sébastien Sauvage.',
      license: 'PrivateBin and its components are <a href="https://github.com/PrivateBin/PrivateBin/blob/master/LICENSE.md">under free license</a>.',
      browsers: '<b class="violet">Frama</b><b class="vert">bin</b> requires Javascript to work and a recent web browser:',
      noie: 'The use of Internet Explorer is not recommended.',
      h2_3: 'Cultivate your garden',
      contrib_upstream: 'To participate into the development of the software, suggest improvements or just download it, go to <a href="https://github.com/PrivateBin/PrivateBin/">the development site</a>.',
      home_install: 'If you wish to install your own instance of the software and increase your autonomy, we help you at:',
    },
  };

  if (n$.is.lang('fr')) {
    i18n = {
      header: {
        lead: 'Transmettez des messages chiffrés',
      },
      presentation: {
        h2_1: 'Prise en main',
        serviceby: '<b class="violet">Frama</b><b class="vert">bin</b> est un service en ligne libre et minimaliste qui permet de partager des textes de manière confidentielle et sécurisée.',
        paste: 'Collez le texte à transmettre.',
        config: 'Si besoin, définissez sa durée de conservation en ligne, ajoutez un espace de discussion ou activez la coloration du code.',
        share: 'Partagez ensuite avec vos correspondants le lien qui vous est donné.',
        crypto: 'Vos données (commentaires inclus) sont <b>chiffrées dans le navigateur web</b> en utilisant <a href="https://fr.wikipedia.org/wiki/Advanced_Encryption_Standard">l’algorithme <attr title="Advanced Encryption Standard">AES</attr> 256 bits</a>.<br>Elles sont ensuite transmises et stockées sur nos serveurs sans qu’il nous soit possible de les déchiffrer. <b>Vous seuls possedez la clé</b> utilisée pour chiffrer et déchiffrer les données.',
        h2_2: 'Le logiciel',
        framaware: '<b class="violet">Frama</b><b class="vert">bin</b> repose sur le logiciel <a href="https://privatebin.info/">PrivateBin</a>, un fork de ZeroBin initialement développé par Sébastien Sauvage.',
        license: 'PrivateBin et ses composants sont <a href="https://github.com/PrivateBin/PrivateBin/blob/master/LICENSE.md">sous licence libre</a>.',
        browsers: '<b class="violet">Frama</b><b class="vert">bin</b> requiert l’activation du Javascript pour fonctionner ainsi qu’un navigateur web récent :',
        noie: 'L’utilisation d’Internet Explorer n’est pas recommandée.',
        h2_3: 'Cultivez votre jardin',
        contrib_upstream: 'Pour participer au développement du logiciel, proposer des améliorations ou simplement le télécharger, rendez-vous sur <a href="https://github.com/PrivateBin/PrivateBin/">le site de développement</a>.',
        home_install: 'Si vous souhaitez installer ce logiciel pour votre propre usage et ainsi gagner en autonomie, nous vous aidons sur :',
      },
    };
  }

  f$('.container.ombre')
    .prepend(`
      <header role="banner">
        <a href="https://framabin.org"><h1><b class="frama">Frama</b><b class="services">bin</b></h1></a>
        <p class="lead">${i18n.header.lead}</p>
        <hr class="trait" role="presentation" />
      </header>
    `)
    .append(`
      <hr role="presentation" />
      <div class="row">
        <div class="col-md-4" id="tuto-faq">
           <h2>${i18n.presentation.h2_1}</h2>
           <p class="text-center" aria-hidden="true"><i class="glyphicon glyphicon-question-sign"></i></p>
           <div id="aboutbox">
             <p>${i18n.presentation.serviceby}</p>
             <ol>
               <li>${i18n.presentation.paste}</li>
               <li>${i18n.presentation.config}</li>
               <li>${i18n.presentation.share}</li>
             </ol>
             <p>${i18n.presentation.crypto}</p>
           </div>
         </div>
         <div class="col-md-4" id="le-logiciel">
           <h2>${i18n.presentation.h2_2}</h2>
           <p class="text-center" aria-hidden="true"><i class="glyphicon glyphicon-cloud"></i></p>
           <p>${i18n.presentation.framaware}</p>
           <p>${i18n.presentation.license}</p>
           <p>${i18n.presentation.browsers}</p>
           <ul>
             <li><a href="http://www.mozilla.org/firefox/">Firefox</a>,</li>
             <li>Opera,</li>
             <li>Chrome,</li>
             <li>Safari…</li>
           </ul>
           <p>${i18n.presentation.noie}</p>
         </div>
         <div class="col-md-4" id="jardin">
           <h2>${i18n.presentation.h2_3}</h2>
           <p class="text-center" aria-hidden="true"><i class="glyphicon glyphicon-tree-deciduous"></i></p>
           <p>${i18n.presentation.contrib_upstream}</p>
           <p>${i18n.presentation.home_install}</p>
           <p class="text-center"><a href="http://framacloud.org/fr/cultiver-son-jardin/pastebin.html" class="btn btn-success"><i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i> framacloud.org</a></p>
         </div>
       </div>
    `);
  f$('#sendbutton').addClass('btn-primary');
}
