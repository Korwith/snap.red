"use strict";
// root controller that manages page state, user switching, and data access
class PageManager {
    data;
    user;
    pages;
    element;
    header;
    sidebar;
    footer;
    content;
    maps;
    main_photo;
    notifications;
    url_handler;
    // initializes all page components with the default user
    constructor() {
        // global from data.ts
        this.data = Data;
        // default value
        this.user = 'Thaddeus';
        // page dictionary
        this.pages = {};
        this.element = document.body;
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.footer = new PageFooter(this);
        this.content = new PageContent(this);
        this.maps = new PageMaps(this);
        this.main_photo = new MainPhotoHolder(this);
        this.notifications = new NotificationManager(this);
        this.url_handler = new URLHandler(this);
    }
    // resets the sidebar and content area for the current user
    reload() {
        this.sidebar.reset();
        this.content.reset();
    }
    // changes the active user and reloads the page
    switchUser(user) {
        if (!this.data[user])
            throw new Error('Invalid user');
        this.user = user;
        this.header.user_select.syncToUser(user);
        this.reload();
        this.url_handler?.setState(user);
    }
    // opens or closes the sidebar and shifts the content accordingly
    toggleSidebar(force) {
        this.element.classList.toggle('shift', force);
    }
    // sends a notification (handled by notification manager)
    pushNotification(type, text) {
        this.notifications.pushNotification(type, text);
    }
    // opens the full-size photo viewer for the given date
    openImageByDate(date, user) {
        user ??= this.user;
        this.main_photo.openImageByDate(date);
        this.url_handler?.setState(this.user, date);
    }
    // returns an array of all user names in the database
    fetchUserList() {
        return Object.keys(this.data);
    }
    // returns the currently active user's name
    fetchUserName() {
        return this.user;
    }
    // returns the full data entry for a user
    fetchUserData(user) {
        user ??= this.user;
        return this.data[user];
    }
    // returns the profile card data for a user
    fetchUserCard(user) {
        user ??= this.user;
        return this.fetchUserData(user).card;
    }
    // returns the social media link map for a user
    fetchUserSocialDatabase(user) {
        user ??= this.user;
        return this.fetchUserData(user).social;
    }
    // returns photos filtered by featured status, or all photos if null
    fetchUserImages(featured, user) {
        user ??= this.user;
        const images = this.fetchUserData(user).images;
        const matches = {};
        for (const date in images) {
            const entry = images[date];
            switch (featured) {
                case null:
                    matches[date] = entry;
                    break;
                case true:
                    if (featured && entry.featured)
                        matches[date] = entry;
                    break;
                case false:
                    if (!featured && !entry.featured)
                        matches[date] = entry;
                    break;
            }
        }
        return matches;
    }
    // returns a single photo entry by its date key
    fetchImageByDate(date, user) {
        user ??= this.user;
        return this.fetchUserImages(null, user)[date];
    }
    // returns all photos taken in the given year
    fetchUserImagesByYear(year, user) {
        user ??= this.user;
        // this may be an issue in 75 years time
        const year_id = year.slice(-2);
        const images = this.fetchUserImages(null, user);
        const matches = {};
        for (const date in images) {
            const new_year_id = date.slice(-2);
            if (year_id != new_year_id)
                continue;
            matches[date] = images[date];
        }
        return matches;
    }
    // returns all photos taken in the given month
    fetchUserImagesByMonth(month, user) {
        user ??= this.user;
        const images = this.fetchUserImages(null, user);
        const matches = {};
        for (const date in images) {
            const new_month_id = date.slice(0, 2);
            if (month != new_month_id)
                continue;
            matches[date] = images[date];
        }
        return matches;
    }
    // returns all photos taken in the given month and year
    fetchUserImagesByMonthAndYear(month, year, user) {
        user ??= this.user;
        const year_id = year.slice(-2);
        const images = this.fetchUserImages(null, user);
        const matches = {};
        for (const date in images) {
            const new_month_id = date.slice(0, 2);
            const new_year_id = date.slice(-2);
            if (year_id != new_year_id)
                continue;
            if (month != new_month_id)
                continue;
            matches[date] = images[date];
        }
        return matches;
    }
    // returns all photos taken at the given location name
    fetchUserImagesByLocation(location, user) {
        user ??= this.user;
        const images = this.fetchUserImages(null, user);
        const matches = {};
        for (const date in images) {
            const photo = images[date];
            if (photo.name != location)
                continue;
            matches[date] = photo;
        }
        return matches;
    }
    // returns all photos that feature the given person
    fetchUserImagesByPerson(person, user) {
        user ??= this.user;
        const images = this.fetchUserImages(null, user);
        const matches = {};
        for (const date in images) {
            const photo = images[date];
            if (!photo.people)
                continue;
            if (photo.people.includes(person))
                matches[date] = photo;
        }
        return matches;
    }
    // returns a deduplicated list of all people featured across all photos
    fetchFeaturedPeople(user) {
        user ??= this.user;
        const photos = this.fetchUserImages(null);
        const people = [];
        for (const date in photos) {
            const photo = photos[date];
            if (!photo.people)
                continue;
            for (const person of photo.people) {
                if (people.includes(person))
                    continue;
                people.push(person);
            }
        }
        return people;
    }
    // returns true if the person is featured in photos and not in the hide list
    isFeaturedPersonValid(user) {
        const users = this.fetchFeaturedPeople();
        if (HideUsers.includes(user))
            return false;
        if (!users.includes(user))
            return false;
        return true;
    }
    // filters a people list to only include valid featured people
    sanitizePeopleList(list) {
        const allowed = [];
        for (const person of list) {
            if (!this.isFeaturedPersonValid(person))
                continue;
            allowed.push(person);
        }
        return allowed;
    }
    // returns the video database for a user if it exists
    fetchUserVideos(user) {
        user ??= this.user;
        return this.fetchUserData(user).videos || null;
    }
    // returns photos structured by year then month for the sidebar timeline
    fetchSidebarContent(user) {
        user ??= this.user;
        const images = this.fetchUserImages(null, user);
        const batch = {};
        for (const date in images) {
            const year_id = date.slice(-2);
            const month_id = date.slice(0, 2);
            if (!batch[year_id])
                batch[year_id] = {};
            if (!batch[year_id][month_id])
                batch[year_id][month_id] = {};
            batch[year_id][month_id][date] = images[date];
        }
        return batch;
    }
    // pages registering themselves to hide/show systek
    registerPage(name, page) {
        this.pages[name] = page;
        this.element.appendChild(page.element);
    }
    // user specified page will show, others will hide
    showPage(name) {
        for (const key in this.pages) {
            const page = this.pages[key];
            page.toggle(name == key);
        }
    }
}
// decides what to do with the given URL
// possibly executing various page functions
class URLHandler {
    manager;
    // creates handler then checks url
    constructor(manager) {
        this.manager = manager;
        this.checkURL(window.location.href);
    }
    // sets given url state
    setState(user, date) {
        let hash = `user=${user}`;
        if (date)
            hash += `&date=${date.replace(/\//g, '')}`;
        window.history.replaceState(null, document.title, `#${hash}`);
    }
    // clears current url state
    clearURLData() {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    // checks if url is valid on load, then run functions
    checkURL(href) {
        const hash = href.split('#')[1] ?? '';
        if (!hash)
            return;
        const params = new URLSearchParams(hash);
        const user = params.get('user');
        const date_raw = params.get('date');
        if (user) {
            try {
                this.manager.switchUser(user);
            }
            catch {
                return;
            }
        }
        if (date_raw) {
            const date = this.constructDate(date_raw);
            if (!date)
                return;
            this.manager.openImageByDate(date);
        }
    }
    // turns 062823 into 06/28/23 for example (because slashes wouldnt work in our url)
    constructDate(numbers) {
        if (numbers.length != 6)
            return null;
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 6)}`;
    }
}
const Manager = new PageManager();
