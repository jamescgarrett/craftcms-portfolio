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
     *  Toggle Client List
     *
     */
    if (typeof document.querySelector('.js-hiddenList-toggle') !== 'undefined' && document.querySelector('.js-hiddenList-toggle') !== null) {
        document.querySelector('.js-hiddenList-toggle').addEventListener('click', ClientList.bind(this));
    }

    /*
     *  Work Filter
     *
     */
    if (typeof document.querySelector('.js-workList-filter-item') !== 'undefined' && document.querySelector('.js-workList-filter-item') !== null) {
        let filters = document.querySelectorAll('.js-workList-filter-item');
        for (var d = 0; d < filters.length; d++) {
            filters[d].addEventListener('click', WorkFilter.bind(this, filters, filters[d]));
        }
    }

    /*
     *  Toggle & Submit Contact Form
     *
     */
    if (typeof document.querySelector('.js-callToAction-toggle') !== 'undefined' && document.querySelector('.js-callToAction-toggle') !== null) {
        let contactForm = document.querySelector('.js-form--contact');
        let formContactContainer = document.querySelector('.js-formContainer--contact');
        let contactFormToggles = [
            document.querySelector('.js-callToAction-toggle'),
            document.querySelector('.js-formContainer-close')
        ];
        for (var j = 0; j < contactFormToggles.length; j++) {
            contactFormToggles[j].addEventListener('click', Form.ToggleForm.bind(this, formContactContainer));
        }
        contactForm.addEventListener('submit', Form.submitForm.bind(this, contactForm, '<p><b>Thank you!</b><br>"We\'ll be in touch soon!</p>', formContactContainer, true));
    }

    /*
     *  Submit Newsletter Form
     *
     */
    if (typeof document.querySelector('.form--newsletter') !== 'undefined' && document.querySelector('.form--newsletter') !== null) {
        let newsletterForm = document.querySelector('.js-form--newsletter');
        let formNewsletterContainer = document.querySelector('.js-formContainer--newsletter');
        newsletterForm.addEventListener('submit', Form.submitForm.bind(this, newsletterForm, '<p><b>You\'ve been added to our list!</b></p>', formNewsletterContainer, false));
    }

    /*
     *  WOW. Animate elements on scroll
     *
     */
    if (typeof document.querySelector('.wow') !== 'undefined' && document.querySelector('.wow') !== null) {
        const wow = new WOW(
            {
                offset: 100,
                live: false
            }
        );
        wow.init();
    }

    /*
     *  Control Sticky Header
     *
     */
    if (typeof document.querySelector('.js-intro--tall') !== 'undefined' && document.querySelector('.js-intro--tall') !== null) {
        const scrollHeader = new Stick({
            item: document.querySelector('.js-header'),
            animation: 'header--scrolling',
            offset: (window.innerHeight - 30),
            reverse: true
        });
    }

    if (typeof document.querySelector('.js-intro--short') !== 'undefined' && document.querySelector('.js-intro--short') !== null) {
        const scrollHeaderShort = new Stick({
            item: document.querySelector('.js-header'),
            animation: 'header--scrolling',
            offset: (window.innerHeight / 3),
            reverse: true
        });
    }

    if (typeof document.querySelector('.js-intro--shortest') !== 'undefined' && document.querySelector('.js-intro--shortest') !== null) {
        const scrollHeaderShort = new Stick({
            item: document.querySelector('.js-header'),
            animation: 'header--scrolling',
            offset: (window.innerHeight / 4),
            reverse: true
        });
    }

    /*
     *  Control Sticky Scroll Indicator
     *
     */
    if (typeof document.querySelector('.js-intro-scrollIndicator') !== 'undefined' && document.querySelector('.js-intro-scrollIndicator') !== null) {
        const scrollIndicator = new Stick({
            item: document.querySelector('.js-intro-scrollIndicator'),
            animation: 'invisible',
            offset: 14,
            reverse: true
        });
    }
});
