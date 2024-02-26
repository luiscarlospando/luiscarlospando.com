import React from 'react';
import { createRoot } from 'react-dom/client';

function CurrentlyListening({lastfmId = 'lastfm'}) {
    return (
        <div id={lastfmId}></div>
    );
}

const container = document.querySelector('#currently-listening');
const root = createRoot(container);
root.render(<CurrentlyListening />);