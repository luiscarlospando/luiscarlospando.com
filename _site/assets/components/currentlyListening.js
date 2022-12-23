'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrentlyListening = function (_React$Component) {
    _inherits(CurrentlyListening, _React$Component);

    function CurrentlyListening(props) {
        _classCallCheck(this, CurrentlyListening);

        return _possibleConstructorReturn(this, (CurrentlyListening.__proto__ || Object.getPrototypeOf(CurrentlyListening)).call(this, props));
    }

    _createClass(CurrentlyListening, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { id: 'lastfm' });
        }
    }]);

    return CurrentlyListening;
}(React.Component);

var currentlyListeningDOM = document.querySelector('#currently-listening');
ReactDOM.render(React.createElement(CurrentlyListening, null), currentlyListeningDOM);