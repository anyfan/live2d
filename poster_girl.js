Modelurl = [
    "live2d/model/xxb/kesshouban_v1.1.model3.json",
    "live2d/model/Diana/Diana.model3.json"
];

const live2d = PIXI.live2d;

async function loadlive2d(Modelurl) {
    const canvas = document.getElementById("canvas")

    const app = new PIXI.Application({
        view: canvas,
        autoStart: true,
        transparent: true
    });

    const model = await live2d.Live2DModel.from(Modelurl);

    app.stage.addChild(model)

    // fit the window
    model.scale.set(canvas.height / model.height);
    canvas.width = model.width;
    canvas.height = model.height;


    // addFrame(model);
    addHitAreaFrames(model);


    // handle tapping
    model.on("hit", hitAreas => {
        if (hitAreas.includes("face")) {
            model.motion("Tap_head");
        }

        if (hitAreas.includes("head")) {
            model.expression();
        }
    });

};


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

loadlive2d(Modelurl[0])