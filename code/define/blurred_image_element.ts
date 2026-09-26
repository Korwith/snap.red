/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

abstract class BlurredMediaFrame {
    manager: PageManager;
    element: HTMLElement;

    icon: HTMLElement;
    location: HTMLElement;
    arrow: HTMLElement;

    date?: string;

    constructor(manager: PageManager, parent: HTMLElement, tag?: string) {
        this.manager = manager;

        this.element = document.createElement(tag || 'div');
        this.element.classList.add('blurred_media_frame');

        this.icon = document.createElement('i');
        this.location = document.createElement('span');
        this.arrow = document.createElement('div');
        this.arrow.classList.add('arrow');


        this.element.appendChild(this.icon);
        this.element.appendChild(this.location);
        this.element.appendChild(this.arrow);
        parent.appendChild(this.element);
    }

    public loadByDate(date: string): void {
        const entry: PhotoEntry | null = this.manager.fetchImageByDate(date);
        if (!entry) throw new Error('No image exists at this date.');

        const path: string | null = this.manager.fetchPhotoPathByDate(date, entry.id[0]);
        if (!path) throw new Error('No photo path was found.');

        this.date = date;
        this.element.style.setProperty('--image-url', `url(${path})`);
        this.location.textContent = entry.name;
    }

    
}

abstract class BlurredMediaButton extends BlurredMediaFrame {
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent, 'button');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
    }

    protected abstract onclick(e: PointerEvent): void;
}