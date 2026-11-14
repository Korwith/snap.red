/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

// Website Gradients
const KircicGradientConfig: HexColor[] = ['#0d8000', '#003785'];

// Specific Colors
const HoverColorPink: HexColor = '#da70d6';

// Specific Icons
const EntryIconHeart: CustomIconConfig = {
    calender: { icon: 'heart.svg', size: '74%' }
}

// Specific Cameras
const CameraConfigSamsungS20: CameraInfoConfig = { name: 'Samsung Galaxy S20', mp: 50 };
const CameraConfigNikonS9100: CameraInfoConfig = { name: 'Nikon Coolpix S9100', mp: 12.1 };
const CameraConfigNikonS7000: CameraInfoConfig = { name: 'Nikon Coolpix S7000', mp: 16 };
const CameraConfigApple17Pro: CameraInfoConfig = { name: 'iPhone 17 Pro', mp: 48 };
const CameraConfigApple14: CameraInfoConfig = { name: 'iPhone 14', mp: 12 };
const CameraConfigApple13: CameraInfoConfig = { name: 'iPhone 13', mp: 12 };
const CameraConfigApple12Pro: CameraInfoConfig = { name: 'iPhone 12 Pro', mp: 12 };
const CameraConfigLumixTZ1: CameraInfoConfig = { name: 'Panasonic Lumix DMC-TZ1', mp: 5 };

// Misc
const HighlightUsers: HighlightedUserList = {
    'Brittany': 'pink'
}

const Data: Database = {
    'Thaddeus': {
        card: {
            bio: 'Web Developer',
            icon: 'kircic.png',
            site: {
                url: 'https://www.kircic.org',
                icon: 'https://www.kircic.org/icon/favicon.png',
                name: 'kircic.org',
                blurb: 'Development Portfolio',
                gradient: KircicGradientConfig,
            }
        },

        social: {
            'CashApp': 'https://cash.app/$thadreal',
            'Discord': 'https://discord.com/invite/p8ZZXZqnag',
            'GitHub': 'https://github.com/Korwith',
            'Instagram': 'https://www.instagram.com/thad1.0/',
            'YouTube': 'https://www.youtube.com/channel/UCLcCNfyLG_jQev4MdkHtCZw',
        },

        images: {
            '11/07/26': {
                name: 'New York City, NY',
                id: ["DSCN6311", 7472, 7519, 7542, "DSCN6224", "DSCN6257", "DSCN6180", "DSCN6241", "DSCN6246", "DSCN6265", "DSCN6287", "DSCN6179", "DSCN6171", "DSCN6177"],
                people: ['Melvin', 'Greeshma', 'Kati', 'Toshan', 'Domitille', 'Jonas', 'Calleigh'],
                camera: CameraConfigNikonS7000,
                featured: 1
            },
            '11/03/26': {
                name: 'Gaithersburg, MD',
                id: ['DSCN6121', 'DSCN6122', 'DSCN6161', "DSCN6118", 'DSCN6110', "DSCN6129", "DSCN6132", "DSCN6140", "DSCN6146", "DSCN6149", "DSCN6151", "DSCN6153", "DSCN6154", "DSCN6156", "DSCN6160", 'DSCN6123', 'DSCN6098'],
                people: ['Brittany', 'Kimberly', 'Joel', 'Jorgy'],
                camera: CameraConfigNikonS7000,
                featured: 5
                // gps later
            },
            '11/02/26': {
                name: 'Gambrill State Park',
                id: [7210, 7207, 7208, 7216, 7221],
                people: ['Brittany'],
                camera: CameraConfigApple14
            },
            '11/01/26': {
                name: 'Gambrill State Park',
                id: [7234, 7238, 7250, 7252, 7260, 7270],
                camera: CameraConfigApple14
            },
            '10/31/26': {
                name: 'Downtown Frederick',
                id: ['DSCN6086', "DSCN6088", "DSCN6095", 7169],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                // gps later
            },
            '10/30/26': {
                name: 'Gambrill State Park',
                id: [7125, 7107, 7114, 'DSCN6043'],
                camera: CameraConfigApple14,
                // gps later
            },
            '10/27/26': {
                name: 'Downtown Frederick',
                id: [7002, 7044, 7052, 7066, 7030],
                people: ['Brittany'],
                camera: CameraConfigApple14
                // gps later
            },
            '10/26/26': {
                name: 'Gambrill State Park',
                id: [6950, 6964, 6965, 6969, 6973],
                camera: CameraConfigApple14,
                // gps later
            },
            '10/21/26': {
                name: 'Washington D.C.',
                id: [6887, 6877],
                people: ['Riley', 'Xay'],
                camera: CameraConfigApple14,
                // gps later
            },
            '10/18/26': {
                name: 'Thurmont, MD',
                id: ["DSCN5884", "DSCN5864", "DSCN5871", "DSCN5879"],
                people: ['Brittany'],
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
                camera: CameraConfigNikonS7000,
                // gps later
            },
            '10/16/26': {
                name: 'Downtown Frederick',
                id: [
                    { 6773: { coords: [39.41525, -77.4097667] } },
                    { 6759: { coords: [39.4172277777778, -77.4187916666667] } },
                    { 6763: { coords: [39.417225, -77.4189306] } },
                    { 6767: { coords: [39.4172167, -77.4187917] } },
                    { 6768: { coords: [39.41695, -77.4163444] } },
                ],
                people: ['Edin'],
                camera: CameraConfigApple14,
            },
            '10/12/26': {
                name: 'Downtown Frederick',
                id: [
                    { 6613: { coords: [39.414597, -77.414811] } },
                    { 6642: { coords: [39.415447, -77.411383] } },
                    { 6676: { coords: [39.415744, -77.416192] } },
                ],
                people: ['Brittany'],
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
                camera: CameraConfigApple14,
            },
            '10/11/26': {
                name: 'Gambrill State Park',
                id: [
                    { 6594: { coords: [39.461906, -77.496200] } },
                    { 6587: { coords: [39.461925, -77.496369] } },
                    { 6590: { coords: [39.461911, -77.496169] } },
                    { 6592: { coords: [39.461906, -77.496247] } },
                    { 6593: { coords: [39.461933, -77.496269] } },
                    { 6596: { coords: [39.461483, -77.495147] } },
                ],
                camera: CameraConfigApple14,
            },
            '10/10/26': {
                name: 'Columbia, MD',
                id: [
                    { 6515: { coords: [39.209053, -76.862389] } },
                    { 6537: { coords: [39.208817, -76.862550] } },
                    { 6467: { coords: [39.224136, -76.860833] } },
                    { 6526: { coords: [39.208972, -76.862419] } },
                ],
                people: ['Brittany'],
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
                camera: CameraConfigApple14,
            },
            '10/08/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN5824': { coords: [39.412886, -77.409881] } },
                    { 6405: { coords: [39.415264, -77.409783] } },
                    { 6410: { coords: [39.414244, -77.410583] } },
                    { 6413: { coords: [39.414092, -77.409911] } },
                    { 6431: { coords: [39.415417, -77.412558] } },
                    { 6443: { coords: [39.414975, -77.412881] } },
                ],
                people: ['Edin'],
                camera: CameraConfigNikonS7000,
            },
            '10/05/26': {
                name: 'Gambrill State Park',
                id: [
                    { 6332: { coords: [39.461900, -77.496222] } },
                    { 6336: { coords: [39.461881, -77.496222] } },
                    { 6311: { coords: [39.461942, -77.496314] } },
                ],
                people: ['Brittany'],
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
                camera: CameraConfigApple14,
            },
            '10/02/26': {
                name: 'Gambrill State Park',
                id: [
                    { 6255: { coords: [39.461917, -77.496281] } },
                    { 6239: { coords: [39.514769, -77.488694] } },
                    { 6248: { coords: [39.469789, -77.494242] } },
                    { 6260: { coords: [39.461472, -77.4951] } },
                    { 6261: { coords: [39.461472, -77.4951] } },
                ],
                camera: CameraConfigApple14,
            },
            '10/01/26': {
                name: 'Downtown Frederick',
                id: [
                    { 6202: { coords: [39.415092, -77.414847] } },
                    { 6186: { coords: [39.412747, -77.410181] } },
                    { 6191: { coords: [39.412664, -77.407072] } },
                    { 6196: { coords: [39.414614, -77.414794] } },
                    { 6165: { coords: [39.414239, -77.411047] } },
                    { 6152: { coords: [39.415614, -77.412514] } },
                ],
                people: ['Brittany', 'Edin'],
                camera: CameraConfigApple14,
            },
            '09/30/26': {
                name: 'Gambrill State Park',
                id: [
                    { 6097: { coords: [39.461836, -77.496169] } },
                    { 6123: { coords: [39.461486, -77.495186] } },
                    { 6109: { coords: [39.461931, -77.496347] } },
                    { 6111: { coords: [39.461931, -77.496347] } },
                    { 6113: { coords: [39.461942, -77.496194] } },
                ],
                camera: CameraConfigApple14,
            },
            '09/26/26': {
                name: 'Fountain Rock Park',
                id: [
                    { 6060: { coords: [39.475881, -77.367281] } },
                    { 6069: { coords: [39.475503, -77.368822] } },
                    { 6067: { coords: [39.475436, -77.367439] } },
                ],
                camera: CameraConfigApple14,
            },
            '09/25/26': {
                name: 'Gambrill State Park',
                id: [
                    { 6019: { coords: [39.469753, -77.494208] } },
                    { 6008: { coords: [39.514753, -77.488681] } },
                    { 6024: { coords: [39.461472, -77.495164] } },
                    { 6036: { coords: [39.461472, -77.495164] } },
                    { 6038: { coords: [39.461928, -77.496117] } },
                    6050, // UNSPECIFIED
                ],
                camera: CameraConfigApple14,
            },
            '09/21/26': {
                name: 'Frederick Fair',
                id: [
                    { 5916: { coords: [39.413667, -77.396772] } },
                    { 5866: { coords: [39.413544, -77.394778] } },
                    { 5973: { coords: [39.384833, -77.403289] } },
                    { 5978: { coords: [39.384833, -77.403289] } },
                ],
                people: ['Brittany'],
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
                camera: CameraConfigApple14,
            },
            '09/16/26': {
                name: 'Gambrill State Park',
                id: [
                    { 5691: { coords: [39.461994, -77.495528] } },
                    { 5685: { coords: [39.461936, -77.496317] } },
                    { 5645: { coords: [39.461411, -77.495114] } },
                    { 5688: { coords: [39.461936, -77.496317] } },
                    { 5671: { coords: [39.461897, -77.496178] } },
                    { 5696: { coords: [39.461864, -77.495553] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigApple14,
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
            },
            '09/14/26': {
                name: 'Gambrill State Park',
                id: [
                    { 5552: { coords: [39.461442, -77.495167] } },
                    { 5611: { coords: [39.422772, -77.418706] } },
                    5585, // SKIPPED
                    { 5548: { coords: [39.461442, -77.495167] } },
                    { 5555: { coords: [39.461442, -77.495167] } },
                    { 5561: { coords: [39.461442, -77.495167] } },
                    { 5565: { coords: [39.461858, -77.4963] } },
                    { 5568: { coords: [39.461858, -77.4963] } },
                    { 5569: { coords: [39.461858, -77.4963] } },
                    { 5571: { coords: [39.461858, -77.4963] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigApple14,
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
            },
            '09/10/26': {
                name: 'Downtown Frederick',
                id: [
                    { 5355: { coords: [39.4149611, -77.409649] } },
                    { 5358: { coords: [39.4156318, -77.4094369] } },
                    { 5362: { coords: [39.415156, -77.408642] } },
                ],
                people: ['Edin', 'Kevin'],
                camera: CameraConfigApple14,
            },
            '09/07/26': {
                name: 'Cunningham Falls',
                id: [
                    { 5290: { coords: [39.6262884, -77.4562366] } },
                    { 5315: { coords: [39.6280053, -77.4624874] } },
                    { 5305: { coords: [39.6280053, -77.4624874] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigApple14,
                hover_color: HoverColorPink,
                custom_icons: EntryIconHeart,
            },
            '09/05/26': {
                name: 'Gambrill State Park',
                id: [
                    { 5268: { coords: [39.4613421, -77.4951787] } },
                    { 5232: { coords: [39.5156167, -77.4884283] } },
                    { 5233: { coords: [39.5156167, -77.4884283] } },
                    { 5236: { coords: [39.5156167, -77.4884283] } },
                    { 5241: { coords: [39.5156167, -77.4884283] } },
                    { 5257: { coords: [39.4619515, -77.4962949] } },
                    { 5261: { coords: [39.4613252, -77.495033] } },
                    { 'DSCN5789': { coords: [39.4619473, -77.4962402] } },
                    { 'DSCN5801': { coords: [39.4613433, -77.4951715] } },
                    { 5230: { coords: [39.5156167, -77.4884283] } },
                ],
                camera: CameraConfigApple14,
            },
            '08/30/26': {
                name: 'Delaplane, VA',
                caption: 'Sky Meadows State Park',
                id: [
                    { 5132: { coords: [38.9969503, -77.9728978] } },
                    { 5131: { coords: [38.9923612, -77.9683097] } },
                    { 5125: { coords: [38.9923612, -77.9683097] } },
                    5121, // UNKNOWN
                ],
                people: ['Riley'],
                camera: CameraConfigApple14,
            },
            '08/29/26': {
                name: 'Cunningham Falls',
                id: [
                    { 5071: { coords: [39.6272798, -77.4555138] } },
                    { 'DSCN5703': { coords: [39.6259139, -77.4620715] } },
                    { 'DSCN5676': { coords: [39.6272798, -77.4555138] } },
                    { 5078: { coords: [39.6281434, -77.4594102] } },
                    { 5088: { coords: [39.6259139, -77.4620715] } },
                    { 'DSCN5722': { coords: [39.6291337, -77.4579417] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '08/26/26': {
                name: 'Downtown Frederick',
                id: [
                    { 5012: { coords: [39.414934, -77.415231] } },
                    { 5002: { coords: [39.4149611, -77.409649] } },
                    { 5004: { coords: [39.4155096, -77.4094098] } },
                    { 5009: { coords: [39.4144372, -77.4057659] } },
                    { 5013: { coords: [39.4156511, -77.4149637] } },
                    5037, // UNKNOWN
                ],
                people: ['Brittany'],
                camera: CameraConfigApple14,
                hover_color: HoverColorPink,
                custom_icons: EntryIconHeart,
            },
            '08/25/26': {
                name: 'Downtown Frederick',
                id: [
                    { 4934: { coords: [39.4150735, -77.4126407] } },
                    { 4951: { coords: [39.41601, -77.41315] } },
                    { 4928: { coords: [39.4150311, -77.4125699] } },
                    { 4947: { coords: [39.4156132, -77.413449] } },
                    { 4958: { coords: [39.417056, -77.416137] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigApple14,
            },
            '08/23/26': {
                name: 'Pen Mar, MD',
                id: [
                    { 4878: { coords: [39.7171102, -77.5088612] } },
                    { 4869: { coords: [39.7157833, -77.5080477] } },
                    { 4884: { coords: [39.7171102, -77.5088612] } },
                    { 'DSCN5632': { coords: [39.7172253, -77.509046] } },
                    { 'DSCN5639': { coords: [39.7171102, -77.5088612] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '08/22/26': {
                name: 'Downtown Frederick',
                id: [
                    { 4841: { coords: [39.4129425, -77.4119537] } },
                    { 4829: { coords: [39.4162317, -77.4073929] } },
                    4824, // UNKNOWN
                    { 4859: { coords: [39.4128091, -77.4090146] } },
                    { 4860: { coords: [39.4128032, -77.4082219] } },
                    { 4851: { coords: [39.4129425, -77.4119537] } },
                ],
                // 4142 is on here too, 4181 is almost the same photo. both very good
                people: ['Brittany'],
                camera: CameraConfigApple14,
                hover_color: HoverColorPink,
                custom_icons: EntryIconHeart,
            },
            '08/21/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN5589': { coords: [39.4148225, -77.4093096] } },
                    { 'DSCN5585': { coords: [39.4149611, -77.409649] } },
                    { 'DSCN5610': { coords: [39.414934, -77.415231] } },
                    { 'DSCN5612': { coords: [39.4156511, -77.4149637] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '08/15/26': {
                name: 'Blue Ridge Summit',
                id: [
                    { 'DSCN5544': { coords: [39.7269689, -77.4715494] } },
                    { 'DSCN5520': { coords: [39.7011939, -77.4854017] } },
                    { 'DSCN5506': { coords: [39.7012592, -77.4855191] } },
                    { 'DSCN5491': { coords: [39.7011939, -77.4854017] } },
                    { 'DSCN5504': { coords: [39.7013336, -77.4855277] } },
                    { 'DSCN5543': { coords: [39.7269689, -77.4715494] } },
                    { 'DSCN5546': { coords: [39.7120455, -77.5239494] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                hover_color: HoverColorPink,
            },
            /*
            '08/13/26': {
                name: 'Gambrill State Park',
                id: [
                    { 'DSCN5411': { coords: [39.4619515, -77.4962949] } },
                    { 'DSCN5416': { coords: [39.4619515, -77.4962949] } },
                    { 'DSCN5443': { coords: [39.4156511, -77.4149637] } },
                    { 'DSCN5405': { coords: [39.4619515, -77.4962949] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                custom_icons: EntryIconHeart,
                hover_color: HoverColorPink,
            },*/
            '08/11/26': {
                name: 'Fountain Rock Park',
                id: [
                    { 'DSCN5378': { coords: [39.4752223, -77.3691263] } },
                    { 'DSCN5373': { coords: [39.4752223, -77.3691263] } },
                    { 'DSCN5385': { coords: [39.4752223, -77.3691263] } },
                ],
                people: ['Riley', 'Ed'],
                camera: CameraConfigNikonS7000,
            },
            '08/10/26': {
                name: 'Gambrill State Park',
                id: [
                    { 'DSCN5305': { coords: [39.4619515, -77.4962949] } },
                    { 'DSCN5255': { coords: [39.4698003, -77.4942981] } },
                    { 'DSCN5279': { coords: [39.4613433, -77.4951715] } },
                    { 'DSCN5280': { coords: [39.4613433, -77.4951715] } },
                    { 'DSCN5237': { coords: [39.515358, -77.487532] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '08/09/26': {
                name: 'Washington D.C.',
                id: [
                    { 'DSCN5145': { coords: [38.898722, -77.0256605] } },
                    { 'DSCN5197': { coords: [38.8920148, -77.0374862] } },
                    { 'DSCN5203': { coords: [38.8912397, -77.0300205] } },
                    { 'DSCN5166': { coords: [38.8937155, -77.028936] } },
                    { 'DSCN5223': { coords: [38.8937155, -77.028936] } },
                    { 'DSCN5173': { coords: [38.8950137, -77.0264929] } },
                ],
                camera: CameraConfigNikonS7000,
                people: ['Brittany'],
                hover_color: HoverColorPink,
                custom_icons: EntryIconHeart,
            },
            '08/08/26': {
                name: 'High Rock',
                id: [
                    { 'DSCN5071': { coords: [39.6950513, -77.5236873] } },
                    { 'DSCN5065': { coords: [39.6950513, -77.5236873] } },
                    { 'DSCN5067': { coords: [39.6950513, -77.5236873] } },
                    { 'DSCN5076': { coords: [39.6950513, -77.5236873] } },
                    { 'DSCN5110': { coords: [39.7087643, -77.4952211] } },
                    { 'DSCN5120': { coords: [39.7068288, -77.4938896] } },
                    { 4553: { coords: [39.4157232, -77.4047379] } },
                ],
                camera: CameraConfigNikonS7000,
                people: ['Brittany'],
                hover_color: HoverColorPink,
            },
            '08/07/26': {
                name: 'Sugarloaf Mountain',
                id: [
                    { 'DSCN4962': { coords: [39.2604256, -77.3895085] } },
                    { 'DSCN4957': { coords: [39.2604256, -77.3895085] } },
                    { 'DSCN4985': { coords: [39.2604256, -77.3895085] } },
                    { 'DSCN5000': { coords: [39.2601877, -77.3976925] } },
                    { 'DSCN5007': { coords: [39.2606722, -77.3973833] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '08/06/26': {
                name: 'Downtown Frederick',
                id: [
                    { 4479: { coords: [39.4129423, -77.411954] } },
                    { 4448: { coords: [39.4155096, -77.4094098] } },
                    { 4457: { coords: [39.4127732, -77.4060137] } },
                    { 4467: { coords: [39.4133985, -77.408251] } },
                    4490, // UNKNOWN
                    { 4506: { coords: [39.4175582, -77.4142093] } },
                ],
                people: ['Riley'],
                camera: CameraConfigApple14,
            },
            '08/05/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN4925': { coords: [39.4150735, -77.4126407] } },
                    'DSCN4939', // still need to find
                    { 'DSCN4923': { coords: [39.4150735, -77.4126407] } },
                    { 'DSCN4932': { coords: [39.4143538, -77.4123393] } },
                    { 'DSCN4924': { coords: [39.4150735, -77.4126407] } },
                ],
                people: ['Riley'],
                camera: CameraConfigNikonS7000,
            },
            '08/03/26': {
                name: 'Gaithersburg, MD',
                id: [
                    { 'DSCN4858': { coords: [39.1451311, -77.2568587] } },
                    { 'DSCN4881': { coords: [39.1451311, -77.2568587] } },
                    { 'DSCN4893': { coords: [39.1451311, -77.2568587] } },
                    { 'DSCN4847': { coords: [39.1451311, -77.2568587] } },
                    { 'DSCN4864': { coords: [39.1451311, -77.2568587] } },
                ],
                people: ['Edin'],
                camera: CameraConfigNikonS7000,
            },
            '07/31/26': {
                name: 'Middletown, MD',
                id: [
                    { 'DSCN4784': { coords: [39.5004351, -77.6232019] } },
                    { 'DSCN4772': { coords: [39.5004351, -77.6232019] } },
                    { 'DSCN4759': { coords: [39.4992704, -77.6233442] } },
                    { 'DSCN4785': { coords: [39.5004351, -77.6232019] } },
                    { 'DSCN4787': { coords: [39.5003938, -77.6230539] } },
                    { 'DSCN4800': { coords: [39.4992704, -77.6233442] } },
                    'DSCN4762', // UNKNOWN
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/30/26': {
                name: 'Fountain Rock Park',
                id: [
                    { 4127: { coords: [39.474538, -77.3666547] } },
                    { 'DSCN4651': { coords: [39.474538, -77.3666547] } },
                    { 'DSCN4653': { coords: [39.474538, -77.3666547] } },
                    { 'DSCN4661': { coords: [39.4752223, -77.3691263] } },
                    { 'DSCN4667': { coords: [39.4752223, -77.3691263] } },
                    { 'DSCN4633': { coords: [39.4752223, -77.3691263] } },
                    { 'DSCN4626': { coords: [39.4752358, -77.3698441] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/29/26': {
                name: "Mount St. Mary's",
                id: [
                    { 'DSCN4463': { coords: [39.6819084, -77.3561786] } },
                    { 'DSCN4469': { coords: [39.6819084, -77.3561786] } },
                    { 'DSCN4486': { coords: [39.6819084, -77.3561786] } },
                    { 'DSCN4492': { coords: [39.6823526, -77.3564523] } },
                    { 'DSCN4518': { coords: [39.6823526, -77.3564523] } },
                    { 'DSCN4524': { coords: [39.6823526, -77.3564523] } },
                ],
                people: ['Edin', 'Kevin'],
                camera: CameraConfigNikonS7000,
            },
            '07/28/26': {
                name: 'Ballenger Creek',
                id: [
                    { 'DSCN4425': { coords: [39.3636676, -77.4205292] } },
                    { 'DSCN4426': { coords: [39.3636676, -77.4205292] } },
                    { 'DSCN4430': { coords: [39.3636676, -77.4205292] } },
                ],
                people: ['Brittany', 'Leah', 'Ashely', 'Gio', 'Dwayne'],
                camera: CameraConfigNikonS7000,
                hover_color: HoverColorPink,
                custom_icons: EntryIconHeart,
            },
            '07/27/26': {
                name: 'Cunningham Falls',
                id: [
                    { 'DSCN4347': { coords: [39.6274713, -77.4616612] } },
                    { 'DSCN4327': { coords: [39.6242634, -77.4613541] } },
                    { 'DSCN4346': { coords: [39.6259139, -77.4620715] } },
                    { 'DSCN4352': { coords: [39.6259139, -77.4620715] } },
                    { 'DSCN4384': { coords: [39.6259139, -77.4620715] } },
                    { 'DSCN4386': { coords: [39.6259139, -77.4620715] } },
                    { 'DSCN4387': { coords: [39.6267858, -77.4614041] } },
                    { 'DSCN4390': { coords: [39.6267858, -77.4614041] } },
                    { 'DSCN4405': { coords: [39.6209594, -77.4667499] } },
                    { 'DSCN4364': { coords: [39.6259139, -77.4620715] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/26/26': {
                name: 'Gambrill State Park',
                id: [
                    { 'DSCN4268': { coords: [39.4613433, -77.4951715] } },
                    { 'DSCN4241': { coords: [39.5156167, -77.4884283] } },
                    { 'DSCN4267': { coords: [39.4618127, -77.49539] } },
                    { 'DSCN4295': { coords: [39.4618127, -77.49539] } },
                    { 'DSCN4244': { coords: [39.5156167, -77.4884283] } },
                    { 'DSCN4259': { coords: [39.4698003, -77.4942981] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                hover_color: HoverColorPink,
            },
            '07/25/26': {
                name: 'Thurmont, MD',
                id: [
                    { 'DSCN4201': { coords: [39.6457322, -77.4388211] } },
                    { 'DSCN4174': { coords: [39.5821547, -77.4342764] } },
                    { 'DSCN4225': { coords: [39.6254671, -77.4108387] } },
                    { 'DSCN4228': { coords: [39.6254671, -77.4108387] } },
                    { 'DSCN4233': { coords: [39.6254328, -77.4102516] } },
                    { 'DSCN4209': { coords: [39.6222787, -77.4108392] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/24/26': {
                name: 'Gambrill State Park',
                id: [
                    { 'DSCN4067': { coords: [39.4698003, -77.4942981] } },
                    { 'DSCN4107': { coords: [39.4613433, -77.4951715] } },
                    { 'DSCN4116': { coords: [39.4613433, -77.4951715] } },
                    { 'DSCN4118': { coords: [39.4613315, -77.4950983] } },
                    { 'DSCN4138': { coords: [39.4619338, -77.4962394] } },
                    { 'DSCN4142': { coords: [39.4619515, -77.4962949] } },
                    { 'DSCN4050': { coords: [39.5156167, -77.4884283] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/23/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN4023': { coords: [39.4134368, -77.4138769] } },
                    { 'DSCN4017': { coords: [39.4143538, -77.4123393] } },
                    { 'DSCN3983': { coords: [39.4134368, -77.4138769] } },
                    { 'DSCN4028': { coords: [39.415025, -77.414684] } },
                    { 'DSCN3970': { coords: [39.4162864, -77.4152686] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/22/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN3946': { coords: [39.4162864, -77.4152686] } },
                    { 'DSCN3921': { coords: [39.4157441, -77.4161518] } },
                    { 'DSCN3935': { coords: [39.4162864, -77.4152686] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '07/20/26': {
                name: 'Walkersville, MD',
                id: [
                    { 'DSCN3812': { coords: [39.4643012, -77.3924276] } },
                    { 'DSCN3806': { coords: [39.4643017, -77.392515] } },
                    { 'DSCN3796': { coords: [39.4643017, -77.392515] } },
                    'DSCN3887', // UNKNOWN
                ],
                people: ['Ed'],
                camera: CameraConfigNikonS7000,
            },
            '07/19/26': {
                name: 'Weverton Cliffs',
                id: [
                    { 'DSCN3687': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN3699': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN3696': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN3690': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN3691': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN3685': { coords: [39.3320587, -77.6766005] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                hover_color: HoverColorPink,
                custom_icons: EntryIconHeart,
            },
            '07/16/26': {
                name: 'Washington D.C.',
                id: [
                    { 'DSCN3634': { coords: [38.8995664, -77.0241556] } },
                    'DSCN3612', // UNKNOWN
                    { 'DSCN3614': { coords: [38.9057326, -77.0435474] } },
                    'DSCN3647', // UNKNOWN
                    'DSCN3667', // UNKNOWN
                ],
                people: ['Edin', 'Kevin'],
                camera: CameraConfigNikonS7000,
            },
            '07/13/26': {
                name: 'Clerestory Park',
                id: [
                    { '3298': { coords: [39.4643053, -77.392462] } },
                    { '3283': { coords: [39.4637795, -77.3933457] } },
                    { '3289': { coords: [39.4637795, -77.3933457] } },
                    { '3290': { coords: [39.464363, -77.392412] } },
                    { '3297': { coords: [39.4643053, -77.392462] } },
                    { '3310': { coords: [39.4637795, -77.3933457] } },
                ],
                camera: CameraConfigApple14,
            },
            '07/11/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN3922': { coords: [39.414972, -77.4156475] } },
                    { '3239': { coords: [39.4145355, -77.4107732] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                hover_color: HoverColorPink,
            },
            '07/05/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN3596': { coords: [39.4150616, -77.4146664] } },
                    { 'DSCN3605': { coords: [39.4139573, -77.4105908] } },
                    { 'DSCN3595': { coords: [39.4134368, -77.4138769] } },
                    { 'DSCN3594': { coords: [39.4130089, -77.409569] } },
                ],
                people: ['Brittany'],
                camera: CameraConfigNikonS7000,
                hover_color: HoverColorPink,
            },
            '07/03/26': {
                name: 'Monocacy River',
                id: [
                    { 'DSCN3576': { coords: [39.436374, -77.389465] } },
                    { 'DSCN3559': { coords: [39.436374, -77.389465] } },
                    { 'DSCN3560': { coords: [39.436374, -77.389465] } },
                    { 'DSCN3562': { coords: [39.436374, -77.389465] } },
                ],
                people: ['Riley', 'Maya', 'Xay'],
                camera: CameraConfigNikonS7000,
            },
            '07/02/26': {
                name: 'Falling Waters, WV',
                id: [
                    { 'DSCN3506': { coords: [39.5593655, -77.8878869] } },
                    { 'DSCN3496': { coords: [39.558981, -77.888994] } },
                    { 'DSCN3515': { coords: [39.5593655, -77.8878869] } },
                    { 'DSCN3523': { coords: [39.558981, -77.888994] } },
                    { 'DSCN3524': { coords: [39.558981, -77.888994] } },
                    { 'DSCN3525': { coords: [39.558981, -77.888994] } },
                    'DSCN3544', // UNKNOWN
                    'DSCN3548', // UNKNOWN
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '06/15/26': {
                name: 'Rivermist Park',
                id: [
                    { 2815: { coords: [39.4437983, -77.3823075] } },
                    { 2817: { coords: [39.4437983, -77.3823075] } },
                    { 2818: { coords: [39.4437983, -77.3823075] } },
                ],
                people: ['Riley'],
                camera: CameraConfigApple14,
            },
            '05/31/26': {
                name: 'Clerestory Park',
                id: [
                    { 2665: { coords: [39.464363, -77.392412] } },
                    { 2668: { coords: [39.464363, -77.392412] } },
                    { 2673: { coords: [39.4637795, -77.3933457] } },
                ],
                camera: CameraConfigApple14,
            },
            '05/18/26': {
                name: 'Cascade Falls',
                id: [
                    { 'DSCN3405': { coords: [39.2395743, -76.7516632] } },
                    { 'DSCN3367': { coords: [39.2486992, -76.7646748] } },
                    { 'DSCN3383': { coords: [39.2416671, -76.7488879] } },
                    { 'DSCN3387': { coords: [39.2415246, -76.7490889] } },
                    'DSCN3365', // UNKNOWN
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '05/17/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN3346': { coords: [39.4127331, -77.411164] } },
                    { 'DSCN3339': { coords: [39.4128836, -77.4101305] } },
                    { 'DSCN3348': { coords: [39.4142865, -77.4112705] } },
                    { 'DSCN3358': { coords: [39.4150754, -77.4146599] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '05/15/26': {
                name: 'Boonsboro, MD',
                id: [
                    { 'DSCN3270': { coords: [39.5385084, -77.7098213] } },
                    { 'DSCN3265': { coords: [39.5385084, -77.7098213] } },
                    { 'DSCN3256': { coords: [39.5385084, -77.7098213] } },
                    { 'DSCN3255': { coords: [39.5385084, -77.7098213] } },
                    { 'DSCN3253': { coords: [39.5385084, -77.7098213] } },
                    'DSCN3264', // UNKNOWN
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '05/11/26': {
                name: 'New York City, NY',
                id: [
                    { 'DSCN3200': { coords: [40.7066988, -74.0108212] } },
                    { 'DSCN3185': { coords: [40.7195, -74.0125] } },
                    { 'DSCN3180': { coords: [40.7208, -74.0116] } },
                    { 'DSCN3174': { coords: [40.7395346, -74.008533] } },
                    { 'DSCN3172': { coords: [40.7436, -74.0106] } },
                    { 'DSCN2455': { coords: [40.7087107, -74.0126127] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '04/27/26': {
                name: 'Portsmouth, NH',
                id: [
                    { 'DSCN3024': { coords: [43.0774764, -70.7486403] } },
                    { 'DSCN3043': { coords: [42.0682073, -72.1524316] } },
                    { 'DSCN3036': { coords: [42.0682073, -72.1524316] } },
                    { 'DSCN3032': { coords: [42.0679013, -72.1525306] } },
                    { 'DSCN3028': { coords: [43.0774764, -70.7486403] } },
                ],
                people: ['Riley'],
                camera: CameraConfigNikonS7000,
            },
            '04/26/26': {
                name: 'Bangor, ME',
                id: [
                    { '2009': { coords: [44.80150, -68.77128] } },
                    { '2087': { coords: [44.9015188, -68.6617222] } },
                    { '2074': { coords: [44.8008, -68.7725] } },
                    { '2019': { coords: [44.5775614, -68.4751695] } },
                    { '2014': { coords: [44.8014475, -68.7714796] } },
                    { 'DSCN2966': { coords: [44.8015207, -68.7700692] } },
                    { 'DSCN2973': { coords: [44.8015207, -68.7700692] } },
                    { 'DSCN2991': { coords: [44.8017618, -68.7710548] } },
                ],
                people: ['Riley', 'Ed'],
                camera: CameraConfigApple14,
            },
            '04/25/26': {
                name: 'Acadia National Park',
                id: [
                    { 'DSCN2911': { coords: [44.3361, -68.2755] } },
                    'DSCN2948', // UNKNOWN
                    'DSCN2812', // UNKNOWN
                    'DSCN2813', // UNKNOWN
                    { 'DSCN2838': { coords: [44.3354, -68.2718] } },
                    { 'DSCN2882': { coords: [44.3361, -68.2755] } },
                    { 'DSCN2886': { coords: [44.3361, -68.2755] } },
                    'DSCN2953', // UNKNOWN
                ],
                people: ['Riley', 'Ed'],
                camera: CameraConfigNikonS7000,
                featured: 2,
            },
            '04/04/26': {
                name: 'Washington D.C.',
                id: [
                    { 'DSCN2633': { coords: [38.8907078, -77.0311197] } },
                    { 'DSCN2631': { coords: [38.8907078, -77.0311197] } },
                    { 'DSCN2638': { coords: [38.8907078, -77.0311197] } },
                    { 'DSCN2647': { coords: [38.8907078, -77.0311197] } },
                    { 'DSCN2652': { coords: [38.8906482, -77.0259615] } },
                    { 'DSCN2655': { coords: [38.8916501, -77.0239634] } },
                    { 'DSCN2656': { coords: [38.8934017, -77.0270216] } },
                    { 'DSCN2609': { coords: [38.8898033, -77.012499] } },
                ],
                people: ['Redacted A', 'Ely', 'Nolan'],
                camera: CameraConfigNikonS7000,
            },
            '04/19/26': {
                name: 'Downtown Frederick',
                id: [
                    { 1804: { coords: [39.4156511, -77.4149637] } },
                    { 1801: { coords: [39.4155096, -77.4094098] } },
                    { 1800: { coords: [39.4150687, -77.4089479] } },
                    { 1791: { coords: [39.4169036, -77.4151488] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '03/10/26': {
                name: 'Weverton Cliffs',
                id: [
                    { 'DSCN2449': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2454': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2452': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2444': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2441': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2428': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2427': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2410': { coords: [39.3320587, -77.6766005] } },
                    { 'DSCN2456': { coords: [39.3320587, -77.6766005] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '03/09/26': {
                name: 'Clerestory Park',
                id: [
                    { 'DSCN2512': { coords: [39.4637795, -77.3933457] } },
                    { 'DSCN2530': { coords: [39.4637795, -77.3933457] } },
                    { 'DSCN2524': { coords: [39.4637795, -77.3933457] } },
                ],
                camera: CameraConfigNikonS7000,
            },
            '03/08/26': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN2362': { coords: [39.4147008, -77.4110162] } },
                    { 'DSCN2366': { coords: [39.4147008, -77.4110162] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '02/07/26': {
                name: 'Downtown Frederick',
                id: [
                    { 1142: { coords: [39.4128349, -77.4093302] } },
                    { 1148: { coords: [39.4128349, -77.4093302] } },
                    { 1144: { coords: [39.4128349, -77.4093302] } },
                    { 1140: { coords: [39.4128349, -77.4093302] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '01/13/26': {
                name: "Harper's Ferry",
                id: [
                    { 'DSCN2188': { coords: [39.3229412, -77.7286289] } },
                    { 'DSCN2232': { coords: [39.3239032, -77.7274717] } },
                    { 'DSCN2248': { coords: [39.3239032, -77.7274717] } },
                    'DSCN2266', // UNKNOWN
                ],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigNikonS7000,
            },
            '01/11/26': {
                name: 'Washington D.C.',
                id: [
                    { 'DSCN2105': { coords: [38.8874113, -77.0153022] } },
                    { 'DSCN2103': { coords: [38.8874113, -77.0153022] } },
                    { 'DSCN2073': { coords: [38.8998188, -77.0216695] } },
                    { 'DSCN2155': { coords: [38.8885068, -77.0163425] } },
                    { 'DSCN2127': { coords: [38.8881, 77.0127] } },
                    { 'DSCN2126': { coords: [38.8881, 77.0127] } },
                    { 'DSCN2111': { coords: [38.8882311, -77.0146346] } },
                ],
                people: ['Redacted A', 'Edin', 'Aidan', 'Jordan', 'Liam'],
                camera: CameraConfigNikonS7000,
            },
            '12/25/25': {
                name: 'Hagerstown, MD',
                id: [
                    { '0687': { coords: [39.6361576, -77.7317306] } },
                    { '0693': { coords: [39.6361576, -77.7317306] } },
                    { '0702': { coords: [39.6350131, -77.7300375] } },
                    { '0703': { coords: [39.6350131, -77.7300375] } },
                    { '0677': { coords: [39.6376994, -77.7313749] } },
                    { '0661': { coords: [39.6385433, -77.7309371] } },
                    { '0658': { coords: [39.6385433, -77.7309371] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '11/26/25': {
                name: 'Downtown Frederick',
                id: [
                    { 'DSCN1594': { coords: [39.4157672, -77.4075459] } },
                    { 'DSCN1600': { coords: [39.413988, -77.409557] } },
                    { 'DSCN1610': { coords: [39.4128946, -77.4098427] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigNikonS7000,
            },
            '10/02/25': {
                name: 'Rivermist Park',
                id: [
                    { '0089': { coords: [39.4412079, -77.3800845] } },
                    { '0084': { coords: [39.4412079, -77.3800845] } },
                    { '0078': { coords: [39.4412079, -77.3800845] } },
                    { '0076': { coords: [39.4412079, -77.3800845] } },
                ],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigApple14,
            },
            '08/29/25': {
                name: 'Downtown Frederick',
                id: [
                    { 9699: { coords: [39.4170257, -77.4139195] } },
                    { 9722: { coords: [39.41663, -77.4139783] } },
                    { 9720: { coords: [39.415025, -77.414684] } },
                    { 9709: { coords: [39.4133345, -77.414894] } },
                ],
                camera: CameraConfigApple14,
            },
            '06/30/25': {
                name: 'Gettysburg',
                id: [
                    { '1181': { coords: [39.8200567, -77.2206098] } },
                    { '1197': { coords: [39.8200567, -77.2206098] } },
                    { '1219': { coords: [39.8200567, -77.2206098] } },
                    { '1216': { coords: [39.8200567, -77.2206098] } },
                    { '1189': { coords: [39.8200567, -77.2206098] } },
                ],
                people: ['Redacted A', 'Riley', 'Ed', 'Maya'],
                camera: CameraConfigApple14,
            },
            '06/29/25': {
                name: 'Washington D.C.',
                id: [
                    { '1090': { coords: [38.8938, -77.0251] } },
                    { '1016': { coords: [38.8906482, -77.0259615] } },
                    { '1083': { coords: [38.8935906, -77.0232331] } },
                    { '1106': { coords: [38.8934583, -77.0280297] } },
                    { '1019': { coords: [38.8918, -77.0251] } },
                    { '1082': { coords: [38.8927368, -77.0229201] } },
                    { '1080': { coords: [38.893566, -77.023146] } },
                    { '1026': { coords: [38.8912809, -77.0227351] } },
                    { '1108': { coords: [38.894655, -77.0279253] } },
                    { '0919': { coords: [38.898971, -77.024125] } },
                    { '0971': { coords: [38.8918, -77.0404] } },
                    { '0942': { coords: [38.897917, -77.025583] } },
                    { '1079': { coords: [38.89354, -77.02271] } },
                    { '1028': { coords: [38.89163, -77.02294] } },
                    { '1089': { coords: [38.8938, -77.0252] } },
                    { '0956': { coords: [38.89438, -77.02534] } },
                    { '0954': { coords: [38.89417, -77.02750] } },
                ],
                people: ['Redacted A', 'Aidan', 'Jordan'],
                camera: CameraConfigApple14,
                featured: 3,
            },
            '06/28/25': {
                name: 'Downtown Frederick',
                id: [
                    { '0762': { coords: [39.4128512, -77.4095443] } },
                    '0857', // UNKNOWN
                    { '0753': { coords: [39.412413, -77.4117258] } },
                    { '0826': { coords: [39.4127762, -77.4111593] } },
                    '0794', // UNKNOWN
                    { '0858': { coords: [39.4121895, -77.4097432] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '06/23/25': {
                name: 'Monocacy River',
                id: [
                    { '0673': { coords: [39.436374, -77.389465] } },
                    { '0676': { coords: [39.436374, -77.389465] } },
                    { '0623': { coords: [39.436374, -77.389465] } },
                    { '0660': { coords: [39.436374, -77.389465] } },
                    { '0683': { coords: [39.4373411, -77.3904866] } },
                    '0596', // UNKNOWN
                    { '0708': { coords: [39.4373411, -77.3904866] } },
                ],
                people: ['Redacted A', 'Riley', 'Liam', 'Ed', 'Aidan', 'Matt'],
                camera: CameraConfigApple14,
            },
            '06/21/25': {
                name: 'Downtown Frederick',
                id: [
                    { '0482': { coords: [39.4157898, -77.419925] } },
                    { '0498': { coords: [39.4169252, -77.4238138] } },
                    { '0367': { coords: [39.4128852, -77.4104719] } },
                    { '0417': { coords: [39.4162864, -77.4152686] } },
                    { '0383': { coords: [39.4131483, -77.4132529] } },
                    { '0517': { coords: [39.4157713, -77.4180156] } },
                    { '0547': { coords: [39.4160891, -77.4108427] } },
                    '0466', // UNKNOWN
                    { '0436': { coords: [39.4157713, -77.4180156] } },
                    '0393', // UNKNOWN
                    '0512', // UNKNOWN
                    { '0438': { coords: [39.4157713, -77.4180156] } },
                    { '0502': { coords: [39.4169459, -77.4238458] } },
                    { '0441': { coords: [39.4159217, -77.4191903] } },
                    '0459', // UNKNOWN
                    { '0540': { coords: [39.4159614, -77.4110763] } },
                    { '0352': { coords: [39.4126985, -77.4078761] } },
                    '0514', // UNKNOWN
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '06/20/25': {
                name: 'Downtown Frederick',
                id: [
                    { '0313': { coords: [39.414019, -77.4111556] } },
                    { '0312': { coords: [39.414019, -77.4111556] } },
                    { '0322': { coords: [39.4142658, -77.4104369] } },
                    { '0269': { coords: [39.4148527, -77.4110032] } },
                    { '0297': { coords: [39.4128915, -77.4098779] } },
                    { '0321': { coords: [39.4143131, -77.4111539] } },
                    { '0279': { coords: [39.4128997, -77.4104679] } },
                    { '0284': { coords: [39.4128852, -77.4104727] } },
                    { '0241': { coords: [39.4175601, -77.4103936] } },
                    { '0290': { coords: [39.4128852, -77.4104727] } },
                    { '0252': { coords: [39.4152456, -77.4110288] } },
                    { '0257': { coords: [39.4143131, -77.4111539] } },
                    '0211', // UNKNOWN
                    '0203', // UNKNOWN
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '06/14/25': {
                name: 'Downtown Frederick',
                id: [
                    { '0051': { coords: [39.4127661, -77.4111604] } },
                    { '0061': { coords: [39.4128578, -77.4096247] } },
                    { '0077': { coords: [39.412843, -77.4094287] } },
                    { '0108': { coords: [39.414019, -77.4111556] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '06/11/25': {
                name: 'White Rock',
                id: [
                    { '1050949': { coords: [39.5693242, -77.4520586] } },
                    '1050858', // UNKNOWN
                    '1050930', // UNKNOWN
                    '1050870', // UNKNOWN
                    '1050939', // UNKNOWN
                    { '1050829': { coords: [39.527399, -77.465963] } },
                    '1050812', // UNKNOWN
                    '1050908', // UNKNOWN
                    '1050817', // UNKNOWN
                    '1050828', // UNKNOWN
                    '1050791', // UNKNOWN
                    '1050881', // UNKNOWN
                    '1050910', // UNKNOWN
                ],
                people: ['Redacted A', 'Riley', 'Matt', 'Liam'],
                camera: CameraConfigLumixTZ1,
            },
            '06/09/25': {
                name: 'Downtown Frederick',
                id: [
                    { '1050623': { coords: [39.4143299, -77.4110777] } },
                    { '1050704': { coords: [39.4143299, -77.4110777] } },
                    { '1050625': { coords: [39.4143299, -77.4110777] } },
                    { '1050662': { coords: [39.4143299, -77.4110777] } },
                    { '1050716': { coords: [39.4143299, -77.4110777] } },
                    { '1050630': { coords: [39.4143299, -77.4110777] } },
                    { '1050708': { coords: [39.4143299, -77.4110777] } },
                    { '1050627': { coords: [39.4143299, -77.4110777] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigLumixTZ1,
            },
            '06/07/25': {
                name: 'Downtown Frederick',
                id: [
                    { '1050578': { coords: [39.4139572, -77.4107556] } },
                    { '1050479': { coords: [39.4298562, -77.4066975] } },
                    { '1050478': { coords: [39.4298562, -77.4066975] } },
                    { '1050566': { coords: [39.4128793, -77.4097424] } },
                    { '1050559': { coords: [39.4128048, -77.408905] } },
                    { '1050545': { coords: [39.4128048, -77.408905] } },
                    { '1050596': { coords: [39.4128829, -77.4100472] } },
                    { '1050586': { coords: [39.4128848, -77.4103467] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigLumixTZ1,
            },
            '05/30/25': {
                name: 'Gaithersburg, MD',
                id: [
                    { '1050362': { coords: [39.1161416, -77.1958065] } },
                    { '1050325': { coords: [39.1157603, -77.1966139] } },
                    '1050341', // UNKNOWN
                    { '1050301': { coords: [39.1178948, -77.2001267] } },
                    '1050374', // UNKNOWN
                    { '1050346': { coords: [39.1156706, -77.1953838] } },
                    { '1050354': { coords: [39.1158381, -77.195996] } },
                    { '1050355': { coords: [39.1152, -77.1958384] } },
                ],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigLumixTZ1,
            },
            '05/23/25': {
                name: 'Gambrill State Park',
                id: ['1050025', '1040978', '1050030', '1050022', '1050020', '1050027'].reverse(),
                people: ['Redacted A', 'Edin', 'Liam', 'Kevin'],
                camera: CameraConfigLumixTZ1,
                // most of these photos i could not relocate for gps
            },
            '05/20/25': {
                name: 'North Crossing',
                id: [
                    { '1040814': { coords: [39.4659494, -77.4053799] } },
                    { '1040833': { coords: [39.4659494, -77.4053799] } },
                    { '1040829': { coords: [39.4659494, -77.4053799] } },
                    { '1040859': { coords: [39.4659494, -77.4053799] } },
                ],
                people: ['Redacted A', 'Riley', 'Edin', 'Liam', 'Kenyan', 'Ed', 'Aidan', 'Max'],
                camera: CameraConfigLumixTZ1,
            },
            '05/15/25': {
                name: 'Gambrill State Park',
                id: [
                    '1040436', // UNKNOWN
                    { '1040519': { coords: [39.5156167, -77.4884283] } },
                    { '1040492': { coords: [39.5156797, -77.4885611] } },
                    { '1040495': { coords: [39.5156167, -77.4884283] } },
                    { '1040479': { coords: [39.4698003, -77.4942981] } },
                    { '1040490': { coords: [39.4698003, -77.4942981] } },
                ],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigLumixTZ1,
            },
            '05/12/25': {
                name: 'Rose Hill',
                id: [
                    { '1030878': { coords: [39.4391839, -77.4057527] } },
                    { '1030885': { coords: [39.4391839, -77.4057527] } },
                    { '1030883': { coords: [39.4391839, -77.4057527] } },
                    { '1030889': { coords: [39.4391839, -77.4057527] } },
                    { '1030873': { coords: [39.4392954, -77.4056328] } },
                    { '1030881': { coords: [39.4391839, -77.4057527] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigLumixTZ1,
            },
            '05/07/25': {
                name: 'FCC',
                id: [
                    { '1030662': { coords: [39.4523239, -77.4183187] } },
                    { '1030669': { coords: [39.451578, -77.4181668] } },
                    { '1030659': { coords: [39.451578, -77.4181668] } },
                    { '1030657': { coords: [39.451578, -77.4181668] } },
                    { '1030646': { coords: [39.451578, -77.4181668] } },
                    { '1030569': { coords: [39.4515974, -77.4167259] } },
                    { '1030601': { coords: [39.451578, -77.4181668] } },
                    { '1030661': { coords: [39.4523239, -77.4183187] } },
                ],
                camera: CameraConfigLumixTZ1,
            },
            '05/01/25': {
                name: 'Downtown Frederick',
                id: [
                    { 8619: { coords: [39.4138835, -77.4089961] } },
                    { 8615: { coords: [39.4138612, -77.4083493] } },
                    'DSCN1430', // UNKNOWN
                ],
                people: ['Redacted A', 'Edin', 'Kevin'],
                camera: CameraConfigApple14,
            },
            '04/23/25': {
                name: 'Monocacy River',
                id: [
                    { 2347: { coords: [39.436374, -77.389465] } },
                    { 3457: { coords: [39.436374, -77.389465] } },
                    { 8541: { coords: [39.436374, -77.389465] } },
                ],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigApple14,
            },
            '04/18/25': {
                name: 'Monocacy River',
                id: [
                    { 8363: { coords: [39.435211, -77.38739] } },
                    { 8364: { coords: [39.435211, -77.38739] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '04/08/25': {
                name: 'Gambrill State Park',
                id: [8299, 8297, 8296],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigApple14,
                // couldn't relocate these photos
            },
            '04/07/25': {
                name: 'Rose Hill',
                id: [
                    { 8288: { coords: [39.4392158, -77.4057172] } },
                    { 8284: { coords: [39.4341991, -77.4070782] } },
                ],
                camera: CameraConfigApple14,
            },
            '03/29/25': {
                name: 'Downtown Frederick',
                id: [
                    { 8077: { coords: [39.4130744, -77.4107736] } },
                    { 8078: { coords: [39.4130744, -77.4107736] } },
                ],
                camera: CameraConfigApple14,
                people: ['Redacted A'],
            },
            '03/28/25': {
                name: 'Thurmont, MD',
                id: [
                    { 8024: { coords: [39.6124918, -77.4204103] } },
                    8022, // UNKNOWN
                    8039, // FIND LATER
                ],
                camera: CameraConfigApple14,
                people: ['Riley', 'Redacted A'],
            },
            '03/27/25': {
                name: 'Rose Hill',
                id: [
                    { 8014: { coords: [39.437933, -77.404206] } },
                    { 8004: { coords: [39.4395347, -77.4008789] } },
                    { 8005: { coords: [39.4395347, -77.4008789] } },
                    { 8007: { coords: [39.440725, -77.402175] } },
                    { 8011: { coords: [39.440814, -77.402108] } },
                    { 8016: { coords: [39.437933, -77.404206] } },
                ],
                camera: CameraConfigApple14,
            },
            '03/18/25': {
                name: 'Rose Hill',
                id: [
                    { 7958: { coords: [39.436869, -77.406022] } },
                    { 7957: { coords: [39.437192, -77.406597] } },
                    { 7961: { coords: [39.437192, -77.406597] } },
                    { 7962: { coords: [39.437192, -77.406597] } },
                ],
                camera: CameraConfigApple14,
            },
            '03/12/25': {
                name: 'Monocacy River',
                id: [
                    { 7883: { coords: [39.437269, -77.388758] } },
                    7877, // UNKNOWN
                    { 7885: { coords: [39.437628, -77.391431] } },
                    { 7906: { coords: [39.436522, -77.387439] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '03/10/25': {
                name: 'Clerestory Park',
                id: [
                    { 7838: { coords: [39.464514, -77.393086] } },
                    { 7844: { coords: [39.463403, -77.393764] } },
                    7854, // UNKNOWN
                    { 7839: { coords: [39.465128, -77.392761] } },
                    { 7841: { coords: [39.465128, -77.392761] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '03/08/25': {
                name: 'Clerestory Park',
                id: [
                    { 7819: { coords: [39.463517, -77.393961] } },
                    { 7784: { coords: [39.463231, -77.393706] } },
                    { 7800: { coords: [39.463133, -77.393583] } },
                    7816, // UNKNOWN
                    7795, // UNKNOWN
                    { 7813: { coords: [39.465117, -77.392769] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '03/07/25': {
                name: 'Westview',
                id: [
                    { 7760: { coords: [39.374481, -77.412578] } },
                    { 7759: { coords: [39.374008, -77.411972] } },
                    { 7757: { coords: [39.374478, -77.412544] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '02/26/25': {
                name: 'Gambrill State Park',
                id: [
                    { 7639: { coords: [39.469792, -77.494289] } },
                    { 7643: { coords: [39.469792, -77.494289] } },
                    7613, // UNKNOWN
                    { 7625: { coords: [39.515014, -77.488842] } },
                    7617, // UNKNOWN
                    7619, // UNKNOWN
                ],
                people: ['Redacted A', 'Edin'],
                camera: CameraConfigApple14,
            },
            '02/10/25': {
                name: 'Rose Hill',
                id: [7444, 7438, 7436],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
                // i could not relocate photos
            },
            '01/19/25': {
                name: 'Amber Meadows',
                id: [
                    { 7053: { coords: [39.445908, -77.410564] } },
                    { 7084: { coords: [39.445792, -77.410636] } },
                    { 7061: { coords: [39.444681, -77.411056] } },
                    { 7091: { coords: [39.446497, -77.410539] } },
                    { 7050: { coords: [39.447128, -77.410769] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '01/17/25': {
                name: 'Clerestory Park',
                id: [
                    { 10004: { coords: [39.464853, -77.392956] } },
                    { 10005: { coords: [39.463603, -77.393608] } },
                    { 10001: { coords: [39.464853, -77.392956] } },
                    { 10000: { coords: [39.463275, -77.393825] } },
                    { 10002: { coords: [39.465186, -77.392789] } },
                    { 10003: { coords: [39.465186, -77.392789] } },
                ],
                people: ['Riley'],
                camera: CameraConfigApple14,
            },
            '12/30/24': {
                name: 'Amber Meadows',
                id: [
                    { 6714: { coords: [39.445858, -77.411278] } },
                    { 6718: { coords: [39.442378, -77.410422] } },
                    6711, // SKIPPED
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '12/28/24': {
                name: 'Downtown Frederick',
                id: [
                    { 6578: { coords: [39.41295, -77.410642] } },
                    { 6573: { coords: [39.412858, -77.410189] } },
                    { 6594: { coords: [39.414217, -77.410856] } },
                    6632, // UNKNOWN
                    6608, // UNKNOWN
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '12/23/24': {
                name: 'Heather Ridge',
                id: [
                    { 6461: { coords: [39.43753957, -77.41466463] } },
                    { 6473: { coords: [39.43972132, -77.41174368] } },
                    { 6449: { coords: [39.446144, -77.410722] } },
                ],
                camera: CameraConfigApple14,
            },
            '12/17/24': {
                name: 'Rosemont',
                id: [6272, 6263, 6275, 6277, 6281, 6297],
                people: ['Riley'],
                camera: CameraConfigApple14,
            },
            '12/13/24': {
                name: 'Downtown Frederick',
                id: [
                    { 6194: { coords: [39.416119, -77.410639] } },
                    { 6171: { coords: [39.412742, -77.409206] } },
                    { 6197: { coords: [39.416119, -77.410639] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '12/02/24': {
                name: 'Amber Meadows',
                id: [
                    { 6030: { coords: [39.448925, -77.410664] } },
                    6029, // UNKNOWN
                    { 6018: { coords: [39.448925, -77.410664] } },
                ],
                camera: CameraConfigApple14,
            },
            '11/30/24': {
                name: 'Downtown Frederick',
                id: [
                    { 5980: { coords: [39.412742, -77.410333] } },
                    { 5979: { coords: [39.412742, -77.410333] } },
                    { 5961: { coords: [39.411814, -77.405583] } },
                    { 5972: { coords: [39.412706, -77.409169] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '11/26/24': {
                name: 'Rosemont',
                id: [5858, 5845, 5851, 5854, 5863, 5869, 5881, 5900],
                people: ['Riley'],
                camera: CameraConfigApple14,
                // GPS LATER
            },
            '11/23/24': {
                name: 'Downtown Frederick',
                id: [
                    { 5798: { coords: [39.412872, -77.409681] } },
                    5779, // UNKNOWN
                    { 5769: { coords: [39.411911, -77.405597] } },
                    { 5780: { coords: [39.414103, -77.410906] } },
                ],
                people: ['Redacted A'],
                camera: CameraConfigApple14,
            },
            '11/19/24': {
                name: 'White Rock',
                id: [5629, 5653, 5635, 5636, 5644, 5648, 5657, 5673, 5682],
                people: ['Riley', 'Matt'],
                camera: CameraConfigApple14,
                // GPS LATER
            },
            '11/12/24': {
                name: 'Amber Meadows',
                id: [
                    { 5494: { coords: [39.429839, -77.412781] } },
                    { 5490: { coords: [39.429839, -77.412781] } },
                    { 5498: { coords: [39.450153, -77.412214] } },
                ],
                camera: CameraConfigApple14,
            },
            '10/27/24': {
                name: 'Clerestory Park',
                id: [
                    { 5209: { coords: [39.465128, -77.392772] } },
                    { 5219: { coords: [39.465128, -77.392772] } },
                    { 5212: { coords: [39.465128, -77.392772] } },
                    { 5196: { coords: [39.458183, -77.4084] } },
                ],
                camera: CameraConfigApple14,
            },
            '10/26/24': {
                name: 'Downtown Frederick',
                id: [
                    { 5176: { coords: [39.417081, -77.414456] } },
                    { 5190: { coords: [39.414028, -77.414822] } },
                    { 5191: { coords: [39.416808, -77.413911] } },
                    { 5187: { coords: [39.415214, -77.414811] } },
                ],
                camera: CameraConfigApple14,
            },
            '10/23/24': {
                name: 'Patomac Commons',
                people: ['Redacted A'],
                id: ['5128a', 5126, 5129],
                camera: CameraConfigApple14,
            },
            '10/20/24': {
                name: 'Amber Meadows',
                id: [5076, 5072, 5077, 5080],
                camera: CameraConfigApple14,
            },
            '10/18/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [5025, 5042, 5044, 5023],
                camera: CameraConfigApple14,
            },
            '10/16/24': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Ed', 'Joe'],
                id: [4946, 4959, 4955],
                camera: CameraConfigApple14,
            },
            '10/12/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [4864, 4861, 4885, 4875, 4874, 4868],
                camera: CameraConfigApple14,
            },
            '10/05/24': {
                name: 'Amber Meadows',
                people: ['Redacted A'],
                id: [4771],
                camera: CameraConfigApple14,
            },
            '09/21/24': {
                name: 'Frederick Fair',
                people: ['Redacted A', 'Jeremy'],
                id: [4654, 4661],
                camera: CameraConfigApple14,
            },
            '09/15/24': {
                name: 'Frederick Fair',
                people: ['Redacted A'],
                id: ['4591a', '4597a', '4598a'],
                camera: CameraConfigApple14,
            },
            '09/13/24': {
                name: 'Downtown Frederick',
                id: [4505, 4515, 4504, 4493, 4502, 4489, 4497],
                camera: CameraConfigApple14,
            },
            '09/08/24': {
                name: 'Amber Meadows',
                id: [4419, 4430, 4436],
                camera: CameraConfigApple14,
            },
            '08/03/24': {
                name: 'Washington D.C.',
                people: ['Redacted A', 'Jeremy', 'Redacted B'],
                id: [4018, 3778, 3796, 3890, 3901, 4012, 4057, 3709],
                camera: CameraConfigApple14,
            },
            '07/27/24': {
                name: 'Weverton Cliffs',
                people: ['Redacted A', 'Jeremy', 'Jayvan', 'Sam', 'Alex'],
                id: [
                    { 3521: { coords: [39.3320587, -77.6766005] } },
                    { 3523: { coords: [39.3320587, -77.6766005] } },
                    { 3579: { coords: [39.3320587, -77.6766005] } },
                    3475, // UNKNOWN LOCATIONS
                ],
                camera: CameraConfigApple14,
                featured: 4,
            },
            '07/26/24': {
                name: 'Rock Creek',
                people: ['Redacted A'],
                id: [3414, 3433, 3434, 3435, 3397],
                camera: CameraConfigApple14,
            },
            '07/25/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [3246, 3245, 3356],
                camera: CameraConfigApple14,
            },
            '07/19/24': {
                name: 'Rock Creek',
                id: [3210, 3213, 3208, 3187, 3189, 3199, 3205, 3206],
                camera: CameraConfigApple14,
            },
            '07/15/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [3093, 3092, 3065, 3082, 3075, 3078],
                camera: CameraConfigApple14,
            },
            '07/14/24': {
                name: 'Rose Hill',
                id: [3043, 3013, 3015, 3019, 3037, 3040, 3008, 3024],
                camera: CameraConfigApple14,
            },
            '07/10/24': {
                name: 'Cunningham Falls',
                people: ['Redacted A', 'Jeremy'],
                id: [2902, 2900, 2898, 2891, 2865, 2842, 2921, 2889, 2881, 2864, 2915, 2912, 2875, 2851],
                camera: CameraConfigApple14,
            },
            '07/09/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [2783, 2787, 2801, 2798, 2793, 2784, 2808],
                camera: CameraConfigApple14,
            },
            '07/08/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [2735, 2693, 2692, 2703, 2714, 2719, 2727, 2731],
                camera: CameraConfigApple14,
            },
            '07/05/24': {
                name: 'Mountaindale',
                people: ['Riley'],
                id: [2575, 2578, 2576, 2657],
                camera: CameraConfigApple14,
            },
            '07/04/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A', 'Jeremy'],
                id: [9996, 9997, 9998, 2526, 2508, 2506, 2505, 2477, 2472, 2467],
                camera: CameraConfigApple14,
            },
            '07/03/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [2420, 2430, 2429, 2425, 2416],
                camera: CameraConfigApple14,
            },
            '07/02/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [2293, 2309, 2312, 2317, 2364],
                camera: CameraConfigApple14,
            },
            '07/01/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [2245, 2283, 2257, 2253, 2250, 2248, 2247, 2245, 2237, 2233],
                camera: CameraConfigApple14,
            },
            '06/28/24': {
                name: 'Rock Creek',
                people: ['Redacted A'],
                id: [2151, 2146, 2134],
                camera: CameraConfigApple14,
            },
            '06/26/24': {
                name: 'Rock Creek',
                people: ['Redacted A'],
                id: [2024, 2021, 2017, 2015],
                camera: CameraConfigApple14,
            },
            '06/22/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [1814, 1783, 1813, 1795],
                camera: CameraConfigApple14,
            },
            '06/23/24': {
                name: 'Clerestory Park',
                id: [1850, 1848, 1853, 1840, 1843],
                camera: CameraConfigApple14,
            },
            '06/20/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [1730, 1759, 1756, 1699, 1677, 1676, 1666, 1764],
                camera: CameraConfigApple14,
            },
            '06/13/24': {
                name: 'Clerestory Park',
                people: ['Riley', 'Redacted A'],
                id: [1404, 1400],
                camera: CameraConfigApple14,
            },
            '06/12/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [1472, 1460, 1458, 1448, 1447, 1442],
                camera: CameraConfigApple14,
            },
            '06/10/24': {
                name: 'Monocacy Crossing',
                people: ['Kobi', 'Ariel'],
                id: [1239, 1238, 1250, 1284],
                camera: CameraConfigApple14,
            },
            '06/09/24': {
                name: 'Clerestory Park',
                people: ['Redacted A'],
                id: [1175, 1186, 1193, 1198, 1199, 1203, 1209],
                camera: CameraConfigApple14,
            },
            '06/08/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [1020, 1102, 1025, 1039, 1052, 1091],
                camera: CameraConfigApple14,
            },
            '06/01/24': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: ['0728', '0723', '0716', '0694'],
                camera: CameraConfigApple14,
            },
            '05/25/24': {
                name: 'Rose Hill',
                people: ['Redacted A'],
                id: ['0537', '0533', '0529'],
                camera: CameraConfigApple14,
            },
            '05/14/24': {
                name: 'Downtown Frederick',
                id: ['0088', '0083', '0087', '0094'],
                camera: CameraConfigApple14,
            },
            '05/08/24': {
                name: 'FCC',
                id: [73652, 73624, 73720, 73716],
                camera: { name: 'Samsung Galaxy S22', mp: 50 },
            },
            '04/22/24': {
                name: 'Rose Hill',
                people: ['Redacted A'],
                id: [3026, 3028, 3018, 3016, 3029],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '03/29/24': {
                name: 'Rock Creek',
                people: ['Redacted A'],
                id: [2244, 2205, 2201, 2035, 2029, 2023, 2013],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '03/24/24': {
                name: 'North Crossing',
                people: ['Redacted A'],
                id: [1686, 1696, 1697],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '01/21/24': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [153007, 142112, 152225, 143436, 143201],
                camera: { name: 'Samsung Galaxy S22', mp: 50 },
            },
            '01/18/24': {
                name: 'Amber Meadows',
                people: ['Redacted A'],
                id: [72834, 65845, 65608, 65349, 64943, 64749],
                camera: { name: 'Samsung Galaxy S22', mp: 50 },
            },
            '01/07/24': {
                name: 'North Crossing',
                id: [9649, 9655, 9652],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '11/17/23': {
                name: 'Amber Meadows',
                id: [7785, 7777, 7787, 7788, 7780],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '10/29/23': {
                name: 'Downtown Frederick',
                id: [5128, 5137, 5133, 5130, 5127, 5124],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '10/24/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [4789, 4788, 4793, 4787, 4795],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '10/22/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [4589, 4591, 4592, 4628, 4598],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '10/21/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [4541, 4548, 4542, 4552, 4556],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '10/10/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [3518, 3519, 3514, 3520, 3527],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '09/21/23': {
                name: 'Amber Meadows',
                id: [2342, 2338, 2340, 2344, 2333],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '09/16/23': {
                name: 'Frederick Fair',
                people: ['Redacted A'],
                id: [2006, 2086, 2020],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '09/12/23': {
                name: 'Amber Meadows',
                id: [1419, 1441, 1433, 1421, 1416],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '09/05/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: ['0786', '0787', '0778'],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/13/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [9656, 9662, 9659, 9670],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/11/23': {
                name: 'Amber Meadows',
                people: ['Redacted A'],
                id: [9480, 9495, 9490, 9497],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/08/23': {
                name: 'Ocean City, MD',
                people: ['Riley'],
                id: [9385, 9396, 9397, 9343, 9334],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/07/23': {
                name: 'Ocean City, MD',
                people: ['Riley'],
                id: [9278, 9245, 9301, 143136, 143148],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/06/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [9125, 9128, 9138, 9141, 9180],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/05/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A', 'Riley'],
                id: [9054, 9061, 8879, 9096, 9074],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/04/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [8847, 8842, 8841, 8833],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/03/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [8812, 8794, 8811, 8753, 8752],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '07/29/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [8348, 8354, 8357, 8359, 8378, 8386, 8389],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '07/20/23': {
                name: 'Rose Hill',
                people: ['Cody', 'Redacted A'],
                id: [7933, 7936, 7927, 7918],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '07/05/23': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Cody'],
                id: [6593, 6582, 6603, 6649],
                caption: 'I walked 18 miles on this day.',
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '07/04/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A', 'Edin', 'Jeremy', 'Riley'],
                id: [6505, 6549, 6535, 6504, 6541],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '06/26/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [5935, 5949, 5976],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '06/19/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [5336, 5385, 5350, 5331, 5321, 5314, 5411],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '06/18/23': {
                name: 'Monocacy River',
                people: ['Redacted A'],
                id: [5046, 5091, 5107, 5156],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '06/16/23': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Liam'],
                id: [4876, 4877, 4870, 4883, 4897, 4907],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '06/05/23': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [3895, 3900, 3902, 3906, 3913, 3915, 3950],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '06/02/23': {
                name: 'North Crossing',
                people: ['Riley', 'Liam', 'Redacted A'],
                id: [3690, 3678, 3675],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '04/09/23': {
                name: 'Downtown Frederick',
                caption: 'Easter 2023, I walked 20 miles on this day.',
                id: ['0595', '0410', '0415', '0591', '0602'],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '04/02/23': {
                name: 'North Crossing',
                people: ['Riley', 'Edin'],
                id: ['0022', '0034', '0068', '0071'],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '03/25/23': {
                name: 'Downtown Frederick',
                people: ['Riley', 'Liam'],
                id: [9485, 9540, 9626, 9629],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '02/03/23': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [6991, 7031, 7034, 7143, 7138, 7131, 7078, 7052, 7049],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '01/24/23': {
                name: 'Amber Meadows',
                people: ['Riley'],
                id: [6647, 6642, 6625, 6623, 6599],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '01/06/23': {
                name: 'North Crossing',
                id: [5425, 5426, 5439, 5462, 5465, 5515],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '12/12/22': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [4498, 4514, 4519, 4535, 4536, 4540],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '12/04/22': {
                name: 'Downtown Frederick',
                id: [4277, 4322, 4330, 4331, 4348],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '09/18/22': {
                name: 'Frederick Fair',
                people: ['Edin', 'Max', 'Riley'],
                id: [1818, 1839, 1842, 1866, 1899, 1905, 1907],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/23/22': {
                name: 'Downtown Frederick',
                people: ['Evan', 'Riley'],
                id: ['0748', '0680', '0701', '0706', '0726'],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/16/22': {
                name: 'Downtown Frederick',
                id: ['0494', '0501', '0506', '0509', '0522', '0526', '0534', '0539'],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '08/06/22': {
                name: 'Downtown Frederick',
                people: ['Riley'],
                id: [8610, 8613, 8614, 8632, 8661, 8673],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '07/21/22': {
                name: 'Hershey Park',
                people: ['Riley'],
                id: [8086, 8090, 8093, 8120],
                camera: { name: 'iPhone 13', mp: 12 },
            },
            '11/28/21': {
                name: 'Downtown Frederick',
                people: ['Redacted A'],
                id: [1307, 1043, 1311, 1314],
                camera: { name: 'iPhone 13', mp: 12 },
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
            /*
            '06/11/26': {
                name: 'gopro road trip full footage',
                thumbnail: 'goproroadtrip.webp',
                link: 'https://drive.google.com/file/d/1ja_McV21CT0cMLkDragyrEXe6czC7joD',
            },
            */
            '05/31/25': {
                name: 'Homies Tape 8',
                thumbnail: 'homiestape8.jpg',
                id: 'KymvNC8jtIU',
                series: 'Homies Tape',
                description: 'SO MUCH YOVE.'
            },
            '06/03/23': {
                name: 'Homies Tape 7',
                thumbnail: 'homiestape7.jpg',
                id: 'jfX9XHAZXBQ',
                series: 'Homies Tape',
            },
            '01/01/23': {
                name: 'Homies Tape 6',
                thumbnail: 'homiestape6.jpg',
                id: '92msqUVUNAA',
                series: 'Homies Tape',
                description: `Homies in order of appearance:
Riley S.
Thaddeus M.
Aidan F.
Liam W.
Sam A.
Sophia B.
Kaitlyn F.
Michael M.
Kenyan S.
Matt S.
Kelvin A.
Max L.
Evan O.
Smoke Y.
Mikhael W.
Jayvan T.
Xavier
Paul
Alejandro
Luz

Homies Tape Sources:
Cooltext.com
TTsMP3.com
LGK20 V
iPhone 13
iPhone 12
Google Pixel 2

"Yung Lean - 'Agony' (Official Audio)"
   • Yung Lean - 'Agony' (Official Audio)  

"Lucki - Poker Face"
   • Video  

"Sematary & Elusin - 9 Scarecrows"
   • Sematary & Elusin - 9 Scarecrows  

"Lil B - Thank You BasedGod(BLACK KEN MIXTAPE)DIRECTED BY LIL B"


   • Lil B - Thank You BasedGod(BLACK KEN MIXTA...  

"Escape From the City (City Escape) - Sonic Adventure 2 [OST]"
   • Escape From the City (City Escape) - Sonic...  

"earthbound "WOW!" soundeffect"
   • earthbound "WOW!" soundeffect  

Spiffy Beat

"Legalize Nuclear Bombs ☢️ Swag Messiah 💦 Bees Make Honey 🐝"
   • Legalize Nuclear Bombs ☢️ Swag Messiah 💦 B...  

"GTA: San Andreas - Mission Passed Theme (2 versions)"
   • Video  

"Playboi Carti - Backroom (Instrumental) (BEST ON YOUTUBE)"
   • Playboi Carti - Backroom (Prod. Pierre Bou...  

"Sematary Haunted Mound Rainbow Bridge Howl Sound Effect Silent Hill"
   • Sematary - Haunted Mound - Rainbow Bridge ...  

"Ding Sound Effect"
   • Ding Sound Effect  

"Baby Keem x Playboi Carti Type Beat (BEAT SWITCH AT 1:21) | "Huey" (prod. kazimu)"
   • Baby Keem x Playboi Carti Type Beat (BEAT ...  `
            },
            '08/16/22': {
                name: 'Homies Tape 5',
                thumbnail: 'homiestape5.jpg',
                id: 't8-SiBabwAo',
                series: 'Homies Tape',
                description: `Homies Tape Playlist
   • homies tapes  

Matt’s Pal Cards
https://drive.google.com/drive/folder...

HOMIES IN ORDER OF APPEARANCE:

Riley S.
Thaddeus M.
Kaitlyn F.
Slurpee Men
Max L.
Sam A.
Woman with Dog
Guitar Man
Phillip
Cane
The Church Women
Matt S.
Cameron from Hershey Park
Kenyan S.
Mikhael W.

HOMIES TAPE SOURCES

GoPro Hero 7 Black
LG K20 V
IPhone 13
Pixel 5a
cooltext.com 

“Guy plays bladee - decay on piano’
   • guy plays bladee - decay on piano  

“Kodak Black Ft NBA Youngboy - water (FAST)
   • Kodak Black Ft NBA Youngboy - water  (FAST)  

“Double gulp cup (full video)”
   • double gulp cup (full video)  

“Lil B - B.O.R.(Birth Of Rap) BASED MUSIC VIDEO DIRECTED BY LIL B!!!!! ANSWER TO "D.O.R."”
   • Lil B - B.O.R.(Birth Of Rap) BASED MUSIC V...  

“Xxxtentacion - Vice City”
   • Xxxtentacion - Vice City  

“SEMATARY & GHOST MOUNTAIN - GOODBYE HORSES [HUNDRED ACRE WRIST}”
   • SEMATARY & GHOST MOUNTAIN - GOODBYE HORSES...  

“Bladee - Let’s Ride (Official Audio) 
   • bladee - Let's Ride (Official Audio)  

“Mii News (News Flash) - Tomodachi Life OST”
   • Video  

“Cash Carti - GOKU”
   • Video  

“Donkey Kong Country - Aquatic Ambience [Restored] OLD MIX”
   • Donkey Kong Country - Aquatic Ambience [Re...  

“TV Color Bars - Distorted with Static and Timecode”
   • TV Color Bars - Distorted with Static and ...  

“Impossible quiz theme song ( we are gonna fly now by Bill conti)”
   • Impossible quiz theme song (Gonna fly now ...  

“PSA Shield a”
   • PSI Shield a  

“One of Us - Caravelli - Kmart Radio”
   • One of Us - Caravelli - Kmart Radio  

“Ding Sound Effect”
   • Ding Sound Effect  

“SEMATARY & GHOST MOUNTAIN - BUNNY SUIT **OFFICIAL VIDEO**”
   • Video  

“Don’t ever buy no weed from the gas station”
   • Don’t ever buy no weed from the gas station  

“ZillaKami - YELLOW PISS (Official Audio)”
   • ZillaKami - YELLOW PISS (Official Audio)  

“Bike Horn Sound Effect”
   • Bike Horn Sound Effect  

Kanye West - Through The Wire
   • Kanye West - Through The Wire  

Freshie - Double Back
   • Freshie - Double Back  

KISS (SOUND EFFECT)
   • KISS (SOUND EFFECT)  

Cartoon Running - Sound Effect (HD)
   • Cartoon Running - Sound Effect (HD)  

Joey Bada$$ - Zipcodes (Official Video)
   • Joey Bada$$ - Zipcodes (Official Video)  

“Freshie - "midnightCLUB!” (feat. Trippie Redd) Official Lyric Visualizer”
   • Freshie - "midnightCLUB!” (feat. Trippie R...  

“Cha - Ching Money | Sound Effect”
   • Video  `
            },
            '06/07/22': {
                name: 'Homies Tape 4',
                thumbnail: 'homiestape4.jpg',
                id: '0zBHh7WyCrI',
                series: 'Homies Tape',
                description: `"HOMIES TAPE VOLUME 4" By Riley Sullivan

thank you for watching homies tape volume 4, look forward to homies tape volume 5 !!
shoutout 3xg spitz u know what it is
thanks to all the homies for making this project possible 🙏
godspeed
riley

bit.ly/homiestape4

Homies in order of appearance:

“Fat Man” Via Cameo
Thaddeus’s Mother + Friends
Riley S.
Kaitlyn F.
Max L.
Thaddeus M.
Logan, Cody, Paul, Alex and Matt
Mikhael and Brandon
Jason Derulo
Courage W.
Mr. Haughwout
Mall Man
Grant R.
Mr. O’Hara
Edin “Sam” A.
Kenyan S.
Steve
Jayvan T.

Sources Used:

cooltext.com
ttsmp3.com
GoPro Hero 7 Black
LG K20 V
Iphone 13
Google Pixel 5a

“HAUNTAHOLICS 🎃 REAL HAUNTED MOUND 🎃 VOICE TAG”
   • HAUNTAHOLICS 🎃 REAL HAUNTED MOUND 🎃 VOICE TAG  

“SEMATARY SOUND EFFECTS (PART 1) (HAUGH, HOWLING, CRYING, DJ SORROW TAGS)”
   • SEMATARY SOUND EFFECTS (PART 1) (HAUGH, HO...  

“sematary dj sorrow sound effect”
   • sematary dj sorrow sound effect  

Cameo Via Fat Man
https://www.cameo.com/recipient/6255f...

“YEAT - Ya Ya [Dir. by @DotComNirvan]”
   • YEAT - Ya Ya [Dir. by  @DotComNirvan]  

“03 Greedo Sweet Lady Produced by 03 Greedo”
   • 03 Greedo   Sweet Lady Produced by 03 Greedo  

“Vine Boom Sound Effect”
   • Vine Boom Sound Effect  

“2010” (“Yessirr”)
   • 2010  

“Happy Birthday Zach!”
   • Happy Birthday Zach!  

“Kanye West - God's Test (feat. KayCyy & Playboi Carti)”
   • Video  

“Slide Whistle 3 - Sound Effect”
   • Slide Whistle 3 - Sound Effect  

“Governor Cuomo Wishes Rev. Al Sharpton a Happy Birthday”
   • Governor Cuomo Wishes Rev. Al Sharpton a H...  

“Scatmans World (Official Video) HD -Scatman John”
   • Scatmans World (Official Video) HD -Scatma...  

“Minecraft Eating - Sound Effect (HD)”
   • Minecraft Eating - Sound Effect (HD)  

“Donald Trump says Homer Simpson”
   • Donald Trump says Homer Simpson  

“bladee - Be Nice To Me”
   • bladee - Be Nice To Me  

“(ORIGINAL) Change Da World My Final Message Goodbye”
   • Video  

“Water Droplet - Sound Effect (HD)“
   • Water Plop - Sound Effect (HD)  

“Ding Sound Effect”
   • Ding Sound Effect  

“Botswana Milk (Dairy) Processing”
   • Botswana Milk (Dairy) Processing  

“lil baby has lost it 🤣🤣🤣🤣🤣🤣”
   • lil baby has lost it 🤣🤣🤣🤣🤣🤣  

“Playboi Carti - Vamp Anthem (Official Audio)”
   • Playboi Carti - Vamp Anthem (Official Audio)  

“Knock Knock”
   • Knock Knock  

“”HOMIES TAPE VOLUME 1”" By Riley Sullivan”
   • "HOMIES TAPE VOLUME 1" By Riley Sullivan  

“60 Minutes Intro w: Meredith Veira (1990's)”
   • 60 Minutes Intro w: Meredith Veira (1990's)  

“DUCKWORTH”
   • DUCKWORTH.  

“Sound Effect - Camera shutter”
   • Sound Effect - Camera shutter  

“Fortnite Shield Potion (Fortnite Battle Royale) - Gaming Sound Effect (HD) | Sound Effects”
   • Fortnite Shield Potion (Fortnite Battle Ro...  

“ROBLOX "Bloxy Cola Drink" Sound Effect”
   • ROBLOX "Bloxy Cola Drink" Sound Effect  

“Minecraft Drinking Sound Effect”
   • Minecraft Drinking Sound Effect  

“$NOT - GOSHA (Official Music Video)”
   • $NOT - GOSHA (Official Music Video)  

“Rapp Snitch Knishes (feat. Mr. Fantastik)”
   • Rapp Snitch Knishes  

thanks for watching and have yourself a damn good one`
            },
            '03/31/22': {
                name: 'Homies Tape 3',
                thumbnail: 'homiestape3.jpg',
                id: 'sNjinZgbw98',
                series: 'Homies Tape',
                description: `"HOMIES TAPE VOLUME 3" By Riley Sullivan
Additional recordings provided by Thaddeus, Edin "Sam", and other homies.
Thanks for making homies tape volume 3 possible.

HOMIES IN ORDER OF APPEARENCE

Riley S.
Thaddeus M.
Edin “Sam” A.
Omare B.
Kenyan S.
Kelvin A.
Grant R.
Max L.
Matt S.
Teddy H.
Mini Kelvin
Larry O’hara
Maryland Man
Aaron H.
Michael M.
Wink and Dink
Childish Gambino
Fiddy Middle
Money Man
Josh A.
Gillian G.
Miranda G.
Kaitlyn F.
Thaddeus’ Mom
Lounging Larry
3XG Spitz
Alex R.
Daniel F.
Katie L.
Patrick
Grandma
Roger Rich

SOURCES USED -

cooltext.com

ttsmp3.com

imgflip.com

LGK20V

iPhone 13 Pro

GoPro Hero 7 Black

“Bladee - Noblest Strive Vocals + I Think Instrumental”
   • Bladee - Noblest Strive Vocals + I Think I...  

“Vine Boom Sound Effect (Longer Verison For Real)”
   • Vine Boom  

“It’s all completely hopeless” from “Top Gear Become Local Radio DJs | Top Gear”
   • Top Gear Become Local Radio DJs | Top Gear  

“TopGear "Stephen Hawking has arrived"”
   • TopGear "Stephen Hawking has arrived"  

“Life Of The Party”
   • Life Of The Party  

“Trippie Redd - Forever Young (Hate is Dead Mixtape) (Official Audio)”
   • Video  

“Playboi Carti - Rockstar Made (Official Audio)”
   • Playboi Carti - Rockstar Made (Official Au...  

“nice to meet u prod skys”
   • 3 hours of ripsquad beats  

“I came home from work at 5 o’clock / absolutely dreadful” from“Top Gear Become Local Radio DJs | Top Gear”
   • Top Gear Become Local Radio DJs | Top Gear  

“Welcome to Bank of America, this is a notice from the Chinese voice department”
   • Welcome to Bank of America, this is a noti...  
“You can get Mario smoking a joint in here” from “JerMall of America”
   • JerMall of America  

“Damn I Messed Up We Gotta Go Bald - Alive Again Meme”
   • Damn I Messed Up We Gotta Go Bald - Alive ...  


“Clash of C…”

“Please watch very important”
   • Video  


"Whatever" - The Bold and the Beautiful (2019)”
   • "Whatever" - The Bold and the Beautiful (2...  

“bladee laughing (isolated)”
   • bladee laughing (isolated)  

“Super Mario 64 - Water Theme / Dire Dire Docks - HD”
   • Video  

“What up Ye? This is Larry Hoover Jr.” From “Kanye West - Jesus Lord pt 2 (Audio)”
   • Kanye West - Jesus Lord pt 2 (Audio)  

“Oh hey Jimmy, I just wanted to tell you” from “House Flipper - PrankHouseTV”
   • House Flipper - PrankHouseTV  

“TM88 x Pi'erre Bourne - POP OUT (Official Video)”
   • TM88 x Pi'erre Bourne - POP OUT (Official ...  

“NEW PLAYBOI CARTI NARCISSIST INSTRUMENTAL|KP BEATS SHOWS NEW PLAYBOI CARTI BEAT ON NARCISSIST”
   • Video  

“3XG Spitz - Still I Rise”
   • Video  

Send love to 3xg spitz: 
   / @3xgspitz  

  / 3xgspitz  

“Scatmans World (Official Video) HD -Scatman John”
   • Scatmans World (Official Video) HD -Scatma...  

“Wassup Diggity Dogs”
   • Wassup Diggity Dogs  

“BlackMayo - Jus Know (Official Music Video) [Dir. stitch.films]”
   • BlackMayo - Jus Know (Official Music Video...  

“Super Mario 64 Soundtrack - Slider”
   • Super Mario 64 Soundtrack - Slider  

“No Lie” by Playboi Carti
Can’t find it on Youtube idk go look it up

“j. cole ~ no role modelz ﾉ slowed + reverb ﾉ”
   • j. cole ~ no role modelz ﾉ slowed + reverb ﾉ  

“Childish Gambino - This Is America (Official Video)”
   • Childish Gambino - This Is America (Offici...  

Narcissist beat edit by Thaddeus

“There is a ghost in the house” From “zillakami x sosmula - nitro cell (official music video” I can’t find the original sound for the life of me
   • zillakami x sosmula - nitro cell (official...   

“Playboi Carti - Moving Different”
   • Video  

“Dave Chappelle - Ja rule”
   • Dave Chappelle - Ja rule  

“Fetty Wap - Trap Queen (Official Video) Prod. By Tony Fadd”
   • Fetty Wap  - Trap Queen (Official Video) P...  

“Spongebob Patrick's Mouth on TV”
   • Spongebob Patrick's Mouth on TV  


“COCHISE - BREAKFAST”
   • COCHISE - BREAKFAST  

“Five Nights at Freddy's Soundtrack - Music Box (Freddy's Music)”
   • Five Nights at Freddy's Soundtrack - Music...  

Beats Produced by Spiffy

“Kanye West - No Child Left Behind (Audio)”
   • Kanye West - No Child Left Behind (Audio)`
            },
            '02/14/22': {
                name: 'Homies Tape 2',
                thumbnail: 'homiestape2.jpg',
                id: 'MPtJjS6f-4s',
                series: 'Homies Tape',
                description: `"HOMIES TAPE VOLUME 2" By Riley Sullivan
Homies Tape Volume 2 is Dedicated to Jonathan Day.
Rest in peace Mr. Day.
Thank you Mr. Day.

Thumbnail created by Thaddeus M.

FEATURING (in order of appearance):

Allison V.
Max L.
Peter C.
Courage W.
Riley S.
Grant R.
Matt S.
Kaitlyn F.
Sam “Peter 2” F.
Thaddeus M.
Edin “Sam” A.
Kelvin A.
Bruno D.
Steve
Aaron H.
Jax M.
Omare B.
“Pops”
“Mr. Haughwout 2”
“Yeat”
“Relaxed David”
David H.
Jonathan D. “Mr. Day”

SOURCES USED:

cooltext.com

ttsmp3.com

320ytmp3.com

KGK20V

GoPro Hero 7 Black

“[FREE DOWNLOAD] Playboi Carti x Pierre Bourne Drum Kit 2020 - "FAME" (RARE SOUNDS!)“
   • [FREE DOWNLOAD] Playboi Carti x Pierre Bou...  

“Vine Boom Sound Effect (Longer Version For Real)”
   • Vine Boom  

“TRIPPIE REDD ft. 6IX9INE - POLES1469 (official music video)”
   • TRIPPIE REDD ft. 6IX9INE - POLES1469 (OFFI...  

“LUMBERJACK (Audio)” (“OK” at 0:24)
   • LUMBERJACK (Audio)  

“Beep Me 911”
   • Beep Me 911  

“Ecco2K - Peroxide (Official Video)” (“True friend” at 3:29)
   • Ecco2k - Peroxide (Official Video)  

“Kanye West - Slave Name”
Bit.ly/yyeeezy

“Kitchen”
   • Kitchen  

“My dad sayin some funny ish. A must see video.”
   • My dad sayin some funny ish. A must see vi...  

“Freshie - Double Back”
   • Freshie - Double Back  

“The Courier Walks Softly - Fallout: New Vegas”
   • The Courier Walks Softly - Fallout: New Vegas  

“Topgear”

Spiffy beat 3 (prod. Spiffy)

“bladee - Be Nice To Me”
   • bladee - Be Nice To Me  

“Reborn”
   • Reborn  

“OMOCAT - OMORI OST - 153 Do You Remember?”
   • OMORI OST - 153 Do You Remember?  

“Young Thug - Day Before (with Mac Miller) [Official Audio]”
   • Young Thug - Day Before (with Mac Miller) ...`
            },
            '01/01/22': {
                name: 'Homies Tape 1',
                thumbnail: 'homiestape1.jpg',
                id: 'j1FrkuC4lPk',
                series: 'Homies Tape',
                description: `"HOMIES TAPE VOLUME 1" By Riley Sullivan
Thumbnail created by Thaddeus M.

FEATURING (in order of appearance):

Michael M.
Edin “Sam” A.
Jayvan T.
Thaddeus M.
Alex R.
Riley S.
Matt S.
Shepard B.
Trey G.
Paige S.
Teddy H.
Kelvin A.
Melanie H.
Allison V.
Larry O.
Max L.
Daniela C.
Courage W.
Lonnie D.
Kaitlyn F.
Sebastian D.

SOURCES USED:

cooltext.com

ttsmp3.com

imgflip.com

bit.ly/crimes3 - brothers / violent crimes

bit.ly/homiesone - homies tape volume 1 trailer

GoPro Hero 7 Black

LG K20V

“Athletic Theme - Yoshi’s Island”
   • Video  

Lil Uzi Vert - Baby Pluto [Official Audio]
   • Lil Uzi Vert - Baby Pluto [Official Audio]  

“Home run bat sound clip”
   • Home run bat sound clip  

“Scatmans World (Official Video) HD -Scatman John”
   • Scatmans World (Official Video) HD -Scatma...  

Beat created by Spiffy

“Pierre Bourne- UHH sound effect”
   • Pierre Bourne- UHH sound effect  

“Pi'erre Bourne - Switching Lanes (Audio) ft. Playboi Carti”
   • Pi'erre Bourne - Switching Lanes (Audio) f...  

“Check Mii Out Channel - Posting Plaza (Wii Rip)”
   • Video  

(Peter Griffin) “This Disney DVD (Extra Low Quality)”
   • Video  

“Vine Boom Sound Effect (Longer Version For Real) (Read Description Please)”
   • Vine Boom  

“Streets Of Rage 2 Soundtrack - Stage 1-1 (Go Straight)"
   • Streets Of Rage 2 Soundtrack - Stage 1-1 (...  

“Rapp Snitch Knishes (feat. Mr. Fantastik)”
   • Rapp Snitch Knishes  

“Playboi Carti - Over (Official Audio)”
   • Playboi Carti - Over (Official Audio)  

“Ke$ha - Die Young (Official)”
   • Ke$ha - Die Young (Official Video)  

“Guy drinking water while shaking meme”
   • Guy drinking water while shaking meme  

“Pi'erre Bourne - HULU (Audio)”
   • Pi'erre Bourne - HULU (Audio)  

“Mike Tomlin ‘We do not care’”
   • Mike Tomlin “We do not care”  

“Round 1 FIGHT!”
   • Round 1 FIGHT!  

“Father Stretch My Hands Pt. 1”
   • Father Stretch My Hands Pt. 1  

“2018 Frederick County Spelling Bee”
   • 2018 Frederick County Spelling Bee  

“Cochise - Tell Em (feat. $NOT) (Official Visualizer)”
   • Cochise - Tell Em (feat. $NOT) (Official V...  

“Playboi Carti - Location (Official Audio)”
   • Playboi Carti - Location (Audio)  

“Baby Keem, Kendrick Lamar - family ties (Official Video)”
   • Baby Keem, Kendrick Lamar - family ties (O...  

“Playboi Carti - ILoveUIHateU (Official Audio)”
   • Playboi Carti - ILoveUIHateU (Official Audio)  

“Playboi Carti - Vamp Anthem (Official Audio)”
   • Playboi Carti - Vamp Anthem (Official Audio)  

“Lil Uzi Vert - New Patek [Official Audio]”
   • Lil Uzi Vert - New Patek [Official Audio]  

“Cochise - CAUTIOUS (Official Video)”
   • Cochise - CAUTIOUS (Official Video)  

“LIL DARKIE - RAP MUSIC (PROD. WENDIGO) (MUSIC VIDEO)”
   • LIL DARKIE - RAP MUSIC (PROD. WENDIGO) (MU...  

“bladee - Be Nice To Me”
   • bladee - Be Nice To Me  

“Pi'erre Bourne - Racer (Official Audio)”
   • Pi'erre Bourne - Racer (Official Audio)  

"Whatever" - The Bold and the Beautiful (2019)”
   • "Whatever" - The Bold and the Beautiful (2...  

(Man walking into pond) “summer vibes”
   • summer vibes  

“Uncle Kracker - Drift Away (Official Video)”
   • Uncle Kracker - Drift Away (Official Video)  

“Cartoon Chomp Sound Effect”
   • Cartoon Chomp Sound Effect  

“Trippie Redd – Miss The Rage ft. Playboi Carti (Official Visualizer)”
   • Trippie Redd – Miss The Rage ft. Playboi C...  

“Yume Utsutsu”
   • Yume Utsutsu  

“Ginseng Strip 2002 *Sample*”
   • Ginseng Strip 2002 *Sample*  

“playboi carti - talk 2 me (prod. racki)”
   • Video  

“Juice WRLD - Want To ft. Playboi Carti (eris remix)”
   • Video  

“My Chemical Romance - Welcome To The Black Parade [Official Music Video] [HD]”
   • My Chemical Romance - Welcome To The Black...  

“Kanye West - Brothers / Violent Crimes”
Best version can be found at:
Bit.ly/crimes3

“Kanye West - Through The Wire”
   • Kanye West - Through The Wire  

“Moe Train”
https://www.cameo.com/moetrain?nodeId...`
            },
        },

        images: {
            '09/19/26': {
                name: 'Frederick, MD',
                id: ['0275'],
                people: ['Maya']
            },
            '04/29/25': {
                name: 'Monocacy River',
                id: [9894, 9897, 9909, 9892],
                people: ['Thaddeus']
            },
            '11/18/24': {
                name: 'Mountaindale',
                id: [7053, 7051, 7050],
                people: ['Thaddeus', 'Matt']
            },
            '07/03/24': {
                name: 'Frederick, MD',
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
            bio: 'Music Producer',
            icon: 'edin.jpg',
        },

        social: {
            'Instagram': 'https://www.instagram.com/edin_a15/',
            'SoundCloud': 'https://soundcloud.com/spiffy_beats',
        },

        images: {
            '09/06/26': {
                name: 'Queens, NY',
                id: [1127, 1308, "DSCN2230", 1128, 1164, "DSCN2210", "DSCN2229", "DSCN2255", "DSCN2259", "DSCN2262"],
                camera: CameraConfigNikonS9100
            },
            '09/05/26': {
                name: 'New York City, NY',
                id: [1134, 1166, 'DSCN2203'],
                people: ['German', 'Kayci', 'Kayla'],
                camera: CameraConfigNikonS9100
            },
            '06/21/24': {
                name: 'Downtown Frederick',
                id: [1020070, 1020063, 1020060, 1020054, 1020051, 1020048, 1020047, 1020103, 1020101],
                camera: CameraConfigApple12Pro
            }
        }
    }
}