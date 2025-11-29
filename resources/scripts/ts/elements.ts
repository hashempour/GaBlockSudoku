const ELEMENT_PATTERN_SIZE: number = 5;
const ELEMENT_MAX_OCCUPATION: number = 5;

const ELEMENTS = {
    ELEMENT_1: {
        KEY: 'ELEMENT_1',
        OCCUPATION: 1,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // VERTICAL LINE
    ELEMENT_2V: {
        KEY: 'ELEMENT_2V',
        OCCUPATION: 2,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_3V: {
        KEY: 'ELEMENT_3V',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_4V: {
        KEY: 'ELEMENT_4V',
        OCCUPATION: 4,
        PATTERN: [
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_5V: {
        KEY: 'ELEMENT_5V',
        OCCUPATION: 5,
        PATTERN: [
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false
        ] as ARRAY_25_BOOL
    },
    // HORIZONTAL LINE
    ELEMENT_2H: {
        KEY: 'ELEMENT_2H',
        OCCUPATION: 2,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_3H: {
        KEY: 'ELEMENT_3H',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_4H: {
        KEY: 'ELEMENT_4H',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
             true,  true,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_5H: {
        KEY: 'ELEMENT_5H',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
             true,  true,  true,  true,  true,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // PLUS +
    ELEMENT_PLUS: {
        KEY: 'ELEMENT_PLUS',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false,  true,  true,  true, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // T
    ELEMENT_TU: {
        KEY: 'ELEMENT_TU',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_TD: {
        KEY: 'ELEMENT_TD',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false,  true,  true,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_TR: {
        KEY: 'ELEMENT_TR',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false, false,  true, false,
            false,  true,  true,  true, false,
            false, false, false,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_TL: {
        KEY: 'ELEMENT_TL',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false, false, false,
            false,  true,  true,  true, false,
            false,  true, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // CORNER FIVE 5
    ELEMENT_C5TR: {
        KEY: 'ELEMENT_C5TR',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false, false, false,  true, false,
            false, false, false,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_C5TL: {
        KEY: 'ELEMENT_C5TL',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false,  true, false, false, false,
            false,  true, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_C5DL: {
        KEY: 'ELEMENT_C5DL',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false, false, false,
            false,  true, false, false, false,
            false,  true,  true,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // CORNER THREE 3
    ELEMENT_C5DR: {
        KEY: 'ELEMENT_C5DR',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false, false,  true, false,
            false, false, false,  true, false,
            false,  true,  true,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_C3TR: {
        KEY: 'ELEMENT_C3TR',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true,  true, false,
            false, false, false,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_C3TL: {
        KEY: 'ELEMENT_C3TL',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true, false, false,
            false,  true, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_C3DL: {
        KEY: 'ELEMENT_C3DL',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true, false, false, false,
            false,  true,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_C3DR: {
        KEY: 'ELEMENT_C3DR',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false,  true, false,
            false, false,  true,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BOX: {
        KEY: 'ELEMENT_BOX',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true, false, false,
            false,  true,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // L Vertical
    ELEMENT_LVTR: {
        KEY: 'ELEMENT_LVTR',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true,  true, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_LVTL: {
        KEY: 'ELEMENT_LVTL',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_LVDL: {
        KEY: 'ELEMENT_LVDL',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false,  true,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_LVDR: {
        KEY: 'ELEMENT_LVDR',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false,  true, false, false,
            false, false,  true,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // L Horizontal
    ELEMENT_LHTR: {
        KEY: 'ELEMENT_LHTR',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false, false,  true, false,
            false,  true,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_LHTL: {
        KEY: 'ELEMENT_LHTL',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false, false, false,
            false,  true,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_LHDL: {
        KEY: 'ELEMENT_LHDL',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false,  true, false, false, false,
            false, false, false, false, false
        ]
    },
    ELEMENT_LHDR: {
        KEY: 'ELEMENT_LHDR',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false, false, false,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // DIAGONAL REVERSE
    ELEMENT_DIAG2R: {
        KEY: 'ELEMENT_DIAG2R',
        OCCUPATION: 2,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false, false, false,
            false, false,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_DIAG3R: {
        KEY: 'ELEMENT_DIAG3R',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false, false, false,
            false, false,  true, false, false,
            false, false, false,  true, false,
            false, false, false, false, false
        ]
    },
    ELEMENT_DIAG4R: {
        KEY: 'ELEMENT_DIAG4R',
        OCCUPATION: 4,
        PATTERN: [
             true, false, false, false, false,
            false,  true, false, false, false,
            false, false,  true, false, false,
            false, false, false,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    //ELEMENT_DIAG5R: {
    //    KEY: 'ELEMENT_DIAG5R',
    //    OCCUPATION: 5,
    //    PATTERN: [
    //         true, false, false, false, false,
    //        false,  true, false, false, false,
    //        false, false,  true, false, false,
    //        false, false, false,  true, false,
    //        false, false, false, false, 1
    //    ] as ARRAY_25_BOOL
    //},
    // DIAGONAL REVERSE
    ELEMENT_DIAG2: {
        KEY: 'ELEMENT_DIAG2',
        OCCUPATION: 2,
        PATTERN: [
            false, false, false, false, false,
            false, false, false,  true, false,
            false, false,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_DIAG3: {
        KEY: 'ELEMENT_DIAG3',
        OCCUPATION: 3,
        PATTERN: [
            false, false, false, false, false,
            false, false, false,  true, false,
            false, false,  true, false, false,
            false,  true, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_DIAG4: {
        KEY: 'ELEMENT_DIAG4',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false,  true,
            false, false, false,  true, false,
            false, false,  true, false, false,
            false,  true, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    //ELEMENT_DIAG5: {
    //    KEY: 'ELEMENT_DIAG5',
    //    OCCUPATION: 5,
    //    PATTERN: [
    //        false, false, false, false,  true,
    //        false, false, false,  true, false,
    //        false, false,  true, false, false,
    //        false,  true, false, false, false,
    //         true, false, false, false, false
    //    ] as ARRAY_25_BOOL
    //},
    // ZED
    ELEMENT_ZEDH: {
        KEY: 'ELEMENT_ZEDH',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true, false, false,
            false, false,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_ZEDV: {
        KEY: 'ELEMENT_ZEDV',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false,  true,  true, false, false,
            false,  true, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // S
    ELEMENT_SH: {
        KEY: 'ELEMENT_SH',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true,  true, false,
            false,  true,  true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_SV: {
        KEY: 'ELEMENT_SV',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false, false, false,
            false,  true,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // BOWL
    ELEMENT_BOWLT: {
        KEY: 'ELEMENT_BOWLT',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true, false,  true, false,
            false,  true,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BOWLD: {
        KEY: 'ELEMENT_BOWLD',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false,  true, false,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BOWLR: {
        KEY: 'ELEMENT_BOWLR',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true,  true, false,
            false, false,  true, false, false,
            false, false,  true,  true, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BOWLL: {
        KEY: 'ELEMENT_BOWLL',
        OCCUPATION: 5,
        PATTERN: [
            false, false, false, false, false,
            false,  true,  true, false, false,
            false, false,  true, false, false,
            false,  true,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    // BUTTON
    ELEMENT_BUTTONT: {
        KEY: 'ELEMENT_BUTTONT',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false,  true,  true,  true, false,
            false, false, false, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BUTTOND: {
        KEY: 'ELEMENT_BUTTOND',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false, false, false, false,
            false,  true,  true,  true, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BUTTONR: {
        KEY: 'ELEMENT_BUTTONR',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false, false,  true,  true, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    },
    ELEMENT_BUTTONL: {
        KEY: 'ELEMENT_BUTTONL',
        OCCUPATION: 4,
        PATTERN: [
            false, false, false, false, false,
            false, false,  true, false, false,
            false,  true,  true, false, false,
            false, false,  true, false, false,
            false, false, false, false, false
        ] as ARRAY_25_BOOL
    }
} as const;

type ELEMENT_KEY = keyof typeof ELEMENTS;
type ELEMENT = typeof ELEMENTS[ ELEMENT_KEY ];

function getThreeRandomElements(): ELEMENT[] {
    const elementKeys = Object.keys( ELEMENTS ) as ELEMENT_KEY[];

    const rand1: number = Math.floor( Math.random() * elementKeys.length );
    const rand2: number = Math.floor( Math.random() * elementKeys.length );
    const rand3: number = Math.floor( Math.random() * elementKeys.length );
    const firstKey = elementKeys[ rand1 ] as ELEMENT_KEY;
    const secondKey = elementKeys[ rand2 ] as ELEMENT_KEY;
    const thirdKey = elementKeys[ rand3 ] as ELEMENT_KEY;

    return [
        ELEMENTS[ firstKey ],
        ELEMENTS[ secondKey ],
        ELEMENTS[ thirdKey ]
    ] as ELEMENT[];
}

function getOccupationOfElement( element: ELEMENT ): number {
    // normalise the occupation value according to the max occupation value
    return element.OCCUPATION / ELEMENT_MAX_OCCUPATION;
}