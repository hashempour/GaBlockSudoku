let VISUALISE: VISUALISATION_STATE = VISUALISATION_STATE.FULL;
let DRAW_ALL_ELEMENTS: boolean = true;
let DEBUG_MODE: DEBUGMODE_STATE = DEBUGMODE_STATE.NONE;

// it will be defined either by user or during the learning process
let myChromosome: Chromosome | null = null; 

// TODO: for DEBUG only - remove next line ...
                                        myChromosome =  new Chromosome( 17.04, -49.77, 48.15, -14.78, 20.68, 21.92, -28.07, -30.14, -8.41 );

let LEARN_IN_PROGRESS: boolean = false;
let HALT_LEARNING: boolean = false;
let PLAY_TIME_MS: number = 50;


const SVG_NAMESPACE_URI: string = "http://www.w3.org/2000/svg";

const GAME_INFO = {
  BOARD_AREA: { SIZE: { X: 450, Y: 450 } },
  ELEMENT_AREA: { SIZE: { X: 450, Y: 100 } },
  ALL_ELEMENT_AREA: { SIZE: { X: 450, Y: 240 } },
  GUIDE_LINE_WIDTH: { PRIMARY: 3, SECONDARY: 1 },
  BLOCK_SIZE_PX: 50,
  BOARD_SIZE_BLOCK: 9,
  BOARD_BLOCK_SET_WIDTH: 3,
};

const PLAY_INFO = {
  score: 0,
  hiScore: 0,
  avgScore: 0,
  avgScoreList: [] as number[],
  currentElements: [] as ELEMENT[],
  boardState: Array( 81 ).fill( false ) as BOARD_STATE,
  // X: avg sparsity of cols
  // Y: avg sparsity of rows
  // Z: avg sparsity of 9-blocks
  // W: total occupation
  // T: avg complete sets ( row / col / 9-block )
  // S: avg total board integrity
  // P: side of the board occupation
  statistics: {
    // column integrity
    getX: function ( boardState: BOARD_STATE | undefined ): DivState {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet = new DivState();

      for ( let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++ ) {
        let gapSize = 0;
        for ( let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++ ) {
          const cellState = boardState[ row * GAME_INFO.BOARD_SIZE_BLOCK + col ];
          if ( cellState ) { // occupied cell
            gapSize = 0; // reset gap size
          } else {
            gapSize++;
            resultSet.addCount( col, gapSize );   // add up each gap-count to the column
          }
        }
      }

      resultSet.summerize9SetValue( 45 );
      return resultSet;
    },
    // row integrity
    getY: function ( boardState: BOARD_STATE | undefined ): DivState {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet = new DivState();

      for ( let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++ ) {
        let gapSize = 0;
        for ( let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++ ) {
          const cellState = boardState[ row * GAME_INFO.BOARD_SIZE_BLOCK + col ];
          if ( cellState ) {  // occupied cell
            gapSize = 0; // reset gap size
          } else {
            gapSize++;
            resultSet.addCount( row, gapSize );   // add up each gap-count to the row
          }
        }
      }

      resultSet.summerize9SetValue( 45 );
      return resultSet;
    },
    // 9 sets integrity
    getZ: ( boardState: BOARD_STATE | undefined ): DivState => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet = new DivState();

      for ( let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++ ) {
        const blockSetStates = PLAY_INFO.utils.getBlockSetStates( index, boardState );
        for ( let row = 0; row < GAME_INFO.BOARD_BLOCK_SET_WIDTH; row++ ) {
          for ( let col = 0; col < GAME_INFO.BOARD_BLOCK_SET_WIDTH; col++ ) {
            const traverseMap = Array( GAME_INFO.BOARD_SIZE_BLOCK ).fill( false ) as ARRAY_9_BOOL; // reset block traverse state
            const gapSize = getMatrixGapCount(
              row,
              col,
              traverseMap,
              blockSetStates
            );

            resultSet.addCount( index, gapSize );
          }
        }
      }

      resultSet.summerize9SetValue( 81 );
      return resultSet;
    },
    // occupation percentage
    getW: ( boardState: BOARD_STATE | undefined ): number => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      let result = 0;

      boardState.forEach( ( state ) => {
        result += state ? 1 : 0;
      } );

      result /= Math.pow( GAME_INFO.BOARD_SIZE_BLOCK, 2 ); // normalise the value according to the worst case value ( 9 * 9 )

      return result;
    },
    // occupation on sets (row / col / blockSet)
    getT: ( boardState: BOARD_STATE | undefined ): number => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      let result = 0;

      for ( let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++ ) {
        // blockSet
        result += isAllCellsOccupied(
          PLAY_INFO.utils.getBlockSetStates( index, boardState )
        )
          ? 1
          : 0;
        // row
        result += isAllCellsOccupied(
          PLAY_INFO.utils.getRowSetStates( index, boardState )
        )
          ? 1
          : 0;
        // col
        result += isAllCellsOccupied(
          PLAY_INFO.utils.getColSetStates( index, boardState )
        )
          ? 1
          : 0;
      }

      result /= 3 * GAME_INFO.BOARD_SIZE_BLOCK; // normalise the value according to the best case value ( 3 * 9 )

      return result;
    },
    // total board integrity
    getS: ( boardState: BOARD_STATE | undefined ): BoardIntegrityResult => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet = new BoardIntegrityResult();
      for (
        let index = 0;
        index < GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK;
        index++
      ) {
        const traverseMap = Array( GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK ).fill( false ) as BOARD_STATE; // reset block traverse state
        const gapSize = getMatrixGapCountFull(
          index % GAME_INFO.BOARD_SIZE_BLOCK,
          Math.floor( index / GAME_INFO.BOARD_SIZE_BLOCK ),
          traverseMap,
          boardState
        );

        resultSet.addCount( index, gapSize );
      }

      for ( let index = 0; index < resultSet.divCount.length; index++ ) {
        resultSet.divValue += resultSet.divCount[ index ];
      }

      resultSet.divValue /=
        GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK * 81; // normalise the value according to the worst case value ( 81 * 81 )

      return resultSet;
    },
    // side of the board occupation
    getP: ( boardState: BOARD_STATE | undefined ): number => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      let result = .0;

      for ( let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++ ) {
        for ( let row =  0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++ ) {
          result += 
            ( 
              Math.abs( col - Math.floor( GAME_INFO.BOARD_SIZE_BLOCK / 2 ) ) +
              Math.abs( row - Math.floor( GAME_INFO.BOARD_SIZE_BLOCK / 2 ) )
            ) * ( boardState[ row * GAME_INFO.BOARD_SIZE_BLOCK + col ] ? 1 : 0 )
        }
      }

      // normalise the number
      result /= ( GAME_INFO.BOARD_SIZE_BLOCK * .5 ) * boardState.length;

      return result;
    }
  },
  utils: {
    getBlockNo: ( row: number, col: number ): number => {
      return (
        Math.floor( col / GAME_INFO.BOARD_BLOCK_SET_WIDTH ) +
        Math.floor( row / GAME_INFO.BOARD_BLOCK_SET_WIDTH ) *
          GAME_INFO.BOARD_BLOCK_SET_WIDTH
      );
    },
    getBlockSetStates: ( blockSetIndex: number, boardState: BOARD_STATE | undefined ): boolean[][] => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet: boolean[][] = [];
      const blockSetOffset = new Cordinate(
          ( blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH ) * GAME_INFO.BOARD_BLOCK_SET_WIDTH, 
          Math.floor( blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH ) * GAME_INFO.BOARD_BLOCK_SET_WIDTH
      );

      for ( let rowIndex = 0; rowIndex < GAME_INFO.BOARD_BLOCK_SET_WIDTH; rowIndex++ ) {
        resultSet.push( [] );
        
        for ( let colIndex = 0; colIndex < GAME_INFO.BOARD_BLOCK_SET_WIDTH; colIndex++ ) {
          const row = rowIndex + blockSetOffset.y;
          const col = colIndex + blockSetOffset.x;
          resultSet[ rowIndex ].push(
            boardState[ row * GAME_INFO.BOARD_SIZE_BLOCK + col ]
          );
        }
      }

      return resultSet;
    },
    getRowSetStates: ( row: number, boardState: BOARD_STATE | undefined ): boolean[][] => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet: boolean[][] = [];
      resultSet.push( [] );

      for ( let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++ ) {
        resultSet[ 0 ].push(
          boardState[ row * GAME_INFO.BOARD_SIZE_BLOCK + col ]
        );
      }

      return resultSet;
    },
    getColSetStates: ( col: number, boardState: BOARD_STATE | undefined ): boolean[][] => {
      if ( boardState === undefined ) {
        boardState = PLAY_INFO.boardState;
      }

      const resultSet: boolean[][] = [];

      for ( let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++ ) {
        resultSet.push( [] );
        resultSet[ row ].push(
          boardState[ row * GAME_INFO.BOARD_SIZE_BLOCK + col ]
        );
      }

      return resultSet;
    },
  },
};

function getMatrixGapCount(
  row: number,
  col: number,
  traverseMap: boolean[],
  blockSetStates: boolean[][]
) {
  let gapCount = 0;

  const max = Math.sqrt( traverseMap.length );
  if (
    row < max && row > -1 &&
    col < max && col > -1 &&
    !traverseMap[ row * max + col ] &&
    !blockSetStates[ row ][ col ]
  ) {
    traverseMap[ row * max + col ] = true;

    gapCount =
      1 +
      getMatrixGapCount( row + 1, col, traverseMap, blockSetStates ) +
      getMatrixGapCount( row, col + 1, traverseMap, blockSetStates ) +
      getMatrixGapCount( row - 1, col, traverseMap, blockSetStates ) +
      getMatrixGapCount( row, col - 1, traverseMap, blockSetStates )
  }

  return gapCount;
};

function getMatrixGapCountFull(
  row: number,
  col: number,
  traverseMap: boolean[],
  boardState: boolean[]
) {
  let gapCount = 0;

  const max = Math.sqrt( traverseMap.length );
  if (
    row < max && row > -1 &&
    col < max && col > -1 &&
    !traverseMap[ row * max + col ] &&
    !boardState[ row * max + col ]
  ) {
    traverseMap[ row * max + col ] = true;

    gapCount =
      1 +
      getMatrixGapCountFull( row + 1, col, traverseMap, boardState ) +
      getMatrixGapCountFull( row, col + 1, traverseMap, boardState ) +
      getMatrixGapCountFull( row - 1, col, traverseMap, boardState ) +
      getMatrixGapCountFull( row, col - 1, traverseMap, boardState )
  }

  return gapCount;
};

function isPossibleToDrawOnStage( element: ELEMENT, offsetStagePoint: Cordinate, boardState: BOARD_STATE | undefined = undefined ): boolean {
  if ( boardState === undefined ) {
    boardState = PLAY_INFO.boardState;
  }

  for ( let i = 0; i < ELEMENT_PATTERN_SIZE; i++ ) {
    for ( let j = 0; j < ELEMENT_PATTERN_SIZE; j++ ) {
      if ( element.PATTERN[ j * ELEMENT_PATTERN_SIZE + i ] ) {
        const boardStateIndex =
          ( offsetStagePoint.y + j ) * GAME_INFO.BOARD_SIZE_BLOCK +
          ( offsetStagePoint.x + i );
        if (
          offsetStagePoint.y + j < 0 ||
          offsetStagePoint.y + j >= GAME_INFO.BOARD_SIZE_BLOCK ||
          offsetStagePoint.x + i < 0 ||
          offsetStagePoint.x + i >= GAME_INFO.BOARD_SIZE_BLOCK ||
          boardState[ boardStateIndex ]
        ) {
          // block OCCUPIED or OUT OF RANGE
          return false;
        }
      }
    }
  }

  return true;
}

function drawElementOnStage( element: ELEMENT, offsetStagePoint: Cordinate, additionalClass: string ): CellChangeEffect {
  const changeResult = new CellChangeEffect();

  //debugger;

  if ( isPossibleToDrawOnStage( element, offsetStagePoint ) ) {
    for ( let i = 0; i < ELEMENT_PATTERN_SIZE; i++ ) {
      for ( let j = 0; j < ELEMENT_PATTERN_SIZE; j++ ) {
        if ( element.PATTERN[ j * ELEMENT_PATTERN_SIZE + i ] ) {
          changeResult.changeCount += toggleStageBlockState(
            offsetStagePoint.y + j,
            offsetStagePoint.x + i,
            true,
            additionalClass
          )
          ? 1
          : 0;

          changeResult.addChange( offsetStagePoint.y + j, offsetStagePoint.x + i );
        }
      }
    }

    addScore( changeResult.changeCount );
  } else {
    if ( DEBUG_MODE != DEBUGMODE_STATE.NONE ) {
      console.info( "NOT POSSIBLE TO DRAW", element, offsetStagePoint );
    }
  }

  return changeResult;
}

function toggleStageBlockState(
  j: number,
  i: number,
  state: boolean,
  additonalClass: string = "",
  boardState: BOARD_STATE | undefined = undefined,
  isSimulate: boolean = false
): boolean {
  if ( boardState === undefined ) {
    boardState = PLAY_INFO.boardState;
  }

  let changed = false;
  let $stageBlock;
  if ( VISUALISE != VISUALISATION_STATE.NONE && !isSimulate ) {
    $stageBlock = $( "#stageBlock_" + j + "_" + i );
  }

  if ( boardState[ j * GAME_INFO.BOARD_SIZE_BLOCK + i ] !== state ) {
    if ( VISUALISE === VISUALISATION_STATE.FULL && !isSimulate ) {
      $stageBlock.toggleClass( "active " + additonalClass, state );
    }
    boardState[ j * GAME_INFO.BOARD_SIZE_BLOCK + i ] = state;

    changed = true;
  }

  return changed;
}

function addScore( value: number) {
  if ( !isNaN( value ) ) {
    PLAY_INFO.score += value;
    PLAY_INFO.hiScore = PLAY_INFO.hiScore < PLAY_INFO.score 
        ? PLAY_INFO.score 
        : PLAY_INFO.hiScore;

    updateScore();
  }
}

function updateScore() {
  if ( VISUALISE !== VISUALISATION_STATE.NONE ) {
    $( "#labelScore" ).text (PLAY_INFO.score );
    $( "#labelHighScore" ).text( PLAY_INFO.hiScore );
    //$('#labelX').text(PLAY_INFO.statistics.getX().divValue);
    //$('#labelY').text(PLAY_INFO.statistics.getY().divValue);
    //$('#labelZ').text(PLAY_INFO.statistics.getZ().divValue);
    //$('#labelW').text(PLAY_INFO.statistics.getW());
  }
}

function putRandom(): number[] {
  $( ".elementBlock.fresh" ).removeClass( "fresh" );

  const unsuccessful: number[] = [];

  drawNewElements().forEach( ( element, index: number ) => {
    let tryCount = 0;
    let randPosition;

    do {
      randPosition = new Cordinate(
          Math.floor(
            Math.random() *
              ( GAME_INFO.BOARD_SIZE_BLOCK + ELEMENT_PATTERN_SIZE * 2 )
          ) - ELEMENT_PATTERN_SIZE,
          Math.floor(
            Math.random() *
              ( GAME_INFO.BOARD_SIZE_BLOCK + ELEMENT_PATTERN_SIZE * 2 )
          ) - ELEMENT_PATTERN_SIZE,
        );
    } while ( !isPossibleToDrawOnStage( element, randPosition ) && tryCount++ < 100 );

    //console.debug( tryCount );
    if ( tryCount < 100 ) {
      // found suitable place
      drawElementOnStage( element, randPosition, "fresh" );
      checkForCleanup();
    } else {
      unsuccessful.push( index );
    }
  });

  return unsuccessful;
}

function checkForCleanup( boardState: BOARD_STATE | undefined = undefined, isSimulate: boolean = false ) {
  if ( boardState === undefined ) {
    boardState = PLAY_INFO.boardState;
  }

  const cleanupSet = new CleanupSet();

  // FIND TO CLEAN-UP

  // find block sets to cleanup
  for ( let blockIndex = 0; blockIndex < GAME_INFO.BOARD_SIZE_BLOCK; blockIndex++ ) {
    if (
      isAllCellsOccupied( PLAY_INFO.utils.getBlockSetStates( blockIndex, boardState ) )
    ) {
      cleanupSet.blockIndexes.push( blockIndex );
    }
  }

  // find rows to cleanup
  for ( let rowIndex = 0; rowIndex < GAME_INFO.BOARD_BLOCK_SET_WIDTH; rowIndex++ ) {
    if ( isAllCellsOccupied( PLAY_INFO.utils.getRowSetStates( rowIndex, boardState ) ) ) {
      cleanupSet.rowIndexes.push( rowIndex );
    }
  }

  //console.debug( 'as', affectionState);

  // find cols to cleanup
  for ( let colIndex = 0; colIndex < GAME_INFO.BOARD_BLOCK_SET_WIDTH; colIndex++ ) {
    if ( isAllCellsOccupied( PLAY_INFO.utils.getColSetStates( colIndex, boardState ) ) ) {
      cleanupSet.colIndexes.push( colIndex );
    }
  }

  // CLEAN-UP
  cleanUp( cleanupSet, boardState, isSimulate );
}

function isAllCellsOccupied( cells: boolean[][] ): boolean {
  if ( cells === undefined ) {
    throw new InvalidStateError( "Cells cannot be undefined!" );
  }

  for ( let rowIndex = 0; rowIndex < cells.length; rowIndex++ ) {
    if ( cells[ rowIndex ] === undefined ) {
      debugger;
      throw new InvalidStateError( "Cell row is undefined! " + rowIndex );
    }

    for ( let cellIndex = 0; cellIndex < cells[ rowIndex ].length; cellIndex++ ) {
      if ( !cells[ rowIndex ][ cellIndex ] ) {
        return false;
      }
    }
  }

  return true;
}

function cleanUp( cleanupSet: CleanupSet, boardState: BOARD_STATE | undefined = undefined, isSimulate: boolean = false ) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }

  // blockset
  cleanupSet.blockIndexes.forEach( ( index: number ) => {
    cleanupBlockSet( index, boardState, isSimulate );
    if ( !isSimulate ) {
      addScore( GAME_INFO.BOARD_SIZE_BLOCK * 2 ); // 9 * 2 -> BlockSet count
    }
  });

  // row
  cleanupSet.rowIndexes.forEach( ( index: number ) => {
    cleanupRowSet( index, boardState, isSimulate );
    if ( !isSimulate ) {
      addScore( GAME_INFO.BOARD_SIZE_BLOCK * 2 ); // 9 * 2 -> Row count
    }
  });

  // col
  cleanupSet.colIndexes.forEach( ( index: number ) => {
    //console.debug( index );
    cleanupColSet( index, boardState, isSimulate );
    if ( !isSimulate ) {
      addScore( GAME_INFO.BOARD_SIZE_BLOCK * 2 ); // 9 * 2 -> Col count
    }
  });
}

function cleanupBlockSet( blockSetIndex: number, boardState: BOARD_STATE | undefined = undefined, isSimulate: boolean = false ) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }

  let resultSet = { changeCount: 0 };

  //console.debug( '-- cleanup block #' + blockSetIndex );

  for ( let row = 0; row < GAME_INFO.BOARD_BLOCK_SET_WIDTH; row++ ) {
    for ( let col = 0; col < GAME_INFO.BOARD_BLOCK_SET_WIDTH; col++ ) {
      const i =
          ( blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH ) *
            GAME_INFO.BOARD_BLOCK_SET_WIDTH +
            col,
        j =
          Math.floor( blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH ) *
            GAME_INFO.BOARD_BLOCK_SET_WIDTH +
            row;

      resultSet.changeCount += toggleStageBlockState(
        j,
        i,
        false,
        "",
        boardState,
        isSimulate
      ) 
      ? 1 
      : 0;
    }
  }

  return resultSet;
}

function cleanupRowSet( rowSetIndex: number, boardState: BOARD_STATE | undefined = undefined, isSimulate: boolean = false ) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }

  let resultSet = { changeCount: 0 };

  //console.debug( '-- cleanup row #' + rowSetIndex );

  for (let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++) {
    resultSet.changeCount += toggleStageBlockState(
      rowSetIndex,
      col,
      false,
      "",
      boardState,
      isSimulate
    )
    ? 1
    : 0;
  }

  return resultSet;
}

function cleanupColSet( colSetIndex: number, boardState: BOARD_STATE | undefined = undefined, isSimulate: boolean = false ) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }

  let resultSet = { changeCount: 0 };

  //console.debug( '-- cleanup col #' + colSetIndex );

  for ( let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++ ) {
    resultSet.changeCount += toggleStageBlockState(
      row,
      colSetIndex,
      false,
      "",
      boardState,
      isSimulate
    )
    ? 1
    : 0;
  }

  return resultSet;
}

function resetBoard() {
  // data elements
  PLAY_INFO.score = 0;
  for (
    let index = 0;
    index < PLAY_INFO.boardState.length;
    PLAY_INFO.boardState[ index++ ] = false
  );

  // visual elements
  if ( VISUALISE !== VISUALISATION_STATE.NONE ) {
    $( "#svgElement .elementBlock" ).remove();
    $( "#svgStage .elementBlock" ).removeClass( "active " ).removeClass( "fresh" );

    updateStageVisualState();
  }

  updateScore();
}

function updateStageVisualState() {
  //console.debug( PLAY_INFO.boardState );
  for ( let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++ ) {
    for ( let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++ ) {
      $( "#stageBlock_" + j + "_" + i )
        .toggleClass(
          "active",
          PLAY_INFO.boardState[ j * GAME_INFO.BOARD_SIZE_BLOCK + i ]
        )
        .removeClass( "fresh" );
    }
  }
}

function showAllElements() {
  let $svgElementRepo = $( "#svgElementRepo" );

  // clean-up
  $svgElementRepo.find( ".elementBlock" ).remove();

  const elementKeys = Object.keys( ELEMENTS ) as ELEMENT_KEY[];
  const blockSize = GAME_INFO.BLOCK_SIZE_PX / 5;
  const elementDrawSpace = blockSize * ( ELEMENT_PATTERN_SIZE + 1 );

  const MAX_ELEMENT_IN_ROW = Math.floor(
    GAME_INFO.ALL_ELEMENT_AREA.SIZE.X / elementDrawSpace
  );

  $svgElementRepo.attr({
    height:
      elementDrawSpace * Math.ceil( elementKeys.length / MAX_ELEMENT_IN_ROW ),
  });

  elementKeys.forEach( ( elementKey: ELEMENT_KEY , index: number ) => {
    let element = ELEMENTS[ elementKey ];
    let centerPoint = {
      x: elementDrawSpace * Math.floor( index / MAX_ELEMENT_IN_ROW ),
      y: elementDrawSpace * ( index % MAX_ELEMENT_IN_ROW ),
    };

    for ( var i = 0; i < ELEMENT_PATTERN_SIZE; i++ ) {
      for ( var j = 0; j < ELEMENT_PATTERN_SIZE; j++ ) {
        if ( element.PATTERN[ j * ELEMENT_PATTERN_SIZE + i ] ) {
          $( document.createElementNS( SVG_NAMESPACE_URI, "rect" ) )
            .attr( {
              id: "elementBlockRepo" + "_" + i + "_" + j,
              class: "elementBlock active clickable " + elementKey,
              x: centerPoint.x + blockSize * i,
              y: centerPoint.y + blockSize * j,
              height: blockSize,
              width: blockSize,
              "stroke-width": GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
              "data-key": elementKey,
            } )
            .on( "click", repoElement_Click )
            .appendTo( $svgElementRepo );
        }
      }
    }
  } );
}

function changeGameMode( learnMode: boolean ) {
  console.info( "GAME MODE: " + ( learnMode ? "#LEARN" : "#PLAY" ) );

  $( ".gameModeItem.gameModePlay" ).toggleClass( "hiddenElement", learnMode );
  $( ".gameModeItem.gameModeLearn" ).toggleClass( "hiddenElement", !learnMode );

  if ( !learnMode ) {
    resetBoard();
  }
}

function isLearnMode() {
  return $( "#checkboxGameMode" ).is( ":checked" );
}

function changeLearnState( learning: boolean ) {
  $( "#buttonLearn" ).text( learning ? "STOP!" : "LEARN..." );
  LEARN_IN_PROGRESS = learning;
}

// ---- events ---- //

function repoElement_Click( this: SVGElement ) {
  //console.debug( $( this).attr( 'data-key' ) );
  if ( PLAY_INFO.currentElements.length >= 3 ) {
    PLAY_INFO.currentElements = []; // reset on 4th click
  }

  const elementKey = $( this ).attr( "data-key" ) as ELEMENT_KEY;
  PLAY_INFO.currentElements.push( ELEMENTS[ elementKey ] );

  drawNewElements( PLAY_INFO.currentElements );
}

function stageBlock_Click( this: SVGAElement ) {
  // custom state change by click
  if ( !isLearnMode() && !LEARN_IN_PROGRESS ) {
    let rowIndex = $( this ).prop( "data-row" );
    let colIndex = $( this ).prop( "data-col" );

    toggleStageBlockState(
      rowIndex,
      colIndex,
      !PLAY_INFO.boardState[ rowIndex * GAME_INFO.BOARD_SIZE_BLOCK + colIndex ],
    );
  }
}

function buttonPlayARound_Click() {
  if ( myChromosome === null ) {
    $( "#defineChromosomePanel.modal" ).addClass( "shown" );

    let msg =
      "Either define myChromosome DNA or LEARN the game for a while to set it automatically!\nmyChromosome = { a: #, b: #, c: #, d: #, e: #, f: #, g: #, h: # }; // # is DNA float number\n* The more generation game learns, the better chromosome you have for play!";
    console.info(msg);

    return;
  }

  if (PLAY_INFO.currentElements.length !== 3) {
    // It's JUST in case of the first round, if chromosome is defined by code
    // draw and choose 3 random elements to play with in the next round
    PLAY_INFO.currentElements = drawNewElements();
  }

  HALT_LEARNING = true;
  DEBUG_MODE = DEBUGMODE_STATE.DEBUG;

  $( "#buttonPlayARound" ).prop( "disabled", true );
  playARound( myChromosome, PLAY_INFO.currentElements );
}

function buttonLearn_Click() {
  if ( !LEARN_IN_PROGRESS ) {
    HALT_LEARNING = false;
    LEARN_IN_PROGRESS = true;
    GO();
  } else {
    LEARN_IN_PROGRESS = false;
  }

  changeLearnState( LEARN_IN_PROGRESS );
}

function checkboxGameMode_Click( e: MouseEvent ) {
  if ( LEARN_IN_PROGRESS ) {
    e.preventDefault();
    return false;
  }
}

function checkboxGameMode_Change( this: HTMLInputElement ) {
  changeGameMode( $( this ).is( ":checked" ) );
}

function checkboxFastForward_Change( this: HTMLInputElement ) {
  const $numberPlayTime = $( "#numberPlayTime" );
  const fastForward = $( this ).is( ":checked" );
  $numberPlayTime.prop( "disabled", fastForward );

  if ( fastForward ) {
    PLAY_TIME_MS = 0;
  } else {
    const value = $numberPlayTime.val();
    if ( !isNaN( value ) && value >= 0 ) {
      PLAY_TIME_MS = value;
    }
  }
}

function numberPlayTime_Change() {
  const value = $( "#numberPlayTime" ).val();
  if (!isNaN( value ) && value >= 0) {
    setTimeout( () => {
      PLAY_TIME_MS = value;
    }, 50 );
  }
}

function buttonGoForLearn_Click( this: HTMLButtonElement ) {
  $( "#labelGameMode" ).trigger( "click" );

  $( this ).parents( ".modal" ).removeClass( "shown" );
}

function buttonSubmitChromosomeData_Click( this: HTMLButtonElement ) {
  let isValid = true;
  const chromosomeData = new Chromosome( 0, 0, 0, 0, 0, 0, 0, 0, 0 );
  $( '#defineChromosomePanel_Body input[type="text"][data-key]' ).each(
    () => {
      const value = $( this ).val();
      const isNotNumber =
        value === null || value.trim().length === 0 || isNaN( $( this ).val() );
      $( this ).toggleClass( "error", isNotNumber );
      if ( isNotNumber ) {
        isValid = false;
      } else {
        chromosomeData.dna.set( $( this ).attr( "data-key" ) as string, Number( $( this ).val() ) );
      }
    }
  );

  if ( isValid ) {
    myChromosome = chromosomeData;

    // draw and choose 3 random elements to play with in the next round
    PLAY_INFO.currentElements = drawNewElements();

    $( this ).parents( ".modal" ).removeClass( "shown" );
  }
}
