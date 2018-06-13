import React from "react";
import ReactDOM from "react-dom";
import { Song } from "@/model/song";
import Progress from "./Progress";

import "./Player.styl";
var calm;
export default class Player extends React.Component {
    constructor(props) {
        super(props);
        calm = this;
        this.dragProgress = 0;
        this.currentSong = new Song(0, "", "", "", 0, "", "");
        this.currentIndex = 0;
        this.isFirstPlay = true;
        //播放模式： menu-列表 loop2-单曲 shuffle-随机
        this.playModes = ["menu", "loop2", "shuffle"];
        this.state = {
            currentTime: 0,
            playProgress: 0,
            playStatus: false,
            currentPlayMode: 0
        }
    }
    componentDidMount() {
        this.audioDOM = ReactDOM.findDOMNode(this.refs.audio);
        this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg);
        this.playerDOM = ReactDOM.findDOMNode(this.refs.player);
        this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg);
        /**
         * 监听开始播放的事件
         */
        this.audioDOM.addEventListener("canplay", () => {
            this.audioDOM.play();
            this.setState({
                playStatus: true
            })
        }, false)
        /**
         * 监听播放位置发生改变时的事件
         */
        this.audioDOM.addEventListener("timeupdate", () => {
            if (this.state.playStatus === true) {
                this.setState({
                    playProgress: this.audioDOM.currentTime / this.audioDOM.duration,
                    currentTime: this.audioDOM.currentTime
                })
            }
        }, false)

        /**
         *  播放完后的处理，给audio注册ended事件
         */
        this.audioDOM.addEventListener("ended", () => {
            console.log("end")
            if (this.props.playSongs.length > 1) {
                let currentIndex = this.currentIndex;
                if (this.state.currentPlayMode === 0) {
                    if (currentIndex = this.props.playSongs.length - 1) {
                        currentIndex = 0
                    } else {
                        currentIndex += 1;
                    }
                } else if (this.state.currentPlayMode === 1) {
                    this.audioDOM.play();
                    return;
                } else {
                    let index = parseInt(Math.random() * this.props.playSongs.length, 10);
                    currentIndex = index;
                }
                this.props.changeCurrentSong(calm.props.playSongs[currentIndex]);
                // this.props.changeCurrentIndex(currentIndex);
            } else {
                if (this.state.currentPlayMode === 1) {
                    this.audioDOM.play();
                } else {
                    this.audioDOM.pause();
                    this.setState({
                        playProgress: 0,
                        currentTime: 0,
                        playStatus: false
                    })
                }
            }
        }, false)

        this.audioDOM.addEventListener("error", () => {
            alert("加载歌曲出错")
        }, false)

    }
    componentDidUpdate() {
        //兼容手机端canplay事件触发后第一次调用play()方法无法自动播放的问题
        if (this.isFirstPlay === true) {
            this.audioDOM.play();
            this.isFirstPlay = false;
        }
    }

    /**
    * 歌曲模式切换
    */
    changePlayMode = () => {
        if (this.state.currentPlayMode === this.playModes.length - 1) {
            this.setState({
                currentPlayMode: 0
            })
        } else {
            this.setState({
                currentPlayMode: this.state.currentPlayMode + 1
            })
        }
    }

    /**
     * 播放与暂停
     */
    playOrPause = () => {
        if (this.state.playStatus == false) {
            if(this.first == undefined){
                this.audioDOM.src = this.currentSong.url;
                this.first = true;
            }
            this.audioDOM.play();
            this.setState({
                playStatus: true
            })
        } else {
            this.audioDOM.pause();
            this.setState({
                playStatus: false
            })
        }
        console.log(this.state.playStatus)
    }


    /**
     * 上一首
     */
    previous = () => {
        if (this.props.playSongs.length > 0 && this.props.playSongs.length !== 1) {
            let currentIndex = calm.currentIndex;
            console.log("1",currentIndex);
            if (this.state.currentPlayMode === 0) { //列表播放
                if (currentIndex === 0) {
                    console.log("===0",currentIndex)
                    currentIndex = this.props.playSongs.length - 1;
                    console.log("===0===",currentIndex)
                } else {
                    currentIndex -= 1;
                }
            } else if (this.state.currentPlayMode === 1) {//单曲循环
                currentIndex = this.currentIndex;
            } else {//随机播放
                let index = parseInt(Math.random() * this.props.playSongs.length, 10);
                currentIndex = index;
            }
            console.log("2",currentIndex)
            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
            // this.props.changeCurrentIndex(currentIndex);
        }
    }

    /**
     * 下一首
     */
    next = () => {
        // console.log("next")
        // return
        if (this.props.playSongs.length > 0 && this.props.playSongs.length !== 1) {
            let currentIndex = this.currentIndex;
            if (this.state.currentPlayMode === 0) {
                if (currentIndex === this.props.playSongs.length - 1) {
                    currentIndex = 0;
                } else {
                    currentIndex += 1;
                }
            } else if (this.state.currentPlayMode === 1) {
                currentIndex = this.currentIndex;
            } else {
                let index = parseInt(Math.random() * this.props.playSongs.length, 10);
                currentIndex = index;
            }

            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
            console.log(currentIndex);
            /**
             * 调用父组件修改当前歌曲位置
             */
            // this.props.changeCurrentIndex(currentIndex);
        }

    }

    /**
     * 旋转图片
     */
    startImgRotate = () => {

    }

    /**
     * 停止旋转图片
     */
    stopImgRotate = () => {

    }
    /**
     * 拖拽方法
     */
    handleDrag = (progress) => {
        if (this.audioDOM.duration > 0) {
            this.audioDOM.pause();
            this.setState({
                playStatus: false
            })
            this.dragProgress = progress;
        }
    }
    /**
     * 拖拽结束
     */
    handleDragEnd = () => {
        if (this.audioDOM.duration > 0) {
            let currentTime = this.audioDOM.duration * calm.dragProgress;

            console.log("duration",this.audioDOM.duration)
            console.log("calm.dragProgress",calm.dragProgress)
            this.setState({
                playProgress: this.dragProgress,
                currentTime: currentTime
            }, () => {
                this.audioDOM.currentTime = currentTime;
                this.audioDOM.play();
                this.setState({
                    playStatus: true
                })
                this.dragProgress = 0;
            })
        }

    }

    render() {
        
        // this.currentIndex = this.props.currentIndex;
        // console.log(this.props.currentIndex)
        //从redux中获取当前播放歌曲
        if (this.props.currentSong && this.props.currentSong.url) {
            //当前歌曲发生变化
            if (this.currentSong.id !== this.props.currentSong.id) {
                this.currentSong = this.props.currentSong;
                if (this.audioDOM) {
                    this.audioDOM.src = this.currentSong.url;
                    //加载资源，iOS需要调用此方法
                    this.audioDOM.load();
                }
            }
        }
        let song = this.currentSong;

        let playBg = song.img ? song.img : require("@/assets/imgs/play_bg.jpg");

        let playButtonClass = this.state.playStatus === true ? "icon-pause" : "icon-play2";

        song.playStatus = this.state.playStatus;
        return (
            <div className="player-container">
                <div className="player" ref="player" style={{ display: this.props.showStatus === true ? "block" : "none" }}>
                    <div className="singer-middle">
                        <div className="singer-img" ref="singerImg">
                            <img src={playBg} alt={song.name} onLoad={
                                (e) => {
                                    this.playerBgDOM.style.backgroundImage = `url("${playBg}")`;
                                }
                            } />
                        </div>
                    </div>
                    <div className="singer-bottom">
                        <div className="controller-wrapper">
                            <div className="progress-wrapper">
                                <div className="play-progress">
                                    <Progress
                                        progress={this.state.playProgress}
                                        onDrag={this.handleDrag}
                                        onDragEnd={this.handleDragEnd}
                                    />
                                </div>
                            </div>
                            <div className="play-wrapper">
                                <div className="play-model-button" onClick={this.changePlayMode}>
                                    <i className={"icon-" + this.playModes[this.state.currentPlayMode]}></i>
                                </div>
                                <div className="previous-button" onClick={this.previous}>
                                    <i className="icon-previous"></i>
                                </div>
                                <div className="play-button" onClick={this.playOrPause}>
                                    <i className={playButtonClass}></i>
                                </div>
                                <div className="next-button" onClick={this.next}>
                                    <i className="icon-next"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="player-bg" ref="playerBg"></div>
                    <audio ref="audio"></audio>
                </div>
            </div>
        )

    }
}

