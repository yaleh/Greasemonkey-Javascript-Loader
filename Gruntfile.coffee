module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    coffee:
      compile:
        files:
          'greasemonkey/lrfz_video_search.js': 'greasemonkey/lrfz_video_search.coffee'
    uglify:
      build:
        src: "greasemonkey/lrfz_video_search.js"
        dest: "greasemonkey/lrfz_video_search.min.js"

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks "grunt-contrib-uglify"
  
  grunt.registerTask 'default', ['coffee', 'uglify']