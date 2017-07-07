//if(window.location.href != window.location.protocol+'//'+window.location.host+'/') { // Not on homepage

if(window.location.href == 'https://framemo.org/demo42') {

    /** Double click on mobile interface **/

    var clickTimer = null;
    var clickTarget = null;
    var editTarget = null;

    function doubletap( selector ) {

        jQuery(selector+' .stickertarget').addClass('doubletap') // Escape multi bound

        jQuery(selector+' .doubletap').on('click', function() {

            clickTarget = selector.replace('#','');

            if (clickTimer == null) {

                clickTimer = setTimeout(function () {
                    clickTimer = null;
                }, 1000)

            } else {
                console.log('doubleclick : '+clickTimer+':'+editTarget);
                clearTimeout(clickTimer);
                clickTimer = null;

                if(editTarget == clickTarget && clickTarget !== undefined && clickTarget !== null) {
                    jQuery('#'+clickTarget.replace('content:','')+' .doubletap').trigger('dblclick');
                }

            }

            editTarget = clickTarget;

        });
    }

    setInterval(function() { // Add periodically the doubletap event on new cards

        jQuery('.stickertarget:not(.doubletap)').each(function(){
            doubletap('#'+jQuery(this).attr('id').replace('content:',''));
        });

    }, 500);

    /** Layout Framemo - Tabs **/

    jQuery('.board-outline')
        .before(
        '<ul class="nav nav-tabs">'+
            '<li role="presentation" class="active"><a href="#scrumblr" aria-controls="scrumblr" role="tab" data-toggle="tab"><i class="fa fa-fw fa-lg fa-object-group" aria-hidden="true"></i> Tableau</a></li>'+
            '<li role="presentation" class="pull-right"><a href="javascript:void(0);" aria-hidden="true" id="full-page"><i class="fa fa-fw fa-lg fa-expand"></i></a></li>'+
            '<li role="presentation" class="pull-right"><a href="#revisions" aria-controls="revisions" role="tab" data-toggle="tab"><i class="fa fa-fw fa-lg fa-history" aria-hidden="true"></i><span class="sr-only">'+jQuery('.revision h3').text()+'</span></a></li>'+
            '<li role="presentation" class="pull-right"><a href="#export-import" aria-controls="export-import" role="tab" data-toggle="tab"><i class="fa fa-fw fa-lg fa-exchange" aria-hidden="true"></i><span class="sr-only">'+jQuery('.export h3').text()+'/'+jQuery('.import h3').text()+'</span></a></li>'+
            '<li role="presentation" class="pull-right"><a href="#about" aria-controls="about" role="tab" data-toggle="tab"><i class="fa fa-fw fa-lg fa-question-circle" aria-hidden="true"></i><span class="sr-only">'+jQuery('#tuto-faq h2').text()+'</span></a></li>'+
        '</ul>'
        )
        .wrap(
            '<div class="tab-content" style="margin:20px 0"><div role="tabpanel" class="tab-pane active" id="scrumblr"></div></div>'
        )
        .css('margin','auto');

    jQuery('.names').css({'margin':'auto','width':'auto'}).addClass('pull-right');

    jQuery('#scrumblr')
        .append(jQuery('.names, .stickers, .buttons'))
        .after(
            '<div role="tabpanel" class="tab-pane" id="export-import"></div>'+
            '<div role="tabpanel" class="tab-pane" id="revisions"></div>'+
            '<div role="tabpanel" class="tab-pane" id="about"></div>'
        );

    jQuery('#export-import').append(jQuery('.export, .import'));
    jQuery('#revisions').append(jQuery('.revisions'));
    jQuery('#about').append(jQuery('#tuto-faq, #le-logiciel, #jardin'));

    // Style
    jQuery('#create-card').addClass('vert fa-3x').css('opacity','1');
    jQuery('#smallify').removeClass('fa-expand').addClass('fa-search-minus').on('click',function(){
        if (currentTheme == "bigcards") {
            jQuery(this).removeClass('fa-search-plus').addClass('fa-search-minus');
        } else {
            jQuery(this).removeClass('fa-search-minus').addClass('fa-search-plus');
        }
    })

    jQuery('#full-page').on('click', function(){
        if (jQuery('.container.ombre').length) {
            jQuery(this).children('i').removeClass('fa-expand').addClass('fa-compress');
            jQuery('.container.ombre').removeClass('container').addClass('container-fluid');
        } else {
            jQuery(this).children('i').removeClass('fa-compress').addClass('fa-expand');
            jQuery('.container-fluid.ombre').removeClass('container-fluid').addClass('container');
        }
    })

     jQuery('main hr').hide();

    /** Mode iframe **/
    if(top.location!=self.document.location) {

        jQuery('#full-page').hide().trigger('click');
        jQuery('main hr, header').hide();

    }

}