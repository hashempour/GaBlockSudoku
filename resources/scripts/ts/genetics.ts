const FACTORIAL_RESULT_SET: number[] = [
  1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600,
  6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000,
  6402373705728000, 121645100408832000, 2432902008176640000,
  51090942171709440000, 1124000727777607680000, 25852016738884976640000,
  620448401733239439360000, 15511210043330985984000000,
  403291461126605635584000000, 10888869450418352160768000000,
  304888344611713860501504000000, 8841761993739701954543616000000,
  265252859812191058636308480000000, 8222838654177922817725562880000000,
  263130836933693530167218012160000000, 8683317618811886495518194401280000000,
  295232799039604140847618609643520000000,
  10333147966386144929666651337523200000000,
  371993326789901217467999448150835200000000,
  13763753091226345046315979581580902400000000,
  523022617466601111760007224100074291200000000,
  20397882081197443358640281739902897356800000000,
  815915283247897734345611269596115894272000000000,
  33452526613163807108170062053440751665152000000000,
  1405006117752879898543142606244511569936384000000000,
  60415263063373835637355132068513997507264512000000000,
  2658271574788448768043625811014615890319638528000000000,
  119622220865480194561963161495657715064383733760000000000,
  5502622159812088949850305428800254892961651752960000000000,
  258623241511168180642964355153611979969197632389120000000000,
  12413915592536072670862289047373375038521486354677760000000000,
  608281864034267560872252163321295376887552831379210240000000000,
  30414093201713378043612608166064768844377641568960512000000000000,
  1551118753287382280224243016469303211063259720016986112000000000000,
  80658175170943878571660636856403766975289505440883277824000000000000,
  4274883284060025564298013753389399649690343788366813724672000000000000,
  230843697339241380472092742683027581083278564571807941132288000000000000,
  12696403353658275925965100847566516959580321051449436762275840000000000000,
  710998587804863451854045647463724949736497978881168458687447040000000000000,
  40526919504877216755680601905432322134980384796226602145184481280000000000000,
  2350561331282878571829474910515074683828862318181142924420699914240000000000000,
  138683118545689835737939019720389406345902876772687432540821294940160000000000000,
  8320987112741390144276341183223364380754172606361245952449277696409600000000000000,
  507580213877224798800856812176625227226004528988036003099405939480985600000000000000,
  31469973260387937525653122354950764088012280797258232192163168247821107200000000000000,
  1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000,
  126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000,
  8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000,
  544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000,
  36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000,
  2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000,
  171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000,
  11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000,
  850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000,
  61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000,
  4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000,
  330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000,
  24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000,
  1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000,
  145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000,
  11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000,
  894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000,
  71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000,
  5797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000,
  475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000,
  39455239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000,
  3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000,
  281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000,
  24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000,
  2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000,
  185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000,
  16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000,
  1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000,
  135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000,
  12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000,
  1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000,
  108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000,
  10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000,
  991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000,
  96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000,
  9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000,
  933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000,
  93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000,
];


const GENETICS = {
  // Formula: aX + bY + cZ + dW + eQ + f + gT + hS + iP  = 0
  // X: cols integrity (%)
  // Y: rows integrity (%)
  // Z: 9-blocks integrity (%)
  // W: total occupation (%)
  // Q: selected element occupation (%)
  // T: row/col/blockSet completeness (%)
  // S: board total integrity (%)
  // P: priority of sides and corner occupation (%)

  population: [] as Chromosome[], // Array of Chromosomes of { a, b, c, d, e, f, g, h }
  populationGameScore: [] as number[],
  populationAvgSuccessRates: [] as SuccessRate[],
  avgTotalSuccessRate: new TotalSuccessRate(),
  currentPopulation: -1,
  POPULATION_COUNT: 25,
  CHROMOSOME_DNA_COUNT: 9,
  CHROMOSOME_DNA_RANGE: 10100, // -50.50 .. 0.00 .. +50.50

  MUTATION_RATE: 0.4,
  REBORN_GEN_DATA: {
    GEN_LIMIT: 15,
    CROSS_OVER_RATE: 0.1,
    CROSS_OVER_ELITE_RATE: 0.3,
  },

  genNum: 0,

  utils: {
    getRandDNA: () => {
      // -100.00 .. 0.00 .. +100.00
      return (
        ( Math.floor( Math.random() * GENETICS.CHROMOSOME_DNA_RANGE ) -
          Math.floor( GENETICS.CHROMOSOME_DNA_RANGE / 2 ) ) / 100
      );
    },
    createPopulation: () => {
      for ( let i = 0; i < GENETICS.POPULATION_COUNT; i++ ) {
        GENETICS.population.push(
          new Chromosome(
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
            GENETICS.utils.getRandDNA(),
          )
        );

        GENETICS.populationGameScore.push( 0 );
        GENETICS.populationAvgSuccessRates.push( new SuccessRate() );
        GENETICS.avgTotalSuccessRate = new TotalSuccessRate();
      }
    },
    buildNextGeneration: () => {
      //console.debug( 'GEN #' + GENETICS.genNum , GENETICS.population );

      let bestChromosome = { index: -1, score: 0 };
      let worstChromosome = { index: -1, score: 99999999 };
      let generationScoreSum = 0;

      GENETICS.populationGameScore.forEach( ( score: number, index: number ) => {
        //let fitness = 1 - 1 / (1 + score); // higher score is better fitness

        generationScoreSum += score;
        // keep best score
        if ( bestChromosome.score < score || bestChromosome.index === -1 ) {
          bestChromosome.score = score;
          bestChromosome.index = index;
        }
        // keep worst score
        if ( worstChromosome.score > score || worstChromosome.index === -1 ) {
          worstChromosome.score = score;
          worstChromosome.index = index;
        }
      } );

      // reborn process
      const forRebornIndexes: number[] = [];
      const forParentingIndexes: number[] = [];

      GENETICS.populationGameScore.forEach( ( score: number, index: number ) => {
        // update avg success rate and age/generation count
        GENETICS.populationAvgSuccessRates[index].successRate =
          ( GENETICS.populationAvgSuccessRates[index].successRate *
            GENETICS.populationAvgSuccessRates[index].ageCount +
            score / bestChromosome.score ) /
          ( GENETICS.populationAvgSuccessRates[ index ].ageCount + 1 );

        GENETICS.populationAvgSuccessRates[index].ageCount++;
      } );

      //GENETICS.avgTotalSuccessRate.best = ( GENETICS.avgTotalSuccessRate.best * GENETICS.avgTotalSuccessRate.count + GENETICS.populationAvgSuccessRates[ bestChromosome.index ].s ) / ( GENETICS.avgTotalSuccessRate.count + 1 );
      GENETICS.avgTotalSuccessRate.worst =
        ( GENETICS.avgTotalSuccessRate.worst *
          GENETICS.avgTotalSuccessRate.count +
          GENETICS.populationAvgSuccessRates[ worstChromosome.index ].successRate ) /
        ( GENETICS.avgTotalSuccessRate.count + 1 );

      GENETICS.avgTotalSuccessRate.count++;

      GENETICS.populationGameScore.forEach( ( score: number, index: number ) => {
        // choose unsuccessful population for reborn
        if (
          Math.random() < GENETICS.REBORN_GEN_DATA.CROSS_OVER_RATE && // last chance to keep it alive randomly!
          GENETICS.populationAvgSuccessRates[ index ].ageCount >
            GENETICS.REBORN_GEN_DATA.GEN_LIMIT &&
          GENETICS.populationAvgSuccessRates[ index ].successRate <
            GENETICS.avgTotalSuccessRate.worst * 1.2
        ) {
          forRebornIndexes.push( index );
        }
        // choose rest population for parent
        if (
          GENETICS.populationAvgSuccessRates[ index ].ageCount >
            GENETICS.REBORN_GEN_DATA.GEN_LIMIT &&
          GENETICS.populationAvgSuccessRates[ index ].successRate >
            GENETICS.avgTotalSuccessRate.worst * 1.2
        ) {
          forParentingIndexes.push( index );
        }
      } );

      // always try to create one from the most successful chromosome
      let mostSuccessfulChromosomeIndex = -1;
      let mostSuccessfulChromosomeRate = 0.0;
      GENETICS.populationAvgSuccessRates.forEach( ( rate: SuccessRate, index: number ) => {
        if (
          rate.successRate > mostSuccessfulChromosomeRate ||
          mostSuccessfulChromosomeIndex === -1
        ) {
          mostSuccessfulChromosomeIndex = index;
          mostSuccessfulChromosomeRate = rate.successRate;
        }
      } );

      if ( forParentingIndexes.length > 0 && forRebornIndexes.length > 0 ) {
        // console.debug(
        //   "X",
        //   mostSuccessfulChromosomeIndex,
        //   forParentingIndexes,
        //   forRebornIndexes,
        //   GENETICS.populationAvgSuccessRates
        // );
        GENETICS.population[ forRebornIndexes[ 0 ] ] = GENETICS.utils.getNewChild(
          // giving the Best Chromosome as both parents
          GENETICS.population[ bestChromosome.index ],
          GENETICS.population[ bestChromosome.index ],
          true, // mutation enabled
          true // force to mutate
        );
        console.info( "reborn for the best #" + forRebornIndexes[ 0 ] );
      }

      if ( forParentingIndexes.length > 2 && forRebornIndexes.length > 0 ) {
        let skippedTheFirstOne = false;
        forRebornIndexes.forEach( ( rebornIndex ) => {
          if ( !skippedTheFirstOne ) {
            // skipping the first one, since it's already created separately for the BestParent
            skippedTheFirstOne = true;
            return;
          }
          // REBORN
          console.info(
            "reborn #" + rebornIndex,
            GENETICS.populationAvgSuccessRates[ rebornIndex ]
          );
          GENETICS.population[ rebornIndex ] = GENETICS.utils.getNewChild(
            GENETICS.population[
              forParentingIndexes[
                Math.floor( Math.random() * forParentingIndexes.length )
              ]
            ],
            GENETICS.population[
              forParentingIndexes[
                Math.floor( Math.random() * forParentingIndexes.length )
              ]
            ],
            true // mutation enabled
          );

          // reset avg probability data for new chromosomes
          GENETICS.populationAvgSuccessRates[ rebornIndex ] = new SuccessRate();
        } );
      }

      // generation is ready!
      GENETICS.genNum++;
      //console.debug( 'GEN #' + GENETICS.genNum , GENETICS.population );

      return { scoreSum: generationScoreSum };
    },
    getOneCutChromosome: ( chromosome1: Chromosome, chromosome2: Chromosome ) => {
      const randPosition =
        Math.floor( Math.random() * ( GENETICS.CHROMOSOME_DNA_COUNT - 1 ) ) + 1;

      //console.debug( 'OneCut at ', randPosition, chromosome1, chromosome2 );
      return {
        a: chromosome1.a,
        b: randPosition < 2 ? chromosome1.b : chromosome2.b,
        c: randPosition < 3 ? chromosome1.c : chromosome2.c,
        d: randPosition < 4 ? chromosome1.d : chromosome2.d,
        e: randPosition < 5 ? chromosome1.e : chromosome2.e,
        f: randPosition < 6 ? chromosome1.f : chromosome2.f,
        g: randPosition < 7 ? chromosome1.g : chromosome2.g,
        h: randPosition < 8 ? chromosome1.h : chromosome2.h,
        i: chromosome2.i,
      };
    },
    getNewChild: (
      chromosome1: Chromosome,
      chromosome2: Chromosome,
      mutation: boolean,
      forceToMutate: boolean = false
    ): Chromosome => {
      let mutate =
        mutation && ( Math.random() < GENETICS.MUTATION_RATE || forceToMutate );
      let mutationDnaIndex = mutate
        ? Math.floor( Math.random() * GENETICS.CHROMOSOME_DNA_COUNT )
        : -1;
      if ( mutationDnaIndex !== -1 ) {
        console.info( "MUTATION on DNA #" + mutationDnaIndex );
      }
      return new Chromosome(
          mutationDnaIndex === 0
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.a
            : chromosome2.a,
          mutationDnaIndex === 1
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.b
            : chromosome2.b,
          mutationDnaIndex === 2
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.c
            : chromosome2.c,
          mutationDnaIndex === 3
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.d
            : chromosome2.d,
          mutationDnaIndex === 4
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.e
            : chromosome2.e,
          mutationDnaIndex === 5
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.f
            : chromosome2.f,
          mutationDnaIndex === 6
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.g
            : chromosome2.g,
          mutationDnaIndex === 7
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.h
            : chromosome2.h,
          mutationDnaIndex === 8
            ? GENETICS.utils.getRandDNA()
            : Math.random() < 0.5
            ? chromosome1.i
            : chromosome2.i,
      );
    },
  },
};

function GO() {
  LEARN_IN_PROGRESS = true;

  GENETICS.genNum = 0;
  GENETICS.currentPopulation = -1;
  GENETICS.utils.createPopulation();

  playNextPopulation();
}

function playNextPopulation() {
  GENETICS.currentPopulation++;

  if ( GENETICS.currentPopulation < GENETICS.POPULATION_COUNT ) {
    if ( VISUALISE !== VISUALISATION_STATE.NONE ) {
      $( "#labelPop" ).text(
        GENETICS.currentPopulation + 1 + " of " + GENETICS.POPULATION_COUNT
      );
    }

    resetBoard();

    setTimeout(
      playARound,
      PLAY_TIME_MS / 2,
      GENETICS.population[ GENETICS.currentPopulation ]
    );
  } else {
    // end of population
    // go for next generation
    //console.debug( 'END of POP', GENETICS.populationGameScore );
    let result = GENETICS.utils.buildNextGeneration();

    // update some data
    PLAY_INFO.avgScore =
      Math.round( ( result.scoreSum / GENETICS.POPULATION_COUNT ) * 100 ) / 100;
    PLAY_INFO.avgScoreList.push( PLAY_INFO.avgScore );
    if ( VISUALISE !== VISUALISATION_STATE.NONE ) {
      $( "#labelGen" ).text( GENETICS.genNum + 1 );
      $( "#labelAvgScore" ).text( PLAY_INFO.avgScore );
    }

    console.info(
      "AVG / HI SCORE GEN #" + GENETICS.genNum,
      PLAY_INFO.avgScore,
      PLAY_INFO.hiScore
    );

    // find best chromosome for Manual Play
    let bestAvgIndex: number = -1;
    GENETICS.populationAvgSuccessRates.forEach( ( avg: SuccessRate, index: number ) => {
      if (
        bestAvgIndex === -1 ||
        GENETICS.populationAvgSuccessRates[ bestAvgIndex ].successRate < avg.successRate
      )
        bestAvgIndex = index;
    } );

    // set the best one
    myChromosome = GENETICS.population[ bestAvgIndex ];

    if ( VISUALISE !== VISUALISATION_STATE.NONE ) {
      // show best chromosome data
      $( "#spanBestChromosome" ).text(
        GENETICS.population[ bestAvgIndex ].toString()
      );
      $( "#spanBestAvgSuccess" ).text(
        GENETICS.populationAvgSuccessRates[ bestAvgIndex ].successRate * 100
      );
    }

    GENETICS.currentPopulation = -1;

    playNextPopulation();
  }
}

function playARound( chromosome: Chromosome, elements: ELEMENT[] ) {
  let successfulPlay = false;

  //console.debug( 'PLAY a ROUND!' );
  if ( VISUALISE !== VISUALISATION_STATE.NONE ) {
    $( ".elementBlock.fresh" ).removeClass( "fresh" );
  }

  elements = drawNewElements( elements );

  const bestPracticeOrder = {
    sumValue: null as number | null,
    bestOrderArray: [] as ELEMENT[],
    bestPositionArray: [] as Cordinate[],
  };

  for ( let index = 0; index < FACTORIAL_RESULT_SET[ elements.length ]; index++ ) {
    // 3! = 6 ; all possible place orders for 3 elements
    // TODO: GENERALISE the pickup solution for any element count! recursive mode.
    // it is hard-coded only for 3 elements!
    let firstElementIndex = Math.floor( index / 2 );
    let secondElementIndex =
      ( firstElementIndex + ( index % 2 ? 1 : 2 ) ) % elements.length;
    let thirdElementIndex =
      ( firstElementIndex + ( index % 2 ? 2 : 1 ) ) % elements.length;
    let pickupElementOrder = [
      elements[ firstElementIndex ],
      elements[ secondElementIndex ],
      elements[ thirdElementIndex ],
    ] as ELEMENT[];

    // try to simulate the chosen order

    const MAX = GAME_INFO.BOARD_SIZE_BLOCK + ELEMENT_PATTERN_SIZE * 2;

    // make a copy of current board state for calculation score simulation
    const boardStateSimulation = getCopyOfBoardState();

    const currentOrderState = {
      sumValue: 0 as number,
      bestPositions: [] as Cordinate[],
    };

    for (
      let elementIndex = 0;
      elementIndex < pickupElementOrder.length;
      elementIndex++
    ) {
      let bestPractice = {
        value: null as number | null,
        position: new Cordinate( -1, -1 ),
        element: null as ELEMENT | null,
        elementIndex: 0 as number,
      };

      // pick the elements up in the assumed order
      const element = pickupElementOrder[ elementIndex ];

      for ( let i = ELEMENT_PATTERN_SIZE * -1; i < MAX; i++ ) {
        for ( let j = ELEMENT_PATTERN_SIZE * -1; j < MAX; j++ ) {
          if (
            isPossibleToDrawOnStage(
              element,
              new Cordinate( i, j ),
              boardStateSimulation
            )
          ) {
            // simulate the element in current position
            let calcValue = Math.abs(
              getCalculatedValue(
                element,
                new Cordinate( i, j ),
                chromosome,
                boardStateSimulation
              )
            );
            if ( isNaN( calcValue ) ) {
              console.debug(
                "CALC isNaN",
                element,
                { x: i, y: j },
                chromosome,
                boardStateSimulation
              );
            }
            if ( bestPractice.value === null || bestPractice.value > calcValue ) {
              // found better element-performance
              bestPractice.value = calcValue;
              bestPractice.position.x = i;
              bestPractice.position.y = j;
              bestPractice.element = element;
              bestPractice.elementIndex = elementIndex;
            }
          }
        }
      }

      if ( bestPractice.value !== null ) {
        currentOrderState.sumValue += bestPractice.value;
        currentOrderState.bestPositions.push( bestPractice.position );

        if ( bestPractice.element == null ) {
          throw new InvalidStateError( "BestPractice element cannot be null!" );
        }

        //drawElementOnStage( bestPractice.element, bestPractice.position, 'fresh' );
        simulateBoardState(
          bestPractice.element,
          bestPractice.position,
          boardStateSimulation
        );
        checkForCleanup( boardStateSimulation, true );

      } else {
        // unsuccessful tries for this element!!
        // skip current order
        break;
      }
    }

    // sum up the order round
    if ( currentOrderState.bestPositions.length === 3 ) {
      // successful order try
      // check the order-round performance
      if (
        bestPracticeOrder.sumValue === null ||
        bestPracticeOrder.sumValue > currentOrderState.sumValue
      ) {
        // found better order-performance
        bestPracticeOrder.sumValue = currentOrderState.sumValue;
        bestPracticeOrder.bestOrderArray = pickupElementOrder;
        bestPracticeOrder.bestPositionArray = currentOrderState.bestPositions;
      }
    }
  }

  // check the best order

  if ( bestPracticeOrder.sumValue !== null ) {
    // found an acceptable order
    //console.debug( bestPractice );
    // make chosen move: put element on stage
    if ( DEBUG_MODE == DEBUGMODE_STATE.DEBUG ) {
      console.debug( "solution: ", bestPracticeOrder );
    }

    // draw elements in order of the best order found
    bestPracticeOrder.bestOrderArray.forEach( ( element: ELEMENT, index: number ) => {
      if ( DEBUG_MODE == DEBUGMODE_STATE.DEBUG ) {
        console.info(
          "draw #" + ( index + 1 ),
          element,
          bestPracticeOrder.bestPositionArray[ index ]
        );
      }

      if ( HALT_LEARNING && !LEARN_IN_PROGRESS ) {
        // for better presentation
        setTimeout( () => {
          drawElementOnStage(
            element,
            bestPracticeOrder.bestPositionArray[ index ],
            "fresh"
          );
          checkForCleanup();
        }, index * 2000 );
      } else {
        // for learning
        drawElementOnStage(
          element,
          bestPracticeOrder.bestPositionArray[ index ],
          "fresh"
        );
        checkForCleanup();
      }
    });

    successfulPlay = true;
  } else {
    // unsuccessful!! cannot find even one acceptable order
    // end of play
    GENETICS.populationGameScore[ GENETICS.currentPopulation ] = PLAY_INFO.score;
    //console.debug( 'pop #' + GENETICS.currentPopulation + ' score', PLAY_INFO.score );
    //console.debug( ' *** END ! ', elements );

    successfulPlay = false;
  }

  if ( !successfulPlay && HALT_LEARNING && !LEARN_IN_PROGRESS ) {
    // only for normal play (not learning)
    alert( "GAME OVER!" );
  } else if ( successfulPlay && HALT_LEARNING && !LEARN_IN_PROGRESS ) {
    // only for normal play (not learning)
    // we shoukd choose 3 other random elements for the next round
    // it runs with delay after all 3 elements replacements in the board
    setTimeout( () => {
      PLAY_INFO.currentElements = drawNewElements();
      $( "#buttonPlayARound" ).prop( "disabled", false );
    }, 2000 * ( 0 + 1 + 2 ));
  } else if ( successfulPlay && !HALT_LEARNING && LEARN_IN_PROGRESS ) {
    // next round
    setTimeout( playARound, PLAY_TIME_MS, chromosome );
  } else if ( !HALT_LEARNING && LEARN_IN_PROGRESS ) {
    // next population
    setTimeout( playNextPopulation, PLAY_TIME_MS * ( VISUALISE !== VISUALISATION_STATE.NONE ? 4 : 1 ) );
  }
}

function getCalculatedValue(
  element: ELEMENT,
  position: Cordinate,
  chromosome: Chromosome,
  boardState: BOARD_STATE
): number {
  // make a copy of current board state for calculation score simulation
  const boardStateSimulation = getCopyOfBoardState( boardState );

  simulateBoardState( element, position, boardStateSimulation ); // update board state

  // simulate
  return (
    chromosome.a * PLAY_INFO.statistics.getX( boardStateSimulation ).divValue +
    chromosome.b * PLAY_INFO.statistics.getY( boardStateSimulation ).divValue +
    chromosome.c * PLAY_INFO.statistics.getZ( boardStateSimulation ).divValue +
    chromosome.d * PLAY_INFO.statistics.getW( boardStateSimulation ) +
    chromosome.e * getOccupationOfElement( element ) +
    chromosome.f +
    chromosome.g * PLAY_INFO.statistics.getT( boardStateSimulation ) +
    chromosome.h * PLAY_INFO.statistics.getS( boardStateSimulation ).divValue +
    chromosome.i * PLAY_INFO.statistics.getP( boardStateSimulation )
  );
}

function simulateBoardState( element: ELEMENT, position: Cordinate, boardState: BOARD_STATE ) {
  // simulate Board State with the element in assumed position
  for ( var i = 0; i < ELEMENT_PATTERN_SIZE; i++ ) {
    for ( var j = 0; j < ELEMENT_PATTERN_SIZE; j++ ) {
      if ( element.PATTERN[ j * ELEMENT_PATTERN_SIZE + i ] ) {
        boardState[
          ( position.y + j ) * GAME_INFO.BOARD_SIZE_BLOCK + position.x + i
        ] = true;
      }
    }
  }
}

function getCopyOfBoardState( boardState: BOARD_STATE | undefined = undefined ): BOARD_STATE {
  if ( boardState === undefined ) {
    boardState = PLAY_INFO.boardState;
  }

  const result: boolean[] = [];
  for ( let index = 0; index < boardState.length; index++ ) {
    result.push( boardState[ index ] );
  }

  return result as BOARD_STATE;
}

function sleepFor( sleepDuration: number ) {
  const now = new Date().getTime();
  while ( new Date().getTime() < now + sleepDuration ) { /* do nothing */ }
}
