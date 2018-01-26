import React, {Component}from "react";
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    BackHandler,
    WebView,
    Image
} from 'react-native';
import * as Actions from "./Actions/story"
import {connect} from "react-redux"
/**
 * Created by erfli on 9/11/16.
 */
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    story: PropTypes.object.isRequired,
};
class SecondView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.targetUrl == null || this.props.targetUrl.length == 0) {
            dispatch(Actions.fetchStoryBegin(this.props.id))
        }
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    render() {
        if (this.props.refreshing) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={require('./Assets/Images/ring.gif')}
                        style={{width: 70, height: 70}}
                    />
                </View>
            );
        }

        var targetUrl = "";
        if (!this.props.targetUrl) {
            const {story} = this.props;
            targetUrl = story.story["share_url"];
            console.log('urlIs:'+targetUrl);

        } else {
            targetUrl = this.props.targetUrl;
        }

        return (
            <View style={{flex: 1}}>
                <WebView style={styles.webview_style}
                         source={{url: targetUrl}}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                >
                </WebView>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    webview_style: {
        backgroundColor: '#ffffff',
    }
});
function mapStateToProps(state) {
    const {story} = state;
    return {
        story
    };
}
SecondView.propTypes = propTypes;
export default connect(mapStateToProps)(SecondView);