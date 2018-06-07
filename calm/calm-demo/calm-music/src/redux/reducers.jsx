/**
 * reducers.js存放用来更新当前播放歌曲，播放歌曲列表和显示或隐藏播放页状态的纯函数。一定要保证reducer函数的纯净，永远不要有以下操作
 * 1.修改传入参数
 * 2.执行有副作用的操作，如 API 请求和路由跳转
 * 3.调用非纯函数，如 Date.now() 或 Math.random()
 */

 import {combineReducers} from "redux";
 import * as ActionTypes from "./actionTypes";

 /**
  * reducer就是一个纯函数，接受旧的state和action,返回新的state
  */

  const initialState = {
      showStatus:false,//显示状态
      song:{},//当前歌曲
      songs:[],//列表歌曲
  }

//   拆分reducer
// 显示或隐藏播放状态
  function showStatus(showStatus = initialState.showStatus,action){
      switch(action.type){
            case ActionTypes.SHOW_PLAYER:
                return action.showStatus;
            default :
                return showStatus;
      }
  }


//   修改当前歌曲
function song(song = initialState.song,action){
    switch(action.type){
        case ActionTypes.CHANGE_SONG:
            return action.song;
        default :
            return song;
    }
}


// 添加或移除歌曲
function songs(songs = initialState.songs,action){
    switch(action.type){
        case ActionTypes.SET_SONGS:
            return action.songs;
        case ActionTypes.REMOVE_SONG_FROM_LIST:
            return songs.filter(song => song.id !== action.id); 
        default :
            return songs;
    }
}


// 合并reducer
const reducer = combineReducers({
    showStatus,
    song,
    songs
})

export default reducer;