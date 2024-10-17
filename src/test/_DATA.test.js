const { _saveQuestionAnswer, _saveQuestion } = require("../utils/_DATA");

describe("_saveQuestion & _saveQuestionAnswer", () => {
    it("Save question is success", async () => {
        const question = {
            optionOneText: "Option1test",
            optionTwoText: "Option2test",
            author: { id: "quanlna1" }
        }
        const response = await _saveQuestion(question);
        expect(response).toBeTruthy();
    });

    it("Save question is error", async () => {
        const question = {
            loxhs1bqm25b708cmbf3g: {
                id: 'loxhs1bqm25b708cmbf3g',
                author: 'johndoe',
                timestamp: 1482579767190,
                optionOne: {},
                optionTwo: {}
            },
        }
        const response = await _saveQuestion(question).catch(e => e);
        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });

    it("Save question answer with non-existing user returns error", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "NonExistingUser", 
            qid: "qy1easen45rghipe9mvfz9qql4",
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Error! User doesn't exist");
    });

    it("Save question and answer is success", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "quanlna1",  // Changed to existing user
            qid: "qy1easen45rghipe9mvfz9qql4",
            answer: "optionOne"
        });
        expect(response).toBeTruthy();
    });

    it("Save question with missing author returns error", async () => {
        const question = {
            optionOneText: "Option 1 test",
            optionTwoText: "Option 2 test",
        };
        const response = await _saveQuestion(question).catch(e => e);
        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });

    it("Save question and answer is error", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "",
            qid: undefined,
            answer: ""
        }).catch(e => e);
        expect(response).toBe("Error! Please provide all information");
    });

    it("Save question with missing optionOneText returns error", async () => {
        const question = {
            optionTwoText: "Option 2 test",
            author: { id: "quanlna1" },
        };
        const response = await _saveQuestion(question).catch(e => e);
        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});