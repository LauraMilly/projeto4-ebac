import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

const sass = gulpSass(dartSass);

export function tailwindStyles() {
  return gulp
    .src('./src/styles/tailwind.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([tailwindcss(), autoprefixer()]))
    .pipe(gulp.dest('./dist/css'))
    .on('end', () => console.log('Tailwind Styles gerados'));
}


export function customStyles() {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
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
  gulp.watch('./src/styles/tailwind.scss', tailwindStyles);
  gulp.watch('./src/styles/**/*.scss', customStyles);
  gulp.watch('./src/images/**/*.{jpg,jpeg,png,svg}', images);
}

export default gulp.parallel(tailwindStyles, customStyles, images, watchFiles);
