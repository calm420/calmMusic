import React from "react";
import ReactDOM from "react-dom";
import { Song } from "@/model/song";
import Progress from "./Progress";

import "./Player.styl";

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.currentSong = new Song(0, "", "", "", 0, "", "");
        this.currentIndex = 0;
        this.isFirstPlay = true;
        //播放模式： list-列表 single-单曲 shuffle-随机
        this.playModes = ["list", "single", "shuffle"];
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
        this.audioDOM.addEventListener("canplay", () => {
            this.audioDOM.play();
            this.setState({
                playStatus: true
            })
        }, false)

        this.audioDOM.addEventListener("timeupdate", () => {
            if (this.state.playStatus === true) {
                this.setState({
                    playProgress: this.audioDOM.currentTime / this.audioDOM.duration,
                    currentTime: this.audioDOM.currentTime
                })
            }
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
        if (this.audioDOM.playStatus === false) {
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
    }


    /**
     * 上一首
     */
    previous = () => {
        if (this.props.playSongs.length > 0 && this.props.playSongs.length !== 1) {
            let currentIndex = this.currentIndex;
            if (this.state.currentPlayMode === 0) { //列表播放
                if (currentIndex === 0) {
                    currentIndex = this.props.length - 1;
                } else {
                    currentIndex = currentIndex - 1;
                }
            } else if (this.state.currentPlayMode === 1) {//单曲循环
                currentIndex = this.currentIndex;
            } else {//随机播放
                let index = parseInt(Math.random() * this.props.playSongs.length, 10);
                currentIndex = index;
            }
            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
            this.props.changeCurrentIndex(currentIndex);
        }
    }

    /**
     * 下一首
     */
    next = () => {
        
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
            this.props.changeCurrentIndex(currentIndex);
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
    render() {
        let song = this.currentSong;

        let playBg = song.img ? song.img : require("@/assets/imgs/play_bg.jpg");

        let playButtonClass = this.state.playStatus === true ? "icon-pause" : "icon-play2";

        song.playStstus = this.state.playStatus;

        //从redux中获取当前播放歌曲
        if (this.props.currentSong && this.props.currentSong.url) {
            //当前歌曲发生变化
            if (this.currentSong.id !== this.props.currentSong.id) {
                this.currentSong = this.props.currentSong;
                this.audioDOM.src = this.currentSong.url;
                //加载资源，iOS需要调用此方法
                this.audioDOM.load();
            }
        }

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
                                    // onDrag={this.handleDrag}
                                    // onDragEnd={this.handleDragEnd} 
                                    />
                                </div>
                            </div>
                            <div className="play-wrapper">
                                <div className="play-model-button" onClick={this.changePlayMode}>
                                    <i className={"icon-" + this.playModes[this.state.currentPlayMode] + "-play"}></i>
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

