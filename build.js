'use strict';

var fs = require('fs');
var cp = require('child_process');
var path = require('path');
var browserify = require('browserify');
var shim = require('browserify-shim');

    var b = shim(browserify({
    }), {
      jquery: {
        path: './bower_components/jquery/jquery',
        exports: '$'
      },
      handlebars: {
        path: './bower_components/handlebars/handlebars',
        exports: 'Handlebars'
      },
      ember: {
        path: 'src/lib/ember',
        exports: 'Ember',
        depends: {
          handlebars: 'Handlebars',
          jquery: '$'
        }
      },
     'ember-validations': {
       path: 'src/lib/ember-validations',
       exports: 'Ember.Validations',
       depends: {
         ember: 'Ember'
       }
     },
     'bufferedproxy': {
       path: 'src/lib/buffered_proxy',
       exports: 'BufferedProxy',
        depends: {
          ember: 'Ember'
        }
     },
    })
    .require(require.resolve('./src/main.js'), {entry: true});

    b.bundle({debug: true}, postBundle);

    function postBundle(err, src){
      if(err) {
        console.log(err);
      }
      fs.writeFileSync('out.js', src);
      cp.exec('open index.html');
    }

