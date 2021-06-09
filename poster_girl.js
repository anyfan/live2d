var Paul_Pio = function (prop) {

    // 写入结构组件
    document.body.insertAdjacentHTML("beforeend", `
    <div class="pio-container left" id="pio-container">
        <div class="pio-action">
            <span class="pio-home"></span>
            <span class="pio-skin"></span>
            <span class="pio-info"></span>
            <span class="pio-night"></span>
            <span class="pio-close"></span>
        </div>
        <canvas id="pio" width="566" height="600" style="touch-action: none; cursor: inherit;"></canvas>
        <div class="pio-dialog">中午了，工作了一个上午，现在是午餐时间！</div>
        <div class="pio-show"></div>
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
            current.idol < (prop.model.length - 1) ? current.idol++ : current.idol = 0;
            return current.idol;
        },
        // 创建内容
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
        render: function (text) {
            if (text.constructor === Array) {
                dialog.innerHTML = modules.rand(text);
            } else if (text.constructor === String) {
                dialog.innerHTML = text;
            } else {
                dialog.innerHTML = "输入内容出现问题了 X_X";
            }

            dialog.classList.add("active");

            clearTimeout(this.t);
            this.t = setTimeout(function () {
                dialog.classList.remove("active");
            }, 3000);
        },
        // 移除方法
        destroy: function () {
            that.initHidden();
            localStorage.setItem("posterGirl", 0);
        },
        // 是否为移动设备
        isMobile: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios");

            return window.innerWidth < 500 || ua !== -1;
        }
    };



    async function loadlive2d(Modelurl) {
        const live2d = PIXI.live2d;
        const model = await live2d.Live2DModel.from(Modelurl);
        let canvas = current.canvas;
        app.stage.addChild(model)
        // fit the window
        model.scale.set(canvas.height / model.height);
        canvas.width = model.width;
        canvas.height = model.height;
        // handle tapping
        model.on("hit", hitAreas => {
            if (hitAreas.includes("face")) {
                model.motion("Tap_head");
            }

            if (hitAreas.includes("shirt_main")) {
                // model.expression();
                model.motion("Tap_body");
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
        addHitAreaFrames(model);
        return model

    };
    // 运行
    this.init = function (onlyText) {
        if (!modules.isMobile()) {
            if (!onlyText) {
                // action.welcome();
                loadlive2d(prop.model[0]);
            }
            // if (prop.content.custom) action.custom();
        }
    };

    console.log(modules.isMobile())

    this.init()
}