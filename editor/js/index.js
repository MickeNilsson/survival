(function($){

$('document').ready(function(){
	var tileXY_s;
	var matrix = [];
	var numOfTilesX_i;
	var numOfTilesY_i;
	var mapTile_o = {id:null, x:null, y:null};
	var savedLevels_a = {};
	var maxTilesPerRow_i = 4;

	// Download the textureatlas json file and create a <tbody> using its data.
	$.get('../assets/images/textureatlas.json', function(textureatlas){
		if(typeof textureatlas === 'string'){
			textureatlas = JSON.parse(textureatlas);
		}
		var mapTilesRow_o = $('<tr></tr>');
		$.each(textureatlas.frames, function(imageFileName_s){
			var mapTile_o = $('<td><img src="../assets/images/' + imageFileName_s + '" /></td>');
			mapTilesRow_o.append(mapTile_o);
			var numOfTilesInCurrentRow_i = mapTilesRow_o[0]['children']['length'];
			if(numOfTilesInCurrentRow_i === maxTilesPerRow_i){
				$('#tile-modal tbody').append(mapTilesRow_o);
				mapTilesRow_o = $('<tr></tr>');
			}
		});
		$('#tile-modal tbody').append(mapTilesRow_o);
	});

	// Get all saved levels.
	$.get('http://www.digizone.se/survival/levels/get_levels.php')
		.done(function(levels_o){
			var savedLevels_a = [];
			$.each(levels_o, function(levelName_s, level_a){
				savedLevels_a[levelName_s] = JSON.parse(level_a);
				$('#saved-levels-ul').append('<li>' + decodeURIComponent(levelName_s) + '</li>');
			});
		});

	// Load saved level into matrix.
	$('#saved-levels-ul').on('click', 'li', function(e){
		e.stopPropagation();
		console.dir(e);
	});

	// Create a new empty matrix when the user clicks the create level button.
	$('#create-level-button').on('click', function(){
		numOfTilesX_i = +$('#num-of-x-tiles').val();
		numOfTilesY_i = +$('#num-of-y-tiles').val();
		var level_a = new Array(numOfTilesX_i);
		var levelRow_o;
		$.each(level_a, function(x){
			level_a[x] = new Array(numOfTilesY_i);
		});
		$('#level tbody').empty();
		for(var y = 0; y < numOfTilesY_i; y += 1){
			levelRow_o = $('<tr></tr>');
			for(var x = 0; x < numOfTilesX_i; x += 1){
				levelRow_o.append('<td id="' + x + ':' + y + '" data-x="' + x + '" data-y="' + y + '" ><img src="../assets/images/grass01.png" /></td>');
			}
			$('#level tbody').append(levelRow_o);
		}
	});

	// Show the tile modal when the user clicks a tile in the matrix.
	$('#level tbody').on('click', function(e){
		mapTile_o.x = e.target.parentElement.dataset.x;
		mapTile_o.y = e.target.parentElement.dataset.y;
		mapTile_o.id = e.target.parentElement.id;
		console.dir(mapTile_o);
		$('#tile-modal').modal('show');
	});

	// Save the matrix in a JSON-object.
	$('#save-level').on('click',function(){
	var y = 0;
	//console.log('antal td');
	//console.dir($('#level tbody tr'));
	$('#level tbody tr').each(function(index, td){
		console.dir(td);
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
	console.dir(matrix);
	window.a = matrix;
	console.dir(JSON.stringify(matrix));
	$('#json').text(JSON.stringify(matrix));
	// At this point the x and y coordinates of the array is inverted i.e. matrix[y][x].
	// Convert the array so that matrix[x][y].
	var maxX_i = matrix[0].length;
	var maxY_i = matrix.length;
	var tempMatrix_a = new Array(maxX_i);
	for(i = 0; i < maxX_i; i++){
		tempMatrix_a[i] = new Array(maxY_i);
	}
	for(var x = 0; x < maxX_i; x++){
		for(var y = 0; y < maxY_i; y++){
			tempMatrix_a[x][y] = matrix[y][x];
		}
	}
	console.log('tempMatrix');
	console.dir(tempMatrix_a);
	window.a = tempMatrix_a;


	});

	// If a tile has been clicked in the tile modal, set the tile in the matrix
	// to this tile.
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

	// Open save level modal.
	$('#show-save-level-modal-button').on('click', function(){

	$('#save-level-modal').modal('show');

	});

	// Save level on server as json.
	$('#save-level-button').on('click', function(){
	
	$('#level tbody tr').each(function(index, td){

		var temp_a = [];
		for(var i = 0; i < td.children.length; i += 1){
			var indexOfLastSlash_i = td.children[i].children[0].src.lastIndexOf('/');
			var indexOfDotPng_i = td.children[i].children[0].src.indexOf('.png');
			var imageFilename_s = td.children[i].children[0].src.substring(indexOfLastSlash_i + 1, indexOfDotPng_i);
			temp_a.push(imageFilename_s);
		}
		matrix.push(temp_a);
	});

	$('#json').text(JSON.stringify(matrix));
	// At this point the x and y coordinates of the array is inverted i.e. matrix[y][x].
	// Convert the array so that matrix[x][y].
	var maxX_i = matrix[0].length;
	var maxY_i = matrix.length;
	var tempMatrix_a = new Array(maxX_i);
	for(i = 0; i < maxX_i; i++){
		tempMatrix_a[i] = new Array(maxY_i);
	}
	for(var x = 0; x < maxX_i; x++){
		for(var y = 0; y < maxY_i; y++){
			tempMatrix_a[x][y] = matrix[y][x];
		}
	}
	console.log('tempMatrix');
	console.dir(tempMatrix_a);
	window.a = tempMatrix_a;
	var data_o = {
		'name': encodeURIComponent($('#level-name').val()),
		'level': JSON.stringify(tempMatrix_a)
	};
	console.dir(data_o);
	$.get('http://www.digizone.se/survival/levels/save_level.php', data_o)
		.done(function(response){
			console.log(response);
		});
	$('#save-level-modal').modal('hide');
	});
	});

}(jQuery));
