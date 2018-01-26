import React,{ Component } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DefaultStyle from '../Styles/ListStyle';
/**
 * Created by erfli on 9/10/16.
 */
export default class StoryCell extends React.Component {
    goToStoryDetailPage(id) {
        console.log('chuzhi:'+id);
        Actions.secondView({id: id});
    }

    constructor(props) {
        super(props);
    }

    render() {

        var image = this.props.story.images[0];
        var id = this.props.story.id;
        var content = this.props.story.title;
        return (
            <View>
                <TouchableHighlight
                    onPress={this.goToStoryDetailPage.bind(this, id)}
                    underlayColor='#FFFFFF'
                >
                    <View style={styles.row}>
                        <View style={styles.rowContent}>
                            <Image
                                style={styles.logo}
                                source={{uri: image}}
                            />
                            <Text style={{flex: 1,fontSize:15}}>{content}</Text>
                        </View>
                        <View style={DefaultStyle.divider}></View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    row: {
        flex: 1,
        height: 100,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row'
    },
    logo: {
        height: 80,
        width: 80,
        borderRadius:5,
        marginLeft: 10,
        marginBottom: 8,
        marginRight: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
});