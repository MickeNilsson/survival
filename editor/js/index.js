(function($){
  $('document').ready(function(){
    var tileXY_s;
    var matrix = [];
    // Add all images to the modal.
    $.get('../assets/images/textureatlas.json', function(textureatlas){
      
      if(typeof textureatlas === 'string'){
        textureatlas = JSON.parse(textureatlas);
      }
      var images_s = '<tr>';
      var image_i = 0;
      for(var imageFilename_s in textureatlas.frames){
        if(textureatlas.frames.hasOwnProperty(imageFilename_s)){
          images_s += '<td><img src="../assets/images/' + imageFilename_s + '" /></td>';
          image_i += 1;
          if(image_i > 8){
            images_s += '</tr><tr>';
            image_i = 0;
          }
        }
        
      }
      images_s += '</tr>';
      $('#tile-modal tbody').append(images_s);
      console.log(images_s);
    });


    // Create a new empty matrix when the user clicks the create button.
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
          level_s += '<td data-xy="' + x + '' + y + '" data-y="' + y + '" data-x="' + x + '"><img data-xy="' + x + '' + y + '" src="../assets/images/grass01.png" /></td>';
        }
        level_s += '</tr>';
      }
      $('#level tbody').empty();
      $('#level tbody').append(level_s);
    });

    // Show the tile modal when the user clicks a tile in the matrix.
    $('#level tbody').on('click', function(e){
      console.dir(e);
      tileXY_s = e.target.dataset.xy;
      $('#tile-modal').modal('show');
    });

    // Save the matrix in a JSON-object.
    $('#save-level').on('click',function(){
      $('#level tbody tr').each(function(index, td){
        console.log('index: ' + index);
        
        var temp_a = [];
        for(var i = 0; i < td.children.length; i += 1){
          var indexOfLastSlash_i = td.children[i].children[0].src.lastIndexOf('/');
          var indexOfDotPng_i = td.children[i].children[0].src.indexOf('.png');
          var imageFilename_s = td.children[i].children[0].src.substring(indexOfLastSlash_i + 1, indexOfDotPng_i);
          temp_a.push(imageFilename_s);
        }
        matrix.push(temp_a);
      });
      console.dir(JSON.stringify(matrix));
      $('#json').text(JSON.stringify(matrix));
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
      $('#tile-modal').modal('hide');
    });
  });
}(jQuery));
