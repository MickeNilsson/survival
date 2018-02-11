(function($){
  $('document').ready(function(){
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
          level_s += '<td>0</td>';
        }
        level_s += '</tr>';
      }
      $('#level tbody').empty();
      $('#level tbody').append(level_s);
    });
  });
}(jQuery));
