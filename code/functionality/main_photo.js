"use strict";
// overlay container that shows a full-size photo and its detail panel
class MainPhotoHolder {
    manager;
    element;
    menu;
    selected;
    // creates the holder element and its photo menu
    constructor(manager) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.classList.add('main_photo_holder');
        this.menu = new MainPhotoMenu(this);
        this.selected = null;
        manager.element.appendChild(this.element);
    }
    // shows or hides the overlay
    toggle(force) {
        this.element.classList.toggle('show', force);
    }
    // loads the photo and its details for the given date and shows the overlay
    openImageByDate(date) {
        const entry = this.manager.fetchImageByDate(date);
        this.selected = entry;
        this.menu.figure.load(date);
        this.menu.details.load(date);
        this.toggle(true);
    }
}
// article element containing the main photo figure and its detail sidebar
class MainPhotoMenu {
    holder;
    element;
    figure;
    details;
    // creates the menu article with figure and details panels
    constructor(holder) {
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
    menu;
    element;
    info;
    left;
    right;
    close;
    caption;
    images;
    selected;
    // builds the figure with info overlay, navigation buttons, and close button
    constructor(menu) {
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
    loadPhotoDetails(date) {
        const manager = this.menu.holder.manager;
        const photo = manager.fetchImageByDate(date);
        if (!photo)
            throw new Error('Photo not found at date');
        this.info.load(date);
        this.caption.textContent = photo.name;
    }
    // creates and positions img elements for each id in the photo's list
    loadPhotoList(list) {
        const manager = this.menu.holder.manager;
        const user = manager.fetchUserName();
        for (const index in list) {
            const id = list[index];
            const img = document.createElement('img');
            img.setAttribute('loading', 'eager');
            img.setAttribute('id', id.toString());
            img.setAttribute('src', `../media/${user}/IMG_${id}.jpg`);
            img.style.left = `${parseInt(index) * 100}%`;
            this.images.push(img);
            this.element.appendChild(img);
        }
    }
    // slides all images to display the one at the given offset from the current index
    shiftSelectedPhoto(shift) {
        const index = this.selected + shift;
        if (index < 0 || index >= this.images.length)
            return;
        this.element.classList.toggle('hide_left', index - 1 < 0);
        this.element.classList.toggle('hide_right', this.images.length == 1 || index + 1 >= this.images.length);
        for (const key in this.images) {
            const image = this.images[key];
            image.style.left = `${(parseInt(key) - index) * 100}%`;
        }
        this.selected = index;
    }
    // resets the figure and loads the photo and its image list for the given date
    load(date) {
        const manager = this.menu.holder.manager;
        const photo = manager.fetchImageByDate(date);
        if (!photo)
            throw new Error('No photo found!');
        this.reset();
        this.loadPhotoDetails(date);
        this.loadPhotoList(photo.id);
        this.shiftSelectedPhoto(0);
    }
    // clears the current photo images, caption, and info overlay
    reset() {
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
    figure;
    element;
    date;
    people;
    // creates the info overlay with date and people spans
    constructor(figure) {
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
    load(date) {
        const manager = this.figure.menu.holder.manager;
        const entry = manager.fetchImageByDate(date);
        if (!entry)
            throw new Error('No image found at date');
        this.date.textContent = date;
        const sanitized_users = manager.sanitizePeopleList(entry.people || []);
        if (sanitized_users && sanitized_users.length > 0) {
            this.people.classList.remove('hide');
            this.people.textContent = sanitized_users.join(', ');
        }
        else {
            this.people.classList.add('hide');
            this.people.textContent = '';
        }
    }
    // clears the date and people text
    reset() {
        this.date.textContent = '';
        this.people.textContent = '';
    }
}
// abstract base for a left or right photo navigation button
class FigureNavigation {
    figure;
    element;
    // creates the navigation button and attaches it to the figure
    constructor(main_figure) {
        this.figure = main_figure;
        this.element = document.createElement('button');
        this.element.classList.add('nav');
        this.element.onclick = (e) => this.onclick(e);
        this.figure.element.appendChild(this.element);
    }
}
// navigation button that moves to the previous photo
class FigureNavigationLeft extends FigureNavigation {
    // creates the left navigation button
    constructor(main_figure) {
        super(main_figure);
        this.element.classList.add('left');
    }
    // shifts the selected photo one step to the left
    onclick(e) {
        this.figure.shiftSelectedPhoto(-1);
    }
}
// navigation button that moves to the next photo
class FigureNavigationRight extends FigureNavigation {
    // creates the right navigation button
    constructor(main_figure) {
        super(main_figure);
        this.element.classList.add('right');
    }
    // shifts the selected photo one step to the right
    onclick(e) {
        this.figure.shiftSelectedPhoto(1);
    }
}
// side panel showing related photo rows for the currently viewed photo
class MainPhotoDetails {
    menu;
    element;
    header;
    grid;
    // creates the aside panel with a header and photo row grid
    constructor(menu) {
        this.menu = menu;
        this.element = document.createElement('aside');
        this.header = new PhotoDetailsHeader(this);
        this.grid = new PhotoDetailsGrid(this);
        this.menu.element.appendChild(this.element);
    }
    // loads the location name header and related photo rows for the given date
    loadPhotoDetails(date) {
        const manager = this.menu.holder.manager;
        const entry = manager.fetchImageByDate(date);
        if (!entry)
            throw new Error('No photos found at date');
        this.header.displayText(entry.name);
        this.grid.load(date);
    }
    // delegates to loadPhotoDetails for the given date
    load(date) {
        this.loadPhotoDetails(date);
    }
    // clears the header text and resets the photo row grid
    reset() {
        this.header.element.textContent = '';
        this.grid.reset();
    }
}
// header bar at the top of the details panel showing the location name
class PhotoDetailsHeader {
    details;
    element;
    span;
    share;
    close;
    // creates the header with a text span and close button
    constructor(details) {
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
    displayText(text) {
        this.span.textContent = text;
    }
}
// grid of related photo rows shown in the details panel
class PhotoDetailsGrid {
    details;
    photo_rows;
    element;
    // creates the grid container element
    constructor(details) {
        this.details = details;
        this.photo_rows = [];
        this.element = document.createElement('div');
        this.element.classList.add('grid_holder');
        this.details.element.appendChild(this.element);
    }
    // loads location, person, and month photo rows for the given date
    load(date) {
        const manager = this.details.menu.holder.manager;
        const entry = manager.fetchImageByDate(date);
        const month = date.slice(0, 2);
        const year = date.slice(-2);
        if (!entry)
            throw new Error('No entry found at date');
        this.reset();
        const location_pane = new PhotoRowLocation(manager, this.element, entry.name, date);
        this.photo_rows.push(location_pane);
        if (entry.people) {
            for (const person of entry.people) {
                if (!manager.isFeaturedPersonValid(person))
                    continue;
                const person_pane = new PhotoRowPerson(manager, this.element, person, date);
                this.photo_rows.push(person_pane);
            }
        }
        const month_pane = new PhotoRowMonth(manager, this.element, month, year, date);
        this.photo_rows.push(month_pane);
    }
    // removes all photo rows from the grid
    reset() {
        for (const row of this.photo_rows) {
            row.remove();
        }
    }
}
// abstract base for a button that closes the main photo overlay
class HolderCloseButton {
    holder;
    element;
    // creates the close button and appends it to the given parent element
    constructor(holder, parent) {
        this.holder = holder;
        this.element = document.createElement('button');
        this.element.classList.add('close');
        this.element.onclick = (e) => this.onclick(e);
        parent.appendChild(this.element);
    }
    // hides the main photo overlay and removes the date from the URL
    onclick(e) {
        this.holder.toggle(false);
        this.holder.manager.url_handler?.setState(this.holder.manager.user);
    }
}
// close button placed inside the main photo figure
class FigureCloseButton extends HolderCloseButton {
    // creates the close button inside the figure element
    constructor(holder, figure) {
        super(holder, figure.element);
    }
}
// close button placed inside the details panel header
class DetailsCloseButton extends HolderCloseButton {
    // creates the close button inside the details header element
    constructor(holder, details_header) {
        super(holder, details_header.element);
    }
}
// button which copies a sharable link
class PhotoShareButton {
    header;
    element;
    constructor(details_header) {
        this.header = details_header;
        this.element = document.createElement('button');
        this.element.classList.add('share');
        this.element.textContent = 'Share';
        this.element.onclick = (e) => this.onclick(e);
        details_header.element.appendChild(this.element);
    }
    async onclick(e) {
        const manager = this.header.details.menu.holder.manager;
        const selected = this.header.details.menu.holder.selected;
        if (!selected)
            return;
        try {
            await navigator.share({
                title: selected.name,
                text: `Check out ${selected.name} on Snapshot!`,
                url: window.location.href,
            });
        }
        catch (error) {
            try {
                navigator.clipboard.writeText(window.location.href);
                manager.pushNotification('Info', 'Copied to clipboard!');
            }
            catch (error) {
                manager.pushNotification('Warn', 'Your device does not support sharing.');
            }
        }
    }
}
