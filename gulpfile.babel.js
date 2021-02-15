import gulp from "gulp"
import gpug from "gulp-pug";
import del from "del"
import ws from "gulp-webserver"
import img from "gulp-image"


const routes = {
    pug: {
        watch:"src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img : {
        src:"src/img/*",
        dest: "build/img"
    }
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const image = () => gulp.src(routes.img.src).pipe(img()).pipe(gulp.dest(routes.img.dest))

const watch = () => gulp.watch(routes.pug.watch, pug)

const webserver = () => gulp.src("build").pipe(ws({
    livereload: true,
    open: true
}))

const clean = () => del(["build"])

const prepare = gulp.series([clean])

const assets = gulp.series([pug, image]);

const live = gulp.series([webserver, watch])

export const dev = gulp.series([prepare, assets, live])