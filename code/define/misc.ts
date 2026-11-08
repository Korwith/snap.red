/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

// handles conversion between date id strings and human-readable names
class DateManager {
    // converts a numeric month id string to its full localized name
    dateIDtoName(id: string): string {
        const int: number = parseInt(id);
        const date: Date = new Date(2000, int - 1);
        return date.toLocaleString('en-US', { month: 'long' })
    }
}

// handles inner photo data
class PhotoIDManager {
    // returns every photo id in the entry, in display order
    static list(entry: PhotoEntry): (string | number)[] {
        const ids: (string | number)[] = [];
        for (const item of entry.id) {
            if (typeof item === 'object') ids.push(...Object.keys(item));
            else ids.push(item);
        }
        return ids;
    }

    // returns the extra attributes stored with a photo id, or null if it was listed bare
    static attributes(entry: PhotoEntry, id: string | number): PhotoAttributes | null {
        for (const item of entry.id) {
            if (typeof item !== 'object') continue;
            const attributes: PhotoAttributes | undefined = item[String(id)];
            if (attributes) return attributes;
        }
        return null;
    }

    // returns the gps coords of a photo, if it has any
    static coords(entry: PhotoEntry, id: string | number): [number, number] | null {
        return this.attributes(entry, id)?.coords ?? null;
    }

    // returns the ids of photos in the entry that have gps coords
    static withCoords(entry: PhotoEntry): (string | number)[] {
        return this.list(entry).filter(id => this.coords(entry, id));
    }
}
