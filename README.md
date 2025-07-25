# GaBlockSudoku - Genetic Algortihm (AI) Learning for BlockSudoku Puzzle solving

A complete JavaScript project for solving Block Sudoku puzzle via Machine Learning Genetic Algorithm.

Try it yourself now! >> https://hashempour.github.io/GaBlockSudoku/ 


#### Why JavaScript?
  It was easy for me to have all Visual Features, Coding, and most importantlty Web features on one side together, therefore I could concentrrate on the algorithm implementation more! ;)

#### Is JavaScript a proper choice for AI?
  Since this project is an AI project and contains Machine Learning, another language, which can utilise the CPU and RAM best, would be a more sensible choice. But for most of other languages, like JAVA od C++, C#, etc. I had more limits for Visualisation part and it's needed to put more efforts to implement the game process on the screen. Therefore with JavaScript I did all the visualisation and AI process faster together but due to web browser restrictions, it cannot utilise all the CPU capabilities for learning. One another proper language choicw coule be Python, since it's powerful in visualisation and can utilise the CPU and RAM better than JavaScript.
  
#### Why Genetic Algorithm project?
  Why not! Due to COVID-19 restrictions, these days I had a lot of spare time in HOME to think about a hobby or fun project!
  
#### Is the implemented Algorithm / Game-Play perfect?
  I don't think so! You are welcome to find the probable bugs or some improvement on the implemented Algorithm :)


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
  All DNAs are random float numbers between -50.50 and +50.50 (with 2 number precisions)  
  
### ETC.
  Default Population Count: 25
  
  
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
    "a": -6.36,
    "b": -7.96,
    "c": -3.64,
    "d": -8.84,
    "e": -0.95,
    "f": -3.73,
    "g": 6.66,
    "h": 1.15
};
  ```
  Define your chromosome; then the custome play would use to solve the puzzle  
  It is undefined by default  
  The myChromosome DNA data will be automatically defined by the best Chromosome DNA data at the end of each learning generation.  
  Also you can find/copy the best Chromosome (DNAs) data from GENETICS.populationGameScore after a learning process and choosing the one according to GENETICS.populationAvgSuccessRates  


## FOR IMPLEMENTATION TECHNICAL HINTS... watch the implemented code either on GitHub or by VIEW-SROUCE-CODE from browser!
