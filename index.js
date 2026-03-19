"use strict";
class PageManager {
    user;
    header;
    sidebar;
    content;
    main_photo_holder;
    stats_manager;
    constructor() {
        this.user = 'Thaddeus';
        this.stats_manager = new WebsiteStats('Korwith', 'snap.red');
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.content = new PageContent(this);
        this.main_photo_holder = new MainPhotoHolder(this);
    }
    loadUser(name) {
        this.user = name;
        this.content.reload();
        this.sidebar.reload();
    }
    shiftLayout() {
        this.sidebar.shiftLayout();
        this.content.shiftLayout();
    }
    countImages() {
        let profile = Data[this.user];
        if (!profile)
            throw new Error('No profile selected!');
        let count = {};
        for (var date in profile.images) {
            let dateSplit = date.split('/');
            let year = dateSplit[2];
            let month = dateSplit[0];
            if (!count[year])
                count[year] = {};
            if (!count[year][month])
                count[year][month] = 0;
            count[year][month]++;
        }
        return count;
    }
    getUserImages() {
        return Data[this.user].images;
    }
    getUserVideos() {
        return Data[this.user].videos || null;
    }
    getUserSocials() {
        return Data[this.user].social;
    }
    getUserSiteInfo() {
        return Data[this.user].card.site || null;
    }
    getUserFeaturedPeople() {
        let found = [];
        let images = this.getUserImages();
        for (let date in images) {
            let entry = images[date];
            if (!entry.people)
                continue;
            for (let person of entry.people) {
                if (!found.includes(person))
                    found.push(person);
            }
        }
        return found.sort();
    }
    getUserLocations() {
        let found = [];
        let images = this.getUserImages();
        for (let date in images) {
            let entry = images[date];
            if (!found.includes(entry.name))
                found.push(entry.name);
        }
        return found.sort();
    }
    getPhotoInfoFromDate(date) {
        return Data[this.user].images[date];
    }
    getVideoInfoFromDate(date) {
        let video_array = Data[this.user].videos;
        if (!video_array)
            return null;
        return video_array[date] || null;
    }
    getMonthName(month) {
        month = Number(month);
        let date = new Date();
        date.setMonth(month - 1); // 0 indexed
        return date.toLocaleString('default', { month: 'long' });
    }
}
class PageHeader {
    element;
    manager;
    emblem;
    user_selector;
    constructor(manager) {
        this.manager = manager;
        this.element = document.createElement('header');
        this.emblem = new HeaderEmblem(this);
        this.user_selector = new UserSelector(this);
        document.body.appendChild(this.element);
    }
}
class HeaderEmblem {
    element;
    logo_button;
    constructor(header) {
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
    element;
    header;
    constructor(header) {
        this.header = header;
        this.element = document.createElement('div');
        this.element.classList.add('user_selector_holder');
        this.element.onclick = (e) => this.click(e);
        for (var user in Data) {
            let userInfo = Data[user];
            let userButton = document.createElement('button');
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
    click(e) {
        let targetElement = e.target;
        let targetUser = targetElement.getAttribute('name');
        if (!targetUser)
            throw new Error('No target user found!');
        if (targetElement == this.element || targetUser == this.header.manager.user) {
            this.element.classList.toggle('display');
            return;
        }
        let all_buttons = this.element.querySelectorAll('button');
        for (let button of all_buttons) {
            let user = button.getAttribute('name');
            if (!user)
                continue;
            if (user == targetUser)
                button.style.order = '-1';
            else
                button.style.order = 'unset';
        }
        this.element.classList.remove('display');
        this.header.manager.loadUser(targetUser);
    }
}
class PageSidebar {
    element;
    button_holder;
    stats;
    manager;
    constructor(manager) {
        this.element = document.createElement('nav');
        this.element.classList.add('sidebar');
        this.element.classList.toggle('shift', window.innerWidth < 767);
        this.manager = manager;
        this.button_holder = new SidebarButtonHolder(this);
        this.stats = new SidebarStats(this);
        document.body.appendChild(this.element);
    }
    reload() {
        this.button_holder.reload();
    }
    shiftLayout() {
        this.element.classList.toggle('shift');
    }
    fetchYearLabel(year) {
        let yearLabel = this.element.querySelector(`[year="20${year}"]`);
        return yearLabel;
    }
    fetchMonthButton(year, month) {
        let yearLabel = this.fetchYearLabel(year);
        if (!yearLabel)
            return null;
        let monthButton = yearLabel.querySelector(`[year="${month}"]`);
        return monthButton;
    }
}
class SidebarButtonHolder {
    element;
    sidebar;
    profile_button;
    year_sections;
    constructor(sidebar) {
        this.element = document.createElement('div');
        this.element.classList.add('button_holder');
        this.sidebar = sidebar;
        this.profile_button = new SidebarProfileButton(this);
        this.year_sections = [];
        this.propogateSidebarButtons();
    }
    propogateSidebarButtons() {
        let imageCount = this.sidebar.manager.countImages();
        let yearKeys = Object.keys(imageCount).reverse();
        for (let year of yearKeys) {
            let yearNum = Number(year);
            let yearSection = new SidebarYearSection(this, yearNum);
            this.year_sections.push(yearSection);
            this.sidebar.element.appendChild(this.element);
        }
    }
    clearPrevious() {
        this.profile_button.remove();
        for (let section of this.year_sections) {
            section.remove();
        }
        this.year_sections = [];
    }
    reload() {
        this.clearPrevious();
        this.profile_button = new SidebarProfileButton(this);
        this.propogateSidebarButtons();
    }
}
class SidebarYearSection {
    element;
    year_label;
    year_hr;
    year_text;
    year;
    sidebar_buttons;
    section_holder;
    constructor(section_holder, year) {
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
    createButtons() {
        let imageCount = this.section_holder.sidebar.manager.countImages();
        let yearList = imageCount[this.year.toString()];
        for (var month in yearList) {
            let sidebarButton = new SidebarMonthButton(this, Number(month));
            sidebarButton.setMonthCount(yearList[month]);
            this.sidebar_buttons.push(sidebarButton);
        }
    }
    remove() {
        for (let button of this.sidebar_buttons) {
            button.remove();
        }
        this.element.remove();
    }
    getYear() {
        return this.year;
    }
}
class SidebarButton {
    element;
    sidebar;
    constructor(sidebar) {
        this.element = document.createElement('button');
        this.element.classList.add('sidebar_button');
        this.element.onclick = () => this.clicked();
        this.sidebar = sidebar;
    }
    remove() {
        this.element.onclick = null;
        this.element.remove();
    }
}
class SidebarProfileButton extends SidebarButton {
    button_holder;
    constructor(button_holder) {
        super(button_holder.sidebar);
        this.button_holder = button_holder;
        this.element.textContent = 'Profile';
        this.button_holder.element.appendChild(this.element);
    }
    clicked() {
        let profile_card = this.sidebar.manager.content.element.querySelector('.profile_card');
        if (!profile_card)
            throw new Error('No profile card found!');
        profile_card.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}
class SidebarMonthButton extends SidebarButton {
    year;
    month;
    constructor(year_holder, month) {
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
    clicked() {
        let found_figure = this.sidebar.manager.content.photo_holder.getFigureByMonth(this.year, this.month);
        if (window.innerWidth < 767) {
            this.element.focus();
            this.sidebar.manager.shiftLayout();
        }
        found_figure?.findInFrame();
    }
    setMonthCount(count) {
        this.element.textContent = `${this.sidebar.manager.getMonthName(this.month)} (${count})`;
    }
}
class SidebarStats {
    element;
    commits;
    size;
    sidebar;
    constructor(sidebar) {
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
    async updateStats() {
        this.sidebar.manager.stats_manager.fetchLastCommit()
            .then((data) => {
            this.commits.textContent = `${data.count} commits`;
        });
        this.sidebar.manager.stats_manager.fetchRepoSize()
            .then((e) => {
            this.size.textContent = e;
        });
    }
}
class PageContent {
    element;
    manager;
    video_holder;
    photo_holder;
    profile_card;
    constructor(manager) {
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
    reload() {
        this.profile_card.reload();
        this.video_holder.reload();
        this.photo_holder.reload();
    }
    shiftLayout() {
        this.element.classList.toggle('shift');
    }
    contentScrolled() {
        let imageList = this.photo_holder.element.querySelectorAll('figure');
        let lastImage = imageList[imageList.length - 1];
        if (!lastImage)
            throw new Error('No images found!');
        let lastImageBottom = lastImage.getBoundingClientRect().bottom;
        let contentBottom = this.element.getBoundingClientRect().bottom;
        if (Math.abs(lastImageBottom - contentBottom) <= 150) {
            this.photo_holder.loadImageBatch();
        }
    }
}
class ContentProfileCard {
    element;
    inner_element;
    content;
    card_name;
    card_social_row;
    user_site;
    constructor(content) {
        let profile_Data = Data[content.manager.user];
        if (!profile_Data)
            throw new Error('No profile found!');
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
    reload() {
        this.card_name.reload();
        this.card_social_row.reload();
        this.user_site.reload();
    }
}
class ProfileCardName {
    element;
    icon;
    text_holder;
    text_name;
    text_blurb;
    card;
    constructor(card) {
        this.element = document.createElement('div');
        this.element.classList.add('card_name');
        this.card = card;
        this.icon = document.createElement('div');
        this.text_holder = document.createElement('div');
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
    propogateName() {
        let user_info = Data[this.card.content.manager.user];
        this.icon.style.backgroundImage = `url(icon/user/${user_info.card.icon})`;
        this.text_name.textContent = this.card.content.manager.user;
        this.text_blurb.textContent = user_info.card.bio;
    }
    reload() {
        this.propogateName();
    }
}
class ProfileCardSocialRow {
    element;
    social_icons;
    card;
    constructor(card) {
        this.element = document.createElement('div');
        this.element.classList.add('social_row');
        this.social_icons = [];
        this.card = card;
        this.propogateSocials();
        card.inner_element.appendChild(this.element);
    }
    propogateSocials() {
        let user_Data = Data[this.card.content.manager.user];
        for (var service in user_Data.social) {
            let link = user_Data.social[service];
            let media_icon = new SocialMediaIcon(this, service, link);
            this.social_icons.push(media_icon);
        }
    }
    clearMemory() {
        for (let button of this.social_icons) {
            button.element.remove();
        }
        this.social_icons = [];
    }
    reload() {
        this.clearMemory();
        this.propogateSocials();
    }
}
class SocialMediaIcon {
    element;
    constructor(row, service, link) {
        let icon_info = Social_Icons[service];
        this.element = document.createElement('a');
        this.element.classList.add('social_icon', service);
        this.element.setAttribute('href', link);
        let icon_size = icon_info.image.size || '100%';
        this.element.style.setProperty('--gradient', `linear-gradient(${icon_info.gradient.direction}, ${icon_info.gradient.colors.join(', ')})`);
        this.element.style.setProperty('--icon-url', `url(${icon_info.image.icon})`);
        this.element.style.setProperty('--icon-size', icon_size);
        row.element.appendChild(this.element);
    }
}
class ProfileCardSite {
    element;
    icon;
    text_holder;
    name;
    blurb;
    card;
    constructor(card) {
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
    populateSite() {
        let website_info = this.card.content.manager.getUserSiteInfo();
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
    hideSite() {
        this.resetSite();
        this.element.classList.add('hide');
    }
    resetSite() {
        this.element.style.removeProperty('--gradient');
        this.icon.style.removeProperty('--icon-url');
        this.name.textContent = '';
        this.blurb.textContent = '';
    }
    reload() {
        let website_info = this.card.content.manager.getUserSiteInfo();
        if (!website_info)
            this.hideSite();
        else
            this.populateSite();
    }
}
class ContentFrame {
    element;
    title;
    content;
    figures;
    constructor(content, name) {
        this.element = document.createElement('div');
        this.element.classList.add('content_frame');
        this.title = document.createElement('span');
        this.title.classList.add('title');
        this.title.textContent = name;
        this.content = content;
        this.figures = [];
        this.element.appendChild(this.title);
        content.element.appendChild(this.element);
    }
    clearMemory() {
        for (let figure of this.figures) {
            figure.image.onload = null;
            figure.element.remove();
        }
        this.figures = [];
    }
}
class ContentVideoHolder extends ContentFrame {
    scroll_frame;
    constructor(content) {
        super(content, 'Videos');
        this.element.classList.add('content_video_holder', 'hide');
        this.scroll_frame = document.createElement('div');
        this.scroll_frame.classList.add('video_scroll');
        this.element.appendChild(this.scroll_frame);
    }
    reload() {
        this.clearMemory();
        this.loadVideos();
    }
    loadVideos() {
        let videos = this.content.manager.getUserVideos();
        this.element.classList.toggle('hide', !videos);
        if (!videos)
            return;
        for (var date in this.content.manager.getUserVideos()) {
            let video_figure = new VideoRectangle(this.content, date);
            video_figure.setParent(this.scroll_frame);
            this.figures.push(video_figure);
        }
    }
}
class ContentPhotoHolder extends ContentFrame {
    user_images;
    filter;
    loaded_images;
    complete;
    constructor(content) {
        super(content, 'Photos');
        this.element.classList.add('content_photo_holder');
        this.user_images = structuredClone(this.content.manager.getUserImages());
        this.filter = new ContentPhotoFilter(this);
        this.loaded_images = 0;
        this.complete = false;
        this.loadFeaturedImages();
        this.loadImageBatch();
    }
    loadFeaturedImages() {
        for (var date in this.user_images) {
            let entry = this.user_images[date];
            if (!entry.featured)
                continue;
            let photo_figure = new PhotoSquare(this.content, date);
            photo_figure.setParent(this.element);
            photo_figure.setFeatured(entry.featured);
            this.figures.push(photo_figure);
            delete this.user_images[date];
        }
    }
    loadImageBatch() {
        if (this.complete)
            return;
        let imageKeys = Object.keys(this.user_images);
        for (var i = this.loaded_images; i < this.loaded_images + 9; i++) {
            let date = imageKeys[i];
            if (!date)
                break;
            let photo_figure = new PhotoSquare(this.content, date);
            photo_figure.setParent(this.element);
            this.figures.push(photo_figure);
        }
        this.loaded_images += 9;
        if (this.loaded_images >= Object.keys(this.user_images).length) {
            this.complete = true;
            this.loaded_images = Object.keys(this.user_images).length;
        }
    }
    getFigureByMonth(year, month) {
        for (let figure of this.figures) {
            let date_split = figure.date.split('/');
            let found_month = Number(date_split[0]);
            let found_year = Number(date_split[2]);
            if (found_year == year && found_month == month) {
                return figure;
            }
        }
        if (!this.complete) {
            this.loadImageBatch();
            return this.getFigureByMonth(year, month);
        }
        else {
            return null;
        }
    }
    reload() {
        this.loaded_images = 0;
        this.complete = false;
        this.user_images = structuredClone(this.filter.applyFilter(this.content.manager.getUserImages()));
        this.clearMemory();
        this.loadFeaturedImages();
        this.loadImageBatch();
    }
}
class ContentPhotoFilter {
    element;
    photo_holder;
    filters;
    active_dropdown;
    constructor(photo_holder) {
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
    handleActiveDropdown(dropdown) {
        if (dropdown == this.active_dropdown) {
            dropdown.toggle(false);
            this.active_dropdown = null;
        }
        else {
            if (this.active_dropdown) {
                this.active_dropdown.toggle(false);
                this.active_dropdown = null;
            }
            dropdown.toggle(true);
            this.active_dropdown = dropdown;
        }
    }
    applyFilter(list) {
        let match = list;
        for (let filter in this.filters) {
            let entry = this.filters[filter];
            if (!entry.active)
                continue;
            match = entry.filterList(match);
        }
        return match;
    }
    disableAllFilters() {
        for (let name in this.filters) {
            if (name == 'enable')
                continue;
            let filter = this.filters[name];
            filter.unSelectOption();
        }
    }
}
class FilterOption {
    element;
    filter_holder;
    display;
    active;
    constructor(filter_holder) {
        this.element = document.createElement('div');
        this.element.classList.add('filter_option');
        this.filter_holder = filter_holder;
        this.active = false;
        this.display = new FilterButtonDisplay(this);
        filter_holder.element.appendChild(this.element);
    }
    setDisplayEntry(text) {
        this.display.setText(text);
    }
}
class FilterOptionDropdown extends FilterOption {
    selected;
    constructor(filter_holder) {
        super(filter_holder);
        this.selected = null;
        this.element.classList.add('dropdown');
        this.element.onclick = (e) => this.toggleDropdown(e);
    }
    toggleDropdown(e) {
        let event_target = e.target;
        if (event_target.classList.contains('icon'))
            return;
        this.filter_holder.handleActiveDropdown(this);
    }
    toggle(force) {
        this.element.classList.toggle('open', force);
    }
    propogateDropdown(list) {
        for (let index in list) {
            let name = list[index];
            let button = new FilterButton(this);
            button.setText(name);
            button.setIndex(Number(index) + 1);
        }
    }
    selectOption(button, e) {
        if (button instanceof FilterButtonDisplay)
            return;
        this.element.classList.add('active');
        this.active = true;
        this.selected = button;
        this.setDisplayEntry(this.selected.getText());
        this.filter_holder.photo_holder.reload();
    }
    unSelectOption() {
        this.element.classList.remove('active');
        this.setDisplayEntry(this.getLabel() || 'Error');
        this.active = false;
        this.selected = null;
        this.filter_holder.photo_holder.reload();
    }
    getLabel() {
        return this.element.getAttribute('label');
    }
}
class FilterButton {
    element;
    text_label;
    option;
    constructor(dropdown) {
        this.element = document.createElement('button');
        this.element.classList.add('dropdown_button');
        this.element.onclick = (e) => this.click(e);
        this.text_label = document.createElement('span');
        this.text_label.classList.add('text_label');
        this.element.appendChild(this.text_label);
        this.option = dropdown;
        this.option.element.appendChild(this.element);
    }
    click(e) {
        this.option.selectOption(this, e);
    }
    setIndex(index) {
        this.element.setAttribute('index', index.toString());
    }
    setText(text) {
        this.text_label.textContent = text || '';
    }
    getText() {
        return this.text_label.textContent;
    }
}
class FilterButtonDisplay extends FilterButton {
    icon_button;
    constructor(dropdown) {
        super(dropdown); // fix l8r
        this.element.classList.add('display');
        this.icon_button = document.createElement('div');
        this.icon_button.classList.add('icon');
        this.element.appendChild(this.icon_button);
    }
    click(e) {
        let target_element = e.target;
        if (this.option.selected && target_element == this.icon_button) {
            this.option.unSelectOption();
        }
    }
}
class FilterOptionTime extends FilterOptionDropdown {
    constructor(filter_holder) {
        super(filter_holder);
        this.element.classList.add('time');
    }
}
class FilterOptionEnable extends FilterOption {
    constructor(filter_holder) {
        super(filter_holder);
        this.element.onclick = () => this.filter_holder.disableAllFilters();
        this.element.classList.add('filter');
    }
    filterList(photos) {
        return photos;
    }
}
class FilterOptionLocation extends FilterOptionDropdown {
    locations;
    constructor(filter_holder) {
        super(filter_holder);
        this.element.classList.add('location');
        this.element.setAttribute('label', 'Location');
        this.locations = this.filter_holder.photo_holder.content.manager.getUserLocations();
        this.setDisplayEntry('Location');
        this.propogateDropdown(this.locations);
    }
    filterList(photos) {
        let match = {};
        if (!this.selected)
            return photos;
        for (let date in photos) {
            let entry = photos[date];
            if (entry.name != this.selected.getText())
                continue;
            match[date] = entry;
        }
        return match;
    }
}
class FilterOptionPerson extends FilterOptionDropdown {
    people;
    constructor(filter_holder) {
        super(filter_holder);
        this.element.classList.add('user');
        this.element.setAttribute('label', 'Person');
        this.people = this.filter_holder.photo_holder.content.manager.getUserFeaturedPeople();
        this.setDisplayEntry('Person');
        this.propogateDropdown(this.people);
    }
    filterList(photos) {
        let match = {};
        if (!this.selected)
            return photos;
        for (let date in photos) {
            let entry = photos[date];
            if (!entry.people)
                continue;
            if (entry.people.includes(this.selected.getText())) {
                match[date] = entry;
            }
        }
        return match;
    }
}
class FilterOptionMonth extends FilterOptionTime {
    months;
    constructor(filter_holder) {
        super(filter_holder);
        this.element.classList.add('month');
        this.element.setAttribute('label', 'Month');
        this.months = this.createMonthList();
        this.setDisplayEntry('Month');
        this.propogateDropdown(this.months);
    }
    createMonthList() {
        let months = [];
        for (var i = 0; i < 12; i++) {
            let date = new Date(0, i, 1);
            months.push(date.toLocaleDateString(undefined, { month: 'long' }));
        }
        return months;
    }
    filterList(photos) {
        let match = {};
        for (let date in photos) {
            let entry = photos[date];
            let split = date.split('/');
            let check_index = this.selected?.element.getAttribute('index');
            if (!check_index)
                continue;
            if (split[0] == check_index.padStart(2, '0'))
                match[date] = entry;
        }
        return match;
    }
}
class FilterOptionYear extends FilterOptionTime {
    years;
    constructor(filter_holder) {
        super(filter_holder);
        this.element.classList.add('year');
        this.element.setAttribute('label', 'Year');
        this.years = this.createYearList();
        this.setDisplayEntry('Year');
        this.propogateDropdown(this.years);
    }
    createYearList() {
        let years = [];
        let count = this.filter_holder.photo_holder.content.manager.countImages();
        for (let year in count) {
            years.push('20' + year);
        }
        return years;
    }
    filterList(photos) {
        let match = {};
        for (let date in photos) {
            let entry = photos[date];
            let split = date.split('/');
            if (this.selected?.getText() == '20' + split[2])
                match[date] = entry;
        }
        return match;
    }
}
class MediaFigure {
    element;
    image;
    content;
    date;
    lower_caption;
    date_caption;
    constructor(content, date) {
        this.element = document.createElement('figure');
        this.element.classList.add('media_figure');
        this.content = content;
        this.date = date;
        let date_split = date.split('/');
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
    imageLoaded() {
        this.image.onload = null;
        this.element.classList.remove('loading');
    }
    setParent(parent) {
        parent.appendChild(this.element);
    }
    setFeatured(order) {
        this.element.classList.add('featured');
        this.element.style.order = (-order).toString();
    }
    remove() {
        this.element.onload = null;
        this.element.remove();
    }
}
class PhotoSquare extends MediaFigure {
    photo_Data;
    constructor(content, date) {
        super(content, date);
        this.element.classList.add('photo_square');
        let photo_Data = content.manager.getPhotoInfoFromDate(date);
        if (!photo_Data)
            throw new Error('No photo found at date!');
        this.photo_Data = photo_Data;
        this.lower_caption.textContent = this.photo_Data.name;
        this.image.setAttribute('src', `media/${content.manager.user}/IMG_${photo_Data.id[0].toString()}.jpg`);
        this.image.setAttribute('alt', `${this.date}: ${this.photo_Data.name}`);
        this.element.setAttribute('title', `${this.date}: ${this.photo_Data.name}`);
        this.element.onclick = () => this.photoSelected();
    }
    findInFrame() {
        this.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.element.classList.add('highlight');
        setTimeout(() => {
            this.element.classList.remove('highlight');
        }, 1000);
    }
    photoSelected() {
        this.content.manager.main_photo_holder.showImage(this.date);
    }
}
class VideoRectangle extends MediaFigure {
    video_Data;
    constructor(content, date) {
        super(content, date);
        this.element.classList.add('video_rectangle');
        let video_Data = this.content.manager.getVideoInfoFromDate(date);
        if (!video_Data)
            throw new Error('No video found at date!');
        this.video_Data = video_Data;
        this.element.onclick = () => this.videoSelected();
        this.image.setAttribute('src', `/icon/thumbnail/${this.video_Data.thumbnail}`);
        this.date_caption.textContent = date;
        this.lower_caption.textContent = this.video_Data.name;
    }
    videoSelected() {
        window.open(this.video_Data.link, '_blank');
    }
}
class MainPhotoHolder {
    element;
    photo_figure;
    photo_aside;
    manager;
    constructor(manager) {
        this.element = document.createElement('article');
        this.element.classList.add('photo_holder', 'hide');
        this.photo_figure = new MainPhotoFigure(this);
        this.photo_aside = new MainPhotoAside(this);
        this.manager = manager;
        document.body.appendChild(this.element);
    }
    showImage(date) {
        this.refresh();
        this.element.classList.remove('hide');
        this.photo_figure.showImage(date);
        this.photo_aside.showInfo(date);
    }
    refresh() {
        this.photo_figure.refresh();
        this.photo_aside.refresh();
    }
    closeMenu() {
        this.refresh();
        this.element.classList.add('hide');
    }
}
class MainPhotoFigure {
    photo_holder;
    element;
    photo_info;
    photo_date;
    photo_people;
    photo_button_left;
    photo_button_right;
    photo_close;
    photo_index;
    images;
    constructor(photo_holder) {
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
    refresh() {
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
    showImage(date) {
        this.refresh();
        this.element.classList.remove('hide');
        let date_info = Data[this.photo_holder.manager.user].images[date];
        this.photo_date.textContent = date;
        this.photo_people.textContent = date_info.people?.join(', ') || '';
        this.photo_people.classList.toggle('hide', !(date_info.people instanceof Array));
        for (var i = 0; i < date_info.id.length; i++) {
            let id = date_info.id[i];
            let image = document.createElement('img');
            image.classList.add('loading');
            image.onload = (e) => this.imageLoaded(e);
            image.setAttribute('src', `media/${this.photo_holder.manager.user}/IMG_${id}.jpg`);
            image.style.left = `${i * 100}%`;
            this.images.push(image);
            this.element.appendChild(image);
        }
    }
    shiftImage(offset) {
        let all_images = this.element.querySelectorAll('img');
        let new_offset = this.photo_index + offset;
        if (new_offset < 0 || new_offset >= all_images.length)
            return;
        this.element.classList.toggle('hide_left_button', new_offset == 0);
        this.element.classList.toggle('hide_right_button', new_offset == all_images.length - 1);
        for (var i = 0; i < all_images.length; i++) {
            let this_image = all_images[i];
            let difference = i - new_offset;
            this_image.style.left = `${difference * 100}%`;
        }
        this.photo_index = new_offset;
    }
    imageLoaded(e) {
        let image = e.target;
        image.onload = null;
        image.classList.remove('loading');
    }
}
class MainPhotoAside {
    photo_holder;
    element;
    inner_element;
    header;
    location;
    aside_close;
    related_frames;
    constructor(photo_holder) {
        this.photo_holder = photo_holder;
        this.related_frames = [];
        this.element = document.createElement('aside');
        this.inner_element = document.createElement('div');
        this.inner_element.classList.add('inner_aside');
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
        photo_holder.element.appendChild(this.element);
    }
    showInfo(date) {
        let photo_info = this.photo_holder.manager.getPhotoInfoFromDate(date);
        if (!photo_info)
            throw new Error('Photo info not found at date!');
        this.location.textContent = photo_info.name;
        this.createRelatedPanes(date);
    }
    createRelatedPanes(date) {
        let photo_info = this.photo_holder.manager.getPhotoInfoFromDate(date);
        if (!photo_info)
            throw new Error('Photo info not found!');
        this.related_frames.push(new RelatedLocationPane(this, date));
        if (photo_info.people) {
            for (let person of photo_info.people) {
                this.related_frames.push(new RelatedPersonPane(this, date, person));
            }
        }
        this.related_frames.push(new RelatedMonthPane(this, date));
    }
    refresh() {
        this.location.textContent = '';
        for (let frame of this.related_frames) {
            frame.remove();
        }
        this.related_frames = [];
    }
}
class RelatedPhotosPane {
    element;
    text_header;
    scroll_element;
    aside;
    manager;
    origin_date;
    origin_photo_entry;
    all_images;
    all_figures;
    constructor(aside, origin_date) {
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
        let origin_photo_entry = this.manager.getPhotoInfoFromDate(origin_date);
        let all_images = this.manager.getUserImages();
        if (!origin_photo_entry)
            throw new Error('Error fetching origin Data!');
        if (!all_images)
            throw new Error('Error fetching image list!');
        this.origin_photo_entry = origin_photo_entry;
        this.all_images = all_images;
    }
    renderMatches() {
        let found_images = this.findImages();
        delete found_images[this.origin_date];
        if (Object.keys(found_images).length > 0) {
            for (var date in found_images) {
                let photo_figure = new PhotoSquare(this.aside.photo_holder.manager.content, date);
                photo_figure.setParent(this.scroll_element);
                this.all_figures.push(photo_figure);
            }
            this.aside.inner_element.appendChild(this.element);
        }
    }
    remove() {
        for (var figure of this.all_figures) {
            figure.remove();
        }
        this.all_figures = [];
        this.element.remove();
    }
}
class RelatedLocationPane extends RelatedPhotosPane {
    constructor(aside, origin_date) {
        super(aside, origin_date);
        this.text_header.textContent = this.origin_photo_entry.name;
        this.renderMatches();
    }
    findImages() {
        let matches = {};
        for (var date in this.all_images) {
            let entry = this.all_images[date];
            if (entry.name == this.origin_photo_entry.name) {
                matches[date] = entry;
            }
        }
        return matches;
    }
}
class RelatedPersonPane extends RelatedPhotosPane {
    person;
    constructor(aside, origin_date, person) {
        super(aside, origin_date);
        this.person = person;
        this.text_header.textContent = `With ${this.person}`;
        this.renderMatches();
    }
    findImages() {
        let matches = {};
        for (var date in this.all_images) {
            let entry = this.all_images[date];
            if (!entry.people)
                continue;
            if (entry.people.includes(this.person)) {
                matches[date] = entry;
            }
        }
        return matches;
    }
}
class RelatedMonthPane extends RelatedPhotosPane {
    origin_date;
    constructor(aside, origin_date) {
        super(aside, origin_date);
        this.origin_date = origin_date;
        this.text_header.textContent = 'This Month';
        this.renderMatches();
    }
    findImages() {
        let matches = {};
        let origin_split = this.origin_date.split('/');
        for (var date in this.all_images) {
            let entry = this.all_images[date];
            let date_split = date.split('/');
            if (Number(origin_split[2]) == Number(date_split[2])) {
                if (Number(origin_split[0]) == Number(date_split[0])) {
                    matches[date] = entry;
                }
            }
        }
        return matches;
    }
}
const Manager = new PageManager();
