// var home_page = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + '/' + document.location.pathname + '/'
// 注意：live2d_path 参数应使用绝对路径
// console.log(home_page);
// const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";

var home_page = "//127.0.0.1:8080/"
// 封装异步加载资源的方法
function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
        let tag;

        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        } else if (type === "js") {
            tag = document.createElement("script");
            tag.src = url;
        }
        if (tag) {
            tag.onload = () => resolve(url);
            tag.onerror = () => reject(url);
            document.head.appendChild(tag);
        }
    });
}


const xxb_url = home_page + 'xxb/'


// 是否为移动设备
function isMobile() {
    var ua = window.navigator.userAgent.toLowerCase();
    ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios");

    return window.innerWidth < 500 || ua !== -1;
}

// if (screen.width >= 768) {
if (!isMobile()) {
    Promise.all([
        loadExternalResource(xxb_url + "platelet.css", "css"),
        loadExternalResource(xxb_url + "live2d.min.js", "js"),
        // loadExternalResource(xxb_url + "live2d-1.js", "js"),
        // loadExternalResource(xxb_url + "live2d.js", "js"),
        loadExternalResource(xxb_url + "platelet.js", "js")
    ]).then(() => {
        xxb_init()
        // initWidget({
        //     waifuPath: live2d_path + "waifu-tips.json",
        //     //apiPath: "https://live2d.fghrsh.net/api/",
        //     cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
        // });
    });
}





console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);
console.log(`
     █████╗ ███╗   ██╗██╗   ██╗███████╗ █████╗ ███╗   ██╗
    ██╔══██╗████╗  ██║╚██╗ ██╔╝██╔════╝██╔══██╗████╗  ██║
    ███████║██╔██╗ ██║ ╚████╔╝ █████╗  ███████║██╔██╗ ██║
    ██╔══██║██║╚██╗██║  ╚██╔╝  ██╔══╝  ██╔══██║██║╚██╗██║
    ██║  ██║██║ ╚████║   ██║   ██║     ██║  ██║██║ ╚████║
    ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝
`);