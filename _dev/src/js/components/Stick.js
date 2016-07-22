'use strict';

function Stick () {
    this.lstScrollY = 0;
    this.ticking = false;
    this.done = false;

    var defaults = {
        item: null,
        animation: null,
        offset: null,
        reverse: false
    };

    if (arguments[0] && typeof arguments[0] === 'object') {
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
function init () {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
}

// Utitlity Methods
function extendDefaults (source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

module.exports = Stick;
