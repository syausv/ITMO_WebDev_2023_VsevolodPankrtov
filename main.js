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
  const DIMENSION = 8;

  let columns = DIMENSION /2 ;
  let rows = columns * 2;
  let yPos = 0;



   // while (rows-- > 0) {

      let halfLineColors = [];
      columns = DIMENSION/2;
      while (columns-- > 0) {
        const color = getColorOrEmptyOnRandom();
        const block = createBlock(columns * BLOCK_SIZE, yPos, BLOCK_SIZE, color);
        halfLineColors.push(color);
        appendBlock(block);
      }

      const rightHalfOffsetX = (DIMENSION/2)*BLOCK_SIZE;
      halfLineColors.reverse().forEach((color, index) => {
        const block = createBlock(BLOCK_SIZE * index + rightHalfOffsetX, yPos, BLOCK_SIZE, color);
        appendBlock(block);

      });









