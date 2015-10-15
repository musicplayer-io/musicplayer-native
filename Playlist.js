'use strict';

var React = require('react-native');
var PlaylistItem = require('./PlaylistItem');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight,
  StatusBarIOS,
} = React;

var MOCK_SUBREDDIT = "listentothis";
var API = {
  Reddit: {
    base: 'https://www.reddit.com'
  }
};


var Playlist = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      listings: null
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    var subs = MOCK_SUBREDDIT;
    var url = `${API.Reddit.base}/r/${subs}/hot.json`;
    if (StatusBarIOS)
     StatusBarIOS.setNetworkActivityIndicatorVisible(true);
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          listings: responseData.data.children,
          loaded: true,
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.children)
        })
        if (StatusBarIOS)
          StatusBarIOS.setNetworkActivityIndicatorVisible(false);
      })
      .done();
  },
  render: function() {
    if (!this.state.listings) {
      return this.renderLoadingView();
    }
    return this.renderListings();
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          Loading...
        </Text>
      </View>
    );
  },
  renderListings: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderListing}
        style={this.props.deviceType === 'ios'? styles.listViewIOS : styles.listView}
      />
    );
  },
  renderListing: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <PlaylistItem data={rowData.data}></PlaylistItem>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },
  _pressRow: function(rowID: number) {
    var listing = this.state.listings[rowID];
    this.props.onSongSelected(listing);
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  loading: {
    color: '#9D9FA2',
  },
  listView: {
    backgroundColor: '#1E1E1E',
  },
  listViewIOS: {
    marginTop: 60,
    backgroundColor: '#1E1E1E',
  },
  separator: {
    height: 1,
    backgroundColor: '#2E2E2E',
  },
});

AppRegistry.registerComponent('Playlist', () => Playlist);
module.exports = Playlist;
