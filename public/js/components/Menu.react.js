var React = require('react');
var MapitActions = require('../actions/MapitActions');
var MapitConstants = require('../constants/MapitConstants');
// var MapitStatus = require('../constants/MapitStatus');

var Menu = React.createClass({
  render: function() {
  	return (
  		<div className="navbar navbar-inverse" style={{width: 1290}}>
    		<div className="container-fluid">
		  		<div className="navbar-header">
		       	 <a className="navbar-brand" href="javascript:void(0)">Mapit<div className="ripple-container"></div></a>
		      	</div>
			    <div>
			      <ul className="nav navbar-nav">
			        <ToggleButton name="road" clickCallback={
			        	function(enabled){
			        		if (!enabled) {
			        			MapitActions.setStatus(MapitConstants.STATUS_STANDBY);
			        			return false;
			        		}

			        		if (MapitActions.getStatus() == MapitConstants.STATUS_STANDBY) {
			        			MapitActions.setStatus(MapitConstants.STATUS_ROAD);
			        			return true;
			        		} else {
			        			return false;
			        		}
			        	}
			        } />
			        <ToggleButton name="erase" clickCallback={
			        	function(enabled){
			        		if (!enabled) {
			        			MapitActions.setStatus(MapitConstants.STATUS_STANDBY);
			        			return false;
			        		}

			        		if (MapitActions.getStatus() == MapitConstants.STATUS_STANDBY) {
			        			MapitActions.setStatus(MapitConstants.STATUS_ERASE);
			        			return true;
			        		} else {
			        			return false;
			        		}
			        	}
			        } />
			        <Seprator />
				    <RippleButton name="new" clickCallback={
			        	function(){
			        		MapitActions.loadMap([]);
			        	}
			    	} />
			        <RippleButton name="recover" clickCallback={
				        function(){
				        	var domstorage=window.localStorage || (window.globalStorage? globalStorage[location.hostname] : null)
						    if (domstorage && 
						        domstorage.mapit_buildings) {
						    	var buildings = JSON.parse(domstorage.mapit_buildings.replace(/\\'/g, "'"));
						    	if ((Object.prototype.toString.call(buildings) === '[object Array]') &&
						    		buildings.length > 0 ) {
						    		deserialize(buildings);
						    	}
						    }
				        }
				    } />
			        <RippleButton name="share" clickCallback={
			        	function(){
				        	var key = genKey();
						    $.ajax({
						        type: "post",
						        url: "../push.php",
						        data: "key=" + key + "&map=" + serialize(),
						        success: function(data) {
						            if (data == 'New record created successfully') {
						                $('#dialog .dialogContentTitle').html('Saved! you can share it via:');
						                $('#dialog .dialogContentBody').html(
						                    '<input id="link" value="http://vickailiu.me/mapit/' + key + '">' +
						                    '<button class="clip_btn" data-clipboard-target="#link">' +
						                    'copy' +
						                    '</button>'
						                );
						                var clipboard = new Clipboard('.clip_btn');
						                var btns = document.querySelectorAll('.clip_btn');
						                for (var i = 0; i < btns.length; i++) {
						                    btns[i].addEventListener('mouseleave', function(e) {
						                        e.currentTarget.setAttribute('class', 'clip_btn');
						                        e.currentTarget.removeAttribute('aria-label');
						                    });
						                }
						                function showTooltip(elem, msg) {
						                    elem.setAttribute('class', 'clip_btn tooltipped tooltipped-s');
						                    elem.setAttribute('aria-label', msg);
						                }
						                // Simplistic detection, do not use it in production
						                function fallbackMessage(action) {
						                    var actionMsg = '';
						                    var actionKey = (action === 'cut' ? 'X' : 'C');

						                    if(/iPhone|iPad/i.test(navigator.userAgent)) {
						                        actionMsg = 'No support :(';
						                    }
						                    else if (/Mac/i.test(navigator.userAgent)) {
						                        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
						                    }
						                    else {
						                        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
						                    }

						                    return actionMsg;
						                }

						                clipboard.on('success', function(e) {
						                    e.clearSelection();
						                    // console.info('Action:', e.action);
						                    // console.info('Text:', e.text);
						                    // console.info('Trigger:', e.trigger);
						                    showTooltip(e.trigger, 'Copied!');
						                });

						                clipboard.on('error', function(e) {
						                    // console.error('Action:', e.action);
						                    // console.error('Trigger:', e.trigger);
						                    showTooltip(e.trigger, fallbackMessage(e.action));
						                });


						            } else {
						                console.log(serialize());
						                $('#dialog .dialogContentTitle').html('Ooops, there are something wrong');
						                $('#dialog .dialogContentBody').html('But your work can be saved, right click on the page -> inspect element -> store the log text from the console to a text file. Let me know and I will help you from there.');
						            }
						            $("#dialog .dialogContainer").css("width", "320px");
						            $('#dialog').show();
						        }
						    });
				        }
			    	} />
			    	<RippleButton name="help" clickCallback={
			    		function(){
			    			$('#dialog .dialogContentTitle').html('Instructions:');
			                $('#dialog .dialogContentBody').html(
			                    '<style>\
								p,ul { margin: 0;}\
								</style>\
			                    <b>Basics</b>\
								<hr style="margin: 3px 0;">\
								<p>Add buildings:</p>\
								<ul> <li>Basics - drag &amp; drop</li>\
								<li>Quick place same building - upon dragging to the desired position, press \'space\' key</li>\
								<li>Rotation - press \'shift\' key to toggle rotation</li>\
								<li>Cancel - press \'esc\' key</li>\
								</ul>\
								<p>Modify buildings:</p>\
								<ul> <li style="list-style-type:none">Right click on the building, choose to rotate/delete on the toolbar</li>\
								</ul>\
								<p>Draw road:</p>\
								<ul> <li style="list-style-type:none">Click on the road button on menu, then draw road just like MSPaint, press \'shift\' key and draw a straight one</li>\
								</ul>\
								<p>Erase buildings:</p>\
								<ul> <li style="list-style-type:none">Click on the bulldozer button on menu, then erase buildings just like MSPaint</li>\
								</ul>\
								<br><b>Coverage &amp; Boost</b>\
								<hr style="margin: 3px 0;">\
								<p>Coverage toggle</p>\
								<ul> <li>Click on the toggle for each types of utilities, coverages or specializations to see the overage of that type</li>\
								</ul>\
								<p>Statistics panel</p>\
								<ul> <li>Line 1 - total population*, resident buildings, resource demand and utility capacity</li>\
								<li>Line 2&amp;3 - residence coverages and total boosts for each type of specializations</li>\
								<li>Line 4 - population*, boosts and boosts breakdowns for individual selected resident building</li>\
								<li style="list-style-type:none"><i style="width: initial;height: initial;">*the population is estimated with the assumption that you\'ve upgraded the building to the highest level</i></li>\
								</ul>\
								<br><b>Save &amp; Share (on top menu)</b>\
								<hr style="margin: 3px 0;">\
								<p>New</p>\
								<ul> <li style="list-style-type:none">Use with caution! will remove all the buildings on the canvas</li>\
								</ul>\
								<p>Recover</p>\
								<ul> <li style="list-style-type:none">The map will be saved to your computer whenever you make a change on the map. If you accidentally refresh the page or your computer shuts down, there are possibilities that you don\'t need to redo everything</li>\
								</ul>\
								<p>Share</p>\
								<ul> <li style="list-style-type:none">Share your layout to your friends! And is it a safer way to save your layout. Keep the URL!</li>\
								</ul>'
			                );
			                $("#dialog .dialogContainer").css("width", "720px");
						            $('#dialog').show();
			    		}
			    	}/>
			    	<RippleButton name="misc." clickCallback={
			    		function(){
			    			$('#dialog .dialogContentTitle').html('');
			                $('#dialog .dialogContentBody').html(
								'<h4>The Project:</h4>\
								<p>I\'m building this tool as a hobby and a way to explore new things related to web application. The project is still in development, bare with the bugs. The project is maintained on <a href="https://github.com/vickailiu/scmapit" target="_blank">Github</a>.</p>\
								<h4>Credit:</h4>\
								<p>Flask framework: <a href="http://flask.pocoo.org/" target="_blank">http://flask.pocoo.org/</a>, Reactjs: <a href="https://facebook.github.io/react/" target="_blank">https://facebook.github.io/react/</a></p>\
								<p>Interact.js: <a href="http://interactjs.io/" target="_blank">http://interactjs.io/</a> where I see the possibility of creating this tool</p>\
								<p>Other resources: <a href="http://www.getmdl.io/" target="_blank">http://www.getmdl.io/</a>, <a href="http://fezvrasta.github.io/bootstrap-material-design/" target="_blank">http://fezvrasta.github.io/bootstrap-material-design/</a>, <a href="https://zenorocha.github.io/clipboard.js/" target="_blank">https://zenorocha.github.io/clipboard.js/</a>, bwilsonvi\'s <a href="http://codepen.io/bwilsonvi/pen/VYygGz" target="_blank">http://codepen.io/bwilsonvi/pen/VYygGz</a></p>\
								<h4>Disclaimer:</h4>\
								<p>All trademarks and images are property of Electronic Arts Inc.</p>'
			                );
			                $("#dialog .dialogContainer").css("width", "720px");
						            $('#dialog').show();
			    		}
			    	}/>
			      </ul>
			    </div>
			</div>
		</div>
  	);
  }
});

var RippleButton = React.createClass({
	render: function() {
		return (
			<li>
				<a href="javascript:void(0)" onClick={this.props.clickCallback} >
					{this.props.name}
				</a>
			</li>
		);
	}
});

var ToggleButton = React.createClass({
	getInitialState: function() {
		return {active: false};
	},
	handleClick: function() {
		var result = this.props.clickCallback(!this.state.active);
		this.setState({active:result});
	},
	render: function() {
		var props = {};
		if (this.state.active) {
			props.className = "active";
		}
		return (
			<li {...props}>
				<a href="javascript:void(0)" onClick={this.handleClick} >
					<i className = {this.props.name}></i>
				</a>
			</li>
		);
	}
});

var Seprator = React.createClass({
	render: function() {
		return (
			<li><span></span></li>
		);
	}
});

module.exports = Menu;