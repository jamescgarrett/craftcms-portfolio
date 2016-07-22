(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
function serialize(form, options) {
    if (typeof options != 'object') {
        options = { hash: !!options };
    }
    else if (options.hash === undefined) {
        options.hash = true;
    }

    var result = (options.hash) ? {} : '';
    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

    var elements = form && form.elements ? form.elements : [];

    //Object store each radio and set if it's empty or not
    var radio_store = Object.create(null);

    for (var i=0 ; i<elements.length ; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if ((!options.disabled && element.disabled) || !element.name) {
            continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) ||
            k_r_submitter.test(element.type)) {
            continue;
        }

        var key = element.name;
        var val = element.value;

        // we can't just use element.value for checkboxes cause some browsers lie to us
        // they say "on" for value when the box isn't checked
        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
            val = undefined;
        }

        // If we want empty elements
        if (options.empty) {
            // for checkbox
            if (element.type === 'checkbox' && !element.checked) {
                val = '';
            }

            // for radio
            if (element.type === 'radio') {
                if (!radio_store[element.name] && !element.checked) {
                    radio_store[element.name] = false;
                }
                else if (element.checked) {
                    radio_store[element.name] = true;
                }
            }

            // if options empty is true, continue only if its radio
            if (!val && element.type == 'radio') {
                continue;
            }
        }
        else {
            // value-less fields are ignored unless options.empty is true
            if (!val) {
                continue;
            }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
            val = [];

            var selectOptions = element.options;
            var isSelectedOptions = false;
            for (var j=0 ; j<selectOptions.length ; ++j) {
                var option = selectOptions[j];
                var allowedEmpty = options.empty && !option.value;
                var hasValue = (option.value || allowedEmpty);
                if (option.selected && hasValue) {
                    isSelectedOptions = true;

                    // If using a hash serializer be sure to add the
                    // correct notation for an array in the multi-select
                    // context. Here the name attribute on the select element
                    // might be missing the trailing bracket pair. Both names
                    // "foo" and "foo[]" should be arrays.
                    if (options.hash && key.slice(key.length - 2) !== '[]') {
                        result = serializer(result, key + '[]', option.value);
                    }
                    else {
                        result = serializer(result, key, option.value);
                    }
                }
            }

            // Serialize if no selected options and options.empty is true
            if (!isSelectedOptions && options.empty) {
                result = serializer(result, key, '');
            }

            continue;
        }

        result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
        for (var key in radio_store) {
            if (!radio_store[key]) {
                result = serializer(result, key, '');
            }
        }
    }

    return result;
}

function parse_keys(string) {
    var keys = [];
    var prefix = /^([^\[\]]*)/;
    var children = new RegExp(brackets);
    var match = prefix.exec(string);

    if (match[1]) {
        keys.push(match[1]);
    }

    while ((match = children.exec(string)) !== null) {
        keys.push(match[1]);
    }

    return keys;
}

function hash_assign(result, keys, value) {
    if (keys.length === 0) {
        result = value;
        return result;
    }

    var key = keys.shift();
    var between = key.match(/^\[(.+?)\]$/);

    if (key === '[]') {
        result = result || [];

        if (Array.isArray(result)) {
            result.push(hash_assign(null, keys, value));
        }
        else {
            // This might be the result of bad name attributes like "[][foo]",
            // in this case the original `result` object will already be
            // assigned to an object literal. Rather than coerce the object to
            // an array, or cause an exception the attribute "_values" is
            // assigned as an array.
            result._values = result._values || [];
            result._values.push(hash_assign(null, keys, value));
        }

        return result;
    }

    // Key is an attribute name and can be assigned directly.
    if (!between) {
        result[key] = hash_assign(result[key], keys, value);
    }
    else {
        var string = between[1];
        // +var converts the variable into a number
        // better than parseInt because it doesn't truncate away trailing
        // letters and actually fails if whole thing is not a number
        var index = +string;

        // If the characters between the brackets is not a number it is an
        // attribute name and can be assigned directly.
        if (isNaN(index)) {
            result = result || {};
            result[string] = hash_assign(result[string], keys, value);
        }
        else {
            result = result || [];
            result[index] = hash_assign(result[index], keys, value);
        }
    }

    return result;
}

// Object/hash encoding serializer.
function hash_serializer(result, key, value) {
    var matches = key.match(brackets);

    // Has brackets? Use the recursive assignment function to walk the keys,
    // construct any missing objects in the result tree and make the assignment
    // at the end of the chain.
    if (matches) {
        var keys = parse_keys(key);
        hash_assign(result, keys, value);
    }
    else {
        // Non bracket notation can make assignments directly.
        var existing = result[key];

        // If the value has been assigned already (for instance when a radio and
        // a checkbox have the same name attribute) convert the previous value
        // into an array before pushing into it.
        //
        // NOTE: If this requirement were removed all hash creation and
        // assignment could go through `hash_assign`.
        if (existing) {
            if (!Array.isArray(existing)) {
                result[key] = [ existing ];
            }

            result[key].push(value);
        }
        else {
            result[key] = value;
        }
    }

    return result;
}

// urlform encoding serializer
function str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
}

module.exports = serialize;

},{}],2:[function(require,module,exports){
'use strict';

var _Utils = require('../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (event) {

    var items = [document.querySelector('.js-hiddenList-lists'), document.querySelector('.js-hiddenList-toggle')];
    var lists = document.querySelectorAll('.js-hiddenList-item');

    for (var i = 0; i < items.length; i++) {
        _Utils2.default.toggleClass(items[i], 'is-active');
    }

    for (var d = 0; d < lists.length; d++) {
        _Utils2.default.toggleClass(lists[d], 'is-active');
    }

    // Change Button Text
    if (event.currentTarget.textContent === 'View More Clients') {
        event.currentTarget.textContent = 'View Less';
    } else {
        event.currentTarget.textContent = 'View More Clients';
    }
};

},{"../utils/Utils":8}],3:[function(require,module,exports){
'use strict';

var _formSerialize = require('form-serialize');

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _Utils = require('../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = {};

var displayFormSuccess = function displayFormSuccess(form, message, container) {
    container.querySelector('.formSuccess').innerHTML = message;
};

var displayLoading = function displayLoading(form, container) {
    var formSuccess = container.querySelector('.formSuccess-loading');
    if (formSuccess.classList) {
        formSuccess.classList.add('is-active');
    }

    if (form.classList) {
        form.classList.add('hidden');
    }
};

Form.submitForm = function (form, message, container, autoClose, e) {
    e.preventDefault();

    displayLoading(form, container);

    var formData = (0, _formSerialize2.default)(form);
    var request = new XMLHttpRequest();

    request.open('post', encodeURI('/'), true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            displayFormSuccess(form, message, container);
            if (autoClose) {
                (function () {
                    var body = document.getElementsByTagName('body')[0];
                    setTimeout(function () {
                        _Utils2.default.toggleClass(container, 'is-active');
                        _Utils2.default.toggleClass(body, 'is-locked');
                    }, 1200);
                })();
            }
        } else if (request.status === 200 && request.readyState !== 4) {
            displayLoading(form, container);
        } else {
            // console.log("Failed");
        }
    };

    request.send(formData);
};

Form.ToggleForm = function (container, e) {
    var body = document.getElementsByTagName('body')[0];

    _Utils2.default.toggleClass(container, 'is-active');

    // Apply locked class on body
    _Utils2.default.toggleClass(body, 'is-locked');
};

module.exports = Form;

},{"../utils/Utils":8,"form-serialize":1}],4:[function(require,module,exports){
'use strict';

var _Utils = require('../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    var items = [document.querySelector('.js-nav'), document.querySelector('.js-navToggle'), document.querySelector('.js-overlay')];
    var body = document.getElementsByTagName('body')[0];

    // Loop siteNav items and apply active class
    for (var i = 0; i < items.length; i++) {
        _Utils2.default.toggleClass(items[i], 'is-active');
    }

    // Apply locked class on body
    _Utils2.default.toggleClass(body, 'is-locked');
};

},{"../utils/Utils":8}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function Stick() {
    this.lstScrollY = 0;
    this.ticking = false;
    this.done = false;

    var defaults = {
        item: null,
        animation: null,
        offset: null,
        reverse: false
    };

    if (arguments[0] && _typeof(arguments[0]) === 'object') {
        this.options = extendDefaults(defaults, arguments[0]);
    }

    init.call(this);
}

// Public Methods
Stick.prototype.onScroll = function () {
    if (!this.done) {
        this.lastScrollY = window.scrollY;
        this.requestTick();
    }
};

Stick.prototype.requestTick = function () {
    if (!this.ticking) {
        requestAnimationFrame(this.rafUpdate.bind(this));
        this.ticking = true;
    }
};

Stick.prototype.rafUpdate = function () {
    if (this.lastScrollY > this.options.offset) {
        this.options.item.classList.add(this.options.animation);
        if (!this.options.reverse) {
            this.done = true;
        }
    } else {
        this.options.item.classList.remove(this.options.animation);
    }

    this.ticking = false;
};

// Private methods
function init() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
}

// Utitlity Methods
function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

module.exports = Stick;

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function (filters, filterItem, event) {
    var works = document.querySelectorAll('.workList-item');
    var category = filterItem.getAttribute('data-category');

    // Choose Work Filter
    for (var f = 0; f < filters.length; f++) {
        filters[f].classList.remove('workList-filter-item-is-active');
    }

    filterItem.classList.add('workList-filter-item-is-active');

    // Filter Work List based on Category
    for (var w = 0; w < works.length; w++) {
        if (works[w].classList.contains(category) || category === 'all') {
            works[w].classList.remove('workList-item-is-hidden');
        } else {
            works[w].classList.add('workList-item-is-hidden');
        }
    }
};

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var _wow = (typeof window !== "undefined" ? window['WOW'] : typeof global !== "undefined" ? global['WOW'] : null);

var _wow2 = _interopRequireDefault(_wow);

var _Nav = require('./components/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _ClientList = require('./components/ClientList');

var _ClientList2 = _interopRequireDefault(_ClientList);

var _WorkFilter = require('./components/WorkFilter');

var _WorkFilter2 = _interopRequireDefault(_WorkFilter);

var _Form = require('./components/Form');

var _Form2 = _interopRequireDefault(_Form);

var _Stick = require('./components/Stick');

var _Stick2 = _interopRequireDefault(_Stick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {

    /*
     *  Navigation
     *
     */
    if (typeof document.querySelector('.js-navToggle') !== 'undefined' && document.querySelector('.js-navToggle') !== null || document.querySelector('.js-overlay') !== 'undefined' && document.querySelector('.js-overlay') !== null) {
        var navToggles = [document.querySelector('.js-navToggle'), document.querySelector('.js-overlay')];
        for (var i = 0; i < navToggles.length; i++) {
            navToggles[i].addEventListener('click', _Nav2.default.bind(this));
        }
    }

    /*
     *  Toggle Client List
     *
     */
    if (typeof document.querySelector('.js-hiddenList-toggle') !== 'undefined' && document.querySelector('.js-hiddenList-toggle') !== null) {
        document.querySelector('.js-hiddenList-toggle').addEventListener('click', _ClientList2.default.bind(this));
    }

    /*
     *  Work Filter
     *
     */
    if (typeof document.querySelector('.js-workList-filter-item') !== 'undefined' && document.querySelector('.js-workList-filter-item') !== null) {
        var filters = document.querySelectorAll('.js-workList-filter-item');
        for (var d = 0; d < filters.length; d++) {
            filters[d].addEventListener('click', _WorkFilter2.default.bind(this, filters, filters[d]));
        }
    }

    /*
     *  Toggle & Submit Contact Form
     *
     */
    if (typeof document.querySelector('.js-callToAction-toggle') !== 'undefined' && document.querySelector('.js-callToAction-toggle') !== null) {
        var contactForm = document.querySelector('.js-form--contact');
        var formContactContainer = document.querySelector('.js-formContainer--contact');
        var contactFormToggles = [document.querySelector('.js-callToAction-toggle'), document.querySelector('.js-formContainer-close')];
        for (var j = 0; j < contactFormToggles.length; j++) {
            contactFormToggles[j].addEventListener('click', _Form2.default.ToggleForm.bind(this, formContactContainer));
        }
        contactForm.addEventListener('submit', _Form2.default.submitForm.bind(this, contactForm, '<p><b>Thank you!</b><br>"We\'ll be in touch soon!</p>', formContactContainer, true));
    }

    /*
     *  Submit Newsletter Form
     *
     */
    if (typeof document.querySelector('.form--newsletter') !== 'undefined' && document.querySelector('.form--newsletter') !== null) {
        var newsletterForm = document.querySelector('.js-form--newsletter');
        var formNewsletterContainer = document.querySelector('.js-formContainer--newsletter');
        newsletterForm.addEventListener('submit', _Form2.default.submitForm.bind(this, newsletterForm, '<p><b>You\'ve been added to our list!</b></p>', formNewsletterContainer, false));
    }

    /*
     *  WOW. Animate elements on scroll
     *
     */
    if (typeof document.querySelector('.wow') !== 'undefined' && document.querySelector('.wow') !== null) {
        var wow = new _wow2.default({
            offset: 100,
            live: false
        });
        wow.init();
    }

    /*
     *  Control Sticky Header
     *
     */
    if (typeof document.querySelector('.js-intro--tall') !== 'undefined' && document.querySelector('.js-intro--tall') !== null) {
        var scrollHeader = new _Stick2.default({
            item: document.querySelector('.js-header'),
            animation: 'header--scrolling',
            offset: window.innerHeight - 30,
            reverse: true
        });
    }

    if (typeof document.querySelector('.js-intro--short') !== 'undefined' && document.querySelector('.js-intro--short') !== null) {
        var scrollHeaderShort = new _Stick2.default({
            item: document.querySelector('.js-header'),
            animation: 'header--scrolling',
            offset: window.innerHeight / 3,
            reverse: true
        });
    }

    if (typeof document.querySelector('.js-intro--shortest') !== 'undefined' && document.querySelector('.js-intro--shortest') !== null) {
        var _scrollHeaderShort = new _Stick2.default({
            item: document.querySelector('.js-header'),
            animation: 'header--scrolling',
            offset: window.innerHeight / 4,
            reverse: true
        });
    }

    /*
     *  Control Sticky Scroll Indicator
     *
     */
    if (typeof document.querySelector('.js-intro-scrollIndicator') !== 'undefined' && document.querySelector('.js-intro-scrollIndicator') !== null) {
        var scrollIndicator = new _Stick2.default({
            item: document.querySelector('.js-intro-scrollIndicator'),
            animation: 'invisible',
            offset: 14,
            reverse: true
        });
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./components/ClientList":2,"./components/Form":3,"./components/Nav":4,"./components/Stick":5,"./components/WorkFilter":6}],8:[function(require,module,exports){
'use strict';

var Utils = {};

Utils.toggleClass = function (ele, activeClass) {
    if (ele.classList) {
        ele.classList.toggle(activeClass);
    } else {
        var classes = ele.className.split(' ');
        var existingIndex = classes.indexOf(activeClass);

        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
        } else {
            classes.push(activeClass);
        }

        ele.className = classes.join(' ');
    }
};

Utils.closest = function (el, clazz) {
    while (el.className !== clazz) {
        el = el.parentNode;
        if (!el) {
            return null;
        }
    }
    return el;
};

/* Converts a JSON string to a JavaScript object
 * @param str String the JSON string
 * @returns obj Object the JavaScript object
 */
Utils.toJSONObject = function (str) {
    var obj = JSON.parse(str);

    return obj;
};

/* Converts a JavaScript object to a JSON string
 * @param obj Object the JavaScript object
 * @returns str String the JSON string
 */
Utils.toJSONString = function (obj) {
    var str = JSON.stringify(obj);

    return str;
};

/* Checks if value exists in associative array
 * @param arr array to search
 * @param key key to use in search
 * @param str string to check for
 * @returns index if found | -1 if not found
 */
Utils.inObject = function (arr, key, str) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i][key] === str) {
            return i;
        }
        i++;
    }
    return -1;
};

module.exports = Utils;

},{}]},{},[7])


//# sourceMappingURL=scripts.js.map
