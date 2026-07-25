"use strict";
class Page {
    manager;
    element;
    constructor(manager, name) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('page');
        this.manager.registerPage(name, this);
    }
    toggle(force) {
        this.element.classList.toggle('show', force);
    }
}
