'use strict';

var React = require('react');
var PropTypes = require('prop-types');

var {
    View,
    Platform,
} = require('react-native');
// Warning Please use the react-native-community/react-native-webview fork of this component instead.
// To reduce the surface area of React Native, <WebView/> is going to be removed from the React Native core.
var WebView = require('react-native-webview');

function Canvas() {
  var contextString = JSON.stringify(this.props.context);
  var renderString = this.props.render.toString();

  return (
      <View style={this.props.style}>
          <WebView
              automaticallyAdjustContentInsets={false}
              scalesPageToFit={Platform.OS === 'android'}
              contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
              source={{html: "<style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" + renderString + ").call(" + contextString + ", canvas);</script>"}}
              opaque={false}
              underlayColor={'transparent'}
              style={this.props.style}
              javaScriptEnabled={true}
              scrollEnabled={false}
              onLoad={this.props.onLoad}
              onLoadEnd={this.props.onLoadEnd}
              originWhitelist={['*']}
          />
      </View>
  );
}

Canvas.propTypes = {
    style: PropTypes.object,
    context: PropTypes.object,
    render: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
}

module.exports = Canvas;
