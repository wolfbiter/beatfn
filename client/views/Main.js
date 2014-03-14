/** @jsx React.DOM */
var React = require('react');
var ReactBackboneMixin = require('backbone-react-component').mixin;

var Mixer = require('./Mixer');

module.exports = React.createClass({
  
  mixins: [ReactBackboneMixin],

  render: function () {

    return (
      <main>
        <Mixer tracks={this.props.tracks} />
      </main>
    );
  },
});