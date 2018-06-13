import React from "react";
import ReactDOM from "react-dom";
import "./Progress.styl";

/**
 * 使用prop-types给传入的props进行类型校验，导入prop-types
 * 接收进度（progress）
 * 是否禁用按钮（disableButton）
 * 是否禁用拖拽（disableDrag）
 * 开始拖拽回调函数（onDragStart）
 * 拖拽中回调函数（onDrag）
 * 拖拽接受回调函数（onDragEnd）
 */
import PropTypes from "prop-types";
PropTypes.propTypes = {
    progress: PropTypes.number.isRequired,
    disableButton: PropTypes.bool,
    disableDrag: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func

}


export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(){
        if(!this.progressBarWidth){
            this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth;
        }
    }
    componentDidMount() {
        /**
         * 获取dom和进度条总长度
         */
        let progressBarDOM = ReactDOM.findDOMNode(this.refs.progressBar)
        let progressDOM = ReactDOM.findDOMNode(this.refs.progress)
        let progressBtnDOM = ReactDOM.findDOMNode(this.refs.progressBtn)

        this.progressBarWidth = progressBarDOM.offsetWidth;

        /**
         * 拽功能利用移动端的touchstart、touchmove和touchend来实现
         */
        let { disableButton, disableDrag, onDragStart, onDrag, onDragEnd } = this.props;
        if (disableButton !== true && disableDrag !== true) {
            /**
             * downX  触摸开始位置
             * buttonLeft 按钮left值
             */
            let downX = 0;
            let buttonLeft = 0;

            progressBtnDOM.addEventListener("touchstart", (e) => {
                let touch = e.touches[0];
                downX = touch.clientX;
                buttonLeft = parseInt(touch.target.style.left, 10);
                if (onDragStart) {
                    onDragStart();
                }
            })
            progressBtnDOM.addEventListener("touchmove", (e) => {
                e.preventDefault();
                /**
                 * diffX计算拖拽的距离
                 * btnLeft按钮距离左边的位
                 */
                let touch = e.touches[0];
                let diffX = touch.clientX - downX;
                let btnLeft = buttonLeft + diffX;
                if (btnLeft > progressBarDOM.offsetWidth) {
                    btnLeft = progressBarDOM.offsetWidth;
                } else if (btnLeft < 0) {
                    btnLeft = 0;
                }

                //设置按钮的left值
                touch.target.style.left = btnLeft + "px";
                //设置进度条的宽度
                progressDOM.style.width = btnLeft / this.progressBarWidth * 100 + "%";

                if (onDrag) {
                    onDrag(btnLeft / this.progressBarWidth);
                }

            })
            progressBtnDOM.addEventListener("touchend", (e) => {
                if (onDragEnd) {
                    onDragEnd();
                }
            })

        }
    }

    componentDidUpdate() {
        //组件更新后重新获取进度条总宽度
        if (!this.progressBarWidth) {
            this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth;
        }
    }
    render() {
        // console.log(this.props);
        /**
         * progress当前走过的进度值
         * progressButtonOffsetLeft按钮的left值
         * disableButton为false渲染按钮元素
         */
        let { progress, disableButton } = this.props;
        if (!process) process = 0;


        let progressButtonOffsetLeft = 0;
        if (this.progressBarWidth) {
            progressButtonOffsetLeft = process * this.progressBarWidth;
        }
        return (
            <div className="progress-bar" ref="progressBar">
                <div className="progress-load"></div>
                <div className="progress" ref="progress" style={{ width: "20%" }}></div>
                {
                    disableButton === true ? "" :
                        <div className="progress-button" ref="progressBtn" style={{ left: "70px" }}></div>

                }
            </div>
        )
    }
}