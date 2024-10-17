import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { initialData } from './services/actions/shared';
import Nav from "./pages/common/Header";
import Home from "./pages/common/Home";
import NewPoll from "./pages/polls/NewPoll";
import Poll from "./pages/polls/Poll";
import Login from "./pages/common/Login";
import Leaderboard from "./pages/common/Leaderboard";
import PageNotFound from "./pages/common/PageNotFound";
import Router from "./pages/common/Router";
import Footer from './pages/common/Footer';

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(initialData());
  });

  return (
    <div className="flex flex-col h-screen">
      {loggedIn && <Nav />}
      <Routes>
        <Route path="/" element={<Router><Home /></Router>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/leaderboard" exact element={<Router><Leaderboard /></Router>} />
        <Route path="/questions/:id" element={<Router><Poll /></Router>} />
        <Route path="/new" exact element={<Router><NewPoll /></Router>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
