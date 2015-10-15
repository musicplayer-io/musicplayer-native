
var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var timeSince = (time) => {
	var seconds = Math.floor((new Date() - time) / 1000)
	var interval = Math.floor(seconds / 31536000)
	if (interval > 1)
    return `${interval} years`
	interval = Math.floor(seconds / 2592000)
	if (interval > 1)
    return `${interval} months`
	interval = Math.floor(seconds / 86400)
	if (interval > 1)
    return `${interval} days`
	interval = Math.floor(seconds / 3600)
	if (interval > 1)
    return `${interval} hours`
	interval = Math.floor(seconds / 60)
	if (interval > 1)
    return `${interval} minutes`
	return `${Math.floor(seconds)} seconds`
}

class PlaylistItem extends React.Component {
  render() {
    var {data} = this.props;
    var ago = timeSince(new Date(data.created_utc * 1000));

    var hasThumbnail = true;
    if (!data.thumbnail || (data.thumbnail === 'self' || data.thumbnail === 'nsfw'))
      hasThumbnail = false;

    if (data.over_18 === true) {
      var Over18 = <View style={styles.metaContainer}>
        <Text style={styles.metaNSFW}>
          NSFW
        </Text>
        <Text style={styles.separator}> • </Text>
      </View>
    }

    return <View style={styles.container}>

      <View style={styles.textContainer}>

        <View style={styles.topMetaContainer}>
          <Text style={styles.metaScore}>
            {data.score}
          </Text>
          <Text style={styles.metaBold}>
            {data.author}
          </Text>
          <Text style={styles.separator}> in </Text>
          <Text style={styles.metaBold}>
            {data.subreddit}
          </Text>
        </View>

        <Text style={styles.title} numberOfLines={10}>
          {data.title}
        </Text>

        <View style={styles.metaContainer}>
          {Over18}
          <Text style={styles.meta}>
            {data.num_comments} comments
          </Text>
          <Text style={styles.separator}> • </Text>
          <Text style={styles.meta}>
            {data.domain}
          </Text>
          <Text style={styles.separator}> • </Text>
          <Text style={styles.meta}>
            {ago}
          </Text>
        </View>

      </View>

      <Image
        source={{uri: data.thumbnail}}
        style={hasThumbnail ? styles.thumbnail : {}}
      />
    </View>
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    flex: .1
  },
  metaContainer: {
    flexDirection: 'row'
  },
  topMetaContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 2,
    marginTop: 2,
  },
  meta: {
    fontSize: 10,
    color: '#9D9FA2',
  },
  metaBold: {
    fontSize: 10,
    color: '#fdc00f',
    fontWeight: 'bold',
  },
  metaNSFW: {
    fontSize: 10,
    color: '#B6393D',
    fontWeight: 'bold',
  },
  metaScore: {
    fontSize: 14,
    color: '#9D9FA2',
    fontWeight: 'bold',
    marginRight: 5,
  },
  separator: {
    fontSize: 10,
    color: '#9D9FA2',
  }
});

AppRegistry.registerComponent('PlaylistItem', () => PlaylistItem);
module.exports = PlaylistItem;
