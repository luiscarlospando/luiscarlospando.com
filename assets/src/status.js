import React from 'react';
import { createRoot } from 'react-dom/client';

function Status(_ref) {
    var _ref$statusLogProfile = _ref.statusLogProfile,
        statusLogProfile = _ref$statusLogProfile === undefined ? 'https://mijo.status.lol/' : _ref$statusLogProfile,
        _ref$statusLogScriptS = _ref.statusLogScriptSrc,
        statusLogScriptSrc = _ref$statusLogScriptS === undefined ? 'https://status.lol/mijo.js?' : _ref$statusLogScriptS;

    return React.createElement(
        'a',
        { href: statusLogProfile, target: '_blank' },
        React.createElement(
            'div',
            { id: 'container' },
            React.createElement('script', { src: statusLogScriptSrc })
        )
    );
}

var container = document.querySelector('#status');
var root = createRoot(container);
root.render(React.createElement(Status, null));