interface IconEntry {
    icon: string;
    size?: string;
}

interface SocialEntry {
    gradient: GradientEntry;
    image: IconEntry;
    type: string;
}

interface SocialEntryList {
    [key: string]: SocialEntry;
}

interface GradientEntry {
    direction: string;
    colors: string[];
}

const Social_Icons: SocialEntryList = {
    'CashApp': {
        gradient: { direction: 'to bottom right', colors: ['#0cdb62', '#046b23'] },
        image: { icon: '../icon/cashapp.svg', size: '58%' },
        type: 'social',
    },
    'Discord': {
        gradient: { direction: 'to bottom right', colors: ['#5975da', '#030d2f'] },
        image: { icon: '../icon/discord.svg', size: '85%' },
        type: 'social',
    },
    'GitHub': {
        gradient: { direction: 'to bottom right', colors: ['#15171a', '#2b2e31'] },
        image: { icon: '../icon/github.svg', size: '84%' },
        type: 'social',
    },
    'Instagram': {
        gradient: { direction: 'to bottom left', colors: ['#7455A2', '#EC287C', '#F07B2B', '#F1C65C'] },
        image: { icon: '../icon/instagram.svg', size: '73%' },
        type: 'social',
    },
    'YouTube': {
        gradient: { direction: 'to top left', colors: ['#ff2222', '#9c0000'] },
        image: { icon: '../icon/youtube.svg', size: '70%' },
        type: 'social',
    },
    'Monkeytype': {
        gradient: { direction: 'to bottom right', colors: ['#414141', '#272727'] },
        image: { icon: '../icon/monkeytype.svg', size: '80%' },
        type: 'social',
    },
    'TikTok': {
        gradient: { direction: 'to bottom right', colors: ['#00504d', '#000000', '#470017'] },
        image: { icon: '../icon/tiktok.svg', size: '70%' },
        type: 'social',
    },
    'Spotify': {
        gradient: { direction: 'to bottom left', colors: ['#23d662', '#0f612c'] },
        image: { icon: '../icon/spotify.svg', size: '64%' },
        type: 'social'
    },
    'SoundCloud': {
        gradient: { direction: 'to right', colors: ['#ff6518', '#df2d00'] },
        image: { icon: '../icon/soundcloud.svg', size: '70%' },
        type: 'social',
    }
};
