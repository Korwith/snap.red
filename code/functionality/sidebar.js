"use strict";
// manages the navigation sidebar and its timeline component
class PageSidebar {
    manager;
    element;
    timeline;
    // builds the sidebar element and fills the timeline
    constructor(manager) {
        this.manager = manager;
        this.element = document.createElement('nav');
        this.element.classList.add('sidebar');
        this.element.classList.add('subtle_stripes');
        this.timeline = new SidebarTimeline(this);
        this.timeline.fill();
        manager.element.appendChild(this.element);
    }
    // slides the sidebar in or out
    toggle(force) {
        this.element.classList.toggle('shift', force);
    }
    // clears and refills the timeline for the current user
    reset() {
        this.timeline.reset();
    }
}
// renders the chronological photo timeline in the sidebar
class SidebarTimeline {
    sidebar;
    element;
    date_handler;
    // creates the timeline element and attaches it to the sidebar
    constructor(sidebar) {
        this.sidebar = sidebar;
        this.element = document.createElement('div');
        this.element.classList.add('timeline');
        this.date_handler = new DateManager();
        sidebar.element.appendChild(this.element);
    }
    // populates the timeline with year and month entries from the user's photos
    fill() {
        const manager = this.sidebar.manager;
        const count = Object.keys(manager.fetchUserImages(null)).length;
        const sidebar_data = manager.fetchSidebarContent();
        const years = Object.keys(sidebar_data).reverse();
        this.element.setAttribute('data-count', count.toString());
        for (const year of years) {
            const year_holder = new TimelineYearHolder(this, year);
            year_holder.addContent(sidebar_data);
        }
    }
    // clears and refills the timeline
    reset() {
        this.element.innerHTML = '';
        this.fill();
    }
}
// groups month buttons under a single year heading in the timeline
class TimelineYearHolder {
    timeline;
    year_id;
    element;
    label;
    // creates the year holder element and its label
    constructor(timeline, year_id) {
        this.timeline = timeline;
        this.element = document.createElement('div');
        this.year_id = year_id;
        this.label = new YearHolderLabel(this, year_id);
        this.element.classList.add('year_holder');
        this.element.setAttribute('year', `20${year_id}`);
        timeline.element.appendChild(this.element);
    }
    // adds a month button for each month present in the given year's data
    addContent(sidebar_data) {
        const this_year_data = sidebar_data[this.year_id];
        for (const month_id in this_year_data) {
            const month_button = new TimelineMonthButton(this, month_id);
            month_button.setCount(Object.keys(this_year_data[month_id]).length);
        }
    }
}
// displays the year heading above its month buttons
class YearHolderLabel {
    year_holder;
    element;
    // creates and appends the year label element
    constructor(year_holder, year) {
        this.year_holder = year_holder;
        this.element = document.createElement('div');
        this.element.classList.add('year_label');
        this.element.textContent = `20${year}`;
        this.year_holder.element.appendChild(this.element);
    }
}
// a clickable month entry in the sidebar that scrolls to that month's photos
class TimelineMonthButton {
    holder;
    month_id;
    element;
    // creates the month button element and attaches it to the year holder
    constructor(holder, month_id) {
        this.holder = holder;
        this.month_id = month_id;
        this.element = document.createElement('button');
        this.element.setAttribute('month', month_id);
        this.element.onclick = () => this.navigate();
        holder.element.appendChild(this.element);
    }
    // sets the button label to the month name and photo count
    setCount(count) {
        const month = this.holder.timeline.date_handler.dateIDtoName(this.month_id);
        this.element.textContent = `${month} (${count})`;
    }
    // scrolls the content area to the first photo from this month, loading batches if needed
    navigate() {
        const manager = this.holder.timeline.sidebar.manager;
        const content = manager.content;
        const photos = content.photos;
        const selector = `[data-date^="${this.month_id}/"][data-date$="${this.holder.year_id}"]`;
        let el = content.element.querySelector(selector);
        while (!el && !photos.complete) {
            photos.loadBatch();
            el = content.element.querySelector(selector);
        }
        if (window.innerWidth < 767) {
            this.holder.timeline.sidebar.manager.toggleSidebar(false);
        }
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
