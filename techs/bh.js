module.exports = function(content, from, to) {
    var regExp = new RegExp('bh\.match\\(\'' + from + '(\'|_)', 'g');
    return content.replace(regExp, 'bh.match(\'' + to + '$1');
}
