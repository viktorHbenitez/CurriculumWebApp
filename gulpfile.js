////////////////////////////////
//////	Required
///////////////////////////////
var gulp = require('gulp');
var uglify = require('gulp-uglify');  // Comprimir archivs javaScript
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync  = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var merge = require('merge-stream');

//Minificar html
var htmlmin = require('gulp-htmlmin');

//Paquetes necesarios para minificar CSS
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');  //Cambiar el nombre .min Ejemplo bootstrap

/*
 var gulIf = require('gulp-if');
 var useRef = require('gulp-useref');
 var uglifyCss = require('gulp-uglifycss');
 */
////////////////////////////////
//////	Scripts Task
//////	INPUT (SRC) -> PIPE (FUNCTION)-> PIPE (FUNCTION)-> PIPE (FUNCTION)-> OUTPUT (DEST)
///////////////////////////////
gulp.task('scripts',function() {

    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js']) // toma las capteas hijas de js que contengan archivos *.js
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/js')) //destino del archivo minificado
        .pipe(reload({stream:true}));
});

// Agregar todos los archivos que se deseen concatenar
var fuentesJS = [
    'js/funciones.js',
    'js/scripts.js'
];

gulp.task('js', function () {
    gulp.src(fuentesJS)
        .pipe(concat('scripts.js'))  // Como se llamara el archivo final
        .pipe(browserify()) // Usado para manejar dependencias como boostrap, mustache etc.
        // .pipe(uglify())  //Comprime los archivos javascripts
        .pipe(gulp.dest('app/js')) // Destino del archivo concatenado
        .pipe(reload({stream:true})); //Recarga el archivo Destino
});

////////////////////////////////
//////	MINIFICAR ARCHIVOS ARCHIVOS
//////	INPUT (SRC) -> PIPE (FUNCTION)-> PIPE (FUNCTION)-> PIPE (FUNCTION)-> OUTPUT (DEST)
///////////////////////////////
gulp.task('jsMinificacion', function () {
    gulp.src(fuentesJS)
        .pipe(concat('scripts.js'))  // Como se llamara el archivo final
        .pipe(browserify()) // Usado para manejar dependencias como boostrap, mustache etc.
        .pipe(uglify())  //Comprime los archivos javascripts
        .pipe(gulp.dest('app/js')) // Destino del archivo concatenado
        .pipe(reload({stream:true})); //Recarga el archivo Destino
});



gulp.task('sassMinificacion', function() {
    var archivosSASS,  // Tendra la direccion origen de los archivos SASS
        archivosCSS;    // Tendra la direccion origen de los archivos SCSS

    archivosSASS = gulp.src('scss/app.scss')
        .pipe(plumber())  // Muestra los errores en SASS de forma legible
        .pipe(autoprefixer('last 2 version')) // Agrega prefijos a los estilos necesario
        .pipe(sass({
            includePaths: ['scss']
        }));

    // './' se encuentra en el mismo nivel el archivo node_module
    archivosCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');

    return merge(archivosSASS, archivosCSS)
        .pipe(concat('app.css'))
        .pipe(cssmin())     //minificar archivo concatenado
        .pipe(rename({suffix: '.min'}))  //Renombrarlo como nombrearchivo.min.css
        .pipe(gulp.dest('app/css/'))  // Destino de la concatenacion
        .pipe(reload({stream:true}));


});

//Tarea de minificacion de archivos html
gulp.task('minifyHTML', function () {
    return gulp.src('./*.html')
        .pipe(htmlmin({collapseWhitespace:true }))  //collapseWhitespace : elimina los espacios en blanco
        .pipe(gulp.dest('app'))  //Archivo destino de los archivos comprimidos
});




////////////////////////////////
//////	Sass Task
//////	INPUT (SRC) -> PIPE (FUNCTION)-> PIPE (FUNCTION)-> PIPE (FUNCTION)-> OUTPUT (DEST)
///////////////////////////////
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    var archivosSASS,  // Tendra la direccion origen de los archivos SASS
        archivosCSS;    // Tendra la direccion origen de los archivos SCSS

    archivosSASS = gulp.src('scss/app.scss')
        .pipe(plumber())  // Muestra los errores en SASS de forma legible
        .pipe(autoprefixer('last 2 version')) // Agrega prefijos a los estilos necesario
        .pipe(sass({
            includePaths: ['scss']
        }));

    // './' se encuentra en el mismo nivel el archivo node_module
    archivosCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');

    return merge(archivosSASS, archivosCSS)
        .pipe(concat('app.css'))
        .pipe(cssmin())     //minificar archivo concatenado
        .pipe(rename({suffix: '.min'}))  //Renombrarlo como nombrearchivo.min.css
        .pipe(gulp.dest('app/css/'))  // Destino de la concatenacion
        .pipe(reload({stream:true}));


    // gulp.src('scss/app.scss')
    // 	.pipe(plumber())   //marcar errores de manera legible
    //   .pipe(sass({
    //     includePaths: ['scss'] //compila  de sass a css indicamos el archivo origen sass
    //   }))
    //   .pipe(autoprefixer('last 2 versions'))
    //   .pipe(gulp.dest('./app/css'))  //lo guarda en el destino app/css
    //   .pipe(reload({stream:true}));
});


////////////////////////////////
//////	Copy Fonts
///////////////////////////////
gulp.task('moverFuentes', function () {
    gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('app/fonts'));
});


////////////////////////////////
//////	HTML Task
///////////////////////////////
gulp.task('html', function(){
    gulp.src('app/**/*.html')
        .pipe(reload({stream:true}));
});

////////////////////////////////
//////  Browser-Sync Task
///////////////////////////////
gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir: "app"
        }
    });
});


////////////////////////////////
//////  Watch Task
///////////////////////////////
gulp.task('watch', ['js','moverFuentes'], function(){
    //gulp.watch("js/**/*.js", ['scripts']);
    gulp.watch("js/**/*.js",['js']);  // gulp.watch([EscuchaCambios/archivos],[nombreTarea])
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("app/**/*.html", ['html']);

});

////////////////////////////////
//////	default Task
///////////////////////////////
//gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync','watch']);
gulp.task('default', ['sass', 'html', 'browser-sync','watch', 'js']);
