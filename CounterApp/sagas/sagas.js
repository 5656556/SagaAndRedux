import {all,fork} from 'redux-saga/effects';
import {watchRequestStory} from "./story";
import {watchRefreshZhihu,watchLoadMoreZhihu} from "./zhihu";

export default function* rootSaga() {
 yield [
     fork(watchRequestStory),
     fork(watchRefreshZhihu),
     fork(watchLoadMoreZhihu)
 ];
}