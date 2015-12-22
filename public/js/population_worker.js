var onmessage = function(e) {
	var buildings = e.data;

	var population = {
		total:0,
		buildings:{}
	};

	var rs = buildings.filter(function(building){
		return building.props.type == 'residential';
	});

	var specializations = buildings.filter(function(building){
		return building.props.catogary == 'specializations';
	});

	for (var i = 0; i<rs.length; i++) {
		var buildingPop = {
				population:0,
				totalBoost:0,
				boosts: {
					park:0,
					education:0,
					transportation:0,
					beach:0,
					entertainment:0,
					mountain:0,
					gambling:0,
					landmark:0,
					worship:0
				}
			};

		for (var j = 0; j<specializations.length; j++) {
			if (isOverlapping(rs[i], specializations[j])) {
				buildingPop.boosts[specializations[j].props.type] += parseFloat(specializations[j].props.boost);
			}
		}

		for (var type in buildingPop.boosts) {
			if (buildingPop.boosts[type]>1) {
				buildingPop.boosts[type] = 1;
			}
			buildingPop.totalBoost += buildingPop.boosts[type];
		}

		buildingPop.population = Math.round( (rs[i].buildingID == 'residential zone'?1836:2206) * (1+buildingPop.totalBoost) );
		population.buildings[rs[i].key] = buildingPop;
		population.total += buildingPop.population;
	}

	postMessage(population);
}

function isOverlapping(building, region) {
	var p1, p2, p3, p4;

	var result;
	result = getBuildingRect(building);
	p1 = result[0];
	p2 = result[1];

	
	if (region.props.type == "beach") {
		var rX = (region.props.radius.x - region.props.footprint.x) * 0.5;
		p3 = {
			x: region.position.x/13 - rX,
			y: 51 - region.props.radius.y
		};
		p4 = {
			x: region.position.x/13 + region.props.footprint.x + rX,
			y: 51
		}
	} else if (region.props.type == "mountain") {
		var rX = (region.props.radius.x - region.props.footprint.x) * 0.5;
		p3 = {
			x: region.position.x/13 - rX,
			y: 1
		};
		p4 = {
			x: region.position.x/13 + region.props.footprint.x + rX,
			y: 1 + region.props.radius.y
		}
	} else {
		result = getBuildingRect(region);
		var rX = (region.props.radius.x - region.props.footprint.x) * 0.5;
		var rY = (region.props.radius.y - region.props.footprint.y) * 0.5;
		if (!region.rotated) {
			p3 = {
				x: result[0].x - rX,
				y: result[0].y - rY
			};
			p4 = {
				x: result[1].x + rX,
				y: result[1].y + rY
			};
		} else {
			p3 = {
				x: result[0].x - rY,
				y: result[0].y - rX
			};
			p4 = {
				x: result[1].x + rY,
				y: result[1].y + rX
			};
		}
	}

	// reference: http://articles.leetcode.com/2011/05/determine-if-two-rectangles-overlap.html
	return !( p2.y <= p3.y || p1.y >= p4.y || p2.x <= p3.x || p1.x >= p4.x );
}

function getBuildingRect(building) {
	var p1, p2;
	if (!building.rotated) {
		p1 = toPos(building.position.x, building.position.y);
		p2 = {
			x:p1.x + building.props.footprint.x,
			y:p1.y + building.props.footprint.y
		};
	} else {
		var diff = building.props.footprint.x-building.props.footprint.y;
		p1 = toPos(building.position.x, building.position.y);
		if (Math.abs(diff) % 2 == 0) {
			p1.x += diff/2;
			p1.y -= diff/2;
		} else {
			if (diff < 0) {
				p1.x += 1.0*diff/2 + 0.5;
				p1.y -= 1.0*diff/2 - 0.5; 
			} else {
				p1.x += 1.0*diff/2 - 0.5;
				p1.y -= 1.0*diff/2 + 0.5;
			}
		}
	    p2 = {
    		x: p1.x + building.props.footprint.y,
    		y: p1.y + building.props.footprint.x
    	};
	}

	return [p1, p2];
}

function toPos(x, y) {
    return {
        'x': x / 13,
        'y': (y / 13) - 8
    };
}










