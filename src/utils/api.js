import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestionAnswer(authedUserId, qid, answer) {
    return _saveQuestionAnswer({
        authedUser: authedUserId,
        qid,
        answer
    });
}

export function saveQuestion(optionOneText, optionTwoText, author) {
    return _saveQuestion({ optionOneText, optionTwoText, author });
}
