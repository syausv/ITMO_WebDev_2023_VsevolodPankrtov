const appendBlock = (block) => document.getElementById("app").appendChild(block);


const getColorOrEmptyOnRandom = () => {
  const isNotEmpty = Math.random()> 0.5;
  if (isNotEmpty) {
   return "black";
  }
  else {
    return "#DCDCDC";
  }
}
const createBlock = (x,y, size, color) => {
  const result =  document.createElement("div");
  if(color) {
      result.style.backgroundColor = color;
  }
  result.style.width = result.style.height =`${size}px`;
  result.style.position = "absolute";
  result.style.left = `${x}px` ;
  result.style.top = `${y}px`;
  return result;
};





  const BLOCK_SIZE = 50;
  const DIMENSION = 5;

  let columns = DIMENSION;
  let rows = columns * 2;
  let yPos = 0;

  function Monster(xPos) {
    while (rows-- > 0) {
      let xPos = 0;
      let line = [];
      columns = DIMENSION;
      while (columns-- > 0) {
        const color = getColorOrEmptyOnRandom();
        const block = createBlock(xPos, yPos, BLOCK_SIZE, color);
        line.push(color);
        xPos += BLOCK_SIZE;
        appendBlock(block);
      }

      line.reverse().forEach((color) => {
        const block = createBlock(xPos, yPos, BLOCK_SIZE, color);
        appendBlock(block);
        xPos += BLOCK_SIZE;
      });
      yPos += BLOCK_SIZE;

    }
    console.log('xPos = ', xPos);
    return BLOCK_SIZE;
    return xPos;


  }

//Monster(0);

  function MonstersInLine() {
    let countMonsters = 8;
    let xPos = 0;
    while (countMonsters >= 0) {
      Monster(xPos);
      xPos += BLOCK_SIZE;
      console.log('xPos2 = ', xPos);
      countMonsters--;
    }

  }
MonstersInLine()