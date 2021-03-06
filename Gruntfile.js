/*
 * grunt-rt-wp-deploy
 * https://github.com/remcotolsma/grunt-rt-wp-deploy
 *
 * Copyright (c) 2014 Remco Tolsma
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON( 'package.json' ),

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      deploy: {
        src: ['deploy']
      },
      tests: ['tmp']
    },

    // Copy
	copy: {
      deploy: {
        src: [
          '**',
          '!.*',
          '!.*/**',
          '!node_modules/**',
		],
        dest: 'deploy',
        expand: true,
        dot: true
      },
    },

    // Configuration to be run (and then tested).
    rt_wp_deploy: {
      app: {
        options: {
          svnUrl: 'https://grunt-rt-wp-deploy.googlecode.com/svn/',
          svnDir: 'svn',
          svnUsername: 'info@remcotolsma.nl',
          deployDir: 'deploy',
          version: '<%= pkg.version %>',
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: []
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rt_wp_deploy', 'nodeunit']);

  // By default, lint and run all tests.
  //grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('deploy', ['clean:deploy','copy:deploy']);
  grunt.registerTask('default', ['deploy','rt_wp_deploy']);

};
