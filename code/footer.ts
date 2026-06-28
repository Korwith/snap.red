// page navigation for mobile

// mobile footer navigation bar with page and sidebar controls
class PageFooter {
    manager: PageManager;
    element: HTMLElement;

    sidebar_toggle: FooterSidebarToggle;
    home: FooterHome;
    map: FooterMap;
    about: FooterAbout;

    // creates all footer buttons and appends the footer to the page
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

// abstract base for a clickable footer button
abstract class FooterButton {
    footer: PageFooter;
    element: HTMLElement;

    // creates the button element and registers the click handler
    constructor(footer: PageFooter) {
        this.footer = footer;
        this.element = document.createElement('div');
        this.element.classList.add('button');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        this.footer.element.appendChild(this.element);
    }

    abstract onclick(e: PointerEvent): void;
}

// footer button that toggles the sidebar open and closed
class FooterSidebarToggle extends FooterButton {
    // creates the sidebar toggle button
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('sidebar_toggle');
    }

    // toggles the sidebar visibility
    onclick(e: PointerEvent) {
        const manager: PageManager = this.footer.manager;
        manager.toggleSidebar();
    }
}

// footer button that navigates to the home view
class FooterHome extends FooterButton {
    // creates the home button
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('home');
        this.element.textContent = 'Home';
    }

    // handles home button click
    onclick(e: PointerEvent) {

    }
}

// footer button that opens the map view
class FooterMap extends FooterButton {
    // creates the map button
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('map');
        this.element.textContent = 'Map';
    }

    // notifies the user the map page is under construction
    onclick(e: PointerEvent) {
        alert('Under Construction!')
    }
}

// footer button that opens the about view
class FooterAbout extends FooterButton {
    // creates the about button
    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('about');
        this.element.textContent = 'About';
    }

    // notifies the user the about page is under construction
    onclick(e: PointerEvent) {
        alert('Under Construction!')
    }
}
