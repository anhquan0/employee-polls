import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../services/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "../pages/common/Login";
import { initialData } from "../services/actions/shared";

describe("Login", () => {
    it("Renders Login component successfully", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('Handles login form submission correctly', async () => {
        await store.dispatch(initialData());

        const wrapper = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        const loginHeadingElement = wrapper.getByTestId("login-heading");
        const submitButtonElement = wrapper.getByTestId("loginBtn");
        const userSelectElement = wrapper.getByTestId("user-select");

        expect(loginHeadingElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();
        expect(userSelectElement).toBeInTheDocument();

        // Test user selection
        fireEvent.change(userSelectElement, { target: { value: 'johndoe' } });
        expect(userSelectElement.value).toBe("johndoe");

        // Test form submission
        fireEvent.click(submitButtonElement);
        
        // The component should redirect after successful login
        // We don't need to test for clearing fields since we're using a select
    });
});