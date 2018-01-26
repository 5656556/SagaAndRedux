import React,{Component} from 'react';
import { Router,Scene,Actions } from 'react-native-router-flux';
import HomePage from './HomePage';
import SecondView from './SecondView';
import {View,StyleSheet} from 'react-native';

import { Provider } from 'react-redux';
import sagaRoot from "./sagas/sagas";
import configureStore from './store/store';


const mscenes = Actions.create(
    <Scene key={'root'}>
        <Scene key='homePage' title="首页" initial={true} component={HomePage}/>
        <Scene key="secondView"  title="详情页" component={SecondView}/>
    </Scene>
)

class MRoot extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Router scenes={ mscenes }/>
            </View>
        )
    }
}

const store = configureStore();
store.runSaga(sagaRoot);


const mApp = () => {
    return (<Provider store={store}>
        <MRoot />
    </Provider>)
}
export default mApp;
