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

    constructor() {
        this.user = 'Thaddeus';
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.content = new PageContent(this);
        this.main_photo_holder = new MainPhotoHolder(this);
    }

    loadUser(name: string) {
        this.user = name;
        this.content.reload();
        this.sidebar.reload();
        this.main_photo_holder.reload();
    }

    shiftLayout(): void {
        this.sidebar.shiftLayout();
        this.content.shiftLayout();
    }

    countImages(name: string): DateCounter {
        let profile: UserEntry = data[name];
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

    getUserImages(): PhotoDatabase {
        return data[this.user].images;
    }

    getUserVideos(): VideoDatabase | null {
        return data[this.user].videos || null;
    }

    getUserSocials(): ProfileSocialDatabase {
        return data[this.user].social;
    }

    getPhotoInfoFromDate(date: string): PhotoEntry | null {
        return data[this.user].images[date];
    }

    getVideoInfoFromDate(date: string): VideoEntry | null {
        let video_array: VideoDatabase | undefined = data[this.user].videos;
        if (!video_array) return null;
        return video_array[date] || null;
    }

    getMonthName(month: string | number): string {
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

        for (var user in data) {
            let userInfo: UserEntry = data[user];
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
        for (var i = 0; i < all_buttons.length; i++) {
            let this_button: HTMLElement = all_buttons[i];
            let user: string | null = this_button.getAttribute('name');
            if (!user) continue;
            if (user == targetUser) this_button.style.order = '-1'
                else this_button.style.order = 'unset';
        }

        this.element.classList.remove('display');
        this.header.manager.loadUser(targetUser);
    }
}

class PageSidebar {
    element: HTMLElement;
    manager: PageManager;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('nav');
        this.element.classList.add('sidebar');
        this.element.classList.toggle('shift', window.innerWidth < 767);

        this.propogateSidebar();
        document.body.appendChild(this.element);
    }

    reload(): void {
        this.element.innerHTML = '';
        this.propogateSidebar();
    }

    shiftLayout(): void {
        this.element.classList.toggle('shift');
    }

    fetchYearLabel(year: number): HTMLElement | null {
        let yearLabel: HTMLElement | null = this.element.querySelector(`[year="20${year}"]`);
        return yearLabel;
    }

    fetchMonthButton(year: number, month: number): HTMLElement | null {
        let yearLabel: HTMLElement | null = this.fetchYearLabel(year);
        if (!yearLabel) return null;
        let monthButton = yearLabel.querySelector(`[year="${month}"]`) as HTMLElement;
        return monthButton;
    }

    private propogateSidebar() {
        new SidebarProfileButton(this);
        let imageCount: DateCounter = this.manager.countImages(this.manager.user);
        let yearKeys = Object.keys(imageCount).reverse();

        for (let i = 0; i < yearKeys.length; i++) {
            let year: string = yearKeys[i];
            let yearNum: number = Number(year);

            for (let month in imageCount[year]) {
                let monthNum = Number(month);
                let monthCountNum = Number(imageCount[year][month]);
                let monthButton = new SidebarMonthButton(this, yearNum, monthNum);
                monthButton.setMonthCount(monthCountNum);
            }
        }
    }
}

class SidebarYearSection {
    element: HTMLElement;

    constructor(sidebar: PageSidebar, year: number) {
        this.element = document.createElement('div');
        this.element.classList.add('year_holder');
        this.element.setAttribute('year', '20' + year);

        let yearLabel = document.createElement('div');
        yearLabel.classList.add('year_label');

        let yearHr = document.createElement('hr');
        let yearText = document.createElement('span');
        yearText.textContent = '20' + year;

        yearLabel.appendChild(yearHr);
        yearLabel.appendChild(yearText);
        this.element.appendChild(yearLabel);
        sidebar.element.appendChild(this.element);
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

    abstract clicked(): void;
}

class SidebarProfileButton extends SidebarButton {
    constructor(sidebar: PageSidebar) {
        super(sidebar);
        this.element.textContent = 'Profile';
        sidebar.element.appendChild(this.element);
    }

    clicked() {
        let profile_card: HTMLElement | null = this.sidebar.manager.content.element.querySelector('.profile_card');
        if (!profile_card) throw new Error('No profile card found!');
        profile_card.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

class SidebarMonthButton extends SidebarButton {
    year: number;
    month: number;

    constructor(sidebar: PageSidebar, year: number, month: number) {
        super(sidebar);
        this.year = year;
        this.month = month;

        this.element.classList.add('month');
        this.element.textContent = this.sidebar.manager.getMonthName(month);
        this.element.setAttribute('year', this.year.toString());
        this.element.setAttribute('month', this.month.toString());

        let yearHolder = sidebar.fetchYearLabel(year) || new SidebarYearSection(sidebar, year).element;
        yearHolder.appendChild(this.element);
    }

    clicked() {
        let query: string = `figure[year="${this.year.toString().padStart(2, '0')}"][month="${this.month.toString().padStart(2, '0')}"]`;
        let found_frame: HTMLElement | null = this.sidebar.manager.content.element.querySelector(`${query}:not(.featured)`);
        if (!found_frame && !this.sidebar.manager.content.content_loaded) {
            this.sidebar.manager.content.loadImageBatch();
            this.clicked();
            return;
        }
        if (!found_frame) {
            found_frame = document.querySelector(query); // check featured after
        }
        if (window.innerWidth < 767) {
            this.element.focus();
            this.sidebar.manager.shiftLayout();
        }
        if (found_frame) {
            found_frame.classList.add('highlight');
            setTimeout(function () {
                found_frame.classList.remove('highlight');
            }, 1000);
            found_frame.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    setMonthCount(count: number): void {
        this.element.textContent = `${this.sidebar.manager.getMonthName(this.month)} (${count})`
    }
}

class PageContent {
    element: HTMLElement;
    manager: PageManager;
    loadedImages: number;
    content_loaded: boolean;
    content_video_holder: ContentVideoHolder | null;
    content_photo_holder: ContentPhotoHolder;

    constructor(manager: PageManager) {
        this.element = document.createElement('div');
        this.element.classList.add('content');
        this.element.classList.toggle('shift', window.innerWidth < 767);
        this.manager = manager;
        this.loadedImages = 0;
        this.content_loaded = false;

        this.content_video_holder = this.manager.getUserVideos() ? new ContentVideoHolder(this) : null;
        this.content_photo_holder = new ContentPhotoHolder(this);
        new ContentProfileCard(this);
        this.loadVideos();
        this.loadImageBatch();
        this.contentScrolled();

        this.element.onscroll = () => this.contentScrolled();
        document.body.appendChild(this.element);
    }

    reload(): void {
        this.element.innerHTML = '';

        this.loadedImages = 0;
        this.content_loaded = false;

        this.content_video_holder = this.manager.getUserVideos() ? new ContentVideoHolder(this) : null;
        this.content_photo_holder = new ContentPhotoHolder(this);

        new ContentProfileCard(this);
        this.loadVideos();
        this.loadImageBatch();
        this.contentScrolled();
    }

    shiftLayout(): void {
        this.element.classList.toggle('shift');
    }

    private contentScrolled(): void {
        let imageList: NodeListOf<HTMLElement> = this.content_photo_holder.element.querySelectorAll('figure');
        let lastImage: HTMLElement = imageList[imageList.length - 1];
        if (!lastImage) throw new Error('No images found!');
        let lastImageBottom: number = lastImage.getBoundingClientRect().bottom;
        let contentBottom: number = this.element.getBoundingClientRect().bottom;

        if (Math.abs(lastImageBottom - contentBottom) <= 150) {
            this.loadImageBatch();
        }
    }

    loadImageBatch(): void {
        if (this.content_loaded) return;

        let userImages: PhotoDatabase | null = this.manager.getUserImages();
        if (!userImages) throw new Error('No images found!');
        let imageKeys = Object.keys(userImages);

        for (var i = this.loadedImages; i < this.loadedImages + 9; i++) {
            let date: string = imageKeys[i];
            if (!date) continue;
            new PhotoSquare(this, date);
        }

        this.loadedImages += 9;
        if (this.loadedImages >= Object.keys(userImages).length) {
            this.content_loaded = true;
        }
    }

    private loadVideos() {
        let videos: VideoDatabase | null = this.manager.getUserVideos();
        if (!videos || !this.content_video_holder) return;

        for (var date in this.manager.getUserVideos()) {
            new VideoRectangle(this, date, this.content_video_holder.scroll_frame);
        }
    }
}

class ContentProfileCard {
    element: HTMLElement;
    inner_element: HTMLElement;
    content: PageContent;
    card_name: ProfileCardName;
    card_social_row: ProfileCardSocialRow;

    constructor(content: PageContent) {
        let profile_data = data[content.manager.user];
        if (!profile_data) throw new Error('No profile found!');

        this.element = document.createElement('div');
        this.element.classList.add('profile_card');

        this.inner_element = document.createElement('div');
        this.inner_element.classList.add('inner_card');

        this.content = content;
        this.card_name = new ProfileCardName(this);
        this.card_social_row = new ProfileCardSocialRow(this);

        this.element.appendChild(this.inner_element);
        content.element.appendChild(this.element);
    }
}

class ProfileCardName {
    element: HTMLElement;
    card: ContentProfileCard;

    constructor(card: ContentProfileCard) {
        this.element = document.createElement('div');
        this.element.classList.add('card_name');
        this.card = card;
        this.propogateName();
    }

    private propogateName(): void {
        let user_info = data[this.card.content.manager.user];
        let icon = document.createElement('div');
        let textHolder = document.createElement('div');
        let textName = document.createElement('span');
        let textBlurb = document.createElement('span');
        icon.classList.add('icon');
        textHolder.classList.add('text_holder');
        textName.classList.add('username');
        textBlurb.classList.add('bio');

        icon.style.backgroundImage = `url(icon/user/${user_info.card.icon})`;
        textName.textContent = this.card.content.manager.user;
        textBlurb.textContent = user_info.card.bio;

        this.element.appendChild(icon);
        this.element.appendChild(textHolder);
        textHolder.appendChild(textName);
        textHolder.appendChild(textBlurb);
        this.card.inner_element.appendChild(this.element);

    }
}

class ProfileCardSocialRow {
    element: HTMLElement;
    card: ContentProfileCard;

    constructor(card: ContentProfileCard) {
        this.element = document.createElement('div');
        this.element.classList.add('social_row');
        this.card = card;
        card.inner_element.appendChild(this.element);
        this.propogateSocials();
    }

    private propogateSocials() {
        let user_data = data[this.card.content.manager.user];

        for (var service in user_data.social) {
            let link: string = user_data.social[service];
            new SocialMediaIcon(this, service, link);
        }
    }
}

class SocialMediaIcon {
    element: HTMLElement;

    constructor(row: ProfileCardSocialRow, service: string, link: string) {
        let icon_info = Social_Icons[service];

        this.element = document.createElement('a');
        this.element.classList.add('social_icon', service);
        this.element.setAttribute('href', row.card.content.manager.getUserSocials()[service]);

        let icon_size: string = icon_info.image.size || '100%';
        this.element.style.setProperty('--gradient', `linear-gradient(${icon_info.gradient.direction}, ${icon_info.gradient.colors.join(', ')})`);
        this.element.style.setProperty('--icon-url', `url(${icon_info.image.icon})`);
        this.element.style.setProperty('--icon-size', icon_size);

        row.element.appendChild(this.element);
    }
}

abstract class ContentFrame {
    element: HTMLElement;
    content: PageContent;

    constructor(content: PageContent, name: string) {
        this.element = document.createElement('div');
        this.element.classList.add('content_frame')
        this.element.setAttribute('title', name);
        this.content = content;
        content.element.appendChild(this.element);
    }
}

class ContentVideoHolder extends ContentFrame {
    scroll_frame: HTMLElement;

    constructor(content: PageContent) {
        super(content, 'Videos');
        this.element.classList.add('content_video_holder');
        this.scroll_frame = document.createElement('div');
        this.scroll_frame.classList.add('video_scroll');
        this.element.appendChild(this.scroll_frame);
    }
}

class ContentPhotoHolder extends ContentFrame {
    constructor(content: PageContent) {
        super(content, 'Photos');
        this.element.classList.add('content_photo_holder');
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

    protected imageLoaded() {
        this.element.classList.remove('loading');
    }
}

class PhotoSquare extends MediaFigure {
    photo_data: PhotoEntry;

    constructor(content: PageContent, date: string, forceParent?: HTMLElement) {
        super(content, date);
        this.element.classList.add('photo_square');

        let photo_data: PhotoEntry | null = content.manager.getPhotoInfoFromDate(date);
        if (!photo_data) throw new Error('No photo found at date!');
        this.photo_data = photo_data;

        this.lower_caption.textContent = this.photo_data.name;
        this.image.setAttribute('src', `media/${content.manager.user}/IMG_${photo_data.id[0].toString()}.jpg`);
        this.image.setAttribute('alt', `${this.date}: ${this.photo_data.name}`);
        this.element.setAttribute('title', `${this.date}: ${this.photo_data.name}`);
        this.element.onclick = () => this.photoSelected();

        if (forceParent) forceParent.appendChild(this.element)
        else content.content_photo_holder.element.appendChild(this.element);
    }

    photoSelected(): void {
        this.content.manager.main_photo_holder.showImage(this.date);
    }
}

class VideoRectangle extends MediaFigure {
    video_data: VideoEntry;

    constructor(content: PageContent, date: string, forceParent?: HTMLElement) {
        super(content, date);
        this.element.classList.add('video_rectangle');

        let video_data: VideoEntry | null = this.content.manager.getVideoInfoFromDate(date);
        if (!video_data) throw new Error('No video found at date!');
        this.video_data = video_data;

        this.element.onclick = () => this.videoSelected();
        this.image.setAttribute('src', `/icon/thumbnail/${this.video_data.thumbnail}`);
        this.date_caption.textContent = date;
        this.lower_caption.textContent = this.video_data.name;

        if (forceParent) forceParent.appendChild(this.element)
        else content.content_video_holder?.element.appendChild(this.element);
    }

    videoSelected(): void {
        window.open(this.video_data.link, '_blank');
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

    reload(): void {
        this.element.innerHTML = '';
        this.photo_figure = new MainPhotoFigure(this);
        this.photo_aside = new MainPhotoAside(this);
    }

    showImage(date: string): void {
        this.clearPrevious();
        this.element.classList.remove('hide');
        this.photo_figure.showImage(date);
        this.photo_aside.showInfo(date);
    }

    clearPrevious(): void {
        this.photo_figure.clearPrevious();
        this.photo_aside.clearPrevious();
    }

    closeMenu(): void {
        this.clearPrevious();
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

    constructor(photo_holder: MainPhotoHolder) {
        this.photo_holder = photo_holder;
        this.element = document.createElement('figure');

        this.photo_info = document.createElement('div');
        this.photo_info.classList.add('photo_info');

        this.photo_date = document.createElement('span');
        this.photo_date.classList.add('photo_date');

        this.photo_people = document.createElement('span');
        this.photo_people.classList.add('photo_people');

        this.photo_button_left = document.createElement('button');
        this.photo_button_right = document.createElement('button');
        this.photo_button_left.classList.add('shift', 'left');
        this.photo_button_right.classList.add('shift', 'right');
        this.photo_button_left.onclick = () => this.shiftImage(-1);
        this.photo_button_right.onclick = () => this.shiftImage(1);

        this.photo_close = document.createElement('button');
        this.photo_close.classList.add('photo_close');
        this.photo_close.onclick = () => this.photo_holder.closeMenu();

        this.photo_index = 0;

        this.photo_info.appendChild(this.photo_date);
        this.photo_info.appendChild(this.photo_people);
        this.element.appendChild(this.photo_info);
        this.element.appendChild(this.photo_close);
        this.element.appendChild(this.photo_button_left);
        this.element.appendChild(this.photo_button_right);
        photo_holder.element.appendChild(this.element);
    }

    clearPrevious(): void {
        this.element.classList.add('hide_left_button');

        this.photo_index = 0;
        this.photo_date.textContent = '';

        this.photo_people.textContent = '';
        this.photo_people.classList.add('hide');

        let previous_images: NodeListOf<HTMLElement> = this.element.querySelectorAll('img');
        for (var i = 0; i < previous_images.length; i++) {
            previous_images[i].remove();
        }
    }

    showImage(date: string): void {
        this.clearPrevious();
        this.element.classList.remove('hide');

        let date_info = data[this.photo_holder.manager.user].images[date];
        this.photo_date.textContent = date;
        this.photo_people.textContent = date_info.people?.join(', ') || '';
        this.photo_people.classList.toggle('hide', !(date_info.people instanceof Array))

        for (var i = 0; i < date_info.id.length; i++) {
            let id = date_info.id[i];
            let image: HTMLElement = document.createElement('img');
            image.setAttribute('src', `media/${this.photo_holder.manager.user}/IMG_${id}.jpg`);
            image.style.left = `${i * 100}%`;
            this.element.appendChild(image);
        }
    }

    shiftImage(offset: number): void {
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
}

class MainPhotoAside {
    photo_holder: MainPhotoHolder;

    element: HTMLElement;
    inner_element: HTMLElement;
    header: HTMLElement;
    location: HTMLElement;
    aside_close: HTMLElement;

    constructor(photo_holder: MainPhotoHolder) {
        this.photo_holder = photo_holder;
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

    showInfo(date: string): void {
        let photo_info: PhotoEntry | null = this.photo_holder.manager.getPhotoInfoFromDate(date);
        if (!photo_info) throw new Error('Photo info not found at date!');

        this.location.textContent = photo_info.name;
        this.createRelatedPanes(date);
    }

    createRelatedPanes(date: string) {
        let photo_info: PhotoEntry | null = this.photo_holder.manager.getPhotoInfoFromDate(date);
        if (!photo_info) throw new Error('Photo info not found!');
        new RelatedLocationPane(this, date);

        if (photo_info.people) {
            for (var i in photo_info.people) {
                let person: string = photo_info.people[i];
                new RelatedPersonPane(this, date, person);
            }
        }

        new RelatedMonthPane(this, date);
    }

    clearPrevious(): void {
        this.location.textContent = '';
        this.inner_element.innerHTML = '';
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
        let origin_photo_entry: PhotoEntry | null = this.manager.getPhotoInfoFromDate(origin_date);
        let all_images: PhotoDatabase | null = this.manager.getUserImages();
        if (!origin_photo_entry) throw new Error('Error fetching origin data!');
        if (!all_images) throw new Error('Error fetching image list!');

        this.origin_photo_entry = origin_photo_entry;
        this.all_images = all_images;
    }

    abstract findImages(): PhotoDatabase;

    renderMatches() {
        let found_images: PhotoDatabase = this.findImages();
        delete found_images[this.origin_date];

        if (Object.keys(found_images).length > 0) {
            for (var date in found_images) {
                new PhotoSquare(this.aside.photo_holder.manager.content, date, this.scroll_element);
            }
            this.aside.inner_element.appendChild(this.element);
        }
    }
}

class RelatedLocationPane extends RelatedPhotosPane {
    constructor(aside: MainPhotoAside, origin_date: string) {
        super(aside, origin_date);
        this.text_header.textContent = this.origin_photo_entry.name;
        this.renderMatches();
    }

    findImages(): PhotoDatabase {
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

    findImages(): PhotoDatabase {
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

    findImages(): PhotoDatabase {
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