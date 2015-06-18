import Ember from 'ember';
import RequireAttributes from 'linx/lib/require-attributes';

export default Ember.Component.extend(
  RequireAttributes('model', 'isPlaying', 'seekTime'), {

  classNames: ['AudioClip'],

  actions: {
    didLoadWave: function() {
      this.get('model').set('isAudioLoaded', true);
    }
  },

  // TODO: audio-clip moving wavesurfer left/right based on startTime

  audioSeekTime: function() {
    var seekTime = this.get('seekTime');
    var startTime = this.get('model.startTime');
    var endTime = this.get('model.endTime');
    console.log("audioSeekTime", seekTime, startTime, endTime);

    // TODO: move this logic upwards, issue pause
    if (seekTime > endTime) {
      return startTime;
    } else {
      return startTime + seekTime;
    }
  }.property('seekTime', 'model.startTime', 'model.endTime'),
});
