// Framapiaf (only for framapiaf.org)
if(i$('/auth') || i$('remote_follow')) { $('.container').addClass('ombre'); }
$('img[src^="/assets/logo"]').attr("src","https://framasoft.org/nav/img/icons/piaf.png");

// Filters (could work on any Mastodon instance)
/*var Storage = localStorage.getItem('piafFilters');
if(Storage === null) {
    piafFilters = []
} else {
    piafFilters = Storage.split(',');
}

$('#piaf-filters-link').click(function() {
    $('.getting-started__wrapper').hide();
    $('#piaf-filters-form').show();
});

setInterval(function() {

    if(!$('#piaf-filters-link').length) {
        $('.getting-started__wrapper a[href="/web/blocks"]').after(
            '<a class="column-link" id="piaf-filters-link" href="javascript:void(0)"><i class="fa fa-fw fa-filter column-link__icon"></i>Filtres</a>'
        );

        $('.getting-started__wrapper').after(
            '<div id="piaf-filters-form" style="display:none;background:#EDE6F5; padding:10px">'+
                '<div class="alert alert-info"><p class="text-warning"><i class="fa fa-fw fa-warning" aria-hidden="true"></i> Cette fonctionalité est expérimentale et ne s’applique que sur le navigateur web que vous utilisez en ce moment.</p>'+
                '<p>Vous pouvez ajouter ci-dessous <span class="small">(1 par ligne)</span> les @instances, les #hashtags et les [mots] <span class="small">(du nom public de l’auteur)</span> des pouets que vous voulez faire disparaître de toutes vos colonnes.'+
                '<br>Exemple :</p><pre class="well" style="padding:10px;margin:0">@pawoo.net<br>#nsfw<br>[BOT]</pre>'+
                '<p>Pour afficher/masquer les pouets filtrés vous pouvez utiliser le raccourci clavier <kbd>G + F </kbd>.</p></div>'+
                '<textarea class="autosuggest-textarea__textarea" style="height:200px">'+piafFilters.toString().replace(/,/g,'\r\n')+'</textarea>'+
                '<p class="alert"><button class="btn btn-default" id="piaf-filters-cancel">Annuler</button><button class="btn btn-primary pull-right" id="piaf-filters-save">Enregistrer</button></p>'+
            '</div>'
        );

        $('#piaf-filters-link').click(function(){
            $('.getting-started__wrapper').hide();
            $('#piaf-filters-form').show();
        });

        $('#piaf-filters-cancel').click(function(){
            $('.getting-started__wrapper').show();
            $('#piaf-filters-form').hide();
            $('#piaf-filters-form textarea').val(piafFilters.toString().replace(/,/g,'\r\n'));
        });

        $('#piaf-filters-save').click(function(){
            piafFilters = $('#piaf-filters-form textarea').val().replace(/\r\n/g,"\n").split('\n');
            localStorage.setItem('piafFilters', piafFilters);
            $('#piaf-filters-save').attr('disabled','true').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>Rechargement…');
            $('#piaf-filters-cancel').attr('disabled','true');
            window.location.reload(true);
        });
    }

    $.each(piafFilters, function(index, value) {
        switch (value.substring(0,1)) {
            case "@" :
                $('a .display-name__account:contains("' + value + '")').parents('.status,.status__wrapper').css('background','#fde0dc').hide(); // @pawoo.net or @trolluser@
                break;
            case "[" :
                $('a .display-name__html:contains("' + value + '")').parents('.status,.status__wrapper').css('background','#fde0dc').hide(); // [BOT]
                $('a .display-name__html:contains("' + value.replace(/\[\]/g,' ') + '")').parents('.status,.status__wrapper').css('background','#fde0dc').hide(); // BOT
                break;
            case "#" :
                $('a.hashtag[href$=' + value.replace(/#/g,'') + ']').parents('.status,.status__wrapper').css('background','#fde0dc').hide(); // #starwars
                break;
        }
    });

}, 1000);

// Filtered pouets show/hide on G+F keyboard shortcut
var isG = false;
$(document).keydown(function(e) {
	if (e.which == 71 || e.keyCode == 71) { // G pressed
		isG = true;
	}
}).keyup(function(e) {
	if ($('input:focus').length > 0 || $('textarea:focus').length > 0 || isG !== true) {
		isG = false;
		return false;
	}
	var key = (e.keyCode === true) ? e.keyCode : e.which;

	if (key==70) { // F pressed
        if( $('#piafToggle').length ) {
            // Pouets hidden
            $('#piafToggle').remove();
        } else {
            // Pouets visible
            $('head').append('<style id="piafToggle">.status[style],.status__wrapper[style] {display:block !important}</style>');
        }
    }
	isG = false;
});
*/