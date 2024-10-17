import React from "react";
import { render, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";
import { setAuthUser } from './services/actions/authedUser';

describe("App", () => {
    it("Renders app component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Redirects to login page when not logged in", async () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    
        await waitFor(() => {
            const heading = component.getByTestId("login-heading");
            expect(heading).toBeInTheDocument();
        });
    });

    it("Shows home page when logged in", async () => {
        // Use an existing user from _DATA.js
        const mockUser = {
            id: "quanlna1",
            name: "Quan Le Ngoc Anh",
            password: "1234567",
            avatarURL: "https://picsum.photos/200"
        };
        
        store.dispatch(setAuthUser(mockUser));
    
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    
        await waitFor(() => {
            const heading = component.getByTestId("heading");
            expect(heading).toBeInTheDocument();
        });
    });
});