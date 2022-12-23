'use strict';

class BackToTop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="#0" class="cd-top">Top</a>
        );
    }
}

let backToTopDOM = document.querySelector('#back-to-top');
ReactDOM.render(<BackToTop />, backToTopDOM);