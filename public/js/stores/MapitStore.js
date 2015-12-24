var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MapitConstants = require('../constants/MapitConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var UPDATE_REQUEST = 'update';

var _buildings = [];
var _placesTaken = [];
for (var i = 1; i<=62; i++) {
	_placesTaken[i] = [];
	for (var j = 1; j<=63; j++) {
		_placesTaken[i][j] = undefined;
	}
}

var _movingBuilding = null;
var _stat = {
	requirements: {
		residential: 0,	specialrs: 0,	need: 0,
		power:0,		water:0,		sewage:0, 	waste:0 
	},
	population: {
		total:0,
		buildings:{},
		specializations:{
			park:{coverage:0, boosts:0},
			education:{coverage:0, boosts:0},
			transportation:{coverage:0, boosts:0},
			beach:{coverage:0, boosts:0},
			entertainment:{coverage:0, boosts:0},
			mountain:{coverage:0, boosts:0},
			gambling:{coverage:0, boosts:0},
			landmark:{coverage:0, boosts:0},
			worship:{coverage:0, boosts:0}
		}
	}
};


// Webworker for async calculation
var _worker;
var worker_busy = false;
var worker_scheduling = false;
function workerAvailable() {
	if(typeof(Worker) !== "undefined")
		return true;
	else
		return false;
}

function calculatePopulation() {
	if (!workerAvailable()) return;

	if(typeof(_worker) == "undefined") {
		_worker = new Worker("/mapit/public/js/population_worker.js");
	    _worker.onmessage = function(event) {
	    	_stat.population = event.data;
	    	MapitStore.emitUpdate();
	    	if (worker_scheduling) {
	    		_worker.postMessage(_buildings);
	    		worker_scheduling = false;
	    	} else {
	    		worker_busy = false;
	    	}
	    }
	}

	if (worker_busy) {
		worker_scheduling = true;
	} else {
		_worker.postMessage(_buildings);
		worker_busy = true;
	}
}

function endWorker() {
	if (!workerAvailable()) return;

	if(typeof(_worker) != "undefined") {
		_worker.terminate();
		_worker = undefined;
	}
}

function updateStat() {
	// save to localstorage, don't have a better idea for where to place it
	var domstorage=window.localStorage || (window.globalStorage? globalStorage[location.hostname] : null)
	if (domstorage){
	    domstorage.mapit_buildings = serialize();
	}

	var requirements = {
		residential: 0,	specialrs: 0,	need: 0,
		power:0,		water:0,		sewage:0, 	waste:0 
	};

	for (var i = 0; i < _buildings.length; i++) {
		var building = _buildings[i];
		if (building.buildingID == 'residential zone') {
			requirements.residential++;
			requirements.need++;
		} else if (building.props.type == 'residential') {
			requirements.specialrs++;
			requirements.need+=2;
		} else if (building.props.catogary == 'utility') {
			requirements[building.props.type] += building.props.capacity;
		}
	}

	_stat.requirements = requirements;
	calculatePopulation();
	MapitStore.emitUpdate();
}

function updatePlacement(building, place) {
	var placement = getPlacement(building.props.footprint.x+"_"+building.props.footprint.y+"_"+(building.rotated?"v":"h"));
	for (var i = 0; i<placement.length; i++) {
		// console.log(building.position.x+placement[i][0]+", "+building.position.y+placement[i][1]);
		_placesTaken[building.position.x/13+placement[i][0]][building.position.y/13+placement[i][1]] = place;
	}
}

function loadMap(buildings) {
	_buildings = buildings;
	for (var i = 0; i<_buildings.length; i++) {
		updatePlacement(_buildings[i], _buildings[i].buildingID);
	}
	updateStat();
}

function addBuilding(key, buildingID, position, props, rotated) {
	// validation
	_buildings.push({
		key: key,
		buildingID: buildingID,
		position: position,
		props: props,
		rotated: rotated
	});
}

function commitBuilding(oldKey, newKey) {
	setupFilter('key', oldKey);
	var building = _buildings.filter(filterCallback)[0];

	updatePlacement(building, newKey);

	_movingBuilding = null;
	if (oldKey!=newKey)
		building.key = newKey;

	updateStat();
}

function cloneBuilding(key) {
	setupFilter('key', _movingBuilding);
	var targetBuilding = _buildings.filter(filterCallback)[0];
	var copiedBuilding = jQuery.extend(true, {}, targetBuilding)
	copiedBuilding.key = key;

	_buildings.push(copiedBuilding);
	updatePlacement(copiedBuilding, key);
	updateStat();
}

function removeBuilding(key) {
	setupFilter('key', key);
	var building = _buildings.filter(filterCallback)[0];
	updatePlacement(building, null);
	_buildings.remove(building);
	updateStat();
}

function selectBuilding(key) {
	if (key) {
		_stat.population.selectedBuilding = _stat.population.buildings[key];
	} else {
		_stat.population.selectedBuilding = undefined;
	}
	MapitStore.emitUpdate();
}

// TODO: when move the building, the moved building could be placed at a top layer
function moveBuilding(key, delta) {
	setupFilter('key', key);
	var building = _buildings.filter(filterCallback)[0];
	building.position.x += delta.x;
	building.position.y += delta.y;

	// try to regulate the building
	if (building.position.x < 63*13) {
		switch (building.props.type) {
			case "beach":
				building.position.y = toCoord(0, 51).y;	
				break;
			case "mountain":
				building.position.y = toCoord(0, 1-building.props.footprint.y).y;
				break; 
		}
	}
}

function moveBuildingTo(key, position) {
	setupFilter('key', key);
	_buildings.filter(filterCallback)[0].position = position;
}

function setBuildingRot() {
	setupFilter('key', _movingBuilding);
	var building = _buildings.filter(filterCallback)[0];
	if (building.props.type == "beach" || building.props.type == "mountain") return; // no need to rotate for beach and mountain
	building.rotated = !building.rotated;
}

function setMovingBuilding(key) {
	_movingBuilding = key;
	if (_movingBuilding == "temp") return;

	setupFilter('key', _movingBuilding);
	updatePlacement(_buildings.filter(filterCallback)[0], null);
}

function setRegionVisibility(typeName, visible) {
	if (visible) {
        regionFilter.push(typeName);
    } else {
    	regionFilter.remove(typeName);
    }
}

var MapitStore = assign({}, EventEmitter.prototype, {
	/**
	* Get the entire collection of TODOs.
	* @return {object}
	*/
	getAll: function() {
		return _buildings;
	},

	getPlace: function() {
		return _placesTaken;
	},

	getStat: function() {
		return {
			requirements: _stat.requirements,
			population: {
				total: _stat.population.total,
				building: _stat.population.selectedBuilding,
				specializations: _stat.population.specializations
			}
		};
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	* @param {function} callback
	*/
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitUpdate: function() {
		this.emit(UPDATE_REQUEST);
	},

	addUpdateListener: function(callback) {
		this.on(UPDATE_REQUEST, callback);
	},

	removeUpdateListener: function(callback) {
		this.removeListener(UPDATE_REQUEST, callback);
	}
});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case MapitConstants.ACTION_LOADMAP:
			loadMap(action.buildings);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_ADDBUILDING:
			addBuilding(action.key, action.buildingID, action.position, action.props, action.rotated);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_COMMITBUILDING:
			commitBuilding(action.oldKey, action.newKey);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_CLONEBUILDING:
			cloneBuilding(action.key);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_REMOVEBUILDING:
			removeBuilding(action.key);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_SELECTBUILDING:
			selectBuilding(action.key);
			break;

		case MapitConstants.ACTION_MOVEBUILDING:
			moveBuilding(action.key, action.delta);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_MOVEBUILDINGTO:
			moveBuildingTo(action.key, action.position);
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_TOGGLEBUILDINGROT:
			setBuildingRot();
			MapitStore.emitChange();
			break;

		case MapitConstants.ACTION_SETMOVINGBUILDING:
			setMovingBuilding(action.key);
			// MapitStore.emitChange(); //don't need to emit any change as there is no ui update
			break;

		case MapitConstants.ACTION_SETREGIONVIS:
			setRegionVisibility(action.typeName, action.visible);
			MapitStore.emitChange();
			break;

		default:
			console.log("unhandled constants");
			console.error(action);
		// no op
	}
});

module.exports = MapitStore;
