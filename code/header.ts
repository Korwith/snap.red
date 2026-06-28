class PageHeader {
    manager: PageManager;
    element: HTMLElement;
    entry_holder: HeaderEntryHolder;
    user_select: HeaderUserSelect;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('header');
        this.entry_holder = new HeaderEntryHolder(this);
        this.user_select = new HeaderUserSelect(this);

        manager.element.appendChild(this.element);
    }
}

class HeaderEntryHolder {
    header: PageHeader;
    element: HTMLElement;
    sidebar_toggle: HeaderButtonSidebar;
    emblem: HeaderEmblem;
    home: HeaderButtonHome;
    map: HeaderButtonMap;
    about: HeaderButtonAbout;

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

abstract class HeaderButton {
    holder: HeaderEntryHolder;
    element: HTMLElement;

    constructor(holder: HeaderEntryHolder) {
        this.holder = holder;
        this.element = document.createElement('button');
        holder.element.appendChild(this.element);
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
    }

    abstract onclick(e: PointerEvent): void;
}

class HeaderEmblem {
    element: HTMLElement;

    constructor(holder: HeaderEntryHolder) {
        this.element = document.createElement('div');
        this.element.classList.add('emblem');
        this.element.textContent = 'Snapshot';
        holder.element.appendChild(this.element);
    }
}

class HeaderButtonSidebar extends HeaderButton {
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('sidebar_toggle', 'square');
    }

    onclick(e: PointerEvent): void {
        this.holder.header.manager.toggleSidebar();
    }
}

class HeaderButtonHome extends HeaderButton {
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('home');
        this.element.textContent = 'Home';
    }

    onclick(e: PointerEvent): void {
    }
}

class HeaderButtonMap extends HeaderButton {
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('map');
        this.element.textContent = 'Map';
    }

    onclick(e: PointerEvent): void {
        alert('Under Construction!');
    } 
}

class HeaderButtonAbout extends HeaderButton {
    constructor(holder: HeaderEntryHolder) {
        super(holder);
        this.element.classList.add('about');
        this.element.textContent = 'About';
    }

    onclick(e: PointerEvent): void {
        alert('Under Construction!');
    }
}

class HeaderUserSelect extends Dropdown {
    header: PageHeader;

    constructor(header: PageHeader) {
        super(35);
        this.header = header;
        this.element.classList.add('user_select');
        this.header.element.appendChild(this.element);

        this.load();
    }

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

    selected(option: DropdownOption): void {
        console.log(option)
        this.header.manager.switchUser(option.getText())
    }
}