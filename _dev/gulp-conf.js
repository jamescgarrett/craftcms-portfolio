'use strict';

import util from 'gulp-util';

export default {
    production: !!util.env.production,
    proxyHost: 'jamescgarrett.craft.dev',
    jsEntry: 'src/js/scripts.js',
    jsAll: ['src/js/**/*.js'],
    jsBundle: 'scripts.js',
    cssEntry: 'src/css/style.css',
    cssAll: 'src/css/**/*.css',
    jsDist: '../dist/src/js',
    cssDist: '../dist/src/css'
};