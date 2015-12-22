var React = require('react');
var MapitActions = require('../actions/MapitActions');

var Palette = React.createClass({
  render: function() {
    var tabButtons = [];
    var tabs = [];

    for (var catogaryName in this.props.data) {
      tabButtons.push( (
        <a href={"#"+catogaryName+"_panel"} className={"mdl-tabs__tab"+(tabButtons.length == 0?" is-active":"" )} key = {catogaryName}>{catogaryName}</a>
      ) );

      tabs.push( (
        <Tab name={catogaryName} data={this.props.data[catogaryName]} isActive={0 == tabs.length} key = {catogaryName} />
      ) );

    }

    return (
      <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div className="mdl-tabs__tab-bar">
          {tabButtons}
        </div>
        {tabs}
      </div>
    );
  }
});

var Tab = React.createClass({
  render: function() {
    var types = [];
    for (var typeName in this.props.data) {
      if (typeName == "road") continue;
      types.push((
        <Type name={typeName} data={this.props.data[typeName]} key={typeName} />
      ));
    }
    return(
      <div id={this.props.name+"_panel"} className={"mdl-tabs__panel" + (this.props.isActive?" is-active":"")}>
        {types}
      </div>
    );
  }
});

var Type = React.createClass({
  handleClick: function(event) {
    MapitActions.setRegionVisibility(this.props.name, event.target.checked);
  },

  render: function() {
    var models = [];
    var switcher;
    var haveRadius = false;
    for (var i=0; i<this.props.data.model.length; i++) {
      var model = this.props.data.model[i];
      var footprint = model.footprint.split('*');

      models.push(
        model.thumb?
        (
          <div  className="thumb js-drag" id={model.name} key={model.name}>
            <img src={"/mapit/public/asset/" + model.thumb} />
          </div>
        ):
        (
          <div className="thumb js-drag buildinglabel" id={model.name} key={model.name}
               style={{width:size_mapping(footprint[0])+"px", height:size_mapping(footprint[1])+"px", backgroundColor:this.props.data.color}} >
            <span>{model.label}</span>
          </div>
        )
      );

      if (model.radius) {
        haveRadius = true;
      }
    }

    if (haveRadius) {
      switcher = (
        <label key="switcher" className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={"switch-"+this.props.name} >
          <input type="checkbox" id={"switch-"+this.props.name} className="mdl-switch__input" onClick={this.handleClick} />
          <span className="mdl-switch__label"></span>
        </label>
      );
    }

    return(
      <div className="display_row">
        <div className="object_header display_row">
          {this.props.name}
          {switcher}
        </div>
        <div className="display_row">
          {models}
        </div>
      </div>
    );
  }
});

module.exports = Palette;