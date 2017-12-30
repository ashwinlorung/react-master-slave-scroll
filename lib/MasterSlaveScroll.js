"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Slave = exports.Master = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Master = require("./components/Master/Master");

var _Master2 = _interopRequireDefault(_Master);

var _Slave = require("./components/Slave/Slave");

var _Slave2 = _interopRequireDefault(_Slave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasterSlaveScroll = function (_Component) {
    _inherits(MasterSlaveScroll, _Component);

    function MasterSlaveScroll(props) {
        _classCallCheck(this, MasterSlaveScroll);

        var _this = _possibleConstructorReturn(this, (MasterSlaveScroll.__proto__ || Object.getPrototypeOf(MasterSlaveScroll)).call(this, props));

        _this.setSlaveHeight = function () {

            _this.setState({
                slaveHeightPx: "calc(100vh - " + _this.viewportRef.offsetTop + "px)"
            });
            _this.topGutter = _this.viewportRef.offsetTop;
        };

        _this.bindScrollYListener = function () {
            window.addEventListener("scroll", _this.handleScrollY);
        };

        _this.handleScrollY = function () {
            _this.didScrollY = true;
        };

        _this.listenDidScrollY = function () {
            var scrollYListenTimer = _this.props.scrollYListenTimer;

            setInterval(function () {
                if (_this.didScrollY) {
                    _this.didScrollY = false;
                    _this.onDidScrollY();
                }
            }, scrollYListenTimer);
        };

        _this.onDidScrollY = function () {
            var scrollY = window.scrollY;

            if (scrollY === _this.prevScrollY) {
                return;
            }

            var slaveTop = _this.state.slaveTop,
                onScrollY = _this.props.onScrollY;


            var innerSlaveTop = _this.state.innerSlaveTop;
            var isScrollDown = scrollY > _this.prevScrollY,
                scrollDiff = scrollY - _this.prevScrollY,
                newInnerSlaveTop = 0,
                newSlaveTop = 0,
                viewportHeight = window.innerHeight,
                slaveScrollHeight = _this.innerSlaveRef.scrollHeight,
                slaveOffsetHeight = _this.innerSlaveRef.offsetHeight,
                remainingMasterToScroll = _this.masterRef.scrollHeight - scrollY - viewportHeight;

            _this.prevScrollY = scrollY;

            if (isScrollDown) {
                if (-innerSlaveTop + viewportHeight < slaveOffsetHeight + _this.topGutter) {
                    newInnerSlaveTop = slaveScrollHeight + innerSlaveTop - scrollDiff - viewportHeight + _this.topGutter <= 0 ? -(slaveScrollHeight - viewportHeight + _this.topGutter) : innerSlaveTop - scrollDiff;
                    _this.setState({
                        innerSlaveTop: newInnerSlaveTop
                    });
                } else if (remainingMasterToScroll < 0) {
                    newSlaveTop = newSlaveTop + (remainingMasterToScroll + _this.topGutter);
                    _this.setState({
                        slaveTop: newSlaveTop
                    });
                }
            } else if (!isScrollDown) {
                if (slaveTop < 0) {
                    newSlaveTop = slaveTop - scrollDiff > 0 ? 0 : slaveTop - scrollDiff;
                    _this.setState({
                        slaveTop: newSlaveTop
                    });
                } else if (innerSlaveTop < 0) {
                    newInnerSlaveTop = innerSlaveTop - scrollDiff > 0 ? 0 : innerSlaveTop - scrollDiff;
                    _this.setState({
                        innerSlaveTop: newInnerSlaveTop
                    });
                }
            }

            onScrollY({ scrollY: scrollY, scrollDiff: scrollDiff });
        };

        _this.setReference = function (child, ref) {
            switch (child) {
                case "master":
                    _this.masterRef = ref;
                    break;
                case "slave":
                    _this.slaveRef = ref;
                    break;
                case "innerSlave":
                    _this.innerSlaveRef = ref;
                    break;
            }
        };

        _this.bindScrollXListener = function () {
            window.addEventListener("scroll", _this.handleScrollX);
        };

        _this.didScrollY = false;
        _this.prevScrollY = 0;
        _this.prevScrollX = 0;
        _this.topGutter = 0;

        _this.state = {
            slaveHeightPx: null,
            slaveTop: 0,
            innerSlaveTop: 0,
            innerSlaveLeft: 0
        };

        _this.handleScrollX = _this.handleScrollX.bind(_this);
        return _this;
    }

    _createClass(MasterSlaveScroll, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setSlaveHeight();
            this.bindScrollYListener();
            this.listenDidScrollY();
            this.bindScrollXListener();
        }
    }, {
        key: "handleScrollX",
        value: function handleScrollX() {
            var onScrollX = this.props.onScrollX;

            var scrollX = window.scrollX;
            if (scrollX === this.prevScrollX) {
                return;
            }

            this.prevScrollX = scrollX;
            this.setState({
                innerSlaveLeft: -scrollX
            });

            onScrollX();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                minWidthPx = _props.minWidthPx,
                maxWidthPx = _props.maxWidthPx,
                slaveWidthPx = _props.slaveWidthPx,
                scrollAnimDuration = _props.scrollAnimDuration,
                fixRight = _props.fixRight,
                children = _props.children,
                _state = this.state,
                slaveTop = _state.slaveTop,
                slaveHeightPx = _state.slaveHeightPx,
                innerSlaveTop = _state.innerSlaveTop,
                innerSlaveLeft = _state.innerSlaveLeft,
                filteredChildren = _react2.default.Children.toArray(children).filter(function (c) {
                return !!c;
            });

            var style = {
                minWidth: minWidthPx,
                maxWidth: maxWidthPx,
                position: "relative"
            };

            return _react2.default.createElement(
                "div",
                { ref: function ref(el) {
                        return _this2.viewportRef = el;
                    },
                    style: style
                },
                _react.Children.map(filteredChildren, function (child, index) {
                    if (!child) {
                        return null;
                    }
                    var childProps = _extends({
                        slaveWidthPx: slaveWidthPx,
                        slaveHeightPx: slaveHeightPx,
                        slaveTop: slaveTop,
                        slaveLeft: _this2.slaveLeft,
                        fixRight: fixRight,
                        innerSlaveTop: innerSlaveTop,
                        innerSlaveLeft: innerSlaveLeft,
                        setReference: _this2.setReference,
                        scrollAnimDuration: scrollAnimDuration
                    }, child.props);

                    return (0, _react.cloneElement)(child, childProps);
                })
            );
        }
    }]);

    return MasterSlaveScroll;
}(_react.Component);

MasterSlaveScroll.propTypes = {
    minWidthPx: _propTypes2.default.number,
    slaveWidthPx: _propTypes2.default.number.isRequired,
    toListenWindowScroll: _propTypes2.default.bool,
    top: _propTypes2.default.number,
    scrollYListenTimer: _propTypes2.default.number,
    scrollAnimDuration: _propTypes2.default.number,
    onScrollY: _propTypes2.default.func,
    onScrollX: _propTypes2.default.func
};

MasterSlaveScroll.defaultProps = {
    minWidthPx: "auto",
    toListenWindowScroll: true,
    fixRight: false,
    scrollYListenTimer: 25,
    scrollAnimDuration: 0.05,
    onScrollY: function onScrollY() {},
    onScrollX: function onScrollX() {}
};

MasterSlaveScroll.Master = _Master2.default;
MasterSlaveScroll.Slave = _Slave2.default;

exports.Master = _Master2.default;
exports.Slave = _Slave2.default;
exports.default = MasterSlaveScroll;