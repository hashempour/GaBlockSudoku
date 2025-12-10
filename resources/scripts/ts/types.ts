type FixedArray<T, N extends number> =
    N extends N ? number extends N ? T[] :
    _FixedArray<T, N, []> : never;

type _FixedArray<T, N extends number, R extends unknown[]> =
    R['length'] extends N ? R : _FixedArray<T, N, [...R, T]>;

type BOARD_STATE = FixedArray<boolean, 81>;
type ARRAY_9_NUM = FixedArray<number, 9>;
type ARRAY_9_BOOL = FixedArray<boolean, 9>;
type ARRAY_25_BOOL = FixedArray<boolean, 25>

class InvalidStateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidStateError";
    }
}

class Chromosome {
    dna: Map<string, number>;

    constructor(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number,
        g: number,
        h: number,
        i: number,
    ) {
        this.dna = new Map<string, number>();
        this.dna.set( 'a', a );
        this.dna.set( 'b', b );
        this.dna.set( 'c', c );
        this.dna.set( 'd', d );
        this.dna.set( 'e', e );
        this.dna.set( 'f', f );
        this.dna.set( 'g', g );
        this.dna.set( 'h', h );
        this.dna.set( 'i', i );
    }

    toString(): string {
        return `{ a: ${ this.a }, b: ${ this.b }, c: ${ this.c }, d: ${ this.d }, e: ${ this.e }, f: ${ this.f }, g: ${ this.g }, h: ${ this.h }, i: ${ this.i } }`;
    }

    get a(): number {
        if ( !this.dna.has( 'a' ) ) {
            throw new InvalidStateError( "Cannot find Gene A!" );
        }

        return this.dna.get( 'a' )!;
    }

    get b(): number {
        if ( !this.dna.has( 'b' ) ) {
            throw new InvalidStateError( "Cannot find Gene B!" );
        }

        return this.dna.get( 'b' )!;
    }

    get c(): number {
        if ( !this.dna.has( 'c' ) ) {
            throw new InvalidStateError( "Cannot find Gene C!" );
        }

        return this.dna.get( 'c' )!;
    }

    get d(): number {
        if ( !this.dna.has( 'd' ) ) {
            throw new InvalidStateError( "Cannot find Gene D!" );
        }

        return this.dna.get( 'd' )!;
    }

    get e(): number {
        if ( !this.dna.has( 'e' ) ) {
            throw new InvalidStateError( "Cannot find Gene E!" );
        }

        return this.dna.get( 'e' )!;
    }

    get f(): number {
        if ( !this.dna.has( 'f' ) ) {
            throw new InvalidStateError( "Cannot find Gene F!" );
        }

        return this.dna.get( 'f' )!;
    }

    get g(): number {
        if ( !this.dna.has( 'g' ) ) {
            throw new InvalidStateError( "Cannot find Gene G!" );
        }

        return this.dna.get( 'g' )!;
    }

    get h(): number {
        if ( !this.dna.has( 'h' ) ) {
            throw new InvalidStateError( "Cannot find Gene H!" );
        }

        return this.dna.get( 'h' )!;
    }

    get i(): number {
        if ( !this.dna.has( 'i' ) ) {
            throw new InvalidStateError( "Cannot find Gene I!" );
        }

        return this.dna.get( 'i' )!;
    }
}

class Cordinate {
    x: number;
    y: number;

    constructor( x: number, y: number ) {
        this.x = x;
        this.y = y;
    }
}

class DivIntegrityResult {
    gapCount: ARRAY_9_NUM;

    constructor() {
        this.gapCount = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }

    addCount( index: number, count: number ): void {
        if ( index >= this.gapCount.length ) {
            throw new InvalidStateError( "index out of bound! " + index + " > " + this.gapCount.length );
        }

        this.gapCount[ index ] += count;
    }

    increment( index: number ): void {
        this.addCount( index, 1 );
    }

    getIntegrityValue( maxCellValue: number ): number {
        let sum = 0;
        for ( let index = 0; index < this.gapCount.length; index++ ) {
            sum += ( 10 - index ) * this.gapCount[ index ];
        }

        return sum / ( this.gapCount.length * maxCellValue ); // normalise the value according to the worst case value (e.g. 9 * 45 )
    }
}

class CellChangeEffect {
    changeCount: number;
    affectedRows: Set<number>;
    affectedCols: Set<number>;
    affectedCells: Cordinate[];

    constructor() {
        this.changeCount = 0;
        this.affectedRows = new Set<number>();
        this.affectedCols = new Set<number>();
        this.affectedCells = [];
    }

    addChange( rowIndex: number, colIndex: number ) {
        this.affectedRows.add( rowIndex );
        this.affectedCols.add( colIndex );
        this.affectedCells.push( new Cordinate( colIndex, rowIndex ) );
    }
}

class CleanupSet {
    blockIndexes: number[];
    rowIndexes: number[];
    colIndexes: number[];

    constructor() {
        this.blockIndexes = [];
        this.rowIndexes = [];
        this.colIndexes = [];
    }
}

class SuccessRate {
    successRate: number;
    ageCount: number;

    constructor() {
        this.successRate = 0;
        this.ageCount = 0;
    }
}

class TotalSuccessRate {
    best: number;
    worst: number;
    count: number;

    constructor() {
        this.best = 0;
        this.worst = 0;
        this.count = 0;
    }
}

class BoardIntegrityResult {
    gapCount: number[]; // [ 0 .. 80 ]; to be initialised

    constructor() {
        this.gapCount = new Array( 81 ).fill( 0 );
    }

    addCount( index: number, count: number ): void {
        if ( index >= this.gapCount.length ) {
            throw new InvalidStateError( "index out of bound! " + index + " > " + this.gapCount.length );
        }

        this.gapCount[ index ] += count;
    }

    increment( index: number ): void {
        this.addCount( index, 1 );
    }

    getIntegrityValue( maxCellValue: number ): number {
        let sum = 0;
        for ( let index = 0; index < this.gapCount.length; index++ ) {
            sum += this.gapCount[ index ];
        }

        return sum / ( this.gapCount.length * maxCellValue ); // normalise the value according to the worst case value ( 81 * 81 )
    }
}

enum VISUALISATION_STATE {
    FULL,
    TEXT,
    NONE,
}

enum DEBUGMODE_STATE {
    NONE,
    INFO,
    DEBUG,
}