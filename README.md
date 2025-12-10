# GaBlockSudoku - Genetic Algortihm (AI) Learning for BlockSudoku Puzzle solving

A complete JavaScript/ Typsescript project to solve Block Sudoku puzzle via Machine Learning Genetic Algorithm.

Try it yourself now! >> https://hashempour.github.io/GaBlockSudoku/ 


#### Why JavaScript/ Typescript?
  It was easy for me to have all Visual Features, Coding, and most importantlty Web features on one side together, therefore I could concentrrate on the algorithm implementation more! ;)

#### Is JavaScript/ Typescript a proper choice for AI?
  Since this project is an AI project and contains Machine Learning, another language, which can utilise the CPU and RAM best, would be a more sensible choice. But for most of other languages, like JAVA od C++, C#, etc. I had more limits for Visualisation part and it's needed to put more efforts to implement the game process on the screen. Therefore with JavaScript I did all the visualisation and AI process together but due to web browser restrictions, it cannot utilise all the CPU capabilities for learning. One another proper language choice could be Python, since it's powerful in visualisation and can utilise the CPU and RAM better than JavaScript.
  
#### Why Genetic Algorithm project?
  Why not! Due to COVID-19 restrictions, these days I had a lot of spare time in HOME to think about a hobby or fun project!
  
#### Is the implemented Algorithm / Game-Play perfect?
  I don't think so! You are welcome to find the probable bugs or bring some improvement to the implemented Algorithm :)


## Algorithm

### The equation
  aX + bY + cZ + dW + eQ + f + gT + hS + iP = 0
  
  X: cols integrity (%)  
  Y: rows integrity (%)  
  Z: 9-blocks integrity (%)  
  W: total occupation (%)  
  Q: selected element occupation (%)  
  T: row/col/blockSet completeness (%)    
  S: board total integrity (%)    
  P: priority of sides and corner occupation (%)
  
### The DNA
  Chromosome DNA: { a, b, c, d, e, f, g, h, i }  
  All DNA Genes are random float numbers between -25.00 and +25.00
  
### ETC.
  Default Population Count: 25
  
  
## Technical Hint

Since all the data is on the client side, you could easy watch the algorithm and scripts, and also you are able to change the data run-time inside Browser Debugger tool.

### Play Time in MS
  ```javascript
  PLAY_TIME_MS = 50;
  ```
  Change it into the time (in milisecond) you want the learning process steps goes on  
  Default value is 50  
    
### Halt Learning Process
  ```javascript
  HALT_LEARNING = true;
  ```
  Change it into true in case you want to halt the learning process  
  Default value is false  
  
### Debug Mode message
  ```javascript
  DEBUG_MODE = DEBUGMODE_STATE.DEBUG;
  ```
  DEBUGMODE_STATE.NONE: no debug message
  DEBUGMODE_STATE.INFO: some debug info
  DEBUGMODE_STATE.DEBUG: full debug info
  Default value is DEBUGMODE_STATE.NONE
  
### Visualisation Mode
  ```javascript
  VISUALISE = VISUALISATION_STATE.FULL;
  ````
  VISUALISATION_STATE.NONE: no visualisation at all  
  VISUALISATION_STATE.TEXT: just Text Info like Generation Number, Score, etc.  
  VISUALISATION_STATE.FULL: full Visualisation including the play sitation on board  
  Default is VISUALISATION_STATE.FULL 
  

## Technical Info for monitoring Learning State

### Check Genetic Algorithm data ( root variable )
  ```javascript
  GENETICS
  ```
  you can find almost all variable/const and feature data like population, POPULATION_COUNT here.
  


### Check current population chromosome data
  ```javascript
  GENETICS.population
  ```
  An array of current population chromosome  
  
### Check latest population success in their play
  ```javascript
  GENETICS.populationGameScore
  ```
  An array of last play score of each chromosome  
  Array boundry is 0 to GENETICS.POPULATION_COUNT  

### Check current population average success rate in their play
  ```javascript
  GENETICS.populationAvgSuccessRates
  ```
  An array of avg play score of each chromosome  
  Each array item includes an object of S and C  
  S is the Average score of all plays and C is the count of play for that chrmosome  
  Note: C and S will reset to Zero when the chromosome is reborn or regenerated  
  Array boundry is 0 to GENETICS.POPULATION_COUNT  


## Technical Info for Manual play (Not for Learning)
 
### My custom Chromosome to PLAY with -- not useful for learning
  ```javascript
  myChromosome = new Chromosome(
    -48.9,    // a
    -47.76,   // b
    -21.78,   // c
    5.91,     // d
    7.97,     // e
    -24.64,   // f
    27.83,    // g
    21.45,    // h
    -34.18    // i
  );
  ```
  Define your chromosome; then the Play-Mode would use it to solve the puzzle  
  It is undefined by default/ at first!
  The myChromosome DNA data will be automatically defined by the best Chromosome DNA data at the end of each learning generation.
  Also you can find/ copy the best Chromosome (DNAs) data from GENETICS.populationGameScore after a learning process and choosing the one according to GENETICS.populationAvgSuccessRates  


## FOR IMPLEMENTATION TECHNICAL HINTS... watch the implemented code either on GitHub or by VIEW-SROUCE-CODE from browser!
