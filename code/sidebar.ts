class PageSidebar {
    manager: PageManager;
    element: HTMLElement;
    timeline: SidebarTimeline;

    constructor(manager: PageManager) {
        this.manager = manager;
        this.element = document.createElement('nav');
        this.element.classList.add('sidebar');
        this.element.classList.add('subtle_stripes');
        this.timeline = new SidebarTimeline(this);
        this.timeline.fill();
        manager.element.appendChild(this.element);
    }
    
    toggle(force?: boolean): void {
        this.element.classList.toggle('shift', force);
    }

    reset(): void {
        this.timeline.reset();
    }
}

class SidebarTimeline {
    sidebar: PageSidebar;
    element: HTMLElement;
    date_handler: DateManager;

    constructor(sidebar: PageSidebar) {
        this.sidebar = sidebar;
        this.element = document.createElement('div');
        this.element.classList.add('timeline');
        this.date_handler = new DateManager();

        sidebar.element.appendChild(this.element);
    }

    fill(): void {
        const sidebar_data: SidebarStructure = this.sidebar.manager.fetchSidebarContent();
        const years: string[] = Object.keys(sidebar_data).reverse();

        for (const year of years) {
            const year_holder: TimelineYearHolder = new TimelineYearHolder(this, year);
            year_holder.addContent(sidebar_data);
        }
    }

    reset(): void {
        this.element.innerHTML = '';
        this.fill();
    }
}

class TimelineYearHolder {
    timeline: SidebarTimeline;
    year_id: string;
    element: HTMLElement;
    label: YearHolderLabel;

    constructor(timeline: SidebarTimeline, year_id: string) {
        this.timeline = timeline;
        this.element = document.createElement('div');
        this.year_id = year_id;
        this.label = new YearHolderLabel(this, year_id);

        this.element.classList.add('year_holder');
        this.element.setAttribute('year', `20${year_id}`);

        timeline.element.appendChild(this.element);
    }

    addContent(sidebar_data: SidebarStructure): void {
        const this_year_data: { [month: string]: { [date: string]: PhotoEntry } } = sidebar_data[this.year_id];

        for (const month_id in this_year_data) {
            const month_button: TimelineMonthButton = new TimelineMonthButton(this, month_id);
            month_button.setCount(Object.keys(this_year_data[month_id]).length);
        }
    }
}

class YearHolderLabel {
    year_holder: TimelineYearHolder;
    element: HTMLElement;

    constructor(year_holder: TimelineYearHolder, year: string) {
        this.year_holder = year_holder;
        this.element = document.createElement('div');
        this.element.classList.add('year_label');
        this.element.textContent = `20${year}`;
        this.year_holder.element.appendChild(this.element);
    }
}

class TimelineMonthButton {
    holder: TimelineYearHolder;
    month_id: string;
    element: HTMLElement;

    constructor(holder: TimelineYearHolder, month_id: string) {
        this.holder = holder;
        this.month_id = month_id;

        this.element = document.createElement('button');
        this.element.setAttribute('month', month_id);
        this.element.onclick = () => this.navigate();

        holder.element.appendChild(this.element);
    }

    setCount(count: number): void {
        const month: string = this.holder.timeline.date_handler.dateIDtoName(this.month_id);
        this.element.textContent = `${month} (${count})`
    }

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