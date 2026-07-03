// root controller that manages page state, user switching, and data access
class PageManager {
    data: Database;
    user: string;

    element: HTMLElement;
    header: PageHeader;
    sidebar: PageSidebar;
    footer: PageFooter;
    content: PageContent;
    main_photo: MainPhotoHolder;
    notifications: NotificationManager;
    url_handler?: URLHandler;

    // initializes all page components with the default user
    constructor() {
        // global from data.ts
        this.data = Data;
        // default value
        this.user = 'Thaddeus';

        this.element = document.body;
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.footer = new PageFooter(this)
        this.content = new PageContent(this);
        this.main_photo = new MainPhotoHolder(this);
        this.notifications = new NotificationManager(this);
        this.url_handler = new URLHandler(this);
    }

    // resets the sidebar and content area for the current user
    reload(): void {
        this.sidebar.reset();
        this.content.reset();
    }

    // changes the active user and reloads the page
    switchUser(user: string): void {
        if (!this.data[user]) throw new Error('Invalid user');
        this.user = user;
        this.header.user_select.syncToUser(user);
        this.reload();
        this.url_handler?.setState(user);
    }

    // opens or closes the sidebar and shifts the content accordingly
    toggleSidebar(force?: boolean): void {
        this.sidebar.toggle(force);
        this.content.toggle(force);
    }

    // sends a notification (handled by notification manager)
    pushNotification(type: NotificationType, text: string): void {
        this.notifications.pushNotification(type, text);
    }

    // opens the full-size photo viewer for the given date
    openImageByDate(date: string, user?: string): void {
        user ??= this.user;
        this.main_photo.openImageByDate(date);
        this.url_handler?.setState(this.user, date);
    }

    // returns an array of all user names in the database
    fetchUserList(): string[] {
        return Object.keys(this.data);
    }

    // returns the currently active user's name
    fetchUserName(): string {
        return this.user;
    }

    // returns the full data entry for a user
    fetchUserData(user?: string): UserEntry {
        user ??= this.user;
        return this.data[user];
    }

    // returns the profile card data for a user
    fetchUserCard(user?: string): ProfileCardEntry {
        user ??= this.user;
        return this.fetchUserData(user).card;
    }

    // returns the social media link map for a user
    fetchUserSocialDatabase(user?: string): ProfileSocialDatabase {
        user ??= this.user;
        return this.fetchUserData(user).social;
    }

    // returns photos filtered by featured status, or all photos if null
    fetchUserImages(featured: boolean | null, user?: string): PhotoDatabase {
        user ??= this.user;
        const images: PhotoDatabase = this.fetchUserData(user).images;
        const matches: PhotoDatabase = {};

        for (const date in images) {
            const entry: PhotoEntry = images[date];
            switch (featured) {
                case null:
                    matches[date] = entry;
                    break;
                case true:
                    if (featured && entry.featured) matches[date] = entry;
                    break;
                case false:
                    if (!featured && !entry.featured) matches[date] = entry;
                    break;
            }
        }

        return matches;
    }

    // returns a single photo entry by its date key
    fetchImageByDate(date: string, user?: string): PhotoEntry | null {
        user ??= this.user;
        return this.fetchUserImages(null, user)[date];
    }

    // returns all photos taken in the given year
    fetchUserImagesByYear(year: string, user?: string): PhotoDatabase {
        user ??= this.user;
        // this may be an issue in 75 years time
        const year_id: string = year.slice(-2);
        const images: PhotoDatabase = this.fetchUserImages(null, user);
        const matches: PhotoDatabase = {};

        for (const date in images) {
            const new_year_id: string = date.slice(-2);
            if (year_id != new_year_id) continue;
            matches[date] = images[date];
        }

        return matches;
    }

    // returns all photos taken in the given month
    fetchUserImagesByMonth(month: string, user?: string): PhotoDatabase {
        user ??= this.user;
        const images: PhotoDatabase = this.fetchUserImages(null, user);
        const matches: PhotoDatabase = {};

        for (const date in images) {
            const new_month_id = date.slice(0, 2);
            if (month != new_month_id) continue;
            matches[date] = images[date];
        }

        return matches;
    }

    // returns all photos taken in the given month and year
    fetchUserImagesByMonthAndYear(month: string, year: string, user?: string): PhotoDatabase {
        user ??= this.user;
        const year_id: string = year.slice(-2);
        const images: PhotoDatabase = this.fetchUserImages(null, user);
        const matches: PhotoDatabase = {};

        for (const date in images) {
            const new_month_id: string = date.slice(0, 2);
            const new_year_id: string = date.slice(-2);
            if (year_id != new_year_id) continue;
            if (month != new_month_id) continue;
            matches[date] = images[date];
        }

        return matches;
    }

    // returns all photos taken at the given location name
    fetchUserImagesByLocation(location: string, user?: string): PhotoDatabase {
        user ??= this.user;
        const images: PhotoDatabase = this.fetchUserImages(null, user);
        const matches: PhotoDatabase = {};

        for (const date in images) {
            const photo: PhotoEntry = images[date];
            if (photo.name != location) continue;
            matches[date] = photo;
        }

        return matches;
    }

    // returns all photos that feature the given person
    fetchUserImagesByPerson(person: string, user?: string): PhotoDatabase {
        user ??= this.user;
        const images: PhotoDatabase = this.fetchUserImages(null, user);
        const matches: PhotoDatabase = {};

        for (const date in images) {
            const photo: PhotoEntry = images[date];
            if (!photo.people) continue;
            if (photo.people.includes(person)) matches[date] = photo;
        }

        return matches;
    }

    // returns a deduplicated list of all people featured across all photos
    fetchFeaturedPeople(user?: string): string[] {
        user ??= this.user;
        const photos: PhotoDatabase = this.fetchUserImages(null);
        const people: string[] = [];

        for (const date in photos) {
            const photo: PhotoEntry = photos[date];
            if (!photo.people) continue;
            for (const person of photo.people) {
                if (people.includes(person)) continue;
                people.push(person);
            }
        }

        return people;
    }

    // returns true if the person is featured in photos and not in the hide list
    isFeaturedPersonValid(user: string): boolean {
        const users: string[] = this.fetchFeaturedPeople();
        if (HideUsers.includes(user)) return false;
        if (!users.includes(user)) return false;
        return true;
    }

    // filters a people list to only include valid featured people
    sanitizePeopleList(list: string[]): string[] {
        const allowed: string[] = [];
        for (const person of list) {
            if (!this.isFeaturedPersonValid(person)) continue;
            allowed.push(person);
        }
        return allowed;
    }

    // returns the video database for a user if it exists
    fetchUserVideos(user?: string): VideoDatabase | null {
        user ??= this.user;
        return this.fetchUserData(user).videos || null;
    }

    // returns photos structured by year then month for the sidebar timeline
    fetchSidebarContent(user?: string): SidebarStructure {
        user ??= this.user;

        const images: PhotoDatabase = this.fetchUserImages(null, user);
        const batch: SidebarStructure = {};

        for (const date in images) {
            const year_id: string = date.slice(-2);
            const month_id: string = date.slice(0, 2);

            if (!batch[year_id]) batch[year_id] = {};
            if (!batch[year_id][month_id]) batch[year_id][month_id] = {};
            batch[year_id][month_id][date] = images[date];
        }

        return batch;
    }
}

// decides what to do with the given URL
// possibly executing various page functions
class URLHandler {
    manager: PageManager;

    // creates handler then checks url
    constructor(manager: PageManager) {
        this.manager = manager;
        this.checkURL(window.location.href);
    }

    // sets given url state
    setState(user: string, date?: string): void {
        let hash = `user=${user}`;
        if (date) hash += `&date=${date.replace(/\//g, '')}`;
        window.history.replaceState(null, document.title, `#${hash}`);
    }

    // clears current url state
    clearURLData(): void {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }

    // checks if url is valid on load, then run functions
    checkURL(href: string) {
        const hash: string = href.split('#')[1] ?? '';
        if (!hash) return;

        const params: URLSearchParams = new URLSearchParams(hash);
        const user: string | null = params.get('user');
        const date_raw: string | null = params.get('date');

        if (user) {
            try {
                this.manager.switchUser(user);
            } catch {
                return;
            }
        }

        if (date_raw) {
            const date: string | null = this.constructDate(date_raw);
            if (!date) return;
            this.manager.openImageByDate(date);
        }
    }

    // turns 062823 into 06/28/23 for example (because slashes wouldnt work in our url)
    constructDate(numbers: string): string | null {
        if (numbers.length != 6) return null;
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 6)}`;
    }
}

const Manager = new PageManager();
