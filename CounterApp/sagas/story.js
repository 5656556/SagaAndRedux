import { put,take,call,fork }from 'redux-saga/effects';
import { toastShort } from '../Utils/ToastUtil';
import * as ActionType from '../constants/Constants';
import * as StoryAction from '../Actions/story';
import {request} from "../Utils/RequestUtil";

export function* requestStory(id) {
    try {
        const story = yield call(request,"http://news-at.zhihu.com/api/4/news/" + id);
        // const story = yield call(request,"https://www.baidu.com/" + id);
        yield put(StoryAction.fetchStoryDone(id,story))
    }catch (error) {
        yield put(StoryAction.fetchStoryDone(id))
        toastShort('网络故障');
    }
}

export function* watchRequestStory() {
    while (true) {
        const {
            id
        } = yield take(ActionType.Fetch_Story_Detail);
        yield fork(requestStory,id);
    }
}