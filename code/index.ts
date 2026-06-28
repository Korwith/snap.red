class PageManager {
    data: Database;
    user: string;

    element: HTMLElement;
    header: PageHeader;
    sidebar: PageSidebar;
    footer: PageFooter;
    content: PageContent;
    main_photo: MainPhotoHolder;

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
    }

    // page control actions
    reload(): void {
        this.sidebar.reset();
        this.content.reset();
    }

    switchUser(user: string): void {
        if (!this.data[user]) throw new Error('Invalid user');
        this.user = user;
        this.reload();
    }

    toggleSidebar(force?: boolean): void {
        this.sidebar.toggle(force);
        this.content.toggle(force);
    }

    openImageByDate(date: string, user?: string): void {
        user ??= this.user;
        this.main_photo.openImageByDate(date);
    }

    // gather user data
    fetchUserList(): string[] {
        return Object.keys(this.data);
    }

    fetchUserName(): string {
        return this.user;
    }

    fetchUserData(user?: string): UserEntry {
        user ??= this.user;
        return this.data[user];
    }

    fetchUserCard(user?: string): ProfileCardEntry {
        user ??= this.user;
        return this.fetchUserData(user).card;
    }

    fetchUserSocialDatabase(user?: string): ProfileSocialDatabase {
        user ??= this.user;
        return this.fetchUserData(user).social;
    }

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

    // fetch image data
    fetchImageByDate(date: string, user?: string): PhotoEntry | null {
        user ??= this.user;
        return this.fetchUserImages(null, user)[date];
    }

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

    // people
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

    isFeaturedPersonValid(user: string): boolean {
        const users: string[] = this.fetchFeaturedPeople();
        if (HideUsers.includes(user)) return false;
        if (!users.includes(user)) return false;
        return true;
    }

    sanitizePeopleList(list: string[]): string[] {
        const allowed: string[] = [];
        for (const person of list) {
            if (!this.isFeaturedPersonValid(person)) continue;
            allowed.push(person);
        }
        return allowed;
    }

    // videos
    fetchUserVideos(user?: string): VideoDatabase | null {
        user ??= this.user;
        return this.fetchUserData(user).videos || null;
    }

    // sidebar data
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

const Manager = new PageManager();
