
import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Actions} from 'react-native-router-flux';
import DefaultStyle from './Styles/ListStyle';
import * as zhihuCreators from './Actions/zhihu';
import {
    View,
    Text,
    Image,
    ListView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    InteractionManager,
} from 'react-native';

import SecondView from './SecondView';
import StoryCell from "./Views/StoryCell";


const propTypes = {
    zhihuActions: PropTypes.func,
    zhihu: PropTypes.object,

};


class HomePage extends Component{

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchLatest();
    }

    fetchLatest = ()=> {
        InteractionManager.runAfterInteractions(() => {
            // const {dispatch} = this.props;
            // dispatch(zhihuCreators.startRefreshZhihu());
            const {zhihuActions} = this.props;
            zhihuActions.startRefreshZhihu();
        });
    }

    fetchMore = ()=> {
        // const {dispatch, zhihu} = this.props;
        // if (zhihu.refreshing || zhihu.loadingMore) {
        //     return;
        // }
        // dispatch(zhihuCreators.startLoadMoreZhihu(zhihu.page));

        const {zhihuActions, zhihu} = this.props;
        if (zhihu.refreshing || zhihu.loadingMore) {
            return;
        }
        zhihuActions.startLoadMoreZhihu(zhihu.page);
    }

    renderFooter = () => {
        if(this.props.loadingMore){
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        数据加载中......
                    </Text>
                </View>
            )
        }
        return <View />
    }


    render(){
        const {zhihu} = this.props;
        if(zhihu === undefined || !zhihu.loaded || zhihu.db.length === 0){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('./Assets/Images/ring.gif')}
                           style={{width:70,height:70}}
                    />
                </View>
            );
        }else {
            return (
                <View style={DefaultStyle.list_view}>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={zhihu.refreshing}
                                onRefresh={this.fetchLatest}
                            />
                        }
                        enableEmptySections={true}
                        style={DefaultStyle.list_view}
                        dataSource={zhihu.dataSource}
                        onEndReached={this.fetchMore}
                        onEndReachedThreshold={10}
                        renderFooter={this.renderFooter}
                        renderRow={(rowData, sectionID, rowID) =>
                            <StoryCell story={rowData}/>
                        }
                    />
                </View>
            )
        }
    }
}

function add() {
Actions.secondView();
}

const mapStateToProps = (state) => {
    const { zhihu } = state;
    return{
        zhihu
    };
}
const mapDispatchToProps = (dispatch) => {
    const zhihuActions = bindActionCreators(zhihuCreators,dispatch);
    return {
        zhihuActions
    };
}
// HomePage.propTypes = PropTypes;


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: 100,
        height: 100,
        marginVertical: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    footerText: {
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 10
    },

})