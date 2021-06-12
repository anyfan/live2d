// 封装异步加载资源的方法
function loadExternalResource(url, type, c) {
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
        c;
    });
}


// if (true) {
//     Promise.all([
//         loadExternalResource("/live2d/pio.css", "css"),
//         loadExternalResource("/live2d/live2dcubismcore.min.js", "js"),
//         loadExternalResource("/live2d/pixi.min.js", "js"),
//         loadExternalResource("/live2d/cubism4.min.js", "js"),
//         loadExternalResource("/live2d/poster_girl.js", "js"),
//     ]).then(() => {
//         // new Paul_Pio('/live2d/platelet-tips.json')
//     });
// }

loadExternalResource("/live2d/pio.css", "css").then(() => {
    loadExternalResource("/live2d/live2dcubismcore.min.js", "js").then(() => {
        loadExternalResource("/live2d/pixi.min.js", "js").then(() => {
            loadExternalResource("/live2d/cubism4.min.js", "js").then(() => {
                loadExternalResource("/live2d/poster_girl.js", "js").then(() => {
                    new Paul_Pio('/live2d/platelet-tips.json')
                });
            });
        });
    })
});



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