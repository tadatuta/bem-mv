// TODO: add terminator to avoid intersections like `block bla` == `block blah`
module.exports = function(content, from, to) {
    var regExp = new RegExp('block(\\(\')?(\\s)?' + from, 'g');
    return content.replace(regExp, 'block$1$2' + to);
}
