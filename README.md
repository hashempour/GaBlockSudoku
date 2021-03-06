# GaBlockSudoku - Genetic Algortihm for BockSudoku Puzzle solving

A complete JavaScript project for solving Block Sudoku puzzle via Machine Learning Genetic Algorithm.

Try it yourself now! >> https://hashempour.github.io/GaBlockSudoku/ 


#### Why JavaScript?
  It was easy for me to have all Visual Features, Coding, and most importantlty Web features on one side together, therefore I could concentrrate on the algorithm implementation more! ;)
  
#### Why Genetic Algorithm project?
  Why not! Due to COVID-19 restrictions, these days I had a lot of spare time in HOME to think about a hobby or fun project!
  
#### Is the implemented Algorithm / Game-Play perfect?
  I don't think so! You are welcome to find the probable bugs or some improvement on the implemented Algorithm :)


## Algorithm

### The equation
  aX + bY + cZ + dW + eQ + f + gT + hS = 0
  
  X: cols integrity (%)  
  Y: rows integrity (%)  
  Z: 9-blocks integrity (%)  
  W: total occupation (%)  
  Q: selected element occupation (%)  
  T: row/col/blockSet completeness (%)    
  S: board total integrity (%)
  
### The DNA
  Chromosome DNA: { a, b, c, d, e, f, g, h }  
  All DNAs are random float numbers between -10.00 and +10.00 (with 2 number precisions)  
  
### ETC.
  Default Population Count: 100
  
  
## Technical Hint

Since all the data is on the client side, you could easy watch the algorithm and scripts, and also changed the data run-time inside Browser Debugger tool.

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
  DEBUG_MODE = 0;
  ```
  0: no debug message  
  1: some debug info  
  2: full debug info  
  Default value is 0  
  
### Visualisation Mode
  ```javascript
  VISUALISE = 2;
  ````
  0: no visualisation at all  
  1: just Text Info like Generation Number, Score, etc.  
  2: full Visualisation including the play sitation on board  
  Default is 2  
  

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
  myChromosome = { 
    a: 5.44,
    b: 6.17,
    c: 5.85,
    d: 3.9,
    e: -5.37,
    f: 3.53,
    g: -5.76,
    h: -0.66,
  };
  ```
  Define your chromosome; then the custome play would use to solve the puzzle  
  It is undefined by default  
  The myChromosome DNA data will be automatically defined by the best Chromosome DNA data at the end of each learning generation.  
  Also you can find/copy the best Chromosome (DNAs) data from GENETICS.populationGameScore after a learning process and choosing the one according to GENETICS.populationAvgSuccessRates  


## FOR IMPLEMENTATION TECHNICAL HINTS... watch the implemented code either on GitHub or by VIEW-SROUCE-CODE from browser!
