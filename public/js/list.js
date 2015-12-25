json = {
	'buildings': {
		'residential': {
			'model': [
				{
					'name': 'residential zone',
					'label': 'RZ',
					'footprint': '2*2',
					'thumb':'RZ.png'
				},
				{
					'name': 'paris town zone',
					'label': 'PZ',
					'footprint': '2*2',
					'thumb':'PZ.png'
				},
				{
					'name': 'tokyo town zone',
					'label': 'TZ',
					'footprint': '2*2',
					'thumb':'TTZ.png'
				},
				{
					'name': 'london town zone',
					'label': 'LZ',
					'footprint': '2*2',
					'thumb':'LZ.png'
				}
			],
			'color': 'PaleGreen',
			'placement': 'base'
		},
		'commercial': {
			'model': [
				{	
					'name': 'store',
					'label': 'Shop',
					'footprint': '2*2'
				}
			],
			'color': 'orange',
			'placement': 'base'
		},
		'industrial': {
			'model': [
				{	
					'name': 'Small Factory',
					'label': 'Fac1',
					'footprint': '2*2',
					'radius': '12*12',
					'thumb': 'T1-Factories.jpg'
				},
				{
					'name': 'Basic Factory',
					'label': 'Fac2',
					'footprint': '2*2',
					'radius': '10*10',
					'thumb': 'T2-Factories.jpg'
				},
				{
					'name': 'Mass Production Factory',
					'label': 'Fac3',
					'footprint': '2*2',
					'radius': '8*8',
					'thumb': 'T3-Factories.jpg'
				},
				{
					'name': 'High-Tech Factory',
					'label': 'Fac4',
					'footprint': '2*2',
					'radius': '6*6',
					'thumb': 'T4-Factories.jpg'
				},
				{
					'name': 'Nano-Tech Factory',
					'label': 'Fac5',
					'footprint': '2*2',
					'thumb': 'T5-Factories.jpg'
				}
			],
			'color': 'Peru',
			'placement': 'addons'
		},
		'government': {
			'model':[
				{
					'name': 'Town Hall',
					'label': 'TH',
					'footprint': '2*3'
				},
				{
					'name': 'City Storage',
					'label': 'Strg',
					'footprint': '2*3'
				},
				{
					'name': 'City Hall',
					'label': 'CH',
					'footprint': '2*3'
				},
				{
					'name': 'Mayor\'s Mansion',
					'label': 'Masion',
					'footprint': '3*3'
				},
				{
					'name': 'Department of Epic Projects',
					'label': 'DoEP',
					'footprint': '2*2'
				}
			],
			'color': 'RoyalBlue',
			'placement': 'base'
		},
		'road': {
			'model': [
				{
					'name': 'road',
					'label': 'R',
					'footprint': '1*1'
				}
			],
			'color': 'SlateGray',
			'placement': 'base'
		}
	},
	'utility': {
		'power': {
			'model': [
				{
					'name': 'Wind Power',
					'label': 'P',
					'thumb': 'Wind.jpg',
					'footprint': '1*1',
					'capacity': 6
				},
				{
					'name': 'Coal Power Plant',
					'label': 'CPP',
					'thumb': 'Coal.jpg',
					'footprint': '2*2',
					'radius': '10*10',
					'capacity': 12
				},
				{
					'name': 'Deluxe Wind Power Plant',
					'label': 'WPP',
					'thumb': 'Wind-Turbine.jpg',
					'footprint': '2*2',
					'capacity': 22
				},
				{
					'name': 'Solar Power Plant',
					'label': 'SPP',
					'thumb': 'Solar.jpg',
					'footprint': '4*2',
					'capacity': 35
				},
				{
					'name': 'Oil Power Plant',
					'label': 'OPP',
					'thumb': 'Oil.jpg',
					'footprint': '4*2',
					'radius': '8*8',
					'capacity': 40
				},
				{
					'name': 'Nuclear Power Plant',
					'label': 'NucPP',
					'thumb': 'Nuclear.jpg',
					'footprint': '4*3',
					'radius': '12*12',
					'capacity': 60
				},
				{
					'name': 'Fusion Power Plant',
					'label': 'FusPP',
					'thumb': 'Fusion.png',
					'footprint': '3*3',
					'capacity': 75
				},
			],
			'color': 'yellow',
			'placement': 'addons'
		},
		'water': {
			'model': [
				{
					'name': 'Basic Water Tower',
					'label': 'W',
					'thumb': 'Basic-Water-Tower.jpg',
					'footprint': '1*1',
					'capacity': 9
				},
				{
					'name': 'Water Pumping Station',
					'label': 'Pump',
					'thumb': 'Water-Pumping-Station.jpg',
					'footprint': '3*2',
					'capacity': 55
				}
			],
			'color': 'blue',
			'placement': 'addons'
		},
		'sewage': {
			'model': [
				{
					'name': 'Small Sewage Outflow Pipe',
					'label': 'S',
					'thumb': 'Small-Sewage.jpg',
					'footprint': '1*1',
					'radius': '10*10',
					'capacity': 7
				},
				{
					'name': 'Basic Sewage Outflow Pipe',
					'label': 'BSew',
					'thumb': 'Basic-Sewage.jpg',
					'footprint': '2*2',
					'radius': '12*12',
					'capacity': 28
				},
				{
					'name': 'Deluxe Sewage Treatment Plant',
					'label': 'DSew',
					'thumb': 'Deluxe-Sewage.jpg',
					'footprint': '3*2',
					'capacity': 55
				}
			],
			'color': 'SaddleBrown',
			'placement': 'addons'
		},
		'waste': {
			'model': [
				{
					'name': 'Small Garbage Dump',
					'label': 'Gar',
					'thumb': 'Small-Garbage.jpg',
					'footprint': '2*2',
					'radius': '10*10',
					'capacity': 15
				},
				{
					'name': 'Garbage Dump',
					'label': 'Dump',
					'thumb': 'Garbage.jpg',
					'footprint': '2*3',
					'radius': '12*12',
					'capacity': 31
				},
				{
					'name': 'Garbage Incinerator',
					'label': 'GInc',
					'thumb': 'Garbage-Incinerator.jpg',
					'footprint': '2*2',
					'radius': '16*16',
					'capacity': 40
				},
				{
					'name': 'Recycling Center',
					'label': 'Rcyl',
					'thumb': 'Recycling.jpg',
					'footprint': '3*2',
					'capacity': 70
				}
			],
			'color': 'Sienna',
			'placement': 'addons'
		}
	},
	'coverage': {
		'fire station': {
			'model': [
				{
					'name': 'Small Fire Station',
					'label': 'FS',
					'thumb': 'Small-Fire.jpg',
					'footprint': '1*1',
					'radius': '6*8'
				},
				{
					'name': 'Basic Fire Station',
					'label': 'BFS',
					'thumb': 'Basic-Fire.jpg',
					'footprint': '2*2',
					'radius': '10*12'
				},
				{
					'name': 'Deluxe Fire Station',
					'label': 'DFS',
					'thumb': 'Deluxe-Fire.jpg',
					'footprint': '4*2',
					'radius': '22*22'
				}
			],
			'color': 'Tomato',
			'placement': 'addons'
		},
		'police': {
			'model': [
				{
					'name': 'Small Police Station',
					'label': 'PS',
					'thumb': 'Small-Police.jpg',
					'footprint': '1*1',
					'radius': '6*8'
				},
				{
					'name': 'Basic Police Station',
					'label': 'BPS',
					'thumb': 'Basic-Police.jpg',
					'footprint': '2*2',
					'radius': '12*12'
				},
				{
					'name': 'Deluxe Police Station',
					'label': 'DPS',
					'thumb': 'Police-Precinct.jpg',
					'footprint': '4*2',
					'radius': '24*24'
				}
			],
			'color': 'SteelBlue',
			'placement': 'addons'
		},
		'health': {
			'model': [
				{
					'name': 'Small Health Clinic',
					'label': 'SH',
					'thumb': 'Small-Health.jpg',
					'footprint': '1*1',
					'radius': '8*8'
				},
				{
					'name': 'Health Clinic',
					'label': 'Heal',
					'thumb': 'Health-Clinic.jpg',
					'footprint': '2*2',
					'radius': '12*12'
				},
				{
					'name': 'Hospital',
					'label': 'Hosp',
					'thumb': 'Hospital.jpg',
					'footprint': '4*2',
					'radius': '24*24'
				}
			],
			'color': 'SkyBlue',
			'placement': 'addons'
		}
	},
	'specializations': {
		'park': {
			'model': [
				{
					'name': 'Small Fountain Park',
					'label': 'P',
					'thumb': 'fountain.png',
					'footprint': '1*1',
					'radius': '8*8',
					'boost': 0.05
				},
				{
					'name': 'Modern Art Park',
					'label': 'P',
					'thumb': 'art.png',
					'footprint': '1*1',
					'radius': '8*6',
					'boost': 0.1
				},
				{
					'name': 'Plumbob Park',
					'label': 'P',
					'thumb': 'plumbob.png',
					'footprint': '1*1',
					'radius': '6*8',
					'boost': 0.2
				},
				{
					'name': 'Reflecting Pool Park',
					'label': 'RP',
					'thumb': 'pool.png',
					'footprint': '1*2',
					'radius': '8*6',
					'boost': 0.2
				},
				{
					'name': 'Larry the Llama',
					'label': 'LP',
					'thumb': 'llama.png',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.25
				},
				{
					'name': 'Peaceful Park',
					'label': 'PP',
					'thumb': 'peaceful.png',
					'footprint': '1*2',
					'radius': '6*10',
					'boost': 0.25
				},
				{
					'name': 'Urban Plaza',
					'label': 'UP',
					'thumb': 'urban.png',
					'footprint': '1*2',
					'radius': '8*6',
					'boost': 0.2
				},
				{
					'name': 'World\'s Largest Ball of Twine',
					'label': 'TP',
					'thumb': 'twine.png',
					'footprint': '2*2',
					'radius': '6*8',
					'boost': 0.3
				},
				{
					'name': 'Sculpture Garden',
					'label': 'SG',
					'thumb': 'sculpture.png',
					'footprint': '1*2',
					'radius': '6*8',
					'boost': 0.3
				},
				{
					'name': 'Row of Trees',
					'label': 'Tr',
					'thumb': 'tree.png',
					'footprint': '2*1',
					'radius': '12*4',
					'boost': 0.3
				},
				{
					'name': 'Soccer Field',
					'label': 'SF',
					'thumb': 'soccor.png',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.25
				},
				{
					'name': 'Jogging Path',
					'label': 'JP',
					'thumb': 'jogging.png',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.3
				},
				{
					'name': 'Water Park Playground',
					'label': 'WP',
					'thumb': 'waterpark.png',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.25
				},
				{
					'name': 'Giant Garden Gnome',
					'label': 'GG',
					'thumb': 'gnome.png',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.3
				},
				{
					'name': 'Basketball Court',
					'label': 'BC',
					'thumb': 'basketball.png',
					'footprint': '2*1',
					'radius': '10*6',
					'boost': 0.3
				},
				{
					'name': 'Dolly the Dinosaur',
					'label': 'DP',
					'thumb': 'dolly.png',
					'footprint': '3*2',
					'radius': '10*8',
					'boost': 0.4
				},
				{
					'name': 'Skate Park',
					'label': 'SP',
					'thumb': 'skate.png',
					'footprint': '1*2',
					'radius': '6*12',
					'boost': 0.4
				},
				{
					'name': 'Anchor Park',
					'label': 'AP',
					'thumb': 'anchor.png',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.3
				},
				{
					'name': 'Sakura Park',
					'label': 'SP',
					'thumb': 'sakura.png',
					'footprint': '1*1',
					'radius': '8*8',
					'boost': 0.25
				},
				{
					'name': 'Tokyo Town Gate',
					'label': 'TG',
					'thumb': 'tokyogate.png',
					'footprint': '2*2',
					'radius': '10*10',
					'boost': 0.25
				},
				{
					'name': 'Holiday Gift Market',
					'label': 'GM',
					'footprint': '1*2',
					'radius': '4*10',
					'boost': 0.2
				},
				{
					'name': 'Delicacy Market',
					'label': 'DM',
					'footprint': '1*2',
					'radius': '8*10',
					'boost': 0.25
				},
				{
					'name': 'Ice Skating Rink',
					'label': 'Rink',
					'footprint': '3*2',
					'radius': '11*10',
					'boost': 0.25
				},
				{
					'name': 'Holiday Tree',
					'label': 'HTree',
					'footprint': '2*2',
					'radius': '9*10',
					'boost': 0.3
				},
				{
					'name': 'New Year Tower',
					'label': 'NYT',
					'footprint': '2*2',
					'radius': '9*9',
					'boost': 0.4
				},
				{
					'name': 'Holiday Fountain Park',
					'label': 'HFP',
					'footprint': '2*2',
					'radius': '10*10',
					'boost': 0.5
				}
			],
			'color': 'green',
			'placement': 'addons'
		},
		'education': {
			'model': [
				{
					'name': 'Department of Education',
					'label': 'DOE',
					'footprint': '2*3',
					'radius': '8*8',
					'boost': 0.25
				},
				{
					'name': 'Grade School',
					'label': 'Grade',
					'footprint': '2*3',
					'radius': '8*10',
					'boost': 0.25
				},
				{
					'name': 'Public Library',
					'label': 'Lib',
					'footprint': '2*2',
					'radius': '12*8',
					'boost': 0.25
				},
				{
					'name': 'High School',
					'label': 'HiSch',
					'footprint': '4*2',
					'radius': '14*12',
					'boost': 0.3
				},
				{
					'name': 'Community College',
					'label': 'Colg',
					'footprint': '4*2',
					'radius': '16*16',
					'boost': 0.4
				},
				{
					'name': 'University',
					'label': 'University',
					'footprint': '4*4',
					'radius': '22*22',
					'boost': 0.5
				}
			],
			'color': 'lightskyblue',
			'placement': 'addons'
		},
		'transportation': {
			'model': [
				{
					'name': 'Department of Transportation',
					'label': 'DOT',
					'footprint': '2*3',
					'radius': '8*8',
					'boost': 0.3
				},
				{
					'name': 'Bus Terminal',
					'label': 'Bus',
					'footprint': '2*2',
					'radius': '16*12',
					'boost': 0.2
				},
				{
					'name': 'Airship Hangar',
					'label': 'Air',
					'footprint': '3*2',
					'radius': '16*16',
					'boost': 0.3
				},
				{
					'name': 'Balloon Park',
					'label': 'Blln',
					'footprint': '2*2',
					'radius': '16*16',
					'boost': 0.4
				},
				{
					'name': 'Heliport',
					'label': 'Heli',
					'footprint': '2*2',
					'radius': '18*18',
					'boost': 0.5
				}
			],
			'color': 'Chartreuse',
			'placement': 'addons'
		},
		'beach': {
			'model': [
				{
					'name': 'Surfer Beach',
					'label': 'b',
					'footprint': '1*3',
					'radius': '3*12',
					'boost': 0.1
				},
				{
					'name': 'Volleybal Court',
					'label': 'volly',
					'footprint': '2*2',
					'radius': '4*12',
					'boost': 0.1
				},
				{
					'name': 'Lifeguard Tower',
					'label': 'g',
					'footprint': '1*3',
					'radius': '4*12',
					'boost': 0.2
				},
				{
					'name': 'Beachfront Shopping Mall',
					'label': 'mall',
					'footprint': '2*4',
					'radius': '7*12',
					'boost': 0.2
				},
				{
					'name': 'Relaxing Beach',
					'label': 'rb',
					'footprint': '1*3',
					'radius': '3*20',
					'boost': 0.2
				},
				{
					'name': 'Merman Statue',
					'label': 'merman',
					'footprint': '4*5',
					'radius': '6*20',
					'boost': 0.2
				},
				{
					'name': 'Carousel',
					'label': 'crsel',
					'footprint': '2*2',
					'radius': '4*20',
					'boost': 0.1
				},
				{
					'name': 'Bluebeard\'s Pirate',
					'label': 'prt',
					'footprint': '2*2',
					'radius': '5*12',
					'boost': 0.2
				},
				{
					'name': 'Water Park',
					'label': 'waterpark',
					'footprint': '4*3',
					'radius': '7*30',
					'boost': 0.1
				},
				{
					'name': 'Aquarium',
					'label': 'aqrm',
					'footprint': '4*4',
					'radius': '7*20',
					'boost': 0.2
				},
				{
					'name': 'Astro-Twirl Rocket Ride',
					'label': 'ride',
					'footprint': '6*4',
					'radius': '9*20',
					'boost': 0.3
				},
				{
					'name': 'Lighthouse',
					'label': 'light',
					'footprint': '2*5',
					'radius': '4*20',
					'boost': 0.2
				},
				{
					'name': 'Sailorman\'s Pier',
					'label': 'pier',
					'footprint': '2*5',
					'radius': '6*20',
					'boost': 0.3
				},
				{
					'name': 'Luxury Boat Marina',
					'label': 'Luxury Marina',
					'footprint': '6*5',
					'radius': '9*30',
					'boost': 0.3
				}
			],
			'color': 'Chartreuse',
			'placement': 'addons'
		},
		'entertainment': {
			'model': [
				{
					'name': 'Entertainment HQ',
					'label': 'Enmt',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.2
				},
				{
					'name': 'Hotel',
					'label': 'Hotel',
					'footprint': '2*2',
					'radius': '10*10',
					'boost': 0.25
				},
				{
					'name': 'Amphitheater',
					'label': 'Thtr',
					'footprint': '2*2',
					'radius': '10*10',
					'boost': 0.25
				},
				{
					'name': 'Expo Center',
					'label': 'Expo',
					'footprint': '6*4',
					'radius': '18*16',
					'boost': 0.4
				},
				{
					'name': 'Stadium',
					'label': 'Stadm',
					'footprint': '6*4',
					'radius': '20*20',
					'boost': 0.5
				},
				{
					'name': 'Sydney Opera House',
					'label': 'Opera',
					'footprint': '6*4',
					'radius': '20*20',
					'boost': 0.6
				},
				{
					'name': 'Ferris Wheel',
					'label': 'Wheel',
					'footprint': '3*3',
					'radius': '20*20',
					'boost': 0.6
				}
			],
			'color': 'LawnGreen',
			'placement': 'addons'
		},
		'mountain': {
			'model': [
				{
					'name': 'City Name Sign',
					'label': 'City Name Sign',
					'footprint': '8*2',
					'radius': '11*30',
					'boost': 0.6
				},
				{
					'name': 'Cozy Cottages',
					'label': 'CC',
					'footprint': '1*2',
					'radius': '3*12',
					'boost': 0.2
				},
				{
					'name': 'Mountainside Cottages',
					'label': 'MC',
					'footprint': '1*4',
					'radius': '4*12',
					'boost': 0.25
				},
				{
					'name': 'Hiker\'s Cottages',
					'label': 'HC',
					'footprint': '1*4',
					'radius': '5*20',
					'boost': '0.3'
				},
				{
					'name': 'Alpine Cafe',
					'label': 'ACafe',
					'footprint':'2*4',
					'radius': '6*20',
					'boost': 0.35
				},
				{
					'name': 'Mountainside Train Station',
					'label': 'Train Stn',
					'footprint': '4*2',
					'radius': '6*20',
					'boost': 0.4
				},
				{
					'name': 'Alpine Vineyard',
					'label': 'A.Vine',
					'footprint': '4*4',
					'radius': '7*30',
					'boost': 0.45
				},
				{
					'name': 'Mountain Lift',
					'label': 'lft',
					'footprint': '2*8',
					'radius': '4*20',
					'boost': 0.3
				},
				{
					'name': 'Halfpipe',
					'label': 'pipe',
					'footprint': '2*6',
					'radius': '5*20',
					'boost': 0.35
				},
				{
					'name': 'Ski Jumping Hill',
					'label': 'sj',
					'footprint': '2*8',
					'radius': '6*20',
					'boost': 0.4
				},
				{
					'name': 'Ski Hotel',
					'label': 'hotl',
					'footprint': '4*4',
					'radius': '7*20',
					'boost': 0.45
				},
				{
					'name': 'Ski Resort',
					'label': 'resort',
					'footprint': '6*8',
					'radius': '8*30',
					'boost': 0.5
				},
				{
					'name': 'Observatory',
					'label': 'obsr',
					'footprint': '4*6',
					'radius': '5*20',
					'boost': 0.4
				},
				{
					'name': 'Mount SimCity',
					'label': 'mtsc',
					'footprint': '4*6',
					'radius': '7*20',
					'boost': 0.45
				},
				{
					'name': 'Mountain Palace',
					'label': 'mtplc',
					'footprint': '6*4',
					'radius': '8*30',
					'boost': 0.45
				},
				{
					'name': 'Castle',
					'label': 'castle',
					'footprint': '6*4',
					'radius': '8*30',
					'boost': 0.5
				}
			],
			'color': 'Aqua',
			'placement': 'addons'
		},
		'gambling': {
			'model': [
				{
					'name': 'Gambling HQ',
					'label': 'Gamb',
					'footprint': '2*2',
					'radius': '8*8',
					'boost': 0.2
				},
				{
					'name': 'Gambling House',
					'label': 'GbHs',
					'footprint': '2*2',
					'radius': '8*10',
					'boost': 0.2
				},
				{
					'name': 'Sleek Casino',
					'label': 'SlCs',
					'footprint': '2*2',
					'radius': '12*10',
					'boost': 0.25
				},
				{
					'name': 'Sleek Casino Tower',
					'label': 'SlCT',
					'footprint': '2*2',
					'radius': '12*10',
					'boost': 0.25
				},
				{
					'name': 'Sci-fi Casino',
					'label': 'ScCs',
					'footprint': '2*2',
					'radius': '12*12',
					'boost': 0.3
				},
				{
					'name': 'Sci-fi Casino Tower',
					'label': 'ScCT',
					'footprint': '2*2',
					'radius': '16*12',
					'boost': 0.3
				},
				{
					'name': 'Luxurious Casino',
					'label': 'LxCs',
					'footprint': '2*2',
					'radius': '16*16',
					'boost': 0.5
				},
				{
					'name': 'Luxurious Casino Tower',
					'label': 'LxCT',
					'footprint': '2*2',
					'radius': '16*16',
					'boost': 0.6
				}
			],
			'color': 'DarkGreen',
			'placement': 'addons'
		},
		'landmark': {
			'model': [
				{
					'name': 'Department of Culture',
					'label': 'DOC',
					'footprint': '3*2',
					'radius': '8*8',
					'boost': 0.2
				},
				{
					'name': 'Tower of Pisa',
					'label': 'Pisa',
					'footprint': '2*2',
					'radius': '14*16',
					'boost': 0.2
				},
				{
					'name': 'Big Ben',
					'label': 'BBen',
					'footprint': '3*2',
					'radius': '16*14',
					'boost': 0.3
				},
				{
					'name': 'Arc de Triomphe',
					'label': 'Arc',
					'footprint': '2*3',
					'radius': '14*16',
					'boost': 0.4
				},
				{
					'name': 'Brandenburg Gate',
					'label': 'BGate',
					'footprint': '2*4',
					'radius': '16*14',
					'boost': 0.4
				},
				{
					'name': 'Empire State Building',
					'label': 'Empire',
					'footprint': '2*4',
					'radius': '16*16',
					'boost': 0.4
				},
				{
					'name': 'Statue of Liberty',
					'label': 'S.Liberty',
					'footprint': '3*3',
					'radius': '14*16',
					'boost': 0.6
				},
				{
					'name': 'Washington Monument',
					'label': 'W.M.',
					'footprint': '2*2',
					'radius': '18*18',
					'boost': 0.6
				}
			],
			'color': 'SpringGreen',
			'placement': 'addons'
		},
		'worship': {
			model: [
				{
					'name': 'church',
					'label': 'church',
					'footprint': '6*4',
					'radius': '12*12',
					'boost': 0.2
				},
				{
					'name': 'mosque',
					'label': 'mosque',
					'footprint': '6*4',
					'radius': '12*12',
					'boost': 0.2
				},
				{
					'name': 'temple',
					'label': 'temple',
					'footprint': '6*4',
					'radius': '12*12',
					'boost': 0.2
				},
				{
					'name': 'modern temple',
					'label': 'mtemple',
					'footprint': '6*4',
					'radius': '12*12',
					'boost': 0.2
				}
			],
			'color': 'gold',
			'placement': 'addons'
		}
	}
}

var PREVENT_STOP = false;