// 在应用中加入redux，让App中的组件连接到redux，react-redux提供了Provider组件和connect方法。
// Provider用来传递store，connect用来将组件连接到redux，任何一个从 connect() 包装好的组件都可以得到一个 dispatch 
// 方法作为组件的 props，以及得到全局 state 中所需的任何内容


import React from "react";
import {Provider} from "react-redux";
import store from "../redux/store";
import App from "./App";


/**
 * 用prodiver包裹App并且传递store
 * provider接受一个store对象
 */
class Root extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default Root;
