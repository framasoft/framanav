function pinchot(color, type) {
  switch ( color ) {
    case 'b': border = bec = '#0C5B7A'; break;
    case 'r': border = bec = '#CC2D18'; break;
    case 'v': border = bec = '#8E9C48'; break;
    case 'j': border = bec = '#C48A1B'; break;
    case 'f': border = '#6A5687' ; bec = '#EB7239'; break;
    case 'o': border = '#6A5687' ; bec = '#EB7239'; break;
  }
  
  switch ( type ) {
    case 'rect':
// Carré
  var html =
'<svg'+
'   xmlns:dc="http://purl.org/dc/elements/1.1/"'+
'   xmlns:cc="http://creativecommons.org/ns#"'+
'   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"'+
'   xmlns:svg="http://www.w3.org/2000/svg"'+
'   xmlns="http://www.w3.org/2000/svg"'+
'   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"'+
'   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"'+
'   width="121"'+
'   height="121"'+
'   id="svg4771"'+
'   version="1.1">'+
'  <defs'+
'     id="defs4773" />'+
'  <metadata'+
'     id="metadata4776">'+
'    <rdf:RDF>'+
'      <cc:Work'+
'         rdf:about="">'+
'        <dc:format>image/svg+xml</dc:format>'+
'        <dc:type'+
'           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />'+
'        <dc:title></dc:title>'+
'      </cc:Work>'+
'    </rdf:RDF>'+
'  </metadata>'+
'  <g'+
'     inkscape:label="Calque 1"'+
'     inkscape:groupmode="layer"'+
'     id="layer1"'+
'     transform="translate(-323.8125,-734.15625)">'+
'    <rect'+
'       style="fill:#ffffff;fill-opacity:1;stroke:none;display:inline"'+
'       id="rect6336-4-9-6"'+
'       width="114"'+
'       height="114"'+
'       x="327.10468"'+
'       y="737.41333"'+
'       rx="7"'+
'        />'+
'    <g'+
'       style="fill:#eb7239;fill-opacity:1;display:inline"'+
'       transform="matrix(0.26115035,0,0,0.26115035,337.00786,589.65949)"'+
'       id="g3934-8-8-2"'+
'       >'+
'      <path'+
'         sodipodi:nodetypes="ccccccccccc"'+
'         inkscape:connector-curvature="0"'+
'         id="path3926-0-8-9"'+
'         d="m 266.05688,662.62964 c -5.06605,1.49312 2.53872,6.05651 3.03822,8.98435 1.40892,2.9493 4.36632,4.98744 6.806,7.12979 4.36237,3.28368 8.50309,7.00504 13.73127,8.87149 7.24409,4.97783 11.06985,11.74361 12.96634,24.70447 -9.08991,-2.17901 -15.96923,-2.83244 -31.39817,-12.58792 16.07761,13.45629 25.98461,19.2946 31.91959,24.61446 5.75253,6.20655 16.11417,16.71079 26.033,32.33675 0.0472,-20.28344 -8.50609,-45.21733 -19.52164,-62.22272 -10.33801,-13.68807 -24.56125,-24.25619 -40.18044,-31.18242 -1.07809,-0.41847 -2.22799,-0.72036 -3.39417,-0.64825 z"'+
'         style="fill:'+bec+';fill-opacity:0.94117647;stroke:'+bec+';stroke-opacity:0.94117647" />'+
'    </g>'+
'    <path'+
'       id="path2885-0-6-1-5-7"'+
'       style="fill:'+bec+';fill-opacity:0.94117647;stroke:'+bec+';stroke-width:0.84497851;stroke-miterlimit:4;stroke-opacity:0.94117647;stroke-dasharray:none;display:inline"'+
'       d="m 425.32805,813.0977 c -1.0209,-0.38632 -2.20489,-0.31136 -3.15409,0.23551 -1.2712,0.67938 -2.0005,2.14282 -1.9762,3.55813 0.041,1.40846 0.9418,2.75826 2.2489,3.30012 1.0078,0.46243 2.21739,0.51682 3.22549,0.0253 1.0089,-0.44268 1.7531,-1.36993 2.0541,-2.42007 0.3522,-1.06597 0.1801,-2.27634 -0.4439,-3.20799 -0.4527,-0.70781 -1.165,-1.21925 -1.9543,-1.49097 z"'+
'       inkscape:connector-curvature="0"'+
'        />'+
'    <path'+
'       id="path2885-07-2-0-0-9"'+
'       style="fill:'+bec+';fill-opacity:0.94117647;stroke:'+bec+';stroke-width:0.84497851;stroke-miterlimit:4;stroke-opacity:0.94117647;stroke-dasharray:none;display:inline"'+
'       d="m 421.77426,826.24329 c -0.8469,-0.32047 -1.829,-0.25833 -2.6166,0.19535 -1.0547,0.56357 -1.6592,1.77757 -1.6394,2.95165 0.034,1.16837 0.7813,2.28806 1.8659,2.73756 0.8359,0.38362 1.8393,0.42874 2.6756,0.0209 0.8368,-0.36722 1.4542,-1.13641 1.7039,-2.00756 0.29219,-0.88424 0.14939,-1.88833 -0.3681,-2.66118 -0.3755,-0.58715 -0.9664,-1.01141 -1.6213,-1.2368 z"'+
'       inkscape:connector-curvature="0"'+
'        />'+
'    <g'+
'       transform="matrix(3.2964916,0.06835838,0.07138033,-3.1569309,-461.62145,2479.3029)"'+
'       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.39928606;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;display:inline"'+
'       id="g2891-9-4-3-7-6-0-2-0">'+
'      <path'+
'         style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:4.94435215;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"'+
'         d="m 674.375,-578.53125 c -2.88874,0.13382 -4.02185,1.21162 -0.4375,3.8125 16.75952,7.72369 34.50437,14.0216 49.5625,24.6875 33.69135,23.86404 55.37724,58.45628 66.46875,98.4375 6.4711,23.32625 5.50182,37.53462 9.3125,61 2.49985,14.10302 9.6008,32.64797 17.25,48.46875 10.34609,25.13897 26.03497,48.36096 41.8125,65.125 17.45317,17.33638 45.94157,36.88089 88.125,47.84375 17.51897,3.93804 27.59779,5.58745 32.28125,5.5 6.82876,1.83509 14.46693,2.06633 8.3125,-2.84375 -17.50502,-9.04305 -39.44068,-17.05625 -51.65625,-28.6875 -30.08055,-28.64143 -51.26922,-62.9643 -61.4375,-106.0625 -3.8576,-16.35056 -5.76057,-32.23727 -7.25,-45.90625 0.44893,-11.80125 1.76861,-24.10565 3.71875,-37.25 2.21078,-17.66517 14.05408,-32.18976 25.125,-43.34375 10.24538,-6.90474 18.86015,-9.99947 26.46875,-8.375 11.36409,2.56284 36.38452,7.96249 50.34375,8.34375 5.66185,-12.76922 -6.62196,-30.22377 -21.375,-42.15625 26.01322,-13.31492 50.7253,-19.35509 64.125,-23.34375 10.5249,-3.23303 -18.05733,-0.9422 -32.625,1.5 -19.55453,2.83292 -37.31898,4.61888 -54.8125,8.71875 -13.42363,-6.6494 -27.18496,-8.56114 -40.21875,-7.125 -7.20259,0.1264 -15.61695,1.66179 -21.65625,4.0625 -17.28316,6.75404 -36.20675,22.02737 -42.5625,36.5 -0.96011,1.43594 -1.96534,3.43123 -3,5.75 -5.17922,-8.28599 -11.05274,-15.78098 -17.40625,-22.03125 -30.81145,-30.79903 -73.31665,-36.0387 -115.03125,-49.71875 -3.10645,-1.69535 -9.72341,-3.0783 -13.4375,-2.90625 z M 889.25,-549.625 c 7.40203,0.003 13.28548,1.62505 13.5625,5.5 3.07504,8.29747 -15.17482,15.98417 -24.53125,18.59375 -11.46641,3.02402 -24.78893,11.34632 -33.21875,19.0625 -9.47256,6.82698 -20.87876,23.91281 -25.5625,34.3125 -17.58852,31.33288 -4.02166,-24.00528 4.5625,-36.84375 6.35575,-14.47263 25.27934,-29.77721 42.5625,-36.53125 6.30796,-2.50751 15.22297,-4.09641 22.625,-4.09375 z"'+
'         transform="matrix(0.07900954,0.00171083,0.00178646,-0.08250237,179.0648,504.56302)"'+
'         id="path2893-7-8-3-2-2-8-2-1"'+
'         inkscape:connector-curvature="0" />'+
'    </g>'+
'    <rect'+
'       style="fill:#ffffff;fill-opacity:1;stroke:'+border+';stroke-width:3.31800008;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;display:inline"'+
'       id="rect6336-4-9-5"'+
'       width="54.042019"'+
'       height="54.042019"'+
'       x="328.16364"'+
'       y="797.35419"'+
'       rx="3.3183696"'+
'        />'+
'    <text'+
'       xml:space="preserve"'+
'       style="font-size:34px;text-align:center;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:'+border+';fill-opacity:1;stroke:none;display:inline;font-family:FontAwesome;-inkscape-font-specification:FontAwesome"'+
'       x="355"'+
'       y="835" text-anchor="middle" alignment-baseline="middle"'+
'       id="text5115"'+
'       sodipodi:linespacing="125%"'+
'       ></text>'+
'    <rect'+
'       style="fill:#ffffff;fill-opacity:0;stroke:'+border+';stroke-width:7;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;display:inline"'+
'       id="rect6336-4-9"'+
'       width="114"'+
'       height="114"'+
'       x="327.32074"'+
'       y="737.66736"'+
'       rx="7"'+
'        />'+
'  </g>'+
'</svg>'; break;
  case 'round':
// Rond
  var html = '<svg'+
'   xmlns:dc="http://purl.org/dc/elements/1.1/"'+
'   xmlns:cc="http://creativecommons.org/ns#"'+
'   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"'+
'   xmlns:svg="http://www.w3.org/2000/svg"'+
'   xmlns="http://www.w3.org/2000/svg"'+
'   version="1.1"'+
'   width="120.00955"'+
'   height="120.00955"'+
'   id="svg5828">'+
'  <defs'+
'     id="defs5830" />'+
'  <metadata'+
'     id="metadata5833">'+
'    <rdf:rdf>'+
'      <cc:work'+
'         rdf:about="">'+
'        <dc:format>image/svg+xml</dc:format>'+
'        <dc:type'+
'           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />'+
'        <dc:title />'+
'      </cc:work>'+
'    </rdf:rdf>'+
'    <rdf:RDF>'+
'      <cc:Work'+
'         rdf:about="">'+
'        <dc:format>image/svg+xml</dc:format>'+
'        <dc:type'+
'           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />'+
'        <dc:title></dc:title>'+
'      </cc:Work>'+
'    </rdf:RDF>'+
'  </metadata>'+
'  <g'+
'     transform="translate(-179.9822,-523.79426)"'+
'     id="layer1">'+
'    <path'+
'       d="m 1893.6676,538.21155 a 50,50 0 1 1 -100,0 50,50 0 1 1 100,0 z"'+
'       transform="matrix(1.149104,0,0,1.149104,-1878.5658,-34.670288)"'+
'       id="path4856"'+
'       style="fill:#ffffff;fill-opacity:1;stroke:'+border+';stroke-width:4.42919111;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;display:inline" />'+
'    <g'+
'       transform="matrix(0.21653471,0,0,0.21653471,202.18811,413.35198)"'+
'       id="g3934-8-8-2"'+
'       style="fill:#eb7239;fill-opacity:1;display:inline">'+
'      <path'+
'         d="m 266.05688,662.62964 c -5.06605,1.49312 2.53872,6.05651 3.03822,8.98435 1.40892,2.9493 4.36632,4.98744 6.806,7.12979 4.36237,3.28368 8.50309,7.00504 13.73127,8.87149 7.24409,4.97783 11.06985,11.74361 12.96634,24.70447 -9.08991,-2.17901 -15.96923,-2.83244 -31.39817,-12.58792 16.07761,13.45629 25.98461,19.2946 31.91959,24.61446 5.75253,6.20655 16.11417,16.71079 26.033,32.33675 0.0472,-20.28344 -8.50609,-45.21733 -19.52164,-62.22272 -10.33801,-13.68807 -24.56125,-24.25619 -40.18044,-31.18242 -1.07809,-0.41847 -2.22799,-0.72036 -3.39417,-0.64825 z"'+
'         id="path3926-0-8-9"'+
'         style="fill:'+bec+';fill-opacity:0.94117647;stroke:'+bec+';stroke-opacity:0.94117647" />'+
'    </g>'+
'    <path'+
'       d="m 275.41951,598.61739 c -0.8465,-0.32032 -1.828,-0.25816 -2.6152,0.19527 -1.0541,0.56332 -1.6587,1.77674 -1.6387,2.95025 0.035,1.16785 0.7811,2.28702 1.8648,2.73632 0.8357,0.38344 1.8385,0.42852 2.6745,0.0209 0.8366,-0.36704 1.4537,-1.13588 1.7032,-2.00661 0.2919,-0.88385 0.1494,-1.88745 -0.368,-2.65992 -0.3755,-0.5869 -0.9658,-1.01096 -1.6206,-1.23625 z"'+
'       id="path2885-0-6-1-5-7"'+
'       style="fill:'+bec+';fill-opacity:0.94117647;stroke:'+bec+';stroke-width:0.70062006;stroke-miterlimit:4;stroke-opacity:0.94117647;stroke-dasharray:none;display:inline" />'+
'    <path'+
'       d="m 272.47311,609.51715 c -0.7026,-0.26573 -1.5167,-0.21421 -2.1698,0.16196 -0.8744,0.46732 -1.3758,1.47391 -1.3594,2.4474 0.03,0.96875 0.6478,1.89716 1.5473,2.26986 0.693,0.31808 1.525,0.35551 2.2183,0.0174 0.6939,-0.30449 1.206,-0.94228 1.4128,-1.6646 0.2425,-0.73319 0.124,-1.5657 -0.305,-2.20651 -0.3115,-0.48687 -0.8014,-0.83863 -1.3442,-1.02553 z"'+
'       id="path2885-07-2-0-0-9"'+
'       style="fill:'+bec+';fill-opacity:0.94117647;stroke:'+bec+';stroke-width:0.70062006;stroke-miterlimit:4;stroke-opacity:0.94117647;stroke-dasharray:none;display:inline" />'+
'    <g'+
'       transform="matrix(2.73331,0.05667984,0.05918551,-2.6175924,-460.001,1980.1635)"'+
'       id="g2891-9-4-3-7-6-0-2-0"'+
'       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.39928606;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;display:inline">'+
'      <path'+
'         d="m 674.375,-578.53125 c -2.88874,0.13382 -4.02185,1.21162 -0.4375,3.8125 16.75952,7.72369 34.50437,14.0216 49.5625,24.6875 33.69135,23.86404 55.37724,58.45628 66.46875,98.4375 6.4711,23.32625 5.50182,37.53462 9.3125,61 2.49985,14.10302 9.6008,32.64797 17.25,48.46875 10.34609,25.13897 26.03497,48.36096 41.8125,65.125 17.45317,17.33638 45.94157,36.88089 88.125,47.84375 17.51897,3.93804 27.59779,5.58745 32.28125,5.5 6.82876,1.83509 14.46693,2.06633 8.3125,-2.84375 -17.50502,-9.04305 -39.44068,-17.05625 -51.65625,-28.6875 -30.08055,-28.64143 -51.26922,-62.9643 -61.4375,-106.0625 -3.8576,-16.35056 -5.76057,-32.23727 -7.25,-45.90625 0.44893,-11.80125 1.76861,-24.10565 3.71875,-37.25 2.21078,-17.66517 14.05408,-32.18976 25.125,-43.34375 10.24538,-6.90474 18.86015,-9.99947 26.46875,-8.375 11.36409,2.56284 36.38452,7.96249 50.34375,8.34375 5.66185,-12.76922 -6.62196,-30.22377 -21.375,-42.15625 26.01322,-13.31492 50.7253,-19.35509 64.125,-23.34375 10.5249,-3.23303 -18.05733,-0.9422 -32.625,1.5 -19.55453,2.83292 -37.31898,4.61888 -54.8125,8.71875 -13.42363,-6.6494 -27.18496,-8.56114 -40.21875,-7.125 -7.20259,0.1264 -15.61695,1.66179 -21.65625,4.0625 -17.28316,6.75404 -36.20675,22.02737 -42.5625,36.5 -0.96011,1.43594 -1.96534,3.43123 -3,5.75 -5.17922,-8.28599 -11.05274,-15.78098 -17.40625,-22.03125 -30.81145,-30.79903 -73.31665,-36.0387 -115.03125,-49.71875 -3.10645,-1.69535 -9.72341,-3.0783 -13.4375,-2.90625 z M 889.25,-549.625 c 7.40203,0.003 13.28548,1.62505 13.5625,5.5 3.07504,8.29747 -15.17482,15.98417 -24.53125,18.59375 -11.46641,3.02402 -24.78893,11.34632 -33.21875,19.0625 -9.47256,6.82698 -20.87876,23.91281 -25.5625,34.3125 -17.58852,31.33288 -4.02166,-24.00528 4.5625,-36.84375 6.35575,-14.47263 25.27934,-29.77721 42.5625,-36.53125 6.30796,-2.50751 15.22297,-4.09641 22.625,-4.09375 z"'+
'         transform="matrix(0.07900954,0.00171083,0.00178646,-0.08250237,179.0648,504.56302)"'+
'         id="path2893-7-8-3-2-2-8-2-1"'+
'         style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:4.94435215;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" />'+
'    </g>'+
'    <path'+
'       d="m 1883.6676,510.71152 a 17.5,17.5 0 1 1 -35,0 17.5,17.5 0 1 1 35,0 z"'+
'       transform="matrix(1.7426238,0,0,1.7426238,-3037.2366,-280.71949)"'+
'       id="path5626"'+
'       style="fill:'+border+';fill-opacity:1;stroke:none;display:inline" />'+
'    <text'+
'       x="214"'+
'       y="622" text-anchor="middle" alignment-baseline="middle"'+
'       id="text5115"'+
'       xml:space="preserve"'+
'       style="font-size:36px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;display:inline;font-family:FontAwesome;-inkscape-font-specification:FontAwesome"></text>'+
'  </g>'+
'</svg>'; break;
  case 'fav':
// Fav
  var html = '<svg'+
'   xmlns:dc="http://purl.org/dc/elements/1.1/"'+
'   xmlns:cc="http://creativecommons.org/ns#"'+
'   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"'+
'   xmlns:svg="http://www.w3.org/2000/svg"'+
'   xmlns="http://www.w3.org/2000/svg"'+
'   version="1.1"'+
'   width="32"'+
'   height="32"'+
'   id="svg5920">'+
'  <defs'+
'     id="defs5922" />'+
'  <metadata'+
'     id="metadata5925">'+
'    <rdf:rdf>'+
'      <cc:work'+
'         rdf:about="">'+
'        <dc:format>image/svg+xml</dc:format>'+
'        <dc:type'+
'           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />'+
'        <dc:title />'+
'      </cc:work>'+
'    </rdf:rdf>'+
'    <rdf:RDF>'+
'      <cc:Work'+
'         rdf:about="">'+
'        <dc:format>image/svg+xml</dc:format>'+
'        <dc:type'+
'           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />'+
'        <dc:title></dc:title>'+
'      </cc:Work>'+
'    </rdf:RDF>'+
'  </metadata>'+
'  <g'+
'     transform="translate(-252.36127,-510.8581)"'+
'     id="layer1">'+
'    <path'+
'       d="m 1883.6676,510.71152 a 17.5,17.5 0 1 1 -35,0 17.5,17.5 0 1 1 35,0 z"'+
'       transform="matrix(0.91428571,0,0,0.91428571,-1437.8491,59.921857)"'+
'       id="path5626"'+
'       style="fill:'+border+';fill-opacity:1;stroke:none;display:inline" />'+
'    <text'+
'       x="268"'+
'       y="534" text-anchor="middle" alignment-baseline="middle"'+
'       id="text5115"'+
'       xml:space="preserve"'+
'       style="font-size:20px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;display:inline;font-family:FontAwesome;-inkscape-font-specification:FontAwesome"></text>'+
'  </g>'+
'</svg>'; break;
}
  return html;
};

jQuery(document).ready(function() {
  
  function svg2png(id) {
    var canvas = document.getElementById('canvas_'+id);
    var ctx = canvas.getContext("2d");

    var img = new Image();
    var svg = new Blob([jQuery('#svg_'+id).html()], {type: "image/svg+xml;charset=utf-8"});
    var url = self.URL.createObjectURL(svg);
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };
    img.src = url;
  }

  size = new Array('rect', 'round', 'fav');

  jQuery.getJSON( 'https://framasoft.org/nav/html/data.fr.json' ).done( 
    function(data) { 
      d$ = data;
      for (var k in d$.meta) {
        d$.f[k] = d$.meta[k];
      }
      
      for (var k in d$.f) {
        
        d$.f[k].c = (k == 'wiki' || k == 'agora' || k == 'participer' || k == 'soutenir' || /evl/g.test(k)) ? 'j' : d$.f[k].c;
        d$.f[k].c = (k == 'myframa') ? 'v' : d$.f[k].c;
        
        noIcon = new Array(
          'vvl', 'clibre',
          'ptilouk', 'noenaute', 'planet-libre',
          'diaspora', 'twitter', 'facebook', 'gplus', 'newsletter', 'rss', 'wikipedia',
          'asso', 'charte', 'benevalo', 'partenaires', 'aide', 'faq', 'legals', 'cgu', 'credits'
        );
        
        if( d$.f[k].i && !(noIcon.indexOf(k) > -1)) {
          jQuery('.container.ombre').append('<i id="emblem_'+k+'" class="hidden fa '+d$.f[k].i+'"></i>');
          
          for (var i in size) {
            icon = pinchot( d$.f[k].c, size[i] );          
            jQuery('.container.ombre').append(
              '<div id="svg_'+size[i]+k+'" class="hidden">'+icon+'</div>'
            );
            jQuery('.container.ombre').append(
              '<canvas id="canvas_'+size[i]+k+'" '+
                'width="'+jQuery('#svg_'+size[i]+k+' svg').width()+'" '+
                'height="'+jQuery('#svg_'+size[i]+k+' svg').height()+'">'+
              '</canvas>'
            );
          
            jQuery('#emblem_'+k).each(function(){
              jQuery('#svg_'+size[i]+k+' svg #text5115').text( window.getComputedStyle(this,':before').content[1] );
            });
          
            svg2png(size[i]+k);
        
          }
        }
      }
    }
  );
});  

