'use strict';

class CurrentlyListening extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="lastfm"></div>
        );
    }
}

let currentlyListeningDOM = document.querySelector('#currently-listening');
ReactDOM.render(<CurrentlyListening />, currentlyListeningDOM);