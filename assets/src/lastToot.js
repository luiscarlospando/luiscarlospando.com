'use strict';

class LastToot extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="mt-3 mb-2 text-center" id="toot" data-background-icon="&#xf4f6;"></div>
        );
    }
}

let LastTootDOM = document.querySelector('#last-toot');
ReactDOM.render(<LastToot />, LastTootDOM);