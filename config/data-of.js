window.colors= {
    'ads': '#3366cc',
    'html': '#dc3912',
    'metier': '#ff9900',
    'stats': '#109618',
    'budget': '#ff0000',
    'compare': '#00ff00',
}

window.libelles= {
    'PAGE_HOME': 'Une mobile',
    'PAGE_DA': 'Détail article mobile',
    'TYPE_REQUEST': 'Nombre d\'appels réseau',
    'TYPE_WEIGHT': 'Poid (Kilo octets)',
    'CAT_NAME': 'catégorie',
}


window.data_budget = [
    {
        titre: 'Home requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_HOME',
        budget: 90,
        unit: 'appels',
        compare: [
            96, // L Equipe
            234, // 20 minutes
            91, // rt.com
            93, // PWA mobile.francetvinfo.fr
            310, // LCI
            218, // Le Parisien
            215, // Le Figaro
            323, // BFM TV
            102, // huffingtonpost.fr
        ]
    },
    {
        titre: 'Home poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_HOME',
        budget: 1500,
        unit: 'KB',
        compare: [
            1600, // L Equipe
            1400, // 20 minutes
            1300, // rt.com
            300, // PWA mobile.francetvinfo.fr
            2100, // LCI
            2300, // Le Parisien
            2300, // Le Figaro
            3000, // BFM TV
            1600, // huffingtonpost.fr
        ]
    },
    {
        titre: 'Détail article requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_DA',
        budget: 180,
        unit: 'appels',
        compare: [
            255, // L Equipe
            266, // 20 minutes
            84, // rt.com
            77, // PWA mobile.francetvinfo.fr
            302, // LCI
            555, // Le Parisien
            286, // Le Figaro
            366, // BFM TV
            195, // huffingtonpost.fr
        ]
    },
    {
        titre: 'Détail article poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_DA',
        budget: 3000,
        unit: 'KB',
        compare: [
            3300, // L Equipe
            4000, // 20 minutes
            3400, // rt.com
            161, // PWA mobile.francetvinfo.fr
            2800, // LCI
            4800, // Le Parisien
            2500, // Le Figaro
            5400, // BFM TV
            4100, // huffingtonpost.fr
        ]
    },
]
window.data_mesures = [
    {
        catname: 'metier',
        list: [
            {
                name: 'abtasty',
                filter: ['abtasty.com'],
            },
            {
                name: 'liveintercept',
                filter: ['liveintercept.com'],
            },
            {
                name: 'batch',
                filter: ['batch.com'],
            },
            {
                name: 'revive',
                filter: ['of-ajs-autopromo.php', 'aquaplatform'],
            },
        ]
    },
    {
        catname: 'stats',
        list: [
            {
                name: 'Google Analytics',
                filter: ['google-analytics.com'],
            },
            {
                name: 'xiti',
                filter: ['xiti', 'aticdn', 'akstat.io'],
            },
            {
                name: 'mpulse',
                filter: ['mpulse'],
            },
            {
                name: 'mediego',
                filter: ['mediego'],
            },
            {
                name: 'contentsquare',
                filter: ['contentsquare'],
            },
            {
                name: 'datadome',
                filter: ['datadome'],
            },
            {
                name: 'myfeelback',
                filter: ['kxcdn'],
            },
            {
                name: 'ownpage',
                filter: ['ownpage'],
            },
            {
                name: 'onfocus',
                filter: ['onfocus'],
            },
            {
                name: 'nuggad',
                filter: ['nuggad'],
            },
            {
                name: 'perfectmarket',
                filter: ['perfectmarket'],
            },
            {
                name: 'pixelfacebook',
                filter: [
                    'facebook.com/tr',
                    'connect.facebook.net/signals/config',
                ],
            },
        ]
    },
    {
        catname: 'ads',
        list: [
            {
                name: 'digiteka',
                filter: ['digiteka'],
            },
            {
                name: 'wibbitz',
                filter: [
                    'wibbitz',
                    'wbtz',
                    'alooma',
                ],
            },
            {
                name: 'invibes',
                filter: [
                    'invibes',
                    'r66net',
                ],
            },
            {
                name: 'taboola',
                filter: ['taboola'],
            },
            {
                name: 'ligatus',
                filter: [
                    'ligatus',
                    'ligadx'
                ],
            },
            {
                name: 'teads',
                filter: ['teads'],
            },
            {
                name: 'GCS',
                filter: ['survey.g.doubleclick'],
            },
            {
                name: 'viewpay',
                filter: [
                    'viewpay',
                    'jokerly',
                ],
            },
            {
                name: 'acpm',
                filter: ['audience.acpm.fr'],
            },
            {
                name: 'DFP',
                filter: [
                    'ads',
                    'googletag-',
                    'prebid',
                    'iasPET',
                    'doubleclick',
                    'fogl1onf',
                    'scorecardresearch',
                    'adfarm',
                    'googlesyndication',
                    'pubmatic',
                    'coll2onf',
                    'videostep.com',
                    'googletagservices.com/tag/js/gpt.js',
                    'storygize.net',
                    'bttrack.com',
                    'server.exposebox.com',
                    'hello.lqm.io',
                    'quantserve.com',
                    'omtrdc.net',
                    'tags.bluekai.com',
                    'bidswitch.net',
                    'google.com/pagead',
                    'exelator.com',
                    'yabidos.com',
                    'omnitagjs',
                ],
            },
        ]
    },
    {
        catname: 'html',
        list: [
            {
                name: 'OF',
                filter: [
                    'https://www.ouest-france.fr/',
                    'https://media.ouest-france.fr',
                    'https://sipaof.mgr.consensu.org',
                ],
            },
            {
                name: 'GTM',
                filter: [
                    'https://www.googletagmanager.com/',
                ],
            },
        ]
    },
];