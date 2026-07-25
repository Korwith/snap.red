// what is the website about? page
class PageAbout extends Page {
    title: HTMLElement;

    constructor(manager: PageManager) {
        super(manager, 'about');
        this.manager = manager;
        this.element.classList.add('about');

        this.title = document.createElement('h1');
        this.element.appendChild(this.title);

        this.propogateAboutPage();
    }

    // fills about page with content
    private propogateAboutPage(): void {
        this.title.textContent = 'Snapshot';
        this.addDescription('The purpose of this project is a personal replacement to large social media services for the purposes of photo sharing. The project is entirely written in TypeScript, HTML, and CSS. Forever a work in progress.');
        this.addDescription('This project was written entirely by Thaddeus M.');
        this.addDescription('This project utilizes the open source JavaScript mapping library, Leaflet.');
        this.addDescription('&copy; kircic.org');
    }

    // adds a paragraph in the about page
    private addDescription(text: string): void {
        const description: HTMLElement = document.createElement('span');
        description.innerHTML = text;
        this.element.appendChild(description);
    }
}