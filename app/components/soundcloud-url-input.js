import Ember from 'ember';

import { EKMixin, EKOnFocusMixin, keyDown } from 'ember-keyboard';

export default Ember.TextField.extend(
  EKMixin,
  EKOnFocusMixin, {

  // expected params
  addTrack: Ember.K,

  // overrides
  placeholder: 'Add Soundcloud Url',

  store: Ember.inject.service(),

  _resolveUrl: Ember.on(keyDown('Enter'), function() {
    const store = this.get('store');

    store.queryRecord('soundcloud/track', {
      resolveUrl: this.get('value')
    }).then((soundcloudTrack) => {

      // TODO(TECHDEBT): should be able to soundcloudTrack.getTrack
      const track = store.createRecord('track')
      track.createFromSoundcloudTrack(soundcloudTrack);

      track.get('audioBinary.analyzeAudioTask').perform();
      this.get('addTrack')(track);
    }, (error) => {
      Ember.Logger.warn('error with resolveUrl', error);
    });
  }),
});
