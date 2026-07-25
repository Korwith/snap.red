class PageAbout extends Page {
    constructor(manager: PageManager) {
        super(manager, 'about');
        this.manager = manager;
        this.element.classList.add('about');
        console.log(this.element);

        console.log('awesome');
    }
}