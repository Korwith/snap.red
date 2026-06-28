// builds and holds the page header element
class PageHeader {
    manager: PageManager;
    element: HTMLElement;
    entry_holder: HeaderEntryHolder;
    user_select: HeaderUserSelect;

    // creates the header, its button group, and the user selector
    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('header');
        this.entry_holder = new HeaderEntryHolder(this);
        this.user_select = new HeaderUserSelect(this);

        manager.element.appendChild(this.element);
    }
}

// holds the emblem and all header navigation buttons
class HeaderEntryHolder {
    header: PageHeader;
    element: HTMLElement;
    sidebar_toggle: HeaderButtonSidebar;
    emblem: HeaderEmblem;
    home: HeaderButtonHome;
    map: HeaderButtonMap;
    about: HeaderButtonAbout;

    // creates all header buttons and the emblem
    constructor(header: PageHeader) {
        this.header = header;
        this.element = document.createElement('div');
        this.sidebar_toggle = new HeaderButtonSidebar(this);
        this.emblem = new HeaderEmblem(this);
        this.home = new HeaderButtonHome(this);
        this.map = new HeaderButtonMap(this);
        this.about = new HeaderButtonAbout(this);

        this.element.classList.add('header_button_holder');
        header.element.appendChild(this.element);
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

    // notifies the user the map page is under construction
    onclick(e: PointerEvent): void {
        alert('Under Construction!');
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
        alert('Under Construction!');
    }
}

// dropdown in the header for switching between users
class HeaderUserSelect extends Dropdown {
    header: PageHeader;

    // creates the user select dropdown and populates it with all users
    constructor(header: PageHeader) {
        super(35);
        this.header = header;
        this.element.classList.add('user_select');
        this.header.element.appendChild(this.element);

        this.load();
    }

    // populates the dropdown with an option for each user
    load(): void {
        const manager: PageManager = this.header.manager;
        const users: string[] = manager.fetchUserList();

        for (const user of users) {
            const user_card: ProfileCardEntry = manager.fetchUserCard(user);
            const option: DropdownOption = new DropdownOption(this);
            option.setImage(`../icon/user/${user_card.icon}`);
            option.setText(user);
        }
    }

    // switches the active user to the selected option's name
    selected(option: DropdownOption): void {
        console.log(option)
        this.header.manager.switchUser(option.getText())
    }
}
