import React, { useState } from 'react';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from '../../services/actions/questions';
import '../../css/newPoll.css';

const NewPoll = ({ dispatch }) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const inputOption = (e, option) => {
        const value = e ? e.target.value : "";
        option === "1" ? setFirstOption(value) : setSecondOption(value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!firstOption || !secondOption) {
            alert("Please input First Option and Second Option")
            return;
        }
        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/", { replace: true });
    };

    return (
        <div className="new-poll-container">
            <h1 className="new-poll-title">Would You Rather</h1>
            <h3 className="new-poll-subtitle">Create Your Poll</h3>
            <form className="new-poll-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="firstOption"
                        data-testid="firstLabel"
                    >
                        First Option
                    </label>
                    <input 
                        className="form-input"
                        value={firstOption}
                        onChange={(e) => inputOption(e, "1")}
                        type="text"
                        name="firstOption"
                        id="firstOption"
                        data-testid="firstOption"
                        placeholder="Enter the first option"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="secondOption"
                        data-testid="secondLabel"
                    >
                        Second Option
                    </label>
                    <input 
                        className="form-input"
                        value={secondOption}
                        onChange={(e) => inputOption(e, "2")}
                        type="text"
                        name="secondOption"
                        id="secondOption"
                        data-testid="secondOption"
                        placeholder="Enter the second option"
                    />
                </div>
                <div className="form-group">
                    <button 
                        className="submit-button"
                        type="submit"
                        data-testid="submit-poll"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default connect()(NewPoll);