'use strict';

class LastTweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="mt-3 mb-2 text-center" id="tweet" data-background-icon="&#xf099;"></div>
        );
    }
}

let lastTweetDOM = document.querySelector('#last-tweet');
ReactDOM.render(<LastTweet />, lastTweetDOM);