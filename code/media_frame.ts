abstract class MediaHolder {
    manager: PageManager;
    entries: MediaFrame[];
    element: HTMLElement;
    
    constructor(manager: PageManager, parent: HTMLElement) {
        this.manager = manager;
        this.entries = [];
        this.element = document.createElement('div');
        this.element.classList.add('media_holder');
        parent.appendChild(this.element);
    }

    clear(): void {
        for (const entry of this.entries) {
            entry.remove();
        }
        this.entries = [];
    }
}

class VideoHolder extends MediaHolder {
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
        this.element.classList.add('video_holder');
    }

    load(): void {

    }
}

abstract class PhotoGrid extends MediaHolder {
    index: number;
    photos: MediaFramePhoto[];

    complete: boolean;

    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
        this.index = 0;
        this.photos = [];
        this.complete = false;
        this.element.classList.add('photo_grid');
    }

    clear(): void {
        for (const photo of this.photos) {
            photo.remove();
        }
        this.photos = [];
        this.index = 0;
        this.complete = false;
    }
}

abstract class PhotoRow extends MediaHolder {
    span: HTMLElement;
    internal: PhotoRowInternal;

    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
        this.element.classList.add('photo_row');
        this.span = document.createElement('span');
        this.internal = new PhotoRowInternal(manager, this.element)
        
        this.span.classList.add('row_header');
        this.internal.element.classList.add('internal_scroll');

        this.element.appendChild(this.span);
    }

    setHeaderText(text: string): void {
        this.span.textContent = text;
    }

    remove(): void {
        this.internal.remove();
        this.element.remove();
    }

    abstract load(): void;
}

class PhotoRowInternal extends PhotoGrid {
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
    }

    remove(): void {
        this.clear();
        this.element.remove();
    }

    load(): void {

    }
}

class PhotoRowLocation extends PhotoRow {
    location: string;

    constructor(manager: PageManager, parent: HTMLElement, location: string) {
        super(manager, parent);
        this.location = location;
        this.setHeaderText('This Location');
        this.load();
    }

    load(): void {
        const matches: PhotoDatabase = this.manager.fetchUserImagesByLocation(this.location);

        for (const date in matches) {
            const figure: MediaFramePhoto = new MediaFramePhoto(this.internal, date);
        }
    }
}

class PhotoRowPerson extends PhotoRow {
    person: string;

    constructor(manager: PageManager, parent: HTMLElement, person: string) {
        super(manager, parent);
        this.person = person;
        this.setHeaderText('With ' + this.person);
        this.load();
    }

    load(): void {
        const matches: PhotoDatabase = this.manager.fetchUserImagesByPerson(this.person);

        for (const date in matches) {
            const figure: MediaFramePhoto = new MediaFramePhoto(this.internal, date);
        }
    }
}

class PhotoRowMonth extends PhotoRow {
    month: string;
    year: string;
    date_handler: DateManager;

    constructor(manager: PageManager, parent: HTMLElement, month: string, year: string) {
        super(manager, parent);
        this.month = month;
        this.year = year;
        this.date_handler = new DateManager();

        this.load();
        this.setHeaderText('This ' + this.date_handler.dateIDtoName(month));
    }

    load(): void {
        const manager: PageManager = this.manager;
        const matches: PhotoDatabase = manager.fetchUserImagesByMonthAndYear(this.month, this.year);

        for (const date in matches) {
            const figure: MediaFramePhoto = new MediaFramePhoto(this.internal, date);
        }
    }
}

abstract class MediaFrame {
    holder: MediaHolder;
    date: string;
    element: HTMLElement;
    image: HTMLElement;
    date_label: HTMLElement;
    caption: HTMLElement;

    constructor(holder: MediaHolder, date: string) {
        this.holder = holder;
        this.date = date;
        this.element = document.createElement('figure');
        this.element.classList.add('media_frame');
        this.element.setAttribute('data-date', date);
        this.image = document.createElement('img');
        this.date_label = document.createElement('div');
        this.caption = document.createElement('figcaption');

        this.date_label.classList.add('date');
        this.date_label.textContent = date;
        this.element.onclick = (e: PointerEvent) => this.onclick(e);

        this.element.appendChild(this.image);
        this.element.appendChild(this.date_label);
        this.element.appendChild(this.caption);
        this.holder.element.appendChild(this.element);
    }

    setFeatured(status: boolean): void {
        this.element.classList.toggle('featured', status);
    }

    remove(): void {
        this.element.remove();
    }

    abstract onclick(e: PointerEvent): void;
    abstract load(): void;
}

class MediaFramePhoto extends MediaFrame {
    date: string;

    constructor(holder: MediaHolder, date: string) {
        super(holder, date);
        this.date = date;
        this.load();
    }

    load(): void {
        const info: PhotoEntry | null = this.holder.manager.fetchImageByDate(this.date);
        if (!info) throw new Error(`Error: No photo found at ${this.date}`);
        this.caption.textContent = info.name;
        this.image.setAttribute('src', `../media/${this.holder.manager.fetchUserName()}/IMG_${info.id[0]}.jpg`);
    }

    onclick(e: PointerEvent): void {
        this.holder.manager.openImageByDate(this.date);
    }
}

class MediaFrameVideo extends MediaFrame {
    constructor(holder: MediaHolder, date: string) {
        super(holder, date);
    }

    load(): void {

    }

    onclick(e: PointerEvent): void {

    }
}