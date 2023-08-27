const tableHeadingRow=document.getElementById('tr-heading-row');
const tableBody=document.getElementById('tbody-heading');
const sheetHeading=document.getElementById('sheet-no');
const columns=26;
const rows=100;
 const arrMatrix='arrMatrix';
const transparentColor='transparent';
const blueColor='#DDDDFF';

//extracting buttons
const boldButton=document.getElementById('bold-btn');
const italicButton=document.getElementById('italic-btn');
const underlineButton=document.getElementById('underline-btn');
const leftButton=document.getElementById('left-btn');
const centerButton=document.getElementById('center-btn');
const rightButton=document.getElementById('right-btn');
const cutButton=document.getElementById('cut-btn');
const copyButton=document.getElementById('copy-btn');
const pasteButton=document.getElementById('paste-btn');
const downloadButton=document.getElementById('download-btn');
const uploadInputButton=document.getElementById('upload-input');
const saveSheetButton=document.getElementById('save-sheet-btn');
const addSheetButton=document.getElementById('add-sheet-btn');
const sheet1Button=document.getElementById('sheet-1');
const buttonContainer=document.getElementById('button-container');
//extrating dropdown
const fontDropdown=document.getElementById('font-style-dropdown');
const fontsizeDropdown=document.getElementById('font-size-dropdown');
const bgColorSelector=document.getElementById('bgColor');
const fontColorSelector=document.getElementById('fontColor');
// for(let cols=0;cols<26;cols++){
//     const col=document.createElement('th');
//     col.innerText = String.fromCharCode(cols + 65);
//      // col+65 -> ASCII character
//     tableHeadingRow.append(col);
// }
function colGen(typeOfCell,tableRow,isInnerText,rownum){
    
    for(let cols=0;cols<columns;cols++){
        const cell=document.createElement(typeOfCell);
        if(isInnerText){
            cell.innerText=String.fromCharCode(cols+65);
            cell.setAttribute('id',String.fromCharCode(cols+65));

        }
        else{
            cell.setAttribute('id',`${String.fromCharCode(cols+65)}${rownum}`)
            cell.setAttribute('contenteditable','true');
            cell.addEventListener('focusout',updateObjectInMatrix);
            cell.addEventListener('focus',event=>{onFocusFunction(event.target)});
        }
        tableRow.append(cell);
    }
}
let previousCellId;
let currentCell;
let cutCell;
let lastPressed;
let numSheet=1;
let prevSheet;
let currentSheet=1;
let matrix=new Array(rows);
createNewMatrix();
function createNewMatrix(){
    for(let row=0;row<rows;row++){
        matrix[row]=new Array(columns);
        for(let col=0;col<columns;col++){
            matrix[row][col]={};
            // console.log(matrix[row][col])
        } 
    }
}
function setColor(colId,rowId,color){
    const colHead=document.getElementById(colId);
    const rowHead=document.getElementById(rowId);
    colHead.style.backgroundColor=color;
   rowHead.style.backgroundColor=color;
}
function buttonHighlighter(currentCell,button,style,styleProperty){
    if(currentCell.style[styleProperty]===style){
        button.style.backgroundColor=blueColor;
    }
    else{
        button.style.backgroundColor=transparentColor;
    }
    
}
function onFocusFunction(cell){
    currentCell=cell;
    if(previousCellId){
       setColor(previousCellId[0],previousCellId.substring(1),'transparent')
        // const colHead=document.getElementById(previousCellId[0]);
        // const rowHead=document.getElementById(previousCellId.substring(1));
        // colHead.style.backgroundColor='transparent';
        // rowHead.style.backgroundColor='transparent';

    }
    // if(currentCell.style.fontWeight==='bold'){
    //     boldButton.style.backgroundColor='#DDDDFF';
    // }else{
    //     boldButton.style.backgroundColor='transparent';
    // }
    buttonHighlighter(currentCell,boldButton,'bold','fontWeight');

    // if(currentCell.style.fontStyle==='italic'){
    //     italicButton.style.backgroundColor='#DDDDFF';
    // }else{
    //     italicButton.style.backgroundColor='transparent';
    // }
    buttonHighlighter(currentCell,italicButton,'italic','fontStyle');
   
    // if(currentCell.style.textDecoration==='underline'){
    //     underlineButton.style.backgroundColor='#DDDDFF';
    // }else{
    //     underlineButton.style.backgroundColor='transparent';
    // }
     buttonHighlighter(currentCell,underlineButton,'underline','textDecoration')
    const currentCellHeading=document.getElementById('current-cell');
    currentCellHeading.innerText=cell.id+' '+'Selected';
    // const colHead=document.getElementById(cellId[0]);
    // const rowHead=document.getElementById(cellId.substring(1));
    // colHead.style.backgroundColor='#DDDDFF';
    // rowHead.style.backgroundColor='#DDDDFF';
    setColor(cell.id[0],cell.id.substring(1),'#DDDDFF')
     previousCellId=cell.id;
     
}
colGen('th',tableHeadingRow,true);
tableBodyGen();

function tableBodyGen(){
    tableBody.innerHTML='';
    for(let rownum=1;rownum<=rows;rownum++){
        const row=document.createElement('tr');
        const th=document.createElement('th');
        th.innerText=rownum;
        row.append(th);
        th.setAttribute('id',rownum);
        colGen('td',row,false,rownum);
        tableBody.append(row);
    }
}
boldButton.addEventListener('click',()=>{
   if(currentCell.style.fontWeight==='bold'){
   boldButton.style.backgroundColor='transparent';
    currentCell.style.fontWeight='normal';
   }else{
    boldButton.style.backgroundColor='#DDDDFF';
    currentCell.style.fontWeight='bold';
   }
   updateObjectInMatrix();
})

italicButton.addEventListener('click',()=>{
    if(currentCell.style.fontStyle==='italic'){
   italicButton.style.backgroundColor='transparent';
     currentCell.style.fontStyle='normal';
    }else{
     italicButton.style.backgroundColor='#DDDDFF';
     currentCell.style.fontStyle='italic';
    }
    updateObjectInMatrix();
 })
 underlineButton.addEventListener('click',()=>{
    if(currentCell.style.textDecoration==='underline'){
    underlineButton.style.backgroundColor='transparent';
     currentCell.style.textDecoration='none';
    }else{
     underlineButton.style.backgroundColor='#DDDDFF';
     currentCell.style.textDecoration='underline';
    }
    updateObjectInMatrix();
 })

 leftButton.addEventListener('click',()=>{
    currentCell.style.textAlign='left';
    updateObjectInMatrix();
 })
 
 centerButton.addEventListener('click',()=>{
    currentCell.style.textAlign='center';
    updateObjectInMatrix();
 })
 
 rightButton.addEventListener('click',()=>{
    currentCell.style.textAlign='right';
    updateObjectInMatrix();
 })

fontDropdown.addEventListener('change',()=>{
    currentCell.style.fontFamily=fontDropdown.value;
    updateObjectInMatrix();
})
fontsizeDropdown.addEventListener('change',()=>{
    currentCell.style.fontSize=fontsizeDropdown.value;
    updateObjectInMatrix();
})

bgColorSelector.addEventListener('input',()=>{
    currentCell.style.backgroundColor=bgColorSelector.value;
    updateObjectInMatrix()
})
fontColorSelector.addEventListener('input',()=>{
    currentCell.style.color=fontColorSelector.value;
    updateObjectInMatrix()
})

cutButton.addEventListener('click',()=>{
    lastPressed='cut';
    cutCell={
        text:currentCell.innerText,
        style:currentCell.style.cssText,
    }
    currentCell.innerText='';
    currentCell.style.cssText='';
    updateObjectInMatrix();
})

pasteButton.addEventListener('click',()=>{
    currentCell.innerText=cutCell.text;
    currentCell.style=cutCell.style;
    if(lastPressed==='cut'){
        cutCell=undefined;
    }
    updateObjectInMatrix();
})
copyButton.addEventListener('click',()=>{
    lastPressed='copy'
    cutCell={
        text:currentCell.innerText,
        style:currentCell.style.cssText,
    }
})

function updateObjectInMatrix(){
    let id=currentCell.id;
    let tempObj={
        id:id,
        text:currentCell.innerText,
        style:currentCell.style.cssText,
    }
    let col=id[0].charCodeAt(0)-65;
    let row=id.substring(1)-1;
    
    matrix[row][col]=tempObj;
    // console.log(matrix);
}

downloadButton.addEventListener('click',downloadMatrix)
function downloadMatrix(){
const  matrixString=JSON.stringify(matrix);
//here blob takes array in args...
const blob=new Blob([matrixString],{type:'application/json'});
//now i am creating link
const link=document.createElement('a');
//convert my blob to link href(URL)
link.href=URL.createObjectURL(blob);
link.download='table.json'
//user will click on download button then directly this link will be clicked....
link.click();
}
uploadInputButton.addEventListener('input',uploadMatrix);
 function uploadMatrix(event){
   const file=event.target.files[0];
  //now fileReadear is a class that helps to read all types of class 
  if(file){
    const reader=new FileReader();
    //now this reader will inbuilt instance of filesreader class
    //now
    reader.readAsText(file);
    //this reader should convert my blob into js code
    reader.onload=function(event){
     const fileContent=JSON.parse(event.target.result); 
   console.log(fileContent);
    }
  } 
}
function viewSheet(event){
    console.log(event.target.id);
}
//adding sheets
function generateNextButtonFn(){

    const btn=document.createElement('button');
    numSheet++;
    currentSheet=numSheet;
    btn.innerText=`Sheet-${currentSheet}`;
    btn.setAttribute('id',`sheet-${currentSheet}`);
    btn.setAttribute('onclick','viewSheet(event)')
    buttonContainer.append(btn);
}
  function saveMatrix(){
    if(localStorage.getItem(arrMatrix)){
        let tempMatrixArr=JSON.parse(localStorage.getItem(arrMatrix));
        tempMatrixArr.push(matrix);
        localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr));
        
     }else{
      let tempMatrixArr=[matrix];
      localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr));
    
     }
  }

addSheetButton.addEventListener('click',()=>{
    generateNextButtonFn();
   sheetHeading.innerText=`Sheet No-${currentSheet}`;
 
   saveMatrix();
   createNewMatrix();
   tableBodyGen();
   
});



