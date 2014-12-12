// TODO:
// поддержка уровней
// поддержка элементов
// поддержка модификаторов
// findBlockInside(prefix + 'button')
// поддержка технологий-папок

var fs = require('fs'),
    path = require('path'),
    walk = require('bem-walk'),
    naming = require('bem-naming')(),
    mkdirp = require('mkdirp'),
    glob = require('glob'),
    rm = require('rimraf').sync,
    techs = require('./techs'),
    args = process.argv,
    from = args[2],
    to = args[3],
    cliLevels = args[4] && args[4].split(',') || ['*.blocks'],
    levels = [];

// console.log('from', from, 'to', to);

cliLevels.forEach(function(level) {
    levels = levels.concat(glob.sync(level));
});

walk(levels).on('data', function(entity) {
    entity.block === from && replace(entity, from, to);
});

function replace(entity, from, to) {
    // TODO: check if `to` exists
    mkdirp.sync(path.join(entity.level, to));

    entity.elem && mkdirp.sync(path.join(entity.level, to, naming._elemDelimiter + entity.elem));
    entity.modName && mkdirp.sync(path.join(entity.level, to, naming._modDelimiter + entity.modName));

    if(fs.lstatSync(entity.path).isDirectory()) {
        // TODO
        return;
    }

    var regExp = new RegExp(from, 'g'),
        content = replaceContent(fs.readFileSync(entity.path, 'utf8'), from, to, entity.tech);

    fs.writeFileSync(entity.path.replace(regExp, to), content);
    rm(entity.path);
}

function replaceContent(content, from, to, tech) {
    if (techs[tech]) return techs[tech](content, from, to);

    var regExp = new RegExp(from, 'g');
    return content.replace(regExp, to);
}
