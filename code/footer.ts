// page navigation for mobile

class PageFooter {
    manager: PageManager;
    element: HTMLElement;

    sidebar_toggle: FooterSidebarToggle;
    home: FooterHome;
    map: FooterMap;
    about: FooterAbout;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('footer');

        this.sidebar_toggle = new FooterSidebarToggle(this);
        this.home = new FooterHome(this);
        this.map = new FooterMap(this);
        this.about = new FooterAbout(this);

        this.manager.element.appendChild(this.element);
    }
}

abstract class FooterButton {
    footer: PageFooter;
    element: HTMLElement;

    constructor(footer: PageFooter) {
        this.footer = footer;
        this.element = document.createElement('div');
        this.element.classList.add('button');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        this.footer.element.appendChild(this.element);
    }

    abstract onclick(e: PointerEvent): void;
}

class FooterSidebarToggle extends FooterButton {
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('sidebar_toggle');
    }

    onclick(e: PointerEvent) {
        const manager: PageManager = this.footer.manager;
        manager.toggleSidebar();
    }
}

class FooterHome extends FooterButton {
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('home');
        this.element.textContent = 'Home';
    }

    onclick(e: PointerEvent) {

    }
}

class FooterMap extends FooterButton {
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('map');
        this.element.textContent = 'Map';
    }

    onclick(e: PointerEvent) {
        alert('Under Construction!')
    }
}

class FooterAbout extends FooterButton {
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('about');
        this.element.textContent = 'About';
    }

    onclick(e: PointerEvent) {
        alert('Under Construction!')
    }
}