const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const dateformat = require('dateformat')
const del = require('del')
const fs = require('fs')
const ENV = {}

const loadEnv = function(done){
	ENV.Data = fs.readFileSync('./data.json')
	ENV.cachebuster = dateformat(new Date(), 'yymmddHHMMssl')
	done()
}
const insertEnv = function(stream){
	return replace(/\$([a-zA-Z0-9_-]+)\$/g, (nil, varname)=>{
		return ENV[varname]
	})
}

gulp.task('clean', ()=>{
	return del(['./dist'])
})

gulp.task('build-src', ()=>{
	return gulp.src([
		'./lib/*.js',
		'!./lib/*.spec.js',
		'./src/*.js',
		'!./src/*.views.js',
		'!./src/*.spec.js'
	])
	.pipe(insertEnv())
	.pipe(concat(`src-${ENV.cachebuster}.js`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-views', ()=>{
	return gulp.src([
		'./src/*.views.js'
	])
	.pipe(insertEnv())
	.pipe(concat(`views-${ENV.cachebuster}.js`))
	.pipe(gulp.dest('./dist'))
})


gulp.task('build-tests', ()=>{
	return gulp.src([
		'./lib/*.spec.js',
		'./src/*.spec.js'
	])
	.pipe(concat('tests.js'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-modules', ()=>{
	return gulp.src([
		'./node_modules/mithril/mithril.min.js',
		'./node_modules/mithril/ospec/ospec.js'
	])
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-css', ()=>{
	return gulp.src([
		'./web/styles.scss'
	])
	.pipe(sass({
		outputStyle: 'expanded',
		sourceMap: 'non'
	}))
	.pipe(insertEnv())
	.pipe(concat(`styles-${ENV.cachebuster}.css`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-html', ()=>{
	return gulp.src([
		'./web/*.html'
	])
	.pipe(insertEnv())
	.pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.series([
	'clean',
	loadEnv,
	'build-modules',
	'build-src',
	'build-views',
	'build-tests',
	'build-css',
	'build-html'
]))

gulp.task('watch', ()=>{
	gulp.watch([
		'./*.json',
		'./lib/*',
		'./src/*',
		'./web/*'
	], {ignoreInitial: false}, gulp.task('build'))
})
