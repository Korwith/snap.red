/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

// page navigation for mobile
// mobile footer navigation bar with page and sidebar controls
class PageFooter {
    manager: PageManager;
    element: HTMLElement;

    last_selected: CurrentlySelectedEntry;
    page_control: PageFooterPageControl;

    // creates all footer buttons and appends the footer to the page
    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('footer');

        this.last_selected = new CurrentlySelectedEntry(this);
        this.page_control = new PageFooterPageControl(this);
        this.toggleSelectedVisible(false);

        this.manager.element.appendChild(this.element);
    }

    // hides or shows the map button if user has gps data available
    public toggleMapButtonVisibility(show: boolean) {
        this.element.classList.toggle('hidemap', !show);
    }

    // propogates and makes visibile the "currently selected entry" frame
    public assignSelectedEntry(date: string): void {
        this.last_selected.loadByDate(date);
    }

    // changes if the selected pane is visibile
    public toggleSelectedVisible(force?: boolean) {
        this.element.classList.toggle('selected_visible', force);
    }
}

abstract class PageFooterBar {
    footer: PageFooter;
    element: HTMLElement;

    constructor(footer: PageFooter) {
        this.footer = footer;
        this.element = document.createElement('div');
        this.element.classList.add('bar');
        this.footer.element.appendChild(this.element);
    }
}

class PageFooterPageControl extends PageFooterBar {
    sidebar_toggle: FooterSidebarToggle;
    home: FooterHome;
    map: FooterMap;
    about: FooterAbout;

    constructor(footer: PageFooter) {
        super(footer);
        this.element.classList.add('control');
        this.sidebar_toggle = new FooterSidebarToggle(this);
        this.home = new FooterHome(this);
        this.map = new FooterMap(this);
        this.about = new FooterAbout(this);
    }
}

class CurrentlySelectedEntry extends BlurredMediaButton {
    footer: PageFooter;

    constructor(footer: PageFooter) {
        super(footer.manager, footer.element);
        this.footer = footer;
        this.element.classList.add('selected', 'bar');
    }

    protected onclick(e: PointerEvent): void {
        if (this.date) this.footer.manager.openImageByDate(this.date);
    }
}

// abstract base for a clickable footer button
abstract class FooterButton {
    bar: PageFooterBar;
    element: HTMLElement;

    // creates the button element and registers the click handler
    constructor(bar: PageFooterBar) {
        this.bar = bar;
        this.element = document.createElement('div');
        this.element.classList.add('button');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        this.bar.element.appendChild(this.element);
    }

    abstract onclick(e: PointerEvent): void;
}

// footer button that toggles the sidebar open and closed
class FooterSidebarToggle extends FooterButton {
    // creates the sidebar toggle button
    constructor(bar: PageFooterBar) {
        super(bar);
        this.element.classList.add('sidebar_toggle');
    }

    // toggles the sidebar visibility
    onclick(e: PointerEvent) {
        const manager: PageManager = this.bar.footer.manager;
        manager.toggleSidebar();
    }
}

// footer button that navigates to the home view
class FooterHome extends FooterButton {
    // creates the home button
    constructor(bar: PageFooterBar) {
        super(bar);
        this.element.classList.add('home');
        this.element.textContent = 'Home';
    }

    // handles home button click
    onclick(e: PointerEvent) {
        this.bar.footer.manager.showPage('content');
    }
}

// footer button that opens the map view
class FooterMap extends FooterButton {
    // creates the map button
    constructor(bar: PageFooterBar) {
        super(bar);
        this.element.classList.add('map');
        this.element.textContent = 'Map';
    }

    // opens the given page for the map
    onclick(e: PointerEvent) {
        this.bar.footer.manager.showPage('maps');
        this.bar.footer.manager.pushNotification('Info', 'The maps page is still under construction.');
    }
}

// footer button that opens the about view
class FooterAbout extends FooterButton {
    // creates the about button
    constructor(bar: PageFooterBar) {
        super(bar);
        this.element.classList.add('about');
        this.element.textContent = 'About';
    }

    // notifies the user the about page is under construction
    onclick(e: PointerEvent) {
        this.bar.footer.manager.showPage('about');
    }
}
