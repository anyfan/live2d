# live2d

这里给了一个在网页上加载 live2d 的示例。

## 说明

你需要在`html`里先引入这些`JavaScript`
```html
<!-- Copyrighted cubism SDK -->
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js"></script>
<!-- Load Pixi (dependency for cubism 2/4 integrated loader) -->
<script src="https://cdn.jsdelivr.net/npm/pixi.js@5.3.6/dist/pixi.min.js"></script>
<!-- Load cubism 2/4 integrated loader -->
<script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js"></script>
```
如果你只需要支持`moc3`,则只需引入如下
```html
<!-- Copyrighted cubism SDK -->
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<!-- Load Pixi (dependency for cubism 2/4 integrated loader) -->
<script src="https://cdn.jsdelivr.net/npm/pixi.js@5.3.6/dist/pixi.min.js"></script>
<!-- Load cubism 4 integrated loader -->
<script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.3.1/dist/cubism4.min.js"></script>
```
你可以参考`demo.html`。

> ### 代码修改自 [[journey-ad](https://nocilol.me/) 博客]。
> 你可以在[https://github.com/journey-ad/blog-img/tree/master/live2d/lib](https://github.com/journey-ad/blog-img/tree/master/live2d/lib)上找到相关源代码。

### 如果你需要完整的了解这是怎么运作的,您可以阅读以下内容

- https://github.com/jupiterbjy/Pio
- ~~https://github.com/Dreamer-Paul/Pio~~
- https://github.com/guansss/pixi-live2d-display/


### 部分模型来自

- [根瘤菌 rkzj](https://space.bilibili.com/23315579)
- [木果阿木果](https://space.bilibili.com/886695)