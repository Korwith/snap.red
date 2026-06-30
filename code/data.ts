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

const HideUsers: string[] = ['Paris', 'Abiel'];
const Data: Database = {
    'Thaddeus': {
        card: {
            bio: 'Web Developer',
            icon: 'kircic.png',
            site: {
                url: 'https://www.kircic.org',
                icon: 'https://www.kircic.org/@main/icon/favicon.png',
                name: 'kircic.org',
                blurb: 'Development Portfolio',
                gradient: ['#0d8000', '#003785'],
            }
        },

        social: {
            'CashApp': 'https://cash.app/$thadreal',
            'Discord': 'https://discord.com/invite/p8ZZXZqnag',
            'GitHub': 'https://github.com/Korwith',
            'Instagram': 'https://www.instagram.com/thadcoolfr/',
            'YouTube': 'https://www.youtube.com/channel/UCLcCNfyLG_jQev4MdkHtCZw',
        },

        images: {
            '06/15/26': {
                name: 'Rivermist Park',
                id: [2815, 2817, 2818],
                people: ['Riley']
            },
            '05/31/26': {
                name: 'Railroad Tracks',
                id: [2665, 2668, 2673],
            },
            '05/18/26': {
                name: 'Cascade Falls',
                id: ['DSCN3405', 'DSCN3367', 'DSCN3383', 'DSCN3387', 'DSCN3365'],
                people: ['Paris'],
            },
            '05/17/26': {
                name: 'Downtown Frederick',
                id: ['DSCN3346', 'DSCN3339', 'DSCN3348', 'DSCN3358'],
                people: ['Paris'],
            },
            '05/15/26': {
                name: 'Boonsboro',
                id: ['DSCN3270', 'DSCN3265', 'DSCN3256', 'DSCN3255', 'DSCN3253', 'DSCN3264'],
                people: ['Paris'],
            },
            '05/11/26': {
                name: 'New York City',
                id: ['DSCN3200', 'DSCN3185', 'DSCN3180', 'DSCN3174', 'DSCN3172', 'DSCN2455'],
                people: ['Paris'],
            },
            '04/27/26': {
                name: 'Portsmouth, NH',
                id: ['DSCN3024', 'DSCN3043', 'DSCN3036', 'DSCN3032', 'DSCN3028'],
                people: ['Riley'],
            },
            '04/26/26': {
                name: 'Bangor, ME',
                id: ['2009', '2087', '2074', '2019', '2014', 'DSCN2966', 'DSCN2973', 'DSCN2991'],
                people: ['Riley', 'Ed'],
            },
            '04/25/26': {
                name: 'Acadia National Park',
                id: ['DSCN2911', 'DSCN2948', 'DSCN2812', 'DSCN2813', 'DSCN2838', 'DSCN2882', 'DSCN2886', 'DSCN2953'],
                featured: 5
            },
            '04/04/26': {
                name: 'Washington D.C.',
                id: ["DSCN2633", "DSCN2631", "DSCN2638", "DSCN2647", "DSCN2652", "DSCN2655", "DSCN2656", "DSCN2609"],
                people: ['Paris', 'Ely', 'Nolan']
            },
            '04/19/26': {
                name: 'Downtown Frederick',
                id: [1804, 1801, 1800, 1791],
                people: ['Paris'],
            },
            '03/10/26': {
                name: 'Weverton Cliffs',
                id: ['DSCN2449', 'DSCN2454', 'DSCN2452', 'DSCN2444', 'DSCN2441', 'DSCN2428', 'DSCN2427', 'DSCN2410', 'DSCN2456'],
                people: ['Paris'],
            },
            '03/09/26': {
                name: 'Railroad Tracks',
                id: ['DSCN2512', 'DSCN2530', 'DSCN2524', 'DSCN2512'],
            },
            '03/08/26': {
                name: 'Downtown Frederick',
                id: ['DSCN2362', 'DSCN2366'],
                people: ['Paris'],
            },
            '02/07/26': {
                name: 'Downtown Frederick',
                id: [1142, 1148, 1144, 1140],
                people: ['Paris']
            },
            '01/13/26': {
                name: "Harper's Ferry",
                id: ['DSCN2188', 'DSCN2232', 'DSCN2248', 'DSCN2266'],
                people: ['Paris', 'Edin'],
            },
            '01/11/26': {
                name: 'Washington D.C.',
                id: ['DSCN2105', 'DSCN2103', 'DSCN2073', 'DSCN2155', 'DSCN2127', 'DSCN2126', 'DSCN2111'],
                people: ['Paris', 'Edin', 'Aidan', 'Jordan', 'Liam']
            },
            '12/25/25': {
                name: 'Hagerstown',
                id: ['0687', '0693', '0702', '0703', '0677', '0661', '0658'],
                people: ['Paris'],
            },
            '11/26/25': {
                name: 'Downtown Frederick',
                id: ['DSCN1594', 'DSCN1600', 'DSCN1610'],
                people: ['Paris'],
            },
            '10/02/25': {
                name: 'Rivermist Park',
                id: ['0089', '0084', '0078', '0076'],
                people: ['Paris', 'Edin'],
            },
            '08/29/25': {
                name: 'Downtown Frederick',
                id: [9699, 9722, 9720, 9709],
            },
            '06/30/25': {
                name: 'Gettysburg',
                id: ['1181', '1197', '1219', '1204', '1216', '1189'],
                people: ['Paris', 'Riley', 'Ed', 'Maya']
            },
            '06/29/25': {
                name: 'Washington D.C.',
                id: ['1090', '1016', '1083', '1106', '1019', '1082', '1080', '1026', '1108', '0919', '0971', '0942', '1079', '1028', '1089', '0956', '0954'],
                people: ['Paris', 'Aidan', 'Jordan'],
                featured: 3,
            },
            '06/28/25': {
                name: 'Downtown Frederick',
                id: ['0762', '0857', '0753', '0826', '0794', '0858'],
                people: ['Paris']
            },
            '06/23/25': {
                name: 'Monocacy River',
                id: ['0673', '0676', '0623', '0660', '0683', '0596', '0708'],
                people: ['Paris', 'Riley', 'Liam', 'Ed', 'Aidan', 'Matt'],
            },
            '06/21/25': {
                name: 'Downtown Frederick',
                id: ['0482', '0498', '0367', '0417', '0383', '0517', '0547', '0466', '0436', '0393', '0512', '0438', '0502', '0441', '0459', '0540', '0352', '0514'],
                people: ['Paris']
            },
            '06/20/25': {
                name: 'Downtown Frederick',
                id: ['0313', '0312', '0322', '0269', '0297', '0321', '0279', '0284', '0241', '0290', '0252', '0257', '0211', '0203', '0262'],
                people: ['Paris']
            },
            '06/14/25': {
                name: 'Downtown Frederick',
                id: ['0051', '0061', '0043', '0077', '0108'],
                people: ['Paris'],
            },
            '06/11/25': {
                name: 'Whiterock',
                id: ['1050858', '1050930', '1050870', '1050939', '1050829', '1050812', '1050908', '1050817', '1050828', '1050791', '1050949', '1050881', '1050910'],
                people: ['Paris', 'Riley', 'Matt', 'Liam'],
            },
            '06/09/25': {
                name: 'Downtown Frederick',
                id: ['1050623', '1050704', '1050625', '1050662', '1050716', '1050630', '1050708', '1050627'],
                people: ['Paris']
            },
            '06/07/25': {
                name: 'Downtown Frederick',
                id: ['1050578', '1050479', '1050478', '1050566', '1050559', '1050545', '1050596', '1050586'],
                people: ['Paris']
            },
            '05/30/25': {
                name: 'Rio',
                id: ['1050362', '1050325', '1050341', '1050301', '1050374', '1050346', '1050354', '1050355'],
                people: ['Paris', 'Edin']
            },
            '05/23/25': {
                name: 'Gambrill',
                id: ['1050025', '1040978', '1040976', '1050030', '1050022', '1050020', '1050027'].reverse(),
                people: ['Paris', 'Edin', 'Liam', 'Kevin']
            },
            '05/20/25': {
                name: 'North Crossing',
                id: ['1040814', '1040833', '1040829', '1040859'],
                people: ['Paris', 'Riley', 'Edin', 'Liam', 'Kenyan', 'Ed', 'Aidan', 'Max']
            },
            '05/15/25': {
                name: 'Gambrill',
                id: ['1040436', '1040519', '1040492', '1040495', '1040479', '1040490'],
                people: ['Paris', 'Edin']
            },
            '05/12/25': {
                name: 'Rose Hill',
                id: ['1030878', '1030885', '1030883', '1030889', '1030873', '1030881'],
                people: ['Paris']
            },
            '05/07/25': {
                name: 'FCC',
                id: ['1030662', '1030669', '1030659', '1030657', '1030646', '1030569', '1030601', '1030661'],
            },
            '05/01/25': {
                name: 'Downtown Frederick',
                id: [8619, 8617, 8611, 8615, 8612, 'DSCN1430'],
                people: ['Paris', 'Edin', 'Kevin']
            },
            '04/23/25': {
                name: 'Monocacy River',
                id: [2347, 3457, 8541],
                people: ['Paris', 'Edin']
            },
            '04/18/25': {
                name: 'Monocacy River',
                id: [8363, 8364],
                people: ['Paris']
            },
            '04/08/25': {
                name: 'Gambrill',
                id: [8299, 8297, 8300, 8296],
                people: ['Paris', 'Edin']
            },
            '04/07/25': {
                name: 'Rose Hill',
                id: [8288, 8284]
            },
            '03/29/25': {
                name: 'Downtown Frederick',
                id: [8077, 8078, 8080],
                people: ['Paris']
            },
            '03/28/25': {
                name: 'Thurmont',
                id: [8024, 8022, 8039, 8027],
                people: ['Riley', 'Paris']
            },
            '03/27/25': {
                name: 'Rose Hill',
                id: [8004, 8005, 8007, 8011, 8014, 8016]
            },
            '03/18/25': {
                name: 'Rose Hill',
                id: [7958, 7957, 7961, 7962]
            },
            '03/12/25': {
                name: 'Monocacy River',
                id: [7883, 7877, 7885, 7900, 7906],
                people: ['Paris']
            },
            '03/10/25': {
                name: 'Railroad Tracks',
                id: [7838, 7844, 7854, 7839, 7841],
                people: ['Paris']
            },
            '03/08/25': {
                name: 'Railroad Tracks',
                id: [7819, 7784, 7800, 7816, 7795, 7813],
                people: ['Paris']
            },
            '03/07/25': {
                name: 'Westview',
                id: [7760, 7759, 7757],
                people: ['Paris']
            },
            '02/26/25': {
                name: 'Gambrill',
                id: [7639, 7643, 7613, 7625, 7617, 7618, 7619],
                people: ['Paris', 'Edin']
            },
            '02/10/25': {
                name: 'Rose Hill',
                id: [7444, 7438, 7436],
                people: ['Paris']
            },
            '01/19/25': {
                name: 'Amber Meadows',
                id: [7053, 7084, 7061, 7091, 7050],
                people: ['Paris']
            },
            '01/17/25': {
                name: 'Railroad Tracks',
                id: [10004, 10005, 10001, 10000, 10002, 10003],
                people: ['Riley'],
            },
            '12/30/24': {
                name: 'Amber Meadows',
                id: [6714, 6718, 6711],
                people: ['Paris']
            },
            '12/28/24': {
                name: 'Downtown Frederick',
                id: [6578, 6573, 6594, 6632, 6608],
                people: ['Paris'],
            },
            '12/23/24': {
                name: 'Heather Ridge',
                id: [6461, 6473, 6449]
            },
            '12/17/24': {
                name: 'Rosemont',
                id: [6272, 6263, 6275, 6277, 6281, 6297],
                people: ['Riley']
            },
            '12/13/24': {
                name: 'Downtown Frederick',
                id: [6194, 6171, 6197],
                people: ['Paris']
            },
            '12/02/24': {
                name: 'Amber Meadows',
                id: [6030, 6029, 6018]
            },
            '11/30/24': {
                name: 'Downtown Frederick',
                id: [5980, 5979, 5961, 5972],
                people: ['Paris']
            },
            '11/26/24': {
                name: 'Rosemont',
                id: [5858, 5845, 5851, 5854, 5863, 5869, 5881, 5900],
                people: ['Riley']
            },
            '11/23/24': {
                name: 'Downtown Frederick',
                id: [5798, 5779, 5769, 5780],
                people: ['Paris']
            },
            '11/19/24': {
                name: 'Whiterock',
                id: [5629, 5653, 5635, 5636, 5644, 5648, 5657, 5673, 5682],
                people: ['Riley', 'Matt'],
            },
            '11/12/24': {
                name: 'Amber Meadows',
                id: [5494, 5490, 5498]
            },
            '10/27/24': {
                name: 'Railroad Tracks',
                id: [5209, 5219, 5212, 5196]
            },
            '10/26/24': {
                name: 'Downtown Frederick',
                id: [5176, 5190, 5191, 5187]
            },
            '10/23/24': {
                name: 'Patomac Commons',
                people: ['Paris'],
                id: ['5128a', 5126, 5129]
            },
            '10/20/24': {
                name: 'Amber Meadows',
                id: [5076, 5072, 5077, 5080]
            },
            '10/18/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [5025, 5042, 5044, 5023]
            },
            '10/16/24': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Ed', 'Joe'],
                id: [4946, 4959, 4955]
            },
            '10/12/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [4864, 4861, 4885, 4875, 4874, 4868]
            },
            '10/05/24': {
                name: 'Amber Meadows',
                people: ['Paris'],
                id: [4768, 4771, 4764, 4766]
            },
            '09/21/24': {
                name: 'Frederick Fair',
                people: ['Paris', 'Jeremy'],
                id: [4654, 4661]
            },
            '09/15/24': {
                name: 'Frederick Fair',
                people: ['Paris'],
                id: ['4591a', '4597a', '4598a']
            },
            '09/13/24': {
                name: 'Downtown Frederick',
                id: [4505, 4515, 4504, 4493, 4502, 4489, 4497]
            },
            '09/08/24': {
                name: 'Amber Meadows',
                id: [4419, 4430, 4436],
            },
            '08/03/24': {
                name: 'Washington D.C.',
                people: ['Paris', 'Jeremy', 'Abiel'],
                id: [4018, 3778, 3796, 3890, 3901, 4012, 4057, 3709, 3840],
            },
            '07/27/24': {
                name: 'Weverton Cliffs',
                people: ['Paris', 'Jeremy'],
                id: [3521, 3523, 3489, 3579, 3475],
                featured: 2
            },
            '07/26/24': {
                name: 'Rock Creek',
                people: ['Paris'],
                id: [3414, 3433, 3434, 3435, 3397]
            },
            '07/25/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [3246, 3245, 3356, 3330]
            },
            '07/19/24': {
                name: 'Rock Creek',
                id: [3210, 3213, 3208, 3187, 3189, 3199, 3205, 3206]
            },
            '07/15/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [3093, 3092, 3065, 3082, 3075, 3078]
            },
            '07/14/24': {
                name: 'Rose Hill',
                id: [3043, 3013, 3015, 3019, 3037, 3040, 3008, 3024]
            },
            '07/10/24': {
                name: 'Cunningham Falls',
                people: ['Paris', 'Jeremy'],
                id: [2902, 2900, 2898, 2891, 2865, 2842, 2921, 2897, 2889, 2881, 2864, 2917, 2915, 2912, 2875, 2863, 2851]
            },
            '07/09/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [2783, 2787, 2801, 2798, 2793, 2784, 2808]
            },
            '07/08/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [2735, 2693, 2692, 2703, 2714, 2719, 2727, 2731]
            },
            '07/05/24': {
                name: 'Mountaindale',
                people: ['Riley'],
                id: [2575, 2578, 2576, 2657]
            },
            '07/04/24': {
                name: 'Downtown Frederick',
                people: ['Paris', 'Jeremy'],
                id: [9996, 9997, 9998, 2526, 2508, 2506, 2505, 2477, 2472, 2467]
            },
            '07/03/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [2420, 2430, 2429, 2425, 2416]
            },
            '07/02/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [2293, 2309, 2312, 2317, 2364],
            },
            '07/01/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [2245, 2283, 2257, 2253, 2250, 2248, 2247, 2245, 2242, 2237, 2233]
            },
            '06/28/24': {
                name: 'Rock Creek',
                people: ['Paris'],
                id: [2151, 2146, 2134, 2133],
                caption: 'June 28th: One year anniversary with Paris.'
            },
            '06/26/24': {
                name: 'Rock Creek',
                people: ['Paris'],
                id: [2024, 2021, 2017, 2015, 2012]
            },
            '06/22/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [1814, 1808, 1783, 1813, 1795]
            },
            '06/23/24': {
                name: 'Railroad Tracks',
                id: [1850, 1848, 1853, 1840, 1843]
            },
            '06/20/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [1730, 1759, 1756, 1699, 1758, 1677, 1676, 1666, 1764]
            },
            '06/13/24': {
                name: 'Railroad Tracks',
                people: ['Riley', 'Paris'],
                id: [1404, 1399, 1400],
            },
            '06/12/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [1472, 1460, 1458, 1448, 1447, 1442]
            },
            '06/10/24': {
                name: 'Monocacy Crossing',
                people: ['Kobi', 'Ariel'],
                id: [1239, 1238, 1250, 1284]
            },
            '06/09/24': {
                name: 'Railroad Tracks',
                people: ['Paris'],
                id: [1175, 1186, 1188, 1193, 1198, 1199, 1203, 1209],
            },
            '06/08/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [1020, 1102, 1025, 1039, 1052, 1091]
            },
            '06/01/24': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: ['0728', '0723', '0720', '0716', '0694']
            },
            '05/25/24': {
                name: 'Rose Hill',
                people: ['Paris'],
                id: ['0537', '0533', '0529']
            },
            '05/14/24': {
                name: 'Downtown Frederick',
                id: ['0088', '0083', '0087', '0094']
            },
            '05/08/24': {
                name: 'FCC',
                id: [73652, 73624, 73720, 73716]
            },
            '04/22/24': {
                name: 'Rose Hill',
                people: ['Paris'],
                id: [3026, 3028, 3018, 3016, 3029]
            },
            '03/29/24': {
                name: 'Rock Creek',
                people: ['Paris'],
                id: [2244, 2205, 2203, 2201, 2035, 2029, 2023, 2013],
            },
            '03/24/24': {
                name: 'North Crossing',
                people: ['Paris'],
                id: [1686, 1696, 1697, 1698]
            },
            '01/21/24': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [153007, 142112, 152225, 143436, 143201]
            },
            '01/18/24': {
                name: 'Amber Meadows',
                people: ['Paris'],
                id: [72834, 65845, 65608, 65349, 64943, 64749],
            },
            '01/07/24': {
                name: 'North Crossing',
                id: [9649, 9655, 9652]
            },
            '11/17/23': {
                name: 'Amber Meadows',
                id: [7785, 7777, 7787, 7788, 7780],
            },
            '10/29/23': {
                name: 'Downtown Frederick',
                id: [5128, 5137, 5133, 5130, 5127, 5124],
            },
            '10/24/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [4789, 4788, 4793, 4787, 4795],
            },
            '10/22/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [4589, 4591, 4592, 4628, 4598]
            },
            '10/21/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [4541, 4548, 4542, 4552, 4556],
            },
            '10/10/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [3518, 3519, 3514, 3520, 3527]
            },
            '09/21/23': {
                name: 'Amber Meadows',
                id: [2342, 2338, 2340, 2344, 2333]
            },
            '09/16/23': {
                name: 'Frederick Fair',
                people: ['Paris'],
                id: [2006, 2086, 2020]
            },
            '09/12/23': {
                name: 'Amber Meadows',
                id: [1419, 1441, 1433, 1421, 1416],
            },
            '09/05/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: ['0786', '0787', '0778']
            },
            '08/13/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [9656, 9662, 9659, 9670]
            },
            '08/11/23': {
                name: 'Amber Meadows',
                people: ['Paris'],
                id: [9480, 9495, 9490, 9497],
            },
            '08/08/23': {
                name: 'Ocean City',
                people: ['Riley'],
                id: [9385, 9396, 9397, 9343, 9334]
            },
            '08/07/23': {
                name: 'Ocean City',
                people: ['Riley'],
                id: [9278, 9245, 9301, 143136, 143148]
            },
            '08/06/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [9125, 9128, 9138, 9141, 9180]
            },
            '08/05/23': {
                name: 'Downtown Frederick',
                people: ['Paris', 'Riley'],
                id: [9054, 9061, 8879, 9096, 9074],
            },
            '08/04/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [8847, 8842, 8841, 8833]
            },
            '08/03/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [8812, 8794, 8811, 8753, 8752],
            },
            '07/29/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [8348, 8354, 8357, 8359, 8378, 8386, 8389],
            },
            '07/20/23': {
                name: 'Rose Hill',
                people: ['Cody', 'Paris'],
                id: [7933, 7936, 7927, 7918],
            },
            '07/05/23': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Cody'],
                id: [6593, 6588, 6582, 6603, 6649],
                caption: 'I walked 18 miles on this day.'
            },
            '07/04/23': {
                name: 'Downtown Frederick',
                people: ['Paris', 'Edin', 'Jeremy', 'Riley'],
                id: [6505, 6549, 6535, 6504, 6541],
            },
            '06/26/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [5935, 5947, 5949, 5976],
            },
            '06/19/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [5336, 5385, 5350, 5331, 5321, 5314, 5411],
            },
            '06/18/23': {
                name: 'Monocacy River',
                people: ['Paris'],
                id: [5046, 5091, 5107, 5156],
            },
            '06/16/23': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Liam'],
                id: [4876, 4877, 4870, 4883, 4897, 4907]
            },
            '06/05/23': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [3895, 3900, 3902, 3906, 3913, 3915, 3950],
            },
            '06/02/23': {
                name: 'North Crossing',
                people: ['Riley', 'Liam', 'Paris'],
                id: [3690, 3678, 3675]
            },
            '04/09/23': {
                name: 'Downtown Frederick',
                caption: 'Easter 2023, I walked 20 miles on this day.',
                id: ['0595', '0410', '0415', '0591', '0602']
            },
            '04/02/23': {
                name: 'North Crossing',
                people: ['Riley', 'Edin'],
                id: ['0022', '0034', '0068', '0071']
            },
            '03/25/23': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Liam'],
                id: [9485, 9540, 9626, 9629]
            },
            '02/03/23': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [6991, 7031, 7034, 7143, 7138, 7131, 7078, 7052, 7049]
            },
            '01/24/23': {
                name: 'Amber Meadows',
                people: ['Riley'],
                id: [6647, 6642, 6625, 6623, 6599],
            },
            '01/06/23': {
                name: 'North Crossing',
                id: [5425, 5426, 5439, 5462, 5465, 5515],
            },
            '12/12/22': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [4498, 4514, 4519, 4535, 4536, 4540],
            },
            '12/04/22': {
                name: 'Downtown Frederick',
                id: [4277, 4322, 4330, 4331, 4348]
            },
            '09/18/22': {
                name: 'Frederick Fair',
                people: ['Edin', 'Max', 'Riley'],
                id: [1818, 1839, 1842, 1866, 1899, 1905, 1907]
            },
            '08/23/22': {
                name: 'Downtown Frederick',
                people: ['Evan', 'Riley'],
                id: ['0748', '0680', '0701', '0706', '0726'],
            },
            '08/16/22': {
                name: 'Downtown Frederick',
                id: ['0494', '0501', '0506', '0509', '0522', '0526', '0534', '0539']
            },
            '08/06/22': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [8610, 8613, 8614, 8632, 8661, 8673]
            },
            '07/21/22': {
                name: 'Hershey Park',
                people: ['Riley'],
                id: [8086, 8090, 8093, 8120]
            },
            '11/28/21': {
                name: 'Downtown Frederick',
                people: ['Paris'],
                id: [1307, 1043, 1311, 1314]
            },
        }
    },

    'Riley': {
        card: {
            bio: 'Video Creator',
            icon: 'riley.webp',
        },

        social: {
            'Instagram': 'https://www.instagram.com/yove.sierra/',
            'YouTube': 'https://www.youtube.com/@homies_tape',
            'Discord': 'https://discord.com/users/563816563292241940',
            'TikTok': 'https://www.tiktok.com/@yungbootstone7'
        },

        videos: {
            '01/01/22': {
                name: 'Homies Tape 1',
                thumbnail: 'homiestape1.jpg',
                link: 'https://www.youtube.com/watch?v=j1FrkuC4lPk',
            },
            '02/14/22': {
                name: 'Homies Tape 2',
                thumbnail: 'homiestape2.jpg',
                link: 'https://www.youtube.com/watch?v=MPtJjS6f-4s',
            },
            '03/31/22': {
                name: 'Homies Tape 3',
                thumbnail: 'homiestape3.jpg',
                link: 'https://www.youtube.com/watch?v=sNjinZgbw98',
            },
            '06/07/22': {
                name: 'Homies Tape 4',
                thumbnail: 'homiestape4.jpg',
                link: 'https://www.youtube.com/watch?v=0zBHh7WyCrI',
            },
            '08/16/22': {
                name: 'Homies Tape 5',
                thumbnail: 'homiestape5.jpg',
                link: 'https://www.youtube.com/watch?v=t8-SiBabwAo',
            },
            '01/01/23': {
                name: 'Homies Tape 6',
                thumbnail: 'homiestape6.jpg',
                link: 'https://www.youtube.com/watch?v=92msqUVUNAA',
            },
            '06/03/23': {
                name: 'Homies Tape 7',
                thumbnail: 'homiestape7.jpg',
                link: 'https://www.youtube.com/watch?v=jfX9XHAZXBQ',
            },
            '05/31/25': {
                name: 'Homies Tape 8',
                thumbnail: 'homiestape8.jpg',
                link: 'https://www.youtube.com/watch?v=KymvNC8jtIU',
            }
        },

        images: {
            '04/29/25': {
                name: 'Monocacy River',
                id: [9894, 9897, 9909, 9892],
                people: ['Thaddeus', 'Paris']
            },
            '11/18/24': {
                name: 'Mountaindale',
                id: [7053, 7051, 7050],
                people: ['Thaddeus', 'Matt']
            },
            '07/03/24': {
                name: 'Bikeride',
                id: [5156, 5157, 5158]
            },
            '06/01/24': {
                name: 'Mountaindale',
                id: [4659, 4656, 4661, 4663]
            },
        },
    },

    'Edin': {
        card: {
            bio: 'Beatmaker',
            icon: 'edin.jpg',
        },

        social: {
            'Instagram': 'https://www.instagram.com/edin_a15/',
            'SoundCloud': 'https://soundcloud.com/spiffy_beats',
        },

        images: {
            '06/21/24': {
                name: 'Downtown Frederick',
                id: [1020070, 1020063, 1020060, 1020054, 1020051, 1020048, 1020047, 1020103, 1020101]
            }
        }
    }
}