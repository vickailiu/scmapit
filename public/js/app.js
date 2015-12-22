var React = require('react');

var BuildingManager = require('./components/BuildingManager.react');
var Stat = require('./components/MapitStat.react');
var Palette = require('./components/Palette.react');
var Menu = require('./components/Menu.react');
var MapitActions = require('./actions/MapitActions');
var MapitConstants = require('./constants/MapitConstants');
var MapitStore = require('./stores/MapitStore'); // kind of anti pattern, but we need to get all the buildings

window.MapitActions = MapitActions;

React.render(
    <Stat />,
    document.getElementById('stat')
);

React.render(
  <BuildingManager />,
  document.getElementById('buildings')
);

React.render(
  <Palette data={json} />,
  document.getElementById('palette')
);

React.render(
    <Menu />,
    document.getElementById('menu')
);

// fire Material
componentHandler.upgradeDom();

//Setup:
var MAPOFFSET = $('#buildings').offset();

$('body').on('mousedown', function(){
    if (MapitActions.getStatus() == MapitConstants.STATUS_ERASE) {
        MapitActions.setStatus(MapitConstants.STATUS_ERASING);
    }
});

var selectingBuilding;
$('#buildings').on('mousedown', '.js-drag', function(event) {
    if (MapitActions.getStatus() == MapitConstants.STATUS_ERASE) {
        MapitActions.removeBuilding(event.currentTarget.id);
    }
    if (MapitActions.getStatus() == MapitConstants.STATUS_STANDBY ||
        MapitActions.getStatus() == MapitConstants.STATUS_PREMOVEBUILDING) {
        selectingBuilding = event.currentTarget.id;
    }
});

$('#buildings').on('mouseup', '.js-drag', function(event) {
    if (MapitActions.getStatus() == MapitConstants.STATUS_STANDBY ||
        MapitActions.getStatus() == MapitConstants.STATUS_PREMOVEBUILDING &&
        selectingBuilding == event.currentTarget.id) {
        MapitActions.selectBuilding(selectingBuilding);
    }

    if (MapitActions.getStatus() == MapitConstants.STATUS_PREMOVEBUILDING) {
        MapitActions.setStatus(MapitConstants.STATUS_STANDBY);
        document.documentElement.style.cursor = '';
    }
});

// right click
$('#buildings').on('contextmenu', '.js-drag', function(event) {
    console.log(event);
    if (MapitActions.getStatus() == MapitConstants.STATUS_STANDBY ||
        MapitActions.getStatus() == MapitConstants.STATUS_PREMOVEBUILDING) {
        selectingBuilding = this.id;
        MapitActions.setMovingBuilding(selectingBuilding);
        $('#toolbox').show();
        $('#toolbox').css({
            left: event.pageX-5,
            top: event.pageY-5
        });
    }

    return false;
});

$('body>div:not(#toolbox)').on('mousemove', function() {
    $('#toolbox').hide();
});

toolboxActions = {
    'toolbox_rotate': function() {
        if (isRotationValid(selectingBuilding))
            MapitActions.toggleBuildingRot();
    },
    'toolbox_delete': function() {
        MapitActions.removeBuilding(selectingBuilding);
        $('#toolbox').hide();
    }
}

$('#toolbox').on('click', 'button', function(e) {
    toolboxActions[e.currentTarget.id]();
});

//Status
var currentActiveBuilding; // for building rotation
$('body').on('mousedown', '.js-drag', function() {
    if (MapitActions.getStatus() == MapitConstants.STATUS_STANDBY)
        MapitActions.setStatus(MapitConstants.STATUS_PREMOVEBUILDING);
});

var isDrawingStraightRoad = false;
var isVertical = false;
var isHorizontal = false;
var startPos;
$('body').on('mousedown', '.js-hold', function(event) {
    if (MapitActions.getStatus() == MapitConstants.STATUS_ROAD) {
        MapitActions.setStatus(MapitConstants.STATUS_PREADDROAD);
        startPos = getPos(event);
        tryAddRoad(startPos.x, startPos.y)
    }
    MapitActions.selectBuilding(undefined);
});

$('body').on('mousemove', '.js-hold', function(event) {
    if (MapitActions.getStatus() == MapitConstants.STATUS_PREADDROAD) {
        MapitActions.setStatus(MapitConstants.STATUS_ADDROAD);
    }

    if (MapitActions.getStatus() != MapitConstants.STATUS_ADDROAD) return;

    var pos = getPos(event);
    if (isDrawingStraightRoad && !isVertical && !isHorizontal) {       // just start to draw, try to determin if there is a direction
        var dx = startPos.x - pos.x;
        var dy = startPos.y - pos.y;
        if (Math.abs(dx)>=Math.abs(dy)) {
            isHorizontal = true;
        } else {
            isVertical = true;
        }
    }
    
    if (isHorizontal) {
        tryAddRoad(pos.x, startPos.y);
    } else if (isVertical) {
        tryAddRoad(startPos.x, pos.y);
    } else {
        tryAddRoad(pos.x, pos.y);
    }
});

// we only delete the .js-drag buildings on the canvase, not for the pallet
$('body').on('mousemove', '#buildings .js-drag', function(event) {
    if (MapitActions.getStatus() == MapitConstants.STATUS_ERASING) {
        MapitActions.removeBuilding(event.currentTarget.id);
    }
});

$('body').on('mouseup', function(event){
    if (MapitActions.getStatus() == MapitConstants.STATUS_PREADDROAD ||
        MapitActions.getStatus() == MapitConstants.STATUS_ADDROAD) {
        MapitActions.setStatus(MapitConstants.STATUS_ROAD);
        isDrawingStraightRoad = false;
        isHorizontal = false;
        isVertical = false;
    } else if (MapitActions.getStatus() == MapitConstants.STATUS_ERASING) {
        MapitActions.setStatus(MapitConstants.STATUS_ERASE);
    }
});

document.onkeydown = function(e) {
    var event = e || window.event;

    if (MapitActions.getStatus() == MapitConstants.STATUS_ADDBUILDING || 
        MapitActions.getStatus() == MapitConstants.STATUS_MOVEBUILDING) {
        if (event.shiftKey) // shift for rotation
            MapitActions.toggleBuildingRot(currentActiveBuilding);
        else if (getKeyCode(event) == 32) { // space for clone building
            if (isValid(currentActiveBuilding))
                MapitActions.cloneBuilding(genKey());
            return false;
        }
        
        return document.defaultAction;
    }

    // shift for straight on road drawing mod
    if  ((MapitActions.getStatus() == MapitConstants.STATUS_ROAD || MapitActions.getStatus() == MapitConstants.STATUS_PREADDROAD) &&
        event.shiftKey)
        isDrawingStraightRoad = true;

    return document.defaultAction;
}

document.onkeyup = function(e) {
    var event = e || window.event;

    if (isDrawingStraightRoad && !event.shiftKey)
        isDrawingStraightRoad = false;

    return document.defaultAction;
}

// register interactjs events
interact(".js-drag")
    .draggable({
        autoScroll: true,
        manualStart: true,
        snap: {
            targets: [
                interact.createSnapGrid({x: 13, y: 13, offset: { x: MAPOFFSET.left, y: MAPOFFSET.top}})
                //interact.createSnapGrid({ x: 1, y: 1})
            ],
            range: Infinity,
            relativePoints: [{
                x: 0,
                y: 0
            }]
        },
        inertia: false,
        restrict: {
            endOnly: false
        }
    })
    .on('move',     interactBuildingMoveHandler)
    .on('dragmove', interactionDragMoveHandler )
    .on('dragend',  interactionDragEndHandler  );

function interactBuildingMoveHandler(event) {
    event = event || window.event;
    pauseEvent(event);

    var interaction = event.interaction;

    var target;
    // if the pointer was moved while being held down
    // and an interaction hasn't started yet
    if (MapitActions.getStatus() == MapitConstants.STATUS_PREMOVEBUILDING &&
        interaction.pointerIsDown && 
        !interaction.interacting()) {

        var movingBuilding;

        if (event.currentTarget.classList.contains('thumb')) {
            var info = getInfo(event.currentTarget.id);
            x = event.pageX - MAPOFFSET.left - Math.floor(size_mapping(info.footprint.x) / 2);
            y = event.pageY - MAPOFFSET.top - Math.floor(size_mapping(info.footprint.y) / 2);

            MapitActions.addBuilding("temp", event.currentTarget.id, {x:x,y:y}, info);
            movingBuilding = document.getElementById("temp")
            MapitActions.setStatus(MapitConstants.STATUS_ADDBUILDING);
            MapitActions.setMovingBuilding("temp");
        } else {
            movingBuilding = event.currentTarget;
            MapitActions.setStatus(MapitConstants.STATUS_MOVEBUILDING);
            MapitActions.setMovingBuilding(movingBuilding.id);
        }

        interaction.start({
            name: 'drag'
        }, event.interactable, movingBuilding);
        currentActiveBuilding = movingBuilding.id;
    }
}

function interactionDragMoveHandler(event) {
    event = event || window.event;
    pauseEvent(event);

    if (MapitActions.getStatus()!=MapitConstants.STATUS_ADDBUILDING && MapitActions.getStatus()!=MapitConstants.STATUS_MOVEBUILDING) return;
    MapitActions.moveBuilding(event.target.id, {x:event.dx, y:event.dy});
}

window.PREVENT_STOP = false;

function interactionDragEndHandler(event) {
    if (MapitActions.getStatus()!=MapitConstants.STATUS_ADDBUILDING &&          // why we need it?
        MapitActions.getStatus()!=MapitConstants.STATUS_MOVEBUILDING) 
        return;

    if (!isValid(event.target.id)) {
        window.PREVENT_STOP = true;
        return;
    }

    if (event.target.id == 'temp')
        MapitActions.commitBuilding("temp", genKey());
    else
        MapitActions.commitBuilding(event.target.id, event.target.id);

    MapitActions.setStatus(MapitConstants.STATUS_STANDBY);
    currentActiveBuilding = null;
}

function isValid(key) {
    var buildings = MapitStore.getAll();
    var placeTaken = MapitStore.getPlace();
    var building;
    for (var i = buildings.length-1; i>-1; i--)
        if (buildings[i].key == key) {
            building = buildings[i];
            break;
        }

    assert(building);

    var placement = getPlacement(building.props.footprint.x+"_"+building.props.footprint.y+"_"+(building.rotated?"v":"h"));
    for (var i = 0; i<placement.length; i++) {
        // console.log(building.position.x+placement[i][0]+", "+building.position.y+placement[i][1]);
        if (placeTaken[building.position.x/13+placement[i][0]][building.position.y/13+placement[i][1]] &&
            placeTaken[building.position.x/13+placement[i][0]][building.position.y/13+placement[i][1]] != building.buildingID) {
            return false;
        }
    }
    return true;
}

function isRotationValid(key) {
    var buildings = MapitStore.getAll();
    var placeTaken = jQuery.extend(true, [], MapitStore.getPlace());
    var building;
    for (var i = buildings.length-1; i>-1; i--)
        if (buildings[i].key == key) {
            building = buildings[i];
            break;
        }

    assert(building);

    // check the validity of the new placement
    placement = getPlacement(building.props.footprint.x+"_"+building.props.footprint.y+"_"+(building.rotated?"h":"v"));
    for (var i = 0; i<placement.length; i++) {
        // console.log(building.position.x+placement[i][0]+", "+building.position.y+placement[i][1]);
        if (placeTaken[building.position.x/13+placement[i][0]][building.position.y/13+placement[i][1]] &&
            placeTaken[building.position.x/13+placement[i][0]][building.position.y/13+placement[i][1]] != building.buildingID) {
            return false;
        }
    }
    return true;
}

function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

function setStraightDirection(diffHor, diffVer) {
    if (Math.abs(diffHor) >= Math.abs(diffVer)) {
        isHorizontal = true;
    } else {
        isVertical = true;
    }
}

function getPos(event) {
    var target = event.target? event.target : event.currentTarget;
    var temp = target.id.split("_");
    var x = parseInt(temp[3]);
    var y = parseInt(temp[2]);

    return toCoord(x, y);
}

function tryAddRoad(x, y) {
    if (!MapitStore.getPlace()[x/13][y/13]) {
        var key = genKey();
        MapitActions.addBuilding(key, "road", {x: x, y:y}, getInfo("road"));
        MapitActions.commitBuilding(key, key);
    }
}

// the filters will be used for routing the buildings to different layer
function initializeLayerFilters() {
    for (var catogary in json) {
        for (var type in json[catogary]) {
            var models = json[catogary][type].model;

            if (json[catogary][type].placement == 'base') {
                for (var i = 0; i < models.length; i++) {
                    baseFilter.push(models[i].name);
                }
            } else {
                for (var i = 0; i < models.length; i++) {
                    utilFilter.push(models[i].name);
                }
            }
        }
    }
}

initializeLayerFilters();
$('#toolbox').hide();

window.serialize = function() {
    var buildings = MapitStore.getAll().map(function(building){
        return {
            buildingID: building.buildingID,
            position: toPos(building.position.x, building.position.y),
            rotated: building.rotated
        };
    });

    return JSON.stringify(buildings).replace(/'/g, "\\'");
}

window.deserialize = function(buildings) {
    var _buildings = [];
    for (var i = 0; i<buildings.length; i++) {
        var building;
        if (buildings[i].buildingID) {
            building = jQuery.extend(true, {}, buildings[i]);
            building.props = getInfo(building.buildingID);
            building.position = toCoord(buildings[i].position.x, buildings[i].position.y);
        } else {
            building = {};
            building.buildingID = buildings[i].id;
            building.props = getInfo(building.buildingID);
            building.position = toCoord(buildings[i].pos.x, buildings[i].pos.y);
            building.rotated = buildings[i].orientation == 1?false:true;
        }
        building.key = genKey();
        

        _buildings.push(building);
    }

    MapitActions.loadMap(_buildings);
}

// function loadFromLocalstorage() {
//     var domstorage=window.localStorage || (window.globalStorage? globalStorage[location.hostname] : null)
//     if (domstorage && 
//         domstorage.mapit_buildings && 
//         (Object.prototype.toString.call( domstorage.mapit_buildings ) === '[object Array]') &&
//         domstorage.mapit_buildings.length > 0 ){
//         MapitActions.loadMap(domstorage.mapit_buildings);
//     }
// }

// loadFromLocalstorage();