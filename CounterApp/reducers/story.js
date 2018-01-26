import * as types from '../constants/Constants'
const initialState = {
    id: "",
    refreshing: true,
    loaded: false,
    story: new Object()
};

export default function story(state = initialState,action) {
    switch (action.type){
        case types.Fetch_Story_Detail:
            return Object.assign({},state,{
                id:action.id,
                refreshing:true,
                loaded:false
            });
        case types.Fetch_Story_Detail_Done:
            return Object.assign({},state,{
                id:action.id,
                refreshing:false,
                loaded:true,
                story:action.story
            });
        default:
            return state;
    }
}

