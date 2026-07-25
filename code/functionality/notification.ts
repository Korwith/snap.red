type NotificationType = 'Error' | 'Warn' | 'Info';

class NotificationManager {
    manager: PageManager;
    element: HTMLElement;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('notification_holder');
        this.manager.element.appendChild(this.element);
    }

    pushNotification(type: NotificationType, text: string) {
        const notification: PageNotification = new PageNotification(this);
        notification.setText(type, text);
    }
}

class PageNotification {
    manager: NotificationManager;
    element: HTMLElement;
    icon: HTMLElement;

    constructor(manager: NotificationManager) {
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

    setText(type: NotificationType, text: string): void {
        this.element.textContent = text;
    }

    remove(seconds: number): void {
        setTimeout(() => {
            this.element.classList.remove('show');

            this.element.addEventListener('transitionend', () => {
                this.element.remove();
            }, { once: true });
        }, seconds * 1000);
    }
}