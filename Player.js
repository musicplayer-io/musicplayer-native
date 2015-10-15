'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToolbarAndroid,
  WebView
} = React;
var { Icon } = require('react-native-icons');
var YouTube;

var getYoutubeId = (song) => {
  if (!song.media || !song.media.oembed) return;
  if (song.media.oembed.provider_name !== 'YouTube') return;

  var {url, title} = song.media.oembed;
  var regex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=)([a-zA-Z0-9\-_]+)/gm;
  var matches = regex.exec(url);

  if (matches && matches.length === 2) {
    var id = matches[1];
    return id;
  }
};

var Player = React.createClass({
  componentWillMount: function() {
    if (this.props.deviceType === 'ios') {
      YouTube = require('react-native-youtube');
    }
  },
  pressBack: function() {
    this.props.onPlayerExit();
  },
  render: function() {
    var {song} = this.props;
    var youtubeId = getYoutubeId(song);

    if (youtubeId && YouTube) {
      var player = (
        <YouTube
          ref="youtubePlayer"
          videoId={youtubeId} // The YouTube video ID
          play={true}           // control playback of video with true/false
          hidden={false}        // control visiblity of the entire view
          playsInline={true}    // control whether the video should play inline
          controls={2}

          onReady={(e)=> {this.setState({isReady: true})}}
          onChangeState={(e)=>{this.setState({status: e.state})}}
          onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
          onError={(e)=>{this.setState({error: e.error})}}
          onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

          style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black'}}
        />
      )
    } else if (this.props.deviceType === 'ios') {
      var player = (
        <WebView
          ref='webView'
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={song.url}
          javaScriptEnabledAndroid={true}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerNavigation}>
          <TouchableHighlight onPress={this.pressBack}>
            <View style={this.props.deviceType === 'ios' ? styles.navigationBackIOS : styles.navigationBack}>
              <Icon
                name='fontawesome|chevron-left'
                size={16}
                color='#FFFFFF'
                style={styles.navigationIcon}
              />
            </View>
          </TouchableHighlight>
          <Text style={styles.navigationTitle} numberOfLines={1}>{song.title}</Text>
        </View>
        <View style={styles.containerContent}>
          {player}
        </View>
      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1E1E1E'
  },
  containerNavigation: {
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#0F0F10'
  },
  navigationTitle: {
    flex: .8,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  navigationBack: {
    flex: .2,
    padding: 10,
    paddingVertical: 20,
  },
  navigationBackIOS: {
    flex: .2,
    padding: 10,
  },
  navigationIcon: {
    width: 16,
    height: 16,
  },
  containerContent: {
    flex: 1,
    backgroundColor: '#1E1E1E'
  }
});

AppRegistry.registerComponent('Player', () => Player);
module.exports = Player;
