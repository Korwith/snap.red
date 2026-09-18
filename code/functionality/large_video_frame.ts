class LargeVideoHolder extends LargeSelectionFrame {
    menu: LargeVideoMenu;

    constructor(manager: PageManager) {
        super(manager);
        this.element.classList.remove('main_photo_holder');
        this.element.classList.add('main_video_holder');
        this.menu = new LargeVideoMenu(this);
    }

    public openVideoByName(name: string, user?: string): void {
        this.toggle(true);
        this.menu.figure.player.setVideoInfo(name, user);
    }

    protected keypress = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'Backspace':
            case 'Escape':
                this.toggle(false);
                break;
        } // add more later
    }
}

class LargeVideoMenu extends LargeSelectionMenu {
    declare figure: LargeVideoFigure;

    constructor(holder: LargeVideoHolder) {
        super(holder);
        this.figure = new LargeVideoFigure(this);
        this.details = new LargeVideoDetails(this);
    }
}

class LargeVideoFigure extends LargeSelectionFigure {
    info: VideoInfoList;
    player: EmbeddedVideoPlayer;

    constructor(menu: LargeVideoMenu) {
        super(menu);
        this.element.classList.add('main', 'loaded');
        this.info = new VideoInfoList(this);
        this.player = new EmbeddedVideoPlayer(this);
        this.menu.element.appendChild(this.element);
    }

    public load(): void {

    }

    public reset(): void {

    }
}

class EmbeddedVideoPlayer {
    figure: LargeVideoFigure;

    element: HTMLElement;
    iframe: HTMLElement;
    title: VideoTitleBox;
    uploader: VideoUploaderBox;
    description: VideoDescriptionBox;

    video?: VideoEntry

    constructor(figure: LargeVideoFigure) {
        this.figure = figure;
        this.element = document.createElement('div');
        this.element.classList.add('video_player_holder');

        this.iframe = document.createElement('iframe');
        this.iframe.classList.add('video_player');

        this.element.appendChild(this.iframe);
        this.title = new VideoTitleBox(this);
        this.uploader = new VideoUploaderBox(this);
        this.description = new VideoDescriptionBox(this);

        this.figure.element.appendChild(this.element);
    }

    public setVideoInfo(name: string, user?: string): void {
        this.title.setText(name);
        this.uploader.setUser(user);

        const video: VideoEntry | null = this.figure.menu.holder.manager.fetchVideoByName(name, user);
        this.video = video || undefined;
        if (!video) throw new Error('This video does not exist');
        this.iframe.setAttribute('src', `https://www.youtube.com/embed/${video.id}`);
    }
}

abstract class VideoInformationBox {
    player: EmbeddedVideoPlayer;
    element: HTMLElement;

    constructor(player: EmbeddedVideoPlayer) {
        this.player = player;
        this.element = document.createElement('span');
        this.player.element.appendChild(this.element);
    }

    public setText(text: string) {
        this.element.textContent = text;
    }
}

class VideoTitleBox extends VideoInformationBox {
    text_node: HTMLElement;
    close: VideoCloseButton;

    constructor(player: EmbeddedVideoPlayer) {
        super(player);
        this.element.classList.add('title');

        this.text_node = document.createElement('span');
        this.text_node.classList.add('text_node');

        this.element.appendChild(this.text_node);
        this.close = new VideoCloseButton(this);
    }

    public override setText(text: string): void {
        this.text_node.textContent = text;
    }
}

abstract class VideoNavigationButton {
    box: VideoInformationBox;
    element: HTMLElement;

    constructor(box: VideoInformationBox) {
        this.box = box;
        this.element = document.createElement('button');
        this.element.classList.add('control');
        this.box.element.appendChild(this.element)
    }

    protected abstract onclick(): void;
}

class VideoCloseButton extends VideoNavigationButton {
    constructor(box: VideoTitleBox) {
        super(box);
        this.element.classList.add('video_close', 'square');
        this.element.onclick = () => this.onclick();
    }

    protected onclick(): void {
        this.box.player.figure.menu.holder.toggle(false);
    }
}

class VideoUploaderBox extends VideoInformationBox {
    text_node: HTMLElement;
    external: VideoExternalLink;
    subscribe: UploaderSubscribeLink;

    constructor(player: EmbeddedVideoPlayer) {
        super(player);
        this.element.classList.add('uploader');

        this.text_node = document.createElement('span');
        this.text_node.classList.add('text_node');

        this.element.appendChild(this.text_node);
        this.external = new VideoExternalLink(this);
        this.subscribe = new UploaderSubscribeLink(this);
    }

    public setUser(user?: string) {
        const manager: PageManager = this.player.figure.menu.holder.manager;
        user ??= manager.fetchUserName();

        const profile: ProfileCardEntry = manager.fetchUserCard(user);
        this.setText(user);

        this.external.setLink(this.player.video?.id || null);
        this.subscribe.setLink(user);

        this.element.style.setProperty('--icon-url', `url('../icon/user/${profile.icon}')`);
    }
    public override setText(text: string): void {
        this.text_node.textContent = text;
    }
}

abstract class UploaderLink {
    uploader: VideoUploaderBox;
    user?: string;
    element: HTMLElement;
    
    constructor(uploader: VideoUploaderBox, user?: string) {
        this.uploader = uploader;
        this.user = user;
        this.element = document.createElement('a');
        this.uploader.element.appendChild(this.element);
    }
}

class VideoExternalLink extends UploaderLink {
    service: string = 'YouTube'; // maybe we will have options later

    constructor(uploader: VideoUploaderBox) {
        super(uploader);
        this.element.classList.add('external');
        this.element.textContent = `Open in ${this.service}`;
    }

    public setLink(id: string | null): void {
        this.element.setAttribute('href', `https://youtu.be/${id}`);
    }
}

class UploaderSubscribeLink extends UploaderLink {
    constructor(uploader: VideoUploaderBox, user?: string) {
        super(uploader, user);
        this.element.classList.add('subscribe');
        this.element.textContent = 'Subscribe';

        this.setLink(this.user);
        this.uploader.element.appendChild(this.element);
    }

    public setLink(new_user?: string): void {
        const manager: PageManager = this.uploader.player.figure.menu.holder.manager;

        // Update the stored user if a new one was provided, otherwise fallback to fetch
        this.user = new_user ?? this.user ?? manager.fetchUserName();

        const socials: ProfileSocialDatabase = manager.fetchUserSocialDatabase(this.user);

        if ('YouTube' in socials) {
            this.element.setAttribute('href', socials['YouTube']);
        } else {
            this.element.removeAttribute('href');
        }
    }
}

class VideoDescriptionBox extends VideoInformationBox {
    constructor(player: EmbeddedVideoPlayer) {
        super(player);
        this.element.classList.add('description');
    }
}

class VideoInfoList extends SelectionInfoList {
    constructor(figure: LargeVideoFigure) {
        super(figure);
        figure.element.appendChild(this.element);
    }

    public load(): void {

    }

    public reset(): void {

    }
}

class LargeVideoDetails extends LargeSelectionDetails {
    constructor(menu: LargeVideoMenu) {
        super(menu);
    }

    public load(): void {

    }

    public reset(): void {

    }
}