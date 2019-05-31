
var gulp = require("gulp");
// 先在终端设置一下当前环境变量 export NODE_ENV=development
var devMod = process.env.NODE_ENV == "development"; /* 判断当前环境变量 */
console.log(devMod)  // true or false
// 实时监听页面插件
var watch = require('gulp-watch');

// （less）--> （自动添加css3前缀） --> （压缩） --> （css文件)

// gulp中插件应用 下载插件 --> 取到插件 --> 应用插件

// 压缩html
var htmlClean = require("gulp-htmlclean");
// 压缩js
var uglify = require("gulp-uglify");
// 压缩图片
var imagemin = require("gulp-imagemin");
// 去掉js中调试语句
debug = require("gulp-strip-debug");
// 将less转换成css  压缩css 添加前缀gulp-postcss autoprofixer
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var postCss = require("gulp-postcss");
var autoprofixer = require("autoprefixer");
// 开启服务器
var connect = require("gulp-connect")

// 先将文件存在变量 方便以后修改了文件名后好维护
var folder = {
    src:"src/",
    dist:"dist/"
}
// 1. 创建一个html任务
// 2. 找到要打包的文件路径以及文件类型
// 3. 打包到哪个路径下
gulp.task("html", function() {
    var page = gulp.src(folder.src + "html/*")                  /* 1. 先把文件取出来 */
        .pipe(connect.reload()) /* 页面刷新 */
        // 是开发环境则不进行压缩
        if(!devMod) {
            page.pipe(htmlClean())                              /* 2. 变成文件流放在管道里处理(压缩html) */
        }
                                  
        page.pipe(gulp.dest(folder.dist + "html/"))             /* 3. 将处理完的文件输出*/
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+"images/"))
})

gulp.task("css", function() {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload()) /* 页面刷新 */
        .pipe(less())
        .pipe(postCss([autoprofixer()]))
        if(!devMod) {
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("js", function() {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload()) /* 页面刷新 */
        if(!devMod){
            page.pipe(debug())
            page.pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

// 创建 开启服务器任务
gulp.task("server", function() {
    connect.server({
        port:"8888",   /* 改变配置文件后需要在终端重新执行一下gulp */
        livereload:true
    })
})
// 开启自动监听任务
gulp.task("watch",function () {
    watch(folder.src + "html/*", gulp.series('html'))
    watch(folder.src + "images/*",gulp.series('images'))
    watch(folder.src + "css/*", gulp.series('css'))
    watch(folder.src + "js/*", gulp.series('js'))
})

// gulp4.0 利用gulp.parallel并行执行任务
gulp.task("default",gulp.parallel('html','css','js','images','server','watch') )


/* 
总结: webpack 与 gulp区别
gulp: 重于开发流程 runner Task
webpack: 将一切文件作为模块 module bundle
*/







