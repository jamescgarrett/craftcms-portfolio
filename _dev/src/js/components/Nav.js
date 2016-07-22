import Utils from '../utils/Utils';

module.exports = function () {
    const items = [
        document.querySelector('.js-nav'),
        document.querySelector('.js-navToggle'),
        document.querySelector('.js-overlay')
    ];
    const body = document.getElementsByTagName('body')[0];

    // Loop siteNav items and apply active class
    for (var i = 0; i < items.length; i++) {
        Utils.toggleClass(items[i], 'is-active');
    }

    // Apply locked class on body
    Utils.toggleClass(body, 'is-locked');
};
