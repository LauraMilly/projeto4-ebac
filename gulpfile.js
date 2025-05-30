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
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

export function scripts() {
  return gulp
    .src('./src/js/**/*.js') 
    .pipe(sourcemaps.init())
    .pipe(concat('main.js')) 
    .pipe(uglify())          
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .on('end', () => console.log('Scripts processados!'));
}

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
    .src([
      './src/styles/main.scss',
      './src/styles/theme-light.scss',
      './src/styles/theme-dark.scss',
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .on('end', () => console.log('Temas compilados!'));
}



export function images() {
  return gulp
    .src('./src/images/**/*.{jpg,jpeg,png,svg}')
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
        imageminSvgo({
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false, 
                },
              },
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest('./dist/images'))
    .on('end', () => console.log('Imagens processadas!'));
}

export const build = gulp.series(
  gulp.parallel(tailwindStyles, customStyles, images, scripts)
);


export function watchFiles() {
  gulp.watch('./src/styles/components/**/*.scss', customStyles);  
  gulp.watch('./src/styles/*.scss', customStyles);                
  gulp.watch('./src/styles/tailwind.scss', tailwindStyles);
  gulp.watch('./src/images/**/*.{jpg,jpeg,png,svg}', images);
  gulp.watch('./src/js/**/*.js', scripts);
}


export default gulp.parallel(tailwindStyles, customStyles, images, scripts, watchFiles);
