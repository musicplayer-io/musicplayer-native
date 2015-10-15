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
  NavigatorIOS,
  StyleSheet,
  StatusBarIOS,
} = React;


StatusBarIOS.setStyle('light-content');
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
          deviceType='ios'
        />
      )
    }

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Music Player for Reddit',
          component: Playlist,
          passProps: {
            onSongSelected: (song) => {
              this.setState({ songSelected: song, });
            },
            deviceType: 'ios'
          },
          leftButtonTitle: 'Subs'
        }}
        itemWrapperStyle={styles.itemWrapper}
        barTintColor='#0F0F10'
        tintColor='#FFFFFF'
        titleTextColor='#FFFFFF'
      />
    );
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    backgroundColor: '#1E1E1E',
  },
});

AppRegistry.registerComponent('MusicPlayerNative', () => MusicPlayerNative);
module.exports = MusicPlayerNative;
