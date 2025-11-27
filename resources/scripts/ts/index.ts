$( document ).ready( () => {
  prepareStageArea();
  prepareElementArea();

  if ( DRAW_ALL_ELEMENTS ) {
    showAllElements();
  }

  $( "#buttonPlayARound" ).on( "click", buttonPlayARound_Click );
  $( "#buttonLearn" ).on( "click", buttonLearn_Click );

  $( "#checkboxGameMode" )
    .on( "click", checkboxGameMode_Click)
    .on( "change", checkboxGameMode_Change)
    .prop( "checked", true)
    .trigger( "change" );

  $( "#numberPlayTime" ).val( PLAY_TIME_MS ).on( "change", numberPlayTime_Change );
  $( "#checkboxFastForward" ).on( "change", checkboxFastForward_Change );
  $( "#buttonGoForLearn" ).on( "click", buttonGoForLearn_Click );
  $( "#buttonSubmitChromosomeData" ).on(
    "click",
    buttonSubmitChromosomeData_Click
  );
} );



function prepareStageArea() {
  let $svgStage = $( "#svgStage" );

  for (
    var x = 1;
    x < GAME_INFO.BOARD_AREA.SIZE.X / GAME_INFO.BLOCK_SIZE_PX;
    x++
  ) {
    $( document.createElementNS( SVG_NAMESPACE_URI, "line" ) )
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
      $( document.createElementNS( SVG_NAMESPACE_URI, "rect" ) )
        .attr( {
          id: "stageBlock_" + j + "_" + i,
          class: "elementBlock",
          x: GAME_INFO.BLOCK_SIZE_PX * i,
          y: GAME_INFO.BLOCK_SIZE_PX * j,
          height: GAME_INFO.BLOCK_SIZE_PX,
          width: GAME_INFO.BLOCK_SIZE_PX,
          stroke: "gray",
          "stroke-width": GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
        } )
        .on( "click", stageBlock_Click )
        .prop( "data-row", j )
        .prop( "data-col", i )
        .appendTo( $svgStage );
    }
  }
}

function prepareElementArea() {
  //let $svgElement = $("#svgElement");
}

function drawNewElements( elements: ELEMENT[] | undefined = undefined ) {
  // clean-up
  $( "#svgElement .elementBlock" ).remove();

  if ( elements === undefined ) {
    elements = getThreeRandomElements();
  }
  const elementDrawSpace = GAME_INFO.ELEMENT_AREA.SIZE.X / elements.length;

  if ( VISUALISE === VISUALISATION_STATE.FULL ) {
    elements.forEach( ( element: ELEMENT, index: number ) => {
        drawElement(
            "elementBlock" + index,
            element,
            new Cordinate(
                elementDrawSpace * index + 20,
                10
            )
        );
    } );
  }

  return elements;
}

function drawElement( id: string, element: ELEMENT, centerPoint: Cordinate ) {
  let $svgElement = $( "#svgElement" );
  let blockSize = GAME_INFO.BLOCK_SIZE_PX / 3;

  for ( var i = 0; i < ELEMENT_PATTERN_SIZE; i++ ) {
    for ( var j = 0; j < ELEMENT_PATTERN_SIZE; j++ ) {
      if ( element.PATTERN[ j * ELEMENT_PATTERN_SIZE + i ] ) {
        $( document.createElementNS(SVG_NAMESPACE_URI, "rect" ) )
          .attr( {
            id: id + "_" + i + "_" + j,
            class: "elementBlock active " + element.KEY,
            x: centerPoint.x + blockSize * i,
            y: centerPoint.y + blockSize * j,
            height: blockSize,
            width: blockSize,
            "stroke-width": GAME_INFO.GUIDE_LINE_WIDTH.SECONDARY,
          } )
          .appendTo( $svgElement );
      }
    }
  }
}
