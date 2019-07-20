var gulp = require("gulp");

var  htmlClean = require("gulp-htmlclean");
var  imageMin = require("gulp-imagemin");
var ugligy = require("gulp-uglify");
var debug = require("gulp-strip-debug");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var  connect = require("gulp-connect");





var folder = {
    src:"src/",
    dist:"dist/"
}

var devMod = process.env.NODE_ENV =="development";
console.log(devMod)




gulp.task("html",function(){
  return  gulp.src(folder.src + "html/*")   
              .pipe(connect.reload())
            
              .pipe(htmlClean())
          
             .pipe(gulp.dest(folder.dist + "html/")) 
       
})
gulp.task("image", function () {
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})
gulp.task("css", function () {
    return gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        
        
        .pipe(cleanCss())

        .pipe(gulp.dest(folder.dist + "css/"))

})
gulp.task("js", function () {
    return gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        
        .pipe(debug())
        .pipe(ugligy())

        .pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",gulp.parallel('html'))
    gulp.watch(folder.src + "css/*",gulp.parallel('css'))
    gulp.watch(folder.src + "js/*",gulp.parallel('js'))
})
gulp.task("server",function(){
    connect.server({
        port:"8888",
        livereload:true
    })
})
// gulp.task("default",gulp.series('html')); 
gulp.task('default',gulp.parallel('html','css', 'js','image','watch','server'))

  

// gulp.task('default', function() {
//   // 将你的默认的任务代码放在这
// });