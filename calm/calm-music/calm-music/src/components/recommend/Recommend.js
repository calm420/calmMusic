import React from "react";
import Swiper from "swiper";
import LazyLoad, { forceCheck } from "react-lazyload";
import { getCarousel, getNewAlbum } from "@/api/recommend";
import { CODE_SUCCESS } from "@/api/config";
import * as AlbumModel from "@/model/album";
import Loading from "@/common/loading/Loading"
import Scroll from "@/common/scroll/Scroll";

import "./recommend.styl";
import "swiper/dist/css/swiper.css";


export default class Reommend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            sliderList: [],
            newAlbums: [],
            refreshScroll: false,
            screenHeight:document.body.clientHeight - 90
        }
    }

    componentDidMount() {
        window.addEventListener("resize",this.getScreenHeight);
        //  请求轮播图数据
        getCarousel().then((res) => {
            // console.log(res);
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    this.setState({
                        sliderList: res.data.slider
                    }, () => {
                        // console.log(this);
                        if (!this.sliderSwiper) {
                            // 轮播图初始化
                            this.sliderSwiper = new Swiper(".slider-container", {
                                loop: true,
                                autoplay: 3000,
                                autoplayDisableOnInteraction: false,
                                pagination: '.swiper-pagination'
                            })
                        }
                    })
                }
            }
        });

        // 请求专辑数据
        getNewAlbum().then((res) => {
            // console.log("getNewAlbum",res)
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    let albumList = res.albumlib.data.list;
                    // 根据发布时间降序
                    albumList.sort((a, b) => {
                        return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
                    });
                    this.setState({
                        // 当专辑列表加载完后隐藏loading组件，
                        loading:false,
                        newAlbums: albumList
                    },() => {
                        //刷新scroll
                        this.setState({refreshScroll:true});
                    })
                }
            }
        });
        
    }

    componentWillMount(){
        window.removeEventListener("resize",this.getScreenHeight);
    }
    // 获取屏幕高度
    getScreenHeight=()=>{
        var height = document.body.clientHeight - 90;
        this.setState({
            screenHeight:height
        })
        // this.state.screenHeight = height;
    }
    toLink(linkUrl) {
        return () => {
            window.location.href = linkUrl;
        }
    }
    render() {
        let albums = this.state.newAlbums.map(item => {
            let album = AlbumModel.createAlbumByList(item);
            return (
                <div className="album-wrapper" key={album.id}>
                    <div className="left">
                        <LazyLoad height="100%">
                            <img src={album.img} width="100%" height="100%" alt={album.name} />
                        </LazyLoad>
                    </div>
                    <div className="right">
                        <div className="album-name">
                            {album.name}
                        </div>
                        <div className="singer-name">
                            {album.singer}
                        </div>
                        <div className="public-name">
                            {album.publicTime}
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="music-recommend" style={{height:this.state.screenHeight}}>
                <Scroll refresh={this.state.refreshScroll} onScroll={(e)=> {forceCheck();}}>
                    <div>
                        <div className="slider-container">
                            <div className="swiper-wrapper">
                                {
                                    this.state.sliderList.map(slider => {
                                        return (
                                            <div className="swiper-slide" key={slider.id}>
                                                <a className="slider-nav" onClick={this.toLink(slider.linkUrl)}>
                                                    <img src={slider.picUrl} width="100%" height="100%" alt="calm" />
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <div className="album-container">
                            <h1 className="title">最新专辑</h1>
                            <div className="album-list">
                                {albums}
                            </div>
                        </div>
                    </div>
                </Scroll>
                <Loading title="正在加载..." show={this.state.loading} ></Loading>
            </div>
        )
    }
}