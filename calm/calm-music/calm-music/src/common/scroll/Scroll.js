import React from "react";
import ReatcDOM from "react-dom";
import propTypes from "prop-types";
import BScroll from "better-scroll";
import "./scroll.styl";

class Scroll extends React.Component {
    // 组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用
    componentDidUpdate(){
        if(this.bScroll && this.props.refresh === true){
            this.bScroll.refresh();
        }
    }
    // 在第一次DOM渲染后调用
    componentDidMount(){
        this.scrollView = ReatcDOM.findDOMNode(this.refs.scrollView);
        if(!this.bScroll) {
            this.bScroll = new BScroll(this.scrollView,{
                probeType:3,
                click:this.props.click
            });
            if(this.props.onScroll){
                this.bScroll.on("scroll",(scroll)=> {
                    this.props.onScroll(scroll);
                })
            }
        }
    }
    // 组件从 DOM 中移除的时候立刻被调用
    componentWillUnmount(){
        this.bScroll.off("scroll");
        this.bScroll = null;
    }
    refresh(){
       if(this.bScroll){
           this.bScroll.refresh();
       }
    }
    render(){
        return (
            <div className="scroll-view" ref="scrollView">
                {this.props.children}
            </div>
        )
    }
}

Scroll.defaultProps = {
    click:true,
    refresh:false,
    onScroll:null
}

Scroll.propTypes = {
    click:propTypes.bool,
    refresh:propTypes.bool,
    onScroll:propTypes.func
}

export default Scroll