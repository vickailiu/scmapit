function getInfo(id) {
    for (var catogary in json) {
        for (var type in json[catogary]) {
            var models = json[catogary][type].model;
            for (var i = 0; i < models.length; i++) {
                if (models[i].name == id)
                    return {
                        'catogary': catogary,
                        'type': type,
                        'name': models[i].name,
                        'footprint': getArea(models[i].footprint),
                        'radius': getArea(models[i].radius),
                        'boost': models[i].boost,
                        'capacity': models[i].capacity,
                        'label': models[i].label,
                        'color': json[catogary][type].color,
                        'placement': json[catogary][type].placement
                    };
            }
        }
    }
    return null;
}

function size_mapping(i) {
    return 13 * i - 1;
}

function getArea(str) {
    if (!str) return null;
    var area = str.split('*');
    return {
        x: parseInt(area[0]),
        y: parseInt(area[1])
    };
}

function toPos(x, y) {
    return {
        'x': x / 13,
        'y': (y / 13) - 8
    };
}

function toCoord(x, y) {
    return {
        'x': x*13,
        'y': (y+8)*13
    };
}

var filterKey, filterVal;
function setupFilter(key, val) {
    filterKey = key;
    filterVal = val;
}

function filterCallback(item) {
    return item[filterKey] == filterVal;
}

function toGrid(s) {
    return Math.round(1.0*s/13)*13;
}

function genKey() {
    // taken from https://gist.github.com/gordonbrander/2230317
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}

var opacity_ceil = 1;
var opacity_floor = 0.5;
function getOpacity(ratio) {
    return opacity_floor + (opacity_ceil - opacity_floor) * ratio;
}


var baseFilter = [];
function baseFilterCallback(building) {
  return baseFilter.indexOf(building.buildingID) > -1;
}

var regionFilter = [];
function regionFilterCallback(building) {
  return (regionFilter.indexOf(building.props.type) > -1) && building.props.radius;
}

var utilFilter = [];
function utilFilterCallback(building) {
  return utilFilter.indexOf(building.buildingID) > -1;
}

var DEP_ORIENTATION = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
}

function getKeyCode(event) {
    //Google chrome retardedness
    if (event.keyIdentifier) {
        return parseInt(event.keyIdentifier.substr(2), 16);
    }
    //not that the other browsers are any closer to something systematic and logical
    else {
        return event.keyCode;
    }
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function(val) {
    var i = this.indexOf(val);
         return i>-1 ? this.splice(i, 1) : [];
  };
}

function getPlacement(key) {
    switch(key) {
        case "1_1_h":
        case "1_1_v":
            return [[0, 0]];
        case "1_2_h":
        case "2_1_v":
            return [[0, 0],
                    [0, 1]];
        case "2_1_h":
        case "1_2_v":
            return [[0, 0], [1, 0]];
        case "2_2_v":
        case "2_2_h":
            return [[0, 0],[0, 1],
                    [1, 0],[1, 1]];

        case "1_4_h":
            return [[0, 0],[0, 1],[0, 2],[0, 3]];

        case "2_3_v":
        case "3_2_h":
            return [[0, 0],[0, 1],
                    [1, 0],[1, 1],
                    [2, 0],[2, 1]]
        case "3_2_v":
        case "2_3_h":
            return [[0, 0],[0, 1],[0, 2],
                    [1, 0],[1, 1],[1, 2]];
        case "3_3_h":
        case "3_3_v":
            return [[0, 0],[0, 1],[0, 2],
                    [1, 0],[1, 1],[1, 2],
                    [2, 0],[2, 1],[2, 2]];

        case "4_2_v":
            return [[ 1,-1],[ 1,0],[ 1,1],[ 1,2],
                    [ 2,-1],[ 2,0],[ 2,1],[ 2,2]];
        case "4_2_h":
            return [[ 0,0],[ 0,1],
                    [ 1,0],[ 1,1],
                    [ 2,0],[ 2,1],
                    [ 3,0],[ 3,1]];
        case "4_3_v":
            return [[0, 0],[0, 1],[0, 2],[0, 3],
                    [1, 0],[1, 1],[1, 2],[1, 3],
                    [2, 0],[2, 1],[2, 2],[2, 3]];
        case "4_3_h":
            return [[0, 0],[0, 1],[0, 2],
                    [1, 0],[1, 1],[1, 2],
                    [2, 0],[2, 1],[2, 2],
                    [3, 0],[3, 1],[3, 2]];
        case "4_4_h":
        case "4_4_v":
            return [[0, 0],[0, 1],[0, 2],[0, 3],
                    [1, 0],[1, 1],[1, 2],[1, 3],
                    [2, 0],[2, 1],[2, 2],[2, 3],
                    [3, 0],[3, 1],[3, 2],[3, 3]];
        case "1_3_h":
            return [[ 0,0],[ 0,1],[ 0,2]];
        case "2_4_v":
            return [[-1,1],[-1,2],
                    [ 0,1],[ 0,2],
                    [ 1,1],[ 1,2],
                    [ 2,1],[ 2,2]];
        case "2_4_h":
            return [[ 0,0],[ 0,1],[ 0,2],[ 0,3],
                    [ 1,0],[ 1,1],[ 1,2],[ 1,3]];
        case "4_5_h":
            return [[ 0,0],[ 0,1],[ 0,2],[ 0,3],[ 0,4],
                    [ 1,0],[ 1,1],[ 1,2],[ 1,3],[ 1,4],
                    [ 2,0],[ 2,1],[ 2,2],[ 2,3],[ 2,4],
                    [ 3,0],[ 3,1],[ 3,2],[ 3,3],[ 3,4]];

        case "4_6_h":
            return [[ 0,0],[ 0,1],[ 0,2],[ 0,3],[ 0,4],[ 0,5]
                    [ 1,0],[ 1,1],[ 1,2],[ 1,3],[ 1,4],[ 1,5]
                    [ 2,0],[ 2,1],[ 2,2],[ 2,3],[ 2,4],[ 2,5]
                    [ 3,0],[ 3,1],[ 3,2],[ 3,3],[ 3,4],[ 3,5]];

        case "6_4_h":
            return [[ 0,0],[ 0,1],[ 0,2],[ 0,3],
                    [ 1,0],[ 1,1],[ 1,2],[ 1,3],
                    [ 2,0],[ 2,1],[ 2,2],[ 2,3],
                    [ 3,0],[ 3,1],[ 3,2],[ 3,3],
                    [ 4,0],[ 4,1],[ 4,2],[ 4,3],
                    [ 5,0],[ 5,1],[ 5,2],[ 5,3]];
        case "2_5_h":
            return [[ 0,0],[ 0,1],[ 0,2],[ 0,3],[ 0,4],
                    [ 1,0],[ 1,1],[ 1,2],[ 1,3],[ 1,4]];

        case "2_6_h":
            return   [[0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[0, 5],
                      [1, 0],[1, 1],[1, 2],[1, 3],[1, 4],[1, 5]];

        case "6_5_h":
            return [[ 0,0],[ 0,1],[ 0,2],[ 0,3],[ 0,4],
                    [ 1,0],[ 1,1],[ 1,2],[ 1,3],[ 1,4],
                    [ 2,0],[ 2,1],[ 2,2],[ 2,3],[ 2,4],
                    [ 3,0],[ 3,1],[ 3,2],[ 3,3],[ 3,4],
                    [ 4,0],[ 4,1],[ 4,2],[ 4,3],[ 4,4],
                    [ 5,0],[ 5,1],[ 5,2],[ 5,3],[ 5,4]];
        case "6_4_v":
            return [[ 1,-1],[ 1,0],[ 1,1],[ 1,2],[ 1,3],[ 1,4],
                    [ 2,-1],[ 2,0],[ 2,1],[ 2,2],[ 2,3],[ 2,4],
                    [ 3,-1],[ 3,0],[ 3,1],[ 3,2],[ 3,3],[ 3,4],
                    [ 4,-1],[ 4,0],[ 4,1],[ 4,2],[ 4,3],[ 4,4]];

        case "8_2_h":
            return  [[ 0,0],[ 0,1],
                     [ 1,0],[ 1,1],
                     [ 2,0],[ 2,1],
                     [ 3,0],[ 3,1],
                     [ 4,0],[ 4,1],
                     [ 5,0],[ 5,1],
                     [ 6,0],[ 6,1],
                     [ 7,0],[ 7,1]];

        case "2_8_h":
            return   [[0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[0, 5],[0, 6],[0, 7],
                      [1, 0],[1, 1],[1, 2],[1, 3],[1, 4],[1, 5],[1, 6],[1, 7]];

        case "6_8_h":
            return   [[0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[0, 5],[0, 6],[0, 7],
                      [1, 0],[1, 1],[1, 2],[1, 3],[1, 4],[1, 5],[1, 6],[1, 7],
                      [2, 0],[2, 1],[2, 2],[2, 3],[2, 4],[2, 5],[2, 6],[2, 7],
                      [3, 0],[3, 1],[3, 2],[3, 3],[3, 4],[3, 5],[3, 6],[3, 7],
                      [4, 0],[4, 1],[4, 2],[4, 3],[4, 4],[4, 5],[4, 6],[4, 7],
                      [5, 0],[5, 1],[5, 2],[5, 3],[5, 4],[5, 5],[5, 6],[5, 7]];

        // case "4_6_h":
        //     return [[0, 0],[0, 1],[0, 2],[0, 3],
        //             [1, 0],[1, 1],[1, 2],[1, 3],
        //             [2, 0],[2, 1],[2, 2],[2, 3],
        //             [3, 0],[3, 1],[3, 2],[3, 3],
        //             [4, 0],[4, 1],[4, 2],[4, 3],
        //             [5, 0],[5, 1],[5, 2],[5, 3]];
        default:
            return null;
    }
}

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function getTransform(el) {
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";

    if (tr == 'FAIL' || tr == 'none')
        return ({
            'rotate': 0,
            'x': 0,
            'y': 0
        });

    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    return ({
        'rotate': angle,
        'x': parseInt(values[4]),
        'y': parseInt(values[5])
    });
}