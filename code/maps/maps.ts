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
    element: HTMLElement;
    id: string;
    map: L.Map;

    constructor(element: HTMLElement, id: string) {
        this.element = element;
        this.id = id;

        this.element.setAttribute('id', this.id);
        this.map = L.map(this.id).setView([39.4123, -77.4255], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
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
        super(page.element, 'main_map');
        this.page = page;
        this.clusters = L.markerClusterGroup();
        this.map.addLayer(this.clusters);

        this.addMarkers();
    }

    // scans current selected user and plots tagged points on the large map
    // create seperate methods for generic map type later so i can incorporate maps elsewhere
    // scans current selected user and plots tagged points on the large map
    addMarkers(): void {
        const manager: PageManager = this.page.manager;
        const user: string = manager.fetchUserName();
        const photo_data: PhotoDatabase = manager.fetchUserImages(null);

        const add_markers: L.Marker[] = [];

        for (const date in photo_data) {
            const entry: PhotoEntry = photo_data[date];
            if (!entry.gps) continue;

            for (const id in entry.gps) {
                const coordinates: L.LatLngTuple = entry.gps[id] as L.LatLngTuple;
                const url: string = `../media/${user}/IMG_${id}.jpg`;
                const icon: L.DivIcon = L.divIcon({
                    className: 'marker',
                    html: `<img src="${url}"></img>`,
                    iconSize: [75, 75],
                    iconAnchor: [75 / 2, 75],
                });

                const marker: L.Marker = L.marker(coordinates, { icon: icon });
                add_markers.push(marker);
            }
        }

        // Add all markers to the cluster group at once
        this.clusters.addLayers(add_markers);
    }
}