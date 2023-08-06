import React from 'react';
import { createRoot } from 'react-dom/client';

function BackToTop(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? "cd-top" : _ref$className,
        _ref$btnText = _ref.btnText,
        btnText = _ref$btnText === undefined ? 'Top' : _ref$btnText,
        _ref$href = _ref.href,
        href = _ref$href === undefined ? '#0' : _ref$href;

    return React.createElement(
        'a',
        { href: href, className: className },
        btnText
    );
}

var container = document.querySelector('#back-to-top');
var root = createRoot(container);
root.render(React.createElement(BackToTop, null));