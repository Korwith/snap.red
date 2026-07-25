"use strict";
// abstract base container for a collection of media frame elements
class MediaHolder {
    manager;
    entries;
    element;
    // creates the media holder element and appends it to the parent
    constructor(manager, parent) {
        this.manager = manager;
        this.entries = [];
        this.element = document.createElement('div');
        this.element.classList.add('media_holder');
        parent.appendChild(this.element);
    }
    // removes all media entries from the holder
    clear() {
        for (const entry of this.entries) {
            entry.remove();
        }
        this.entries = [];
    }
}
// placeholder holder for video media entries
class VideoHolder extends MediaHolder {
    videos;
    // creates the video holder element
    constructor(manager, parent) {
        super(manager, parent);
        this.videos = [];
        this.element.classList.add('video_holder');
        this.load();
    }
    // loads video entries into the holder
    load() {
        const videos = this.manager.fetchUserVideos();
        if (!videos)
            throw new Error('No videos found');
        for (const date in videos) {
            const video_frame = new MediaFrameVideo(this, date);
            this.videos.push(video_frame);
        }
    }
    remove() {
        for (const video of this.videos) {
            video.remove();
        }
        this.element.remove();
    }
}
// abstract base for a grid of photo frames with batched loading
class PhotoGrid extends MediaHolder {
    index;
    photos;
    complete;
    // initializes the photo grid with an empty photo list
    constructor(manager, parent) {
        super(manager, parent);
        this.index = 0;
        this.photos = [];
        this.complete = false;
        this.element.classList.add('photo_grid');
    }
    // removes all photos and resets the batch index
    clear() {
        for (const photo of this.photos) {
            photo.remove();
        }
        this.photos = [];
        this.index = 0;
        this.complete = false;
    }
}
// abstract base for a horizontally scrollable labeled row of photos
class PhotoRow extends MediaHolder {
    span;
    internal;
    exclude_date;
    // creates the row element with a header label and internal scroll grid
    constructor(manager, parent, exclude_date) {
        super(manager, parent);
        this.exclude_date = exclude_date;
        this.element.classList.add('photo_row');
        this.span = document.createElement('span');
        this.internal = new PhotoRowInternal(manager, this.element);
        this.span.classList.add('row_header');
        this.internal.element.classList.add('internal_scroll');
        this.element.appendChild(this.span);
    }
    // sets the text of the row's header label
    setHeaderText(text) {
        this.span.textContent = text;
    }
    // removes the internal grid and the row element from the dom
    remove() {
        this.internal.remove();
        this.element.remove();
    }
}
// the inner photo grid that sits inside a photo row
class PhotoRowInternal extends PhotoGrid {
    // creates the internal grid element
    constructor(manager, parent) {
        super(manager, parent);
    }
    // removes all photos and detaches the grid element
    remove() {
        this.clear();
        this.element.remove();
    }
    // loads photos into the internal grid
    load() {
    }
}
// a photo row showing all photos taken at a specific location
class PhotoRowLocation extends PhotoRow {
    location;
    // creates the row and loads photos matching the given location
    constructor(manager, parent, location, exclude_date) {
        super(manager, parent, exclude_date);
        this.location = location;
        this.setHeaderText('This Location');
        this.load();
    }
    // populates the row with all photos from this location
    load() {
        const matches = this.manager.fetchUserImagesByLocation(this.location);
        if (Object.keys(matches).length <= 1)
            return this.remove();
        for (const date in matches) {
            if (date == this.exclude_date)
                continue;
            const figure = new MediaFramePhoto(this.internal, date);
        }
    }
}
// a photo row showing all photos featuring a specific person
class PhotoRowPerson extends PhotoRow {
    person;
    // creates the row and loads photos featuring the given person
    constructor(manager, parent, person, exclude_date) {
        super(manager, parent, exclude_date);
        this.person = person;
        this.setHeaderText('With ' + this.person);
        this.load();
    }
    // populates the row with all photos featuring this person
    load() {
        const matches = this.manager.fetchUserImagesByPerson(this.person);
        if (Object.keys(matches).length <= 1)
            return this.remove();
        for (const date in matches) {
            if (date == this.exclude_date)
                continue;
            const figure = new MediaFramePhoto(this.internal, date);
        }
    }
}
// a photo row showing all photos taken in a specific month and year
class PhotoRowMonth extends PhotoRow {
    month;
    year;
    date_handler;
    // creates the row and loads photos from the given month and year
    constructor(manager, parent, month, year, exclude_date) {
        super(manager, parent, exclude_date);
        this.month = month;
        this.year = year;
        this.date_handler = new DateManager();
        this.load();
        this.setHeaderText(`${this.date_handler.dateIDtoName(month)} 20${this.year}`);
    }
    // populates the row with photos from this month and year
    load() {
        const manager = this.manager;
        const matches = manager.fetchUserImagesByMonthAndYear(this.month, this.year);
        if (Object.keys(matches).length <= 1)
            return this.remove();
        for (const date in matches) {
            if (date == this.exclude_date)
                continue;
            const figure = new MediaFramePhoto(this.internal, date);
        }
    }
}
// abstract base for a single media item displayed as a figure element
class MediaFrame {
    holder;
    date;
    element;
    image;
    date_label;
    caption;
    // creates the figure element with image, date label, and caption
    constructor(holder, date) {
        this.holder = holder;
        this.date = date;
        this.element = document.createElement('figure');
        this.element.classList.add('media_frame');
        this.element.setAttribute('data-date', date);
        this.image = document.createElement('img');
        this.date_label = document.createElement('div');
        this.caption = document.createElement('figcaption');
        this.date_label.classList.add('date');
        this.date_label.textContent = date;
        this.element.onclick = (e) => this.onclick(e);
        this.element.appendChild(this.image);
        this.element.appendChild(this.date_label);
        this.element.appendChild(this.caption);
        this.holder.element.appendChild(this.element);
    }
    // appends this frame to the top of the page
    setFeatured(index) {
        if (!index)
            return;
        this.element.style.setProperty('--importance', index.toString());
        this.element.classList.toggle('featured', true);
    }
    // removes this frame from the dom
    remove() {
        this.element.remove();
    }
}
// a media frame that displays a photo with its location caption
class MediaFramePhoto extends MediaFrame {
    date;
    // creates the photo frame and loads the photo data
    constructor(holder, date) {
        super(holder, date);
        this.date = date;
        this.load();
    }
    // sets the image src and caption from the photo entry at this date
    load() {
        const info = this.holder.manager.fetchImageByDate(this.date);
        if (!info)
            throw new Error(`Error: No photo found at ${this.date}`);
        this.caption.textContent = info.name;
        this.image.setAttribute('src', `../media/${this.holder.manager.fetchUserName()}/IMG_${info.id[0]}.jpg`);
    }
    // opens the full-size photo viewer for this photo
    onclick(e) {
        this.holder.manager.openImageByDate(this.date);
    }
}
// a media frame placeholder for video entries
class MediaFrameVideo extends MediaFrame {
    link;
    // creates the video frame
    constructor(holder, date) {
        super(holder, date);
        this.load();
    }
    // loads video data into the frame
    load() {
        const manager = this.holder.manager;
        const user_videos = manager.fetchUserVideos();
        if (!user_videos)
            throw new Error('No videos found for user');
        const entry = user_videos[this.date];
        if (!entry)
            throw new Error('Video does not exist at date');
        this.link = entry.link;
        this.element.setAttribute('title', entry.name);
        this.image.setAttribute('loading', 'lazy');
        this.image.setAttribute('src', `/icon/thumbnail/${entry.thumbnail}`);
        this.caption.textContent = entry.name;
        this.element.onclick = (e) => this.onclick(e);
    }
    // handles click on the video frame
    onclick(e) {
        if (!this.link)
            return;
        window.open(this.link, '_blank');
    }
}
