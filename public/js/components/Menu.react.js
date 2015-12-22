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
			    	<RippleButton name="feedback" clickCallback={
			    		function(){
			    			$('#feedback').show();
			    		}
			    	}/>
			    	<RippleButton name="help" clickCallback={
			    		function(){
			    			$('#dialog .dialogContentTitle').html('Instructions:');
			                $('#dialog .dialogContentBody').html(
			                    '<ul>\
									<style type="text/css">\
									p {\
										margin-bottom:3px;\
									}\
									</style>\
									<li>\
										<p>Add building:</p>\
										<ul>\
											<li>General - Drag &amp; Drop</li>\
											<li>Quick place same building - Upon dragging to the desired position, press \'space\' key</li>\
											<li>Rotation - Press \'shift\' key to toggle</li>\
										</ul>\
									</li>\
									<li><p>Modify building: Right click on the building, choose to rotate/delete on the toolbar</p></li>\
									<li><p>View coverage: Click on the toggle on the list</p></li>\
									<li>\
										<p>Menu:</p>\
										<ul>\
											<li>Draw road - Click on the road toggle, then draw road just like MSPaint, press \'shift\' key and draw a straight one</li>\
											<li>Erase - Click on the eraser toggle, then erase buildings just like MSPaint</li>\
											<li>New - Use with caution! will remove all the buildings on the canvas</li>\
											<li>Recover - If you accidentally refresh the page or your computer shuts down, there are possibilities that you don\'t need to redo everything</li>\
											<li>Share - Share your layout to your friends! And is it a safer way to save your layout. Keep the URL!</li>\
											<li>Feedback - Do let me know if there is anything wrong/suggestions</li>\
											<li>Help - is me...</li>\
										</ul>\
									</li>\
								</ul>'
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