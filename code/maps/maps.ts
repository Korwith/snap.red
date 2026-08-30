// dedicated mapping page
class PageMaps extends Page {
    manager: PageManager;
    map: MainMap;
    satellite: SatelliteToggleButton;

    constructor(manager: PageManager) {
        super(manager, 'maps');
        this.manager = manager;
        this.element.classList.add('maps');
        this.map = new MainMap(this);
        this.satellite = new SatelliteToggleButton(this);
    }

    public toggleSatelliteView(): boolean {
        this.element.classList.toggle('satellite');
        const val: boolean = this.element.classList.contains('satellite');
        this.map.toggleSatelliteView(val);
        return val;
    }

    public reload(): void {
        if (!this.manager.userHasMaps()) this.manager.showPage('content');
        this.map.reload();
    }
}

// generic type inherited by the main map and under selected photos
type MapTheme = 'dark' | 'light' | 'satellite';
abstract class GenericMap {
    manager: PageManager;
    element: HTMLElement;
    id: string;
    map: L.Map;

    theme: MapTheme = 'dark';
    tile_layer!: L.TileLayer;

    theme_urls: Record<MapTheme, string> = {
        dark: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        light: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    };


    constructor(manager: PageManager, element: HTMLElement, id: string) {
        this.manager = manager;
        this.element = element;
        this.id = id;

        this.element.setAttribute('id', this.id);
        this.map = L.map(this.element).setView([39.4123, -77.4255], 13);

        window.onresize = () => this.map.invalidateSize();
        this.manager.sidebar.element.addEventListener('transitionend', () => this.map.invalidateSize());
        this.setTheme(this.theme);
    }

    public createImageMarker(date: string, id: number | string): L.Marker {
        const user: string = this.manager.fetchUserName();
        const entry: PhotoEntry | null = this.manager.fetchImageByDate(date);
        if (!entry) throw new Error('No images found at date');
        if (!entry.gps) throw new Error('No GPS coordinates found');

        const coordinates: L.LatLngTuple = entry.gps[id] as L.LatLngTuple;
        const url: string = `../media/${user}/IMG_${id}.jpg`;
        const icon: L.DivIcon = L.divIcon({
            className: 'marker',
            html: `<img src="${url}"></img>`,
            iconSize: [75, 75],
            iconAnchor: [75 / 2, 75],
        });

        return L.marker(coordinates, { icon: icon });
    }

    // appends the marker directly to this map instance
    public appendImageMarker(marker: L.Marker) {
        marker.addTo(this.map);
    }

    // changes the theme of the map, currently allows for light and dark
    public setTheme(theme: MapTheme): void {
        this.theme = theme;
        if (this.tile_layer) {
            this.map.removeLayer(this.tile_layer);
        }

        const attributions: Record<MapTheme, string> = {
            dark: '&copy; CARTO',
            light: '&copy; CARTO',
            satellite: '&copy; Esri'
        };

        this.tile_layer = L.tileLayer(this.theme_urls[this.theme], {
            attribution: attributions[this.theme],
            maxZoom: 18,
            minZoom: 4,
        }).addTo(this.map);
    }

    // handles satellite view (from button press)
    public toggleSatelliteView(force: boolean) {
        if (force) return this.setTheme('satellite');
        this.setTheme(this.manager.fetchTheme());
    }

    // reloads map
    public reload(): void {
        this.map.invalidateSize();
        this.setTheme(this.theme);
    }
}

// map shown on the maps page
class MainMap extends GenericMap {
    page: PageMaps;
    clusters: L.MarkerClusterGroup;

    constructor(page: PageMaps) {
        super(page.manager, page.element, 'main_map');
        this.page = page;
        this.clusters = L.markerClusterGroup();
        this.map.addLayer(this.clusters);

        this.addMarkers();
    }

    // scans current selected user and plots tagged points on the large map
    // create seperate methods for generic map type later so i can incorporate maps elsewhere
    public addMarkers(): void {
        const user: string = this.manager.fetchUserName();
        const photo_data: PhotoDatabase = this.manager.fetchUserImages(null);

        const add_markers: L.Marker[] = [];

        for (const date in photo_data) {
            const entry: PhotoEntry = photo_data[date];
            if (!entry.gps) continue;

            for (const id in entry.gps) {
                const image_marker: L.Marker = this.createImageMarker(date, id);
                image_marker.on('click', (event: L.LeafletMouseEvent) => {
                    this.manager.openImageByDate(date, user);
                })

                add_markers.push(image_marker);
            }
        }

        // add all markers to the cluster group at once
        this.clusters.addLayers(add_markers);
    }

    // reloads and re-adds clusters
    public override reload(): void {
        super.reload();
        this.clusters.clearLayers();
        this.addMarkers();
    }
}

class SatelliteToggleButton {
    page: PageMaps;
    element: HTMLElement;

    constructor(page: PageMaps) {
        this.page = page;
        this.element = document.createElement('button');
        this.element.classList.add('satellite');
        this.element.textContent = 'Satellite Map';
        L.DomEvent.disableClickPropagation(this.element);

        this.element.onclick = (e: PointerEvent) => this.onclick(e);
        page.element.appendChild(this.element);
    }

    public onclick(e: PointerEvent): void {
        const sat: boolean = this.page.toggleSatelliteView();
        this.element.classList.toggle('vector', !sat);
    }
}