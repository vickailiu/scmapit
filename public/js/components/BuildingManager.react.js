var React = require('react');
var MapitStore = require('../stores/MapitStore');

// Retrieve the current building data from the MapitStore
function getBuildingState() {
  return {
    data: MapitStore.getAll()
  };
}

// UI related
function getRotationTransform(rotated, info) {
  var transform;
  if (rotated) {
    transform = 'rotate(90deg)';
    var diff = info.footprint.x-info.footprint.y;
    if (Math.abs(diff) % 2 != 0) {
      if (diff < 0) {
        transform += ' translate(-6.5px, -6.5px)';
      } else {
        transform += ' translate(6.5px, 6.5px)';
      }
    }
  }
  return transform;
}

function getLabelTransform(rotated, info) {
  var transform;
  if (rotated) {
    var diff = info.footprint.x-info.footprint.y;
    if (Math.abs(diff) % 2 != 0) {
      if (diff < 0) {
        transform = 'translate(6.5px, -6.5px)';
      } else {
        transform = 'translate(-6.5px, 6.5px)';
      }
    }
  }
  return transform;
}

function renderBuilding(building) {
  var info = getInfo(building.buildingID);
  var transform = 'translate(' + building.position.x + 'px, ' + building.position.y + 'px)';

  var props_ = {
    id: building.key,
    className: "js-drag",
    style: {
              width:0,
              height:0,
              webkitTransform: transform,
              transform: transform,
           },
    title: info.name
  };

  var rotTransform = getRotationTransform(building.rotated, info);

  var childProps = {
    className: "model",
    style: {
              width:size_mapping(info.footprint.x),
              height:size_mapping(info.footprint.y),
              backgroundColor:info.color,
              webkitTransform: rotTransform,
              transform: rotTransform
            }
  }

  var labelTransform = getLabelTransform(building.rotated, info);
  var labelProps = {
    className: "buildinglabel",
    style: {
              width:size_mapping(info.footprint.x), 
              height:size_mapping(info.footprint.y), 
              webkitTransform: labelTransform,
              transform: labelTransform
            }
  }

  return (
    <div {...props_} key={building.key} >
      <div {...childProps}></div>
      <div {...labelProps}>
        <span>{info.label}</span>
      </div>
    </div>
  );
}

function renderRegion(building) {
  var info = getInfo(building.buildingID);
  var buildingTransform = 'translate(' + building.position.x + 'px, ' + building.position.y + 'px)';
  var transform;
  if (info.type == "beach") {
    transform = 
          'translate(' + (-size_mapping((info.radius.x - info.footprint.x) / 2)) + 'px, ' + (-size_mapping(info.radius.y)) + 'px)';
  } else if (info.type == "mountain") {
    transform = 
          'translate(' + (-size_mapping((info.radius.x - info.footprint.x) / 2)) + 'px, ' + (size_mapping(info.footprint.y) + 2) + 'px)';
  } else {
    transform = 
          'translate(' + (-size_mapping((info.radius.x - info.footprint.x) / 2)) + 'px, ' + (-size_mapping((info.radius.y - info.footprint.y) / 2)) + 'px)';
  }

  var rotTransform = getRotationTransform(building.rotated, info);

  return (
    <div style={{width:0, height:0, webkitTransform: buildingTransform, transform: buildingTransform,}} id={building.key} key={building.key}>
      <div style={{width: size_mapping(info.footprint.x)+2, height: size_mapping(info.footprint.y)+2, webkitTransform: rotTransform, transform: rotTransform}}>
        <div className="model region" style={{width: size_mapping(info.radius.x), height: size_mapping(info.radius.y), backgroundColor: info.color, opacity:getOpacity(info.boost || 0), webkitTransform: transform, transform:transform}}></div>
      </div>
    </div>
  );
}

var BuildingManager = React.createClass({
  getInitialState: function() {
    return getBuildingState();
  },

  componentDidMount: function() {
    MapitStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MapitStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="manager">
        <Base   data={this.state.data.filter(baseFilterCallback  )} />
        <Region data={this.state.data.filter(regionFilterCallback)} />
        <Util   data={this.state.data.filter(utilFilterCallback  )} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getBuildingState());
  }
});

var Base = React.createClass({
  render: function() {
    return (
     <div className="base">
       {this.props.data.map(renderBuilding)}
     </div>
    );
  }
});

var Region = React.createClass({
  render: function() {
    return (
     <div className="region" style={{pointerEvents: 'none'}} >
       {this.props.data.map(renderRegion)}
     </div>
    );
  }
});

var Util = React.createClass({
  render: function() {
    return (
     <div className="util">
       {this.props.data.map(renderBuilding)}
     </div>
    );
  }
});

module.exports = BuildingManager;