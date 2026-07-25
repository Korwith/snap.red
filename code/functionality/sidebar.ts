// manages the navigation sidebar and its timeline component
class PageSidebar {
    manager: PageManager;
    element: HTMLElement;
    timeline: SidebarTimeline;

    // builds the sidebar element and fills the timeline
    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('nav');
        this.element.classList.add('sidebar');
        this.element.classList.add('subtle_stripes');
        this.timeline = new SidebarTimeline(this);
        this.timeline.fill();
        manager.element.appendChild(this.element);
    }

    // slides the sidebar in or out
    toggle(force?: boolean): void {
        this.element.classList.toggle('shift', force);
    }

    // clears and refills the timeline for the current user
    reset(): void {
        this.timeline.reset();
    }
}

// renders the chronological photo timeline in the sidebar
class SidebarTimeline {
    sidebar: PageSidebar;
    element: HTMLElement;
    date_handler: DateManager;

    // creates the timeline element and attaches it to the sidebar
    constructor(sidebar: PageSidebar) {
        this.sidebar = sidebar;
        this.element = document.createElement('div');
        this.element.classList.add('timeline');
        this.date_handler = new DateManager();

        sidebar.element.appendChild(this.element);
    }

    // populates the timeline with year and month entries from the user's photos
    fill(): void {
        const manager: PageManager = this.sidebar.manager;
        const count: number = Object.keys(manager.fetchUserImages(null)).length;
        const sidebar_data: SidebarStructure = manager.fetchSidebarContent();
        const years: string[] = Object.keys(sidebar_data).reverse();
        this.element.setAttribute('data-count', count.toString());

        for (const year of years) {
            const year_holder: TimelineYearHolder = new TimelineYearHolder(this, year);
            year_holder.addContent(sidebar_data);
        }
    }

    // clears and refills the timeline
    reset(): void {
        this.element.innerHTML = '';
        this.fill();
    }
}

// groups month buttons under a single year heading in the timeline
class TimelineYearHolder {
    timeline: SidebarTimeline;
    year_id: string;
    element: HTMLElement;
    label: YearHolderLabel;

    // creates the year holder element and its label
    constructor(timeline: SidebarTimeline, year_id: string) {
        this.timeline = timeline;
        this.element = document.createElement('div');
        this.year_id = year_id;
        this.label = new YearHolderLabel(this, year_id);

        this.element.classList.add('year_holder');
        this.element.setAttribute('year', `20${year_id}`);

        timeline.element.appendChild(this.element);
    }

    // adds a month button for each month present in the given year's data
    addContent(sidebar_data: SidebarStructure): void {
        const this_year_data: { [month: string]: { [date: string]: PhotoEntry } } = sidebar_data[this.year_id];

        for (const month_id in this_year_data) {
            const month_button: TimelineMonthButton = new TimelineMonthButton(this, month_id);
            month_button.setCount(Object.keys(this_year_data[month_id]).length);
        }
    }
}

// displays the year heading above its month buttons
class YearHolderLabel {
    year_holder: TimelineYearHolder;
    element: HTMLElement;

    // creates and appends the year label element
    constructor(year_holder: TimelineYearHolder, year: string) {
        this.year_holder = year_holder;
        this.element = document.createElement('div');
        this.element.classList.add('year_label');
        this.element.textContent = `20${year}`;
        this.year_holder.element.appendChild(this.element);
    }
}

// a clickable month entry in the sidebar that scrolls to that month's photos
class TimelineMonthButton {
    holder: TimelineYearHolder;
    month_id: string;
    element: HTMLElement;

    // creates the month button element and attaches it to the year holder
    constructor(holder: TimelineYearHolder, month_id: string) {
        this.holder = holder;
        this.month_id = month_id;

        this.element = document.createElement('button');
        this.element.setAttribute('month', month_id);
        this.element.onclick = () => this.navigate();

        holder.element.appendChild(this.element);
    }

    // sets the button label to the month name and photo count
    setCount(count: number): void {
        const month: string = this.holder.timeline.date_handler.dateIDtoName(this.month_id);
        this.element.textContent = `${month} (${count})`
    }

    // scrolls the content area to the first photo from this month, loading batches if needed
    navigate(): void {
        const manager: PageManager = this.holder.timeline.sidebar.manager;
        const content: PageContent = manager.content;
        const photos: ContentPhotoGrid = content.photos;
        const selector: string = `[data-date^="${this.month_id}/"][data-date$="${this.holder.year_id}"]`;

        let el: Element | null = content.element.querySelector(selector);
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
