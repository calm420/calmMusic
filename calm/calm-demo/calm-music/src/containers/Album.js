/**
 * 现在需要用connec方法将开发好的Album连接到redux，为了区分容器组件和UI组件，
 * 所以把需要连接的redux的容器组件放置到一个单独的目录中，只需要引入ui组件
 */
import {connect} from "react-redux";
import {showPlayer,changeSong,setSongs} from "../redux/actions";
import Album from "../components/album/Album";

// 映射dispatch映射到props上
const mapDispatchToProps = (dispatch) => ({
    showMusicPlayer:(status) => {
        dispatch(showPlayer(status));
    },
    changeCurrentSong:(song) => {
        console.log("此方法被执行了")
        console.log(song)
        dispatch(changeSong(song))
    },
    setSongs:(songs) => {
        dispatch(setSongs(songs));
    }
})

export default connect(null,mapDispatchToProps)(Album)


/**
 * 上诉代码中connect第一个参数用来映射store到组件props上，
 * 第二个参数是映射dispatch到props上，然后把Album组件传入，这里不需要获取store的状态，传入null
 */