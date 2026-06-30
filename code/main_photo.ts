// overlay container that shows a full-size photo and its detail panel
class MainPhotoHolder {
    manager: PageManager;
    element: HTMLElement;
    menu: MainPhotoMenu;

    // creates the holder element and its photo menu
    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('main_photo_holder');
        this.menu = new MainPhotoMenu(this);
        manager.element.appendChild(this.element);
    }

    // shows or hides the overlay
    toggle(force?: boolean): void {
        this.element.classList.toggle('show', force);
    }

    // loads the photo and its details for the given date and shows the overlay
    openImageByDate(date: string): void {
        this.menu.figure.load(date);
        this.menu.details.load(date);
        this.toggle(true);
    }
}

// article element containing the main photo figure and its detail sidebar
class MainPhotoMenu {
    holder: MainPhotoHolder;
    element: HTMLElement;
    figure: MainPhotoFigure;
    details: MainPhotoDetails;

    // creates the menu article with figure and details panels
    constructor(holder: MainPhotoHolder) {
        this.holder = holder;
        this.element = document.createElement('article');
        this.element.classList.add('menu');
        this.figure = new MainPhotoFigure(this);
        this.details = new MainPhotoDetails(this);
        this.holder.element.appendChild(this.element);
    }
}

// displays the full-size photo with navigation arrows, info, and a close button
class MainPhotoFigure {
    menu: MainPhotoMenu;
    element: HTMLElement;
    info: FigureInfoList;
    left: FigureNavigation;
    right: FigureNavigation;
    close: FigureCloseButton;
    caption: HTMLElement;

    images: Array<HTMLElement>
    selected: number;

    // builds the figure with info overlay, navigation buttons, and close button
    constructor(menu: MainPhotoMenu) {
        this.menu = menu;
        this.element = document.createElement('figure');
        this.info = new FigureInfoList(this);
        this.left = new FigureNavigationLeft(this);
        this.right = new FigureNavigationRight(this);
        this.close = new FigureCloseButton(this.menu.holder, this);
        this.caption = document.createElement('figcaption');

        this.images = [];
        this.selected = 0;

        this.element.classList.add('main');
        this.element.appendChild(this.caption);
        this.menu.element.appendChild(this.element);
    }

    // loads the info overlay and caption for the photo at the given date
    protected loadPhotoDetails(date: string): void {
        const manager: PageManager = this.menu.holder.manager;
        const photo: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!photo) throw new Error('Photo not found at date');

        this.info.load(date);
        this.caption.textContent = photo.name;
    }

    // creates and positions img elements for each id in the photo's list
    protected loadPhotoList(list: (string | number)[]): void {
        const manager: PageManager = this.menu.holder.manager;
        const user: string = manager.fetchUserName();

        for (const index in list) {
            const id: string | number = list[index];
            const img: HTMLElement = document.createElement('img');
            img.setAttribute('loading', 'lazy');
            img.setAttribute('id', id.toString());
            img.setAttribute('src', `../media/${user}/IMG_${id}.jpg`);
            img.style.left = `${parseInt(index) * 100}%`;
            this.images.push(img);
            this.element.appendChild(img);
        }
    }

    // slides all images to display the one at the given offset from the current index
    shiftSelectedPhoto(shift: number): void {
        const index: number = this.selected + shift;
        if (index < 0 || index >= this.images.length ) return;
        this.element.classList.toggle('hide_left', index - 1 < 0);
        this.element.classList.toggle('hide_right', index + 1 >= this.images.length);


        for (const key in this.images) {
            const image: HTMLElement = this.images[key];
            image.style.left = `${(parseInt(key) - index) * 100}%`;
        }

        this.selected = index;
    }

    // resets the figure and loads the photo and its image list for the given date
    load(date: string): void {
        const manager: PageManager = this.menu.holder.manager;
        const photo: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!photo) throw new Error('No photo found!');

        this.reset();
        this.loadPhotoDetails(date);
        this.loadPhotoList(photo.id);
    }

    // clears the current photo images, caption, and info overlay
    reset(): void {
        this.info.reset();
        this.caption.textContent = '';
        this.selected = 0;

        this.element.classList.remove('hide_right');
        this.element.classList.add('hide_left');

        for (const image of this.images) {
            image.remove();
        }
        this.images = [];
    }
}

// overlay panel showing the date and featured people for the current photo
class FigureInfoList {
    figure: MainPhotoFigure;
    element: HTMLElement;
    date: HTMLElement;
    people: HTMLElement;

    // creates the info overlay with date and people spans
    constructor(figure: MainPhotoFigure) {
        this.figure = figure;
        this.element = document.createElement('div');
        this.date = document.createElement('span');
        this.people = document.createElement('span');

        this.element.classList.add('info');
        this.date.classList.add('day');
        this.people.classList.add('people');

        this.element.appendChild(this.date);
        this.element.appendChild(this.people);
        figure.element.appendChild(this.element);
    }

    // populates the date and people text for the photo at the given date
    load(date: string): void {
        const manager: PageManager = this.figure.menu.holder.manager;
        const entry: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!entry) throw new Error('No image found at date');

        this.date.textContent = date;
        const sanitized_users: string[] = manager.sanitizePeopleList(entry.people || []);
        if (sanitized_users && sanitized_users.length > 0) {
            this.people.classList.remove('hide');
            this.people.textContent = sanitized_users.join(', ');
        } else {
            this.people.classList.add('hide');
            this.people.textContent = '';
        }
    }

    // clears the date and people text
    reset(): void {
        this.date.textContent = '';
        this.people.textContent = '';
    }
}

// abstract base for a left or right photo navigation button
abstract class FigureNavigation {
    figure: MainPhotoFigure;
    element: HTMLElement;

    // creates the navigation button and attaches it to the figure
    constructor(main_figure: MainPhotoFigure) {
        this.figure = main_figure;
        this.element = document.createElement('button');
        this.element.classList.add('nav');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        this.figure.element.appendChild(this.element);
    }

    abstract onclick(e: PointerEvent): void;
}

// navigation button that moves to the previous photo
class FigureNavigationLeft extends FigureNavigation {
    // creates the left navigation button
    constructor(main_figure: MainPhotoFigure) {
        super(main_figure);
        this.element.classList.add('left');
    }

    // shifts the selected photo one step to the left
    onclick(e: PointerEvent) {
        this.figure.shiftSelectedPhoto(-1);
    }
}

// navigation button that moves to the next photo
class FigureNavigationRight extends FigureNavigation {
    // creates the right navigation button
    constructor(main_figure: MainPhotoFigure) {
        super(main_figure);
        this.element.classList.add('right');
    }

    // shifts the selected photo one step to the right
    onclick(e: PointerEvent) {
        this.figure.shiftSelectedPhoto(1);
    }
}

// side panel showing related photo rows for the currently viewed photo
class MainPhotoDetails {
    menu: MainPhotoMenu;
    element: HTMLElement;
    header: PhotoDetailsHeader;
    grid: PhotoDetailsGrid;

    // creates the aside panel with a header and photo row grid
    constructor(menu: MainPhotoMenu) {
        this.menu = menu;
        this.element = document.createElement('aside');
        this.header = new PhotoDetailsHeader(this);
        this.grid = new PhotoDetailsGrid(this);

        this.menu.element.appendChild(this.element);
    }

    // loads the location name header and related photo rows for the given date
    protected loadPhotoDetails(date: string): void {
        const manager: PageManager = this.menu.holder.manager;
        const entry: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!entry) throw new Error('No photos found at date');
        this.header.displayText(entry.name);
        this.grid.load(date);
    }

    // delegates to loadPhotoDetails for the given date
    load(date: string): void {
        this.loadPhotoDetails(date);
    }

    // clears the header text and resets the photo row grid
    reset(): void {
        this.header.element.textContent = '';
        this.grid.reset();
    }
}

// header bar at the top of the details panel showing the location name
class PhotoDetailsHeader {
    details: MainPhotoDetails;
    element: HTMLElement;
    span: HTMLElement;
    share: PhotoShareButton;
    close: DetailsCloseButton;

    // creates the header with a text span and close button
    constructor(details: MainPhotoDetails) {
        this.details = details;
        this.element = document.createElement('div');
        this.element.classList.add('header');
        this.span = document.createElement('span');
        this.share = new PhotoShareButton(this);
        this.close = new DetailsCloseButton(this.details.menu.holder, this);

        this.element.appendChild(this.span);
        this.details.element.appendChild(this.element);
    }

    // sets the header text to the given string
    displayText(text: string): void {
        this.span.textContent = text;
    }
}

// grid of related photo rows shown in the details panel
class PhotoDetailsGrid {
    details: MainPhotoDetails;
    photo_rows: PhotoRow[];
    element: HTMLElement;

    // creates the grid container element
    constructor(details: MainPhotoDetails) {
        this.details = details;
        this.photo_rows = [];
        this.element = document.createElement('div');
        this.element.classList.add('grid_holder');
        this.details.element.appendChild(this.element);
    }

    // loads location, person, and month photo rows for the given date
    load(date: string): void {
        const manager: PageManager = this.details.menu.holder.manager;
        const entry: PhotoEntry | null = manager.fetchImageByDate(date);
        const month: string = date.slice(0, 2);
        const year: string = date.slice(-2);
        if (!entry) throw new Error('No entry found at date');
        this.reset();

        const location_pane: PhotoRowLocation = new PhotoRowLocation(manager, this.element, entry.name);
        this.photo_rows.push(location_pane);

        if (entry.people) {
            for (const person of entry.people) {
                if (!manager.isFeaturedPersonValid(person)) continue;
                const person_pane: PhotoRowPerson = new PhotoRowPerson(manager, this.element, person);
                this.photo_rows.push(person_pane);
            }
        }

        const month_pane: PhotoRowMonth = new PhotoRowMonth(manager, this.element, month, year);
        this.photo_rows.push(month_pane);
    }

    // removes all photo rows from the grid
    reset(): void {
        for (const row of this.photo_rows) {
            row.remove();
        }
    }
}

// abstract base for a button that closes the main photo overlay
abstract class HolderCloseButton {
    holder: MainPhotoHolder;
    element: HTMLElement;

    // creates the close button and appends it to the given parent element
    constructor(holder: MainPhotoHolder, parent: HTMLElement) {
        this.holder = holder;
        this.element = document.createElement('button');
        this.element.classList.add('close');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        parent.appendChild(this.element);
    }

    // hides the main photo overlay
    onclick(e: PointerEvent): void {
        this.holder.toggle(false);
    }
}

// close button placed inside the main photo figure
class FigureCloseButton extends HolderCloseButton {
    // creates the close button inside the figure element
    constructor(holder: MainPhotoHolder, figure: MainPhotoFigure) {
        super(holder, figure.element);
    }
}

// close button placed inside the details panel header
class DetailsCloseButton extends HolderCloseButton {
    // creates the close button inside the details header element
    constructor(holder: MainPhotoHolder, details_header: PhotoDetailsHeader) {
        super(holder, details_header.element);
    }
}

// button which copies a sharable link
class PhotoShareButton {
    element: HTMLElement;

    constructor(details_header: PhotoDetailsHeader) {
        this.element = document.createElement('button');
        this.element.classList.add('share');
        this.element.textContent = 'Share';
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        details_header.element.appendChild(this.element);
    }

    async onclick(e: PointerEvent): Promise<void> {
        try {
            await navigator.share({
                title: document.title,
                text: 'website (test)',
                url: 'https://snap.red',
            })
        } catch(error) {
            console.warn('Device does not have share');
        }
    }
}