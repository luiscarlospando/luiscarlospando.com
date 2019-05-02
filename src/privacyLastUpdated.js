'use strict';

class PrivacyLastUpdated extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="card last-updated mt-3 text-center">
                <div class="card-body">
                    <h3 class="card-text">
                        <code>Actualizado el 2 de mayo, 2019</code>
                    </h3>
                </div>
            </div>
        );
    }
}

let privacyLastUpdatedDOM = document.querySelector('#privacy-last-updated');
ReactDOM.render(<PrivacyLastUpdated />, privacyLastUpdatedDOM);