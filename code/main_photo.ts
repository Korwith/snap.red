class MainPhotoHolder {
    manager: PageManager;
    element: HTMLElement;
    menu: MainPhotoMenu;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('main_photo_holder');
        this.menu = new MainPhotoMenu(this);
        manager.element.appendChild(this.element);
    }

    toggle(force?: boolean): void {
        this.element.classList.toggle('show', force);
    }

    openImageByDate(date: string): void {
        this.menu.figure.load(date);
        this.menu.details.load(date);
        this.toggle(true);
    }
}

class MainPhotoMenu {
    holder: MainPhotoHolder;
    element: HTMLElement;
    figure: MainPhotoFigure;
    details: MainPhotoDetails;

    constructor(holder: MainPhotoHolder) {
        this.holder = holder;
        this.element = document.createElement('article');
        this.element.classList.add('menu');
        this.figure = new MainPhotoFigure(this);
        this.details = new MainPhotoDetails(this);
        this.holder.element.appendChild(this.element);
    }
}

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

    protected loadPhotoDetails(date: string): void {
        const manager: PageManager = this.menu.holder.manager;
        const photo: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!photo) throw new Error('Photo not found at date');

        this.info.load(date);
        this.caption.textContent = photo.name;
    }

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

    load(date: string): void {
        const manager: PageManager = this.menu.holder.manager;
        const photo: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!photo) throw new Error('No photo found!');

        this.reset();
        this.loadPhotoDetails(date);
        this.loadPhotoList(photo.id);
    }

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

class FigureInfoList {
    figure: MainPhotoFigure;
    element: HTMLElement;
    date: HTMLElement;
    people: HTMLElement;

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

    reset(): void {
        this.date.textContent = '';
        this.people.textContent = '';
    }
}

abstract class FigureNavigation {
    figure: MainPhotoFigure;
    element: HTMLElement;

    constructor(main_figure: MainPhotoFigure) {
        this.figure = main_figure;
        this.element = document.createElement('button');
        this.element.classList.add('nav');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        this.figure.element.appendChild(this.element);
    }

    abstract onclick(e: PointerEvent): void;
}

class FigureNavigationLeft extends FigureNavigation {
    constructor(main_figure: MainPhotoFigure) {
        super(main_figure);
        this.element.classList.add('left');
    }

    onclick(e: PointerEvent) {
        this.figure.shiftSelectedPhoto(-1);
    }
}

class FigureNavigationRight extends FigureNavigation {
    constructor(main_figure: MainPhotoFigure) {
        super(main_figure);
        this.element.classList.add('right');
    }

    onclick(e: PointerEvent) {
        this.figure.shiftSelectedPhoto(1);
    }
}

class MainPhotoDetails {
    menu: MainPhotoMenu;
    element: HTMLElement;
    header: PhotoDetailsHeader;
    grid: PhotoDetailsGrid;

    constructor(menu: MainPhotoMenu) {
        this.menu = menu;
        this.element = document.createElement('aside');
        this.header = new PhotoDetailsHeader(this);
        this.grid = new PhotoDetailsGrid(this);

        this.menu.element.appendChild(this.element);
    }

    protected loadPhotoDetails(date: string): void {
        const manager: PageManager = this.menu.holder.manager;
        const entry: PhotoEntry | null = manager.fetchImageByDate(date);
        if (!entry) throw new Error('No photos found at date');
        this.header.displayText(entry.name);
        this.grid.load(date);
    }

    load(date: string): void {
        this.loadPhotoDetails(date);
    }

    reset(): void {
        this.header.element.textContent = '';
        this.grid.reset();
    }
}

class PhotoDetailsHeader {
    details: MainPhotoDetails;
    element: HTMLElement;
    span: HTMLElement;
    close: DetailsCloseButton;

    constructor(details: MainPhotoDetails) {
        this.details = details;
        this.element = document.createElement('div');
        this.element.classList.add('header');
        this.span = document.createElement('span');
        this.close = new DetailsCloseButton(this.details.menu.holder, this);

        this.element.appendChild(this.span);
        this.details.element.appendChild(this.element);
    }

    displayText(text: string): void {
        this.span.textContent = text;
    }
}

class PhotoDetailsGrid {
    details: MainPhotoDetails;
    photo_rows: PhotoRow[];
    element: HTMLElement;

    constructor(details: MainPhotoDetails) {
        this.details = details;
        this.photo_rows = [];
        this.element = document.createElement('div');
        this.element.classList.add('grid_holder');
        this.details.element.appendChild(this.element);
    }

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

    reset(): void {
        for (const row of this.photo_rows) {
            row.remove();
        }
    }
}

abstract class HolderCloseButton {
    holder: MainPhotoHolder;
    element: HTMLElement;

    constructor(holder: MainPhotoHolder, parent: HTMLElement) {
        this.holder = holder;
        this.element = document.createElement('button');
        this.element.classList.add('close');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        parent.appendChild(this.element);
    }

    onclick(e: PointerEvent): void {
        this.holder.toggle(false);
    }
}

class FigureCloseButton extends HolderCloseButton {
    constructor(holder: MainPhotoHolder, figure: MainPhotoFigure) {
        super(holder, figure.element);
    }
}

class DetailsCloseButton extends HolderCloseButton {
    constructor(holder: MainPhotoHolder, details_header: PhotoDetailsHeader) {
        super(holder, details_header.element);
    }
}