(function($){
  $('document').ready(function(){
    var tileXY_s;
    $('#create-level').on('click', function(){
      var numOfTilesX_i = parseInt($('#x-tiles').val());
      var numOfTilesY_i = parseInt($('#y-tiles').val());
      var level_a = new Array(numOfTilesX_i);
      var x;
      var y;
      var level_s = '';
      for(x = 0; x < numOfTilesX_i; x += 1){
        level_a[x] = new Array(numOfTilesY_i);
      }
      for(y = 0; y < numOfTilesY_i; y += 1){
        level_s += '<tr>';
        for(x = 0; x < numOfTilesX_i; x += 1){
          level_s += '<td data-xy="' + x + '' + y + '" data-y="' + y + '" data-x="' + x + '"><img data-xy="' + x + '' + y + '" src="../assets/images/icon01.png" /></td>';
        }
        level_s += '</tr>';
      }
      $('#level tbody').empty();
      $('#level tbody').append(level_s);
    });

    $('#level tbody').on('click', function(e){
      console.dir(e);
      tileXY_s = e.target.dataset.xy;
      $('#tile-modal').modal('show');
    });

    $('#tile-modal tbody').on('click', function(e){
      console.dir(e.target);
      var td_s = 'td[data-xy=' + tileXY_s + '] img';
      var srcValue_s;
      if(e.target.src){
        srcValue_s = e.target.src;
      }else{
        srcValue_s = e.target.firstChild.src;
      }
      console.log(td_s);
      $(td_s).attr('src', srcValue_s);

    });
  });
}(jQuery));
