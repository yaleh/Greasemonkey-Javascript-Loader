module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    coffee:
      compile:
        files:
          'gmjsloader.js': 'gmjsloader.coffee'
          'greasemonkey/lrfz_video_search.js': 'greasemonkey/lrfz_video_search.coffee'
    uglify:
      my_target:
        files:
          "greasemonkey/lrfz_video_search.min.js": ["greasemonkey/lrfz_video_search.js"]
          "gmjsloader.min.js": ["gmjsloader.js"]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks "grunt-contrib-uglify"
  
  grunt.registerTask 'default', ['coffee', 'uglify']