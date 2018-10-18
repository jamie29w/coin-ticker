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
      files: ["*.scss", "index.html"],
      tasks: ["sass"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["watch"]);
};
