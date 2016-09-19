const gulp = require("gulp");
const gulpClean = require("gulp-clean");
const eslint = require("gulp-eslint");
const path = require("path");

const clean_directory = "build";
const bower_directory = "demo/bower_components";
const test_input_directory = "test";

const output_directory = "build";

const configuration = {
  clean: {
    directory: clean_directory
  },
  tests: {
    glob: [
      test_input_directory + "/**/*.*"
    ],
    outputDirectory: output_directory + "/test"
  },
  components: {
    glob: [
      "behaviors/**/*.*",
      "documentation/**/*.*",
      "navbar/**/*.*",
      "router/**/*.*",
      "sidebar/**/*.*",
      "utilities/**/*.*"
    ],
    outputDirectory: output_directory + "/bower_components/koppar-elements"
  },
  bower: {
    glob: [
      bower_directory + "/**/*.js",
      bower_directory + "/**/*.js.map",
      bower_directory + "/**/*.min.js",
      bower_directory + "/**/*.min.map",
      bower_directory + "/**/*.min.js.map",
      bower_directory + "/**/*.css",
      bower_directory + "/**/*.css.map",
      bower_directory + "/**/*.min.css",
      bower_directory + "/**/*.min.map",
      bower_directory + "/**/*.min.css.map",
      bower_directory + "/**/*.html",
    ],
    outputDirectory: output_directory + "/bower_components"
  }
}

gulp.task("clean", function(){
  return gulp.src(clean_directory, {read: false})
  .pipe(gulpClean({ force: true }));
});

gulp.task("bower", ["clean"], function(){
  return gulp.src(configuration.bower.glob)
    .pipe(gulp.dest(configuration.bower.outputDirectory));
});

gulp.task("tests", ["clean"], function(){
  return gulp.src(configuration.tests.glob)
    .pipe(gulp.dest(configuration.tests.outputDirectory));
});

gulp.task("components", ["clean"], function(){
  return gulp.src(configuration.components.glob)
    .pipe(gulp.dest(function(file){
      return path.join(configuration.components.outputDirectory, path.relative(path.resolve("./"), path.dirname(file.path)));
    }));
  //configuration.components.outputDirectory));
});

gulp.task("default", ["bower", "tests", "components"], function(){

});

gulp.task("lint", function() {
  return gulp.src(configuration.components.glob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});