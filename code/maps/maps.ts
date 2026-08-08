// dedicated mapping page
class PageMaps extends Page {
    manager: PageManager;
    map: MainMap;

    constructor(manager: PageManager) {
        super(manager, 'maps');
        this.manager = manager;
        this.element.classList.add('maps');
        this.map = new MainMap(this);
    }
}

// generic type inherited by the main map and under selected photos
abstract class GenericMap {
    manager: PageManager;
    element: HTMLElement;
    id: string;
    map: L.Map;

    theme: 'dark' | 'light' = 'dark';
    tile_layer!: L.TileLayer;

    theme_urls = {
        dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    }

    constructor(manager: PageManager, element: HTMLElement, id: string) {
        this.manager = manager;
        this.element = element;
        this.id = id;

        this.element.setAttribute('id', this.id);
        this.map = L.map(this.element).setView([39.4123, -77.4255], 13); // frederick, may update later

        L.tileLayer(this.theme_urls[this.theme], {
            attribution: '<a href="https://snap.red/">snap.red</a>',
            maxZoom: 18,
            minZoom: 4,
        }).addTo(this.map);
    }

    createImageMarker(date: string, id: number | string): L.Marker {
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
    appendImageMarker(marker: L.Marker) {
        marker.addTo(this.map);
    }

    // changes the theme of the map, currently allows for light and dark
    setTheme(theme: 'dark' | 'light'): void {
        this.theme = theme;
        if (this.tile_layer) this.map.removeLayer(this.tile_layer);

        this.tile_layer = L.tileLayer(this.theme_urls[this.theme], {
            attribution: '<a href="https://snap.red/">snap.red</a>',
            maxZoom: 18,
            minZoom: 4,
        }).addTo(this.map);
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
    addMarkers(): void {
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
}