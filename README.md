# night(未完待续)
## 我所浅显使用vue的一些基础配置

## 先下载node.js,用此来进行配置
## 使用cnpm可以使其速度下载速度变快
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install vue
cnpm install vue-cli -g//这里是装的脚手架便于配置
```
## 此处用的webpack来新建项目操作
```
vue init webpack project或vue init webpack 
//project者为创建文件夹，init为当前文件夹下
```

## 用的elementui的前端控件（其配置如下）
```
npm i element-ui -S
//下完后在main.js里面配置
import ElementUi from 'elemet-ui'
import '@/theme-et/index.css'
Vue.use(ElementUi)
```
## 使用了vue-resource的http接口
```
npm install --save vue-resource
//下完后在main.js里面全局配置
import Resource from 'vue-resource'
Vue.use(Resource)
```

## 百度富文本框的使用(此处已下载在static文件夹中)
npm i vue-ueditor-wrap//安装需要文件
```
首先在main.js中注册
import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
然后在模板页面中使用
import VueUeditorWrap from 'vue-ueditor-wrap';
然后再export defalut里
components: { VueUeditorWrap }注册
对应的return代码
 myConfig: {
                // serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: '../../static/UEditor/', // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 340, // 初始容器高度
                initialFrameWidth: '100%', // 初始容器高度
                enableAutoSave: true // 关闭自动保存
            },
 对应的前端代码这里尤其需要注意UEDITOR_HOME_URL与UEditor的位置相对应
 <vue-ueditor-wrap v-model="addsForm.introduction" :config="myConfig"></vue-ueditor-wrap>直接使用组件注册

```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


//scoped当使用<style scoped>时代表此处的样式只对应此处的效果，去别处依然无用
//
