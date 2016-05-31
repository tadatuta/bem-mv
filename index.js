#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    walk = require('bem-walk'),
    naming = require('bem-naming')(),
    mkdirp = require('mkdirp'),
    glob = require('glob'),
    rm = require('rimraf').sync,
    techs = require('./techs'),
    args = process.argv,
    binName = args[1].split('/').pop(),
    from = args[2],
    to = args[3],
    cliLevels = args[4] && args[4].split(',') || ['*.blocks'],
    levels = [];

// console.log('from', from, 'to', to);

if (args.length < 4) {
    console.log('USAGE: ' + binName + ' `from` `to` `levels` (*.blocks by default)');
    console.log('Examples:');
    console.log(binName + ' b1 b2');
    console.log(binName + ' b1 b2 common.blocks,desktop.blocks');
    console.log(binName + ' \'*\' \'b-*\' \'libs/**/*.blocks\'');
}

cliLevels.forEach(function(level) {
    levels = levels.concat(glob.sync(level));
});

walk(levels).on('data', function(item) {
    // console.log('en', entity);
    item.entity.block === from && replace(item, from, to);
    from === '*' && replace(item, item.entity.block, to.replace('*', item.entity.block));
});

function replace(item, from, to) {
    // TODO: check if `to` exists
    mkdirp.sync(path.join(item.level, to));

    item.entity.elem && mkdirp.sync(path.join(item.level, to, naming._elemDelimiter + item.entity.elem));
    item.entity.modName && mkdirp.sync(path.join(item.level, to, naming._modDelimiter + item.entity.modName));

    if(fs.lstatSync(item.path).isDirectory()) {
        // TODO
        return;
    }

    var regExp = new RegExp(from, 'g'),
        content = replaceContent(fs.readFileSync(item.path, 'utf8'), from, to, item.tech);

    fs.writeFileSync(item.path.replace(regExp, to), content);
    binName === 'bemmv' && rm(item.path);
}

function replaceContent(content, from, to, tech) {
    if (techs[tech]) return techs[tech](content, from, to);

    var regExp = new RegExp(from, 'g');
    return content.replace(regExp, to);
}
