// Framapiaf (only for framapiaf.org)
if(i$('/auth') || i$('remote_follow')) { $('.container').addClass('ombre'); }
$('img[src^="/assets/logo"]').attr("src","https://framasoft.org/nav/img/icons/piaf.png");

// Filters (could work on any Mastodon instance)
var Storage = localStorage.getItem('piafFilters');
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
                '<p class="alert alert-info"><span class="text-warning"><i class="fa fa-fw fa-warning" aria-hidden="true"></i> Cette fonctionalité est expérimentale et ne s’applique que sur le navigateur web que vous utilisez en ce moment.</span>'+
                '<br>Vous pouvez ajouter ci-dessous les @instances, les #hashtags et les [mots] des pouets que vous voulez faire disparaître de vos <i lang="en">timelines</i>. '+
                'Exemple :<br><code>@pawoo.net<br>#starwars<br>[BOT]</code></p>'+
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
            window.location.reload(true);
        });
    }

    $.each(piafFilters, function(index, value) {
        switch (value.substring(0,1)) {
            case "@" :
                $('a .display-name__account:contains("' + value + '")').parents('.status,.status__wrapper').hide(); // @pawoo.net or @trolluser@
                break;
            case "[" :
                $('a .display-name__html:contains("' + value + '")').parents('.status,.status__wrapper').hide(); // [BOT]
                $('a .display-name__html:contains("' + value.replace(/\[\]/g,' ') + '")').parents('.status,.status__wrapper').hide(); // BOT
                break;
            case "#" :
                $('a.hashtag[href$=' + value.replace(/#/g,'').toLowerCase() + ']').parents('.status,.status__wrapper').hide(); // #starwars
                break;
        }
    });

}, 1000);