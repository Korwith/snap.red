// builds and holds the page header element
class PageHeader {
    manager: PageManager;
    element: HTMLElement;
    left_holder: LeftHeaderHolder;
    right_holder: RightHeaderHolder;

    // creates the header, its button group, and the user selector
    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('header');

        this.left_holder = new LeftHeaderHolder(this);
        this.right_holder = new RightHeaderHolder(this);

        manager.element.appendChild(this.element);
    }
}

// holds the buttons and labels displayed in the header
abstract class HeaderEntryHolder {
    header: PageHeader;
    element: HTMLElement;

    constructor(header: PageHeader) {
        this.header = header;
        this.element = document.createElement('div');
        this.element.classList.add('header_button_holder');
        this.header.element.appendChild(this.element);
    }
}

// holds the emblem and all header navigation buttons
class LeftHeaderHolder extends HeaderEntryHolder {
    sidebar_toggle: HeaderButtonSidebar;
    emblem: HeaderEmblem;
    home: HeaderButtonHome;
    map: HeaderButtonMap;
    about: HeaderButtonAbout;

    constructor(header: PageHeader) {
        super(header);
        this.element.classList.add('left');

        this.sidebar_toggle = new HeaderButtonSidebar(this);
        this.emblem = new HeaderEmblem(this);
        this.home = new HeaderButtonHome(this);
        this.map = new HeaderButtonMap(this);
        this.about = new HeaderButtonAbout(this);
    }
}

class RightHeaderHolder extends HeaderEntryHolder {
    user_select: HeaderUserSelect;

    constructor(header: PageHeader) {
        super(header);
        this.element.classList.add('right');

        this.user_select = new HeaderUserSelect(this);
    }
}

// abstract base for a clickable header button
abstract class HeaderButton {
    holder: HeaderEntryHolder;
    element: HTMLElement;

    // creates the button element and registers the click handler
    constructor(holder: HeaderEntryHolder) {
        this.holder = holder;
        this.element = document.createElement('button');
        holder.element.appendChild(this.element);
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
    }

    abstract onclick(e: PointerEvent): void;
}

// displays the site name emblem in the header
class HeaderEmblem {
    element: HTMLElement;

    // creates and appends the emblem element
    constructor(holder: HeaderEntryHolder) {
        this.element = document.createElement('div');
        this.element.classList.add('emblem');
        this.element.textContent = 'Snapshot';
        holder.element.appendChild(this.element);
    }
}

// header button that toggles the sidebar open and closed
class HeaderButtonSidebar extends HeaderButton {
    // creates the sidebar toggle button
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('sidebar_toggle', 'square');
    }

    // toggles the sidebar visibility
    onclick(e: PointerEvent): void {
        this.holder.header.manager.toggleSidebar();
    }
}

// header button that navigates to the home view
class HeaderButtonHome extends HeaderButton {
    // creates the home button
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('home');
        this.element.textContent = 'Home';
    }

    // handles home button click
    onclick(e: PointerEvent): void {
        this.holder.header.manager.showPage('content');
    }
}

// header button that opens the map view
class HeaderButtonMap extends HeaderButton {
    // creates the map button
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('map');
        this.element.textContent = 'Map';
    }

    // toggles the maps page
    onclick(e: PointerEvent): void {
        this.holder.header.manager.showPage('maps');
        this.holder.header.manager.pushNotification('Info', 'The maps page is still under construction.');
    }
}

// header button that opens the about view
class HeaderButtonAbout extends HeaderButton {
    // creates the about button
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('about');
        this.element.textContent = 'About';
    }

    // notifies the user the about page is under construction
    onclick(e: PointerEvent): void {
        this.holder.header.manager.showPage('about');
    }
}

// dropdown in the header for switching between users
class HeaderUserSelect extends Dropdown {
    holder: HeaderEntryHolder;

    // creates the user select dropdown and populates it with all users
    constructor(holder: HeaderEntryHolder) {
        super(35);
        this.holder = holder;

        this.element.classList.add('user_select');
        this.holder.element.appendChild(this.element);

        this.load();
    }

    // populates the dropdown with an option for each user
    load(): void {
        const manager: PageManager = this.holder.header.manager;
        const users: string[] = manager.fetchUserList();

        for (const user of users) {
            const user_card: ProfileCardEntry = manager.fetchUserCard(user);
            const option: DropdownOption = new DropdownOption(this);
            option.setImage(`../icon/user/${user_card.icon}`);
            option.setText(user);
        }
    }

    // visually syncs the dropdown to show the given user as selected
    syncToUser(user: string): void {
        const option = this.options.find(o => o.getText() === user);
        if (option) this.setPrimaryOption(option, true);
    }

    // switches the active user to the selected option's name
    selected(option: DropdownOption): void {
        this.holder.header.manager.switchUser(option.getText());
    }
}
