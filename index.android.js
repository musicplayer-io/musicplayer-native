/**
 * MusicPlayerNative
 * @author Ilias Ismanalijev
 */
'use strict';

var React = require('react-native');
var Playlist = require('./Playlist');
var Player = require('./Player');
var {
  AppRegistry,
  StyleSheet,
  View,
  ToolbarAndroid,
} = React;


var MusicPlayerNative = React.createClass({

  getInitialState: function() {
    return {
      songSelected: (null: ?React.Component),
    };
  },

  render: function() {
    if (this.state.songSelected) {
      var song = this.state.songSelected;
      return (
        <Player
          song={song.data}
          onPlayerExit={() => {
            this.setState({ songSelected: null });
          }}
          deviceType='android'
        />
      )
    }

    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
          title='Music Player for Reddit'
          titleColor='#FFFFFF'
        />
        <Playlist
          songSelected={song}
          style={styles.itemWrapper}
          onSongSelected={(song) => {
            this.setState({ songSelected: song, });
          }}
          deviceType='android'
        />
      </View>
    );
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#0F0F10',
    height: 60,
  },
  itemWrapper: {
    backgroundColor: '#1E1E1E',
  },
});

AppRegistry.registerComponent('MusicPlayerNative', () => MusicPlayerNative);
module.exports = MusicPlayerNative;
