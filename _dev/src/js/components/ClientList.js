import Utils from '../utils/Utils';

module.exports = function (event) {

    let items = [
        document.querySelector('.js-hiddenList-lists'),
        document.querySelector('.js-hiddenList-toggle')
    ];
    let lists = document.querySelectorAll('.js-hiddenList-item');

    for (var i = 0; i < items.length; i++) {
        Utils.toggleClass(items[i], 'is-active');
    }

    for (var d = 0; d < lists.length; d++) {
        Utils.toggleClass(lists[d], 'is-active');
    }

    // Change Button Text
    if (event.currentTarget.textContent === 'View More Clients') {
        event.currentTarget.textContent = 'View Less';
    } else {
        event.currentTarget.textContent = 'View More Clients';
    }
};
