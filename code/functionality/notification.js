"use strict";
class NotificationManager {
    manager;
    element;
    constructor(manager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('notification_holder');
        this.manager.element.appendChild(this.element);
    }
    pushNotification(type, text) {
        const notification = new PageNotification(this);
        notification.setText(type, text);
    }
}
class PageNotification {
    manager;
    element;
    icon;
    constructor(manager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.icon = document.createElement('div');
        this.element.classList.add('notification');
        this.icon.classList.add('icon');
        this.element.appendChild(this.icon);
        this.manager.element.appendChild(this.element);
        requestAnimationFrame(() => {
            this.element.classList.add('show');
            this.remove(4);
        });
    }
    setText(type, text) {
        this.element.textContent = text;
    }
    remove(seconds) {
        setTimeout(() => {
            this.element.classList.remove('show');
            this.element.addEventListener('transitionend', () => {
                this.element.remove();
            }, { once: true });
        }, seconds * 1000);
    }
}
