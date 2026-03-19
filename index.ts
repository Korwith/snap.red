interface DateCounter {
    [year: string]: {
        [month: string]: number;
    }
}

class PageManager {
    user: string;
    header: PageHeader;
    sidebar: PageSidebar;
    content: PageContent;
    main_photo_holder: MainPhotoHolder;
    stats_manager: WebsiteStats;

    constructor() {
        this.user = 'Thaddeus';
        this.stats_manager = new WebsiteStats('Korwith', 'snap.red');
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.content = new PageContent(this);
        this.main_photo_holder = new MainPhotoHolder(this);
    }

    public loadUser(name: string) {
        this.user = name;
        this.content.reload();
        this.sidebar.reload();
    }

    public shiftLayout(): void {
        this.sidebar.shiftLayout();
        this.content.shiftLayout();
    }

    public countImages(): DateCounter {
        let profile: UserEntry = Data[this.user];
        if (!profile) throw new Error('No profile selected!');

        let count: DateCounter = {};

        for (var date in profile.images) {
            let dateSplit = date.split('/');
            let year: string = dateSplit[2];
            let month = dateSplit[0];

            if (!count[year]) count[year] = {};
            if (!count[year][month]) count[year][month] = 0;
            count[year][month]++;
        }

        return count;
    }

    public getUserImages(): PhotoDatabase {
        return Data[this.user].images;
    }

    public getUserVideos(): VideoDatabase | null {
        return Data[this.user].videos || null;
    }

    public getUserSocials(): ProfileSocialDatabase {
        return Data[this.user].social;
    }

    public getUserSiteInfo(): ProfileWebsiteEntry | null {
        return Data[this.user].card.site || null;
    }

    public getUserFeaturedPeople(): string[] {
        let found: string[] = [];
        let images: PhotoDatabase = this.getUserImages();

        for (let date in images) {
            let entry: PhotoEntry = images[date];
            if (!entry.people) continue;

            for (let person of entry.people) {
                if (!found.includes(person)) found.push(person);
            }
        }

        return found.sort();
    }

    public getUserLocations(): string[] {
        let found: string[] = [];
        let images: PhotoDatabase = this.getUserImages();

        for (let date in images) {
            let entry: PhotoEntry = images[date];
            if (!found.includes(entry.name)) found.push(entry.name);
        }

        return found.sort();
    }

    public getPhotoInfoFromDate(date: string): PhotoEntry | null {
        return Data[this.user].images[date];
    }

    public getVideoInfoFromDate(date: string): VideoEntry | null {
        let video_array: VideoDatabase | undefined = Data[this.user].videos;
        if (!video_array) return null;
        return video_array[date] || null;
    }

    public getMonthName(month: string | number): string {
        month = Number(month);
        let date = new Date();
        date.setMonth(month - 1); // 0 indexed

        return date.toLocaleString('default', { month: 'long' });
    }
}

class PageHeader {
    element: HTMLElement;
    manager: PageManager;
    emblem: HeaderEmblem;
    user_selector: UserSelector;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('header');
        this.emblem = new HeaderEmblem(this);
        this.user_selector = new UserSelector(this);
        document.body.appendChild(this.element);
    }
}

class HeaderEmblem {
    element: HTMLElement;
    logo_button: HTMLElement;

    constructor(header: PageHeader) {
        this.element = document.createElement('div');
        this.element.classList.add('emblem_holder');
        this.element.setAttribute('title', 'Snapshot');

        this.logo_button = document.createElement('button');
        this.logo_button.classList.add('emblem_logo');
        this.logo_button.onclick = () => header.manager.shiftLayout();

        this.element.appendChild(this.logo_button);
        header.element.appendChild(this.element);
    }
}

class UserSelector {
    element: HTMLElement;
    header: PageHeader;

    constructor(header: PageHeader) {
        this.header = header;
        this.element = document.createElement('div');
        this.element.classList.add('user_selector_holder');
        this.element.onclick = (e: PointerEvent) => this.click(e);

        for (var user in Data) {
            let userInfo: UserEntry = Data[user];
            let userButton: HTMLElement = document.createElement('button');
            userButton.classList.add('user_button');
            userButton.setAttribute('name', user);
            userButton.style.setProperty('--icon-url', `url("/icon/user/${userInfo.card.icon}")`);

            if (user == this.header.manager.user) {
                userButton.style.order = '-1';
            }
            this.element.appendChild(userButton);
        }

        header.element.appendChild(this.element);
    }

    private click(e: PointerEvent): void {
        let targetElement: HTMLElement = e.target as HTMLElement;
        let targetUser: string | null = targetElement.getAttribute('name');
        if (!targetUser) throw new Error('No target user found!');

        if (targetElement == this.element || targetUser == this.header.manager.user) {
            this.element.classList.toggle('display');
            return;
        }

        let all_buttons: NodeListOf<HTMLElement> = this.element.querySelectorAll('button');
        for (let button of all_buttons) {
            let user: string | null = button.getAttribute('name');
            if (!user) continue;
            if (user == targetUser) button.style.order = '-1'
            else button.style.order = 'unset';
        }

        this.element.classList.remove('display');
        this.header.manager.loadUser(targetUser);
    }
}

class PageSidebar {
    element: HTMLElement;
    button_holder: SidebarButtonHolder;
    stats: SidebarStats;
    manager: PageManager;

    constructor(manager: PageManager) {
        this.element = document.createElement('nav');
        this.element.classList.add('sidebar');
        this.element.classList.toggle('shift', window.innerWidth < 767);
        this.manager = manager;
        this.button_holder = new SidebarButtonHolder(this);
        this.stats = new SidebarStats(this);

        document.body.appendChild(this.element);
    }

    public reload(): void {
        this.button_holder.reload();
    }

    public shiftLayout(): void {
        this.element.classList.toggle('shift');
    }

    public fetchYearLabel(year: number): HTMLElement | null {
        let yearLabel: HTMLElement | null = this.element.querySelector(`[year="20${year}"]`);
        return yearLabel;
    }

    public fetchMonthButton(year: number, month: number): HTMLElement | null {
        let yearLabel: HTMLElement | null = this.fetchYearLabel(year);
        if (!yearLabel) return null;
        let monthButton = yearLabel.querySelector(`[year="${month}"]`) as HTMLElement;
        return monthButton;
    }
}

class SidebarButtonHolder {
    element: HTMLElement;
    sidebar: PageSidebar;
    profile_button: SidebarProfileButton;
    year_sections: SidebarYearSection[];

    constructor(sidebar: PageSidebar) {
        this.element = document.createElement('div');
        this.element.classList.add('button_holder');
        this.sidebar = sidebar;
        this.profile_button = new SidebarProfileButton(this);
        this.year_sections = [];
        this.propogateSidebarButtons();
    }

    private propogateSidebarButtons(): void {
        let imageCount: DateCounter = this.sidebar.manager.countImages();
        let yearKeys = Object.keys(imageCount).reverse();

        for (let year of yearKeys) {
            let yearNum: number = Number(year);
            let yearSection: SidebarYearSection = new SidebarYearSection(this, yearNum);
            this.year_sections.push(yearSection);
            this.sidebar.element.appendChild(this.element);
        }
    }

    private clearPrevious(): void {
        this.profile_button.remove();
        for (let section of this.year_sections) {
            section.remove();
        }
        this.year_sections = [];
    }

    public reload(): void {
        this.clearPrevious();
        this.profile_button = new SidebarProfileButton(this);
        this.propogateSidebarButtons();
    }
}

class SidebarYearSection {
    element: HTMLElement;
    year_label: HTMLElement;
    year_hr: HTMLElement;
    year_text: HTMLElement;

    year: number;
    sidebar_buttons: SidebarButton[];
    section_holder: SidebarButtonHolder;

    constructor(section_holder: SidebarButtonHolder, year: number) {
        this.element = document.createElement('div');
        this.element.classList.add('year_holder');
        this.element.setAttribute('year', year.toString());

        this.year_label = document.createElement('div');
        this.year_label.classList.add('year_label');

        this.year_hr = document.createElement('hr');
        this.year_text = document.createElement('span');
        this.year_text.textContent = '20' + year;

        this.year = year;
        this.sidebar_buttons = [];
        this.section_holder = section_holder;

        this.year_label.appendChild(this.year_hr);
        this.year_label.appendChild(this.year_text);
        this.element.appendChild(this.year_label);
        section_holder.element.appendChild(this.element);

        this.createButtons();
    }

    private createButtons(): void {
        let imageCount: DateCounter = this.section_holder.sidebar.manager.countImages();
        let yearList = imageCount[this.year.toString()];

        for (var month in yearList) {
            let sidebarButton: SidebarMonthButton = new SidebarMonthButton(this, Number(month));
            sidebarButton.setMonthCount(yearList[month]);
            this.sidebar_buttons.push(sidebarButton);
        }
    }

    public remove(): void {
        for (let button of this.sidebar_buttons) {
            button.remove();
        }
        this.element.remove();
    }

    public getYear(): number {
        return this.year;
    }
}

abstract class SidebarButton {
    element: HTMLElement;
    sidebar: PageSidebar;

    constructor(sidebar: PageSidebar) {
        this.element = document.createElement('button');
        this.element.classList.add('sidebar_button');
        this.element.onclick = () => this.clicked();
        this.sidebar = sidebar;
    }

    protected abstract clicked(): void;

    public remove(): void {
        this.element.onclick = null;
        this.element.remove();
    }
}

class SidebarProfileButton extends SidebarButton {
    button_holder: SidebarButtonHolder;

    constructor(button_holder: SidebarButtonHolder) {
        super(button_holder.sidebar);
        this.button_holder = button_holder;

        this.element.textContent = 'Profile';
        this.button_holder.element.appendChild(this.element);
    }

    protected clicked() {
        let profile_card: HTMLElement | null = this.sidebar.manager.content.element.querySelector('.profile_card');
        if (!profile_card) throw new Error('No profile card found!');
        profile_card.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

class SidebarMonthButton extends SidebarButton {
    year: number;
    month: number;

    constructor(year_holder: SidebarYearSection, month: number) {
        super(year_holder.section_holder.sidebar);
        this.year = year_holder.getYear();
        this.month = month;

        this.element.classList.add('month');
        this.element.textContent = this.sidebar.manager.getMonthName(month);
        this.element.setAttribute('year', this.year.toString());
        this.element.setAttribute('month', this.month.toString());
        this.element.style.order = (-this.month).toString();

        year_holder.element.appendChild(this.element);
    }

    protected clicked() {
        let found_figure: PhotoSquare | null = this.sidebar.manager.content.photo_holder.getFigureByMonth(this.year, this.month);

        if (window.innerWidth < 767) {
            this.element.focus();
            this.sidebar.manager.shiftLayout();
        }

        found_figure?.findInFrame();
    }

    public setMonthCount(count: number): void {
        this.element.textContent = `${this.sidebar.manager.getMonthName(this.month)} (${count})`
    }
}

class SidebarStats {
    element: HTMLElement;
    commits: HTMLElement;
    size: HTMLElement;
    sidebar: PageSidebar;

    constructor(sidebar: PageSidebar) {
        this.element = document.createElement('div');
        this.commits = document.createElement('span');
        this.size = document.createElement('span');
        this.sidebar = sidebar;

        this.element.classList.add('statistics');
        this.commits.classList.add('commits');
        this.size.classList.add('size');

        this.element.appendChild(this.commits);
        this.element.appendChild(this.size);
        this.sidebar.element.appendChild(this.element);
        this.updateStats();
    }

    public async updateStats(): Promise<void> {
        this.sidebar.manager.stats_manager.fetchLastCommit()
            .then((data: CommitData) => {
                this.commits.textContent = `${data.count} commits`;
            })

        this.sidebar.manager.stats_manager.fetchRepoSize()
            .then((e: string) => {
                this.size.textContent = e;
            })
    }
}

class PageContent {
    element: HTMLElement;
    manager: PageManager;
    video_holder: ContentVideoHolder;
    photo_holder: ContentPhotoHolder;
    profile_card: ContentProfileCard;

    constructor(manager: PageManager) {
        this.element = document.createElement('div');
        this.element.classList.add('content');
        this.element.classList.toggle('shift', window.innerWidth < 767);
        this.manager = manager;

        this.video_holder = new ContentVideoHolder(this);
        this.photo_holder = new ContentPhotoHolder(this);
        this.profile_card = new ContentProfileCard(this);
        this.contentScrolled();

        this.element.onscroll = () => this.contentScrolled();
        document.body.appendChild(this.element);
    }

    public reload(): void {
        this.profile_card.reload();
        this.video_holder.reload();
        this.photo_holder.reload();
    }

    public shiftLayout(): void {
        this.element.classList.toggle('shift');
    }

    private contentScrolled(): void {
        let imageList: NodeListOf<HTMLElement> = this.photo_holder.element.querySelectorAll('figure');
        let lastImage: HTMLElement = imageList[imageList.length - 1];
        if (!lastImage) throw new Error('No images found!');
        let lastImageBottom: number = lastImage.getBoundingClientRect().bottom;
        let contentBottom: number = this.element.getBoundingClientRect().bottom;

        if (Math.abs(lastImageBottom - contentBottom) <= 150) {
            this.photo_holder.loadImageBatch();
        }
    }
}

class ContentProfileCard {
    element: HTMLElement;
    inner_element: HTMLElement;
    content: PageContent;
    card_name: ProfileCardName;
    card_social_row: ProfileCardSocialRow;
    user_site: ProfileCardSite;

    constructor(content: PageContent) {
        let profile_Data = Data[content.manager.user];
        if (!profile_Data) throw new Error('No profile found!');

        this.element = document.createElement('div');
        this.element.classList.add('profile_card');

        this.inner_element = document.createElement('div');
        this.inner_element.classList.add('inner_card');

        this.content = content;
        this.card_name = new ProfileCardName(this);
        this.card_social_row = new ProfileCardSocialRow(this);
        this.user_site = new ProfileCardSite(this);

        this.element.appendChild(this.inner_element);
        content.element.appendChild(this.element);
    }

    public reload(): void {
        this.card_name.reload();
        this.card_social_row.reload();
        this.user_site.reload();
    }
}

class ProfileCardName {
    element: HTMLElement;
    icon: HTMLElement;
    text_holder: HTMLElement;
    text_name: HTMLElement;
    text_blurb: HTMLElement;

    card: ContentProfileCard;

    constructor(card: ContentProfileCard) {
        this.element = document.createElement('div');
        this.element.classList.add('card_name');
        this.card = card;

        this.icon = document.createElement('div');
        this.text_holder = document.createElement('div')
        this.text_name = document.createElement('span');
        this.text_blurb = document.createElement('span');

        this.icon.classList.add('icon');
        this.text_holder.classList.add('text_holder');
        this.text_name.classList.add('username');
        this.text_blurb.classList.add('bio');

        this.propogateName();
        this.element.appendChild(this.icon);
        this.element.appendChild(this.text_holder);
        this.text_holder.appendChild(this.text_name);
        this.text_holder.appendChild(this.text_blurb);
        this.card.inner_element.appendChild(this.element);
    }

    private propogateName(): void {
        let user_info: UserEntry = Data[this.card.content.manager.user];
        this.icon.style.backgroundImage = `url(icon/user/${user_info.card.icon})`;
        this.text_name.textContent = this.card.content.manager.user;
        this.text_blurb.textContent = user_info.card.bio;
    }

    public reload(): void {
        this.propogateName();
    }
}

class ProfileCardSocialRow {
    element: HTMLElement;
    social_icons: SocialMediaIcon[];

    card: ContentProfileCard;

    constructor(card: ContentProfileCard) {
        this.element = document.createElement('div');
        this.element.classList.add('social_row');
        this.social_icons = [];
        this.card = card;

        this.propogateSocials();
        card.inner_element.appendChild(this.element);
    }

    private propogateSocials() {
        let user_Data = Data[this.card.content.manager.user];

        for (var service in user_Data.social) {
            let link: string = user_Data.social[service];
            let media_icon: SocialMediaIcon = new SocialMediaIcon(this, service, link);
            this.social_icons.push(media_icon);
        }
    }

    private clearMemory() {
        for (let button of this.social_icons) {
            button.element.remove();
        }
        this.social_icons = [];
    }

    public reload(): void {
        this.clearMemory();
        this.propogateSocials();
    }
}

class SocialMediaIcon {
    element: HTMLElement;

    constructor(row: ProfileCardSocialRow, service: string, link: string) {
        let icon_info = Social_Icons[service];

        this.element = document.createElement('a');
        this.element.classList.add('social_icon', service);
        this.element.setAttribute('href', link);

        let icon_size: string = icon_info.image.size || '100%';
        this.element.style.setProperty('--gradient', `linear-gradient(${icon_info.gradient.direction}, ${icon_info.gradient.colors.join(', ')})`);
        this.element.style.setProperty('--icon-url', `url(${icon_info.image.icon})`);
        this.element.style.setProperty('--icon-size', icon_size);

        row.element.appendChild(this.element);
    }
}

class ProfileCardSite {
    element: HTMLElement;
    icon: HTMLElement;
    text_holder: HTMLElement;
    name: HTMLElement;
    blurb: HTMLElement;
    card: ContentProfileCard;

    constructor(card: ContentProfileCard) {
        this.element = document.createElement('a');
        this.icon = document.createElement('div');
        this.text_holder = document.createElement('div');
        this.name = document.createElement('span');
        this.blurb = document.createElement('span');
        this.card = card;

        this.element.classList.add('user_site');
        this.icon.classList.add('icon');
        this.text_holder.classList.add('text_holder');
        this.name.classList.add('site_name');
        this.blurb.classList.add('site_blurb');
        this.populateSite();

        this.text_holder.appendChild(this.name);
        this.text_holder.appendChild(this.blurb);
        this.element.appendChild(this.icon);
        this.element.appendChild(this.text_holder);
        this.card.inner_element.appendChild(this.element);
    }

    private populateSite(): void {
        let website_info: ProfileWebsiteEntry | null = this.card.content.manager.getUserSiteInfo();
        if (!website_info) {
            this.hideSite();
            return;
        }

        this.element.classList.remove('hide');
        this.element.setAttribute('href', website_info.url);
        this.element.setAttribute('title', website_info.name);
        this.element.style.setProperty('--gradient', `linear-gradient(to bottom right, ${website_info.gradient.join(', ')})`);
        this.icon.style.setProperty('--icon-url', `url(${website_info.icon})`);
        this.name.textContent = website_info.name;
        this.blurb.textContent = website_info.blurb;
    }

    private hideSite(): void {
        this.resetSite();
        this.element.classList.add('hide');
    }

    private resetSite(): void {
        this.element.style.removeProperty('--gradient');
        this.icon.style.removeProperty('--icon-url');
        this.name.textContent = '';
        this.blurb.textContent = '';
    }

    public reload(): void {
        let website_info: ProfileWebsiteEntry | null = this.card.content.manager.getUserSiteInfo();
        if (!website_info) this.hideSite();
        else this.populateSite();
    }
}

abstract class ContentFrame {
    element: HTMLElement;
    title: HTMLElement;
    content: PageContent;
    figures: MediaFigure[];

    constructor(content: PageContent, name: string) {
        this.element = document.createElement('div');
        this.element.classList.add('content_frame')
        this.title = document.createElement('span');
        this.title.classList.add('title');
        this.title.textContent = name;

        this.content = content;
        this.figures = [];

        this.element.appendChild(this.title);
        content.element.appendChild(this.element);
    }

    protected clearMemory(): void {
        for (let figure of this.figures) {
            figure.image.onload = null;
            figure.element.remove();
        }
        this.figures = [];
    }

    abstract reload(): void;
}

class ContentVideoHolder extends ContentFrame {
    scroll_frame: HTMLElement;

    constructor(content: PageContent) {
        super(content, 'Videos');
        this.element.classList.add('content_video_holder', 'hide');
        this.scroll_frame = document.createElement('div');
        this.scroll_frame.classList.add('video_scroll');
        this.element.appendChild(this.scroll_frame);
    }

    public reload(): void {
        this.clearMemory();
        this.loadVideos();
    }

    private loadVideos() {
        let videos: VideoDatabase | null = this.content.manager.getUserVideos();
        this.element.classList.toggle('hide', !videos);
        if (!videos) return;

        for (var date in this.content.manager.getUserVideos()) {
            let video_figure: MediaFigure = new VideoRectangle(this.content, date);
            video_figure.setParent(this.scroll_frame);
            this.figures.push(video_figure);
        }
    }
}

class ContentPhotoHolder extends ContentFrame {
    user_images: PhotoDatabase;
    filter: ContentPhotoFilter;

    loaded_images: number;
    complete: boolean;

    constructor(content: PageContent) {
        super(content, 'Photos');
        this.element.classList.add('content_photo_holder');
        this.user_images = structuredClone(this.content.manager.getUserImages());
        this.filter = new ContentPhotoFilter(this);

        this.loaded_images = 0;
        this.complete = false;

        this.loadFeaturedImages();
        this.loadImageBatch();
    }

    private loadFeaturedImages() {
        for (var date in this.user_images) {
            let entry: PhotoEntry = this.user_images[date];
            if (!entry.featured) continue;

            let photo_figure: MediaFigure = new PhotoSquare(this.content, date);
            photo_figure.setParent(this.element);
            photo_figure.setFeatured(entry.featured);
            this.figures.push(photo_figure);

            delete this.user_images[date];
        }
    }

    public loadImageBatch(): void {
        if (this.complete) return;
        let imageKeys = Object.keys(this.user_images);

        for (var i = this.loaded_images; i < this.loaded_images + 9; i++) {
            let date: string = imageKeys[i];
            if (!date) break;
            let photo_figure: MediaFigure = new PhotoSquare(this.content, date);
            photo_figure.setParent(this.element);
            this.figures.push(photo_figure);
        }

        this.loaded_images += 9;
        if (this.loaded_images >= Object.keys(this.user_images).length) {
            this.complete = true;
            this.loaded_images = Object.keys(this.user_images).length;
        }
    }

    public getFigureByMonth(year: number, month: number): PhotoSquare | null {
        for (let figure of this.figures) {
            let date_split = figure.date.split('/');
            let found_month = Number(date_split[0]);
            let found_year = Number(date_split[2]);

            if (found_year == year && found_month == month) {
                return figure as PhotoSquare;
            }
        }

        if (!this.complete) {
            this.loadImageBatch();
            return this.getFigureByMonth(year, month);
        } else {
            return null;
        }
    }

    public reload(): void {
        this.loaded_images = 0;
        this.complete = false;
        this.user_images = structuredClone(this.filter.applyFilter(this.content.manager.getUserImages()));

        this.clearMemory();
        this.loadFeaturedImages();
        this.loadImageBatch();
    }
}

interface FilterDictionary {
    [name: string]: FilterOption;
}

class ContentPhotoFilter {
    element: HTMLElement;
    photo_holder: ContentPhotoHolder;
    filters: FilterDictionary;

    active_dropdown: FilterOptionDropdown | null;

    constructor(photo_holder: ContentPhotoHolder) {
        this.element = document.createElement('div');
        this.element.classList.add('photo_filter');
        this.photo_holder = photo_holder;

        this.filters = {};
        this.filters.enable = new FilterOptionEnable(this);
        this.filters.location = new FilterOptionLocation(this);
        this.filters.person = new FilterOptionPerson(this);
        this.filters.month = new FilterOptionMonth(this);
        this.filters.year = new FilterOptionYear(this);

        this.active_dropdown = null;
        photo_holder.element.appendChild(this.element);
    }

    public handleActiveDropdown(dropdown: FilterOptionDropdown): void {
        if (dropdown == this.active_dropdown) {
            dropdown.toggle(false);
            this.active_dropdown = null;
        } else {
            if (this.active_dropdown) {
                this.active_dropdown.toggle(false);
                this.active_dropdown = null;
            }
            dropdown.toggle(true);
            this.active_dropdown = dropdown;
        }
    }

    public applyFilter(list: PhotoDatabase): PhotoDatabase {
        let match: PhotoDatabase = list;

        for (let filter in this.filters) {
            let entry: FilterOption = this.filters[filter];
            if (!entry.active) continue;
            match = entry.filterList(match);
        }

        return match;
    }

    public disableAllFilters(): void {
        for (let name in this.filters) {
            if (name == 'enable') continue;
            let filter = this.filters[name] as FilterOptionDropdown;
            filter.unSelectOption();
        }
    }
}

abstract class FilterOption {
    element: HTMLElement;
    filter_holder: ContentPhotoFilter;

    display: FilterButtonDisplay;
    active: boolean;

    constructor(filter_holder: ContentPhotoFilter) {
        this.element = document.createElement('div');
        this.element.classList.add('filter_option');
        this.filter_holder = filter_holder;
        this.active = false;

        this.display = new FilterButtonDisplay(this);
        filter_holder.element.appendChild(this.element);
    }

    protected setDisplayEntry(text: string): void {
        this.display.setText(text);
    }

    public abstract filterList(photos: PhotoDatabase): PhotoDatabase;
}

abstract class FilterOptionDropdown extends FilterOption {
    selected: FilterButton | null;

    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.selected = null;
        this.element.classList.add('dropdown');
        this.element.onclick = (e: PointerEvent) => this.toggleDropdown(e);
    }

    protected toggleDropdown(e: PointerEvent): void {
        let event_target: HTMLElement = e.target as HTMLElement;
        if (event_target.classList.contains('icon')) return;
        this.filter_holder.handleActiveDropdown(this);
    }

    public toggle(force: boolean): void {
        this.element.classList.toggle('open', force);
    }

    protected propogateDropdown(list: string[]) {
        for (let index in list) {
            let name = list[index];
            let button = new FilterButton(this);
            button.setText(name);
            button.setIndex(Number(index) + 1);
        }
    }

    public selectOption(button: FilterButton, e: PointerEvent) {
        if (button instanceof FilterButtonDisplay) return;
        this.element.classList.add('active');
        this.active = true;
        this.selected = button;
        this.setDisplayEntry(this.selected.getText());
        
        this.filter_holder.photo_holder.reload();
    }

    public unSelectOption() {
        this.element.classList.remove('active');
        this.setDisplayEntry(this.getLabel() || 'Error');
        this.active = false;
        this.selected = null;

        this.filter_holder.photo_holder.reload();
    }

    protected getLabel(): string | null {
        return this.element.getAttribute('label');
    }
}

class FilterButton {
    element: HTMLElement;
    text_label: HTMLElement;
    option: FilterOptionDropdown;

    constructor(dropdown: FilterOptionDropdown) {
        this.element = document.createElement('button');
        this.element.classList.add('dropdown_button');
        this.element.onclick = (e: PointerEvent) => this.click(e);

        this.text_label = document.createElement('span');
        this.text_label.classList.add('text_label');
        this.element.appendChild(this.text_label);

        this.option = dropdown;
        this.option.element.appendChild(this.element);
    }

    public click(e: PointerEvent): void {
        this.option.selectOption(this, e);
    }

    public setIndex(index: number): void {
        this.element.setAttribute('index', index.toString());
    }

    public setText(text: string | null): void {
        this.text_label.textContent = text || '';
    }

    public getText(): string {
        return this.text_label.textContent;
    }
}

class FilterButtonDisplay extends FilterButton {
    icon_button: HTMLElement;
    
    constructor(dropdown: FilterOption) {
        super(dropdown as FilterOptionDropdown); // fix l8r
        this.element.classList.add('display');

        this.icon_button = document.createElement('div');
        this.icon_button.classList.add('icon');
        this.element.appendChild(this.icon_button);
    }

    public click(e: PointerEvent): void {
        let target_element = e.target as HTMLElement;

        if (this.option.selected && target_element == this.icon_button) {
            this.option.unSelectOption();
        }
    }
}

abstract class FilterOptionTime extends FilterOptionDropdown {
    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.element.classList.add('time');
    }
}

class FilterOptionEnable extends FilterOption {
    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.element.onclick = () => this.filter_holder.disableAllFilters();
        this.element.classList.add('filter');
    }

    public filterList(photos: PhotoDatabase) {
        return photos;
    }
}

class FilterOptionLocation extends FilterOptionDropdown {
    locations: string[];

    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.element.classList.add('location');
        this.element.setAttribute('label', 'Location');
        this.locations = this.filter_holder.photo_holder.content.manager.getUserLocations();

        this.setDisplayEntry('Location');
        this.propogateDropdown(this.locations);
    }

    public filterList(photos: PhotoDatabase): PhotoDatabase {
        let match: PhotoDatabase = {};
        if (!this.selected) return photos;

        for (let date in photos) {
            let entry: PhotoEntry = photos[date];
            if (entry.name != this.selected.getText()) continue;
            match[date] = entry;
        }

        return match;
    }
}

class FilterOptionPerson extends FilterOptionDropdown {
    people: string[];

    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.element.classList.add('user');
        this.element.setAttribute('label', 'Person');
        this.people = this.filter_holder.photo_holder.content.manager.getUserFeaturedPeople();

        this.setDisplayEntry('Person');
        this.propogateDropdown(this.people);
    }

    public filterList(photos: PhotoDatabase): PhotoDatabase {
        let match: PhotoDatabase = {};
        if (!this.selected) return photos;

        for (let date in photos) {
            let entry: PhotoEntry = photos[date];
            if (!entry.people) continue;
            if (entry.people.includes(this.selected.getText())) {
                match[date] = entry;
            }
        }

        return match;
    }
}

class FilterOptionMonth extends FilterOptionTime {
    months: string[];

    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.element.classList.add('month');
        this.element.setAttribute('label', 'Month');
        this.months = this.createMonthList();

        this.setDisplayEntry('Month');
        this.propogateDropdown(this.months);
    }

    private createMonthList(): string[] {
        let months = [];
        for (var i = 0; i < 12; i++) {
            let date = new Date(0, i, 1);
            months.push(date.toLocaleDateString(undefined, { month: 'long' }));
        }
        return months;
    }

    public filterList(photos: PhotoDatabase): PhotoDatabase {
        let match: PhotoDatabase = {};

        for (let date in photos) {
            let entry: PhotoEntry = photos[date];
            let split: string[] = date.split('/');
            let check_index: string | null | undefined = this.selected?.element.getAttribute('index');
            if (!check_index) continue;

            if (split[0] == check_index.padStart(2, '0')) match[date] = entry;
        }

        return match;
    }
}

class FilterOptionYear extends FilterOptionTime {
    years: string[];

    constructor(filter_holder: ContentPhotoFilter) {
        super(filter_holder);
        this.element.classList.add('year');
        this.element.setAttribute('label', 'Year');
        this.years = this.createYearList();

        this.setDisplayEntry('Year');
        this.propogateDropdown(this.years)
    }

    private createYearList(): string[] {
        let years: string[] = [];
        let count: DateCounter = this.filter_holder.photo_holder.content.manager.countImages();
        for (let year in count) {
            years.push('20' + year);
        }

        return years;
    }

    public filterList(photos: PhotoDatabase): PhotoDatabase {
        let match: PhotoDatabase = {};

        for (let date in photos) {
            let entry: PhotoEntry = photos[date];
            let split: string[] = date.split('/');
            if (this.selected?.getText() == '20' + split[2]) match[date] = entry;
        }

        return match;
    }
}

abstract class MediaFigure {
    element: HTMLElement;
    image: HTMLElement;
    content: PageContent;
    date: string;

    lower_caption: HTMLElement;
    date_caption: HTMLElement;

    constructor(content: PageContent, date: string) {
        this.element = document.createElement('figure');
        this.element.classList.add('media_figure');
        this.content = content;
        this.date = date;

        let date_split: string[] = date.split('/');
        this.element.setAttribute('year', date_split[2]);
        this.element.setAttribute('month', date_split[0]);
        this.element.setAttribute('day', date_split[1]);

        this.image = document.createElement('img');
        this.image.classList.add('loading');
        this.image.onload = () => this.imageLoaded();

        this.date_caption = document.createElement('div');
        this.date_caption.classList.add('date_caption');
        this.date_caption.textContent = date;

        this.lower_caption = document.createElement('figcaption');

        this.element.appendChild(this.image);
        this.element.appendChild(this.date_caption);
        this.element.appendChild(this.lower_caption);
    }

    protected imageLoaded(): void {
        this.image.onload = null;
        this.element.classList.remove('loading');
    }

    public setParent(parent: HTMLElement): void {
        parent.appendChild(this.element);
    }

    public setFeatured(order: number): void {
        this.element.classList.add('featured');
        this.element.style.order = (-order).toString();
    }

    public remove(): void {
        this.element.onload = null;
        this.element.remove();
    }
}

class PhotoSquare extends MediaFigure {
    photo_Data: PhotoEntry;

    constructor(content: PageContent, date: string) {
        super(content, date);
        this.element.classList.add('photo_square');

        let photo_Data: PhotoEntry | null = content.manager.getPhotoInfoFromDate(date);
        if (!photo_Data) throw new Error('No photo found at date!');
        this.photo_Data = photo_Data;

        this.lower_caption.textContent = this.photo_Data.name;
        this.image.setAttribute('src', `media/${content.manager.user}/IMG_${photo_Data.id[0].toString()}.jpg`);
        this.image.setAttribute('alt', `${this.date}: ${this.photo_Data.name}`);
        this.element.setAttribute('title', `${this.date}: ${this.photo_Data.name}`);
        this.element.onclick = () => this.photoSelected();
    }

    public findInFrame(): void {
        this.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.element.classList.add('highlight');

        setTimeout(() => {
            this.element.classList.remove('highlight');
        }, 1000);
    }

    private photoSelected(): void {
        this.content.manager.main_photo_holder.showImage(this.date);
    }
}

class VideoRectangle extends MediaFigure {
    video_Data: VideoEntry;

    constructor(content: PageContent, date: string) {
        super(content, date);
        this.element.classList.add('video_rectangle');

        let video_Data: VideoEntry | null = this.content.manager.getVideoInfoFromDate(date);
        if (!video_Data) throw new Error('No video found at date!');
        this.video_Data = video_Data;

        this.element.onclick = () => this.videoSelected();
        this.image.setAttribute('src', `/icon/thumbnail/${this.video_Data.thumbnail}`);
        this.date_caption.textContent = date;
        this.lower_caption.textContent = this.video_Data.name;
    }

    private videoSelected(): void {
        window.open(this.video_Data.link, '_blank');
    }
}

class MainPhotoHolder {
    element: HTMLElement;
    photo_figure: MainPhotoFigure;
    photo_aside: MainPhotoAside;
    manager: PageManager;

    constructor(manager: PageManager) {
        this.element = document.createElement('article');
        this.element.classList.add('photo_holder', 'hide');
        this.photo_figure = new MainPhotoFigure(this);
        this.photo_aside = new MainPhotoAside(this);
        this.manager = manager;
        document.body.appendChild(this.element);

    }

    public showImage(date: string): void {
        this.refresh();
        this.element.classList.remove('hide');
        this.photo_figure.showImage(date);
        this.photo_aside.showInfo(date);
    }

    private refresh(): void {
        this.photo_figure.refresh();
        this.photo_aside.refresh();
    }

    public closeMenu(): void {
        this.refresh();
        this.element.classList.add('hide');
    }

}

class MainPhotoFigure {
    photo_holder: MainPhotoHolder;

    element: HTMLElement;
    photo_info: HTMLElement;
    photo_date: HTMLElement;
    photo_people: HTMLElement;
    photo_button_left: HTMLElement;
    photo_button_right: HTMLElement;
    photo_close: HTMLElement;

    photo_index: number;
    images: HTMLElement[];

    constructor(photo_holder: MainPhotoHolder) {
        this.photo_holder = photo_holder;
        this.element = document.createElement('figure');
        this.photo_info = document.createElement('div');
        this.photo_date = document.createElement('span');
        this.photo_people = document.createElement('span');

        this.photo_button_left = document.createElement('button');
        this.photo_button_right = document.createElement('button');

        this.element.classList.add('large_figure');
        this.photo_info.classList.add('photo_info');
        this.photo_date.classList.add('photo_date');
        this.photo_people.classList.add('photo_people');

        this.photo_button_left.classList.add('shift', 'left');
        this.photo_button_right.classList.add('shift', 'right');
        this.photo_button_left.onclick = () => this.shiftImage(-1);
        this.photo_button_right.onclick = () => this.shiftImage(1);

        this.photo_close = document.createElement('button');
        this.photo_close.classList.add('photo_close');
        this.photo_close.onclick = () => this.photo_holder.closeMenu();

        this.photo_index = 0;
        this.images = [];

        this.photo_info.appendChild(this.photo_date);
        this.photo_info.appendChild(this.photo_people);
        this.element.appendChild(this.photo_info);
        this.element.appendChild(this.photo_close);
        this.element.appendChild(this.photo_button_left);
        this.element.appendChild(this.photo_button_right);
        photo_holder.element.appendChild(this.element);
    }

    public refresh(): void {
        this.element.classList = 'large_figure hide_left_button';

        this.photo_index = 0;
        this.photo_date.textContent = '';

        this.photo_people.textContent = '';
        this.photo_people.classList.add('hide');

        for (let image of this.images) {
            image.onload = null;
            image.remove();
        }
        this.images = [];
    }

    public showImage(date: string): void {
        this.refresh();
        this.element.classList.remove('hide');

        let date_info: PhotoEntry = Data[this.photo_holder.manager.user].images[date];
        this.photo_date.textContent = date;
        this.photo_people.textContent = date_info.people?.join(', ') || '';
        this.photo_people.classList.toggle('hide', !(date_info.people instanceof Array))

        for (var i = 0; i < date_info.id.length; i++) {
            let id = date_info.id[i];
            let image: HTMLElement = document.createElement('img');
            image.classList.add('loading');
            image.onload = (e: Event) => this.imageLoaded(e);
            image.setAttribute('src', `media/${this.photo_holder.manager.user}/IMG_${id}.jpg`);
            image.style.left = `${i * 100}%`;
            this.images.push(image);
            this.element.appendChild(image);
        }
    }

    public shiftImage(offset: number): void {
        let all_images: NodeListOf<HTMLElement> = this.element.querySelectorAll('img');
        let new_offset: number = this.photo_index + offset;
        if (new_offset < 0 || new_offset >= all_images.length) return;
        this.element.classList.toggle('hide_left_button', new_offset == 0);
        this.element.classList.toggle('hide_right_button', new_offset == all_images.length - 1);

        for (var i = 0; i < all_images.length; i++) {
            let this_image: HTMLElement = all_images[i];
            let difference = i - new_offset;
            this_image.style.left = `${difference * 100}%`;
        }
        this.photo_index = new_offset;
    }

    private imageLoaded(e: Event): void {
        let image: HTMLElement = e.target as HTMLElement;
        image.onload = null;
        image.classList.remove('loading');
    }
}

class MainPhotoAside {
    photo_holder: MainPhotoHolder;

    element: HTMLElement;
    inner_element: HTMLElement;
    header: HTMLElement;
    location: HTMLElement;
    aside_close: HTMLElement;
    related_frames: RelatedPhotosPane[];

    constructor(photo_holder: MainPhotoHolder) {
        this.photo_holder = photo_holder;
        this.related_frames = [];

        this.element = document.createElement('aside');
        this.inner_element = document.createElement('div');
        this.inner_element.classList.add('inner_aside')

        this.header = document.createElement('div');
        this.header.classList.add('photo_header');

        this.location = document.createElement('div');
        this.location.classList.add('photo_location');

        this.aside_close = document.createElement('button');
        this.aside_close.classList.add('aside_close');
        this.aside_close.onclick = () => this.photo_holder.closeMenu();

        this.header.appendChild(this.location);
        this.header.appendChild(this.aside_close);
        this.element.appendChild(this.inner_element);
        this.element.appendChild(this.header);
        photo_holder.element.appendChild(this.element)
    }

    public showInfo(date: string): void {
        let photo_info: PhotoEntry | null = this.photo_holder.manager.getPhotoInfoFromDate(date);
        if (!photo_info) throw new Error('Photo info not found at date!');

        this.location.textContent = photo_info.name;
        this.createRelatedPanes(date);
    }

    private createRelatedPanes(date: string) {
        let photo_info: PhotoEntry | null = this.photo_holder.manager.getPhotoInfoFromDate(date);
        if (!photo_info) throw new Error('Photo info not found!');
        this.related_frames.push(new RelatedLocationPane(this, date));

        if (photo_info.people) {
            for (let person of photo_info.people) {
                this.related_frames.push(new RelatedPersonPane(this, date, person));
            }
        }

        this.related_frames.push(new RelatedMonthPane(this, date));
    }

    public refresh(): void {
        this.location.textContent = '';
        for (let frame of this.related_frames) {
            frame.remove();
        }
        this.related_frames = [];
    }
}

abstract class RelatedPhotosPane {
    element: HTMLElement;
    text_header: HTMLElement;
    scroll_element: HTMLElement;
    aside: MainPhotoAside;
    manager: PageManager;

    origin_date: string;
    origin_photo_entry: PhotoEntry;
    all_images: PhotoDatabase;
    all_figures: MediaFigure[];

    constructor(aside: MainPhotoAside, origin_date: string) {
        this.element = document.createElement('div');
        this.element.classList.add('related_pane');
        this.text_header = document.createElement('span');
        this.text_header.classList.add('related_header');
        this.scroll_element = document.createElement('div');
        this.scroll_element.classList.add('scroll');

        this.aside = aside;
        this.manager = this.aside.photo_holder.manager;
        this.element.appendChild(this.text_header);
        this.element.appendChild(this.scroll_element);

        this.origin_date = origin_date;
        this.all_figures = [];
        let origin_photo_entry: PhotoEntry | null = this.manager.getPhotoInfoFromDate(origin_date);
        let all_images: PhotoDatabase | null = this.manager.getUserImages();
        if (!origin_photo_entry) throw new Error('Error fetching origin Data!');
        if (!all_images) throw new Error('Error fetching image list!');

        this.origin_photo_entry = origin_photo_entry;
        this.all_images = all_images;
    }

    protected abstract findImages(): PhotoDatabase;

    protected renderMatches() {
        let found_images: PhotoDatabase = this.findImages();
        delete found_images[this.origin_date];

        if (Object.keys(found_images).length > 0) {
            for (var date in found_images) {
                let photo_figure: MediaFigure = new PhotoSquare(this.aside.photo_holder.manager.content, date);
                photo_figure.setParent(this.scroll_element);
                this.all_figures.push(photo_figure);
            }
            this.aside.inner_element.appendChild(this.element);
        }
    }

    public remove() {
        for (var figure of this.all_figures) {
            figure.remove();
        }
        this.all_figures = [];
        this.element.remove();
    }
}

class RelatedLocationPane extends RelatedPhotosPane {
    constructor(aside: MainPhotoAside, origin_date: string) {
        super(aside, origin_date);
        this.text_header.textContent = this.origin_photo_entry.name;
        this.renderMatches();
    }

    protected findImages(): PhotoDatabase {
        let matches: PhotoDatabase = {};

        for (var date in this.all_images) {
            let entry: PhotoEntry = this.all_images[date];
            if (entry.name == this.origin_photo_entry.name) {
                matches[date] = entry;
            }
        }
        return matches;
    }
}

class RelatedPersonPane extends RelatedPhotosPane {
    person: string;

    constructor(aside: MainPhotoAside, origin_date: string, person: string) {
        super(aside, origin_date);
        this.person = person;
        this.text_header.textContent = `With ${this.person}`;
        this.renderMatches();
    }

    protected findImages(): PhotoDatabase {
        let matches: PhotoDatabase = {};
        for (var date in this.all_images) {
            let entry: PhotoEntry = this.all_images[date];
            if (!entry.people) continue;
            if (entry.people.includes(this.person)) {
                matches[date] = entry;
            }
        }
        return matches;
    }
}

class RelatedMonthPane extends RelatedPhotosPane {
    origin_date: string;

    constructor(aside: MainPhotoAside, origin_date: string) {
        super(aside, origin_date);
        this.origin_date = origin_date;
        this.text_header.textContent = 'This Month';
        this.renderMatches();
    }

    protected findImages(): PhotoDatabase {
        let matches: PhotoDatabase = {};
        let origin_split: string[] = this.origin_date.split('/');

        for (var date in this.all_images) {
            let entry: PhotoEntry = this.all_images[date];
            let date_split: string[] = date.split('/');

            if (Number(origin_split[2]) == Number(date_split[2])) {
                if (Number(origin_split[0]) == Number(date_split[0])) {
                    matches[date] = entry;
                }
            }
        }
        return matches;
    }
}

const Manager: PageManager = new PageManager();