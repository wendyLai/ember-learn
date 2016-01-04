import Ember from 'ember';

export default Ember.Controller.extend({
	title:'',
	songCreationStarted: false,
	actions: {
		enableSongCreation: function() {
			this.set('songCreationStarted', true);//只有当创建第一个song的时候  songCreationStarted==true
		},
	},
	canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
			return this.get('songCreationStarted') || this.get('model.songs.length');
		}
	),//当已经未点击create one（此时songs.length应该为0）（两个都false）→ 显示“create one？”页面，不显示“input+add”页面
	  //当已经点击create one（true）|| songs.length！==0 （true）→显示“input+add”页面，不显示“create one？”页面
	isAddButtonDisabled:Ember.computed('title',function(){
		return Ember.isEmpty(this.get('title'));
	})
});
