import { combineReducers } from 'redux';
import story from './story';
import zhihu  from './zhihu';
const rootReducers = combineReducers({
    story,
    zhihu
});

export default rootReducers;