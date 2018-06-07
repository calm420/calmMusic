var isDebug = true;
var localDomain = "192.168.50.15";   //请求地址
var isDebugLocal = true;
var localUrl = "192.168.50.72";    //跳转地址http://c/
// //云校本地测试webService地址
// var elearningWebserviceURLOfLocal = "http://" + localDomain + ":8888/elearning/elearningControl/";
// //云校的远程服务器地址
// var elearningWebserviceURLOfRemote = "http://www.maaee.com/elearning/elearningControl/";
// var elearningWebserviceURL = isDebug ? elearningWebserviceURLOfLocal : elearningWebserviceURLOfRemote;

//小蚂蚁webService地址
const apiWebServiceURLOfLocals = "http://" + localDomain + ":9006/Excoord_ApiServer/webservice";
const apiWebServiceURLOfRemote = "https://www.maaee.com/Excoord_For_Education/webservice";
var apiWebServiceURL = isDebug ? apiWebServiceURLOfLocals : apiWebServiceURLOfRemote;
//小蚂蚁mobile地址
const mobileURLOfLocal = "http://" + localUrl + ":8091/#/";
const mobileURLOfRemote = "http://jiaoxue.maaee.com:8091/#/";


function WebServiceUtil() {

};

WebServiceUtil.mobileServiceURL = isDebugLocal ? mobileURLOfLocal : mobileURLOfRemote;

WebServiceUtil.requestLittleAntApi = function (data, listener) {
    $.ajax({
        type: "post",
        url: apiWebServiceURL,
        data: {params: data},
        dataType: "json",
        success: function (result) {
            listener.onResponse(result);
        }, error: function (error) {
            listener.onError(result);
        }
    });
}

/**
 * 系统非空判断
 * @param content
 * @returns {boolean}
 */
WebServiceUtil.isEmpty = function (content) {
    if (content == null || content == "null" || content == "" || typeof(content) == "undefined") {
        return true;
    } else {
        return false;
    }
};

/**
 * 时间戳转年月日
 * @param nS
 * @returns {string}
 */
WebServiceUtil.formatYMD = function (nS) {
    var da = new Date(parseInt(nS));
    var year = da.getFullYear();
    var month = da.getMonth() + 1;
    var date = da.getDate();
    var ymdStr = [year, month, date].join('-');
    return ymdStr;
};

/**
 * 时间戳转年月
 * @param nS
 * @returns {string}
 */
WebServiceUtil.formatYM = function (nS) {
    var da = new Date(parseInt(nS));
    var year = da.getFullYear();
    var month = da.getMonth() + 1;
    var ymdStr = [year, month].join('-');
    return ymdStr;
};

/**
 * 时间戳转时分
 * @param nS
 * @returns {string}
 */
WebServiceUtil.formatHM = function (nS) {
    var da = new Date(parseInt(nS));
    var hour = da.getHours() + ":";
    var minutes = da.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var hmStr = hour + minutes;
    return hmStr;
};

