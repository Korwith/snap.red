// abstract base container for a collection of media frame elements
abstract class MediaHolder {
    manager: PageManager;
    entries: MediaFrame[];
    element: HTMLElement;

    // creates the media holder element and appends it to the parent
    constructor(manager: PageManager, parent: HTMLElement) {
        this.manager = manager;
        this.entries = [];
        this.element = document.createElement('div');
        this.element.classList.add('media_holder');
        parent.appendChild(this.element);
    }

    // removes all media entries from the holder
    clear(): void {
        for (const entry of this.entries) {
            entry.remove();
        }
        this.entries = [];
    }
}

// placeholder holder for video media entries
class VideoHolder extends MediaHolder {
    // creates the video holder element
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
        this.element.classList.add('video_holder');
    }

    // loads video entries into the holder
    load(): void {

    }
}

// abstract base for a grid of photo frames with batched loading
abstract class PhotoGrid extends MediaHolder {
    index: number;
    photos: MediaFramePhoto[];

    complete: boolean;

    // initializes the photo grid with an empty photo list
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
        this.index = 0;
        this.photos = [];
        this.complete = false;
        this.element.classList.add('photo_grid');
    }

    // removes all photos and resets the batch index
    clear(): void {
        for (const photo of this.photos) {
            photo.remove();
        }
        this.photos = [];
        this.index = 0;
        this.complete = false;
    }
}

// abstract base for a horizontally scrollable labeled row of photos
abstract class PhotoRow extends MediaHolder {
    span: HTMLElement;
    internal: PhotoRowInternal;

    // creates the row element with a header label and internal scroll grid
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
        this.element.classList.add('photo_row');
        this.span = document.createElement('span');
        this.internal = new PhotoRowInternal(manager, this.element)

        this.span.classList.add('row_header');
        this.internal.element.classList.add('internal_scroll');

        this.element.appendChild(this.span);
    }

    // sets the text of the row's header label
    setHeaderText(text: string): void {
        this.span.textContent = text;
    }

    // removes the internal grid and the row element from the dom
    remove(): void {
        this.internal.remove();
        this.element.remove();
    }

    abstract load(): void;
}

// the inner photo grid that sits inside a photo row
class PhotoRowInternal extends PhotoGrid {
    // creates the internal grid element
    constructor(manager: PageManager, parent: HTMLElement) {
        super(manager, parent);
    }

    // removes all photos and detaches the grid element
    remove(): void {
        this.clear();
        this.element.remove();
    }

    // loads photos into the internal grid
    load(): void {

    }
}

// a photo row showing all photos taken at a specific location
class PhotoRowLocation extends PhotoRow {
    location: string;

    // creates the row and loads photos matching the given location
    constructor(manager: PageManager, parent: HTMLElement, location: string) {
        super(manager, parent);
        this.location = location;
        this.setHeaderText('This Location');
        this.load();
    }

    // populates the row with all photos from this location
    load(): void {
        const matches: PhotoDatabase = this.manager.fetchUserImagesByLocation(this.location);
        if (Object.keys(matches).length <= 1) return this.remove();

        for (const date in matches) {
            const figure: MediaFramePhoto = new MediaFramePhoto(this.internal, date);
        }
    }
}

// a photo row showing all photos featuring a specific person
class PhotoRowPerson extends PhotoRow {
    person: string;

    // creates the row and loads photos featuring the given person
    constructor(manager: PageManager, parent: HTMLElement, person: string) {
        super(manager, parent);
        this.person = person;
        this.setHeaderText('With ' + this.person);
        this.load();
    }

    // populates the row with all photos featuring this person
    load(): void {
        const matches: PhotoDatabase = this.manager.fetchUserImagesByPerson(this.person);
        if (Object.keys(matches).length <= 1) return this.remove();

        for (const date in matches) {
            const figure: MediaFramePhoto = new MediaFramePhoto(this.internal, date);
        }
    }
}

// a photo row showing all photos taken in a specific month and year
class PhotoRowMonth extends PhotoRow {
    month: string;
    year: string;
    date_handler: DateManager;

    // creates the row and loads photos from the given month and year
    constructor(manager: PageManager, parent: HTMLElement, month: string, year: string) {
        super(manager, parent);
        this.month = month;
        this.year = year;
        this.date_handler = new DateManager();

        this.load();
        this.setHeaderText('This ' + this.date_handler.dateIDtoName(month));
    }

    // populates the row with photos from this month and year
    load(): void {
        const manager: PageManager = this.manager;
        const matches: PhotoDatabase = manager.fetchUserImagesByMonthAndYear(this.month, this.year);
        if (Object.keys(matches).length <= 1) return this.remove();
        
        for (const date in matches) {
            const figure: MediaFramePhoto = new MediaFramePhoto(this.internal, date);
        }
    }
}

// abstract base for a single media item displayed as a figure element
abstract class MediaFrame {
    holder: MediaHolder;
    date: string;
    element: HTMLElement;
    image: HTMLElement;
    date_label: HTMLElement;
    caption: HTMLElement;

    // creates the figure element with image, date label, and caption
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

    // toggles the featured visual style on this frame
    setFeatured(status: boolean): void {
        this.element.classList.toggle('featured', status);
    }

    // removes this frame from the dom
    remove(): void {
        this.element.remove();
    }

    abstract onclick(e: PointerEvent): void;
    abstract load(): void;
}

// a media frame that displays a photo with its location caption
class MediaFramePhoto extends MediaFrame {
    date: string;

    // creates the photo frame and loads the photo data
    constructor(holder: MediaHolder, date: string) {
        super(holder, date);
        this.date = date;
        this.load();
    }

    // sets the image src and caption from the photo entry at this date
    load(): void {
        const info: PhotoEntry | null = this.holder.manager.fetchImageByDate(this.date);
        if (!info) throw new Error(`Error: No photo found at ${this.date}`);
        this.caption.textContent = info.name;
        this.image.setAttribute('src', `../media/${this.holder.manager.fetchUserName()}/IMG_${info.id[0]}.jpg`);
    }

    // opens the full-size photo viewer for this photo
    onclick(e: PointerEvent): void {
        this.holder.manager.openImageByDate(this.date);
    }
}

// a media frame placeholder for video entries
class MediaFrameVideo extends MediaFrame {
    // creates the video frame
    constructor(holder: MediaHolder, date: string) {
        super(holder, date);
    }

    // loads video data into the frame
    load(): void {

    }

    // handles click on the video frame
    onclick(e: PointerEvent): void {

    }
}
