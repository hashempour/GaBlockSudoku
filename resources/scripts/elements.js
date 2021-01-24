const ELEMENT_PATTERN_SIZE = 5;
const ELEMENT_MAX_OCCUPATION = 5;

const ELEMENTS = {
    ELEMENT_1: {
        KEY: 'ELEMENT_1',
        OCCUPATION: 1,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // VERTICAL LINE
    ELEMENT_2V: {
        KEY: 'ELEMENT_2V',
        OCCUPATION: 2,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_3V: {
        KEY: 'ELEMENT_3V',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_4V: {
        KEY: 'ELEMENT_4V',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_5V: {
        KEY: 'ELEMENT_5V',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ]
    },
    // HORIZONTAL LINE
    ELEMENT_2H: {
        KEY: 'ELEMENT_2H',
        OCCUPATION: 2,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_3H: {
        KEY: 'ELEMENT_3H',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_4H: {
        KEY: 'ELEMENT_4H',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_5H: {
        KEY: 'ELEMENT_5H',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // PLUS +
    ELEMENT_PLUS: {
        KEY: 'ELEMENT_PLUS',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // T
    ELEMENT_TU: {
        KEY: 'ELEMENT_TU',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_TD: {
        KEY: 'ELEMENT_TD',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_TR: {
        KEY: 'ELEMENT_TR',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_TL: {
        KEY: 'ELEMENT_TL',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // CORNER FIVE 5
    ELEMENT_C5TR: {
        KEY: 'ELEMENT_C5TR',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_C5TL: {
        KEY: 'ELEMENT_C5TL',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_C5DL: {
        KEY: 'ELEMENT_C5DL',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    // CORNER THREE 3
    ELEMENT_C5DR: {
        KEY: 'ELEMENT_C5DR',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_C3TR: {
        KEY: 'ELEMENT_C3TR',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_C3TL: {
        KEY: 'ELEMENT_C3TL',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_C3DL: {
        KEY: 'ELEMENT_C3DL',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_C3DR: {
        KEY: 'ELEMENT_C3DR',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 1, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BOX: {
        KEY: 'ELEMENT_BOX',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // L Vertical
    ELEMENT_LVTR: {
        KEY: 'ELEMENT_LVTR',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_LVTL: {
        KEY: 'ELEMENT_LVTL',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_LVDL: {
        KEY: 'ELEMENT_LVDL',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_LVDR: {
        KEY: 'ELEMENT_LVDR',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    // L Horizontal
    ELEMENT_LHTR: {
        KEY: 'ELEMENT_LHTR',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_LHTL: {
        KEY: 'ELEMENT_LHTL',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_LHDL: {
        KEY: 'ELEMENT_LHDL',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_LHDR: {
        KEY: 'ELEMENT_LHDR',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    // DIAGONAL REVERSE
    ELEMENT_DIAG2R: {
        KEY: 'ELEMENT_DIAG2R',
        OCCUPATION: 2,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_DIAG3R: {
        KEY: 'ELEMENT_DIAG3R',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_DIAG4R: {
        KEY: 'ELEMENT_DIAG4R',
        OCCUPATION: 4,
        PATTERN: [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    //ELEMENT_DIAG5R: {
    //    KEY: 'ELEMENT_DIAG5R',
    //    OCCUPATION: 5,
    //    PATTERN: [
    //        1, 0, 0, 0, 0,
    //        0, 1, 0, 0, 0,
    //        0, 0, 1, 0, 0,
    //        0, 0, 0, 1, 0,
    //        0, 0, 0, 0, 1
    //    ]
    //},
    // DIAGONAL REVERSE
    ELEMENT_DIAG2: {
        KEY: 'ELEMENT_DIAG2',
        OCCUPATION: 2,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_DIAG3: {
        KEY: 'ELEMENT_DIAG3',
        OCCUPATION: 3,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_DIAG4: {
        KEY: 'ELEMENT_DIAG4',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 1,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    //ELEMENT_DIAG5: {
    //    KEY: 'ELEMENT_DIAG5',
    //    OCCUPATION: 5,
    //    PATTERN: [
    //        0, 0, 0, 0, 1,
    //        0, 0, 0, 1, 0,
    //        0, 0, 1, 0, 0,
    //        0, 1, 0, 0, 0,
    //        1, 0, 0, 0, 0
    //    ]
    //},
    // ZED
    ELEMENT_ZEDH: {
        KEY: 'ELEMENT_ZEDH',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_ZEDV: {
        KEY: 'ELEMENT_ZEDV',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // S
    ELEMENT_SH: {
        KEY: 'ELEMENT_SH',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_SV: {
        KEY: 'ELEMENT_SV',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // BOWL
    ELEMENT_BOWLT: {
        KEY: 'ELEMENT_BOWLT',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BOWLD: {
        KEY: 'ELEMENT_BOWLD',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BOWLR: {
        KEY: 'ELEMENT_BOWLR',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BOWLL: {
        KEY: 'ELEMENT_BOWLL',
        OCCUPATION: 5,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    // BUTTON
    ELEMENT_BUTTONT: {
        KEY: 'ELEMENT_BUTTONT',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BUTTOND: {
        KEY: 'ELEMENT_BUTTOND',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BUTTONR: {
        KEY: 'ELEMENT_BUTTONR',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    ELEMENT_BUTTONL: {
        KEY: 'ELEMENT_BUTTONL',
        OCCUPATION: 4,
        PATTERN: [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    }
};


function getThreeRandomElements() {
    let elementKeys = Object.keys( ELEMENTS );

    return [
        ELEMENTS[ elementKeys[ Math.floor( Math.random() * elementKeys.length ) ] ],
        ELEMENTS[ elementKeys[ Math.floor( Math.random() * elementKeys.length ) ] ],
        ELEMENTS[ elementKeys[ Math.floor( Math.random() * elementKeys.length ) ] ]
    ];
}

function getOccupationOfElement ( element ) {
    // normalise the occupation value to 2 decimal precision according to the max occupation value
    return Math.round( element.OCCUPATION / ELEMENT_MAX_OCCUPATION * 100 ) / 100;
}