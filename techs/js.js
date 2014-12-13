// TODO: support define on new line:
// modules.define(
//     'button',

module.exports = function(content, from, to) {
    // BEM.DOM.decl({ block: 'b1',
    var regExp = new RegExp('BEM(DOM)?\.(DOM.)?decl\\({(\\s)?block(\\s)?:(\\s)?\'' + from + '\'', 'g');
    content = content.replace(regExp, 'BEM$1.$2decl({$3block$4:$5\'' + to + '\'');

    // BEM.DOM.decl('b1'
    var regExp = new RegExp('BEM(DOM)?\.(DOM.)?decl\\(\'' + from + '\'', 'g');
    content = content.replace(regExp, 'BEM$1.$2decl(\'' + to + '\')');

    // modules
    // TODO: support modules.require
    var regExp = new RegExp('modules\.define\\(\'' + from, 'g');
    return content.replace(regExp, 'modules.define(\'' + to);
}
