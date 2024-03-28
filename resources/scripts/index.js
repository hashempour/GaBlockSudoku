var VISUALISE = 2; // 0, 1, 2
var DRAW_ALL_ELEMENTS = true;

var myChromosome = null; // it will be defined either by user or during the learning process

const SVG_NAMESPACE_URI = "http://www.w3.org/2000/svg";

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
  avgScoreList: [],
  currentElements: [],
  boardState: [                           // Block Set No
  0, 0, 0,    0, 0, 0,    0, 0, 0,        // 0    1     2
  0, 0, 0,    0, 0, 0,    0, 0, 0,
  0, 0, 0,    0, 0, 0,    0, 0, 0,

  0, 0, 0,    0, 0, 0,    0, 0, 0,        // 3    4     5
  0, 0, 0,    0, 0, 0,    0, 0, 0,
  0, 0, 0,    0, 0, 0,    0, 0, 0,

  0, 0, 0,    0, 0, 0,    0, 0, 0,        // 6    7     8
  0, 0, 0,    0, 0, 0,    0, 0, 0,
  0, 0, 0,    0, 0, 0,    0, 0, 0,
  ],
  // X: avg sparsity of cols
  // Y: avg sparsity of rows
  // Z: avg sparsity of 9-blocks
  // W: total occupation
  // T: avg complete sets ( row / col / 9-block )
  // S: avg total board integrity
  // P: side of the board occupation
  statistics: {
    // column integrity
    getX: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let resultSet = {
        divCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
        divValue: 0,
      };

      for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
        var gapSize = 0;
        for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
          var cellState = boardState[j * GAME_INFO.BOARD_SIZE_BLOCK + i];
          if (cellState && gapSize) { // === 1 && > 0
            resultSet.divCount[gapSize]++;
            gapSize = 0; // reset gap size
          }
          gapSize += !cellState;
        }
        if (gapSize) {
          resultSet.divCount[gapSize]++;
        }
      }

      for (var key in resultSet.divCount) {
        resultSet.divValue += (10 - Number(key)) * resultSet.divCount[key];
      }

      resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45; // normalise the value according to the worst case value ( 9 * 45 )
      resultSet.divValue = Math.round(resultSet.divValue * 100) / 100; // 2 decimal precision

      return resultSet;
    },
    // row integrity
    getY: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let resultSet = {
        divCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
        divValue: 0,
      };

      for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
        var gapSize = 0;
        for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
          var cellState = boardState[j * GAME_INFO.BOARD_SIZE_BLOCK + i];
          if (cellState && gapSize) {
            // === 1 && > 0
            resultSet.divCount[gapSize]++;
            gapSize = 0; // reset gap size
          }
          gapSize += !cellState;
        }
        if (gapSize) {
          resultSet.divCount[gapSize]++;
        }
      }

      for (var key in resultSet.divCount) {
        resultSet.divValue += (10 - Number(key)) * resultSet.divCount[key];
      }

      resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45; // normalise the value according to the worst case value ( 9 * 45 )
      resultSet.divValue = Math.round(resultSet.divValue * 100) / 100; // 2 decimal precision

      return resultSet;
    },
    // 9 sets integrity
    getZ: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let resultSet = {
        divCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
        divValue: 0,
      };

      var traverseMap;
      var blockSetStates;

      var getMatrixGapCount = function (blockSetOffset, row, col) {
        let gapCount = 0;

        if (
          row < GAME_INFO.BOARD_BLOCK_SET_WIDTH &&
          col < GAME_INFO.BOARD_BLOCK_SET_WIDTH &&
          !traverseMap[row * GAME_INFO.BOARD_BLOCK_SET_WIDTH + col] &&
          blockSetStates[row + blockSetOffset.y][col + blockSetOffset.x]
        ) {
          traverseMap[row * GAME_INFO.BOARD_BLOCK_SET_WIDTH + col] = true;

          gapCount =
            1 +
            getMatrixGapCount(blockSetOffset, row + 1, col) +
            getMatrixGapCount(blockSetOffset, row, col + 1);
          //+ getMatrixGapCount( blockSetOffset, row + 1  , col + 1 );        TODO: oriental should be considered later
        }

        return gapCount;
      };

      for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++) {
        traverseMap = {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
        }; // reset block traverse state
        blockSetStates = PLAY_INFO.utils.getBlockSetStates(index, boardState);
        for (let j = 0; j < GAME_INFO.BOARD_BLOCK_SET_WIDTH; j++) {
          for (let i = 0; i < GAME_INFO.BOARD_BLOCK_SET_WIDTH; i++) {
            let gapSize = getMatrixGapCount(
              {
                x:
                  (index % GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
                  GAME_INFO.BOARD_BLOCK_SET_WIDTH,
                y:
                  Math.floor(index / GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
                  GAME_INFO.BOARD_BLOCK_SET_WIDTH,
              },
              j,
              i
            );
            if (gapSize) {
              resultSet.divCount[gapSize]++;
            }
          }
        }
      }

      for (var key in resultSet.divCount) {
        resultSet.divValue += (10 - Number(key)) * resultSet.divCount[key];
      }

      resultSet.divValue /= GAME_INFO.BOARD_SIZE_BLOCK * 45; // normalise the value according to the worst case value ( 9 * 45 )
      resultSet.divValue = Math.round(resultSet.divValue * 100) / 100; // 2 decimal precision

      return resultSet;
    },
    // occupation percentage
    getW: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let result = 0;

      boardState.forEach(function (state) {
        result += state;
      });

      result /= Math.pow(GAME_INFO.BOARD_SIZE_BLOCK, 2); // normalise the value according to the worst case value ( 9 * 9 )
      result = Math.round(result * 100) / 100; // 2 decimal precision

      return result;
    },
    // occupation on sets (row / col / blockSet)
    getT: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let result = 0;

      for (let index = 0; index < GAME_INFO.BOARD_SIZE_BLOCK; index++) {
        // blockSet
        result += isAllCellsOccupied(
          PLAY_INFO.utils.getBlockSetStates(index, boardState)
        )
          ? 1
          : 0;
        // row
        result += isAllCellsOccupied(
          PLAY_INFO.utils.getRowSetStates(index, boardState)
        )
          ? 1
          : 0;
        // col
        result += isAllCellsOccupied(
          PLAY_INFO.utils.getColSetStates(index, boardState)
        )
          ? 1
          : 0;
      }

      result /= 3 * GAME_INFO.BOARD_SIZE_BLOCK; // normalise the value according to the best case value ( 9 * 9 )
      result = Math.round(result * 100) / 100; // 2 decimal precision

      return result;
    },
    // total board integrity
    getS: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let resultSet = {
        divCount: {}, // { 1: 0, 2: 0 .. 80: 0, 81: 0 }; to be initialised ahead
        divValue: 0,
      };

      var traverseMap = []; // [ 0: false, 1: false, .. 79: false, 80: false ]; to be initialised ahead

      for (
        let index = 0;
        index < GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK;
        index++
      ) {
        resultSet.divCount[index + 1] = 0; // set initial count of gaps to zero
        traverseMap.push(false); // set default block traverse state to 'false'
      }

      var getMatrixGapCount = function (offset) {
        let gapCount = 0;
        let cellIndex = offset.y * GAME_INFO.BOARD_SIZE_BLOCK + offset.x;

        if (
          offset.y < GAME_INFO.BOARD_SIZE_BLOCK &&
          offset.x < GAME_INFO.BOARD_SIZE_BLOCK &&
          !traverseMap[cellIndex] &&
          boardState[cellIndex]
        ) {
          traverseMap[cellIndex] = true;

          gapCount =
            1 + // add current cell state
            getMatrixGapCount({ x: offset.x + 1, y: offset.y }) +
            getMatrixGapCount({ x: offset.x, y: offset.y + 1 }) +
            getMatrixGapCount({ x: offset.x + 1, y: offset.y + 1 }); // TODO: oriental should be considered later
        }

        return gapCount;
      };

      for (
        let index = 0;
        index < GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK;
        index++
      ) {
        let gapSize = getMatrixGapCount({
          x: index % GAME_INFO.BOARD_SIZE_BLOCK,
          y: Math.floor(index / GAME_INFO.BOARD_SIZE_BLOCK),
        });
        if (gapSize) {
          resultSet.divCount[gapSize]++;
        }
      }

      for (var key in resultSet.divCount) {
        resultSet.divValue +=
          (GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK +
            1 -
            Number(key)) *
            resultSet.divCount[key];
      }

      resultSet.divValue /=
        GAME_INFO.BOARD_SIZE_BLOCK * GAME_INFO.BOARD_SIZE_BLOCK * 45; // normalise the value according to the worst case value ( 81 * 45 )
      resultSet.divValue = Math.round(resultSet.divValue * 100) / 100; // 2 decimal precision

      return resultSet;
    },
    // total board integrity
    getP: function (boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      let result = .0;

      for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
        for (let j =  0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
          result += 
            ( 
              Math.abs( i - Math.floor( GAME_INFO.BOARD_SIZE_BLOCK / 2 ) ) +
              Math.abs( j - Math.floor( GAME_INFO.BOARD_SIZE_BLOCK / 2 ) )
            ) * boardState[ i * GAME_INFO.BOARD_SIZE_BLOCK + j ]
        }
      }


      // normalise the number
      result /= ( GAME_INFO.BOARD_SIZE_BLOCK - 1 ) * boardState.length;
      result = Math.round(result * 100) / 100; // 2 decimal precision

      return result;
    }
  },
  utils: {
    getBlockNo: function (row, col) {
      return (
        Math.floor(col / GAME_INFO.BOARD_BLOCK_SET_WIDTH) +
        Math.floor(row / GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
          GAME_INFO.BOARD_BLOCK_SET_WIDTH
      );
    },
    getBlockSetStates: function (blockSetIndex, boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      blockSetIndex = Number(blockSetIndex);
      let resultSet = {};
      let blockSetOffset = {
        x:
          (blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
          GAME_INFO.BOARD_BLOCK_SET_WIDTH,
        y:
          Math.floor(blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
          GAME_INFO.BOARD_BLOCK_SET_WIDTH,
      };

      for (let j = 0; j < GAME_INFO.BOARD_BLOCK_SET_WIDTH; j++) {
        for (let i = 0; i < GAME_INFO.BOARD_BLOCK_SET_WIDTH; i++) {
          var row = j + blockSetOffset.y;
          var col = i + blockSetOffset.x;
          if (resultSet[row] === undefined) {
            resultSet[row] = {};
          }
          resultSet[row][col] =
            boardState[row * GAME_INFO.BOARD_SIZE_BLOCK + col];
        }
      }

      return resultSet;
    },
    getRowSetStates: function (row, boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      row = Number(row);
      let resultSet = {};
      resultSet[row] = {};

      for (let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++) {
        resultSet[row][col] =
          boardState[row * GAME_INFO.BOARD_SIZE_BLOCK + col];
      }

      return resultSet;
    },
    getColSetStates: function (col, boardState) {
      if (boardState === undefined) {
        boardState = PLAY_INFO.boardState;
      }

      col = Number(col); // to be sure of type
      let resultSet = {};

      for (let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++) {
        resultSet[row] = {};
        resultSet[row][col] =
          boardState[row * GAME_INFO.BOARD_SIZE_BLOCK + col];
      }

      return resultSet;
    },
  },
};

$(document).ready(function () {
  prepareStageArea();
  prepareElementArea();

  if (DRAW_ALL_ELEMENTS) {
    showAllElements();
  }

  $("#buttonPlayARound").on("click", buttonPlayARound_Click);
  $("#buttonLearn").on("click", buttonLearn_Click);

  $("#checkboxGameMode")
    .on("click", checkboxGameMode_Click)
    .on("change", checkboxGameMode_Change)
    .prop("checked", true)
    .trigger("change");

  $("#numberPlayTime").val(PLAY_TIME_MS).on("change", numberPlayTime_Change);
  $("#checkboxFastForward").on("change", checkboxFastForward_Change);
  $("#buttonGoForLearn").on("click", buttonGoForLearn_Click);
  $("#buttonSubmitChromosomeData").on(
    "click",
    buttonSubmitChromosomeData_Click
  );
});

function prepareStageArea() {
  let $svgStage = $("#svgStage");

  for (
    var x = 1;
    x < GAME_INFO.BOARD_AREA.SIZE.X / GAME_INFO.BLOCK_SIZE_PX;
    x++
  ) {
    $(document.createElementNS(SVG_NAMESPACE_URI, "line"))
      .attr({
        id: "guideLine_v" + x,
        x1: x * GAME_INFO.BLOCK_SIZE_PX,
        y1: 0,
        x2: x * GAME_INFO.BLOCK_SIZE_PX,
        y2: GAME_INFO.BOARD_AREA.SIZE.Y,
        stroke: "rgb(255,0,0)",
        "stroke-width":
          x % 3 == 0
            ? GAME_INFO.GUIDE_LINE_WIDTH.PRIMARY
            : GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
      })
      .appendTo($svgStage);
  }
  for (
    var y = 1;
    y < GAME_INFO.BOARD_AREA.SIZE.Y / GAME_INFO.BLOCK_SIZE_PX;
    y++
  ) {
    $(document.createElementNS(SVG_NAMESPACE_URI, "line"))
      .attr({
        id: "guideLine_h" + y,
        x1: 0,
        y1: y * GAME_INFO.BLOCK_SIZE_PX,
        x2: GAME_INFO.BOARD_AREA.SIZE.X,
        y2: y * GAME_INFO.BLOCK_SIZE_PX,
        stroke: "rgb(255,0,0)",
        "stroke-width":
          y % 3 == 0
            ? GAME_INFO.GUIDE_LINE_WIDTH.PRIMARY
            : GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
      })
      .appendTo($svgStage);
  }

  for (
    var i = 0;
    i < GAME_INFO.BOARD_AREA.SIZE.X / GAME_INFO.BLOCK_SIZE_PX;
    i++
  ) {
    for (
      var j = 0;
      j < GAME_INFO.BOARD_AREA.SIZE.Y / GAME_INFO.BLOCK_SIZE_PX;
      j++
    ) {
      $(document.createElementNS(SVG_NAMESPACE_URI, "rect"))
        .attr({
          id: "stageBlock_" + j + "_" + i,
          class: "elementBlock",
          x: GAME_INFO.BLOCK_SIZE_PX * i,
          y: GAME_INFO.BLOCK_SIZE_PX * j,
          height: GAME_INFO.BLOCK_SIZE_PX,
          width: GAME_INFO.BLOCK_SIZE_PX,
          stroke: "gray",
          "stroke-width": GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
        })
        .on("click", stageBlock_Click)
        .prop("data-row", j)
        .prop("data-col", i)
        .appendTo($svgStage);
    }
  }
}

function prepareElementArea() {
  //let $svgElement = $("#svgElement");
}

function drawNewElements(elements) {
  // clean-up
  $("#svgElement .elementBlock").remove();

  if (elements === undefined) {
    elements = getThreeRandomElements();
  }
  let elementDrawSpace = GAME_INFO.ELEMENT_AREA.SIZE.X / elements.length;

  if (VISUALISE === 2) {
    elements.forEach(function (element, index) {
      drawElement("elementBlock" + index, element, {
        x: elementDrawSpace * index + 20,
        y: 10,
      });
    });
  }

  return elements;
}

function drawElement(id, element, centerPoint) {
  let $svgElement = $("#svgElement");
  let blockSize = GAME_INFO.BLOCK_SIZE_PX / 3;

  for (var i = 0; i < ELEMENT_PATTERN_SIZE; i++) {
    for (var j = 0; j < ELEMENT_PATTERN_SIZE; j++) {
      if (element.PATTERN[j * ELEMENT_PATTERN_SIZE + i]) {
        $(document.createElementNS(SVG_NAMESPACE_URI, "rect"))
          .attr({
            id: id + "_" + i + "_" + j,
            class: "elementBlock active " + element.KEY,
            x: centerPoint.x + blockSize * i,
            y: centerPoint.y + blockSize * j,
            height: blockSize,
            width: blockSize,
            "stroke-width": GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
          })
          .appendTo($svgElement);
      }
    }
  }
}

function isPossibleToDrawOnStage(element, offsetStagePoint, boardState) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }

  for (var i = 0; i < ELEMENT_PATTERN_SIZE; i++) {
    for (var j = 0; j < ELEMENT_PATTERN_SIZE; j++) {
      if (element.PATTERN[j * ELEMENT_PATTERN_SIZE + i]) {
        let boardStateIndex =
          (offsetStagePoint.y + j) * GAME_INFO.BOARD_SIZE_BLOCK +
          (offsetStagePoint.x + i);
        if (
          offsetStagePoint.y + j < 0 ||
          offsetStagePoint.y + j >= GAME_INFO.BOARD_SIZE_BLOCK ||
          offsetStagePoint.x + i < 0 ||
          offsetStagePoint.x + i >= GAME_INFO.BOARD_SIZE_BLOCK ||
          boardState[boardStateIndex]
        ) {
          // block OCCUPIED or OUT OF RANGE
          return false;
        }
      }
    }
  }

  return true;
}

function drawElementOnStage(element, offsetStagePoint, additionalClass) {
  let resultSet = {
    changeCount: 0,
    affectedRows: {},
    affectedCols: {},
    affectedCells: {},
  };

  if (isPossibleToDrawOnStage(element, offsetStagePoint)) {
    for (var i = 0; i < ELEMENT_PATTERN_SIZE; i++) {
      for (var j = 0; j < ELEMENT_PATTERN_SIZE; j++) {
        if (element.PATTERN[j * ELEMENT_PATTERN_SIZE + i]) {
          resultSet.changeCount += toggleStageBlockState(
            offsetStagePoint.y + j,
            offsetStagePoint.x + i,
            1,
            additionalClass
          );
          resultSet.affectedRows[offsetStagePoint.y + j] = true; // dummy value; unique keys are important
          resultSet.affectedCols[offsetStagePoint.x + i] = true; // dummy value; unique keys are important
          resultSet.affectedCells[offsetStagePoint.y + j] =
            offsetStagePoint.x + i; // key: row, value: col
        }
      }
    }

    addScore(resultSet.changeCount);
  } else {
    console.info("NOT POSSIBLE TO DRAW", element, offsetStagePoint);
  }

  return resultSet;
}

function toggleStageBlockState(
  j,
  i,
  state,
  additonalClass,
  boardState,
  isSimulate
) {
  if (additonalClass === undefined) {
    additonalClass = "";
  }
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }
  if (isSimulate === undefined) {
    isSimulate = false;
  }

  i = Number(i);
  j = Number(j);
  let changed = 0;
  let $stageBlock;
  if (VISUALISE > 0 && !isSimulate) {
    $stageBlock = $("#stageBlock_" + j + "_" + i);
  }

  if (boardState[j * GAME_INFO.BOARD_SIZE_BLOCK + i] !== state) {
    if (VISUALISE === 2 && !isSimulate) {
      $stageBlock.toggleClass("active " + additonalClass, state === 1);
    }
    boardState[j * GAME_INFO.BOARD_SIZE_BLOCK + i] = state;

    changed = 1;
  }

  return changed;
}

function addScore(value) {
  if (!isNaN(value)) {
    PLAY_INFO.score += value;
    PLAY_INFO.hiScore =
      PLAY_INFO.hiScore < PLAY_INFO.score ? PLAY_INFO.score : PLAY_INFO.hiScore;

    updateScore();
  }
}

function updateScore() {
  if (VISUALISE > 0) {
    $("#labelScore").text(PLAY_INFO.score);
    $("#labelHighScore").text(PLAY_INFO.hiScore);
    //$('#labelX').text(PLAY_INFO.statistics.getX().divValue);
    //$('#labelY').text(PLAY_INFO.statistics.getY().divValue);
    //$('#labelZ').text(PLAY_INFO.statistics.getZ().divValue);
    //$('#labelW').text(PLAY_INFO.statistics.getW());
  }
}

function putRandom() {
  $(".elementBlock.fresh").removeClass("fresh");

  let unsuccessful = [];

  drawNewElements().forEach(function (element, index) {
    let tryCount = 0;
    let randPosition;

    do {
      randPosition = {
        x:
          Math.floor(
            Math.random() *
              (GAME_INFO.BOARD_SIZE_BLOCK + ELEMENT_PATTERN_SIZE * 2)
          ) - ELEMENT_PATTERN_SIZE,
        y:
          Math.floor(
            Math.random() *
              (GAME_INFO.BOARD_SIZE_BLOCK + ELEMENT_PATTERN_SIZE * 2)
          ) - ELEMENT_PATTERN_SIZE,
      };
    } while (!isPossibleToDrawOnStage(element, randPosition) && tryCount++ < 100);

    //console.debug( tryCount );
    if (tryCount < 100) {
      // found suitable place
      drawElementOnStage(element, randPosition, "fresh");
      checkForCleanup();
    } else {
      unsuccessful.push(index);
    }
  });

  return unsuccessful;
}

function checkForCleanup(boardState, isSimulate) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }
  if (isSimulate === undefined) {
    isSimulate = false;
  }

  let cleanupSet = { blockIndexes: [], rowIndexes: [], colIndexes: [] };

  // FIND TO CLEAN-UP

  // find block sets to cleanup
  for (var key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    if (
      isAllCellsOccupied(PLAY_INFO.utils.getBlockSetStates(key, boardState))
    ) {
      cleanupSet.blockIndexes.push(key);
    }
  }

  // find rows to cleanup
  for (var key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    if (isAllCellsOccupied(PLAY_INFO.utils.getRowSetStates(key, boardState))) {
      cleanupSet.rowIndexes.push(key);
    }
  }

  //console.debug( 'as', affectionState);

  // find cols to cleanup
  for (var key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    if (isAllCellsOccupied(PLAY_INFO.utils.getColSetStates(key, boardState))) {
      cleanupSet.colIndexes.push(key);
    }
  }

  // CLEAN-UP
  cleanUp(cleanupSet, boardState, isSimulate);
}

function isAllCellsOccupied(cells) {
  let result = true;

  for (var row in cells) {
    for (var cell in cells[row]) {
      if (!cells[row][cell]) {
        result = false;
        break;
      }
    }
  }

  return result;
}

function cleanUp(cleanupSet, boardState, isSimulate) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }
  if (isSimulate === undefined) {
    isSimulate = false;
  }

  // blockset
  cleanupSet.blockIndexes.forEach(function (index) {
    cleanupBlockSet(index, boardState, isSimulate);
    if (!isSimulate) {
      addScore(GAME_INFO.BOARD_SIZE_BLOCK * 2); // 9 * 2 -> BlockSet count
    }
  });

  // row
  cleanupSet.rowIndexes.forEach(function (index) {
    cleanupRowSet(index, boardState, isSimulate);
    if (!isSimulate) {
      addScore(GAME_INFO.BOARD_SIZE_BLOCK * 2); // 9 * 2 -> Row count
    }
  });

  // col
  cleanupSet.colIndexes.forEach(function (index) {
    //console.debug( index );
    cleanupColSet(index, boardState, isSimulate);
    if (!isSimulate) {
      addScore(GAME_INFO.BOARD_SIZE_BLOCK * 2); // 9 * 2 -> Col count
    }
  });
}

function cleanupBlockSet(blockSetIndex, boardState, isSimulate) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }
  if (isSimulate === undefined) {
    isSimulate = false;
  }

  let resultSet = { changeCount: 0 };

  //console.debug( '-- cleanup block #' + blockSetIndex );

  for (let row = 0; row < GAME_INFO.BOARD_BLOCK_SET_WIDTH; row++) {
    for (let col = 0; col < GAME_INFO.BOARD_BLOCK_SET_WIDTH; col++) {
      var i =
          (blockSetIndex % GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
            GAME_INFO.BOARD_BLOCK_SET_WIDTH +
          col,
        j =
          Math.floor(blockSetIndex / GAME_INFO.BOARD_BLOCK_SET_WIDTH) *
            GAME_INFO.BOARD_BLOCK_SET_WIDTH +
            row;

      resultSet.changeCount += toggleStageBlockState(
        j,
        i,
        0,
        "",
        boardState,
        isSimulate
      );
    }
  }

  return resultSet;
}

function cleanupRowSet(rowSetIndex, boardState, isSimulate) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }
  if (isSimulate === undefined) {
    isSimulate = false;
  }

  let resultSet = { changeCount: 0 };

  //console.debug( '-- cleanup row #' + rowSetIndex );

  for (let col = 0; col < GAME_INFO.BOARD_SIZE_BLOCK; col++) {
    resultSet.changeCount += toggleStageBlockState(
      rowSetIndex,
      col,
      0,
      "",
      boardState,
      isSimulate
    );
  }

  return resultSet;
}

function cleanupColSet(colSetIndex, boardState, isSimulate) {
  if (boardState === undefined) {
    boardState = PLAY_INFO.boardState;
  }
  if (isSimulate === undefined) {
    isSimulate = false;
  }

  let resultSet = { changeCount: 0 };

  //console.debug( '-- cleanup col #' + colSetIndex );

  for (let row = 0; row < GAME_INFO.BOARD_SIZE_BLOCK; row++) {
    resultSet.changeCount += toggleStageBlockState(
      row,
      colSetIndex,
      0,
      "",
      boardState,
      isSimulate
    );
  }

  return resultSet;
}

function resetBoard() {
  // data elements
  PLAY_INFO.score = 0;
  for (
    let index = 0;
    index < PLAY_INFO.boardState.length;
    PLAY_INFO.boardState[index++] = 0
  );

  // visual elements
  if (VISUALISE > 0) {
    $("#svgElement .elementBlock").remove();
    $("#svgStage .elementBlock").removeClass("active ").removeClass("fresh");

    updateStageVisualState();
  }

  updateScore();
}

function updateStageVisualState() {
  //console.debug( PLAY_INFO.boardState );
  for (let i = 0; i < GAME_INFO.BOARD_SIZE_BLOCK; i++) {
    for (let j = 0; j < GAME_INFO.BOARD_SIZE_BLOCK; j++) {
      $("#stageBlock_" + j + "_" + i)
        .toggleClass(
          "active",
          PLAY_INFO.boardState[j * GAME_INFO.BOARD_SIZE_BLOCK + i] === 1
        )
        .removeClass("fresh");
    }
  }
}

function showAllElements() {
  let $svgElementRepo = $("#svgElementRepo");

  // clean-up
  $svgElementRepo.find(".elementBlock").remove();

  let elementKeys = Object.keys(ELEMENTS);
  let blockSize = GAME_INFO.BLOCK_SIZE_PX / 5;
  let elementDrawSpace = blockSize * (ELEMENT_PATTERN_SIZE + 1);

  let MAX_ELEMENT_IN_ROW = Math.floor(
    GAME_INFO.ALL_ELEMENT_AREA.SIZE.X / elementDrawSpace
  );

  $svgElementRepo.attr({
    height:
      elementDrawSpace * Math.ceil(elementKeys.length / MAX_ELEMENT_IN_ROW),
  });

  elementKeys.forEach(function (elementKey, index) {
    let element = ELEMENTS[elementKey];
    let centerPoint = {
      x: elementDrawSpace * Math.floor(index / MAX_ELEMENT_IN_ROW),
      y: elementDrawSpace * (index % MAX_ELEMENT_IN_ROW),
    };

    for (var i = 0; i < ELEMENT_PATTERN_SIZE; i++) {
      for (var j = 0; j < ELEMENT_PATTERN_SIZE; j++) {
        if (element.PATTERN[j * ELEMENT_PATTERN_SIZE + i]) {
          $(document.createElementNS(SVG_NAMESPACE_URI, "rect"))
            .attr({
              id: "elementBlockRepo" + "_" + i + "_" + j,
              class: "elementBlock active clickable " + elementKey,
              x: centerPoint.x + blockSize * i,
              y: centerPoint.y + blockSize * j,
              height: blockSize,
              width: blockSize,
              "stroke-width": GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
              "data-key": elementKey,
            })
            .on("click", repoElement_Click)
            .appendTo($svgElementRepo);
        }
      }
    }
  });
}

function changeGameMode(learnMode) {
  console.info("GAME MODE: " + (learnMode ? "#LEARN" : "#PLAY"));

  $(".gameModeItem.gameModePlay").toggleClass("hiddenElement", learnMode);
  $(".gameModeItem.gameModeLearn").toggleClass("hiddenElement", !learnMode);

  if (!learnMode) {
    resetBoard();
  }
}

function isLearnMode() {
  return $("#checkboxGameMode").is(":checked");
}

function changeLearnState(learning) {
  $("#buttonLearn").text(learning ? "STOP!" : "LEARN...");
  LEARN_IN_PROCESS = learning;
}

// ---- events ---- //

function repoElement_Click() {
  //console.debug( $( this).attr( 'data-key' ) );
  if (PLAY_INFO.currentElements.length >= 3) {
    PLAY_INFO.currentElements = []; // reset on 4th click
  }

  PLAY_INFO.currentElements.push(ELEMENTS[$(this).attr("data-key")]);

  drawNewElements(PLAY_INFO.currentElements);
}

function stageBlock_Click() {
  // custom state change by click
  if (!isLearnMode() && !LEARN_IN_PROGRESS) {
    let rowIndex = $(this).prop("data-row");
    let colIndex = $(this).prop("data-col");

    toggleStageBlockState(
      rowIndex,
      colIndex,
      PLAY_INFO.boardState[rowIndex * GAME_INFO.BOARD_SIZE_BLOCK + colIndex] === 1
        ? 0
        : 1,
      ""
    );
  }
}

function buttonPlayARound_Click() {
  if (myChromosome === null) {
    $("#defineChromosomePanel.modal").addClass("shown");

    let msg =
      "Either define myChromosome DNA or LEARN the game for a while to set it automatically!\nmyChromosome = { a: #, b: #, c: #, d: #, e: #, f: #, g: #, h: # }; // # is DNA float number\n* The more generation game learns, the better chromosome you have for play!";
    console.info(msg);

    return;
  }

  if (PLAY_INFO.currentElements.length !== 3) {
    // It's JUST in case of the first round, if chromosome is defined by code
    // draw and choose 3 random elements to play with in the next round
    PLAY_INFO.currentElements = drawNewElements(undefined);
  }

  HALT_LEARNING = true;
  DEBUG_MODE = 2;

  $("#buttonPlayARound").prop("disabled", true);
  playARound(myChromosome, PLAY_INFO.currentElements);
}

function buttonLearn_Click() {
  if (!LEARN_IN_PROGRESS) {
    HALT_LEARNING = false;
    LEARN_IN_PROGRESS = true;
    GO();
  } else {
    LEARN_IN_PROGRESS = false;
  }

  changeLearnState(LEARN_IN_PROGRESS);
}

function checkboxGameMode_Click(e) {
  if (LEARN_IN_PROGRESS) {
    e.preventDefault();
    return false;
  }
}

function checkboxGameMode_Change() {
  changeGameMode($(this).is(":checked"));
}

function checkboxFastForward_Change() {
  let $numberPlayTime = $("#numberPlayTime");
  let fastForward = $(this).is(":checked");
  $numberPlayTime.prop("disabled", fastForward);

  if (fastForward) {
    PLAY_TIME_MS = 0;
  } else {
    let value = $numberPlayTime.val();
    if (!isNaN(value) && value >= 0) {
      PLAY_TIME_MS = value;
    }
  }
}

function numberPlayTime_Change() {
  let value = $("#numberPlayTime").val();
  if (!isNaN(value) && value >= 0) {
    setTimeout(function () {
      PLAY_TIME_MS = value;
    }, 50);
  }
}

function buttonGoForLearn_Click() {
  $("#labelGameMode").trigger("click");

  $(this).parents(".modal").removeClass("shown");
}

function buttonSubmitChromosomeData_Click() {
  let isValid = true;
  let chromosomeData = {};
  $('#defineChromosomePanel_Body input[type="text"][data-key]').each(
    function () {
      let value = $(this).val();
      let isNotNumber =
        value === null || value.trim().length === 0 || isNaN($(this).val());
      $(this).toggleClass("error", isNotNumber);
      if (isNotNumber) {
        isValid = false;
      } else {
        chromosomeData[$(this).attr("data-key")] = Number($(this).val());
      }
    }
  );

  if (isValid) {
    myChromosome = chromosomeData;

    // draw and choose 3 random elements to play with in the next round
    PLAY_INFO.currentElements = drawNewElements(undefined);

    $(this).parents(".modal").removeClass("shown");
  }
}
