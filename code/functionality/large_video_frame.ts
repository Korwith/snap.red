/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

class LargeVideoHolder extends LargeSelectionFrame<VideoEntry> {
    declare menu: LargeVideoMenu;

    constructor(manager: PageManager) {
        super(manager);
        this.element.classList.remove('main_photo_holder');
        this.element.classList.add('main_video_holder');
        this.menu = new LargeVideoMenu(this);
    }

    public openVideoByName(name: string, user?: string): void {
        user ??= this.manager.fetchUserName();
        const video: VideoEntry | null = this.manager.fetchVideoByName(name, user);
        this.selected = video;

        this.menu.figure.load(name, user);
        this.menu.details.load(name, user);
        this.toggle(true);
    }

    public override toggle(force?: boolean): void {
        super.toggle(force);
        if (!this.element.classList.contains('show')) {
            this.menu.figure.reset();
            this.menu.details.reset();
        }
    }

    protected keypress = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'Backspace':
            case 'Escape':
                this.toggle(false);
                break;
            case 'ArrowLeft':
                this.menu.figure.player.seekVideoTime('backward');
                break;
            case 'ArrowRight':
                this.menu.figure.player.seekVideoTime('forward');
                break;
            case 'k':
            case ' ':
                e.preventDefault();
                this.menu.figure.player.toggleVideoPlayback();
                break;
        }
    }
}

class LargeVideoMenu extends LargeSelectionMenu<VideoEntry> {
    declare holder: LargeVideoHolder;
    declare figure: LargeVideoFigure;
    declare details: LargeVideoDetails;

    constructor(holder: LargeVideoHolder) {
        super(holder);
        this.figure = new LargeVideoFigure(this);
        this.details = new LargeVideoDetails(this);
    }
}

class LargeVideoFigure extends LargeSelectionFigure<VideoEntry> {
    declare menu: LargeVideoMenu;
    declare info: VideoInfoList;
    player: EmbeddedVideoPlayer;

    constructor(menu: LargeVideoMenu) {
        super(menu);
        this.element.classList.add('main', 'loaded');
        this.info = new VideoInfoList(this);
        this.player = new EmbeddedVideoPlayer(this);
        this.menu.element.appendChild(this.element);
    }

    public load(name: string, user?: string): void {
        this.reset();
        this.player.setNewVideo(name, user);
        this.info.load(name, user);
    }

    public reset(): void {
        this.player.reset();
        this.info.reset();
    }
}

interface VideoInformation {
    playing: boolean;
    time: number;
}

class EmbeddedVideoPlayer {
    figure: LargeVideoFigure;

    element: HTMLElement;
    placeholder: HTMLElement;
    iframe: HTMLIFrameElement;
    title: VideoTitleBox;
    uploader: VideoUploaderBox;
    description: VideoDescriptionBox;

    video?: VideoEntry;
    video_info: VideoInformation;

    constructor(figure: LargeVideoFigure) {
        this.figure = figure;
        this.video_info = { time: 0, playing: false };
        this.element = document.createElement('div');
        this.element.classList.add('video_player_holder');

        this.placeholder = document.createElement('div');
        this.placeholder.classList.add('placeholder');

        this.iframe = document.createElement('iframe');
        this.iframe.classList.add('video_player');
        this.iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        this.iframe.setAttribute('allowfullscreen', 'true');
        this.iframe.addEventListener('load', () => this.loaded());
        this.iframe.addEventListener('error', () => this.error());
        window.addEventListener('message', (e: MessageEvent) => this.captureYouTubeData(e));

        this.element.appendChild(this.placeholder);
        this.element.appendChild(this.iframe);
        this.title = new VideoTitleBox(this);
        this.uploader = new VideoUploaderBox(this);
        this.description = new VideoDescriptionBox(this);

        this.figure.element.appendChild(this.element);
    }

    public setNewVideo(name: string, user?: string): void {
        const video: VideoEntry | null = this.figure.menu.holder.manager.fetchVideoByName(name, user);
        this.video = video || undefined;
        if (!video) throw new Error('This video does not exist');

        this.title.setText(name);
        this.uploader.setUser(user);
        this.description.setText(video.description || '');
        this.iframe.setAttribute('src', `https://www.youtube.com/embed/${video.id}?enablejsapi=1&autoplay=1&origin=${encodeURIComponent(window.location.origin)}`);
    }

    // controls the youtube player
    private sendIFrameCommand(event: string, args?: any[]): void {
        this.iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: event,
            args: args || []
        }), '*');
    }

    public toggleVideoPlayback(): void {
        if (!this.video_info.playing) this.sendIFrameCommand('playVideo');
        else this.sendIFrameCommand('pauseVideo');
    }

    public seekVideoTime(direction: 'forward' | 'backward') {
        const change = direction === 'forward' ? 10 : -10;
        const set_time = Math.max(0, (this.video_info.time || 0) + change);

        this.video_info.time = set_time;
        this.sendIFrameCommand('seekTo', [set_time, true]);
    }

    public reset(): void {
        this.iframe.removeAttribute('src');
        this.iframe.classList.remove('loaded');
        this.title.setText('');
        this.description.setText('');
        this.video = undefined;
    }

    private loaded(): void {
        this.registerYoutubeListener();
        this.iframe.classList.add('loaded');

        // make sure the youtube iframe understands our listening request
        // incase its not caught immediately
        setTimeout(() => this.registerYoutubeListener(), 500);
    }

    // handles css mainly
    private error(): void {
        this.iframe.classList.add('error');
    }

    private captureYouTubeData(event: MessageEvent) {
        if (!event.origin.includes('youtube.com')) return;
        try {
            const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

            if (parsed?.event === 'infoDelivery' && parsed?.info) {
                // updating player state status
                if (parsed.info.playerState !== undefined) {
                    this.video_info.playing = parsed.info.playerState === 1;

                    // updates various player elements
                    this.title.playback_control.updatePlaybackStatus(this.video_info.playing);
                }

                if (parsed.info.currentTime !== undefined) this.video_info.time = parsed.info.currentTime;
            }
        }
        catch {
            // Suppress unparseable YouTube API messages
        }
    }

    private registerYoutubeListener(): void {
        this.iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'listening',
            id: crypto.randomUUID() || 'widget1'
        }), '*');
        this.sendIFrameCommand('addEventListener', ['onStateChange']);
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
    playback_control: VideoPlaybackButton;
    skip_backward: VideoTimeControlButton;
    skip_forward: VideoTimeControlButton;
    close: VideoCloseButton;

    constructor(player: EmbeddedVideoPlayer) {
        super(player);
        this.element.classList.add('title');

        this.text_node = document.createElement('span');
        this.text_node.classList.add('text_node');

        this.element.appendChild(this.text_node);
        this.playback_control = new VideoPlaybackButton(this);
        this.skip_backward = new VideoTimeControlButton(this, 'backward');
        this.skip_forward = new VideoTimeControlButton(this, 'forward')
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
        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        this.box.element.appendChild(this.element);
    }

    protected abstract onclick(e: PointerEvent): void;
}

class VideoCloseButton extends VideoNavigationButton {
    constructor(box: VideoTitleBox) {
        super(box);
        this.element.classList.add('video_close', 'square');
    }

    protected onclick(): void {
        this.box.player.figure.menu.holder.toggle(false);
    }
}

class VideoTimeControlButton extends VideoNavigationButton {
    direction: 'forward' | 'backward';

    constructor(box: VideoInformationBox, direction: 'forward' | 'backward') {
        super(box);
        this.direction = direction;

        // this.element.textContent = direction == 'forward' ? '+10s' : '-10s';
        this.element.classList.add('time', 'square', direction);
    }

    protected onclick(): void {
        this.box.player.seekVideoTime(this.direction);
    }
}

class VideoPlaybackButton extends VideoNavigationButton {
    playing: boolean;

    constructor(box: VideoInformationBox) {
        super(box);
        this.playing = false;
        this.element.classList.add('square', 'playback');
    }

    public updatePlaybackStatus(playing: boolean): void {
        this.playing = playing;
        this.element.classList.toggle('playing', playing);
    }

    protected onclick(): void {
        this.box.player.toggleVideoPlayback();
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

class VideoInfoList extends SelectionInfoList<VideoEntry> {
    declare figure: LargeVideoFigure;

    constructor(figure: LargeVideoFigure) {
        super(figure);
        figure.element.appendChild(this.element);
    }

    public load(name?: string, user?: string): void {

    }

    public reset(): void {

    }
}

class LargeVideoDetails extends LargeSelectionDetails<VideoEntry> {
    declare menu: LargeVideoMenu;
    header: VideoDetailsHeader;
    grid: VideoDetailsGrid;

    constructor(menu: LargeVideoMenu) {
        super(menu);
        this.header = new VideoDetailsHeader(this);
        this.grid = new VideoDetailsGrid(this);
        this.menu.element.appendChild(this.element);
    }

    public load(name: string, user?: string): void {
        this.grid.load(name, user);
    }

    public reset(): void {
        this.grid.reset();
    }
}

class VideoDetailsHeader extends MediaDetailsHeader<VideoEntry> {
    main: VideoMainHeaderRow;
    
    constructor(details: LargeSelectionDetails<VideoEntry>) {
        super(details);
        this.main = new VideoMainHeaderRow(this);
    }
}

class VideoMainHeaderRow extends MediaHeaderRow<VideoEntry> {
    span: HTMLElement;
    close: HolderCloseButton<VideoEntry>

    constructor(header: VideoDetailsHeader) {
        super(header);
        this.element.classList.add('main');

        this.span = document.createElement('span');
        this.element.appendChild(this.span);

        this.close = new DetailsCloseButton(this.header.details.menu.holder, this);
    }
}

class VideoDetailsGrid {
    details: LargeVideoDetails;
    video_rows: VideoRow[];
    element: HTMLElement;

    constructor(details: LargeVideoDetails) {
        this.details = details;
        this.video_rows = [];
        this.element = document.createElement('div');
        this.element.classList.add('grid_holder');
        this.details.element.appendChild(this.element);
    }

    public load(name: string, user?: string): void {
        const manager: PageManager = this.details.menu.holder.manager;
        user ??= manager.fetchUserName();
        const video: VideoEntry | null = manager.fetchVideoByName(name, user);
        if (!video) throw new Error('No video found with that name');
        const date: string | null = manager.fetchVideoDateByName(name, user);
        const exclude_date: string = date ?? '';

        this.reset();

        if (video.series) {
            const series_row: VideoRowSeries = new VideoRowSeries(manager, this.element, video.series, exclude_date, user);
            this.video_rows.push(series_row);
        }

        const user_row: VideoRowUser = new VideoRowUser(manager, this.element, exclude_date, user);
        this.video_rows.push(user_row);
    }

    public reset(): void {
        for (const row of this.video_rows) row.remove();
        this.video_rows = [];
    }
}