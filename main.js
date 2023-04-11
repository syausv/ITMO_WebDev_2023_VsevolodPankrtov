const  DOM = (id) => document.getElementById("app");
const appendBlockToContainer = (block, container) => container.appendChild(block);
const getColorOrEmptyOnRandom = () => {
  const isNotEmpty = Math.random()> 0.5;
  if (isNotEmpty) {
   return "black";
  }

return null;

}
const createBlockWithSizeAndColorAtPosition = (x,y, size, color) => {
  const result =  document.createElement("div");
  if(color) {

      result.style.backgroundColor = color;
  }

  result.style.width = result.style.height =`${size}px`;
  result.style.position = "absolute";
  result.style.left = `${x}px` ;
  result.style.top = `${y}px`;
  return result;
}
const container = DOM('app');

const BLOCK_SIZE = 50;
const STEP_DELTA_X = BLOCK_SIZE;
const DIMENSION = 8;

let columns = 0;
let rows = 0;
let yPos = 0;
let xPos = 0;

const saveColorForFutureUse = (color) => colorsInLine.push(color);
//while (rows-- > 0) {
  let colorsInLine = [];
 columns = DIMENSION/2;
  while (columns-- >0) {
  const color = getColorOrEmptyOnRandom();
  const block = createBlockWithSizeAndColorAtPosition(xPos,yPos,BLOCK_SIZE,color);
  saveColorForFutureUse(color);
  appendBlockToContainer(block, container);
  xPos += STEP_DELTA_X;
  }


const rightHalfOffsetX = (DIMENSION/2)* BLOCK_SIZE;
colorsInLine.reverse().forEach((color, index) => {

  const block = createBlockWithSizeAndColorAtPosition(BLOCK_SIZE* index + rightHalfOffsetX ,yPos,BLOCK_SIZE, color);
  appendBlockToContainer(block, container);

});
//yPos += BLOCK_SIZE;
//}
