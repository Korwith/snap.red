class PageAbout extends Page {
    constructor(manager: PageManager) {
        super(manager, 'about');
        this.manager = manager;
        this.element.classList.add('about');
        this.propogateAboutPage();
    }

    private propogateAboutPage(): void {
        const title: HTMLElement = document.createElement('h1');
        const description: HTMLElement = document.createElement('span');
        
        title.textContent = 'About';
        description.textContent = 'Under Construction';

        this.element.appendChild(title);
        this.element.appendChild(description);
    }
}