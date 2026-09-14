// overlay container that shows full-size media
abstract class LargeSelectionFrame {
    manager: PageManager;
    element: HTMLElement;

    menu!: LargeSelectionMenu;
    selected: PhotoEntry | null;

    // creates the holder element (selection menu created in extended classes)
    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('large_selection_frame');
        this.selected = null;
        manager.element.appendChild(this.element);
    }

    // shows or hides the overlay
    public toggle(force?: boolean): void {
        const shown: boolean = this.element.classList.toggle('show', force);

        // hooks the keypress function, url data, and footer button
        if (shown) {
            document.addEventListener('keydown', this.keypress);
        } else {
            this.manager.url_handler?.setState(this.manager.user);
            this.manager.footer.toggleSelectedVisible(true);
            document.removeEventListener('keydown', this.keypress);
        }
    }

    protected abstract keypress(e: KeyboardEvent): void;
}

abstract class LargeSelectionMenu {
    holder: LargeSelectionFrame;
    figure!: LargeSelectionFigure;
    details!: LargeSelectionDetails;
    element: HTMLElement;

    constructor(holder: LargeSelectionFrame) {
        this.holder = holder;
        this.element = document.createElement('article');
        this.element.classList.add('menu');
        this.holder.element.appendChild(this.element);
    }
}

abstract class LargeSelectionFigure {
    menu: LargeSelectionMenu;
    element: HTMLElement;

    info!: SelectionInfoList;

    constructor(menu: LargeSelectionMenu) {
        this.menu = menu;
        this.element = document.createElement('figure');
    }

    public abstract shiftSelectedPhoto(shift: number): void;
    public abstract setSelectedPhoto(index: number): void;
    public abstract load(date: string, index?: number): void;
    public abstract reset(): void;
}

abstract class LargeSelectionDetails {
    menu: LargeSelectionMenu;
    element: HTMLElement;

    header!: PhotoDetailsHeader;
    grid!: PhotoDetailsGrid;

    constructor(menu: LargeSelectionMenu) {
        this.menu = menu;
        this.element = document.createElement('aside');
    }

    public abstract load(date: string): void;
    public abstract reset(): void;
}

abstract class SelectionInfoList {
    figure: LargeSelectionFigure;
    element: HTMLElement;

    constructor(figure: LargeSelectionFigure) {
        this.figure = figure;
        this.element = document.createElement('div');
    }

    public abstract load(date: string): void;
    public abstract reset(): void;
}