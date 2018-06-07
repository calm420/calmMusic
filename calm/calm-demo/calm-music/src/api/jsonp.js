import originJsonp from "jsonp";

let jsonp = (url,data,option)=>{
    return new Promise((resolve,reject)=>{
        // jsonp插件中暴露的方法
        originJsonp(buildUrl(url,data),option,(err,data)=>{
            if(!err){
                resolve(data);
            }else {
                reject(data);
            }
        })
    });
}

function buildUrl(url,data) {
    var params = [];
    for (var k in data){
        params.push(`${k}=${data[k]}`);
    }
    let param = params.join("&");
    if(url.indexOf("?") === -1){
        url += "?" + param;
    }else {
        url += "&"+ param; 
    }
    return url;
}

export default jsonp;