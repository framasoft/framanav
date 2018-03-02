/* global d$:{} f$ n$:{} */

// Tutoriel
d$.f.date.modal = {
  title: '',
  file: '',
  link: '',
  or: '',
};

if (n$.is.lang('fr')) {
  d$.f.date.modal.title = 'Planifier un rendez-vous rapidement avec Framadate';
  d$.f.date.modal.file = 'https://docs.framasoft.org/fr/framadate/prise-en-main.html';
  d$.f.date.modal.link = 'lire le tutoriel détaillé ?';
  d$.f.date.modal.or = 'ou';
}

if (n$.is.lang('en')) {
  d$.f.date.modal.title = 'How to quickly schedule a meeting with Framadate';
  d$.f.date.modal.file = 'https://docs.framasoft.org/en/framadate/prise-en-main.html';
  d$.f.date.modal.link = 'read the how-to?';
  d$.f.date.modal.or = 'or';
}

if (d$.f.date.modal.file !== '') {
  f$('a[href*="aqg259dth55iuhwm"]:contains("exemple")').before([
    '<a href="', d$.f.date.modal.file, '">', d$.f.date.modal.link, '</a> ',
    d$.f.date.modal.or, ' ',
  ].join(''));
}

f$('head').append([ // TODO à déplacer dans frama.scss
  '<style>',
  '.yes .btn,.yes .btn:hover { color: #677835 !important;}',
  '.ifneedbe .btn,.ifneedbe .btn:hover { color: #C48A1B !important;}',
  '.no .btn,.no .btn:hover{color: #AD220F !important;}',
  '.ifneedbe input[type="radio"]:checked + label,',
  '.yes input[type="radio"]:checked + label { color: #fff !important;}',
  '.no .btn.startunchecked {color:#AD220F !important;}',
  '.no input[type="radio"]:checked + label:not(.startunchecked){color:#fff !important}',
  '#message-container .well {display:none;}',
  '</style>',
].join(''));
