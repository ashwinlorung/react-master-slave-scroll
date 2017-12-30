"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slave = function (_Component) {
    _inherits(Slave, _Component);

    function Slave(props) {
        _classCallCheck(this, Slave);

        return _possibleConstructorReturn(this, (Slave.__proto__ || Object.getPrototypeOf(Slave)).call(this, props));
    }

    _createClass(Slave, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var setReference = this.props.setReference;


            setReference("slave", this.ref);
            setReference("innerSlave", this.innerSlaveRef);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                slaveWidthPx = _props.slaveWidthPx,
                fixRight = _props.fixRight,
                slaveHeightPx = _props.slaveHeightPx,
                innerSlaveTop = _props.innerSlaveTop,
                innerSlaveLeft = _props.innerSlaveLeft,
                slaveTop = _props.slaveTop,
                scrollAnimDuration = _props.scrollAnimDuration;


            var styles = {
                width: slaveWidthPx,
                height: slaveHeightPx,
                position: "fixed",
                transform: "translateY(" + slaveTop + "px)",
                marginLeft: fixRight ? "calc(100% - " + slaveWidthPx + "px)" : 0,
                overflow: "hidden",
                boxSizing: "border-box"
            };
            var innerStyles = {
                width: "100%",
                position: "relative",
                boxSizing: "border-box",
                transition: "transform " + scrollAnimDuration + "s linear",
                left: innerSlaveLeft,
                transform: "translateY(" + innerSlaveTop + "px)"
            };

            return _react2.default.createElement(
                "div",
                { ref: function ref(el) {
                        _this2.ref = el;
                    },
                    style: styles },
                _react2.default.createElement(
                    "div",
                    { ref: function ref(el) {
                            _this2.innerSlaveRef = el;
                        },
                        style: innerStyles
                    },
                    this.props.children
                )
            );
        }
    }]);

    return Slave;
}(_react.Component);

Slave.propTypes = {
    width: _propTypes2.default.string
};

exports.default = Slave;