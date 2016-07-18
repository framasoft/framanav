// Tutoriel
d$.f.date.modal = {
  id: 'TutoModal',
  title: '',
  file: '',
  link: '',
  or: '',
}

if( i$Lang('fr') ) {
  d$.f.date.modal.title = 'Planifier un rendez-vous rapidement avec Framadate';
  d$.f.date.modal.file = 'tutoframadate.html';
  d$.f.date.modal.link = 'lire le tutoriel détaillé ?';
  d$.f.date.modal.or = 'ou';
}

if( i$Lang('en') ) {
  d$.f.date.modal.title = 'How to quickly schedule a meeting with Framadate';
  d$.f.date.modal.file = 'tutoframadateENG.html';
  d$.f.date.modal.link = 'read the how-to?';
  d$.f.date.modal.or = 'or';
}

if( d$.f.date.modal.file != '' ) {
  f$('a[href*="aqg259dth55iuhwm"]:contains("exemple")').before('<a href="javascript:void(0)" data-toggle="modal" data-target="#TutoModal">'+d$.f.date.modal.link+'</a> '+d$.f.date.modal.or+' ');
  f$('main .col-md-4:has(.glyphicon-question-sign)').append(
    h$Modal('TutoModal', d$.f.date.modal.title, '', '<button class="btn" id="modal-close" data-dismiss="modal">'+d$.t.close+'</button>')
  );
  f$('#TutoModal .modal-body').load('_tutoriel/'+d$.f.date.modal.file+' .row', function() {
    f$( "#TutoModal .modal-body img" ).attr( "src", function( i, val ) {
      return '_tutoriel/'+ val;
    });
    f$( "#TutoModal .modal-body .row" ).after('<hr role="presentation" />');
  });
}

// Bouton edit
var f$_btn_edit = f$('#poll_form a.btn[href$="edit"]').parent().html();
f$('#message-container a[href$="edit"]').after(function(){
  return '<div class="input-group input-group-sm">'+
    '<div class="input-group-btn">'+
       f$_btn_edit+
    '</div>'+
    '<input class="form-control" readonly="readonly" value="'+f$(this).attr('href')+'" type="text" aria-hidden="true">'+
  '</div>'
}).remove();

f$('head').append('<style>.yes .btn,.yes .btn:hover { color: #677835 !important;}.ifneedbe .btn,.ifneedbe .btn:hover { color: #C48A1B !important;}.no .btn,.no .btn:hover{color: #AD220F !important;}.ifneedbe input[type="radio"]:checked + label,.yes input[type="radio"]:checked + label { color: #fff !important;}.no .btn.startunchecked {color:#AD220F !important;}.no input[type="radio"]:checked + label:not(.startunchecked){color:#fff !important}</style>');

});
