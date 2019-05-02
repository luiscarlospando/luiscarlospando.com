'use strict';

class AppsLastUpdated extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="card last-updated mt-3 text-center">
                <div class="card-body">
                    <h3 class="card-text">
                        <code>Actualizado el 21 de marzo, 2019</code>
                    </h3>
                </div>
            </div>
        );
    }
}

let appsLastUpdatedDOM = document.querySelector('#apps-last-updated');
ReactDOM.render(<AppsLastUpdated />, appsLastUpdatedDOM);