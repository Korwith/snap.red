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