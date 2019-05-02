'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrivacyLastUpdated = function (_React$Component) {
    _inherits(PrivacyLastUpdated, _React$Component);

    function PrivacyLastUpdated(props) {
        _classCallCheck(this, PrivacyLastUpdated);

        return _possibleConstructorReturn(this, (PrivacyLastUpdated.__proto__ || Object.getPrototypeOf(PrivacyLastUpdated)).call(this, props));
    }

    _createClass(PrivacyLastUpdated, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "card last-updated mt-3 text-center" },
                React.createElement(
                    "div",
                    { "class": "card-body" },
                    React.createElement(
                        "h3",
                        { "class": "card-text" },
                        React.createElement(
                            "code",
                            null,
                            "Actualizado el 2 de mayo, 2019"
                        )
                    )
                )
            );
        }
    }]);

    return PrivacyLastUpdated;
}(React.Component);

var privacyLastUpdatedDOM = document.querySelector('#privacy-last-updated');
ReactDOM.render(React.createElement(PrivacyLastUpdated, null), privacyLastUpdatedDOM);