webpackJsonp([17],{

/***/ 1014:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _list = __webpack_require__(297);

var _list2 = _interopRequireDefault(_list);

var _inputItem = __webpack_require__(834);

var _inputItem2 = _interopRequireDefault(_inputItem);

var _toast = __webpack_require__(314);

var _toast2 = _interopRequireDefault(_toast);

var _listView = __webpack_require__(366);

var _listView2 = _interopRequireDefault(_listView);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _radio = __webpack_require__(853);

var _radio2 = _interopRequireDefault(_radio);

var _modal = __webpack_require__(827);

var _modal2 = _interopRequireDefault(_modal);

var _checkbox = __webpack_require__(822);

var _checkbox2 = _interopRequireDefault(_checkbox);

__webpack_require__(288);

__webpack_require__(841);

__webpack_require__(316);

__webpack_require__(369);

__webpack_require__(857);

__webpack_require__(832);

__webpack_require__(825);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(1014);

var _punycode = __webpack_require__(107);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxItem = _checkbox2.default.CheckboxItem;
var AgreeItem = _checkbox2.default.AgreeItem;
var alert = _modal2.default.alert;
var RadioItem = _radio2.default.RadioItem;
var updateCM;

var updateClassroom = function (_React$Component) {
    (0, _inherits3.default)(updateClassroom, _React$Component);

    function updateClassroom(props) {
        (0, _classCallCheck3.default)(this, updateClassroom);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (updateClassroom.__proto__ || Object.getPrototypeOf(updateClassroom)).call(this, props));

        _this2.onDataChange = function (value) {
            updateCM.setState({
                gradeNameValue: value
            });
        };

        _this2.addRing = function () {
            $('.tableDiv').hide("fast");
        };

        _this2.binding = function () {

            var _this = _this2;
            if (_this.state.gradeNameValue == '' || _this.state.classroomValue == '') {
                _toast2.default.fail('请填写教室名称和班级名称');
                return;
            }
            var param;

            if (_this2.state.calmFlag) {
                param = {
                    "method": 'updateClassRoom',
                    "cr": {
                        "creatorId": updateCM.state.uid,
                        "name": updateCM.state.classroomValue,
                        "classId": updateCM.state.classId,
                        "id": updateCM.state.classIdBynoom
                    }

                };
            } else {
                param = {
                    "method": 'updateClassRoom',
                    "cr": {
                        "creatorId": updateCM.state.uid,
                        "name": updateCM.state.classroomValue,
                        "id": updateCM.state.classIdBynoom
                    }

                };
            }

            console.log(param);
            console.log(updateCM.state.classId);
            WebServiceUtil.requestLittleAntApi(JSON.stringify(param), {
                onResponse: function onResponse(result) {
                    console.log(result);
                    if (result.msg == '调用成功' && result.success == true) {
                        $('.tableDiv').show("fast");
                        _this.state.gradeNameValue = '';
                        _this.state.classroomValue = '';
                        _this.setState({ chooseResultDiv: 'none' });
                        _this.viewClassRoomPage(_this.state.uid);
                        $('.bindGrade span').removeClass("am-checkbox-checked");
                        $('.gradeName').css({
                            display: 'none'
                        });
                        _toast2.default.success('添加成功');
                        setTimeout(function () {
                            var data = {
                                method: 'finish'
                            };

                            Bridge.callHandler(data, null, function (error) {});
                        }, 1000);
                    } else {
                        _toast2.default.fail(result.msg, 1);
                    }
                },
                onError: function onError(error) {
                    message.error(error);
                }
            });
        };

        _this2.cancelAddModel = function () {
            $('.tableDiv').show("fast");
            _this2.state.gradeNameValue = '';
            _this2.state.classroomValue = '';
            _this2.setState({ chooseResultDiv: 'none' });
        };

        _this2.onEndReached = function (event) {
            var _this = _this2;
            var currentPageNo = _this2.state.defaultPageNo;
            if (!_this2.state.isLoadingLeft && !_this2.state.hasMore) {
                return;
            }
            currentPageNo += 1;
            _this2.setState({ isLoadingLeft: true, defaultPageNo: currentPageNo });
            _this.viewClassRoomPage(_this.state.uid);
            _this2.setState({
                dataSource: _this2.state.dataSource.cloneWithRows(_this2.initData),
                isLoadingLeft: true
            });
        };

        _this2.onRefresh = function () {
            var divPull = document.getElementsByClassName('am-pull-to-refresh-content');
            divPull[0].style.transform = "translate3d(0px, 30px, 0px)"; //设置拉动后回到的位置
            _this2.setState({ defaultPageNo: 1, refreshing: true, isLoadingLeft: true });
            _this2.viewClassRoomPage(_this2.state.uid);
        };

        updateCM = _this2;
        var dataSource = new _listView2.default.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return row1 !== row2;
            }
        });
        _this2.initData = [];
        _this2.state = {
            dataSource: dataSource.cloneWithRows(_this2.initData),
            defaultPageNo: 1,
            clientHeight: document.body.clientHeight,
            chooseResultDiv: 'none',
            searchData: [],
            selectData: [],
            calmFlag: false
        };
        return _this2;
    }

    (0, _createClass3.default)(updateClassroom, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            debugger;
            Bridge.setShareAble("false");
            document.title = '绑定教室信息';
            var uid = JSON.parse(localStorage.getItem("uIdKey")).uidKey;
            this.setState({ "uid": uid });
            this.viewClassRoomPage(uid);
            //添加对视窗大小的监听,在屏幕转换以及键盘弹起时重设各项高度
            window.addEventListener('resize', updateCM.onWindowResize);
            var locationHref = window.location.href;
            var locationSearch = locationHref.substr(locationHref.indexOf("?") + 1);
            var classIdBynoom = locationSearch.split("=")[1];
            this.setState({ classIdBynoom: classIdBynoom });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            //解除监听
            window.removeEventListener('resize', updateCM.onWindowResize);
        }

        /**
         * 视窗改变时改变高度
         */

    }, {
        key: 'onWindowResize',
        value: function onWindowResize() {
            setTimeout(function () {
                updateCM.setState({ clientHeight: document.body.clientHeight });
            }, 100);
        }

        /**
         * 查看绑定的设备
         */

    }, {
        key: 'viewClassRoomPage',
        value: function viewClassRoomPage(uid) {
            var _this = this;
            _this.initData.splice(0);
            _this.state.dataSource = [];
            _this.state.dataSource = new _listView2.default.DataSource({
                rowHasChanged: function rowHasChanged(row1, row2) {
                    return row1 !== row2;
                }
            });
            var dataBlob = {};
            var PageNo = this.state.defaultPageNo;
            var param = {
                "method": 'viewClassRoomPage',
                "uid": uid,
                "pn": PageNo
            };
            WebServiceUtil.requestLittleAntApi(JSON.stringify(param), {
                onResponse: function onResponse(result) {
                    if (result.msg == '调用成功' && result.success == true) {
                        updateCM.state.selectData = result.response;
                        var arr = result.response;
                        var pager = result.pager;
                        for (var i = 0; i < arr.length; i++) {
                            var topic = arr[i];
                            dataBlob['' + i] = topic;
                        }
                        var isLoading = false;
                        if (arr.length > 0) {
                            if (pager.pageCount == 1 && pager.rsCount < 30) {
                                isLoading = false;
                            } else {
                                isLoading = true;
                            }
                        } else {
                            isLoading = false;
                        }
                        _this.initData = _this.initData.concat(arr);
                        _this.setState({
                            dataSource: _this.state.dataSource.cloneWithRows(_this.initData),
                            isLoadingLeft: isLoading,
                            refreshing: false
                        });
                    }
                },
                onError: function onError(error) {
                    // message.error(error);
                }
            });
        }

        /**
         * 开启添加教室管理的界面
         */

    }, {
        key: 'searchClassroomName',


        /**
         * searchClassroomName搜索班级的名称
         */
        value: function searchClassroomName() {
            var _this = this;
            var param = {
                "method": 'searchClazz',
                "aid": updateCM.state.uid,
                "keyWord": $('.gradeName .am-input-control input').val()
            };
            WebServiceUtil.requestLittleAntApi(JSON.stringify(param), {
                onResponse: function onResponse(result) {
                    console.log(result.response);
                    if (result.msg == '调用成功' && result.success == true) {

                        updateCM.setState({
                            searchData: result.response,
                            chooseResultDiv: "block",
                            classId: result.response[0].id
                        });
                    } else {
                        _toast2.default.fail(result.msg, 1);
                    }
                },
                onError: function onError(error) {}
            });
        }
        /**
         * 点击提交时，确认绑定教室和班级
         */


        /**
         * 关闭添加的界面
         */

    }, {
        key: 'getbindGradeState',


        /**
         * 获取绑定班级的状态，是否显示
         */
        value: function getbindGradeState(e) {
            if (e.target.checked) {
                this.setState({ calmFlag: true,
                    gradeNameValue: '' });
                $('.gradeName').css({
                    display: 'block'
                });
            } else {
                this.setState({ calmFlag: false,
                    chooseResultDiv: 'none'
                });
                $('.gradeName').css({
                    display: 'none'
                });
            }
        }
        /**
         * 输入框改变的回调
         */

    }, {
        key: 'inputOnChange',
        value: function inputOnChange(e) {
            this.setState({ classroomValue: e });
        }
    }, {
        key: 'inputChange',
        value: function inputChange(e) {
            this.setState({ gradeNameValue: e });
        }
        /**
         * 点击搜索结果的回调
         */
        // searchResultOnChange = (i) => {
        //     this.setState({
        //         gradeNameValue: $(".chooseResult .am-list-line .am-list-content").text()
        //     })
        // };

        /**
         *  ListView数据全部渲染完毕的回调
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _this = this;

            return _react2.default.createElement(
                'div',
                { id: 'updateClassroom', style: { height: updateCM.state.clientHeight } },
                _react2.default.createElement(
                    'div',
                    { className: 'addModel', style: { height: updateCM.state.clientHeight } },
                    _react2.default.createElement(
                        _list2.default,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'classroomName' },
                            _react2.default.createElement(
                                _inputItem2.default,
                                {
                                    placeholder: '\u8BF7\u8F93\u5165\u6559\u5BA4\u540D\u79F0',
                                    'data-seed': 'logId',
                                    onChange: this.inputOnChange.bind(this),
                                    value: this.state.classroomValue
                                },
                                '\u6559\u5BA4\u540D\u79F0',
                                _react2.default.createElement(
                                    'i',
                                    { className: 'redStar' },
                                    '*'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'bindGrade' },
                            _react2.default.createElement(
                                AgreeItem,
                                { 'data-seed': 'logId', onChange: function onChange(e) {
                                        return _this3.getbindGradeState(e);
                                    } },
                                '\u7ED1\u5B9A\u73ED\u7EA7'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'gradeName', style: { display: "none" } },
                            _react2.default.createElement(
                                _inputItem2.default,
                                {
                                    placeholder: '\u8BF7\u8F93\u5165\u73ED\u7EA7\u540D\u79F0',
                                    'data-seed': 'logId',
                                    onChange: this.inputChange.bind(this),
                                    value: this.state.gradeNameValue
                                },
                                '\u73ED\u7EA7\u540D\u79F0',
                                _react2.default.createElement(
                                    'i',
                                    { className: 'redStar' },
                                    '*'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { id: 'stIcon', className: 'stIcon', onClick: this.searchClassroomName },
                                _react2.default.createElement('img', { src: __webpack_require__(927) })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chooseResult',
                                style: { display: this.state.chooseResultDiv } },
                            _react2.default.createElement(
                                _list2.default,
                                null,
                                updateCM.state.searchData.map(function (i) {
                                    return _react2.default.createElement(
                                        RadioItem,
                                        { key: i.id, checked: updateCM.state.gradeNameValue === i.name, onChange: function onChange() {
                                                return _this3.onDataChange(i.name);
                                            } },
                                        i.name
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'bottomBox' },
                        _react2.default.createElement(
                            'span',
                            { className: 'bind', onClick: this.binding },
                            '\u63D0\u4EA4'
                        )
                    )
                )
            );
        }
    }]);
    return updateClassroom;
}(_react2.default.Component);

exports.default = updateClassroom;

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(100);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(30);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(32);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(33);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external__React_ = __webpack_require__(4);
var external__React__default = /*#__PURE__*/__webpack_require__.n(external__React_);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(101);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/rmc-feedback/es/TouchFeedback.js







var touchSupported = typeof window !== 'undefined' && 'ontouchstart' in window;

var TouchFeedback_TouchFeedback = function (_React$Component) {
    inherits_default()(TouchFeedback, _React$Component);

    function TouchFeedback() {
        classCallCheck_default()(this, TouchFeedback);

        var _this = possibleConstructorReturn_default()(this, (TouchFeedback.__proto__ || Object.getPrototypeOf(TouchFeedback)).apply(this, arguments));

        _this.state = {
            active: false
        };
        _this.onTouchStart = function (e) {
            _this.triggerEvent('TouchStart', true, e);
        };
        _this.onTouchMove = function (e) {
            _this.triggerEvent('TouchMove', false, e);
        };
        _this.onTouchEnd = function (e) {
            _this.triggerEvent('TouchEnd', false, e);
        };
        _this.onTouchCancel = function (e) {
            _this.triggerEvent('TouchCancel', false, e);
        };
        _this.onMouseDown = function (e) {
            // pc simulate mobile
            if (_this.props.onTouchStart) {
                _this.triggerEvent('TouchStart', true, e);
            }
            _this.triggerEvent('MouseDown', true, e);
        };
        _this.onMouseUp = function (e) {
            if (_this.props.onTouchEnd) {
                _this.triggerEvent('TouchEnd', false, e);
            }
            _this.triggerEvent('MouseUp', false, e);
        };
        _this.onMouseLeave = function (e) {
            _this.triggerEvent('MouseLeave', false, e);
        };
        return _this;
    }

    createClass_default()(TouchFeedback, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.disabled && this.state.active) {
                this.setState({
                    active: false
                });
            }
        }
    }, {
        key: 'triggerEvent',
        value: function triggerEvent(type, isActive, ev) {
            var eventType = 'on' + type;
            if (this.props[eventType]) {
                this.props[eventType](ev);
            }
            this.setState({
                active: isActive
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                disabled = _props.disabled,
                activeClassName = _props.activeClassName,
                activeStyle = _props.activeStyle;

            var events = disabled ? undefined : {
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.onTouchEnd,
                onTouchCancel: this.onTouchCancel,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onMouseLeave: this.onMouseLeave
            };
            var child = external__React__default.a.Children.only(children);
            if (!disabled && this.state.active) {
                var _child$props = child.props,
                    style = _child$props.style,
                    className = _child$props.className;

                if (activeStyle !== false) {
                    if (activeStyle) {
                        style = extends_default()({}, style, activeStyle);
                    }
                    className = classnames_default()(className, activeClassName);
                }
                return external__React__default.a.cloneElement(child, extends_default()({ className: className,
                    style: style }, events));
            }
            return external__React__default.a.cloneElement(child, events);
        }
    }]);

    return TouchFeedback;
}(external__React__default.a.Component);

/* harmony default export */ var es_TouchFeedback = (TouchFeedback_TouchFeedback);

TouchFeedback_TouchFeedback.defaultProps = {
    disabled: false
};
// CONCATENATED MODULE: ./node_modules/rmc-feedback/es/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return es_TouchFeedback; });


/***/ }),

/***/ 286:
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(319);

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(100);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(102);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(30);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(32);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(33);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external__React_ = __webpack_require__(4);
var external__React__default = /*#__PURE__*/__webpack_require__.n(external__React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(6);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./node_modules/rc-animate/es/ChildrenUtils.js


function toArrayChildren(children) {
  var ret = [];
  external__React__default.a.Children.forEach(children, function (child) {
    ret.push(child);
  });
  return ret;
}

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (ret) {
        return;
      }
      if (child && child.key === key) {
        ret = child;
      }
    });
  }
  return ret;
}

function findShownChildInChildrenByKey(children, key, showProp) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (child && child.key === key && child.props[showProp]) {
        if (ret) {
          throw new Error('two child with same key for <rc-animate> children');
        }
        ret = child;
      }
    });
  }
  return ret;
}

function findHiddenChildInChildrenByKey(children, key, showProp) {
  var found = 0;
  if (children) {
    children.forEach(function (child) {
      if (found) {
        return;
      }
      found = child && child.key === key && !child.props[showProp];
    });
  }
  return found;
}

function isSameChildren(c1, c2, showProp) {
  var same = c1.length === c2.length;
  if (same) {
    c1.forEach(function (child, index) {
      var child2 = c2[index];
      if (child && child2) {
        if (child && !child2 || !child && child2) {
          same = false;
        } else if (child.key !== child2.key) {
          same = false;
        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
          same = false;
        }
      }
    });
  }
  return same;
}

function mergeChildren(prev, next) {
  var ret = [];

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  prev.forEach(function (child) {
    if (child && findChildInChildrenByKey(next, child.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[child.key] = pendingChildren;
        pendingChildren = [];
      }
    } else {
      pendingChildren.push(child);
    }
  });

  next.forEach(function (child) {
    if (child && nextChildrenPending.hasOwnProperty(child.key)) {
      ret = ret.concat(nextChildrenPending[child.key]);
    }
    ret.push(child);
  });

  ret = ret.concat(pendingChildren);

  return ret;
}
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(43);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: external "ReactDOM"
var external__ReactDOM_ = __webpack_require__(42);
var external__ReactDOM__default = /*#__PURE__*/__webpack_require__.n(external__ReactDOM_);

// EXTERNAL MODULE: ./node_modules/css-animation/es/index.js + 1 modules
var es = __webpack_require__(301);

// CONCATENATED MODULE: ./node_modules/rc-animate/es/util.js
var util = {
  isAppearSupported: function isAppearSupported(props) {
    return props.transitionName && props.transitionAppear || props.animation.appear;
  },
  isEnterSupported: function isEnterSupported(props) {
    return props.transitionName && props.transitionEnter || props.animation.enter;
  },
  isLeaveSupported: function isLeaveSupported(props) {
    return props.transitionName && props.transitionLeave || props.animation.leave;
  },
  allowAppearCallback: function allowAppearCallback(props) {
    return props.transitionAppear || props.animation.appear;
  },
  allowEnterCallback: function allowEnterCallback(props) {
    return props.transitionEnter || props.animation.enter;
  },
  allowLeaveCallback: function allowLeaveCallback(props) {
    return props.transitionLeave || props.animation.leave;
  }
};
/* harmony default export */ var es_util = (util);
// CONCATENATED MODULE: ./node_modules/rc-animate/es/AnimateChild.js











var transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
};

var AnimateChild_AnimateChild = function (_React$Component) {
  inherits_default()(AnimateChild, _React$Component);

  function AnimateChild() {
    classCallCheck_default()(this, AnimateChild);

    return possibleConstructorReturn_default()(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
  }

  createClass_default()(AnimateChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      if (es_util.isEnterSupported(this.props)) {
        this.transition('enter', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      if (es_util.isAppearSupported(this.props)) {
        this.transition('appear', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      if (es_util.isLeaveSupported(this.props)) {
        this.transition('leave', done);
      } else {
        // always sync, do not interupt with react component life cycle
        // update hidden -> animate hidden ->
        // didUpdate -> animate leave -> unmount (if animate is none)
        done();
      }
    }
  }, {
    key: 'transition',
    value: function transition(animationType, finishCallback) {
      var _this2 = this;

      var node = external__ReactDOM__default.a.findDOMNode(this);
      var props = this.props;
      var transitionName = props.transitionName;
      var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : typeof_default()(transitionName)) === 'object';
      this.stop();
      var end = function end() {
        _this2.stopper = null;
        finishCallback();
      };
      if ((es["b" /* isCssAnimationSupported */] || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
        var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
        var activeName = name + '-active';
        if (nameIsObj && transitionName[animationType + 'Active']) {
          activeName = transitionName[animationType + 'Active'];
        }
        this.stopper = Object(es["a" /* default */])(node, {
          name: name,
          active: activeName
        }, end);
      } else {
        this.stopper = props.animation[animationType](node, end);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var stopper = this.stopper;
      if (stopper) {
        this.stopper = null;
        stopper.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimateChild;
}(external__React__default.a.Component);

AnimateChild_AnimateChild.propTypes = {
  children: prop_types_default.a.any
};
/* harmony default export */ var es_AnimateChild = (AnimateChild_AnimateChild);
// CONCATENATED MODULE: ./node_modules/rc-animate/es/Animate.js










var defaultKey = 'rc_animate_' + Date.now();


function getChildrenFromProps(props) {
  var children = props.children;
  if (external__React__default.a.isValidElement(children)) {
    if (!children.key) {
      return external__React__default.a.cloneElement(children, {
        key: defaultKey
      });
    }
  }
  return children;
}

function noop() {}

var Animate_Animate = function (_React$Component) {
  inherits_default()(Animate, _React$Component);

  // eslint-disable-line

  function Animate(props) {
    classCallCheck_default()(this, Animate);

    var _this = possibleConstructorReturn_default()(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));

    Animate__initialiseProps.call(_this);

    _this.currentlyAnimatingKeys = {};
    _this.keysToEnter = [];
    _this.keysToLeave = [];

    _this.state = {
      children: toArrayChildren(getChildrenFromProps(props))
    };

    _this.childrenRefs = {};
    return _this;
  }

  createClass_default()(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var showProp = this.props.showProp;
      var children = this.state.children;
      if (showProp) {
        children = children.filter(function (child) {
          return !!child.props[showProp];
        });
      }
      children.forEach(function (child) {
        if (child) {
          _this2.performAppear(child.key);
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      this.nextProps = nextProps;
      var nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
      var props = this.props;
      // exclusive needs immediate response
      if (props.exclusive) {
        Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
          _this3.stop(key);
        });
      }
      var showProp = props.showProp;
      var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
      // last props children if exclusive
      var currentChildren = props.exclusive ? toArrayChildren(getChildrenFromProps(props)) : this.state.children;
      // in case destroy in showProp mode
      var newChildren = [];
      if (showProp) {
        currentChildren.forEach(function (currentChild) {
          var nextChild = currentChild && findChildInChildrenByKey(nextChildren, currentChild.key);
          var newChild = void 0;
          if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
            newChild = external__React__default.a.cloneElement(nextChild || currentChild, defineProperty_default()({}, showProp, true));
          } else {
            newChild = nextChild;
          }
          if (newChild) {
            newChildren.push(newChild);
          }
        });
        nextChildren.forEach(function (nextChild) {
          if (!nextChild || !findChildInChildrenByKey(currentChildren, nextChild.key)) {
            newChildren.push(nextChild);
          }
        });
      } else {
        newChildren = mergeChildren(currentChildren, nextChildren);
      }

      // need render to avoid update
      this.setState({
        children: newChildren
      });

      nextChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasPrev = child && findChildInChildrenByKey(currentChildren, key);
        if (showProp) {
          var showInNext = child.props[showProp];
          if (hasPrev) {
            var showInNow = findShownChildInChildrenByKey(currentChildren, key, showProp);
            if (!showInNow && showInNext) {
              _this3.keysToEnter.push(key);
            }
          } else if (showInNext) {
            _this3.keysToEnter.push(key);
          }
        } else if (!hasPrev) {
          _this3.keysToEnter.push(key);
        }
      });

      currentChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasNext = child && findChildInChildrenByKey(nextChildren, key);
        if (showProp) {
          var showInNow = child.props[showProp];
          if (hasNext) {
            var showInNext = findShownChildInChildrenByKey(nextChildren, key, showProp);
            if (!showInNext && showInNow) {
              _this3.keysToLeave.push(key);
            }
          } else if (showInNow) {
            _this3.keysToLeave.push(key);
          }
        } else if (!hasNext) {
          _this3.keysToLeave.push(key);
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    }
  }, {
    key: 'isValidChildByKey',
    value: function isValidChildByKey(currentChildren, key) {
      var showProp = this.props.showProp;
      if (showProp) {
        return findShownChildInChildrenByKey(currentChildren, key, showProp);
      }
      return findChildInChildrenByKey(currentChildren, key);
    }
  }, {
    key: 'stop',
    value: function stop(key) {
      delete this.currentlyAnimatingKeys[key];
      var component = this.childrenRefs[key];
      if (component) {
        component.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props;
      this.nextProps = props;
      var stateChildren = this.state.children;
      var children = null;
      if (stateChildren) {
        children = stateChildren.map(function (child) {
          if (child === null || child === undefined) {
            return child;
          }
          if (!child.key) {
            throw new Error('must set key for <rc-animate> children');
          }
          return external__React__default.a.createElement(
            es_AnimateChild,
            {
              key: child.key,
              ref: function ref(node) {
                return _this4.childrenRefs[child.key] = node;
              },
              animation: props.animation,
              transitionName: props.transitionName,
              transitionEnter: props.transitionEnter,
              transitionAppear: props.transitionAppear,
              transitionLeave: props.transitionLeave
            },
            child
          );
        });
      }
      var Component = props.component;
      if (Component) {
        var passedProps = props;
        if (typeof Component === 'string') {
          passedProps = extends_default()({
            className: props.className,
            style: props.style
          }, props.componentProps);
        }
        return external__React__default.a.createElement(
          Component,
          passedProps,
          children
        );
      }
      return children[0] || null;
    }
  }]);

  return Animate;
}(external__React__default.a.Component);

Animate_Animate.isAnimate = true;
Animate_Animate.propTypes = {
  component: prop_types_default.a.any,
  componentProps: prop_types_default.a.object,
  animation: prop_types_default.a.object,
  transitionName: prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.object]),
  transitionEnter: prop_types_default.a.bool,
  transitionAppear: prop_types_default.a.bool,
  exclusive: prop_types_default.a.bool,
  transitionLeave: prop_types_default.a.bool,
  onEnd: prop_types_default.a.func,
  onEnter: prop_types_default.a.func,
  onLeave: prop_types_default.a.func,
  onAppear: prop_types_default.a.func,
  showProp: prop_types_default.a.string
};
Animate_Animate.defaultProps = {
  animation: {},
  component: 'span',
  componentProps: {},
  transitionEnter: true,
  transitionLeave: true,
  transitionAppear: false,
  onEnd: noop,
  onEnter: noop,
  onLeave: noop,
  onAppear: noop
};

var Animate__initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.performEnter = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillEnter(_this5.handleDoneAdding.bind(_this5, key, 'enter'));
    }
  };

  this.performAppear = function (key) {
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillAppear(_this5.handleDoneAdding.bind(_this5, key, 'appear'));
    }
  };

  this.handleDoneAdding = function (key, type) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = toArrayChildren(getChildrenFromProps(props));
    if (!_this5.isValidChildByKey(currentChildren, key)) {
      // exclusive will not need this
      _this5.performLeave(key);
    } else {
      if (type === 'appear') {
        if (es_util.allowAppearCallback(props)) {
          props.onAppear(key);
          props.onEnd(key, true);
        }
      } else {
        if (es_util.allowEnterCallback(props)) {
          props.onEnter(key);
          props.onEnd(key, true);
        }
      }
    }
  };

  this.performLeave = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillLeave(_this5.handleDoneLeaving.bind(_this5, key));
    }
  };

  this.handleDoneLeaving = function (key) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = toArrayChildren(getChildrenFromProps(props));
    // in case state change is too fast
    if (_this5.isValidChildByKey(currentChildren, key)) {
      _this5.performEnter(key);
    } else {
      var end = function end() {
        if (es_util.allowLeaveCallback(props)) {
          props.onLeave(key);
          props.onEnd(key, false);
        }
      };
      if (!isSameChildren(_this5.state.children, currentChildren, props.showProp)) {
        _this5.setState({
          children: currentChildren
        }, end);
      } else {
        end();
      }
    }
  };
};

/* harmony default export */ var es_Animate = __webpack_exports__["a"] = (Animate_Animate);

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _loadSprite = __webpack_require__(312);

var _loadSprite2 = _interopRequireDefault(_loadSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Icon = function (_React$Component) {
    (0, _inherits3['default'])(Icon, _React$Component);

    function Icon() {
        (0, _classCallCheck3['default'])(this, Icon);
        return (0, _possibleConstructorReturn3['default'])(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Icon, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _loadSprite2['default'])();
        }
    }, {
        key: 'render',
        value: function render() {
            var _a = this.props,
                type = _a.type,
                className = _a.className,
                size = _a.size,
                restProps = __rest(_a, ["type", "className", "size"]);
            var cls = (0, _classnames2['default'])(className, 'am-icon', 'am-icon-' + type, 'am-icon-' + size);
            return _react2['default'].createElement(
                'svg',
                (0, _extends3['default'])({ className: cls }, restProps),
                _react2['default'].createElement('use', { xlinkHref: '#' + type })
            );
        }
    }]);
    return Icon;
}(_react2['default'].Component);

exports['default'] = Icon;

Icon.defaultProps = {
    size: 'md'
};
module.exports = exports['default'];

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(313);

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _ListItem = __webpack_require__(318);

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
/* tslint:disable:jsx-no-multiline-js */

var List = function (_React$Component) {
    (0, _inherits3['default'])(List, _React$Component);

    function List() {
        (0, _classCallCheck3['default'])(this, List);
        return (0, _possibleConstructorReturn3['default'])(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    (0, _createClass3['default'])(List, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                prefixCls = _a.prefixCls,
                children = _a.children,
                className = _a.className,
                style = _a.style,
                renderHeader = _a.renderHeader,
                renderFooter = _a.renderFooter,
                restProps = __rest(_a, ["prefixCls", "children", "className", "style", "renderHeader", "renderFooter"]);
            var wrapCls = (0, _classnames2['default'])(prefixCls, className);
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({ className: wrapCls, style: style }, restProps),
                renderHeader ? _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    typeof renderHeader === 'function' ? renderHeader() : renderHeader
                ) : null,
                children ? _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-body' },
                    children
                ) : null,
                renderFooter ? _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    typeof renderFooter === 'function' ? renderFooter() : renderFooter
                ) : null
            );
        }
    }]);
    return List;
}(_react2['default'].Component);

exports['default'] = List;

List.Item = _ListItem2['default'];
List.defaultProps = {
    prefixCls: 'am-list'
};
module.exports = exports['default'];

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(43);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./node_modules/css-animation/es/Event.js
var EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd'
  },

  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
      var baseEvents = EVENT_NAME_MAP[baseEventName];
      for (var styleName in baseEvents) {
        if (styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  detectEvents();
}

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var TransitionEvents = {
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },


  endEvents: endEvents,

  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

/* harmony default export */ var Event = (TransitionEvents);
// EXTERNAL MODULE: ./node_modules/component-classes/index.js
var component_classes = __webpack_require__(311);
var component_classes_default = /*#__PURE__*/__webpack_require__.n(component_classes);

// CONCATENATED MODULE: ./node_modules/css-animation/es/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isCssAnimationSupported; });




var isCssAnimationSupported = Event.endEvents.length !== 0;
var capitalPrefixes = ['Webkit', 'Moz', 'O',
// ms is special .... !
'ms'];
var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

function getStyleProperty(node, name) {
  // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  var style = window.getComputedStyle(node, null);
  var ret = '';
  for (var i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);
    if (ret) {
      break;
    }
  }
  return ret;
}

function fixBrowserByTimeout(node) {
  if (isCssAnimationSupported) {
    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
    // sometimes, browser bug
    node.rcEndAnimTimeout = setTimeout(function () {
      node.rcEndAnimTimeout = null;
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }, time * 1000 + 200);
  }
}

function clearBrowserBugTimeout(node) {
  if (node.rcEndAnimTimeout) {
    clearTimeout(node.rcEndAnimTimeout);
    node.rcEndAnimTimeout = null;
  }
}

var es_cssAnimation = function cssAnimation(node, transitionName, endCallback) {
  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : typeof_default()(transitionName)) === 'object';
  var className = nameIsObj ? transitionName.name : transitionName;
  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
  var end = endCallback;
  var start = void 0;
  var active = void 0;
  var nodeClasses = component_classes_default()(node);

  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
    end = endCallback.end;
    start = endCallback.start;
    active = endCallback.active;
  }

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    nodeClasses.remove(className);
    nodeClasses.remove(activeClassName);

    Event.removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional end is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (end) {
      end();
    }
  };

  Event.addEndEventListener(node, node.rcEndListener);

  if (start) {
    start();
  }
  nodeClasses.add(className);

  node.rcAnimTimeout = setTimeout(function () {
    node.rcAnimTimeout = null;
    nodeClasses.add(activeClassName);
    if (active) {
      setTimeout(active, 0);
    }
    fixBrowserByTimeout(node);
    // 30ms for firefox
  }, 30);

  return {
    stop: function stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }
  };
};

es_cssAnimation.style = function (node, style, callback) {
  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    Event.removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  Event.addEndEventListener(node, node.rcEndListener);

  node.rcAnimTimeout = setTimeout(function () {
    for (var s in style) {
      if (style.hasOwnProperty(s)) {
        node.style[s] = style[s];
      }
    }
    node.rcAnimTimeout = null;
    fixBrowserByTimeout(node);
  }, 0);
};

es_cssAnimation.setTransition = function (node, p, value) {
  var property = p;
  var v = value;
  if (value === undefined) {
    v = property;
    property = '';
  }
  property = property || '';
  capitalPrefixes.forEach(function (prefix) {
    node.style[prefix + 'Transition' + property] = v;
  });
};

es_cssAnimation.isCssAnimationSupported = isCssAnimationSupported;



/* harmony default export */ var es = __webpack_exports__["a"] = (es_cssAnimation);

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

try {
  var index = __webpack_require__(286);
} catch (err) {
  var index = __webpack_require__(286);
}

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};


/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* tslint:disable:max-line-length */
// inspried by https://github.com/kisenka/svg-sprite-loader/blob/master/runtime/browser-sprite.js
// Much simplified, do make sure run this after document ready
var svgSprite = function svgSprite(contents) {
    return '\n  <svg\n    xmlns="http://www.w3.org/2000/svg"\n    xmlns:xlink="http://www.w3.org/1999/xlink"\n    id="__ANTD_MOBILE_SVG_SPRITE_NODE__"\n    style="position:absolute;width:0;height:0"\n  >\n    <defs>\n      ' + contents + '\n    </defs>\n  </svg>\n';
};
// both minified by https://github.com/svg/svgo
var icons = {
    check: '<svg viewBox="0 0 44 44"><path fill-rule="evenodd" d="M34.538 8L38 11.518 17.808 32 8 22.033l3.462-3.518 6.346 6.45z"/></svg>',
    'check-circle': '<svg viewBox="0 0 48 48"><path d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zM13.1 23.2l-2.2 2.1 10 9.9L38.1 15l-2.2-2-15.2 17.8-7.6-7.6z" fill-rule="evenodd"/></svg>',
    'check-circle-o': '<svg viewBox="0 0 48 48"><g fill-rule="evenodd"><path d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"/><path d="M12.2 23.2L10 25.3l10 9.9L37.2 15 35 13 19.8 30.8z"/></g></svg>',
    cross: '<svg viewBox="0 0 44 44"><path fill-rule="evenodd" d="M24.008 21.852l8.97-8.968L31.092 11l-8.97 8.968L13.157 11l-1.884 1.884 8.968 8.968-9.24 9.24 1.884 1.885 9.24-9.24 9.24 9.24 1.885-1.884-9.24-9.24z"/></svg>',
    'cross-circle': '<svg viewBox="0 0 48 48"><g fill-rule="evenodd"><path d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"/><path d="M24.34 22.22l-7.775-7.775a1.5 1.5 0 1 0-2.12 2.12l7.773 7.775-7.774 7.775a1.5 1.5 0 1 0 2.12 2.12l7.775-7.773 7.774 7.774a1.5 1.5 0 1 0 2.12-2.12L26.46 24.34l7.774-7.774a1.5 1.5 0 1 0-2.12-2.12l-7.776 7.773z"/></g></svg>',
    'cross-circle-o': '<svg viewBox="0 0 48 48"><path d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm.353-25.77l-7.593-7.593c-.797-.8-1.538-.822-2.263-.207-.724.614-.56 1.617-.124 2.067l7.852 7.847-7.72 7.723c-.727.728-.56 1.646-.066 2.177.493.532 1.553.683 2.31-.174l7.588-7.584 7.644 7.623c.796.798 1.608.724 2.21.145.605-.58.72-1.442-.074-2.24l-7.657-7.67 7.545-7.52c.81-.697.9-1.76.297-2.34-.92-.885-1.85-.338-2.264.078l-7.685 7.667z" fill-rule="evenodd"/></svg>',
    // Todo: simplify direction to 2, use css transform
    left: '<svg viewBox="0 0 44 44"><defs><path id="a" d="M-129-845h24v24h-24z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><g clip-path="url(#b)"><defs><path id="c" d="M-903-949H947V996H-903z"/></defs></g><path d="M16.247 21.4L28.48 9.165l2.12 2.12-10.117 10.12L30.6 31.524l-2.12 2.12-12.233-12.232.007-.006z"/></svg>',
    right: '<svg viewBox="0 0 44 44"><defs><path id="a" d="M-129-845h24v24h-24z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><g clip-path="url(#b)"><defs><path id="c" d="M-903-949H947V996H-903z"/></defs></g><path d="M30.6 21.4L18.37 9.165l-2.12 2.12 10.117 10.12-10.118 10.118 2.12 2.12 12.234-12.232-.005-.006z"/></svg>',
    down: '<svg viewBox="0 0 44 44"><path d="M22.355 28.237l-11.483-10.9c-.607-.576-1.714-.396-2.48.41l.674-.71c-.763.802-.73 2.07-.282 2.496l11.37 10.793-.04.04 2.088 2.195L23.3 31.52l12.308-11.682c.447-.425.48-1.694-.282-2.496l.674.71c-.766-.806-1.873-.986-2.48-.41L22.355 28.237z" fill-rule="evenodd"/></svg>',
    up: '<svg viewBox="0 0 44 44"><path fill="none" d="M-1-1h46v46H-1z"/><defs><path id="a" d="M-129-845h24v24h-24z"/></defs><clipPath id="b"><use xlink:href="#a"/></clipPath><g clip-path="url(#b)"><defs><path id="c" d="M-903-949H947V996H-903z"/></defs></g><path d="M23.417 14.23L11.184 26.46l2.12 2.12 10.12-10.117 10.118 10.118 2.12-2.12L23.43 14.228l-.006.005z"/></svg>',
    loading: '<svg viewBox="0 -2 59.75 60.25"><path fill="#ccc" d="M29.69-.527C14.044-.527 1.36 12.158 1.36 27.806S14.043 56.14 29.69 56.14c15.65 0 28.334-12.686 28.334-28.334S45.34-.527 29.69-.527zm.185 53.75c-14.037 0-25.417-11.38-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.38 25.417 25.417-11.38 25.416-25.417 25.416z"/><path fill="none" stroke="#108ee9" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" d="M56.587 29.766c.37-7.438-1.658-14.7-6.393-19.552"/></svg>',
    search: '<svg viewBox="0 0 44 44"><path d="M32.98 29.255l8.915 8.293L39.603 40l-8.86-8.242a15.952 15.952 0 0 1-10.753 4.147C11.16 35.905 4 28.763 4 19.952 4 11.142 11.16 4 19.99 4s15.99 7.142 15.99 15.952c0 3.472-1.112 6.685-3 9.303zm.05-9.21c0 7.123-5.7 12.918-12.88 12.918-7.176 0-13.015-5.795-13.015-12.918 0-7.12 5.84-12.917 13.017-12.917 7.178 0 12.88 5.797 12.88 12.917z" fill-rule="evenodd"/></svg>',
    ellipsis: '<svg viewBox="0 0 44 44"><circle cx="21.888" cy="22" r="4.045"/><circle cx="5.913" cy="22" r="4.045"/><circle cx="37.863" cy="22" r="4.045"/></svg>',
    'ellipsis-circle': '<svg viewBox="0 0 44 44"><g fill-rule="evenodd"><path d="M22.13.11C10.05.11.255 9.902.255 21.983S10.05 43.86 22.13 43.86s21.875-9.795 21.875-21.876S34.21.11 22.13.11zm0 40.7c-10.396 0-18.825-8.43-18.825-18.826S11.735 3.16 22.13 3.16c10.396 0 18.825 8.428 18.825 18.824S32.525 40.81 22.13 40.81z"/><circle cx="21.888" cy="22.701" r="2.445"/><circle cx="12.23" cy="22.701" r="2.445"/><circle cx="31.546" cy="22.701" r="2.445"/></g></svg>',
    'exclamation-circle': '<svg viewBox="0 0 64 64"><path d="M59.58 40.89L41.193 9.11C39.135 5.382 35.723 3 31.387 3c-3.11 0-6.52 2.382-8.58 6.11L4.42 40.89c-2.788 4.635-3.126 8.81-1.225 12.22C5.015 56.208 7.572 58 13 58h36.773c5.428 0 9.21-1.792 11.03-4.89 1.9-3.41 1.565-7.583-1.224-12.22zm-2.452 11c-.635 1.694-3.802 2.443-7.354 2.443H13c-3.59 0-5.493-.75-6.13-2.444-1.71-2.41-1.374-5.263 0-8.557l18.387-31.777c2.116-3.168 4.394-4.89 6.13-4.89 2.96 0 5.238 1.722 7.354 4.89l18.387 31.777c1.374 3.294 1.713 6.146 0 8.556zm-25.74-33c-.405 0-1.227.835-1.227 2.443v15.89c0 1.608.823 2.444 1.227 2.444 1.628 0 2.452-.836 2.452-2.445v-15.89c0-1.607-.825-2.443-2.453-2.443zm0 23.22c-.405 0-1.227.79-1.227 1.223v2.445c0 .434.823 1.222 1.227 1.222 1.628 0 2.452-.788 2.452-1.222v-2.445c0-.434-.825-1.222-2.453-1.222z" fill-rule="evenodd"/></svg>',
    'info-circle': '<svg viewBox="0 0 44 44"><circle cx="13.828" cy="19.63" r="1.938"/><circle cx="21.767" cy="19.63" r="1.938"/><circle cx="29.767" cy="19.63" r="1.938"/><path d="M22.102 4.16c-9.918 0-17.958 7.147-17.958 15.962 0 4.935 2.522 9.345 6.48 12.273v5.667l.04.012a2.627 2.627 0 1 0 4.5 1.455h.002l5.026-3.54c.628.06 1.265.094 1.91.094 9.92 0 17.96-7.146 17.96-15.96C40.06 11.306 32.02 4.16 22.1 4.16zm-.04 29.902c-.902 0-1.78-.08-2.642-.207l-5.882 4.234c-.024.024-.055.04-.083.06l-.008.005a.51.51 0 0 1-.284.095.525.525 0 0 1-.525-.525l.005-6.375c-3.91-2.516-6.456-6.544-6.456-11.1 0-7.628 7.107-13.812 15.875-13.812s15.875 6.184 15.875 13.812-7.107 13.812-15.875 13.812z"/></svg>',
    'question-circle': '<svg viewBox="0 0 44 44"><g fill-rule="evenodd"><path d="M21.186 3c-10.853 0-19.36 8.506-19.36 19.358C1.827 32.494 10.334 41 21.187 41c10.133 0 18.64-8.506 18.64-18.642C39.827 11.506 31.32 3 21.187 3m15.64 19c0 8.823-7.178 16-16 16s-16-7.177-16-16 7.178-16 16-16 16 7.177 16 16z"/><path d="M22.827 31.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4-15.48c0 .957-.203 1.822-.61 2.593-.427.792-1.117 1.612-2.073 2.457-.867.734-1.453 1.435-1.754 2.096-.302.7-.453 1.693-.453 2.98a.828.828 0 0 1-.823.854.828.828 0 0 1-.584-.22.877.877 0 0 1-.24-.635c0-1.305.168-2.38.506-3.227.336-.883.93-1.682 1.78-2.4 1.01-.883 1.71-1.692 2.1-2.428.336-.645.503-1.38.503-2.21-.02-.935-.3-1.7-.85-2.288-.655-.717-1.62-1.075-2.897-1.075-1.506 0-2.596.535-3.27 1.6-.46.754-.688 1.645-.688 2.677a.92.92 0 0 1-.266.66.747.747 0 0 1-.56.25.73.73 0 0 1-.584-.194c-.16-.164-.24-.393-.24-.69 0-1.82.585-3.272 1.755-4.357C18.645 11.486 19.928 11 21.434 11h.293c1.452 0 2.638.414 3.56 1.24 1.028.903 1.54 2.163 1.54 3.78z"/></g></svg>',
    voice: '<svg viewBox="0 0 38 33"><g fill-rule="evenodd"><path d="M17.838 28.8c-.564-.468-1.192-.983-1.836-1.496-4.244-3.385-5.294-3.67-6.006-3.67-.014 0-.027.005-.04.005-.015 0-.028-.006-.042-.006H3.562c-.734 0-.903-.203-.903-.928v-12.62c0-.49.057-.8.66-.8H9.1c.694 0 1.76-.28 6.4-3.63.83-.596 1.638-1.196 2.337-1.722V28.8zM19.682.19c-.463-.22-1.014-.158-1.417.157-.02.016-1.983 1.552-4.152 3.125C10.34 6.21 9.243 6.664 9.02 6.737H3.676c-.027 0-.053.003-.08.004H1.183c-.608 0-1.1.487-1.1 1.086V25.14c0 .598.492 1.084 1.1 1.084h8.71c.22.08 1.257.55 4.605 3.24 1.947 1.562 3.694 3.088 3.712 3.103.25.22.568.333.89.333.186 0 .373-.038.55-.116.48-.213.79-.684.79-1.204V1.38c0-.506-.294-.968-.758-1.19z" mask="url(#mask-2)"/><path d="M31.42 16.475c0-3.363-1.854-6.297-4.606-7.876-.125-.067-.42-.193-.625-.193-.613 0-1.11.488-1.11 1.09 0 .404.22.764.55.952 2.13 1.19 3.566 3.44 3.566 6.024 0 2.627-1.486 4.913-3.677 6.087-.32.19-.53.54-.53.935 0 .602.495 1.09 1.106 1.09.26.002.568-.15.568-.15 2.835-1.556 4.754-4.538 4.754-7.96" mask="url(#mask-4)"/><path d="M30.14 3.057c-.205-.122-.41-.22-.658-.22-.608 0-1.1.485-1.1 1.084 0 .434.26.78.627.978 4.042 2.323 6.76 6.636 6.76 11.578 0 4.938-2.715 9.248-6.754 11.572-.354.19-.66.55-.66.993 0 .6.494 1.085 1.102 1.085.243 0 .438-.092.65-.213 4.692-2.695 7.848-7.7 7.848-13.435 0-5.723-3.142-10.718-7.817-13.418" mask="url(#mask-6)"/></g></svg>',
    plus: '<svg viewBox="0 0 30 30"><path d="M14 14H0v2h14v14h2V16h14v-2H16V0h-2v14z" fill-rule="evenodd"/></svg>',
    minus: '<svg viewBox="0 0 30 2"><path d="M0 0h30v2H0z" fill-rule="evenodd"/></svg>',
    dislike: '<svg viewBox="0 0 72 72"><g fill="none" fill-rule="evenodd"><path d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36zm0-2c18.778 0 34-15.222 34-34S54.778 2 36 2 2 17.222 2 36s15.222 34 34 34z" fill="#FFF"/><path fill="#FFF" d="M47 22h2v6h-2zm-24 0h2v6h-2z"/><path d="M21 51s4.6-7 15-7 15 7 15 7" stroke="#FFF" stroke-width="2"/></g></svg>',
    fail: '<svg viewBox="0 0 72 72"><g fill="none" fill-rule="evenodd"><path d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36zm0-2c18.778 0 34-15.222 34-34S54.778 2 36 2 2 17.222 2 36s15.222 34 34 34z" fill="#FFF"/><path d="M22 22l28.304 28.304m-28.304 0L50.304 22" stroke="#FFF" stroke-width="2"/></g></svg>',
    success: '<svg viewBox="0 0 72 72"><g fill="none" fill-rule="evenodd"><path d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36zm0-2c18.778 0 34-15.222 34-34S54.778 2 36 2 2 17.222 2 36s15.222 34 34 34z" fill="#FFF"/><path stroke="#FFF" stroke-width="2" d="M19 34.54l11.545 11.923L52.815 24"/></g></svg>'
};
var renderSvgSprite = function renderSvgSprite() {
    var symbols = Object.keys(icons).map(function (iconName) {
        var svgContent = icons[iconName].split('svg')[1];
        return '<symbol id=' + iconName + svgContent + 'symbol>';
    }).join('');
    return svgSprite(symbols);
};
var loadSprite = function loadSprite() {
    if (!document) {
        return;
    }
    var existing = document.getElementById('__ANTD_MOBILE_SVG_SPRITE_NODE__');
    var mountNode = document.body;
    if (!existing) {
        mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite());
    }
};
exports['default'] = loadSprite;
module.exports = exports['default'];

/***/ }),

/***/ 313:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(102);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classnames2 = __webpack_require__(101);

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcNotification = __webpack_require__(315);

var _rmcNotification2 = _interopRequireDefault(_rmcNotification);

var _icon = __webpack_require__(295);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var messageInstance = void 0;
var prefixCls = 'am-toast';
function getMessageInstance(mask, callback) {
    var _classnames;

    if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
    }
    _rmcNotification2['default'].newInstance({
        prefixCls: prefixCls,
        style: {},
        transitionName: 'am-fade',
        className: (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-mask', mask), (0, _defineProperty3['default'])(_classnames, prefixCls + '-nomask', !mask), _classnames))
    }, function (notification) {
        return callback && callback(notification);
    });
}
function notice(content, type) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var _onClose = arguments[3];
    var mask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    var iconTypes = {
        info: '',
        success: 'success',
        fail: 'fail',
        offline: 'dislike',
        loading: 'loading'
    };
    var iconType = iconTypes[type];
    getMessageInstance(mask, function (notification) {
        messageInstance = notification;
        notification.notice({
            duration: duration,
            style: {},
            content: !!iconType ? _react2['default'].createElement(
                'div',
                { className: prefixCls + '-text ' + prefixCls + '-text-icon', role: 'alert', 'aria-live': 'assertive' },
                _react2['default'].createElement(_icon2['default'], { type: iconType, size: 'lg' }),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-text-info' },
                    content
                )
            ) : _react2['default'].createElement(
                'div',
                { className: prefixCls + '-text', role: 'alert', 'aria-live': 'assertive' },
                _react2['default'].createElement(
                    'div',
                    null,
                    content
                )
            ),
            closable: true,
            onClose: function onClose() {
                if (_onClose) {
                    _onClose();
                }
                notification.destroy();
                notification = null;
                messageInstance = null;
            }
        });
    });
}
exports['default'] = {
    SHORT: 3,
    LONG: 8,
    show: function show(content, duration, mask) {
        return notice(content, 'info', duration, function () {}, mask);
    },
    info: function info(content, duration, onClose, mask) {
        return notice(content, 'info', duration, onClose, mask);
    },
    success: function success(content, duration, onClose, mask) {
        return notice(content, 'success', duration, onClose, mask);
    },
    fail: function fail(content, duration, onClose, mask) {
        return notice(content, 'fail', duration, onClose, mask);
    },
    offline: function offline(content, duration, onClose, mask) {
        return notice(content, 'offline', duration, onClose, mask);
    },
    loading: function loading(content, duration, onClose, mask) {
        return notice(content, 'loading', duration, onClose, mask);
    },
    hide: function hide() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
module.exports = exports['default'];

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(280);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(102);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(100);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(30);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(32);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(33);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external__React_ = __webpack_require__(4);
var external__React__default = /*#__PURE__*/__webpack_require__.n(external__React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(6);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: external "ReactDOM"
var external__ReactDOM_ = __webpack_require__(42);
var external__ReactDOM__default = /*#__PURE__*/__webpack_require__.n(external__ReactDOM_);

// EXTERNAL MODULE: ./node_modules/rc-animate/es/Animate.js + 3 modules
var Animate = __webpack_require__(294);

// CONCATENATED MODULE: ./node_modules/rc-util/es/createChainedFunction.js
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @returns {function|null}
 */
function createChainedFunction() {
  var args = [].slice.call(arguments, 0);
  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (var i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(101);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/rmc-notification/es/Notice.js









var Notice_Notice = function (_Component) {
  inherits_default()(Notice, _Component);

  function Notice() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck_default()(this, Notice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, (_ref = Notice.__proto__ || Object.getPrototypeOf(Notice)).call.apply(_ref, [this].concat(args))), _this), _this.close = function () {
      _this.clearCloseTimer();
      _this.props.onClose();
    }, _this.startCloseTimer = function () {
      if (_this.props.duration) {
        _this.closeTimer = setTimeout(function () {
          _this.close();
        }, _this.props.duration * 1000);
      }
    }, _this.clearCloseTimer = function () {
      if (_this.closeTimer) {
        clearTimeout(_this.closeTimer);
        _this.closeTimer = null;
      }
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
  }

  createClass_default()(Notice, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startCloseTimer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearCloseTimer();
    }
  }, {
    key: 'render',
    value: function render() {
      var _className;

      var props = this.props;
      var componentClass = props.prefixCls + '-notice';
      var className = (_className = {}, defineProperty_default()(_className, '' + componentClass, 1), defineProperty_default()(_className, componentClass + '-closable', props.closable), defineProperty_default()(_className, props.className, !!props.className), _className);
      return external__React__default.a.createElement(
        'div',
        { className: classnames_default()(className), style: props.style },
        external__React__default.a.createElement(
          'div',
          { className: componentClass + '-content' },
          props.children
        ),
        props.closable ? external__React__default.a.createElement(
          'a',
          { tabIndex: '0', onClick: this.close, className: componentClass + '-close' },
          external__React__default.a.createElement('span', { className: componentClass + '-close-x' })
        ) : null
      );
    }
  }]);

  return Notice;
}(external__React_["Component"]);

Notice_Notice.propTypes = {
  duration: prop_types_default.a.number,
  onClose: prop_types_default.a.func,
  children: prop_types_default.a.any
};
Notice_Notice.defaultProps = {
  onEnd: function onEnd() {},
  onClose: function onClose() {},

  duration: 1.5,
  style: {
    right: '50%'
  }
};
/* harmony default export */ var es_Notice = (Notice_Notice);
// CONCATENATED MODULE: ./node_modules/rmc-notification/es/Notification.js















var seed = 0;
var now = Date.now();

function getUuid() {
  return 'rcNotification_' + now + '_' + seed++;
}

var Notification_Notification = function (_Component) {
  inherits_default()(Notification, _Component);

  function Notification() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck_default()(this, Notification);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, (_ref = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      notices: []
    }, _this.add = function (notice) {
      var key = notice.key = notice.key || getUuid();
      _this.setState(function (previousState) {
        var notices = previousState.notices;
        if (!notices.filter(function (v) {
          return v.key === key;
        }).length) {
          return {
            notices: notices.concat(notice)
          };
        }
      });
    }, _this.remove = function (key) {
      _this.setState(function (previousState) {
        return {
          notices: previousState.notices.filter(function (notice) {
            return notice.key !== key;
          })
        };
      });
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
  }

  createClass_default()(Notification, [{
    key: 'getTransitionName',
    value: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _className;

      var props = this.props;
      var noticeNodes = this.state.notices.map(function (notice) {
        var onClose = createChainedFunction(_this2.remove.bind(_this2, notice.key), notice.onClose);
        return external__React__default.a.createElement(
          es_Notice,
          extends_default()({
            prefixCls: props.prefixCls
          }, notice, {
            onClose: onClose
          }),
          notice.content
        );
      });
      var className = (_className = {}, defineProperty_default()(_className, props.prefixCls, 1), defineProperty_default()(_className, props.className, !!props.className), _className);
      return external__React__default.a.createElement(
        'div',
        { className: classnames_default()(className), style: props.style },
        external__React__default.a.createElement(
          Animate["a" /* default */],
          { transitionName: this.getTransitionName() },
          noticeNodes
        )
      );
    }
  }]);

  return Notification;
}(external__React_["Component"]);

Notification_Notification.propTypes = {
  prefixCls: prop_types_default.a.string,
  transitionName: prop_types_default.a.string,
  animation: prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.object]),
  style: prop_types_default.a.object
};
Notification_Notification.defaultProps = {
  prefixCls: 'rmc-notification',
  animation: 'fade',
  style: {
    top: 65,
    left: '50%'
  }
};


Notification_Notification.newInstance = function newNotificationInstance(properties, callback) {
  var _ref2 = properties || {},
      getContainer = _ref2.getContainer,
      props = objectWithoutProperties_default()(_ref2, ['getContainer']);

  var div = void 0;
  if (getContainer) {
    div = getContainer();
  } else {
    div = document.createElement('div');
    document.body.appendChild(div);
  }
  var called = false;
  function ref(notification) {
    if (called) {
      return;
    }
    called = true;
    callback({
      notice: function notice(noticeProps) {
        notification.add(noticeProps);
      },
      removeNotice: function removeNotice(key) {
        notification.remove(key);
      },

      component: notification,
      destroy: function destroy() {
        external__ReactDOM__default.a.unmountComponentAtNode(div);
        if (!getContainer) {
          document.body.removeChild(div);
        }
      }
    });
  }
  external__ReactDOM__default.a.render(external__React__default.a.createElement(Notification_Notification, extends_default()({}, props, { ref: ref })), div);
};

/* harmony default export */ var es_Notification = (Notification_Notification);
// CONCATENATED MODULE: ./node_modules/rmc-notification/es/index.js

/* harmony default export */ var es = __webpack_exports__["default"] = (es_Notification);

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(296);

__webpack_require__(317);

/***/ }),

/***/ 317:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Brief = undefined;

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(102);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames5 = __webpack_require__(101);

var _classnames6 = _interopRequireDefault(_classnames5);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcFeedback = __webpack_require__(284);

var _rmcFeedback2 = _interopRequireDefault(_rmcFeedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
/* tslint:disable:jsx-no-multiline-js */

var Brief = exports.Brief = function (_React$Component) {
    (0, _inherits3['default'])(Brief, _React$Component);

    function Brief() {
        (0, _classCallCheck3['default'])(this, Brief);
        return (0, _possibleConstructorReturn3['default'])(this, (Brief.__proto__ || Object.getPrototypeOf(Brief)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Brief, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                { className: 'am-list-brief', style: this.props.style },
                this.props.children
            );
        }
    }]);
    return Brief;
}(_react2['default'].Component);

var ListItem = function (_React$Component2) {
    (0, _inherits3['default'])(ListItem, _React$Component2);

    function ListItem(props) {
        (0, _classCallCheck3['default'])(this, ListItem);

        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

        _this2.onClick = function (ev) {
            var _this2$props = _this2.props,
                onClick = _this2$props.onClick,
                platform = _this2$props.platform;

            var isAndroid = platform === 'android';
            if (!!onClick && isAndroid) {
                if (_this2.debounceTimeout) {
                    clearTimeout(_this2.debounceTimeout);
                    _this2.debounceTimeout = null;
                }
                var Item = ev.currentTarget;
                var RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
                var ClientRect = ev.currentTarget.getBoundingClientRect();
                var pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
                var pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
                var coverRippleStyle = {
                    width: RippleWidth + 'px',
                    height: RippleWidth + 'px',
                    left: pointX + 'px',
                    top: pointY + 'px'
                };
                _this2.setState({
                    coverRippleStyle: coverRippleStyle,
                    RippleClicked: true
                }, function () {
                    _this2.debounceTimeout = setTimeout(function () {
                        _this2.setState({
                            coverRippleStyle: { display: 'none' },
                            RippleClicked: false
                        });
                    }, 1000);
                });
            }
            if (onClick) {
                onClick(ev);
            }
        };
        _this2.state = {
            coverRippleStyle: { display: 'none' },
            RippleClicked: false
        };
        return _this2;
    }

    (0, _createClass3['default'])(ListItem, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classnames,
                _classnames3,
                _classnames4,
                _this3 = this;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                className = _a.className,
                activeStyle = _a.activeStyle,
                error = _a.error,
                align = _a.align,
                wrap = _a.wrap,
                disabled = _a.disabled,
                children = _a.children,
                multipleLine = _a.multipleLine,
                thumb = _a.thumb,
                extra = _a.extra,
                arrow = _a.arrow,
                onClick = _a.onClick,
                restProps = __rest(_a, ["prefixCls", "className", "activeStyle", "error", "align", "wrap", "disabled", "children", "multipleLine", "thumb", "extra", "arrow", "onClick"]);var platform = restProps.platform,
                otherProps = __rest(restProps, ["platform"]);var _state = this.state,
                coverRippleStyle = _state.coverRippleStyle,
                RippleClicked = _state.RippleClicked;

            var wrapCls = (0, _classnames6['default'])(prefixCls + '-item', className, (_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-item-disabled', disabled), (0, _defineProperty3['default'])(_classnames, prefixCls + '-item-error', error), (0, _defineProperty3['default'])(_classnames, prefixCls + '-item-top', align === 'top'), (0, _defineProperty3['default'])(_classnames, prefixCls + '-item-middle', align === 'middle'), (0, _defineProperty3['default'])(_classnames, prefixCls + '-item-bottom', align === 'bottom'), _classnames));
            var rippleCls = (0, _classnames6['default'])(prefixCls + '-ripple', (0, _defineProperty3['default'])({}, prefixCls + '-ripple-animate', RippleClicked));
            var lineCls = (0, _classnames6['default'])(prefixCls + '-line', (_classnames3 = {}, (0, _defineProperty3['default'])(_classnames3, prefixCls + '-line-multiple', multipleLine), (0, _defineProperty3['default'])(_classnames3, prefixCls + '-line-wrap', wrap), _classnames3));
            var arrowCls = (0, _classnames6['default'])(prefixCls + '-arrow', (_classnames4 = {}, (0, _defineProperty3['default'])(_classnames4, prefixCls + '-arrow-horizontal', arrow === 'horizontal'), (0, _defineProperty3['default'])(_classnames4, prefixCls + '-arrow-vertical', arrow === 'down' || arrow === 'up'), (0, _defineProperty3['default'])(_classnames4, prefixCls + '-arrow-vertical-up', arrow === 'up'), _classnames4));
            var content = _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, otherProps, { onClick: function onClick(ev) {
                        _this3.onClick(ev);
                    }, className: wrapCls }),
                thumb ? _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-thumb' },
                    typeof thumb === 'string' ? _react2['default'].createElement('img', { src: thumb }) : thumb
                ) : null,
                _react2['default'].createElement(
                    'div',
                    { className: lineCls },
                    children !== undefined && _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-content' },
                        children
                    ),
                    extra !== undefined && _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-extra' },
                        extra
                    ),
                    arrow && _react2['default'].createElement('div', { className: arrowCls, 'aria-hidden': 'true' })
                ),
                _react2['default'].createElement('div', { style: coverRippleStyle, className: rippleCls })
            );
            var touchProps = {};
            Object.keys(otherProps).forEach(function (key) {
                if (/onTouch/i.test(key)) {
                    touchProps[key] = otherProps[key];
                    delete otherProps[key];
                }
            });
            return _react2['default'].createElement(
                _rmcFeedback2['default'],
                (0, _extends3['default'])({}, touchProps, { disabled: disabled || !onClick, activeStyle: activeStyle, activeClassName: prefixCls + '-item-active' }),
                content
            );
        }
    }]);
    return ListItem;
}(_react2['default'].Component);

ListItem.defaultProps = {
    prefixCls: 'am-list',
    align: 'middle',
    error: false,
    multipleLine: false,
    wrap: false,
    platform: 'ios'
};
ListItem.Brief = Brief;
exports['default'] = ListItem;

/***/ }),

/***/ 319:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(100);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(280);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(30);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(32);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(33);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external__React_ = __webpack_require__(4);
var external__React__default = /*#__PURE__*/__webpack_require__.n(external__React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(6);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: external "ReactDOM"
var external__ReactDOM_ = __webpack_require__(42);
var external__ReactDOM__default = /*#__PURE__*/__webpack_require__.n(external__ReactDOM_);

// EXTERNAL MODULE: ./node_modules/fbjs/lib/invariant.js
var invariant = __webpack_require__(66);
var invariant_default = /*#__PURE__*/__webpack_require__.n(invariant);

// EXTERNAL MODULE: ./node_modules/fbjs/lib/isEmpty.js
var isEmpty = __webpack_require__(367);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);

// EXTERNAL MODULE: ./node_modules/warning/browser.js
var browser = __webpack_require__(9);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./node_modules/rmc-list-view/es/ListViewDataSource.js






function defaultGetRowData(dataBlob, sectionID, rowID) {
  return dataBlob[sectionID][rowID];
}

function defaultGetSectionHeaderData(dataBlob, sectionID) {
  return dataBlob[sectionID];
}

// type differType = (data1, data2) => bool;
//
// type ParamType = {
//   rowHasChanged: differType;
//   getRowData: ?typeof defaultGetRowData;
//   sectionHeaderHasChanged: ?differType;
//   getSectionHeaderData: ?typeof defaultGetSectionHeaderData;
// }

/**
 * Provides efficient data processing and access to the
 * `ListView` component.  A `ListViewDataSource` is created with functions for
 * extracting data from the input blob, and comparing elements (with default
 * implementations for convenience).  The input blob can be as simple as an
 * array of strings, or an object with rows nested inside section objects.
 *
 * To update the data in the datasource, use `cloneWithRows` (or
 * `cloneWithRowsAndSections` if you care about sections).  The data in the
 * data source is immutable, so you can't modify it directly.  The clone methods
 * suck in the new data and compute a diff for each row so ListView knows
 * whether to re-render it or not.
 *
 * In this example, a component receives data in chunks, handled by
 * `_onDataArrived`, which concats the new data onto the old data and updates the
 * data source.  We use `concat` to create a new array - mutating `this._data`,
 * e.g. with `this._data.push(newRowData)`, would be an error. `_rowHasChanged`
 * understands the shape of the row data and knows how to efficiently compare
 * it.
 *
 * ```
 * getInitialState: function() {
 *   var ds = new ListViewDataSource({rowHasChanged: this._rowHasChanged});
 *   return {ds};
 * },
 * _onDataArrived(newData) {
 *   this._data = this._data.concat(newData);
 *   this.setState({
 *     ds: this.state.ds.cloneWithRows(this._data)
 *   });
 * }
 * ```
 */

var ListViewDataSource_ListViewDataSource = function () {

  /**
   * You can provide custom extraction and `hasChanged` functions for section
   * headers and rows.  If absent, data will be extracted with the
   * `defaultGetRowData` and `defaultGetSectionHeaderData` functions.
   *
   * The default extractor expects data of one of the following forms:
   *
   *      { sectionID_1: { rowID_1: <rowData1>, ... }, ... }
   *
   *    or
   *
   *      { sectionID_1: [ <rowData1>, <rowData2>, ... ], ... }
   *
   *    or
   *
   *      [ [ <rowData1>, <rowData2>, ... ], ... ]
   *
   * The constructor takes in a params argument that can contain any of the
   * following:
   *
   * - getRowData(dataBlob, sectionID, rowID);
   * - getSectionHeaderData(dataBlob, sectionID);
   * - rowHasChanged(prevRowData, nextRowData);
   * - sectionHeaderHasChanged(prevSectionData, nextSectionData);
   */
  function ListViewDataSource(params) {
    classCallCheck_default()(this, ListViewDataSource);

    invariant_default()(params && typeof params.rowHasChanged === 'function', 'Must provide a rowHasChanged function.');
    this._rowHasChanged = params.rowHasChanged;
    this._getRowData = params.getRowData || defaultGetRowData;
    this._sectionHeaderHasChanged = params.sectionHeaderHasChanged;
    this._getSectionHeaderData = params.getSectionHeaderData || defaultGetSectionHeaderData;

    this._dataBlob = null;
    this._dirtyRows = [];
    this._dirtySections = [];
    this._cachedRowCount = 0;

    // These two private variables are accessed by outsiders because ListView
    // uses them to iterate over the data in this class.
    this.rowIdentities = [];
    this.sectionIdentities = [];
  }

  /**
   * Clones this `ListViewDataSource` with the specified `dataBlob` and
   * `rowIdentities`. The `dataBlob` is just an arbitrary blob of data. At
   * construction an extractor to get the interesting information was defined
   * (or the default was used).
   *
   * The `rowIdentities` is is a 2D array of identifiers for rows.
   * ie. [['a1', 'a2'], ['b1', 'b2', 'b3'], ...].  If not provided, it's
   * assumed that the keys of the section data are the row identities.
   *
   * Note: This function does NOT clone the data in this data source. It simply
   * passes the functions defined at construction to a new data source with
   * the data specified. If you wish to maintain the existing data you must
   * handle merging of old and new data separately and then pass that into
   * this function as the `dataBlob`.
   */


  createClass_default()(ListViewDataSource, [{
    key: 'cloneWithRows',
    value: function cloneWithRows(dataBlob, rowIdentities) {
      var rowIds = rowIdentities ? [rowIdentities] : null;
      if (!this._sectionHeaderHasChanged) {
        this._sectionHeaderHasChanged = function () {
          return false;
        };
      }
      return this.cloneWithRowsAndSections({ s1: dataBlob }, ['s1'], rowIds);
    }

    /**
     * This performs the same function as the `cloneWithRows` function but here
     * you also specify what your `sectionIdentities` are. If you don't care
     * about sections you should safely be able to use `cloneWithRows`.
     *
     * `sectionIdentities` is an array of identifiers for  sections.
     * ie. ['s1', 's2', ...].  If not provided, it's assumed that the
     * keys of dataBlob are the section identities.
     *
     * Note: this returns a new object!
     */

  }, {
    key: 'cloneWithRowsAndSections',
    value: function cloneWithRowsAndSections(dataBlob, sectionIdentities, rowIdentities) {
      invariant_default()(typeof this._sectionHeaderHasChanged === 'function', 'Must provide a sectionHeaderHasChanged function with section data.');
      invariant_default()(!sectionIdentities || !rowIdentities || sectionIdentities.length === rowIdentities.length, 'row and section ids lengths must be the same');

      var newSource = new ListViewDataSource({
        getRowData: this._getRowData,
        getSectionHeaderData: this._getSectionHeaderData,
        rowHasChanged: this._rowHasChanged,
        sectionHeaderHasChanged: this._sectionHeaderHasChanged
      });
      newSource._dataBlob = dataBlob;
      if (sectionIdentities) {
        newSource.sectionIdentities = sectionIdentities;
      } else {
        newSource.sectionIdentities = Object.keys(dataBlob);
      }
      if (rowIdentities) {
        newSource.rowIdentities = rowIdentities;
      } else {
        newSource.rowIdentities = [];
        newSource.sectionIdentities.forEach(function (sectionID) {
          newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]));
        });
      }
      newSource._cachedRowCount = countRows(newSource.rowIdentities);

      newSource._calculateDirtyArrays(this._dataBlob, this.sectionIdentities, this.rowIdentities);

      return newSource;
    }
  }, {
    key: 'getRowCount',
    value: function getRowCount() {
      return this._cachedRowCount;
    }
  }, {
    key: 'getRowAndSectionCount',
    value: function getRowAndSectionCount() {
      return this._cachedRowCount + this.sectionIdentities.length;
    }

    /**
     * Returns if the row is dirtied and needs to be rerendered
     */

  }, {
    key: 'rowShouldUpdate',
    value: function rowShouldUpdate(sectionIndex, rowIndex) {
      var needsUpdate = this._dirtyRows[sectionIndex][rowIndex];
      browser_default()(needsUpdate !== undefined, 'missing dirtyBit for section, row: ' + sectionIndex + ', ' + rowIndex);
      return needsUpdate;
    }

    /**
     * Gets the data required to render the row.
     */

  }, {
    key: 'getRowData',
    value: function getRowData(sectionIndex, rowIndex) {
      var sectionID = this.sectionIdentities[sectionIndex];
      var rowID = this.rowIdentities[sectionIndex][rowIndex];
      browser_default()(sectionID !== undefined && rowID !== undefined, 'rendering invalid section, row: ' + sectionIndex + ', ' + rowIndex);
      return this._getRowData(this._dataBlob, sectionID, rowID);
    }

    /**
     * Gets the rowID at index provided if the dataSource arrays were flattened,
     * or null of out of range indexes.
     */

  }, {
    key: 'getRowIDForFlatIndex',
    value: function getRowIDForFlatIndex(index) {
      var accessIndex = index;
      for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
        if (accessIndex >= this.rowIdentities[ii].length) {
          accessIndex -= this.rowIdentities[ii].length;
        } else {
          return this.rowIdentities[ii][accessIndex];
        }
      }
      return null;
    }

    /**
     * Gets the sectionID at index provided if the dataSource arrays were flattened,
     * or null for out of range indexes.
     */

  }, {
    key: 'getSectionIDForFlatIndex',
    value: function getSectionIDForFlatIndex(index) {
      var accessIndex = index;
      for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
        if (accessIndex >= this.rowIdentities[ii].length) {
          accessIndex -= this.rowIdentities[ii].length;
        } else {
          return this.sectionIdentities[ii];
        }
      }
      return null;
    }

    /**
     * Returns an array containing the number of rows in each section
     */

  }, {
    key: 'getSectionLengths',
    value: function getSectionLengths() {
      var results = [];
      for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
        results.push(this.rowIdentities[ii].length);
      }
      return results;
    }

    /**
     * Returns if the section header is dirtied and needs to be rerendered
     */

  }, {
    key: 'sectionHeaderShouldUpdate',
    value: function sectionHeaderShouldUpdate(sectionIndex) {
      var needsUpdate = this._dirtySections[sectionIndex];
      browser_default()(needsUpdate !== undefined, 'missing dirtyBit for section: ' + sectionIndex);
      return needsUpdate;
    }

    /**
     * Gets the data required to render the section header
     */

  }, {
    key: 'getSectionHeaderData',
    value: function getSectionHeaderData(sectionIndex) {
      if (!this._getSectionHeaderData) {
        return null;
      }
      var sectionID = this.sectionIdentities[sectionIndex];
      browser_default()(sectionID !== undefined, 'renderSection called on invalid section: ' + sectionIndex);
      return this._getSectionHeaderData(this._dataBlob, sectionID);
    }

    /**
     * Private members and methods.
     */

    // These two 'protected' variables are accessed by ListView to iterate over
    // the data in this class.

  }, {
    key: '_calculateDirtyArrays',
    value: function _calculateDirtyArrays(prevDataBlob, prevSectionIDs, prevRowIDs) {
      // construct a hashmap of the existing (old) id arrays
      var prevSectionsHash = keyedDictionaryFromArray(prevSectionIDs);
      var prevRowsHash = {};
      for (var ii = 0; ii < prevRowIDs.length; ii++) {
        var sectionID = prevSectionIDs[ii];
        browser_default()(!prevRowsHash[sectionID], 'SectionID appears more than once: ' + sectionID);
        prevRowsHash[sectionID] = keyedDictionaryFromArray(prevRowIDs[ii]);
      }

      // compare the 2 identity array and get the dirtied rows
      this._dirtySections = [];
      this._dirtyRows = [];

      var dirty;
      for (var sIndex = 0; sIndex < this.sectionIdentities.length; sIndex++) {
        var sectionID = this.sectionIdentities[sIndex];
        // dirty if the sectionHeader is new or _sectionHasChanged is true
        dirty = !prevSectionsHash[sectionID];
        var sectionHeaderHasChanged = this._sectionHeaderHasChanged;
        if (!dirty && sectionHeaderHasChanged) {
          dirty = sectionHeaderHasChanged(this._getSectionHeaderData(prevDataBlob, sectionID), this._getSectionHeaderData(this._dataBlob, sectionID));
        }
        this._dirtySections.push(!!dirty);

        this._dirtyRows[sIndex] = [];
        for (var rIndex = 0; rIndex < this.rowIdentities[sIndex].length; rIndex++) {
          var rowID = this.rowIdentities[sIndex][rIndex];
          // dirty if the section is new, row is new or _rowHasChanged is true
          dirty = !prevSectionsHash[sectionID] || !prevRowsHash[sectionID][rowID] || this._rowHasChanged(this._getRowData(prevDataBlob, sectionID, rowID), this._getRowData(this._dataBlob, sectionID, rowID));
          this._dirtyRows[sIndex].push(!!dirty);
        }
      }
    }
  }]);

  return ListViewDataSource;
}();

function countRows(allRowIDs) {
  var totalRows = 0;
  for (var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
    var rowIDs = allRowIDs[sectionIdx];
    totalRows += rowIDs.length;
  }
  return totalRows;
}

function keyedDictionaryFromArray(arr) {
  if (isEmpty_default()(arr)) {
    return {};
  }
  var result = {};
  for (var ii = 0; ii < arr.length; ii++) {
    var key = arr[ii];
    browser_default()(!result[key], 'Value appears more than once in array: ' + key);
    result[key] = true;
  }
  return result;
}

// module.exports = ListViewDataSource;
/* harmony default export */ var es_ListViewDataSource = (ListViewDataSource_ListViewDataSource);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(101);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/rmc-list-view/es/util.js
function getOffsetTop(elem) {
  var offsetTop = 0;
  /* eslint no-cond-assign: 0 */
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while (elem = elem.offsetParent);
  return offsetTop;
}

function _event(e) {
  if (e.touches && e.touches.length) {
    return e.touches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function throttle(fn, delay) {
  var delayFlag = true;
  var firstInvoke = true;
  // console.log('exec once');
  return function _throttle(e) {
    if (delayFlag) {
      delayFlag = false;
      setTimeout(function () {
        delayFlag = true;
        // console.log('exec delay time');
        fn(e);
      }, delay);
      if (firstInvoke) {
        // console.log('first invoke');
        fn(e);
        firstInvoke = false;
      }
    }
  };
}

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

function setTransformOrigin(nodeStyle, value) {
  nodeStyle.transformOrigin = value;
  nodeStyle.webkitTransformOrigin = value;
  nodeStyle.MozTransformOrigin = value;
}
// CONCATENATED MODULE: ./node_modules/rmc-list-view/es/ScrollView.js










// const SCROLLVIEW = 'ScrollViewRef';
// const INNERVIEW = 'InnerScrollViewRef';

// https://github.com/facebook/react-native/blob/0.26-stable/Libraries/Components/ScrollView/ScrollView.js

/* eslint react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */

var propTypes = {
  className: prop_types_default.a.string,
  prefixCls: prop_types_default.a.string,
  listPrefixCls: prop_types_default.a.string,
  listViewPrefixCls: prop_types_default.a.string,
  style: prop_types_default.a.object,
  contentContainerStyle: prop_types_default.a.object,
  onScroll: prop_types_default.a.func
};

var ScrollView_ScrollView = function (_React$Component) {
  inherits_default()(ScrollView, _React$Component);

  function ScrollView() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck_default()(this, ScrollView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, (_ref = ScrollView.__proto__ || Object.getPrototypeOf(ScrollView)).call.apply(_ref, [this].concat(args))), _this), ScrollView__initialiseProps.call(_this), _temp), possibleConstructorReturn_default()(_this, _ret);
  }

  createClass_default()(ScrollView, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      // https://github.com/ant-design/ant-design-mobile/issues/1480
      // https://stackoverflow.com/questions/1386696/make-scrollleft-scrolltop-changes-not-trigger-scroll-event
      // 问题情景：用户滚动内容后，改变 dataSource 触发 ListView componentWillReceiveProps
      // 内容变化后 scrollTop 如果改变、会自动触发 scroll 事件，而此事件应该避免被执行
      if ((this.props.dataSource !== nextProps.dataSource || this.props.initialListSize !== nextProps.initialListSize) && this.handleScroll) {
        // console.log('componentWillUpdate');
        if (this.props.useBodyScroll) {
          window.removeEventListener('scroll', this.handleScroll);
        } else {
          this.ScrollViewRef.removeEventListener('scroll', this.handleScroll);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      // handle componentWillUpdate accordingly
      if ((this.props.dataSource !== prevProps.dataSource || this.props.initialListSize !== prevProps.initialListSize) && this.handleScroll) {
        setTimeout(function () {
          if (_this2.props.useBodyScroll) {
            window.addEventListener('scroll', _this2.handleScroll);
          } else {
            _this2.ScrollViewRef.addEventListener('scroll', _this2.handleScroll);
          }
        }, 0);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var handleScroll = function handleScroll(e) {
        return _this3.props.onScroll && _this3.props.onScroll(e, _this3.getMetrics());
      };
      if (this.props.scrollEventThrottle) {
        handleScroll = throttle(handleScroll, this.props.scrollEventThrottle);
      }
      this.handleScroll = handleScroll;

      // IE supports onresize on all HTML elements.
      // In all other Browsers the onresize is only available at the window object
      this.onLayout = function () {
        return _this3.props.onLayout({
          nativeEvent: { layout: { width: window.innerWidth, height: window.innerHeight } }
        });
      };

      if (this.props.useBodyScroll) {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.onLayout);
      } else {
        this.ScrollViewRef.addEventListener('scroll', this.handleScroll);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.useBodyScroll) {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.onLayout);
      } else {
        this.ScrollViewRef.removeEventListener('scroll', this.handleScroll);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          prefixCls = _props.prefixCls,
          listPrefixCls = _props.listPrefixCls,
          listViewPrefixCls = _props.listViewPrefixCls,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          _props$contentContain = _props.contentContainerStyle,
          contentContainerStyle = _props$contentContain === undefined ? {} : _props$contentContain,
          useBodyScroll = _props.useBodyScroll,
          pullToRefresh = _props.pullToRefresh;


      var styleBase = {
        position: 'relative',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      };
      var preCls = prefixCls || listViewPrefixCls || '';

      var containerProps = {
        ref: function ref(el) {
          return _this4.ScrollViewRef = el || _this4.ScrollViewRef;
        },
        style: extends_default()({}, useBodyScroll ? {} : styleBase, style),
        className: classnames_default()(className, preCls + '-scrollview')
      };
      var contentContainerProps = {
        ref: function ref(el) {
          return _this4.InnerScrollViewRef = el;
        },
        style: extends_default()({ position: 'absolute', minWidth: '100%' }, contentContainerStyle),
        className: classnames_default()(preCls + '-scrollview-content', listPrefixCls)
      };

      var clonePullToRefresh = function clonePullToRefresh(isBody) {
        return external__React__default.a.cloneElement(pullToRefresh, {
          getScrollContainer: isBody ? function () {
            return document.body;
          } : function () {
            return _this4.ScrollViewRef;
          }
        }, children);
      };

      if (useBodyScroll) {
        if (pullToRefresh) {
          return external__React__default.a.createElement(
            'div',
            containerProps,
            clonePullToRefresh(true)
          );
        }
        return external__React__default.a.createElement(
          'div',
          containerProps,
          children
        );
      }

      if (pullToRefresh) {
        return external__React__default.a.createElement(
          'div',
          containerProps,
          external__React__default.a.createElement(
            'div',
            contentContainerProps,
            clonePullToRefresh()
          )
        );
      }

      return external__React__default.a.createElement(
        'div',
        containerProps,
        external__React__default.a.createElement(
          'div',
          contentContainerProps,
          children
        )
      );
    }
  }]);

  return ScrollView;
}(external__React__default.a.Component);

ScrollView_ScrollView.propTypes = propTypes;

var ScrollView__initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.getMetrics = function () {
    var isVertical = !_this5.props.horizontal;
    if (_this5.props.useBodyScroll) {
      // In chrome61 `document.body.scrollTop` is invalid,
      // and add new `document.scrollingElement`(chrome61, iOS support).
      // In old-android-browser and iOS `document.documentElement.scrollTop` is invalid.
      var scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
      // todos: Why sometimes do not have `this.ScrollViewRef` ?
      return {
        visibleLength: window[isVertical ? 'innerHeight' : 'innerWidth'],
        contentLength: _this5.ScrollViewRef ? _this5.ScrollViewRef[isVertical ? 'scrollHeight' : 'scrollWidth'] : 0,
        offset: scrollNode[isVertical ? 'scrollTop' : 'scrollLeft']
      };
    }
    return {
      visibleLength: _this5.ScrollViewRef[isVertical ? 'offsetHeight' : 'offsetWidth'],
      contentLength: _this5.ScrollViewRef[isVertical ? 'scrollHeight' : 'scrollWidth'],
      offset: _this5.ScrollViewRef[isVertical ? 'scrollTop' : 'scrollLeft']
    };
  };

  this.getInnerViewNode = function () {
    return _this5.InnerScrollViewRef;
  };

  this.scrollTo = function () {
    if (_this5.props.useBodyScroll) {
      var _window;

      (_window = window).scrollTo.apply(_window, arguments);
    } else {
      _this5.ScrollViewRef.scrollLeft = arguments.length <= 0 ? undefined : arguments[0];
      _this5.ScrollViewRef.scrollTop = arguments.length <= 1 ? undefined : arguments[1];
    }
  };
};

/* harmony default export */ var es_ScrollView = (ScrollView_ScrollView);
// CONCATENATED MODULE: ./node_modules/rmc-list-view/es/ListView.js






/* eslint no-unused-vars: 0, react/no-multi-comp: 0
react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */






var DEFAULT_PAGE_SIZE = 1;
var DEFAULT_INITIAL_ROWS = 10;
var DEFAULT_SCROLL_RENDER_AHEAD = 1000;
var DEFAULT_END_REACHED_THRESHOLD = 1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
// const SCROLLVIEW_REF = 'ListViewRef';

var ListView_StaticRenderer = function (_React$Component) {
  inherits_default()(StaticRenderer, _React$Component);

  function StaticRenderer() {
    classCallCheck_default()(this, StaticRenderer);

    return possibleConstructorReturn_default()(this, (StaticRenderer.__proto__ || Object.getPrototypeOf(StaticRenderer)).apply(this, arguments));
  }

  createClass_default()(StaticRenderer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.shouldUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.render();
    }
  }]);

  return StaticRenderer;
}(external__React__default.a.Component);
// https://github.com/facebook/react-native/blob/0.26-stable/Libraries/CustomComponents/ListView/ListView.js


var ListView_ListView = function (_React$Component2) {
  inherits_default()(ListView, _React$Component2);

  function ListView() {
    var _ref;

    var _temp, _this2, _ret;

    classCallCheck_default()(this, ListView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = possibleConstructorReturn_default()(this, (_ref = ListView.__proto__ || Object.getPrototypeOf(ListView)).call.apply(_ref, [this].concat(args))), _this2), ListView__initialiseProps.call(_this2), _temp), possibleConstructorReturn_default()(_this2, _ret);
  }

  /**
   * Exports some data, e.g. for perf investigations or analytics.
   */


  createClass_default()(ListView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // this data should never trigger a render pass, so don't put in state
      this.scrollProperties = {
        visibleLength: null,
        contentLength: null,
        offset: 0
      };
      this._childFrames = [];
      this._visibleRows = {};
      this._prevRenderedRowsCount = 0;
      this._sentEndForContentLength = null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (this.props.dataSource !== nextProps.dataSource || this.props.initialListSize !== nextProps.initialListSize) {
        this.setState(function (state, props) {
          _this3._prevRenderedRowsCount = 0;
          return {
            curRenderedRowsCount: Math.min(Math.max(state.curRenderedRowsCount, nextProps.initialListSize // for preact
            ), nextProps.dataSource.getRowCount() // for preact
            )
          };
        }, function () {
          return _this3._renderMoreRowsIfNeeded();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var dataSource = this.props.dataSource;
      var allRowIDs = dataSource.rowIdentities;
      var bodyComponents = [];
      var rowCount = 0;

      for (var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
        var sectionID = dataSource.sectionIdentities[sectionIdx];
        var rowIDs = allRowIDs[sectionIdx];
        if (rowIDs.length === 0) {
          continue;
        }

        var renderSectionHeader = void 0;
        if (this.props.renderSectionHeader) {
          var shouldUpdateHeader = rowCount >= this._prevRenderedRowsCount && dataSource.sectionHeaderShouldUpdate(sectionIdx);

          renderSectionHeader = external__React__default.a.createElement(ListView_StaticRenderer, {
            key: 's_' + sectionID,
            shouldUpdate: !!shouldUpdateHeader,
            render: this.props.renderSectionHeader.bind(null, dataSource.getSectionHeaderData(sectionIdx), sectionID)
          });
        }

        var sectionBody = [];
        for (var rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
          var rowID = rowIDs[rowIdx];
          var comboID = sectionID + '_' + rowID;
          var shouldUpdateRow = rowCount >= this._prevRenderedRowsCount && dataSource.rowShouldUpdate(sectionIdx, rowIdx);
          var row = external__React__default.a.createElement(ListView_StaticRenderer, {
            key: 'r_' + comboID,
            shouldUpdate: !!shouldUpdateRow,
            render: this.props.renderRow.bind(null, dataSource.getRowData(sectionIdx, rowIdx), sectionID, rowID, this.onRowHighlighted)
          });
          sectionBody.push(row);

          if (this.props.renderSeparator && (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)) {
            var adjacentRowHighlighted = this.state.highlightedRow.sectionID === sectionID && (this.state.highlightedRow.rowID === rowID || this.state.highlightedRow.rowID === rowIDs[rowIdx + 1]);
            var separator = this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);
            if (separator) {
              sectionBody.push(separator);
            }
          }
          if (++rowCount === this.state.curRenderedRowsCount) {
            break;
          }
        }

        var rowsAndSeparators = external__React__default.a.cloneElement(this.props.renderSectionBodyWrapper(sectionID), {
          className: this.props.sectionBodyClassName
        }, sectionBody);

        if (this.props.renderSectionWrapper) {
          bodyComponents.push(external__React__default.a.cloneElement(this.props.renderSectionWrapper(sectionID), {}, renderSectionHeader, rowsAndSeparators));
        } else {
          bodyComponents.push(renderSectionHeader);
          bodyComponents.push(rowsAndSeparators);
        }
        if (rowCount >= this.state.curRenderedRowsCount) {
          break;
        }
      }

      var _props = this.props,
          renderScrollComponent = _props.renderScrollComponent,
          props = objectWithoutProperties_default()(_props, ['renderScrollComponent']);

      return external__React__default.a.cloneElement(renderScrollComponent(extends_default()({}, props, { onScroll: this._onScroll })), {
        ref: function ref(el) {
          return _this4.ListViewRef = el;
        },
        onContentSizeChange: this._onContentSizeChange,
        onLayout: this._onLayout
      }, this.props.renderHeader ? this.props.renderHeader() : null, external__React__default.a.cloneElement(props.renderBodyComponent(), {}, bodyComponents), this.props.renderFooter ? this.props.renderFooter() : null, props.children);
    }
  }]);

  return ListView;
}(external__React__default.a.Component);

ListView_ListView.DataSource = es_ListViewDataSource;
ListView_ListView.propTypes = extends_default()({}, es_ScrollView.propTypes, {
  dataSource: prop_types_default.a.instanceOf(es_ListViewDataSource).isRequired,
  renderSeparator: prop_types_default.a.func,
  renderRow: prop_types_default.a.func.isRequired,
  initialListSize: prop_types_default.a.number,
  onEndReached: prop_types_default.a.func,
  onEndReachedThreshold: prop_types_default.a.number,
  pageSize: prop_types_default.a.number,
  renderFooter: prop_types_default.a.func,
  renderHeader: prop_types_default.a.func,
  renderSectionHeader: prop_types_default.a.func,
  renderScrollComponent: prop_types_default.a.func,
  scrollRenderAheadDistance: prop_types_default.a.number,
  onChangeVisibleRows: prop_types_default.a.func,
  scrollEventThrottle: prop_types_default.a.number,
  // another added
  renderBodyComponent: prop_types_default.a.func,
  renderSectionWrapper: prop_types_default.a.func,
  renderSectionBodyWrapper: prop_types_default.a.func,
  sectionBodyClassName: prop_types_default.a.string,
  listViewPrefixCls: prop_types_default.a.string,
  useBodyScroll: prop_types_default.a.bool
});
ListView_ListView.defaultProps = {
  initialListSize: DEFAULT_INITIAL_ROWS,
  pageSize: DEFAULT_PAGE_SIZE,
  renderScrollComponent: function renderScrollComponent(props) {
    return external__React__default.a.createElement(es_ScrollView, props);
  },
  renderBodyComponent: function renderBodyComponent() {
    return external__React__default.a.createElement('div', null);
  },
  renderSectionBodyWrapper: function renderSectionBodyWrapper(sectionID) {
    return external__React__default.a.createElement('div', { key: sectionID });
  },
  sectionBodyClassName: 'list-view-section-body',
  listViewPrefixCls: 'rmc-list-view',
  scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
  onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
  scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
  scrollerOptions: {}
};

var ListView__initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.state = {
    curRenderedRowsCount: this.props.initialListSize,
    highlightedRow: {} };

  this.getMetrics = function () {
    return {
      contentLength: _this5.scrollProperties.contentLength,
      totalRows: _this5.props.dataSource.getRowCount(),
      renderedRows: _this5.state.curRenderedRowsCount,
      visibleRows: Object.keys(_this5._visibleRows).length
    };
  };

  this.getInnerViewNode = function () {
    return _this5.ListViewRef.getInnerViewNode();
  };

  this.scrollTo = function () {
    var _ListViewRef;

    _this5.ListViewRef && _this5.ListViewRef.scrollTo && (_ListViewRef = _this5.ListViewRef).scrollTo.apply(_ListViewRef, arguments);
  };

  this.onRowHighlighted = function (sectionID, rowID) {
    _this5.setState({ highlightedRow: { sectionID: sectionID, rowID: rowID } });
  };

  this._onContentSizeChange = function (width, height) {
    var contentLength = !_this5.props.horizontal ? height : width;
    if (contentLength !== _this5.scrollProperties.contentLength) {
      _this5.scrollProperties.contentLength = contentLength;
      _this5._renderMoreRowsIfNeeded();
    }
    _this5.props.onContentSizeChange && _this5.props.onContentSizeChange(width, height);
  };

  this._onLayout = function (event) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
        width = _event$nativeEvent$la.width,
        height = _event$nativeEvent$la.height;

    var visibleLength = !_this5.props.horizontal ? height : width;
    if (visibleLength !== _this5.scrollProperties.visibleLength) {
      _this5.scrollProperties.visibleLength = visibleLength;
      _this5._renderMoreRowsIfNeeded();
    }
    _this5.props.onLayout && _this5.props.onLayout(event);
  };

  this._maybeCallOnEndReached = function (event) {
    // console.log(this.scrollProperties, this._getDistanceFromEnd(this.scrollProperties));
    if (_this5.props.onEndReached && _this5.scrollProperties.contentLength !== _this5._sentEndForContentLength && _this5._getDistanceFromEnd(_this5.scrollProperties) < _this5.props.onEndReachedThreshold && _this5.state.curRenderedRowsCount === _this5.props.dataSource.getRowCount()) {
      _this5._sentEndForContentLength = _this5.scrollProperties.contentLength;
      _this5.props.onEndReached(event);
      return true;
    }
    return false;
  };

  this._renderMoreRowsIfNeeded = function () {
    if (_this5.scrollProperties.contentLength === null || _this5.scrollProperties.visibleLength === null || _this5.state.curRenderedRowsCount === _this5.props.dataSource.getRowCount()) {
      _this5._maybeCallOnEndReached();
      return;
    }

    var distanceFromEnd = _this5._getDistanceFromEnd(_this5.scrollProperties);
    // console.log(distanceFromEnd, this.props.scrollRenderAheadDistance);
    if (distanceFromEnd < _this5.props.scrollRenderAheadDistance) {
      _this5._pageInNewRows();
    }
  };

  this._pageInNewRows = function () {
    _this5.setState(function (state, props) {
      var rowsToRender = Math.min(state.curRenderedRowsCount + props.pageSize, props.dataSource.getRowCount());
      _this5._prevRenderedRowsCount = state.curRenderedRowsCount;
      return {
        curRenderedRowsCount: rowsToRender
      };
    }, function () {
      _this5._prevRenderedRowsCount = _this5.state.curRenderedRowsCount;
    });
  };

  this._getDistanceFromEnd = function (scrollProperties) {
    return scrollProperties.contentLength - scrollProperties.visibleLength - scrollProperties.offset;
  };

  this._onScroll = function (e, metrics) {
    // when the ListView is destroyed,
    // but also will trigger scroll event after `scrollEventThrottle`
    if (!_this5.ListViewRef) {
      return;
    }

    _this5.scrollProperties = metrics;

    if (!_this5._maybeCallOnEndReached(e)) {
      _this5._renderMoreRowsIfNeeded();
    }

    if (_this5.props.onEndReached && _this5._getDistanceFromEnd(_this5.scrollProperties) > _this5.props.onEndReachedThreshold) {
      // Scrolled out of the end zone, so it should be able to trigger again.
      _this5._sentEndForContentLength = null;
    }

    _this5.props.onScroll && _this5.props.onScroll(e);
  };
};

/* harmony default export */ var es_ListView = (ListView_ListView);
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(102);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./node_modules/rmc-list-view/es/Indexed.js














function setDocumentScrollTop(val) {
  window.document.body.scrollTop = val; // chrome61 is invalid
  window.document.documentElement.scrollTop = val;
}

/* eslint react/prop-types: 0 */

var Indexed_IndexedList = function (_React$Component) {
  inherits_default()(IndexedList, _React$Component);

  function IndexedList(props) {
    classCallCheck_default()(this, IndexedList);

    var _this = possibleConstructorReturn_default()(this, (IndexedList.__proto__ || Object.getPrototypeOf(IndexedList)).call(this, props));

    Indexed__initialiseProps.call(_this);

    _this.state = {
      pageSize: props.pageSize,
      _delay: false
    };
    return _this;
  }

  createClass_default()(IndexedList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dataChange(this.props);
      // handle quickSearchBar
      this.getQsInfo();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.dataSource !== nextProps.dataSource) {
        this.dataChange(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.getQsInfo();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._hCache = null;
    }
  }, {
    key: 'renderQuickSearchBar',
    value: function renderQuickSearchBar(quickSearchBarTop, quickSearchBarStyle) {
      var _this2 = this;

      var _props = this.props,
          dataSource = _props.dataSource,
          prefixCls = _props.prefixCls;

      var sectionKvs = dataSource.sectionIdentities.map(function (i) {
        return {
          value: i,
          label: dataSource._getSectionHeaderData(dataSource._dataBlob, i)
        };
      });
      return external__React__default.a.createElement(
        'ul',
        {
          ref: function ref(el) {
            return _this2.quickSearchBarRef = el;
          },
          className: prefixCls + '-quick-search-bar', style: quickSearchBarStyle,
          onTouchStart: this.onTouchStart,
          onTouchMove: this.onTouchMove,
          onTouchEnd: this.onTouchEnd,
          onTouchCancel: this.onTouchEnd
        },
        external__React__default.a.createElement(
          'li',
          { 'data-qf-target': quickSearchBarTop.value,
            onClick: function onClick() {
              return _this2.onQuickSearchTop(undefined, quickSearchBarTop.value);
            }
          },
          quickSearchBarTop.label
        ),
        sectionKvs.map(function (i) {
          return external__React__default.a.createElement(
            'li',
            { key: i.value, 'data-qf-target': i.value,
              onClick: function onClick() {
                return _this2.onQuickSearch(i.value);
              }
            },
            i.label
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _classNames;

      var _state = this.state,
          _delay = _state._delay,
          pageSize = _state.pageSize;

      var _props2 = this.props,
          className = _props2.className,
          prefixCls = _props2.prefixCls,
          children = _props2.children,
          quickSearchBarTop = _props2.quickSearchBarTop,
          quickSearchBarStyle = _props2.quickSearchBarStyle,
          _props2$initialListSi = _props2.initialListSize,
          initialListSize = _props2$initialListSi === undefined ? Math.min(20, this.props.dataSource.getRowCount()) : _props2$initialListSi,
          showQuickSearchIndicator = _props2.showQuickSearchIndicator,
          _renderSectionHeader = _props2.renderSectionHeader,
          sectionHeaderClassName = _props2.sectionHeaderClassName,
          other = objectWithoutProperties_default()(_props2, ['className', 'prefixCls', 'children', 'quickSearchBarTop', 'quickSearchBarStyle', 'initialListSize', 'showQuickSearchIndicator', 'renderSectionHeader', 'sectionHeaderClassName']);

      // initialListSize={this.props.dataSource.getRowCount()}


      return external__React__default.a.createElement(
        'div',
        { className: prefixCls + '-container' },
        _delay && this.props.delayActivityIndicator,
        external__React__default.a.createElement(
          es_ListView,
          extends_default()({}, other, {
            ref: function ref(el) {
              return _this3.indexedListViewRef = el;
            },
            className: classnames_default()(prefixCls, className),
            initialListSize: initialListSize,
            pageSize: pageSize,
            renderSectionHeader: function renderSectionHeader(sectionData, sectionID) {
              return external__React__default.a.cloneElement(_renderSectionHeader(sectionData, sectionID), {
                ref: function ref(c) {
                  return _this3.sectionComponents[sectionID] = c;
                },
                className: sectionHeaderClassName || prefixCls + '-section-header'
              });
            }
          }),
          children
        ),
        this.renderQuickSearchBar(quickSearchBarTop, quickSearchBarStyle),
        showQuickSearchIndicator ? external__React__default.a.createElement('div', { className: classnames_default()((_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-qsindicator', true), defineProperty_default()(_classNames, prefixCls + '-qsindicator-hide', !showQuickSearchIndicator || !this.state.showQuickSearchIndicator), _classNames)), ref: function ref(el) {
            return _this3.qsIndicatorRef = el;
          }
        }) : null
      );
    }
  }]);

  return IndexedList;
}(external__React__default.a.Component);

Indexed_IndexedList.propTypes = extends_default()({}, es_ListView.propTypes, {
  children: prop_types_default.a.any,
  prefixCls: prop_types_default.a.string,
  className: prop_types_default.a.string,
  sectionHeaderClassName: prop_types_default.a.string,
  quickSearchBarTop: prop_types_default.a.object,
  quickSearchBarStyle: prop_types_default.a.object,
  onQuickSearch: prop_types_default.a.func,
  showQuickSearchIndicator: prop_types_default.a.bool
});
Indexed_IndexedList.defaultProps = {
  prefixCls: 'rmc-indexed-list',
  quickSearchBarTop: { value: '#', label: '#' },
  onQuickSearch: function onQuickSearch() {},
  showQuickSearchIndicator: false,
  delayTime: 100,
  // delayActivityIndicator: <div style={{padding: 5, textAlign: 'center'}}>rendering more</div>,
  delayActivityIndicator: ''
};

var Indexed__initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onQuickSearchTop = function (sectionID, topId) {
    if (_this4.props.useBodyScroll) {
      setDocumentScrollTop(0);
    } else {
      external__ReactDOM__default.a.findDOMNode(_this4.indexedListViewRef.ListViewRef).scrollTop = 0;
    }
    _this4.props.onQuickSearch(sectionID, topId);
  };

  this.onQuickSearch = function (sectionID) {
    var lv = external__ReactDOM__default.a.findDOMNode(_this4.indexedListViewRef.ListViewRef);
    var sec = external__ReactDOM__default.a.findDOMNode(_this4.sectionComponents[sectionID]);
    if (_this4.props.useBodyScroll) {
      setDocumentScrollTop(sec.getBoundingClientRect().top - lv.getBoundingClientRect().top + getOffsetTop(lv));
    } else {
      lv.scrollTop += sec.getBoundingClientRect().top - lv.getBoundingClientRect().top;
    }
    _this4.props.onQuickSearch(sectionID);
  };

  this.onTouchStart = function (e) {
    _this4._target = e.target;
    _this4._basePos = _this4.quickSearchBarRef.getBoundingClientRect();
    document.addEventListener('touchmove', _this4._disableParent, false);
    document.body.className = document.body.className + ' ' + _this4.props.prefixCls + '-qsb-moving';
    _this4.updateIndicator(_this4._target);
  };

  this.onTouchMove = function (e) {
    e.preventDefault();
    if (_this4._target) {
      var ex = _event(e);
      var basePos = _this4._basePos;
      var _pos = void 0;
      if (ex.clientY >= basePos.top && ex.clientY <= basePos.top + _this4._qsHeight) {
        _pos = Math.floor((ex.clientY - basePos.top) / _this4._avgH);
        var target = void 0;
        if (_pos in _this4._hCache) {
          target = _this4._hCache[_pos][0];
        }
        if (target) {
          var overValue = target.getAttribute('data-qf-target');
          if (_this4._target !== target) {
            if (_this4.props.quickSearchBarTop.value === overValue) {
              _this4.onQuickSearchTop(undefined, overValue);
            } else {
              _this4.onQuickSearch(overValue);
            }
            _this4.updateIndicator(target);
          }
          _this4._target = target;
        }
      }
    }
  };

  this.onTouchEnd = function () {
    if (!_this4._target) {
      return;
    }
    document.removeEventListener('touchmove', _this4._disableParent, false);
    document.body.className = document.body.className.replace(new RegExp('\\s*' + _this4.props.prefixCls + '-qsb-moving', 'g'), '');
    _this4.updateIndicator(_this4._target, true);
    _this4._target = null;
  };

  this.getQsInfo = function () {
    var quickSearchBar = _this4.quickSearchBarRef;
    var height = quickSearchBar.offsetHeight;
    var hCache = [];
    [].slice.call(quickSearchBar.querySelectorAll('[data-qf-target]')).forEach(function (d) {
      hCache.push([d]);
    });
    var _avgH = height / hCache.length;
    var _top = 0;
    for (var i = 0, len = hCache.length; i < len; i++) {
      _top = i * _avgH;
      hCache[i][1] = [_top, _top + _avgH];
    }
    _this4._qsHeight = height;
    _this4._avgH = _avgH;
    _this4._hCache = hCache;
  };

  this.sectionComponents = {};

  this.dataChange = function (props) {
    // delay render more
    var rowCount = props.dataSource.getRowCount();
    if (!rowCount) {
      return;
    }
    _this4.setState({
      _delay: true
    });
    if (_this4._timer) {
      clearTimeout(_this4._timer);
    }
    _this4._timer = setTimeout(function () {
      _this4.setState({
        pageSize: rowCount,
        _delay: false
      }, function () {
        return _this4.indexedListViewRef._pageInNewRows();
      });
    }, props.delayTime);
  };

  this.updateIndicator = function (ele, end) {
    var el = ele;
    if (!el.getAttribute('data-qf-target')) {
      el = el.parentNode;
    }
    if (_this4.props.showQuickSearchIndicator) {
      _this4.qsIndicatorRef.innerText = el.innerText.trim();
      _this4.setState({
        showQuickSearchIndicator: true
      });
      if (_this4._indicatorTimer) {
        clearTimeout(_this4._indicatorTimer);
      }
      _this4._indicatorTimer = setTimeout(function () {
        _this4.setState({
          showQuickSearchIndicator: false
        });
      }, 1000);
    }

    var cls = _this4.props.prefixCls + '-quick-search-bar-over';
    // can not use setState to change className, it has a big performance issue!
    _this4._hCache.forEach(function (d) {
      d[0].className = d[0].className.replace(cls, '');
    });
    if (!end) {
      el.className = el.className + ' ' + cls;
    }
  };

  this._disableParent = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };
};

/* harmony default export */ var Indexed = (Indexed_IndexedList);
// CONCATENATED MODULE: ./node_modules/rmc-list-view/es/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IndexedList", function() { return Indexed; });
// export this package's api



es_ListView.IndexedList = Indexed;
var DataSource = es_ListView.DataSource;


/* harmony default export */ var es = __webpack_exports__["default"] = (es_ListView);

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = handleProps;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _list = __webpack_require__(297);

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
/* tslint:disable:no-unused-variable */

/* tslint:enable:no-unused-variable */
var Item = _list2['default'].Item;
function handleProps(props, isIndexed) {
    var renderHeader = props.renderHeader,
        renderFooter = props.renderFooter,
        renderSectionHeader = props.renderSectionHeader,
        renderBodyComponent = props.renderBodyComponent,
        restProps = __rest(props, ["renderHeader", "renderFooter", "renderSectionHeader", "renderBodyComponent"]);

    var listPrefixCls = props.listPrefixCls;
    var extraProps = {
        renderHeader: null,
        renderFooter: null,
        renderSectionHeader: null,
        renderBodyComponent: renderBodyComponent || function () {
            return _react2['default'].createElement('div', { className: listPrefixCls + '-body' });
        }
    };
    if (renderHeader) {
        extraProps.renderHeader = function () {
            return _react2['default'].createElement(
                'div',
                { className: listPrefixCls + '-header' },
                renderHeader()
            );
        };
    }
    if (renderFooter) {
        extraProps.renderFooter = function () {
            return _react2['default'].createElement(
                'div',
                { className: listPrefixCls + '-footer' },
                renderFooter()
            );
        };
    }
    if (renderSectionHeader) {
        extraProps.renderSectionHeader = isIndexed ? function (sectionData, sectionID) {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    Item,
                    { prefixCls: listPrefixCls },
                    renderSectionHeader(sectionData, sectionID)
                )
            );
        } : function (sectionData, sectionID) {
            return _react2['default'].createElement(
                Item,
                { prefixCls: listPrefixCls },
                renderSectionHeader(sectionData, sectionID)
            );
        };
    }
    return { restProps: restProps, extraProps: extraProps };
}
module.exports = exports['default'];

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

exports.getComponentLocale = getComponentLocale;
exports.getLocaleCode = getLocaleCode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getComponentLocale(props, context, componentName, getDefaultLocale) {
    var locale = {};
    if (context && context.antLocale && context.antLocale[componentName]) {
        locale = context.antLocale[componentName];
    } else {
        var defaultLocale = getDefaultLocale();
        // TODO: make default lang of antd be English
        // https://github.com/ant-design/ant-design/issues/6334
        locale = defaultLocale['default'] || defaultLocale;
    }
    var result = (0, _extends3['default'])({}, locale);
    if (props.locale) {
        result = (0, _extends3['default'])({}, result, props.locale);
        if (props.locale.lang) {
            result.lang = (0, _extends3['default'])({}, locale.lang, props.locale.lang);
        }
    }
    return result;
}
function getLocaleCode(context) {
    var localeCode = context.antLocale && context.antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (context.antLocale && context.antLocale.exist && !localeCode) {
        return 'zh-cn';
    }
    return localeCode;
}

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(100);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(30);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(32);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(33);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external__React_ = __webpack_require__(4);
var external__React__default = /*#__PURE__*/__webpack_require__.n(external__React_);

// EXTERNAL MODULE: external "ReactDOM"
var external__ReactDOM_ = __webpack_require__(42);
var external__ReactDOM__default = /*#__PURE__*/__webpack_require__.n(external__ReactDOM_);

// EXTERNAL MODULE: ./node_modules/rc-animate/es/Animate.js + 3 modules
var Animate = __webpack_require__(294);

// CONCATENATED MODULE: ./node_modules/rmc-dialog/es/LazyRenderBox.js







var LazyRenderBox_LazyRenderBox = function (_React$Component) {
    inherits_default()(LazyRenderBox, _React$Component);

    function LazyRenderBox() {
        classCallCheck_default()(this, LazyRenderBox);

        return possibleConstructorReturn_default()(this, (LazyRenderBox.__proto__ || Object.getPrototypeOf(LazyRenderBox)).apply(this, arguments));
    }

    createClass_default()(LazyRenderBox, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return !!nextProps.hiddenClassName || !!nextProps.visible;
        }
    }, {
        key: "render",
        value: function render() {
            var className = this.props.className;
            if (!!this.props.hiddenClassName && !this.props.visible) {
                className += " " + this.props.hiddenClassName;
            }
            var props = extends_default()({}, this.props);
            delete props.hiddenClassName;
            delete props.visible;
            props.className = className;
            return external__React__default.a.createElement("div", extends_default()({}, props));
        }
    }]);

    return LazyRenderBox;
}(external__React__default.a.Component);

/* harmony default export */ var es_LazyRenderBox = (LazyRenderBox_LazyRenderBox);
// CONCATENATED MODULE: ./node_modules/rmc-dialog/es/Dialog.js








function noop() {}

var Dialog_Dialog = function (_React$Component) {
    inherits_default()(Dialog, _React$Component);

    function Dialog() {
        classCallCheck_default()(this, Dialog);

        var _this = possibleConstructorReturn_default()(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));

        _this.getDialogElement = function () {
            var props = _this.props;
            var closable = props.closable;
            var prefixCls = props.prefixCls;
            var footer = void 0;
            if (props.footer) {
                footer = external__React__default.a.createElement("div", { className: prefixCls + '-footer', ref: function ref(el) {
                        return _this.footerRef = el;
                    } }, props.footer);
            }
            var header = void 0;
            if (props.title) {
                header = external__React__default.a.createElement("div", { className: prefixCls + '-header', ref: function ref(el) {
                        return _this.headerRef = el;
                    } }, external__React__default.a.createElement("div", { className: prefixCls + '-title' }, props.title));
            }
            var closer = void 0;
            if (closable) {
                closer = external__React__default.a.createElement("button", { onClick: _this.close, "aria-label": "Close", className: prefixCls + '-close' }, external__React__default.a.createElement("span", { className: prefixCls + '-close-x' }));
            }
            var transitionName = _this.getTransitionName();
            var dialogElement = external__React__default.a.createElement(es_LazyRenderBox, { key: "dialog-element", role: "document", ref: function ref(el) {
                    return _this.dialogRef = el;
                }, style: props.style || {}, className: prefixCls + ' ' + (props.className || ''), visible: props.visible }, external__React__default.a.createElement("div", { className: prefixCls + '-content' }, closer, header, external__React__default.a.createElement("div", { className: prefixCls + '-body', style: props.bodyStyle, ref: function ref(el) {
                    return _this.bodyRef = el;
                } }, props.children), footer));
            return external__React__default.a.createElement(Animate["a" /* default */], { key: "dialog", showProp: "visible", onAppear: _this.onAnimateAppear, onLeave: _this.onAnimateLeave, transitionName: transitionName, component: "", transitionAppear: true }, dialogElement);
        };
        _this.onAnimateAppear = function () {
            document.body.style.overflow = 'hidden';
        };
        _this.onAnimateLeave = function () {
            document.body.style.overflow = '';
            if (_this.wrapRef) {
                _this.wrapRef.style.display = 'none';
            }
            if (_this.props.onAnimateLeave) {
                _this.props.onAnimateLeave();
            }
            if (_this.props.afterClose) {
                _this.props.afterClose();
            }
        };
        _this.close = function (e) {
            if (_this.props.onClose) {
                _this.props.onClose(e);
            }
        };
        _this.onMaskClick = function (e) {
            if (e.target === e.currentTarget) {
                _this.close(e);
            }
        };
        return _this;
    }

    createClass_default()(Dialog, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // fix: react@16 no dismissing animation
            document.body.style.overflow = '';
            if (this.wrapRef) {
                this.wrapRef.style.display = 'none';
            }
        }
    }, {
        key: 'getZIndexStyle',
        value: function getZIndexStyle() {
            var style = {};
            var props = this.props;
            if (props.zIndex !== undefined) {
                style.zIndex = props.zIndex;
            }
            return style;
        }
    }, {
        key: 'getWrapStyle',
        value: function getWrapStyle() {
            var wrapStyle = this.props.wrapStyle || {};
            return extends_default()({}, this.getZIndexStyle(), wrapStyle);
        }
    }, {
        key: 'getMaskStyle',
        value: function getMaskStyle() {
            var maskStyle = this.props.maskStyle || {};
            return extends_default()({}, this.getZIndexStyle(), maskStyle);
        }
    }, {
        key: 'getMaskTransitionName',
        value: function getMaskTransitionName() {
            var props = this.props;
            var transitionName = props.maskTransitionName;
            var animation = props.maskAnimation;
            if (!transitionName && animation) {
                transitionName = props.prefixCls + '-' + animation;
            }
            return transitionName;
        }
    }, {
        key: 'getTransitionName',
        value: function getTransitionName() {
            var props = this.props;
            var transitionName = props.transitionName;
            var animation = props.animation;
            if (!transitionName && animation) {
                transitionName = props.prefixCls + '-' + animation;
            }
            return transitionName;
        }
    }, {
        key: 'getMaskElement',
        value: function getMaskElement() {
            var props = this.props;
            var maskElement = void 0;
            if (props.mask) {
                var maskTransition = this.getMaskTransitionName();
                maskElement = external__React__default.a.createElement(es_LazyRenderBox, { style: this.getMaskStyle(), key: "mask-element", className: props.prefixCls + '-mask', hiddenClassName: props.prefixCls + '-mask-hidden', visible: props.visible });
                if (maskTransition) {
                    maskElement = external__React__default.a.createElement(Animate["a" /* default */], { key: "mask", showProp: "visible", transitionAppear: true, component: "", transitionName: maskTransition }, maskElement);
                }
            }
            return maskElement;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = this.props;
            var prefixCls = props.prefixCls,
                maskClosable = props.maskClosable;

            var style = this.getWrapStyle();
            if (props.visible) {
                style.display = null;
            }
            return external__React__default.a.createElement("div", null, this.getMaskElement(), external__React__default.a.createElement("div", extends_default()({ className: prefixCls + '-wrap ' + (props.wrapClassName || ''), ref: function ref(el) {
                    return _this2.wrapRef = el;
                }, onClick: maskClosable ? this.onMaskClick : undefined, role: "dialog", "aria-labelledby": props.title, style: style }, props.wrapProps), this.getDialogElement()));
        }
    }]);

    return Dialog;
}(external__React__default.a.Component);

/* harmony default export */ var es_Dialog = (Dialog_Dialog);

Dialog_Dialog.defaultProps = {
    afterClose: noop,
    className: '',
    mask: true,
    visible: false,
    closable: true,
    maskClosable: true,
    prefixCls: 'rmc-dialog',
    onClose: noop
};
// CONCATENATED MODULE: ./node_modules/rmc-dialog/es/DialogWrap.js








function DialogWrap_noop() {}
var IS_REACT_16 = !!external__ReactDOM__default.a.createPortal;

var DialogWrap_DialogWrap = function (_React$Component) {
    inherits_default()(DialogWrap, _React$Component);

    function DialogWrap() {
        classCallCheck_default()(this, DialogWrap);

        var _this = possibleConstructorReturn_default()(this, (DialogWrap.__proto__ || Object.getPrototypeOf(DialogWrap)).apply(this, arguments));

        _this.saveRef = function (node) {
            if (IS_REACT_16) {
                _this._component = node;
            }
        };
        _this.getComponent = function (visible) {
            var props = extends_default()({}, _this.props);
            ['visible', 'onAnimateLeave'].forEach(function (key) {
                if (props.hasOwnProperty(key)) {
                    delete props[key];
                }
            });
            return external__React__default.a.createElement(es_Dialog, extends_default()({}, props, { visible: visible, onAnimateLeave: _this.removeContainer, ref: _this.saveRef }));
        };
        _this.removeContainer = function () {
            if (_this.container) {
                if (!IS_REACT_16) {
                    external__ReactDOM__default.a.unmountComponentAtNode(_this.container);
                }
                _this.container.parentNode.removeChild(_this.container);
                _this.container = null;
            }
        };
        _this.getContainer = function () {
            if (!_this.container) {
                var container = document.createElement('div');
                var containerId = _this.props.prefixCls + '-container-' + new Date().getTime();
                container.setAttribute('id', containerId);
                document.body.appendChild(container);
                _this.container = container;
            }
            return _this.container;
        };
        return _this;
    }

    createClass_default()(DialogWrap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.visible) {
                this.componentDidUpdate();
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(_ref) {
            var visible = _ref.visible;

            return !!(this.props.visible || visible);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.visible) {
                if (!IS_REACT_16) {
                    this.renderDialog(false);
                } else {
                    // TODO for react@16 createPortal animation
                    this.removeContainer();
                }
            } else {
                this.removeContainer();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!IS_REACT_16) {
                this.renderDialog(this.props.visible);
            }
        }
    }, {
        key: 'renderDialog',
        value: function renderDialog(visible) {
            external__ReactDOM__default.a.unstable_renderSubtreeIntoContainer(this, this.getComponent(visible), this.getContainer());
        }
    }, {
        key: 'render',
        value: function render() {
            var visible = this.props.visible;

            if (IS_REACT_16 && (visible || this._component)) {
                return external__ReactDOM__default.a.createPortal(this.getComponent(visible), this.getContainer());
            }
            return null;
        }
    }]);

    return DialogWrap;
}(external__React__default.a.Component);

/* harmony default export */ var es_DialogWrap = __webpack_exports__["default"] = (DialogWrap_DialogWrap);

DialogWrap_DialogWrap.defaultProps = {
    visible: false,
    prefixCls: 'rmc-dialog',
    onClose: DialogWrap_noop
};

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(102);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames3 = __webpack_require__(101);

var _classnames4 = _interopRequireDefault(_classnames3);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcDialog = __webpack_require__(362);

var _rmcDialog2 = _interopRequireDefault(_rmcDialog);

var _rmcFeedback = __webpack_require__(284);

var _rmcFeedback2 = _interopRequireDefault(_rmcFeedback);

var _PropsType = __webpack_require__(829);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Modal = function (_ModalComponent) {
    (0, _inherits3['default'])(Modal, _ModalComponent);

    function Modal() {
        (0, _classCallCheck3['default'])(this, Modal);
        return (0, _possibleConstructorReturn3['default'])(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Modal, [{
        key: 'renderFooterButton',
        value: function renderFooterButton(button, prefixCls, i) {
            var buttonStyle = {};
            if (button.style) {
                buttonStyle = button.style;
                if (typeof buttonStyle === 'string') {
                    var styleMap = {
                        cancel: {},
                        'default': {},
                        destructive: { color: 'red' }
                    };
                    buttonStyle = styleMap[buttonStyle] || {};
                }
            }
            var onClickFn = function onClickFn(e) {
                e.preventDefault();
                if (button.onPress) {
                    button.onPress();
                }
            };
            return _react2['default'].createElement(
                _rmcFeedback2['default'],
                { activeClassName: prefixCls + '-button-active', key: i },
                _react2['default'].createElement(
                    'a',
                    { className: prefixCls + '-button', role: 'button', style: buttonStyle, onClick: onClickFn },
                    button.text || 'Button'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this,
                _classnames2;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                className = _a.className,
                wrapClassName = _a.wrapClassName,
                transitionName = _a.transitionName,
                maskTransitionName = _a.maskTransitionName,
                style = _a.style,
                platform = _a.platform,
                _a$footer = _a.footer,
                footer = _a$footer === undefined ? [] : _a$footer,
                operation = _a.operation,
                animated = _a.animated,
                transparent = _a.transparent,
                popup = _a.popup,
                animationType = _a.animationType,
                restProps = __rest(_a, ["prefixCls", "className", "wrapClassName", "transitionName", "maskTransitionName", "style", "platform", "footer", "operation", "animated", "transparent", "popup", "animationType"]);
            var btnGroupClass = (0, _classnames4['default'])(prefixCls + '-button-group-' + (footer.length === 2 && !operation ? 'h' : 'v'), prefixCls + '-button-group-' + (operation ? 'operation' : 'normal'));
            var footerDom = footer.length ? _react2['default'].createElement(
                'div',
                { className: btnGroupClass, role: 'group' },
                footer.map(function (button, i) {
                    return (
                        // tslint:disable-next-line:jsx-no-multiline-js
                        _this2.renderFooterButton(button, prefixCls, i)
                    );
                })
            ) : null;
            var transName = void 0;
            var maskTransName = void 0;
            if (animated) {
                // tslint:disable-next-line:prefer-conditional-expression
                if (transparent) {
                    transName = maskTransName = 'am-fade';
                } else {
                    transName = maskTransName = 'am-slide-up';
                }
                if (popup) {
                    transName = animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
                    maskTransName = 'am-fade';
                }
            }
            var wrapCls = (0, _classnames4['default'])(wrapClassName, (0, _defineProperty3['default'])({}, prefixCls + '-wrap-popup', popup));
            var cls = (0, _classnames4['default'])(className, (_classnames2 = {}, (0, _defineProperty3['default'])(_classnames2, prefixCls + '-transparent', transparent), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-popup', popup), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-popup-' + animationType, popup && animationType), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-android', platform === 'android'), _classnames2));
            return _react2['default'].createElement(_rmcDialog2['default'], (0, _extends3['default'])({}, restProps, { prefixCls: prefixCls, className: cls, wrapClassName: wrapCls, transitionName: transitionName || transName, maskTransitionName: maskTransitionName || maskTransName, style: style, footer: footerDom }));
        }
    }]);
    return Modal;
}(_PropsType.ModalComponent);

exports['default'] = Modal;

Modal.defaultProps = {
    prefixCls: 'am-modal',
    transparent: false,
    popup: false,
    animationType: 'slide-down',
    animated: true,
    style: {},
    onShow: function onShow() {},

    footer: [],
    closable: false,
    operation: false,
    platform: 'ios'
};
module.exports = exports['default'];

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcListView = __webpack_require__(326);

var _rmcListView2 = _interopRequireDefault(_rmcListView);

var _handleProps2 = __webpack_require__(327);

var _handleProps3 = _interopRequireDefault(_handleProps2);

var _Indexed = __webpack_require__(368);

var _Indexed2 = _interopRequireDefault(_Indexed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ListView = function (_React$Component) {
    (0, _inherits3['default'])(ListView, _React$Component);

    function ListView() {
        (0, _classCallCheck3['default'])(this, ListView);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).apply(this, arguments));

        _this.scrollTo = function () {
            var _this$listviewRef;

            return (_this$listviewRef = _this.listviewRef).scrollTo.apply(_this$listviewRef, arguments);
        };
        _this.getInnerViewNode = function () {
            return _this.listviewRef.getInnerViewNode();
        };
        return _this;
    }

    (0, _createClass3['default'])(ListView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _handleProps = (0, _handleProps3['default'])(this.props, false),
                restProps = _handleProps.restProps,
                extraProps = _handleProps.extraProps;

            return _react2['default'].createElement(_rmcListView2['default'], (0, _extends3['default'])({ ref: function ref(el) {
                    return _this2.listviewRef = el;
                } }, restProps, extraProps));
        }
    }]);
    return ListView;
}(_react2['default'].Component);

exports['default'] = ListView;

ListView.defaultProps = {
    prefixCls: 'am-list-view',
    listPrefixCls: 'am-list'
};
ListView.DataSource = _rmcListView2['default'].DataSource;
ListView.IndexedList = _Indexed2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/* eslint-disable fb-www/typeof-undefined */
/* eslint-disable no-unused-vars */

var invariant = __webpack_require__(66);

/**
 * Checks if a value is empty.
 */
function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    if (value) {
      !(!isIterable(value) || value.size === undefined) ?  false ? invariant(false, 'isEmpty() does not support iterable collections.') : invariant(false) : void 0;
      for (var _ in value) {
        return false;
      }
    }
    return true;
  } else {
    return !value;
  }
}

function isIterable(value) {
  if (typeof Symbol === 'undefined') {
    return false;
  }
  return value[Symbol.iterator];
}

module.exports = isEmpty;

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcListView = __webpack_require__(326);

var _rmcListView2 = _interopRequireDefault(_rmcListView);

var _handleProps2 = __webpack_require__(327);

var _handleProps3 = _interopRequireDefault(_handleProps2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IndexedList = _rmcListView2['default'].IndexedList;

var MIndexedList = function (_React$Component) {
    (0, _inherits3['default'])(MIndexedList, _React$Component);

    function MIndexedList() {
        (0, _classCallCheck3['default'])(this, MIndexedList);
        return (0, _possibleConstructorReturn3['default'])(this, (MIndexedList.__proto__ || Object.getPrototypeOf(MIndexedList)).apply(this, arguments));
    }

    (0, _createClass3['default'])(MIndexedList, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                listPrefixCls = _props.listPrefixCls;

            var _handleProps = (0, _handleProps3['default'])(this.props, true),
                restProps = _handleProps.restProps,
                extraProps = _handleProps.extraProps;

            return _react2['default'].createElement(
                IndexedList,
                (0, _extends3['default'])({ ref: function ref(el) {
                        return _this2.indexedListRef = el;
                    }, sectionHeaderClassName: prefixCls + '-section-header ' + listPrefixCls + '-body', sectionBodyClassName: prefixCls + '-section-body ' + listPrefixCls + '-body' }, restProps, extraProps),
                this.props.children
            );
        }
    }]);
    return MIndexedList;
}(_react2['default'].Component);

exports['default'] = MIndexedList;

MIndexedList.defaultProps = {
    prefixCls: 'am-indexed-list',
    listPrefixCls: 'am-list',
    listViewPrefixCls: 'am-list-view'
};
module.exports = exports['default'];

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(288);

__webpack_require__(370);

/***/ }),

/***/ 370:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _rcCheckbox = __webpack_require__(486);

var _rcCheckbox2 = _interopRequireDefault(_rcCheckbox);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Checkbox = function (_React$Component) {
    (0, _inherits3['default'])(Checkbox, _React$Component);

    function Checkbox() {
        (0, _classCallCheck3['default'])(this, Checkbox);
        return (0, _possibleConstructorReturn3['default'])(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Checkbox, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                className = _a.className,
                style = _a.style,
                restProps = __rest(_a, ["className", "style"]);var prefixCls = restProps.prefixCls,
                children = restProps.children;

            var wrapCls = (0, _classnames2['default'])(prefixCls + '-wrapper', className);
            // Todo: wait for https://github.com/developit/preact-compat/issues/422, then we can remove class below
            if ('class' in restProps) {
                /* tslint:disable:no-string-literal */
                delete restProps['class'];
            }
            var mark = _react2['default'].createElement(
                'label',
                { className: wrapCls, style: style },
                _react2['default'].createElement(_rcCheckbox2['default'], restProps),
                children
            );
            if (this.props.wrapLabel) {
                return mark;
            }
            return _react2['default'].createElement(_rcCheckbox2['default'], this.props);
        }
    }]);
    return Checkbox;
}(_react2['default'].Component);

exports['default'] = Checkbox;

Checkbox.defaultProps = {
    prefixCls: 'am-checkbox',
    wrapLabel: true
};
module.exports = exports['default'];

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = closest;
function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    var p = el;
    while (p) {
        if (matchesSelector.call(p, selector)) {
            return p;
        }
        p = p.parentElement;
    }
    return null;
}
module.exports = exports["default"];

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(100);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(102);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(280);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(30);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(31);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(32);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(33);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external__React_ = __webpack_require__(4);
var external__React__default = /*#__PURE__*/__webpack_require__.n(external__React_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(6);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/rc-util/es/PureRenderMixin.js
var PureRenderMixin = __webpack_require__(498);
var PureRenderMixin_default = /*#__PURE__*/__webpack_require__.n(PureRenderMixin);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(101);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/rc-checkbox/es/Checkbox.js












var Checkbox_Checkbox = function (_React$Component) {
  inherits_default()(Checkbox, _React$Component);

  function Checkbox(props) {
    classCallCheck_default()(this, Checkbox);

    var _this = possibleConstructorReturn_default()(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    Checkbox__initialiseProps.call(_this);

    var checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: checked
    };
    return _this;
  }

  createClass_default()(Checkbox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('checked' in nextProps) {
        this.setState({
          checked: nextProps.checked
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return PureRenderMixin_default.a.shouldComponentUpdate.apply(this, args);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          className = _props.className,
          style = _props.style,
          name = _props.name,
          type = _props.type,
          disabled = _props.disabled,
          readOnly = _props.readOnly,
          tabIndex = _props.tabIndex,
          onClick = _props.onClick,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur,
          others = objectWithoutProperties_default()(_props, ['prefixCls', 'className', 'style', 'name', 'type', 'disabled', 'readOnly', 'tabIndex', 'onClick', 'onFocus', 'onBlur']);

      var globalProps = Object.keys(others).reduce(function (prev, key) {
        if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
          prev[key] = others[key];
        }
        return prev;
      }, {});

      var checked = this.state.checked;

      var classString = classnames_default()(prefixCls, className, (_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-checked', checked), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), _classNames));

      return external__React__default.a.createElement(
        'span',
        { className: classString, style: style },
        external__React__default.a.createElement('input', extends_default()({
          name: name,
          type: type,
          readOnly: readOnly,
          disabled: disabled,
          tabIndex: tabIndex,
          className: prefixCls + '-input',
          checked: !!checked,
          onClick: onClick,
          onFocus: onFocus,
          onBlur: onBlur,
          onChange: this.handleChange
        }, globalProps)),
        external__React__default.a.createElement('span', { className: prefixCls + '-inner' })
      );
    }
  }]);

  return Checkbox;
}(external__React__default.a.Component);

Checkbox_Checkbox.propTypes = {
  prefixCls: prop_types_default.a.string,
  className: prop_types_default.a.string,
  style: prop_types_default.a.object,
  name: prop_types_default.a.string,
  type: prop_types_default.a.string,
  defaultChecked: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.bool]),
  checked: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.bool]),
  disabled: prop_types_default.a.bool,
  onFocus: prop_types_default.a.func,
  onBlur: prop_types_default.a.func,
  onChange: prop_types_default.a.func,
  onClick: prop_types_default.a.func,
  tabIndex: prop_types_default.a.string,
  readOnly: prop_types_default.a.bool
};
Checkbox_Checkbox.defaultProps = {
  prefixCls: 'rc-checkbox',
  className: '',
  style: {},
  type: 'checkbox',
  defaultChecked: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
};

var Checkbox__initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (e) {
    var props = _this2.props;

    if (props.disabled) {
      return;
    }
    if (!('checked' in props)) {
      _this2.setState({
        checked: e.target.checked
      });
    }
    props.onChange({
      target: extends_default()({}, props, {
        checked: e.target.checked
      }),
      stopPropagation: function stopPropagation() {
        e.stopPropagation();
      },
      preventDefault: function preventDefault() {
        e.preventDefault();
      }
    });
  };
};

/* harmony default export */ var es_Checkbox = (Checkbox_Checkbox);
// CONCATENATED MODULE: ./node_modules/rc-checkbox/es/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return es_Checkbox; });


/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (props) {
    return Object.keys(props).reduce(function (prev, key) {
        if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
            prev[key] = props[key];
        }
        return prev;
    }, {});
};

module.exports = exports['default'];

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */

var shallowEqual = __webpack_require__(499);

function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 *
 * See https://facebook.github.io/react/docs/pure-render-mixin.html
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fetchKeys = __webpack_require__(500);

module.exports = function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
        return !!ret;
    }

    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    var len = keysA.length;
    if (len !== keysB.length) {
        return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
        var key = keysA[i];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];

        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (_ret === false || _ret === void 0 && valueA !== valueB) {
            return false;
        }
    }

    return true;
};

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = __webpack_require__(501),
    isArguments = __webpack_require__(502),
    isArray = __webpack_require__(503);

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;


/***/ }),

/***/ 501:
/***/ (function(module, exports) {

/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;


/***/ }),

/***/ 502:
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;


/***/ }),

/***/ 503:
/***/ (function(module, exports) {

/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;


/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _rcCheckbox = __webpack_require__(486);

var _rcCheckbox2 = _interopRequireDefault(_rcCheckbox);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Radio = function (_React$Component) {
    (0, _inherits3['default'])(Radio, _React$Component);

    function Radio() {
        (0, _classCallCheck3['default'])(this, Radio);
        return (0, _possibleConstructorReturn3['default'])(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Radio, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                className = _a.className,
                style = _a.style,
                restProps = __rest(_a, ["className", "style"]);var prefixCls = restProps.prefixCls,
                children = restProps.children;

            var wrapCls = (0, _classnames2['default'])(prefixCls + '-wrapper', className);
            if ('class' in restProps) {
                // Todo https://github.com/developit/preact-compat/issues/422
                /* tslint:disable:no-string-literal */
                delete restProps['class'];
            }
            var mark = _react2['default'].createElement(
                'label',
                { className: wrapCls, style: style },
                _react2['default'].createElement(_rcCheckbox2['default'], (0, _extends3['default'])({}, restProps, { type: 'radio' })),
                children
            );
            if (this.props.wrapLabel) {
                return mark;
            }
            return _react2['default'].createElement(_rcCheckbox2['default'], (0, _extends3['default'])({}, this.props, { type: 'radio' }));
        }
    }]);
    return Radio;
}(_react2['default'].Component);

exports['default'] = Radio;

Radio.defaultProps = {
    prefixCls: 'am-radio',
    wrapLabel: true
};
module.exports = exports['default'];

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AgreeItem = __webpack_require__(823);

var _AgreeItem2 = _interopRequireDefault(_AgreeItem);

var _Checkbox = __webpack_require__(401);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _CheckboxItem = __webpack_require__(824);

var _CheckboxItem2 = _interopRequireDefault(_CheckboxItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Checkbox2['default'].CheckboxItem = _CheckboxItem2['default'];
_Checkbox2['default'].AgreeItem = _AgreeItem2['default'];
exports['default'] = _Checkbox2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _getDataAttr = __webpack_require__(496);

var _getDataAttr2 = _interopRequireDefault(_getDataAttr);

var _Checkbox = __webpack_require__(401);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var AgreeItem = function (_React$Component) {
    (0, _inherits3['default'])(AgreeItem, _React$Component);

    function AgreeItem() {
        (0, _classCallCheck3['default'])(this, AgreeItem);
        return (0, _possibleConstructorReturn3['default'])(this, (AgreeItem.__proto__ || Object.getPrototypeOf(AgreeItem)).apply(this, arguments));
    }

    (0, _createClass3['default'])(AgreeItem, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                style = _a.style,
                restProps = __rest(_a, ["style"]);var prefixCls = restProps.prefixCls,
                className = restProps.className;

            var wrapCls = (0, _classnames2['default'])(prefixCls + '-agree', className);
            return _react2['default'].createElement(
                'div',
                (0, _extends3['default'])({}, (0, _getDataAttr2['default'])(restProps), { className: wrapCls, style: style }),
                _react2['default'].createElement(_Checkbox2['default'], (0, _extends3['default'])({}, restProps, { className: prefixCls + '-agree-label' }))
            );
        }
    }]);
    return AgreeItem;
}(_react2['default'].Component);

exports['default'] = AgreeItem;

AgreeItem.defaultProps = {
    prefixCls: 'am-checkbox'
};
module.exports = exports['default'];

/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(102);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames2 = __webpack_require__(101);

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _list = __webpack_require__(297);

var _list2 = _interopRequireDefault(_list);

var _Checkbox = __webpack_require__(401);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var ListItem = _list2['default'].Item;
// tslint:disable-next-line:no-empty
function noop() {}

var CheckboxItem = function (_React$Component) {
    (0, _inherits3['default'])(CheckboxItem, _React$Component);

    function CheckboxItem() {
        (0, _classCallCheck3['default'])(this, CheckboxItem);
        return (0, _possibleConstructorReturn3['default'])(this, (CheckboxItem.__proto__ || Object.getPrototypeOf(CheckboxItem)).apply(this, arguments));
    }

    (0, _createClass3['default'])(CheckboxItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _a = this.props,
                listPrefixCls = _a.listPrefixCls,
                onChange = _a.onChange,
                disabled = _a.disabled,
                checkboxProps = _a.checkboxProps,
                onClick = _a.onClick,
                restProps = __rest(_a, ["listPrefixCls", "onChange", "disabled", "checkboxProps", "onClick"]);var prefixCls = restProps.prefixCls,
                className = restProps.className,
                children = restProps.children;

            var wrapCls = (0, _classnames3['default'])(prefixCls + '-item', className, (0, _defineProperty3['default'])({}, prefixCls + '-item-disabled', disabled === true));
            // Note: if not omit `onChange`, it will trigger twice on check listitem
            if (!disabled) {
                restProps.onClick = onClick || noop;
            }
            var extraProps = {};
            ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(function (i) {
                if (i in _this2.props) {
                    extraProps[i] = _this2.props[i];
                }
            });
            return _react2['default'].createElement(
                ListItem,
                (0, _extends3['default'])({}, restProps, { prefixCls: listPrefixCls, className: wrapCls, thumb: _react2['default'].createElement(_Checkbox2['default'], (0, _extends3['default'])({}, checkboxProps, extraProps)) }),
                children
            );
        }
    }]);
    return CheckboxItem;
}(_react2['default'].Component);

exports['default'] = CheckboxItem;

CheckboxItem.defaultProps = {
    prefixCls: 'am-checkbox',
    listPrefixCls: 'am-list',
    checkboxProps: {}
};
module.exports = exports['default'];

/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(288);

__webpack_require__(826);

/***/ }),

/***/ 826:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = __webpack_require__(828);

var _alert2 = _interopRequireDefault(_alert);

var _Modal = __webpack_require__(363);

var _Modal2 = _interopRequireDefault(_Modal);

var _operation = __webpack_require__(830);

var _operation2 = _interopRequireDefault(_operation);

var _prompt = __webpack_require__(831);

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Modal2['default'].alert = _alert2['default'];
_Modal2['default'].prompt = _prompt2['default'];
_Modal2['default'].operation = _operation2['default'];
exports['default'] = _Modal2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = alert;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(42);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _closest = __webpack_require__(402);

var _closest2 = _interopRequireDefault(_closest);

var _Modal = __webpack_require__(363);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function alert(title, message) {
    var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [{ text: '确定' }];
    var platform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ios';

    var closed = false;
    if (!title && !message) {
        // console.log('Must specify either an alert title, or message, or both');
        return {
            close: function close() {}
        };
    }
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        _reactDom2['default'].unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    var footer = actions.map(function (button) {
        // tslint:disable-next-line:only-arrow-functions
        var orginPress = button.onPress || function () {};
        button.onPress = function () {
            if (closed) {
                return;
            }
            var res = orginPress();
            if (res && res.then) {
                res.then(function () {
                    closed = true;
                    close();
                })['catch'](function () {});
            } else {
                closed = true;
                close();
            }
        };
        return button;
    });
    var prefixCls = 'am-modal';
    function onWrapTouchStart(e) {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        var pNode = (0, _closest2['default'])(e.currentTarget, '.' + prefixCls + '-footer');
        if (!pNode) {
            e.preventDefault();
        }
    }
    _reactDom2['default'].render(_react2['default'].createElement(
        _Modal2['default'],
        { visible: true, transparent: true, title: title, transitionName: 'am-zoom', closable: false, maskClosable: false, footer: footer, maskTransitionName: 'am-fade', platform: platform, wrapProps: { onTouchStart: onWrapTouchStart } },
        _react2['default'].createElement(
            'div',
            { className: prefixCls + '-alert-content' },
            message
        )
    ), div);
    return {
        close: close
    };
}
module.exports = exports['default'];

/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalComponent = undefined;

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ModalComponent = exports.ModalComponent = function (_React$Component) {
  (0, _inherits3['default'])(ModalComponent, _React$Component);

  function ModalComponent() {
    (0, _classCallCheck3['default'])(this, ModalComponent);
    return (0, _possibleConstructorReturn3['default'])(this, (ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).apply(this, arguments));
  }

  return ModalComponent;
}(_react2['default'].Component);

/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = operation;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(42);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _closest = __webpack_require__(402);

var _closest2 = _interopRequireDefault(_closest);

var _Modal = __webpack_require__(363);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function operation() {
    var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{ text: '确定' }];
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ios';

    var closed = false;
    var prefixCls = 'am-modal';
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        _reactDom2['default'].unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    var footer = actions.map(function (button) {
        // tslint:disable-next-line:only-arrow-functions
        var orginPress = button.onPress || function () {};
        button.onPress = function () {
            if (closed) {
                return;
            }
            var res = orginPress();
            if (res && res.then) {
                res.then(function () {
                    closed = true;
                    close();
                })['catch'](function () {});
            } else {
                closed = true;
                close();
            }
        };
        return button;
    });
    function onWrapTouchStart(e) {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        var pNode = (0, _closest2['default'])(e.currentTarget, '.am-modal-footer');
        if (!pNode) {
            e.preventDefault();
        }
    }
    _reactDom2['default'].render(_react2['default'].createElement(_Modal2['default'], { visible: true, operation: true, transparent: true, prefixCls: prefixCls, transitionName: 'am-zoom', closable: false, maskClosable: true, onClose: close, footer: footer, maskTransitionName: 'am-fade', className: 'am-modal-operation', platform: platform, wrapProps: { onTouchStart: onWrapTouchStart } }), div);
    return {
        close: close
    };
}
module.exports = exports['default'];

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = prompt;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(42);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _closest = __webpack_require__(402);

var _closest2 = _interopRequireDefault(_closest);

var _Modal = __webpack_require__(363);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function prompt(title, message, callbackOrActions) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'default';
    var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var placeholders = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ['', ''];
    var platform = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'ios';

    var closed = false;
    defaultValue = typeof defaultValue === 'string' ? defaultValue : typeof defaultValue === 'number' ? '' + defaultValue : '';
    if (!callbackOrActions) {
        // console.log('Must specify callbackOrActions');
        return {
            close: function close() {}
        };
    }
    var prefixCls = 'am-modal';
    var data = {
        text: defaultValue
    };
    function onChange(e) {
        var target = e.target;
        var inputType = target.getAttribute('type');
        if (inputType !== null) {
            data[inputType] = target.value;
        }
    }
    var inputDom = void 0;
    var focusFn = function focusFn(input) {
        setTimeout(function () {
            if (input) {
                input.focus();
            }
        }, 500);
    };
    switch (type) {
        case 'login-password':
            inputDom = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-input-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement('input', { type: 'text', defaultValue: data.text, ref: function ref(input) {
                                return focusFn(input);
                            }, onChange: onChange, placeholder: placeholders[0] })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement('input', { type: 'password', defaultValue: data.password, onChange: onChange, placeholder: placeholders[1] })
                    )
                )
            );
            break;
        case 'secure-text':
            inputDom = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-input-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement('input', { type: 'password', defaultValue: data.password, ref: function ref(input) {
                                return focusFn(input);
                            }, onChange: onChange, placeholder: placeholders[0] })
                    )
                )
            );
            break;
        case 'default':
        default:
            inputDom = _react2['default'].createElement(
                'div',
                { className: prefixCls + '-input-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefixCls + '-input' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        _react2['default'].createElement('input', { type: 'text', defaultValue: data.text, ref: function ref(input) {
                                return focusFn(input);
                            }, onChange: onChange, placeholder: placeholders[0] })
                    )
                )
            );
    }
    var content = _react2['default'].createElement(
        'div',
        null,
        message,
        inputDom
    );
    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        _reactDom2['default'].unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    function handleConfirm(callback) {
        if (typeof callback !== 'function') {
            return;
        }
        var _data$text = data.text,
            text = _data$text === undefined ? '' : _data$text,
            _data$password = data.password,
            password = _data$password === undefined ? '' : _data$password;

        var callbackArgs = type === 'login-password' ? [text, password] : type === 'secure-text' ? [password] : [text];
        return callback.apply(undefined, callbackArgs);
    }
    var actions = void 0;
    if (typeof callbackOrActions === 'function') {
        actions = [{
            text: '取消',
            onPress: function onPress() {}
        }, {
            text: '确定',
            onPress: function onPress() {
                handleConfirm(callbackOrActions);
            }
        }];
    } else {
        actions = callbackOrActions.map(function (item) {
            return {
                text: item.text,
                onPress: function onPress() {
                    return handleConfirm(item.onPress);
                }
            };
        });
    }
    var footer = actions.map(function (button) {
        // tslint:disable-next-line:only-arrow-functions
        var orginPress = button.onPress || function () {};
        button.onPress = function () {
            if (closed) {
                return;
            }
            var res = orginPress();
            if (res && res.then) {
                res.then(function () {
                    closed = true;
                    close();
                })['catch'](function () {});
            } else {
                closed = true;
                close();
            }
        };
        return button;
    });
    function onWrapTouchStart(e) {
        // exclude input element for focus
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        var pNode = (0, _closest2['default'])(e.currentTarget, '.' + prefixCls + '-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    _reactDom2['default'].render(_react2['default'].createElement(
        _Modal2['default'],
        { visible: true, transparent: true, prefixCls: prefixCls, title: title, closable: false, maskClosable: false, transitionName: 'am-zoom', footer: footer, maskTransitionName: 'am-fade', platform: platform, wrapProps: { onTouchStart: onWrapTouchStart } },
        _react2['default'].createElement(
            'div',
            { className: prefixCls + '-propmt-content' },
            content
        )
    ), div);
    return {
        close: close
    };
}
module.exports = exports['default'];

/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(833);

/***/ }),

/***/ 833:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(102);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames3 = __webpack_require__(101);

var _classnames4 = _interopRequireDefault(_classnames3);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcFeedback = __webpack_require__(284);

var _rmcFeedback2 = _interopRequireDefault(_rmcFeedback);

var _getLocale = __webpack_require__(361);

var _CustomInput = __webpack_require__(835);

var _CustomInput2 = _interopRequireDefault(_CustomInput);

var _Input = __webpack_require__(839);

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
/* tslint:disable:jsx-no-multiline-js */

function noop() {}
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var InputItem = function (_React$Component) {
    (0, _inherits3['default'])(InputItem, _React$Component);

    function InputItem(props) {
        (0, _classCallCheck3['default'])(this, InputItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (InputItem.__proto__ || Object.getPrototypeOf(InputItem)).call(this, props));

        _this.onInputChange = function (e) {
            var value = e.target.value;
            var type = _this.props.type;

            switch (type) {
                case 'text':
                    break;
                case 'bankCard':
                    value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                    break;
                case 'phone':
                    value = value.replace(/\D/g, '').substring(0, 11);
                    var valueLen = value.length;
                    if (valueLen > 3 && valueLen < 8) {
                        value = value.substr(0, 3) + ' ' + value.substr(3);
                    } else if (valueLen >= 8) {
                        value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7);
                    }
                    break;
                case 'number':
                    value = value.replace(/\D/g, '');
                    break;
                case 'password':
                    break;
                default:
                    break;
            }
            _this.handleOnChange(value);
        };
        _this.handleOnChange = function (value) {
            var onChange = _this.props.onChange;

            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            } else {
                _this.setState({ value: _this.props.value });
            }
            if (onChange) {
                onChange(value);
            }
        };
        _this.onInputFocus = function (value) {
            if (_this.debounceTimeout) {
                clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = null;
            }
            _this.setState({
                focus: true
            });
            if (_this.props.onFocus) {
                _this.props.onFocus(value);
            }
        };
        _this.onInputBlur = function (value) {
            if (_this.inputRef) {
                // this.inputRef may be null if customKeyboard unmount
                _this.debounceTimeout = setTimeout(function () {
                    if (document.activeElement !== (_this.inputRef && _this.inputRef.inputRef)) {
                        _this.setState({
                            focus: false
                        });
                    }
                }, 200);
            }
            if (_this.props.onBlur) {
                _this.props.onBlur(value);
            }
        };
        _this.onExtraClick = function (e) {
            if (_this.props.onExtraClick) {
                _this.props.onExtraClick(e);
            }
        };
        _this.onErrorClick = function (e) {
            if (_this.props.onErrorClick) {
                _this.props.onErrorClick(e);
            }
        };
        _this.clearInput = function () {
            if (_this.props.type !== 'password' && _this.props.updatePlaceholder) {
                _this.setState({
                    placeholder: _this.props.value
                });
            }
            _this.setState({
                value: ''
            });
            if (_this.props.onChange) {
                _this.props.onChange('');
            }
            _this.focus();
        };
        _this.focus = function () {
            if (_this.inputRef) {
                _this.inputRef.focus();
            }
        };
        _this.state = {
            placeholder: props.placeholder,
            value: props.value || props.defaultValue || ''
        };
        return _this;
    }

    (0, _createClass3['default'])(InputItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('placeholder' in nextProps && !nextProps.updatePlaceholder) {
                this.setState({
                    placeholder: nextProps.placeholder
                });
            }
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classnames,
                _classnames2,
                _this2 = this;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                prefixListCls = _a.prefixListCls,
                editable = _a.editable,
                style = _a.style,
                clear = _a.clear,
                children = _a.children,
                error = _a.error,
                className = _a.className,
                extra = _a.extra,
                labelNumber = _a.labelNumber,
                onExtraClick = _a.onExtraClick,
                onErrorClick = _a.onErrorClick,
                updatePlaceholder = _a.updatePlaceholder,
                type = _a.type,
                locale = _a.locale,
                moneyKeyboardAlign = _a.moneyKeyboardAlign,
                restProps = __rest(_a, ["prefixCls", "prefixListCls", "editable", "style", "clear", "children", "error", "className", "extra", "labelNumber", "onExtraClick", "onErrorClick", "updatePlaceholder", "type", "locale", "moneyKeyboardAlign"]);var defaultValue = restProps.defaultValue,
                name = restProps.name,
                disabled = restProps.disabled,
                maxLength = restProps.maxLength;
            var value = this.state.value;
            // tslint:disable-next-line:variable-name

            var _locale = (0, _getLocale.getComponentLocale)(this.props, this.context, 'InputItem', function () {
                return __webpack_require__(840);
            });
            var confirmLabel = _locale.confirmLabel;
            var _state = this.state,
                placeholder = _state.placeholder,
                focus = _state.focus;

            var wrapCls = (0, _classnames4['default'])(prefixListCls + '-item', prefixCls + '-item', prefixListCls + '-item-middle', className, (_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classnames, prefixCls + '-error', error), (0, _defineProperty3['default'])(_classnames, prefixCls + '-focus', focus), (0, _defineProperty3['default'])(_classnames, prefixCls + '-android', focus), _classnames));
            var labelCls = (0, _classnames4['default'])(prefixCls + '-label', (_classnames2 = {}, (0, _defineProperty3['default'])(_classnames2, prefixCls + '-label-2', labelNumber === 2), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-label-3', labelNumber === 3), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-label-4', labelNumber === 4), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-label-5', labelNumber === 5), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-label-6', labelNumber === 6), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-label-7', labelNumber === 7), _classnames2));
            var controlCls = prefixCls + '-control';
            var inputType = 'text';
            if (type === 'bankCard' || type === 'phone') {
                inputType = 'tel';
            } else if (type === 'password') {
                inputType = 'password';
            } else if (type === 'digit') {
                inputType = 'number';
            } else if (type !== 'text' && type !== 'number') {
                inputType = type;
            }
            var patternProps = void 0;
            if (type === 'number') {
                patternProps = {
                    pattern: '[0-9]*'
                };
            }
            var classNameProps = void 0;
            if (type === 'digit') {
                classNameProps = {
                    className: 'h5numInput'
                };
            }
            return _react2['default'].createElement(
                'div',
                { className: wrapCls },
                _react2['default'].createElement(
                    'div',
                    { className: prefixListCls + '-line' },
                    children ? _react2['default'].createElement(
                        'div',
                        { className: labelCls },
                        children
                    ) : null,
                    _react2['default'].createElement(
                        'div',
                        { className: controlCls },
                        type === 'money' ? _react2['default'].createElement(_CustomInput2['default'], { value: fixControlledValue(value), defaultValue: defaultValue, type: type, ref: function ref(el) {
                                return _this2.inputRef = el;
                            }, maxLength: maxLength, placeholder: placeholder, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, disabled: disabled, editable: editable, prefixCls: prefixCls, style: style, confirmLabel: confirmLabel, moneyKeyboardAlign: moneyKeyboardAlign }) : _react2['default'].createElement(_Input2['default'], (0, _extends3['default'])({}, patternProps, restProps, classNameProps, { value: fixControlledValue(value), defaultValue: defaultValue, ref: function ref(el) {
                                return _this2.inputRef = el;
                            }, style: style, type: inputType, maxLength: maxLength, name: name, placeholder: placeholder, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, readOnly: !editable, disabled: disabled }))
                    ),
                    clear && editable && !disabled && value && ('' + value).length > 0 ? _react2['default'].createElement(
                        _rmcFeedback2['default'],
                        { activeClassName: prefixCls + '-clear-active' },
                        _react2['default'].createElement('div', { className: prefixCls + '-clear', onClick: this.clearInput })
                    ) : null,
                    error ? _react2['default'].createElement('div', { className: prefixCls + '-error-extra', onClick: this.onErrorClick }) : null,
                    extra !== '' ? _react2['default'].createElement(
                        'div',
                        { className: prefixCls + '-extra', onClick: this.onExtraClick },
                        extra
                    ) : null
                )
            );
        }
    }]);
    return InputItem;
}(_react2['default'].Component);

InputItem.defaultProps = {
    prefixCls: 'am-input',
    prefixListCls: 'am-list',
    type: 'text',
    editable: true,
    disabled: false,
    placeholder: '',
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraClick: noop,
    error: false,
    onErrorClick: noop,
    labelNumber: 5,
    updatePlaceholder: false,
    moneyKeyboardAlign: 'right'
};
InputItem.contextTypes = {
    antLocale: _propTypes2['default'].object
};
exports['default'] = InputItem;
module.exports = exports['default'];

/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(42);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _class = __webpack_require__(836);

var _CustomKeyboard = __webpack_require__(837);

var _CustomKeyboard2 = _interopRequireDefault(_CustomKeyboard);

var _Portal = __webpack_require__(838);

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IS_REACT_16 = !!_reactDom2['default'].createPortal;
var customNumberKeyboard = null;

var NumberInput = function (_React$Component) {
    (0, _inherits3['default'])(NumberInput, _React$Component);

    function NumberInput(props) {
        (0, _classCallCheck3['default'])(this, NumberInput);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

        _this.onChange = function (value) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value.target.value });
            }
            _this.props.onChange(value);
        };
        _this.addBlurListener = function () {
            document.addEventListener('click', _this.doBlur, false);
        };
        _this.removeBlurListener = function () {
            document.removeEventListener('click', _this.doBlur, false);
        };
        _this.saveRef = function (el) {
            if (IS_REACT_16) {
                customNumberKeyboard = el;
            }
        };
        _this.doBlur = function (ev) {
            var value = _this.state.value;

            if (ev.target !== _this.inputRef) {
                _this.onInputBlur(value);
            }
        };
        _this.unLinkInput = function () {
            if (customNumberKeyboard && customNumberKeyboard.antmKeyboard && customNumberKeyboard.linkedInput && customNumberKeyboard.linkedInput === _this) {
                customNumberKeyboard.linkedInput = null;
                (0, _class.addClass)(customNumberKeyboard.antmKeyboard, _this.props.keyboardPrefixCls + '-wrapper-hide');
            }
            // for unmount
            _this.removeBlurListener();
        };
        _this.onInputBlur = function (value) {
            var focus = _this.state.focus;

            if (focus) {
                _this.setState({
                    focus: false
                });
                _this.props.onBlur(value);
                setTimeout(function () {
                    _this.unLinkInput();
                }, 50);
            }
        };
        _this.onInputFocus = function () {
            var value = _this.state.value;

            _this.props.onFocus(value);
            _this.setState({
                focus: true
            }, function () {
                if (customNumberKeyboard) {
                    customNumberKeyboard.linkedInput = _this;
                    if (customNumberKeyboard.antmKeyboard) {
                        (0, _class.removeClass)(customNumberKeyboard.antmKeyboard, _this.props.keyboardPrefixCls + '-wrapper-hide');
                    }
                    customNumberKeyboard.confirmDisabled = value === '';
                    if (customNumberKeyboard.confirmKeyboardItem) {
                        if (value === '') {
                            (0, _class.addClass)(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                        } else {
                            (0, _class.removeClass)(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                        }
                    }
                }
            });
        };
        _this.onKeyboardClick = function (KeyboardItemValue) {
            var maxLength = _this.props.maxLength;
            var value = _this.state.value;
            // tslint:disable-next-line:no-this-assignment

            var onChange = _this.onChange;

            var valueAfterChange = void 0;
            // 删除键
            if (KeyboardItemValue === 'delete') {
                valueAfterChange = value.substring(0, value.length - 1);
                onChange({ target: { value: valueAfterChange } });
                // 确认键
            } else if (KeyboardItemValue === 'confirm') {
                valueAfterChange = value;
                onChange({ target: { value: valueAfterChange } });
                _this.onInputBlur(value);
                // 收起键
            } else if (KeyboardItemValue === 'hide') {
                valueAfterChange = value;
                _this.onInputBlur(valueAfterChange);
            } else {
                if (maxLength !== undefined && +maxLength >= 0 && (value + KeyboardItemValue).length > maxLength) {
                    valueAfterChange = (value + KeyboardItemValue).substr(0, maxLength);
                    onChange({ target: { value: valueAfterChange } });
                } else {
                    valueAfterChange = value + KeyboardItemValue;
                    onChange({ target: { value: valueAfterChange } });
                }
            }
            if (customNumberKeyboard) {
                customNumberKeyboard.confirmDisabled = valueAfterChange === '';
                if (customNumberKeyboard.confirmKeyboardItem) {
                    if (valueAfterChange === '') {
                        (0, _class.addClass)(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                    } else {
                        (0, _class.removeClass)(customNumberKeyboard.confirmKeyboardItem, _this.props.keyboardPrefixCls + '-item-disabled');
                    }
                }
            }
        };
        _this.onFakeInputClick = function () {
            _this.focus();
        };
        _this.focus = function () {
            // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
            _this.removeBlurListener();
            var focus = _this.state.focus;

            if (!focus) {
                _this.onInputFocus();
            }
            setTimeout(function () {
                _this.addBlurListener();
            }, 50);
        };
        _this.state = {
            focus: false,
            value: props.value || ''
        };
        return _this;
    }

    (0, _createClass3['default'])(NumberInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.renderCustomKeyboard();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // focus:true unmount 不能触发 blur
            if (this.state.focus) {
                this.props.onBlur(this.state.value);
            }
            this.unLinkInput();
        }
    }, {
        key: 'getComponent',
        value: function getComponent() {
            var _props = this.props,
                keyboardPrefixCls = _props.keyboardPrefixCls,
                confirmLabel = _props.confirmLabel;

            return _react2['default'].createElement(_CustomKeyboard2['default'], { ref: this.saveRef, onClick: this.onKeyboardClick, preixCls: keyboardPrefixCls, confirmLabel: confirmLabel });
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            var container = document.querySelector('#' + this.props.keyboardPrefixCls + '-container');
            if (!container) {
                container = document.createElement('div');
                container.setAttribute('id', this.props.keyboardPrefixCls + '-container');
                document.body.appendChild(container);
            }
            this.container = container;
            return container;
        }
    }, {
        key: 'renderCustomKeyboard',
        value: function renderCustomKeyboard() {
            if (IS_REACT_16 || customNumberKeyboard) {
                return;
            }
            customNumberKeyboard = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, this.getComponent(), this.getContainer());
        }
    }, {
        key: 'renderPortal',
        value: function renderPortal() {
            var _this2 = this;

            if (!IS_REACT_16) {
                return null;
            }
            var portal = _react2['default'].createElement(
                _Portal2['default'],
                { getContainer: function getContainer() {
                        return _this2.getContainer();
                    } },
                this.getComponent()
            );
            return portal;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                placeholder = _props2.placeholder,
                disabled = _props2.disabled,
                editable = _props2.editable,
                moneyKeyboardAlign = _props2.moneyKeyboardAlign;
            var _state = this.state,
                focus = _state.focus,
                value = _state.value;

            var preventKeyboard = disabled || !editable;
            var fakeInputCls = (0, _classnames2['default'])('fake-input', {
                focus: focus,
                'fake-input-disabled': disabled
            });
            var fakeInputContainerCls = (0, _classnames2['default'])('fake-input-container', {
                'fake-input-container-left': moneyKeyboardAlign === 'left'
            });
            return _react2['default'].createElement(
                'div',
                { className: fakeInputContainerCls },
                value === '' &&
                // tslint:disable-next-line:jsx-no-multiline-js
                _react2['default'].createElement(
                    'div',
                    { className: 'fake-input-placeholder' },
                    placeholder
                ),
                _react2['default'].createElement(
                    'div',
                    { className: fakeInputCls, ref: function ref(el) {
                            return _this3.inputRef = el;
                        }, onClick: preventKeyboard ? function () {} : this.onFakeInputClick },
                    value
                ),
                this.renderPortal()
            );
        }
    }]);
    return NumberInput;
}(_react2['default'].Component);

NumberInput.defaultProps = {
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    placeholder: '',
    disabled: false,
    editable: true,
    prefixCls: 'am-input',
    keyboardPrefixCls: 'am-number-keyboard'
};
exports['default'] = NumberInput;
module.exports = exports['default'];

/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
function hasClass(node, className) {
    if (node.classList) {
        return node.classList.contains(className);
    }
    var originClass = node.className;
    return (' ' + originClass + ' ').indexOf(' ' + className + ' ') > -1;
}
function addClass(node, className) {
    if (node.classList) {
        node.classList.add(className);
    } else {
        if (!hasClass(node, className)) {
            node.className = node.className + ' ' + className;
        }
    }
}
function removeClass(node, className) {
    if (node.classList) {
        node.classList.remove(className);
    } else {
        if (hasClass(node, className)) {
            var originClass = node.className;
            node.className = (' ' + originClass + ' ').replace(' ' + className + ' ', '');
        }
    }
}

/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyboardItem = undefined;

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = __webpack_require__(101);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _rmcFeedback = __webpack_require__(284);

var _rmcFeedback2 = _interopRequireDefault(_rmcFeedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var KeyboardItem = exports.KeyboardItem = function (_React$Component) {
    (0, _inherits3['default'])(KeyboardItem, _React$Component);

    function KeyboardItem() {
        (0, _classCallCheck3['default'])(this, KeyboardItem);
        return (0, _possibleConstructorReturn3['default'])(this, (KeyboardItem.__proto__ || Object.getPrototypeOf(KeyboardItem)).apply(this, arguments));
    }

    (0, _createClass3['default'])(KeyboardItem, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                prefixCls = _a.prefixCls,
                _onClick = _a.onClick,
                className = _a.className,
                disabled = _a.disabled,
                children = _a.children,
                tdRef = _a.tdRef,
                restProps = __rest(_a, ["prefixCls", "onClick", "className", "disabled", "children", "tdRef"]);
            var value = children;
            if (className === 'keyboard-delete') {
                value = 'delete';
            } else if (className === 'keyboard-hide') {
                value = 'hide';
            } else if (className === 'keyboard-confirm') {
                value = 'confirm';
            }
            var wrapCls = (0, _classnames2['default'])(prefixCls + '-item', className);
            return _react2['default'].createElement(
                _rmcFeedback2['default'],
                { activeClassName: prefixCls + '-item-active' },
                _react2['default'].createElement(
                    'td',
                    (0, _extends3['default'])({ ref: tdRef
                        // tslint:disable-next-line:jsx-no-multiline-js
                        , onClick: function onClick(e) {
                            _onClick(e, value);
                        }, className: wrapCls }, restProps),
                    children
                )
            );
        }
    }]);
    return KeyboardItem;
}(_react2['default'].Component);

KeyboardItem.defaultProps = {
    prefixCls: 'am-number-keyboard',
    onClick: function onClick() {},
    disabled: false
};

var CustomKeyboard = function (_React$Component2) {
    (0, _inherits3['default'])(CustomKeyboard, _React$Component2);

    function CustomKeyboard() {
        (0, _classCallCheck3['default'])(this, CustomKeyboard);

        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (CustomKeyboard.__proto__ || Object.getPrototypeOf(CustomKeyboard)).apply(this, arguments));

        _this2.onKeyboardClick = function (e, value) {
            e.nativeEvent.stopImmediatePropagation();
            if (value === 'confirm' && _this2.confirmDisabled) {
                return null;
            } else {
                if (_this2.linkedInput) {
                    _this2.linkedInput.onKeyboardClick(value);
                }
            }
        };
        _this2.renderKeyboardItem = function (item, index) {
            return _react2['default'].createElement(
                KeyboardItem,
                { onClick: _this2.onKeyboardClick, key: 'item-' + item + '-' + index },
                item
            );
        };
        return _this2;
    }

    (0, _createClass3['default'])(CustomKeyboard, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                confirmLabel = _props.confirmLabel;

            var wrapperCls = (0, _classnames2['default'])(prefixCls + '-wrapper', prefixCls + '-wrapper-hide');
            return _react2['default'].createElement(
                'div',
                { className: wrapperCls, ref: function ref(el) {
                        return _this3.antmKeyboard = el;
                    } },
                _react2['default'].createElement(
                    'table',
                    null,
                    _react2['default'].createElement(
                        'tbody',
                        null,
                        _react2['default'].createElement(
                            'tr',
                            null,
                            ['1', '2', '3'].map(function (item, index) {
                                return (
                                    // tslint:disable-next-line:jsx-no-multiline-js
                                    _this3.renderKeyboardItem(item, index)
                                );
                            }),
                            _react2['default'].createElement(KeyboardItem, { className: 'keyboard-delete', rowSpan: 2, onClick: this.onKeyboardClick })
                        ),
                        _react2['default'].createElement(
                            'tr',
                            null,
                            ['4', '5', '6'].map(function (item, index) {
                                return (
                                    // tslint:disable-next-line:jsx-no-multiline-js
                                    _this3.renderKeyboardItem(item, index)
                                );
                            })
                        ),
                        _react2['default'].createElement(
                            'tr',
                            null,
                            ['7', '8', '9'].map(function (item, index) {
                                return (
                                    // tslint:disable-next-line:jsx-no-multiline-js
                                    _this3.renderKeyboardItem(item, index)
                                );
                            }),
                            _react2['default'].createElement(
                                KeyboardItem,
                                { className: 'keyboard-confirm', rowSpan: 2, onClick: this.onKeyboardClick, tdRef: function tdRef(el) {
                                        return _this3.confirmKeyboardItem = el;
                                    } },
                                confirmLabel
                            )
                        ),
                        _react2['default'].createElement(
                            'tr',
                            null,
                            ['.', '0'].map(function (item, index) {
                                return (
                                    // tslint:disable-next-line:jsx-no-multiline-js
                                    _this3.renderKeyboardItem(item, index)
                                );
                            }),
                            _react2['default'].createElement(KeyboardItem, { className: 'keyboard-hide', onClick: this.onKeyboardClick })
                        )
                    )
                )
            );
        }
    }]);
    return CustomKeyboard;
}(_react2['default'].Component);

CustomKeyboard.defaultProps = {
    prefixCls: 'am-number-keyboard'
};
exports['default'] = CustomKeyboard;

/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(42);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var createPortal = _reactDom2['default'].createPortal;

var Portal = function (_React$Component) {
    (0, _inherits3['default'])(Portal, _React$Component);

    function Portal(props) {
        (0, _classCallCheck3['default'])(this, Portal);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, props));

        _this.container = _this.props.getContainer();
        return _this;
    }

    (0, _createClass3['default'])(Portal, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.children) {
                return createPortal(this.props.children, this.container);
            }
            return null;
        }
    }]);
    return Portal;
}(_react2['default'].Component);

exports['default'] = Portal;
module.exports = exports['default'];

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Input = function (_React$Component) {
    (0, _inherits3["default"])(Input, _React$Component);

    function Input() {
        (0, _classCallCheck3["default"])(this, Input);

        var _this = (0, _possibleConstructorReturn3["default"])(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

        _this.onInputBlur = function (e) {
            var value = e.target.value;
            if (_this.props.onBlur) {
                _this.props.onBlur(value);
            }
        };
        _this.onInputFocus = function (e) {
            // here should have a value definition but none.
            var value = e.target.value;
            if (_this.props.onFocus) {
                _this.props.onFocus(value);
            }
        };
        _this.focus = function () {
            if (_this.inputRef) {
                _this.inputRef.focus();
            }
        };
        return _this;
    }

    (0, _createClass3["default"])(Input, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _a = this.props,
                onBlur = _a.onBlur,
                onFocus = _a.onFocus,
                restProps = __rest(_a, ["onBlur", "onFocus"]);
            return _react2["default"].createElement("input", (0, _extends3["default"])({ ref: function ref(el) {
                    return _this2.inputRef = el;
                }, onBlur: this.onInputBlur, onFocus: this.onInputFocus }, restProps));
        }
    }]);
    return Input;
}(_react2["default"].Component);

exports["default"] = Input;
module.exports = exports["default"];

/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = {
    confirmLabel: '确定'
};
module.exports = exports['default'];

/***/ }),

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(288);

__webpack_require__(842);

/***/ }),

/***/ 842:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Radio = __webpack_require__(821);

var _Radio2 = _interopRequireDefault(_Radio);

var _RadioItem = __webpack_require__(854);

var _RadioItem2 = _interopRequireDefault(_RadioItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Radio2['default'].RadioItem = _RadioItem2['default'];
exports['default'] = _Radio2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(100);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(102);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames2 = __webpack_require__(101);

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _list = __webpack_require__(297);

var _list2 = _interopRequireDefault(_list);

var _Radio = __webpack_require__(821);

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var ListItem = _list2['default'].Item;
function noop() {}

var RadioItem = function (_React$Component) {
    (0, _inherits3['default'])(RadioItem, _React$Component);

    function RadioItem() {
        (0, _classCallCheck3['default'])(this, RadioItem);
        return (0, _possibleConstructorReturn3['default'])(this, (RadioItem.__proto__ || Object.getPrototypeOf(RadioItem)).apply(this, arguments));
    }

    (0, _createClass3['default'])(RadioItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _a = this.props,
                listPrefixCls = _a.listPrefixCls,
                onChange = _a.onChange,
                disabled = _a.disabled,
                radioProps = _a.radioProps,
                onClick = _a.onClick,
                otherProps = __rest(_a, ["listPrefixCls", "onChange", "disabled", "radioProps", "onClick"]);var prefixCls = otherProps.prefixCls,
                className = otherProps.className,
                children = otherProps.children;

            var wrapCls = (0, _classnames3['default'])(prefixCls + '-item', className, (0, _defineProperty3['default'])({}, prefixCls + '-item-disabled', disabled === true));
            // Note: if not omit `onChange`, it will trigger twice on check listitem
            if (!disabled) {
                otherProps.onClick = onClick || noop;
            }
            var extraProps = {};
            ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(function (i) {
                if (i in _this2.props) {
                    extraProps[i] = _this2.props[i];
                }
            });
            return _react2['default'].createElement(
                ListItem,
                (0, _extends3['default'])({}, otherProps, { prefixCls: listPrefixCls, className: wrapCls, extra: _react2['default'].createElement(_Radio2['default'], (0, _extends3['default'])({}, radioProps, extraProps)) }),
                children
            );
        }
    }]);
    return RadioItem;
}(_react2['default'].Component);

exports['default'] = RadioItem;

RadioItem.defaultProps = {
    prefixCls: 'am-radio',
    listPrefixCls: 'am-list',
    radioProps: {}
};
module.exports = exports['default'];

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(103);

__webpack_require__(288);

__webpack_require__(858);

/***/ }),

/***/ 858:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 927:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAApUlEQVQokZXSwcoBURQH8J/h1TwTJQvJkq3InskbKG8gPAB9648d2VDGYkzpdk3mvzt1fqfbPaeWpukKTdWyTtBCVgFlaCfYYVEBLrFJ3kUX9x/QAx0o4BHTH+AMh08IfVxL0A29oviEJwxL4BD/MQij94Aw53BoCK/yJ4cZ4FIGYSL/rCJ/GIdNMfiQr6dIdFUxSH4QW+wxjzU0vsAMbdTxjDW8AGqSJoBCPgIcAAAAAElFTkSuQmCC"

/***/ })

});