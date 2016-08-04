'use strict';

import WOW from 'wow';

import Nav from './components/Nav';
import ClientList from './components/ClientList';
import WorkFilter from './components/WorkFilter';
import Form from './components/Form';
import Stick from './components/Stick';

document.addEventListener('DOMContentLoaded', function () {

    /*
     *  Navigation
     *
     */
    if (typeof document.querySelector('.js-navToggle') !== 'undefined' && document.querySelector('.js-navToggle') !== null ||
        document.querySelector('.js-overlay') !== 'undefined' && document.querySelector('.js-overlay') !== null) {
        let navToggles = [
            document.querySelector('.js-navToggle'),
            document.querySelector('.js-overlay')
        ];
        for (var i = 0; i < navToggles.length; i++) {
            navToggles[i].addEventListener('click', Nav.bind(this));
        }
    }

    /*
     *  Submit Newsletter Form
     *
     */
    if (typeof document.querySelector('.js_form') !== 'undefined' && document.querySelector('.js_form') !== null) {
        let form = document.querySelector('.js_form');
        let formContainer = document.querySelector('.js_formContainer');
        form.addEventListener('submit', Form.submitForm.bind(this, form, '<p><b>Thank you for contacting me, I\'ll be in touch with you shortly!</b></p>', formContainer, false));
    }
});
