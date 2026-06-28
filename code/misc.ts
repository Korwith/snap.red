class DateManager {
    dateIDtoName(id: string): string {
        const int: number = parseInt(id);
        const date: Date = new Date();
        date.setMonth(int - 1);
        return date.toLocaleString('en-US', { month: 'long' })
    }
}

abstract class Dropdown {
    options: DropdownOption[];
    primary?: DropdownOption;
    height: number;
    element: HTMLElement;

    constructor(height: number) {
        this.options = [];
        this.height = height;
        this.element = document.createElement('div');
        this.element.classList.add('dropdown');
    }

    registerOption(option: DropdownOption): void {
        this.options.push(option);
        this.updateHeight();
    }

    setPrimaryOption(option: DropdownOption, skip_select?: boolean): void {
        if (this.primary && option != this.primary)
            this.primary.removePrimary();

        option.setPrimary();
        this.primary = option;

        this.toggle(false)
        if (!skip_select) this.selected(option);
    }

    clear(): void {
        for (const option of this.options) {
            option.element.remove();
        }
        this.options = [];
        this.primary = undefined;
        this.updateHeight();
    }

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

    protected updateHeight(): void {
        const visibleCount: number = this.options.filter(o => !o.element.classList.contains('hidden')).length;
        this.element.classList.toggle('empty', visibleCount <= 1);
        const calculated_expanded: number = this.height * visibleCount;
        this.element.style.setProperty('--height', `${this.height}px`);
        this.element.style.setProperty('--expanded-height', `${calculated_expanded > 300 ? 300 : calculated_expanded}px`)
    }

    abstract load(): void;
    abstract selected(option: DropdownOption): void;
}

class DropdownOption {
    dropdown: Dropdown;
    element: HTMLElement;

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

    setPrimary(): void {
        this.element.classList.add('primary');
    }

    removePrimary(): void {
        this.element.classList.remove('primary');
    }

    isPrimary(): boolean {
        return this.element.classList.contains('primary');
    }

    setImage(url: string): void {
        this.element.classList.add('image');
        this.element.style.setProperty('--image', `url('${url}')`)
    }

    setText(text: string): void {
        this.element.textContent = text;
    }

    getText(): string {
        return this.element.textContent;
    }

    private onclick(e: PointerEvent): void {
        if (this.element.classList.contains('primary'))
            this.dropdown.toggle();
        else
            this.dropdown.setPrimaryOption(this);
        
    }
}