import React from "react";
import ReactDOM from "react-dom";
import "./album.styl";
/**
 * 分别导入Header,Scroll,Header组件
 */
import Header from "@/common/header/Header";
import Scroll from "@/common/scroll/Scroll";
import Loading from "@/common/loading/Loading";

/**
 * 将getSongVKey方法，从song.js中导出
 */
import { getSongVKey } from "@/api/song";

/**
 * 1.导入专辑请求函数
 * 2.接口成功的状态码常量
 * 3.专辑和歌曲模型类
 */
import { getAlbumInfo } from "@/api/recommend";
import { CODE_SUCCESS } from "@/api/config";
import * as AlbumModel from "@/model/album";
import * as SongModel from "@/model/song";

/**
 * 添加动画
 */
import { CSSTransition } from "react-transition-group"

export default class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnimation: false,
            loading: true,
            album: {},
            songs: [],
            refreshScroll: false,
            mContainerHeight: document.body.clientHeight - 260
        }
    }
    componentDidMount() {
        this.setState({
            showAnimation: true
        })
        window.addEventListener("resize", this.getMContainerHeight)


        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumContainerDOM = ReactDOM.findDOMNode(this.refs.albumContainer);
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + 'px';
        /**
         * 获取专辑信息的方法
         */
        getAlbumInfo(this.props.match.params.id).then((res) => {
            // console.log(res);
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    let album = AlbumModel.createAlbumByDetail(res.data);
                    album.desc = res.data.desc;

                    let songList = res.data.list;
                    // console.log("songList", songList);
                    let songs = [];
                    songList.forEach(item => {

                        let song = SongModel.createSong(item);
                        //获取歌曲vkey
                        this.getSongUrl(song, item.songmid);
                        songs.push(song);
                    });
                    // console.log("songs", songs);

                    this.setState({
                        loading: false,
                        album: album,
                        songs: songs
                    }, () => {
                        this.setState({ refreshScroll: true })
                    })
                }
            }
        })
    }
    componentWillMount() {
        window.removeEventListener("resize", this.getMContainerHeight)
    }
    getMContainerHeight() {
        var height = document.body.clientHeight - 260;
        this.setState({
            mContainerHeight: height
        })
    }
    /**
     * 获取歌曲Vkey的方法
     */
    getSongUrl(song, mId) {
        /**
         * 根据传入的每一个音乐的ID,获取歌曲VKey的方法
         */
        getSongVKey(mId).then((res) => {
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    if (res.data.items) {
                        let item = res.data.items[0];
                        song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
                    }
                }
            }
        })
    }
    /**
     * 监听scroll
     */
    scroll = ({ y }) => {
        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumFixedBgDOM = ReactDOM.findDOMNode(this.refs.albumFixedBg);

        let playButtonWrapperDOM = ReactDOM.findDOMNode(this.refs.playButtonWrapper)


        if (y < 0) {
            if (Math.abs(y) + 55 > albumBgDOM.offsetHeight) {
                albumFixedBgDOM.style.display = 'block';
            } else {
                albumFixedBgDOM.style.display = 'none';
            }
        } else {
            let transform = `scale(${1 + y * 0.004},${1 + y * 0.004})`
            albumBgDOM.style["webkitTransform"] = transform;
            albumBgDOM.style["transform"] = transform;
            playButtonWrapperDOM.style.marginTop = `${y}px`
        }
    }
    selectSong(song) {
        return (e) => {
            // console.log(this.props.setSongs([song]))
            this.props.setSongs([song]);
            this.props.changeCurrentSong(song);
            // console.log( this.props.changeCurrentSong(song))
        }
    }
    /**
        * 播放全部
        */
    playAll = () => {
        if (this.state.songs.length > 0) {
            //添加播放歌曲列表
            this.props.setSongs(this.state.songs);
            this.props.changeCurrentSong(this.state.songs[0]);
            this.props.showMusicPlayer(true);
        }
    }
   
    render() {
        let album = this.state.album;
        let songs = this.state.songs.map((song) => {
            return (
                <div className="song" key={song.id} onClick={this.selectSong(song)}>
                    <div className="song-name">{song.name}</div>
                    <div className="song-singer">{song.singer}</div>
                </div>
            )
        })

        return (
            <CSSTransition in={this.state.showAnimation} timeout={300} classNames="translate">
                <div className="music-album">
                    <Header title={album.name} ref="header"></Header>
                    <div style={{ position: "relative" }}>
                        <div className="album-img" ref="albumBg" style={{ backgroundImage: `url(${album.img})` }}>
                            <div className="filter"></div>
                        </div>
                        <div className="album-img fixed" ref="albumFixedBg" style={{ backgroundImage: `url(${album.img})` }}>
                            <div className="filter"></div>
                        </div>
                        <div className="play-wrapper" ref="playButtonWrapper">

                            <div className="play-button" onClick={this.playAll}>
                                <i className="icon-play"></i>
                                <span>播放全部</span>
                            </div>
                        </div>
                    </div>
                    <div className="album-container" ref="albumContainer">
                        <div className="album-scroll" style={this.state.loading === true ? { display: "none" } : { height: this.state.mContainerHeight }}>
                            <Scroll refresh={this.state.refreshScroll} onScroll={this.scroll}>
                                <div className="album-wrapper">
                                    <div className="song-count">专辑 共{songs.length}首</div>
                                    <div className="song-list">
                                        {songs}
                                    </div>
                                    <div className="album-info" style={album.desc ? {} : { display: "none" }}>
                                        <div className="album-title">专辑简介</div>
                                        <div className="album-desc">
                                            {album.desc}
                                        </div>
                                    </div>
                                </div>
                            </Scroll>
                        </div>
                        <Loading title="正在加载..." show={this.state.loading}></Loading>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}