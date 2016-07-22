import serialize from 'form-serialize';

import Utils from '../utils/Utils';

var Form = {};

var displayFormSuccess = function (form, message, container) {
    container.querySelector('.formSuccess').innerHTML = message;
};

var displayLoading = function (form, container) {
    let formSuccess = container.querySelector('.formSuccess-loading');
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

    let formData = serialize(form);
    let request = new XMLHttpRequest();

    request.open('post', encodeURI('/'), true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            displayFormSuccess(form, message, container);
            if (autoClose) {
                let body = document.getElementsByTagName('body')[0];
                setTimeout(function () {
                    Utils.toggleClass(container, 'is-active');
                    Utils.toggleClass(body, 'is-locked');
                }, 1200);
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
    let body = document.getElementsByTagName('body')[0];

    Utils.toggleClass(container, 'is-active');

     // Apply locked class on body
    Utils.toggleClass(body, 'is-locked');
};

module.exports = Form;
