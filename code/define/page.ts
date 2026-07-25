abstract class Page {
    manager: PageManager;
    element: HTMLElement;

    constructor(manager: PageManager, name: string) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('page');

        this.manager.registerPage(name, this);
    }

    toggle(force?: boolean) {
        this.element.classList.toggle('show', force);
    }
}