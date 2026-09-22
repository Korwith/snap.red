/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */


// overlay container that shows full-size media
abstract class LargeSelectionFrame<T extends PhotoEntry | VideoEntry> {
    manager: PageManager;
    element: HTMLElement;

    menu!: LargeSelectionMenu<T>;
    selected: T | null;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('large_selection_frame');
        this.selected = null;
        manager.element.appendChild(this.element);
    }

    public toggle(force?: boolean): void {
        const shown: boolean = this.element.classList.toggle('show', force);

        if (shown) {
            document.addEventListener('keydown', this.keypress);
        } else {
            this.manager.url_handler?.setState(this.manager.user);
            this.manager.footer.toggleSelectedVisible(true);
            document.removeEventListener('keydown', this.keypress);
        }
    }

    public toggleFullscreen(force?: boolean): void {
        if (window.matchMedia("(max-width: 767px)").matches) return;
        this.element.classList.toggle('fullscreen', force);
    }

    protected abstract keypress(e: KeyboardEvent): void;
}

abstract class LargeSelectionMenu<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    holder: LargeSelectionFrame<T>;
    figure!: LargeSelectionFigure<T>;
    details!: LargeSelectionDetails<T>;
    element: HTMLElement;

    constructor(holder: LargeSelectionFrame<T>) {
        this.holder = holder;
        this.element = document.createElement('article');
        this.element.classList.add('menu');
        this.holder.element.appendChild(this.element);
    }
}

abstract class LargeSelectionFigure<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    menu: LargeSelectionMenu<T>;
    element: HTMLElement;

    info!: SelectionInfoList<T>;

    constructor(menu: LargeSelectionMenu<T>) {
        this.menu = menu;
        this.element = document.createElement('figure');
    }

    public abstract load(identifier: string, param?: any): void;
    public abstract reset(): void;
}

abstract class LargeSelectionDetails<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    menu: LargeSelectionMenu<T>;
    element: HTMLElement;

    header?: any;
    grid!: any;

    constructor(menu: LargeSelectionMenu<T>) {
        this.menu = menu;
        this.element = document.createElement('aside');
    }

    public abstract load(identifier: string, param?: any): void;
    public abstract reset(): void;
}

abstract class SelectionInfoList<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    figure: LargeSelectionFigure<T>;
    element: HTMLElement;

    constructor(figure: LargeSelectionFigure<T>) {
        this.figure = figure;
        this.element = document.createElement('div');
    }

    public abstract load(identifier?: string, param?: any): void;
    public abstract reset(): void;
}

// aside header stuff
abstract class MediaDetailsHeader<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    details: LargeSelectionDetails<T>;
    element: HTMLElement;

    constructor(details: LargeSelectionDetails<T>) {
        this.details = details;
        this.element = document.createElement('div');
        this.element.classList.add('header');

        this.details.element.appendChild(this.element);
    }
}


// abstract base for info in the figure header
abstract class MediaHeaderRow<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    header: MediaDetailsHeader<T>;
    element: HTMLElement;

    constructor(header: MediaDetailsHeader<T>) {
        this.header = header;
        this.element = document.createElement('div');
        this.element.classList.add('row');
        this.header.element.appendChild(this.element);
    }

    public toggleVisibility(force: boolean) {
        this.element.classList.toggle('hide', !force);
    }
}

// abstract button base
abstract class HolderButton<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> {
    holder: LargeSelectionFrame<T>;
    element: HTMLElement;

    constructor(holder: LargeSelectionFrame<T>, parent: HTMLElement) {
        this.holder = holder;
        this.element = document.createElement('button');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        parent.appendChild(this.element);
    }

    protected abstract onclick(e: PointerEvent): void;
}

// handles various buttons on the page
// abstract base for a button that closes the main photo overlay
abstract class HolderCloseButton<T extends PhotoEntry | VideoEntry = PhotoEntry | VideoEntry> extends HolderButton {
    constructor(holder: LargeSelectionFrame<T>, parent: HTMLElement) {
        super(holder, parent);
        this.element.classList.add('close');
    }

    protected onclick(e: PointerEvent): void {
        this.holder.toggle(false);
    }
}

// close button placed inside the main photo figure
class FigureCloseButton extends HolderCloseButton {
    constructor(holder: LargeSelectionFrame<PhotoEntry | VideoEntry>, figure: LargeSelectionFigure) {
        super(holder, figure.element);
    }
}

// close button placed inside the details panel header
class DetailsCloseButton extends HolderCloseButton {
    constructor(holder: LargeSelectionFrame<PhotoEntry | VideoEntry>, row: MediaHeaderRow<PhotoEntry | VideoEntry>) {
        super(holder, row.element);
        this.element.classList.add('square');
    }
}

// allows the user to fullscreen a main media page
class DetailsFullscreenButton extends HolderButton {
    constructor(row: MediaHeaderRow<PhotoEntry | VideoEntry>) {
        super(row.header.details.menu.holder, row.element);
        this.element.classList.add('square', 'fullscreen');
    }

    protected onclick(): void {
        this.holder.toggleFullscreen();
    }
}

abstract class MediaShareButton {
    row: MediaHeaderRow<PhotoEntry | VideoEntry>;
    element: HTMLElement;

    constructor(row: MediaHeaderRow<PhotoEntry | VideoEntry>) {
        this.row = row;
        this.element = document.createElement('button');
        this.element.classList.add('share');
        this.element.textContent = 'Share';
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        row.element.appendChild(this.element);
    }

    abstract onclick(e: PointerEvent): void;
}