// handles conversion between date id strings and human-readable names
class DateManager {
    // converts a numeric month id string to its full localized name
    dateIDtoName(id: string): string {
        const int: number = parseInt(id);
        const date: Date = new Date();
        date.setMonth(int - 1);
        return date.toLocaleString('en-US', { month: 'long' })
    }
}

// abstract base for a collapsible dropdown ui element
abstract class Dropdown {
    options: DropdownOption[];
    primary?: DropdownOption;
    height: number;
    element: HTMLElement;

    // initializes the dropdown element with a given row height
    constructor(height: number) {
        this.options = [];
        this.height = height;
        this.element = document.createElement('div');
        this.element.classList.add('dropdown');
    }

    // adds an option to the list and updates the dropdown height
    registerOption(option: DropdownOption): void {
        this.options.push(option);
        this.updateHeight();
    }

    // sets the given option as the active primary selection
    setPrimaryOption(option: DropdownOption, skip_select?: boolean): void {
        if (this.primary && option != this.primary)
            this.primary.removePrimary();

        option.setPrimary();
        this.primary = option;

        this.toggle(false)
        if (!skip_select) this.selected(option);
    }

    // removes all options and resets the dropdown to empty state
    clear(): void {
        for (const option of this.options) {
            option.element.remove();
        }
        this.options = [];
        this.primary = undefined;
        this.updateHeight();
    }

    // opens or closes the dropdown
    toggle(force?: boolean): void {
        if (force !== false && this.element.classList.contains('empty')) return;
        this.element.classList.toggle('open', force);
        if (!this.element.classList.contains('open')) {
            this.element.style.overflowY = 'hidden';
            this.element.scrollTop = 0;
        } else {
            this.element.style.overflowY = '';
        }
    }

    // recalculates the collapsed and expanded height css variables
    protected updateHeight(): void {
        const visible_count: number = this.options.filter(o => !o.element.classList.contains('hidden')).length;
        this.element.classList.toggle('empty', visible_count <= 1);
        const calculated_expanded: number = this.height * visible_count;
        this.element.style.setProperty('--height', `${this.height}px`);
        this.element.style.setProperty('--expanded-height', `${calculated_expanded > 300 ? 300 : calculated_expanded}px`);
        this.element.style.setProperty('--total-height', `${calculated_expanded}px`);
    }

    abstract load(): void;
    abstract selected(option: DropdownOption): void;
}

// represents a single selectable option within a dropdown
class DropdownOption {
    dropdown: Dropdown;
    element: HTMLElement;

    // creates the option element, registers it, and sets it as primary if first
    constructor(dropdown: Dropdown) {
        this.dropdown = dropdown;
        this.element = document.createElement('div');
        this.element.classList.add('option');
        this.element.onclick = (e: PointerEvent) => this.onclick(e);

        this.dropdown.registerOption(this);
        if (this.dropdown.options.length == 1)
            this.dropdown.setPrimaryOption(this, true);

        this.dropdown.element.appendChild(this.element);
    }

    // marks this option as the primary selected option
    setPrimary(): void {
        this.element.classList.add('primary');
    }

    // removes the primary selected styling from this option
    removePrimary(): void {
        this.element.classList.remove('primary');
    }

    // returns true if this option is currently the primary selection
    isPrimary(): boolean {
        return this.element.classList.contains('primary');
    }

    // marks this option as highlighted
    setHighlight(color: string): void {
        this.element.classList.add('highlighted', color)
    } 

    // applies a background image to this option
    setImage(url: string): void {
        this.element.classList.add('image');
        this.element.style.setProperty('--image', `url('${url}')`)
    }

    // sets the visible text label of this option
    setText(text: string): void {
        this.element.textContent = text;
    }

    // returns the visible text label of this option
    getText(): string {
        return this.element.textContent;
    }

    // selects this option or toggles the dropdown if it is already primary
    private onclick(e: PointerEvent): void {
        if (this.element.classList.contains('primary'))
            this.dropdown.toggle();
        else
            this.dropdown.setPrimaryOption(this);

    }
}
