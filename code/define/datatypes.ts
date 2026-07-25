// used by data.ts

interface Database {
    [name: string]: UserEntry;
}

interface UserEntry {
    card: ProfileCardEntry;
    social: ProfileSocialDatabase;
    images: PhotoDatabase;
    videos?: VideoDatabase;
}

interface ProfileCardEntry {
    bio: string;
    icon: string;
    site?: ProfileWebsiteEntry;
}

interface ProfileSocialDatabase {
    [service: string]: string;
}

interface ProfileWebsiteEntry {
    url: string;
    icon: string;
    name: string;
    blurb: string;
    gradient: string[];
}

interface PhotoDatabase {
    [date: string]: PhotoEntry;
}

interface PhotoEntry {
    name: string;
    id: Array<string | number>;
    people?: string[];
    featured?: number;
    caption?: string;
}

interface VideoDatabase {
    [date: string]: VideoEntry;
}

interface VideoEntry {
    name: string;
    thumbnail: string;
    link: string;
}

interface SidebarStructure {
    [year: string]: {
        [month: string]: {
            [date: string]: PhotoEntry;
        }
    }
}

type HighlightedUserColor = 'pink' | 'purple'

interface HighlightedUserList {
    [key: string]: HighlightedUserColor;
}