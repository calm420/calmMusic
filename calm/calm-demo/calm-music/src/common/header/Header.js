import React from "react";
import "./header.styl";

export default class Header extends React.Component {
    handleClick(){
        window.history.back();
    }
    render(){
        return (
            <div className="music-header">
                <span className="header-back" onClick={this.handleClick}>
                    <i className="icon-circle-left"></i>
                </span>
                <div className="header-title">
                    {/* 父组件给子组件传值 */}
                    {this.props.title}
                </div>
            </div>
        )
    }
}