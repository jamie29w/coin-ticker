module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      dist: {
        files: {
          "styles.css": "styles.scss"
        }
      }
    },
    reload: {
      port: 3200,
      proxy: {
        host: "localhost"
      }
    },
    watch: {
      // css: {
      files: ["*.scss", "index.html"],
      tasks: ["sass"]
      // }
    }
    // livereload: {
    //   // Here we watch the files the sass task will compile to
    //   // These files are sent to the live reload server after sass compiles to them
    //   options: { livereload: true },
    //   files: ["styles.css"]
    // }
  });
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["watch"]);
};
