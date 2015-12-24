var React = require('react');
var MapitStore = require('../stores/MapitStore');

function getStat() {
	return {
		data: MapitStore.getStat()
	}
}

var MapitStat = React.createClass({
  getInitialState: function() {
    return getStat();
  },

  componentDidMount: function() {
    MapitStore.addUpdateListener(this._onChange);
  },

  componentWillUnmount: function() {
    MapitStore.removeUpdateListener(this._onChange);
  },

  render: function() {
    return (
      <div>
      	<div className = "stat_row">
          <Field title={"Population"}  data={this.state.data.population.total} />
          <Field title={"Residential"}  data={this.state.data.requirements.residential} />
          <Field title={"Special RS"}   data={this.state.data.requirements.specialrs}   />
          <Field title={"Need"}         data={this.state.data.requirements.need}        />
          <Field title={"Power"}        data={this.state.data.requirements.power}       />
          <Field title={"Water"}        data={this.state.data.requirements.water}       />
          <Field title={"Sewage"}       data={this.state.data.requirements.sewage}      />
          <Field title={"Waste"}        data={this.state.data.requirements.waste}       />
  	    </div>
        <div className = "stat_row">
          <TwoTermField title={"P"}     data={this.state.data.population.specializations.park} />
          <TwoTermField title={"Edu"}   data={this.state.data.population.specializations.education} />
          <TwoTermField title={"T"}     data={this.state.data.population.specializations.transportation} />
          <TwoTermField title={"B"}     data={this.state.data.population.specializations.beach} />
          <TwoTermField title={"Ent"}   data={this.state.data.population.specializations.entertainment} />
        </div>
        <div className = "stat_row">
          <TwoTermField title={"M"}     data={this.state.data.population.specializations.mountain} />
          <TwoTermField title={"G"}     data={this.state.data.population.specializations.gambling} />
          <TwoTermField title={"L"}     data={this.state.data.population.specializations.landmark} />
          <TwoTermField title={"W"}     data={this.state.data.population.specializations.worship} />
        </div>
        <div className = "stat_row">
          <BuildingStat data={this.state.data.population.building} />
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStat());
  }
});

var BuildingStat = React.createClass({
  render: function() {
    if (this.props.data) {
      return (
        <div>
          <Field title={"BuildingPop"}        data={this.props.data.population} />
          <PercentField title={"Total Boost"} data={this.props.data.totalBoost} />
          <PercentField title={"P"}           data={this.props.data.boosts.park} />
          <PercentField title={"Edu"}         data={this.props.data.boosts.education} />
          <PercentField title={"T"}           data={this.props.data.boosts.transportation} />
          <PercentField title={"B"}           data={this.props.data.boosts.beach} />
          <PercentField title={"Ent"}         data={this.props.data.boosts.entertainment} />
          <PercentField title={"M"}           data={this.props.data.boosts.mountain} />
          <PercentField title={"G"}           data={this.props.data.boosts.gambling} />
          <PercentField title={"L"}           data={this.props.data.boosts.landmark} />
          <PercentField title={"W"}           data={this.props.data.boosts.worship} />
        </div>
      );
    } else {
      return (
        <div>
          <Field title={"BuildingPop"} data={" -"} />
          <Field title={"Total Boost"} data={" -"} />
          <Field title={"P"}           data={" -"} />
          <Field title={"Edu"}         data={" -"} />
          <Field title={"T"}           data={" -"} />
          <Field title={"B"}           data={" -"} />
          <Field title={"Ent"}         data={" -"} />
          <Field title={"M"}           data={" -"} />
          <Field title={"G"}           data={" -"} />
          <Field title={"L"}           data={" -"} />
          <Field title={"W"}           data={" -"} />
        </div>
      );
    }
  }
});

var Field = React.createClass({
  render: function() {
    return (
      <div><span>{this.props.title+":"}</span><span>{this.props.data}</span><span>&nbsp;</span><span>&nbsp;</span></div>
    );
  }
});

var PercentField = React.createClass({
  render: function() {
    return (
      <div><span>{this.props.title+":"}</span><span>{Math.round(this.props.data*100)+"%"}</span><span>&nbsp;</span><span>&nbsp;</span></div>
    );
  }
});

var TwoTermField = React.createClass({
  render: function() {
    return (
      <div><span>{this.props.title+":"}</span><span>{this.props.data.coverage+"/"+Math.round(this.props.data.boosts*100)+"%"}</span><span>&nbsp;</span><span>&nbsp;</span></div>
    );
  }
});

module.exports = MapitStat;