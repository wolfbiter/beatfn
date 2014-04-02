/** @jsx React.DOM */
var React = require('react');
var ReactBackboneMixin = require('backbone-react-component').mixin;

var Tab = require('../nav/Tab');

module.exports = React.createClass({
  
  mixins: [ReactBackboneMixin],

  /*

                <div className="item"></div>
                <div className="item"></div>
                <div className="item">- By Artist</div>
                <div className="item">- By Genre</div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                */

  getDefaultProps: function() {
    return {
      trackViewTabs: [
        {key: 'list', name: 'List View'},
        {key: 'wave', name: 'Wave View'},
      ],
      dropdownTabs: [
        {key: '1', page: 'Search', name: '- By Song'},
        {key: '2', page: 'Queue', name: '- By Transition'},
        {key: '3', page: 'Search', name: '- By Artist'},
        {key: '4', page: 'Search', name: '- By Genre'},
        {key: '5', page: 'TasteProfiles', name: '- By TasteProfile'},
        {key: '6', page: 'Playlists', name: '- By Playlist'},
        {key: '7', page: 'Mixes', name: '- By Mix'},
      ],
    };
  },

  handleTrackViewClick: function(trackViewTab) {
    this.props.changeTrackView(trackViewTab.key);
  },

  handleDropdownClick: function(dropdownTab) {
    this.props.changePage(dropdownTab.page);
  },

  render: function () {

    // make trackViewTabs
    var trackViewTabs = this.props.trackViewTabs.map(function(trackViewTab) {
      return (
        Tab({
          'active': (trackViewTab.key === this.props.trackView),
          'key': trackViewTab.key,
          'name': trackViewTab.name,
          'activeClass': 'ui orange button',
          'inactiveClass': 'ui inverted button',
          'handleClick': this.handleTrackViewClick,
        })
      )
    }.bind(this));

    // make dropdownTabs
    var dropdownTabs = this.props.dropdownTabs.map(function(dropdownTab) {
      return (
        Tab({
          'key': dropdownTab.key,
          'name': dropdownTab.name,
          'page': dropdownTab.page,
          'inactiveClass': 'item add-song-drop',
          'handleClick': this.handleDropdownClick,
        })
      )
    }.bind(this));

    // TODO: dropdown for what list we're viewing
    return (
      <div className="eight wide column">
        <div className="ui inverted teal segment">

          <div className="ui compact menu">
            <div className="ui simple orange dropdown button">
              Add Song(s)<i className="dropdown icon"></i>
              <div className="menu">
                {dropdownTabs}
              </div>
            </div>
          </div>

          <div className="ui pull-right buttons">
            {trackViewTabs[0]}
            <div className="or"></div>
            {trackViewTabs[1]}
          </div>

        </div>
      </div>
    );
  },

});