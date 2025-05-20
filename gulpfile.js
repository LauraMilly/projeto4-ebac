const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");

function styles() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
}

function images() {
  return gulp
    .src("./src/images/*")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./dist/images"));
}

function watchFiles() {
  gulp.watch("./src/styles/*.scss", styles);
  gulp.watch("./src/images/*", images);
}

exports.styles = styles;
exports.images = images;
exports.watch = watchFiles;
exports.default = gulp.parallel(styles, images, watchFiles);
