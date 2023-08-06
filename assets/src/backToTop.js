import React from 'react';
import { createRoot } from 'react-dom/client';

function BackToTop({className = "cd-top", btnText = 'Top', href = '#0'}) {
    return (
        <a href={href} className={className}>
            {btnText}
        </a>
    );
}

const container = document.querySelector('#back-to-top');
const root = createRoot(container);
root.render(<BackToTop />);