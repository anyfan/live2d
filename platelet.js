function l2d(json_object_or_url) {
    PIXI.live2d.Live2DModel.fromSync(json_object_or_url)
}


function load_xxb() {
    // 加载血小板时清除一些参数
    localStorage.removeItem("platelet-display");
    sessionStorage.removeItem("platelet-text");

    // 写入血小板结构组件
    document.body.insertAdjacentHTML("beforeend", `  
        <div id="platelet">
        <div id="platelet-tips"></div>
        <div class ='live2d' >
        <canvas id="live2d" width="650" height="600"></canvas>
        </div>
        <div class="platelet-tool">
        <a href="https://www.anyfan.top/" style='text-decoration:none;'><i class="fa fa-home home"></i></a>
        <i class="fa fa-comment comment" style="animation-delay: 0.5s;"></i>
        <i class="fa fa-street-view" style="animation-delay: 1s;"></i>
        <a href="https://www.anyfan.top/archives/106/" style='text-decoration:none;'><i class="fa fa-info info" style="animation-delay: 1.5s;"></i></a>
        <i class="fa fa-times xxbclose" style="animation-delay: 2s;"></i>
        </div>
    </div>`);

    // 血小板出现动画
    setTimeout(() => {
        document.getElementById("platelet").style.bottom = 0;
    }, 0);


    // 血小板关闭
    document.querySelector(".platelet-tool .xxbclose").addEventListener("click", () => {
        localStorage.setItem("platelet-display", Date.now());
        showMessage("愿你有一天能与重要的人重逢。", 2000, 9);
        document.getElementById("platelet").style.bottom = "-500px";
        setTimeout(() => {
            document.getElementById("platelet").style.display = "none";
            document.getElementById("platelet-toggle").classList.add("platelet-toggle-active");
        }, 3000);
    });

    // 检测控制台
    const devtools = () => {};
    console.log("%c", devtools);
    devtools.toString = () => {
        showMessage("哈哈，你打开了控制台，是想要看看我的小秘密吗？", 6000, 9);
    };

    // 检测复制
    window.addEventListener("copy", () => {
        showMessage("你都复制了些什么呀?", 6000, 9);
    });

    // 检测返回
    window.addEventListener("visibilitychange", () => {
        if (!document.hidden) showMessage("哇，你终于回来了～", 6000, 9);
    });

    // 换装
    document.querySelector(".platelet-tool .fa-street-view").addEventListener("click", loadRandModel);

    // 检测一言
    document.querySelector(".platelet-tool .fa-comment").addEventListener("click", showHitokoto);


    var platelet_tips_json_url = "https://api.anyfan.top/live2d/platelet-tips.json",
        model_all_url = "/xxb/model-all.json"



    // 返回随机一行的方法
    function randomSelection(obj) {
        return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
    }
    // 获取platelet_tips_json，并解析
    fetch(platelet_tips_json_url)
        .then(response => response.json())
        .then(result => {
            window.addEventListener("mouseover", event => {
                for (let {
                        selector,
                        text
                    } of result.mouseover) {
                    if (!event.target.matches(selector)) continue;
                    text = randomSelection(text);
                    text = text.replace("{text}", event.target.innerText);
                    showMessage(text, 4000, 8);
                    return;
                }
            });
            window.addEventListener("click", event => {
                for (let {
                        selector,
                        text
                    } of result.click) {
                    if (!event.target.matches(selector)) continue;
                    text = randomSelection(text);
                    text = text.replace("{text}", event.target.innerText);
                    showMessage(text, 4000, 8);
                    return;
                }
            });
            result.seasons.forEach(({
                date,
                text
            }) => {
                const now = new Date(),
                    after = date.split("-")[0],
                    before = date.split("-")[1] || after;
                if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
                    text = randomSelection(text);
                    text = text.replace("{year}", now.getFullYear());
                    showMessage(text, 7000, 8);
                }
            });
        });

    (function () {
        var text;
        // 来访信息
        // var referrer = document.createElement('a');
        // if (document.referrer !== '') {
        //     referrer.href = document.referrer;
        // }
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
        } else if (now > 5 && now <= 7) {
            text = '早上好！一日之计在于晨，美好的一天就要开始了';
        } else if (now > 7 && now <= 11) {
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        } else if (now > 11 && now <= 14) {
            text = '中午了，工作了一个上午，现在是午餐时间！';
        } else if (now > 14 && now <= 17) {
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
        } else if (now > 19 && now <= 21) {
            text = '晚上好，今天过得怎么样？';
        } else if (now > 21 && now <= 23) {
            text = '已经这么晚了呀，早点休息吧，晚安~';
        } else {
            text = '嗨~ 快来逗我玩吧！';
        }
        showMessage(text, 6000);
    })();

    window.hitokotoTimer = window.setInterval(showHitokoto, 30000);

    function showHitokoto() {
        fetch("https://api.anyfan.top/hitokoto/?cat=h&len=38")
            .then(response => response.text())
            .then(result => {
                showMessage(result, 6000, 9);
            });
    }

    // function showHitokoto() {
    //     fetch("https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=40&encode=json")
    //         .then(response => response.json())
    //         .then(result => {
    //             showMessage(result.hitokoto, 6000, 9);
    //         });
    // }



    // 显示文字核心
    var messageTimer;

    function showMessage(text, timeout, flag) {
        if (sessionStorage.getItem("platelet-flag") && sessionStorage.getItem("platelet-flag") > flag) return;
        if (flag || sessionStorage.getItem('platelet-text') === '' || sessionStorage.getItem('platelet-text') === null) {
            if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
            sessionStorage.setItem("platelet-flag", flag);
            sessionStorage.setItem('platelet-text', text);
            const tips = document.getElementById("platelet-tips");
            tips.innerHTML = text;
            tips.classList.add("platelet-tips-active");
            if (timeout === null) timeout = 5000;
            if (messageTimer) {
                clearTimeout(messageTimer);
                messageTimer = null;
            }
            messageTimer = setTimeout(() => {
                sessionStorage.removeItem('platelet-text');
                sessionStorage.removeItem('platelet-flag');
                tips.classList.remove("platelet-tips-active");
            }, timeout);
        }
    }

    // 初始化模型
    (function initModel() {
        let modelId = localStorage.getItem("modelId"),
            modelTexturesId = localStorage.getItem("modelTexturesId");
        if (modelId === null) {
            // 首次访问加载 指定模型 的 指定材质
            modelId = 'kesshouban_v2'; // 模型 ID
            modelTexturesId = 'kesshouban_v1.1.model3.json'; // 材质 ID
        }
        loadModel(modelId, modelTexturesId);
    })();

    // 加载模型
    async function loadModel(modelId, modelTexturesId, message) {
        localStorage.setItem("modelId", modelId);
        localStorage.setItem("modelTexturesId", modelTexturesId);
        if (message != '' && message != null) {
            showMessage(message, 4000, 10);
        }
        var model_url = xxb_url + modelId + '/' + modelTexturesId
        l2d(model_url);
    }

    // 更换模型贴图
    async function loadRandModel() {
        showMessage("巴拉拉能量", 2000, 10);
        const modelId = localStorage.getItem("modelId"),
            modelTexturesId = localStorage.getItem("modelTexturesId");
        fetch(model_all_url)
            .then(response => response.json())
            .then(result => {
                let Textures = result[modelId],
                    a = Textures.length,
                    b = Textures.indexOf(String(modelTexturesId))
                if (b + 1 >= a) {
                    b = 0;
                } else b++;
                setTimeout(() => {
                    loadModel(modelId, Textures[b], "变身！！！");
                }, 2000);

            });

    }

}



function xxb_init(tips_json_url) {
    document.body.insertAdjacentHTML("beforeend", `<div id="platelet-toggle"><span>看板娘</span></div>`);
    const toggle = document.getElementById("platelet-toggle");
    toggle.addEventListener("click", () => {
        toggle.classList.remove("platelet-toggle-active");
        if (toggle.getAttribute("first-time")) {
            load_xxb();
            toggle.removeAttribute("first-time");
        } else {
            localStorage.removeItem("platelet-display");
            document.getElementById("platelet").style.display = "";
            setTimeout(() => {
                document.getElementById("platelet").style.bottom = 0;
            }, 0);
        }
    });

    if (localStorage.getItem("platelet-display") && Date.now() - localStorage.getItem("platelet-display") <= 86400000) {
        toggle.setAttribute("first-time", true);
        setTimeout(() => {
            toggle.classList.add("platelet-toggle-active");
        }, 0);
    } else {
        load_xxb();
    }
}