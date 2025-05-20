import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

const sass = gulpSass(dartSass);

export function styles() {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss()) // Processa Tailwind e Autoprefixer
    .pipe(gulp.dest('./dist/css'));
}

export function images() {
  return gulp
    .src('./src/images/**/*.{jpg,jpeg,png,svg}')
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
        imageminSvgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest('./dist/images'))
    .on('end', () => console.log('Imagens processadas!'));
}

export function watchFiles() {
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/images/**/*.{jpg,jpeg,png,svg}', images);
}

export default gulp.parallel(styles, images, watchFiles);
