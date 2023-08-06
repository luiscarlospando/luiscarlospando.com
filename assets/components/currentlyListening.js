import React from 'react';
import { createRoot } from 'react-dom/client';

function CurrentlyListening(_ref) {
    var _ref$lastfmId = _ref.lastfmId,
        lastfmId = _ref$lastfmId === undefined ? 'lastfm' : _ref$lastfmId;

    return React.createElement('div', { id: lastfmId });
}

var container = document.querySelector('#currently-listening');
var root = createRoot(container);
root.render(React.createElement(CurrentlyListening, null));