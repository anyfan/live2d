var Paul_Pio = function (prop) {

    let cfg = {}
    var that = this
    // 写入结构组件
    document.body.insertAdjacentHTML("beforeend", `
    <div class="pio-container right" id="pio-container">
        <div class="pio-action"></div>
        <canvas id="pio"></canvas>
    </div>`)


    var current = {
        idol: 0,
        menu: document.querySelector(".pio-container .pio-action"),
        canvas: document.getElementById("pio"),
        body: document.querySelector(".pio-container"),
        root: document.location.protocol + '//' + document.location.hostname + '/'
    };

    const app = new PIXI.Application({
        view: current.canvas,
        autoStart: true,
        transparent: true
    });

    /* - 方法 */
    var modules = {
        // 更换模型
        idol: function () {
            current.idol < (cfg.model.length - 1) ? current.idol++ : current.idol = 0;
            return current.idol;
        },
        create: function (tag, tag_class) {
            var e = document.createElement(tag);
            if (tag_class.class) e.className = tag_class.class;
            return e;
        },
        // 随机内容
        rand: function (arr) {
            return arr[Math.floor(Math.random() * arr.length + 1) - 1];
        },
        // 创建对话框方法
        render: function (text, TextDelay, TextDuration) {
            if (text.constructor === Array) {
                dialog.innerHTML = modules.rand(text);
            } else if (text.constructor === String) {
                dialog.innerHTML = text;
            } else {
                dialog.innerHTML = "输入内容出现问题了 X_X";
            }

            if (TextDelay || TextDuration) {
                clearTimeout(this.Delay);
                clearTimeout(this.Duration);
            } else {
                TextDelay = 0;
                TextDuration = 3000;
                clearTimeout(this.Delay);
                clearTimeout(this.Duration);
            }
            this.Delay = setTimeout(function () {
                dialog.classList.add("active");
            }, TextDelay);
            this.Duration = setTimeout(function () {
                dialog.classList.remove("active");
            }, TextDelay + TextDuration);

        },
        // 移除方法
        destroy: function () {
            current.body.classList.add("hidden");
            dialog.classList.remove("active");
            localStorage.setItem("posterGirl", 0);
        },
        // 是否为移动设备
        isMobile: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios");

            return window.innerWidth < 500 || ua !== -1;
        }
    };
    var elements = {
        home: modules.create("span", {
            class: "pio-home"
        }),
        skin: modules.create("span", {
            class: "pio-skin"
        }),
        info: modules.create("span", {
            class: "pio-info"
        }),
        night: modules.create("span", {
            class: "pio-night"
        }),
        close: modules.create("span", {
            class: "pio-close"
        }),

        dialog: modules.create("div", {
            class: "pio-dialog"
        }),
        show: modules.create("div", {
            class: "pio-show"
        })
    };

    var dialog = elements.dialog;



    /* - 提示操作 */
    var action = {
        // 欢迎
        welcome: function () {
            var hourcheck = function () {
                var text, hour = new Date().getHours();
                if (hour > 22 || hour <= 5) {
                    text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
                } else if (hour > 5 && hour <= 8) {
                    text = '早上好！';
                } else if (hour > 8 && hour <= 11) {
                    text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
                } else if (hour > 11 && hour <= 14) {
                    text = '中午了，工作了一个上午，现在是午餐时间！';
                } else if (hour > 14 && hour <= 17) {
                    text = '午后很容易犯困呢，今天的运动目标完成了吗？';
                } else if (hour > 17 && hour <= 19) {
                    text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
                } else if (hour > 19 && hour <= 21) {
                    text = '晚上好，今天过得怎么样？';
                } else if (hour > 21 && hour <= 23) {
                    text = '已经这么晚了呀，早点休息吧，晚安~';
                } else {
                    text = "嗨~ 快来逗我玩吧！";
                }
                modules.render(text, 0, 5000);
            }
            if (document.referrer !== "" && document.referrer.indexOf(current.root) === -1) {
                var referrer = document.createElement('a');
                referrer.href = document.referrer;
                modules.render("欢迎来自 “" + referrer.hostname + "” 的朋友！");
            } else if ("seasons" in cfg) {
                let i = 0;
                cfg.seasons.forEach(({
                    date,
                    text
                }) => {
                    const now = new Date(),
                        after = date.split("-")[0],
                        before = date.split("-")[1] || after;
                    if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
                        // text = modules.rand(text);
                        text = text.replace("{year}", now.getFullYear());
                        modules.render(text, 0, 5000);
                    } else {
                        i++;
                    }
                    if (i == cfg.seasons.length) {
                        hourcheck()
                    }
                });
            } else {
                hourcheck()
            }
        },
        // 右侧按钮
        buttons: function () {
            // 返回首页
            elements.home.onclick = function () {
                location.href = current.root;
            };
            current.menu.appendChild(elements.home);

            // 更换模型
            elements.skin.onclick = function () {
                loadlive2d(cfg.model[modules.idol()]);
            };
            if (cfg.model.length > 1) current.menu.appendChild(elements.skin);

            // 关于我
            elements.info.onclick = function () {
                window.open("https://github.com/anyfan/live2d");
            };
            current.menu.appendChild(elements.info);

            // // 夜间模式
            // if (prop.night) {
            //     elements.night.onclick = function () {
            //         eval(prop.night);
            //     };
            //     elements.night.onmouseover = function () {
            //         modules.render("夜间点击这里可以保护眼睛呢");
            //     };
            //     current.menu.appendChild(elements.night);
            // }

            // 关闭看板娘
            elements.close.onclick = function () {
                modules.destroy();
            };
            current.menu.appendChild(elements.close);


            // 开启看板娘
            elements.show.onclick = function () {
                current.body.classList.remove("hidden");
                localStorage.setItem("posterGirl", 1);
                init();
            }
            current.body.appendChild(elements.show);

            //文字面板
            current.body.appendChild(dialog);
        },
        // 提示功能
        custom: function () {
            cfg.mouseover.forEach(function (t) {
                if (!t.type) t.type = "default";
                var e = document.querySelectorAll(t.selector);

                if (e.length) {
                    for (var j = 0; j < e.length; j++) {
                        if (t.type === "read") {
                            e[j].onmouseover = function () {
                                modules.render("想阅读 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        } else if (t.type === "link") {
                            e[j].onmouseover = function () {
                                modules.render("想了解一下 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        } else if (t.text) {
                            e[j].onmouseover = function () {
                                modules.render(t.text);
                            }
                        }
                    }
                }
            });
        }
    };


    async function loadlive2d(Modelurl) {
        const live2d = PIXI.live2d;
        const model = await live2d.Live2DModel.from(Modelurl);
        const internalModel = model.internalModel;
        const motionManager = internalModel.motionManager;
        const settings = internalModel.settings;
        let motion_flag = false; //是否正在动作标识
        let canvas = current.canvas;
        // Try to remove previous model, if any exists.
        try {
            app.stage.removeChildAt(0)
        } catch (error) {

        }
        app.stage.addChild(model)
        // fit the window

        model.scale.set(canvas.height / model.height);
        canvas.width = model.width;
        canvas.height = model.height;


        // 如果模型被点击
        model.on("hit", hitAreas => {
            let hitA
            //覆盖多个点击区域下，找出权重最大的
            hitAreas.forEach(t => {
                settings.hitAreas.forEach(Areas => {
                    if (Areas.Name == t) {
                        if (hitA == null) {
                            hitA = Areas;
                        }
                        let num1 = 0,
                            num2 = 0;
                        if ("Order" in Areas) {
                            num1 = Areas.Order
                        }
                        if ("Order" in hitA) {
                            num2 = hitA.Order
                        }
                        if (num1 >= num2) {
                            hitA = Areas;
                        }
                    }
                });

            })
            // 如果模型正在运动，不执行
            if (!motion_flag) {
                var motion = hitA.Motion;
                var t = Math.floor(Math.random() * settings.motions[motion].length);
                var action = settings.motions[motion][t];
                model.motion(motion, t);
                motion_flag = true;
                if (action.Text) {
                    modules.render(action.Text, action.TextDelay, action.TextDuration);
                }
                motionManager.once("motionFinish", (data) => {
                    motion_flag = false;
                })
            }


        });

        function addFrame(model) {
            const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE);
            foreground.width = model.internalModel.width;
            foreground.height = model.internalModel.height;
            foreground.alpha = 0.2;
            model.addChild(foreground);
        }

        function addHitAreaFrames(model) {
            const hitAreaFrames = new live2d.HitAreaFrames();
            model.addChild(hitAreaFrames);
        }

        // addFrame(model);
        // addHitAreaFrames(model);
        // console.log(model)
        // console.log(settings)
    };

    // 模型初始化
    function init(onlyText) {
        if (localStorage.getItem("posterGirl") == 0) {
            modules.destroy();
            // 开启看板娘的方法
            elements.show.onclick = function () {
                current.body.classList.remove("hidden");
                localStorage.setItem("posterGirl", 1);
                init();
            }
            current.body.appendChild(elements.show);
        } else {
            fetch(prop)
                .then(response => response.json())
                .then(result => {
                    cfg = result;
                    if (!onlyText) {
                        loadlive2d(cfg.model[0]);
                    }
                    localStorage.setItem("posterGirl", 1);
                    action.welcome();
                    action.buttons();
                    action.custom();
                    that.action = action;

                });
        }

    };

    init();

}