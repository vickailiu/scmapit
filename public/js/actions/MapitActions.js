var AppDispatcher = require('../dispatcher/AppDispatcher');
var MapitConstants = require('../constants/MapitConstants');

var _status = MapitConstants.STATUS_STANDBY;

var MapitActions = {
	loadMap: function (buildings) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_LOADMAP,
			buildings: buildings
		});
	},
	addBuilding: function(key, buildingID, position, props, rotated) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_ADDBUILDING,
			key: key,
			buildingID: buildingID,
			position: position,
			props: props,
			rotated: !!rotated
		});
	},
	commitBuilding: function(oldKey, newKey) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_COMMITBUILDING,
			oldKey: oldKey,
			newKey: newKey
		});
	},
	cloneBuilding: function(key) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_CLONEBUILDING,
			key: key
		});
	},
	removeBuilding: function(key) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_REMOVEBUILDING,
			key: key
		});
	},
	selectBuilding: function(key) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_SELECTBUILDING,
			key: key
		});
	},
	moveBuilding: function(key, delta) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_MOVEBUILDING,
			key: key,
			delta: delta
		});
	},
	moveBuildingTo: function(key, position) {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_MOVEBUILDINGTO,
			key: key,
			position: position
		});
	},
	toggleBuildingRot: function() {
		AppDispatcher.dispatch({
			actionType: MapitConstants.ACTION_TOGGLEBUILDINGROT
		});
	},
	setMovingBuilding: function(key) {
		AppDispatcher.dispatch({
			actionType:MapitConstants.ACTION_SETMOVINGBUILDING,
			key:key
		});
	},
	setRegionVisibility: function(typeName, visible) {
		AppDispatcher.dispatch({
			actionType:MapitConstants.ACTION_SETREGIONVIS,
			typeName: typeName,
			visible: visible
		});
	},
	setStatus: function(status) {
		_status = status;
	},
	getStatus: function() {
		return _status;
	}
};

module.exports = MapitActions;