import React, { Component } from 'react';
import logo from "../assets/imgs/logo.png";
import Player from "../containers/Player"
// 导入样式
import "../assets/stylus/reset.styl";
import './App.styl';

//  导入路由
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from "react-router-dom";
import Recommend from "./recommend/Recommend";
import Ranking from "./ranking/Ranking";
import Search from "./search/Search";

// 导入字体图标样式
import "../assets/stylus/font.styl";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <header className="app-header">
                        <img src={logo} className="app-logo" alt="logo" />
                        <h1 className="app-title">Calm Music</h1>
                    </header>
                    <div className="music-tab">
                        <div className="tab-item">
                            <NavLink to="/recommend" className="nav_link">
                                <span>推荐</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/ranking" className="nav_link">
                                <span>排行榜</span>
                            </NavLink>
                        </div>

                        <div className="tab-item">
                            <NavLink to="/search" className="nav_link">
                                <span>搜索</span>
                            </NavLink>
                        </div>
                    </div>
                    {/* 配置路由导航部分 */}
                    <div className="music-view">
                        <Switch>
                            <Route path="/recommend" component={Recommend}></Route>
                            <Route path="/ranking" component={Ranking} />
                            <Route path="/search" component={Search} />
                            <Redirect from="/" to="/recommend" />
                            <Route component={Recommend} />
                        </Switch>
                    </div>
                    <Player/>
                </div>
            </Router>

        );
    }
}

export default App;
