#!/usr/bin/env node

var path = require('path'),
    walk = require('bem-walk'),
    glob = require('glob'),
    args = process.argv,
    cliLevels = args[2] && args[2].split(',') || ['*.blocks', '**/*.blocks'],
    levels = [];

cliLevels.forEach(function(level) {
    levels = levels.concat(glob.sync(level));
});

walk(levels).on('data', function(entity) {
    console.log(entity.path);
});
