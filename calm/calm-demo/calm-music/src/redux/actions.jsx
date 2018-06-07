/**
 * actions.jsx主要存放操作的对象，必须有一个type属性表示要执行的操作，当应用规模越来越大的时候，最好分模块定义
 * action是把数据从应用层传到store的，它是store的数据唯一来源
 */

 import * as ActionTypes from "./actionTypes";

 export function showPlayer(showStatus){
    return {
        type:ActionTypes.SHOW_PLAYER,
        showStatus
    }
 }

 export function changeSong(song){
     return {
         type:ActionTypes.CHANGE_SONG,
         song
     }
 }

 export function removeSong(id){
     return {
         type:ActionTypes.REMOVE_SONG_FROM_LIST,
         id
     }
 }
 export function setSongs(songs){
     return {
         type:ActionTypes.SET_SONGS,
         songs
     }
 }



 