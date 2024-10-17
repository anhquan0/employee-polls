import {receiveUsers} from "./users";
import {receive} from "./questions";
import {getInitialData} from "../../utils/api";

export function initialData() {
    return async (dispatch) => {
        const { users, questions } = await getInitialData();
        dispatch(receiveUsers(users));
        dispatch(receive(questions));
    };
}
