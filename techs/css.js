module.exports = function(content, from, to) {
    var regExp = new RegExp('\.' + from, 'g');

    return content.replace(regExp, '.' + to);
}
