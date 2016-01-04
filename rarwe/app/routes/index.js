import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel:function() {
		this.transitionTo('bands');
	}//beforeModel是before在application的model还是index的model
});
