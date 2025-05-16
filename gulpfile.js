const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function styles() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
}

function watchFiles() {
  gulp.watch("./src/styles/*.scss", gulp.parallel(styles));
}

exports.styles = styles;
exports.watch = watchFiles;
exports.default = gulp.parallel(styles, watchFiles);
