"use strict";
class PageMaps extends Page {
    manager;
    map;
    constructor(manager) {
        super(manager, 'maps');
        this.manager = manager;
        this.element.classList.add('maps');
        this.map = new MainMap(this);
        this.manager.element.appendChild(this.element);
    }
}
class GenericMap {
    element;
    id;
    map;
    constructor(element, id) {
        this.element = element;
        this.id = id;
        this.element.setAttribute('id', this.id);
        this.map = L.map(this.id).setView([39.4123, -77.4255], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '<a href="https://snap.red/">snap.red</a>',
            maxZoom: 18,
            minZoom: 4,
        }).addTo(this.map);
    }
}
class MainMap extends GenericMap {
    page;
    constructor(page) {
        super(page.element, 'main_map');
        this.page = page;
    }
}
