"use strict";
class InvalidStateError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidStateError";
    }
}
class Chromosome {
    constructor(a, b, c, d, e, f, g, h, i) {
        this.dna = new Map();
        this.dna.set('a', a);
        this.dna.set('b', b);
        this.dna.set('c', c);
        this.dna.set('d', d);
        this.dna.set('e', e);
        this.dna.set('f', f);
        this.dna.set('g', g);
        this.dna.set('h', h);
        this.dna.set('i', i);
    }
    toString() {
        return `{ a: ${this.a}, b: ${this.b}, c: ${this.c}, d: ${this.d}, e: ${this.e}, f: ${this.f}, g: ${this.g}, h: ${this.h}, i: ${this.i} }`;
    }
    get a() {
        if (!this.dna.has('a')) {
            throw new InvalidStateError("Cannot find Gene A!");
        }
        return this.dna.get('a');
    }
    get b() {
        if (!this.dna.has('b')) {
            throw new InvalidStateError("Cannot find Gene B!");
        }
        return this.dna.get('b');
    }
    get c() {
        if (!this.dna.has('c')) {
            throw new InvalidStateError("Cannot find Gene C!");
        }
        return this.dna.get('c');
    }
    get d() {
        if (!this.dna.has('d')) {
            throw new InvalidStateError("Cannot find Gene D!");
        }
        return this.dna.get('d');
    }
    get e() {
        if (!this.dna.has('e')) {
            throw new InvalidStateError("Cannot find Gene E!");
        }
        return this.dna.get('e');
    }
    get f() {
        if (!this.dna.has('f')) {
            throw new InvalidStateError("Cannot find Gene F!");
        }
        return this.dna.get('f');
    }
    get g() {
        if (!this.dna.has('g')) {
            throw new InvalidStateError("Cannot find Gene G!");
        }
        return this.dna.get('g');
    }
    get h() {
        if (!this.dna.has('h')) {
            throw new InvalidStateError("Cannot find Gene H!");
        }
        return this.dna.get('h');
    }
    get i() {
        if (!this.dna.has('i')) {
            throw new InvalidStateError("Cannot find Gene I!");
        }
        return this.dna.get('i');
    }
}
class Cordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class DivState {
    constructor() {
        this.divCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.divValue = 0;
    }
    addCount(index, count) {
        if (index >= this.divCount.length) {
            throw new InvalidStateError("index out of bound! " + index + " > " + this.divCount.length);
        }
        this.divCount[index] += count;
    }
    summerize9SetValue() {
        var _a;
        for (let index = 0; index < this.divCount.length; index++) {
            this.divValue += (10 - index) * ((_a = this.divCount[index]) !== null && _a !== void 0 ? _a : 0);
        }
        this.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45; // normalise the value according to the worst case value ( 9 * 45 )
        this.divValue = Math.round(this.divValue * 100) / 100; // 2 decimal precision
    }
}
class CellChangeEffect {
    constructor() {
        this.changeCount = 0;
        this.affectedRows = new Set();
        this.affectedCols = new Set();
        this.affectedCells = [];
    }
    addChange(rowIndex, colIndex) {
        this.affectedRows.add(rowIndex);
        this.affectedCols.add(colIndex);
        this.affectedCells.push(new Cordinate(colIndex, rowIndex));
    }
}
class CleanupSet {
    constructor() {
        this.blockIndexes = [];
        this.rowIndexes = [];
        this.colIndexes = [];
    }
}
class SuccessRate {
    constructor() {
        this.successRate = 0;
        this.ageCount = 0;
    }
}
class TotalSuccessRate {
    constructor() {
        this.best = 0;
        this.worst = 0;
        this.count = 0;
    }
}
class BoardIntegrityResult {
    constructor() {
        this.divCount = new Array(81).fill(0);
        this.divValue = 0;
    }
}
var VISUALISATION_STATE;
(function (VISUALISATION_STATE) {
    VISUALISATION_STATE[VISUALISATION_STATE["FULL"] = 0] = "FULL";
    VISUALISATION_STATE[VISUALISATION_STATE["TEXT"] = 1] = "TEXT";
    VISUALISATION_STATE[VISUALISATION_STATE["NONE"] = 2] = "NONE";
})(VISUALISATION_STATE || (VISUALISATION_STATE = {}));
var DEBUGMODE_STATE;
(function (DEBUGMODE_STATE) {
    DEBUGMODE_STATE[DEBUGMODE_STATE["NONE"] = 0] = "NONE";
    DEBUGMODE_STATE[DEBUGMODE_STATE["INFO"] = 1] = "INFO";
    DEBUGMODE_STATE[DEBUGMODE_STATE["DEBUG"] = 2] = "DEBUG";
})(DEBUGMODE_STATE || (DEBUGMODE_STATE = {}));
//# sourceMappingURL=types.js.map