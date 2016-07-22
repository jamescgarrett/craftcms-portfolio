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
