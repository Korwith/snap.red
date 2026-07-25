"use strict";
// manages the main content area including the profile card, filters, and photo grid
class PageContent extends Page {
    card;
    filters;
    videos;
    photos;
    // builds the content area and attaches it to the page
    constructor(manager) {
        super(manager, 'content');
        this.element.classList.add('content');
        this.card = new ProfileCard(this);
        this.filters = new FilterHolder(this);
        this.photos = new ContentPhotoGrid(this, this.filters);
        this.load();
        this.element.onscroll = (e) => this.onscroll(e);
        this.manager.showPage('content');
        manager.element.appendChild(this.element);
    }
    // loads the profile card and photo grid
    load() {
        this.card.load();
        const videos = this.manager.fetchUserVideos();
        if (videos && Object.keys(videos).length > 0) {
            this.videos = new VideoHolder(this.manager, this.element);
        }
        this.photos.load();
    }
    // clears and reloads all content for the current user
    reset() {
        this.photos.clear();
        this.filters.reset();
        this.card.reset();
        this.videos?.remove();
        this.load();
    }
    // loads the next photo batch when the user scrolls near the bottom
    onscroll(e) {
        if (this.element.scrollHeight - this.element.scrollTop - this.element.clientHeight <= 100)
            this.photos.loadBatch();
    }
}
// extends photo grid to support filter-aware batched photo loading
class ContentPhotoGrid extends PhotoGrid {
    filters;
    filtered_list;
    // initializes the grid with a reference to the filter holder
    constructor(content, filters) {
        super(content.manager, content.element);
        this.filters = filters;
        this.filtered_list = {};
    }
    // loads featured photos that pass the current active filters
    loadFeatured() {
        const featured = this.manager.fetchUserImages(true);
        const featured_filtered = this.filters.fetchFilteredPhotos(featured);
        for (const date in featured_filtered) {
            const photo_data = featured_filtered[date];
            const photo = new MediaFramePhoto(this, date);
            photo.setFeatured(photo_data.featured || null);
            this.photos.push(photo);
        }
    }
    // loads the next batch of nine non-featured photos from the filtered list
    loadBatch() {
        if (this.complete)
            return;
        const keys = Object.keys(this.filtered_list);
        const next = 9 + Math.floor(this.index / 9) * 9;
        for (let i = this.index; i < next; i++) {
            const date = keys[i];
            if (!date) {
                this.complete = true;
                break;
            }
            const photo = new MediaFramePhoto(this, date);
            this.photos.push(photo);
        }
        this.index = next;
    }
    // rebuilds the filtered photo list from current filter state
    updateFilteredPhotos() {
        const photos = this.manager.fetchUserImages(false);
        this.filtered_list = this.filters.fetchFilteredPhotos(photos);
        this.filters.handleResultsText();
    }
    // clears and reloads all photos with current filters applied
    load() {
        this.clear();
        this.updateFilteredPhotos();
        this.loadFeatured();
        this.loadBatch();
    }
}
// displays the user's profile card with header, socials, and website link
class ProfileCard {
    content;
    element;
    header;
    socials;
    site;
    // builds the card and its sub-components
    constructor(content) {
        this.content = content;
        this.element = document.createElement('div');
        this.element.classList.add('card');
        this.header = new ProfileCardHeader(this);
        this.socials = new ProfileCardSocialRow(this);
        this.site = new ProfileCardWebsite(this);
        content.element.appendChild(this.element);
    }
    // loads data into all card sub-components
    load() {
        this.header.load();
        this.socials.load();
        this.site.load();
    }
    // resets the website section of the profile card
    reset() {
        this.site.reset();
        ;
    }
}
// displays the user's avatar, username, and bio at the top of the profile card
class ProfileCardHeader {
    card;
    element;
    icon;
    name_holder;
    username;
    bio;
    // builds the header layout with icon and name elements
    constructor(card) {
        this.card = card;
        this.element = document.createElement('div');
        this.icon = document.createElement('div');
        this.name_holder = document.createElement('div');
        this.username = document.createElement('span');
        this.bio = document.createElement('span');
        this.element.appendChild(this.icon);
        this.element.appendChild(this.name_holder);
        this.name_holder.appendChild(this.username);
        this.name_holder.appendChild(this.bio);
        this.element.classList.add('card_header');
        this.icon.classList.add('icon');
        this.name_holder.classList.add('name_holder');
        this.username.classList.add('username');
        this.bio.classList.add('bio');
        this.load();
        this.card.element.appendChild(this.element);
    }
    // populates the header with the current user's icon, name, and bio
    load() {
        const manager = this.card.content.manager;
        const card_info = manager.fetchUserCard();
        this.icon.style.setProperty('--image', `url('../icon/user/${card_info.icon}')`);
        this.username.textContent = manager.fetchUserName();
        this.bio.textContent = card_info.bio;
    }
}
// renders a row of social media link buttons for the user
class ProfileCardSocialRow {
    card;
    element;
    // creates the social row container element
    constructor(card) {
        this.card = card;
        this.element = document.createElement('div');
        this.element.classList.add('social_row');
        this.card.element.appendChild(this.element);
    }
    // removes all existing social buttons from the row
    clear() {
        this.element.innerHTML = '';
    }
    // populates the row with buttons for each of the user's social links
    load() {
        this.clear();
        const manager = this.card.content.manager;
        const socials = manager.fetchUserSocialDatabase();
        for (const key in socials) {
            const button = new SocialButton(this, key, socials[key]);
        }
    }
}
// a styled anchor button linking to a single social media profile
class SocialButton {
    row;
    element;
    // creates the button with gradient and icon from the social icon registry
    constructor(row, name, link) {
        this.row = row;
        this.element = document.createElement('a');
        this.row.element.appendChild(this.element);
        // Social_Icons global from icons.ts
        const info = Social_Icons[name];
        if (!info)
            throw new Error(`Invalid Social Media: ${name}`);
        this.element.style.setProperty('--gradient', `linear-gradient(${info.gradient.direction}, ${info.gradient.colors.join(', ')})`);
        this.element.style.setProperty('--image', `url('${info.image.icon}')`);
        this.element.style.setProperty('--size', info.image.size || '100%');
        this.element.setAttribute('title', name);
        this.element.setAttribute('href', link);
    }
}
// displays a stylized link card to the user's personal website
class ProfileCardWebsite {
    card;
    element;
    icon;
    text_holder;
    site_name;
    site_bio;
    // builds the website card element with icon and text slots
    constructor(card) {
        this.card = card;
        this.element = document.createElement('a');
        this.icon = document.createElement('div');
        this.text_holder = document.createElement('div');
        this.site_name = document.createElement('span');
        this.site_bio = document.createElement('span');
        this.element.setAttribute('target', '_blank');
        this.element.classList.add('website');
        this.icon.classList.add('icon');
        this.text_holder.classList.add('text_holder');
        this.site_name.classList.add('site_name');
        this.site_bio.classList.add('site_bio');
        this.element.appendChild(this.icon);
        this.element.appendChild(this.text_holder);
        this.text_holder.appendChild(this.site_name);
        this.text_holder.appendChild(this.site_bio);
        this.card.element.appendChild(this.element);
    }
    // retrieves the current user's website entry or null if absent
    fetchSite() {
        const manager = this.card.content.manager;
        const info = manager.fetchUserCard();
        return info.site || null;
    }
    // populates and shows the website card if the user has a site entry
    load() {
        const website = this.fetchSite();
        if (!website)
            return this.toggle(false);
        this.element.classList.remove('hide');
        this.element.setAttribute('href', website.url);
        this.element.setAttribute('title', website.name);
        this.element.style.setProperty('--gradient', `linear-gradient(to bottom right, ${website.gradient.join(', ')})`);
        this.icon.style.setProperty('--icon', `url('${website.icon}')`);
        this.site_name.textContent = website.name;
        this.site_bio.textContent = website.blurb;
    }
    // shows or hides the website card element
    toggle(force) {
        this.reset();
        this.element.classList.toggle('hide', force != null ? !force : true);
    }
    // clears the icon and text content of the website card
    reset() {
        this.icon.style.removeProperty('--image');
        this.site_name.textContent = '';
        this.site_bio.textContent = '';
    }
}
// holds all filter dropdowns and coordinates their combined state
class FilterHolder {
    content;
    element;
    list;
    results;
    // builds the filter bar with location, person, month, and year dropdowns
    constructor(content) {
        this.content = content;
        this.element = document.createElement('div');
        this.element.classList.add('filter_holder', 'hide_results');
        this.list = {
            location: new FilterDropdownLocation(this),
            person: new FilterDropdownPerson(this),
            month: new FilterDropdownMonth(this),
            year: new FilterDropdownYear(this)
        };
        this.results = document.createElement('span');
        this.results.classList.add('results');
        this.element.appendChild(this.results);
        this.content.element.appendChild(this.element);
    }
    // reloads all filter dropdowns and clears the results count
    reset() {
        for (const key in this.list) {
            const dropdown = this.list[key];
            dropdown.load();
        }
        this.results.textContent = '';
        this.element.classList.add('hide_results');
    }
    // applies all active filters to a photo database and returns the matches
    fetchFilteredPhotos(photos) {
        let filtered_photos = photos;
        for (const key in this.list) {
            const dropdown = this.list[key];
            filtered_photos = dropdown.filter(filtered_photos);
        }
        return filtered_photos;
    }
    // applies all filters except one to support per-dropdown visibility updates
    fetchFilteredPhotosExcept(photos, exclude) {
        let filtered = photos;
        for (const key in this.list) {
            const dropdown = this.list[key];
            if (dropdown === exclude)
                continue;
            filtered = dropdown.filter(filtered);
        }
        return filtered;
    }
    // refreshes each dropdown's option visibility based on cross-filter context
    updateAllVisibility() {
        const allPhotos = this.content.manager.fetchUserImages(null);
        for (const key in this.list) {
            const dropdown = this.list[key];
            const contextPhotos = this.fetchFilteredPhotosExcept(allPhotos, dropdown);
            dropdown.updateVisibility(contextPhotos);
        }
    }
    // updates the results count text and shows or hides it based on filter activity
    handleResultsText() {
        const photos = this.content.manager.fetchUserImages(null);
        const results = this.fetchFilteredPhotos(photos);
        const total = Object.keys(results).length;
        this.element.classList.toggle('hide_results', !this.isActive());
        if (this.isActive())
            this.results.textContent = `${total} Result${total == 1 ? '' : 's'}`;
    }
    // returns true if any filter dropdown has a non-placeholder selection
    isActive() {
        for (const key in this.list) {
            const dropdown = this.list[key];
            if (dropdown.isActive())
                return true;
        }
        return false;
    }
}
// abstract base for a filter dropdown that narrows the photo set
class FilterDropdown extends Dropdown {
    holder;
    // registers the dropdown with the filter holder and sets up click handling
    constructor(holder) {
        super(35);
        this.holder = holder;
        this.holder.element.appendChild(this.element);
        this.element.onclick = (e) => this.onclick(e);
    }
    // adds a non-selectable placeholder option as the first entry
    addPlaceholder(text) {
        const placeholder = new DropdownOption(this);
        placeholder.setText(text);
    }
    // closes all other open dropdowns in the filter bar when this one is clicked
    onclick(e) {
        const opened = Array.from(this.holder.element.querySelectorAll('.dropdown.open'));
        for (const dropdown of opened) {
            if (dropdown == this.element)
                continue;
            dropdown.classList.remove('open');
        }
    }
    // clears options and removes the active styling from this dropdown
    clear() {
        super.clear();
        this.element.classList.remove('used');
    }
    // marks the dropdown active and triggers a photo grid reload
    selected() {
        this.element.classList.toggle('used', this.isActive());
        this.holder.content.photos.load();
        this.holder.updateAllVisibility();
    }
    // returns true when a non-placeholder option is currently selected
    isActive() {
        return !!this.primary && this.options[0] !== this.primary;
    }
}
// filter dropdown for narrowing photos by location name
class FilterDropdownLocation extends FilterDropdown {
    // builds and populates the location filter dropdown
    constructor(holder) {
        super(holder);
        this.element.classList.add('location');
        this.load();
    }
    // populates the dropdown with unique location names from the user's photos
    load() {
        this.clear();
        const manager = this.holder.content.manager;
        const images = manager.fetchUserImages(null);
        this.addPlaceholder('Location');
        let found = [];
        for (const date in images) {
            const photo = images[date];
            if (found.includes(photo.name))
                continue;
            found.push(photo.name);
            const location_option = new DropdownOption(this);
            location_option.setText(photo.name);
        }
    }
    // returns only photos whose location matches the selected option
    filter(photos) {
        if (!this.primary || !this.isActive())
            return photos;
        const match = {};
        for (const date in photos) {
            const entry = photos[date];
            if (entry.name != this.primary.getText())
                continue;
            match[date] = entry;
        }
        return match;
    }
    // hides location options not present in the available photo set
    updateVisibility(availablePhotos) {
        const validNames = new Set();
        for (const date in availablePhotos)
            validNames.add(availablePhotos[date].name);
        for (let i = 1; i < this.options.length; i++) {
            this.options[i].element.classList.toggle('hidden', !validNames.has(this.options[i].getText()));
        }
        this.updateHeight();
    }
}
// filter dropdown for narrowing photos by a featured person
class FilterDropdownPerson extends FilterDropdown {
    // builds and populates the person filter dropdown
    constructor(holder) {
        super(holder);
        this.element.classList.add('person');
        this.load();
    }
    // populates the dropdown with valid people from the user's photos
    load() {
        this.clear();
        const manager = this.holder.content.manager;
        const images = manager.fetchUserImages(null);
        this.addPlaceholder('Friend');
        let found = [];
        for (const date in images) {
            const photo = images[date];
            if (!photo.people)
                continue;
            for (const person of photo.people) {
                if (!manager.isFeaturedPersonValid(person))
                    continue;
                if (found.includes(person))
                    continue;
                found.push(person);
                const person_option = new DropdownOption(this);
                person_option.setText(person);
                const highlight_color = HighlightUsers[person];
                if (!highlight_color)
                    continue;
                person_option.setHighlight(highlight_color);
            }
        }
    }
    // returns only photos that feature the selected person
    filter(photos) {
        if (!this.primary || !this.isActive())
            return photos;
        const match = {};
        for (const date in photos) {
            const entry = photos[date];
            if (!entry.people?.includes(this.primary.getText()))
                continue;
            match[date] = entry;
        }
        return match;
    }
    // hides person options not present in the available photo set
    updateVisibility(availablePhotos) {
        const valid_people = new Set();
        for (const date in availablePhotos) {
            for (const person of availablePhotos[date].people ?? [])
                valid_people.add(person);
        }
        for (let i = 1; i < this.options.length; i++) {
            this.options[i].element.classList.toggle('hidden', !valid_people.has(this.options[i].getText()));
        }
        this.updateHeight();
    }
}
// abstract base for time-based filter dropdowns
class FilterDropdownTime extends FilterDropdown {
    date_handler;
    // initializes the time filter with a date manager instance
    constructor(holder) {
        super(holder);
        this.date_handler = new DateManager();
        this.element.classList.add('time');
    }
}
// filter dropdown for narrowing photos by month
class FilterDropdownMonth extends FilterDropdownTime {
    // builds and populates the month filter dropdown
    constructor(holder) {
        super(holder);
        this.element.classList.add('month');
        this.load();
    }
    // populates the dropdown with all twelve months
    load() {
        this.clear();
        this.addPlaceholder('Month');
        for (var i = 0; i < 12; i++) {
            const option = new DropdownOption(this);
            option.element.setAttribute('month', (i + 1).toString().padStart(2, '0'));
            option.setText(this.date_handler.dateIDtoName((i + 1).toString()));
        }
    }
    // returns only photos taken in the selected month
    filter(photos) {
        if (!this.primary || !this.isActive())
            return photos;
        const month = this.primary.element.getAttribute('month');
        if (!month)
            return photos;
        const match = {};
        for (const date in photos) {
            const entry = photos[date];
            const found_month = date.slice(0, 2);
            if (month != found_month)
                continue;
            match[date] = entry;
        }
        return match;
    }
    // hides month options not represented in the available photo set
    updateVisibility(availablePhotos) {
        const valid_months = new Set();
        for (const date in availablePhotos)
            valid_months.add(date.slice(0, 2));
        for (let i = 1; i < this.options.length; i++) {
            const month = this.options[i].element.getAttribute('month');
            this.options[i].element.classList.toggle('hidden', !month || !valid_months.has(month));
        }
        this.updateHeight();
    }
}
// filter dropdown for narrowing photos by year
class FilterDropdownYear extends FilterDropdownTime {
    // builds and populates the year filter dropdown
    constructor(holder) {
        super(holder);
        this.element.classList.add('year');
        this.load();
    }
    // populates the dropdown with unique years from the user's photos
    load() {
        this.clear();
        const manager = this.holder.content.manager;
        this.addPlaceholder('Year');
        const images = manager.fetchUserImages(null);
        let found_id = [];
        for (const date in images) {
            const year_id = date.slice(-2);
            if (found_id.includes(year_id))
                continue;
            found_id.push(year_id);
            const year_option = new DropdownOption(this);
            year_option.element.setAttribute('year', year_id);
            year_option.setText(`20${year_id}`);
        }
    }
    // returns only photos taken in the selected year
    filter(photos) {
        if (!this.isActive() || !this.primary)
            return photos;
        const year = this.primary.element.getAttribute('year');
        if (!year)
            return photos;
        const match = {};
        for (const date in photos) {
            const entry = photos[date];
            const found_year = date.slice(-2);
            if (year != found_year)
                continue;
            match[date] = entry;
        }
        return match;
    }
    // hides year options not represented in the available photo set
    updateVisibility(availablePhotos) {
        const valid_years = new Set();
        for (const date in availablePhotos)
            valid_years.add(date.slice(-2));
        for (let i = 1; i < this.options.length; i++) {
            const year = this.options[i].element.getAttribute('year');
            this.options[i].element.classList.toggle('hidden', !year || !valid_years.has(year));
        }
        this.updateHeight();
    }
}
