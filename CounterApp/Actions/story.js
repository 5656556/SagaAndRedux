/**
 * Created by erfli on 9/21/16.
 */
import * as ActionType from "../constants/Constants"
export function fetchStoryBegin(id) {
    return {
        type: ActionType.Fetch_Story_Detail,
        id,
    };
}
export function fetchStoryDone(id, story) {
    return {
        type: ActionType.Fetch_Story_Detail_Done,
        id,
        story
    };
}