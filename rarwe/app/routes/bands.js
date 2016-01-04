import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';

/*---------songs-data--------*/

var blackDog = Song.create({
	title : 'Black Dog',
	band  : 'Led Zeppelin',
	rating: 3
});

var daughter = Song.create({
	title : 'Daughter',
	band  : 'Pearl Jam',
	rating: 5
});

var yellowLedbetter = Song.create({
	title : 'Yellow Ledbetter',
	band  : 'Pearl Jam',
	rating: 4
});

var pretender = Song.create({
	title : 'The Pretender',
	band  : 'Foo Fighters',
	rating: 2
});

var SongCollection = Ember.Object.extend({
	content       : [],
	sortProperties: ['rating:desc'],
	sortedContent : Ember.computed.sort('content', 'sortProperties'),
});

/*--------bands-data--------*/

var BandsCollection = Ember.Object.extend({
	content       : [],
	sortProperties: ['name:desc'],
	sortedContent : Ember.computed.sort('content', 'sortProperties'),
});

var ledZeppelin = Band.create({	
					name: 'Led Zeppelin', 
					songs:[blackDog]
				});
var pearlJam = Band.create({	
					name: 'Pearl Jam', 
					songs: [daughter,yellowLedbetter],
					description: 'Pearl Jam is an American rock band,formed in Seattle,Washington in 1990.'
				});
var fooFighters = Band.create({	
					name: 'Foo Fighters', 
					songs:[pretender],
					description: 'Foo Fighters is an American rock band,formed in Seattle,Washington in 1994.'
				});

var bands = BandsCollection.create();
bands.get('content').pushObjects([ledZeppelin, pearlJam, fooFighters]);

export default Ember.Route.extend({
	model: function() {
		return bands;
	},
	afterModel: function(model) {
		var bands = model;
		if (bands.length === 1) {
			this.transitionTo('bands.band', bands.get('firstObject'));
		}
	},
	actions: {
		createBand: function() {
			var name = this.get('controller').get('name');
			var band = Band.create({ name: name });
			bands.get('content').pushObject(band);
			this.get('controller').set('name', '');
			this.transitionTo('bands.band.songs', band);
		},
		didTransition: function() {
			document.title = 'Bands - Rock & Roll';//修改整个页面的title
		}
	}
});
