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
