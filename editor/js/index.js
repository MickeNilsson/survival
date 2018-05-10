(function($){

$('document').ready(function(){
	var tileXY_s;
	var matrix = [];
	var numOfTilesX_i;
	var numOfTilesY_i;
	var mapTile_o = {id:null, x:null, y:null};
	var savedLevels_a = {};
	var maxTilesPerRow_i = 4;
	var currentMapTileId_s = '';
	var level_aa = [];
	var levelName_s;

	// Download the textureatlas json file and create a <tbody> using its data.
	$.get('../assets/images/textureatlas.json', function(textureatlas){
		if(typeof textureatlas === 'string'){
			textureatlas = JSON.parse(textureatlas);
		}
		$.each(textureatlas.frames, function(imageFileName_s){
			var imageFileNameWithoutSuffix_s = imageFileName_s.substring(0, imageFileName_s.indexOf('.png'));
			$('#tiles').append('<img class="tile" id="' + imageFileNameWithoutSuffix_s + '" src="../assets/images/' + imageFileName_s + '" />');
		});
	});

	// Get all saved levels.
	$.get('http://www.digizone.se/survival/levels/get_levels.php')
		.done(function(levels_o){
			$.each(levels_o, function(levelName_s, level_a){
				savedLevels_a[levelName_s] = JSON.parse(level_a);
				$('#saved-levels-ul').append('<li>' + decodeURIComponent(levelName_s) + '</li>');
			});
		});

	// Load saved level into matrix.
	$('#saved-levels-ul').on('click', 'li', function(e){
		e.stopPropagation();
		levelName_s = encodeURIComponent(e.target.textContent);
		level_aa = savedLevels_a[levelName_s];
		levelName_s = decodeURIComponent(levelName_s);
		numOfTilesX_i = level_aa.length;
		numOfTilesY_i = level_aa[0].length;
		console.log(levelName_s);
		//console.log(e.target.textContent);
		console.dir(level_aa);
		$('#level tbody').empty();
		for(var y = 0; y < numOfTilesY_i; y += 1){
			levelRow_o = $('<tr></tr>');
			for(var x = 0; x < numOfTilesX_i; x += 1){
				levelRow_o.append('<td id="' + x + ':' + y + '"><img src="../assets/images/' + level_aa[x][y] + '.png" /></td>');
			}
			$('#level tbody').append(levelRow_o);
		}
	});

	// Create new level with only grass tiles.
	$('#create-level-button').on('click', function(){
		levelName_s = '';
		numOfTilesX_i = +$('#num-of-x-tiles').val();
		numOfTilesY_i = +$('#num-of-y-tiles').val();
		var levelRow_o;
		level_aa = new Array(numOfTilesX_i);
		$.each(level_aa, function(x){
			level_aa[x] = new Array(numOfTilesY_i);
		});
		$('#level tbody').empty();
		for(var y = 0; y < numOfTilesY_i; y += 1){
			levelRow_o = $('<tr></tr>');
			for(var x = 0; x < numOfTilesX_i; x += 1){
				level_aa[x][y] = 'grass01';
				levelRow_o.append('<td id="' + x + ':' + y + '"><img src="../assets/images/grass01.png" /></td>');
			}
			$('#level tbody').append(levelRow_o);
		}
	});

	// Show the tile modal when the user clicks a tile in the matrix.
	$('#level tbody').on('click', function(e){
		// Save the id "x:y" of the map tile that was clicked.
		currentMapTileId_s = e.target.parentElement.id;
		$('#tile-modal').modal('show');
	});

	// If a tile has been clicked in the tile modal, set the tile in the matrix to this tile.
	$('#tiles').on('click', function(e){
		document.getElementById(currentMapTileId_s).firstChild.src = e.target.src;
		var x = currentMapTileId_s.substring(0, currentMapTileId_s.indexOf(':'));
		var y = currentMapTileId_s.substring(currentMapTileId_s.indexOf(':') + 1);
		level_aa[x][y] = e.target.id;
		$('#tile-modal').modal('hide');
	});

	// Open "save level"-modal.
	$('#show-save-level-modal-button').on('click', function(){
		if(levelName_s){
			saveLevel();
		}else{
			$('#save-level-status').html('');
			$('#level-name').val('');
			$('#save-level-form').show();
			$('#save-level-modal').modal('show');
		}
	});

	// Save level on server as json.
	$('#save-level-button').on('click', function(){
		saveLevel();
	});

	function saveLevel(){
		var newLevel_o = {
			name: levelName_s || $('#level-name').val(),
			level: JSON.stringify(level_aa)
		};
		$('#save-level-form').hide();
		$('#save-level-status').html('Saving level...');
		$.post('http://www.digizone.se/survival/levels/save_level.php', newLevel_o)
			.done(function(response){
				$('#save-level-status').html(response.status);
				$('#save-level-modal').modal('show');
			});
	}
});
}(jQuery));
