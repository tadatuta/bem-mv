#!/usr/bin/env node

var path = require('path'),
    naming = require('bem-naming')(),
    walk = require('bem-walk'),
    glob = require('glob'),
    args = process.argv,
    entity = naming.parse(args[2]),
    cliLevels = args[3] && args[3].split(',') || ['*.blocks', '**/*.blocks'],
    levels = [];

cliLevels.forEach(function(level) {
    levels = levels.concat(glob.sync(level));
});

walk(levels).on('data', function(currentEntity) {
    if (entity.block !== currentEntity.block) return;
    if ((!entity.elem && !entity.modName) ||
        (entity.elem && entity.elem === currentEntity.elem &&
            !currentEntity.modName) ||
        (!entity.elem && entity.modName === currentEntity.modName &&
            entity.modVal === currentEntity.modVal) ||
        (entity.elem === currentEntity.elem &&
            entity.modName === currentEntity.modName &&
            entity.modVal === currentEntity.modVal)) {
                console.log(currentEntity.path);
    }
});
