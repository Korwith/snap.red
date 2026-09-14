class LargeVideoHolder extends LargeSelectionFrame {
    constructor(manager: PageManager) {
        super(manager);
        this.element.classList.remove('main_photo_holder');
        this.element.classList.add('main_video_holder');
        console.log(this);
    }

    public openVideoByDate(date: string, user?: string): void {
        this.toggle(true);
    }
    
    protected keypress = (e: KeyboardEvent): void => {
        switch(e.key) {
            case 'Backspace':
            case 'Escape':
                this.toggle(false);
                break;
        } // add more later
    }
}