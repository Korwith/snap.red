"use strict";
// builds and holds the page header element
class PageHeader {
    manager;
    element;
    entry_holder;
    user_select;
    // creates the header, its button group, and the user selector
    constructor(manager) {
        this.manager = manager;
        this.element = document.createElement('header');
        this.entry_holder = new HeaderEntryHolder(this);
        this.user_select = new HeaderUserSelect(this);
        manager.element.appendChild(this.element);
    }
}
// holds the emblem and all header navigation buttons
class HeaderEntryHolder {
    header;
    element;
    sidebar_toggle;
    emblem;
    home;
    map;
    about;
    // creates all header buttons and the emblem
    constructor(header) {
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
class HeaderButton {
    holder;
    element;
    // creates the button element and registers the click handler
    constructor(holder) {
        this.holder = holder;
        this.element = document.createElement('button');
        holder.element.appendChild(this.element);
        this.element.onclick = (e) => this.onclick(e);
    }
}
// displays the site name emblem in the header
class HeaderEmblem {
    element;
    // creates and appends the emblem element
    constructor(holder) {
        this.element = document.createElement('div');
        this.element.classList.add('emblem');
        this.element.textContent = 'Snapshot';
        holder.element.appendChild(this.element);
    }
}
// header button that toggles the sidebar open and closed
class HeaderButtonSidebar extends HeaderButton {
    // creates the sidebar toggle button
    constructor(holder) {
        super(holder);
        this.element.classList.add('sidebar_toggle', 'square');
    }
    // toggles the sidebar visibility
    onclick(e) {
        this.holder.header.manager.toggleSidebar();
    }
}
// header button that navigates to the home view
class HeaderButtonHome extends HeaderButton {
    // creates the home button
    constructor(holder) {
        super(holder);
        this.element.classList.add('home');
        this.element.textContent = 'Home';
    }
    // handles home button click
    onclick(e) {
    }
}
// header button that opens the map view
class HeaderButtonMap extends HeaderButton {
    // creates the map button
    constructor(holder) {
        super(holder);
        this.element.classList.add('map');
        this.element.textContent = 'Map';
    }
    // notifies the user the map page is under construction
    onclick(e) {
        alert('Under Construction!');
    }
}
// header button that opens the about view
class HeaderButtonAbout extends HeaderButton {
    // creates the about button
    constructor(holder) {
        super(holder);
        this.element.classList.add('about');
        this.element.textContent = 'About';
    }
    // notifies the user the about page is under construction
    onclick(e) {
        alert('Under Construction!');
    }
}
// dropdown in the header for switching between users
class HeaderUserSelect extends Dropdown {
    header;
    // creates the user select dropdown and populates it with all users
    constructor(header) {
        super(35);
        this.header = header;
        this.element.classList.add('user_select');
        this.header.element.appendChild(this.element);
        this.load();
    }
    // populates the dropdown with an option for each user
    load() {
        const manager = this.header.manager;
        const users = manager.fetchUserList();
        for (const user of users) {
            const user_card = manager.fetchUserCard(user);
            const option = new DropdownOption(this);
            option.setImage(`../icon/user/${user_card.icon}`);
            option.setText(user);
        }
    }
    // visually syncs the dropdown to show the given user as selected
    syncToUser(user) {
        const option = this.options.find(o => o.getText() === user);
        if (option)
            this.setPrimaryOption(option, true);
    }
    // switches the active user to the selected option's name
    selected(option) {
        this.header.manager.switchUser(option.getText());
    }
}
