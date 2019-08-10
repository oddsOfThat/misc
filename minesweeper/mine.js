function make2dArray(c, r) {
    let arr = new Array(c);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(r);
    }
    return arr
}

class Cell {
    constructor(i, j) {
        this.mine = false
        this.revealed = false;
        this.marked=false;
        this.i=i;
        this.j=j;
        this.x = i * w;
        this.y = j * w;
        this.clue;
    }

    show() {
        if (this.revealed) {
            fill(0, 255, 0);
            rect(this.x, this.y, w, w);
            if (this.mine) {
                fill(255, 0, 0);

                ellipse(this.x + w / 2, this.y + w / 2, w / 2);
            } else {
                fill(0);
                textAlign(CENTER);
                text(this.clue, this.x + w / 2, this.y + w / 2)
            }
        } else {
            if(!this.marked){
            fill(255);
            rect(this.x, this.y, w, w);
            }
            else{
                fill(0,0,255);
                rect(this.x, this.y, w, w);
            }
        }
    }
    reveal(){
        if(!this.revealed&&this.clue==0&&!this.mine){
            this.revealed = true;
            this.flood();
        }
        else this.revealed = true;
    }
    clicked(x, y) {
        
        if (x > this.x && x < this.x + w && y > this.y && y < this.y + w) {
            if(!document.getElementById("marking").checked){
            this.reveal();
            }
            else{
                this.mark();
            }
        
        
        }
    }
    mark(){
        if(!this.marked)this.marked=true;
        else this.marked=false;
    }
    flood(){
       
        if (this.j < grid[0].length-1 ){
            grid[this.i][this.j+1].reveal();
        }
        if (this.j > 0){
            grid[this.i][this.j-1].reveal();
        }
        if (this.i< grid.length-1 ){
            grid[this.i+1][this.j].reveal();
        } 
        if (this.i > 0){       
            grid[this.i-1][this.j].reveal();
        }
        if (this.j < grid[0].length-1 &&this.i< grid.length-1 ){
            grid[this.i+1][this.j+1].reveal();
        }
        if (this.j > 0&&this.i< grid.length-1 ){
            grid[this.i+1][this.j-1].reveal();
        }
        if (this.j < grid[0].length-1  && this.i > 0){
            grid[this.i-1][this.j+1].reveal();
        }
        if (this.j > 0 && this.i > 0){
            grid[this.i-1][this.j-1].reveal();
        }
            
        }                        
    clue() {

        let bombs =null;

        if (this.j < grid[0].length-1 ){
            if(grid[this.i][this.j+1].mine) bombs=bombs+1;
        }
        if (this.j > 0){
            if(grid[this.i][this.j-1].mine) bombs=bombs+1;
        }
        if (this.i< grid.length-1 ){
            if(grid[this.i+1][this.j].mine) bombs=bombs+1;
        } 
        if (this.i > 0){       
            if(grid[this.i-1][this.j].mine) bombs=bombs+1;
        }
        if (this.j < grid[0].length-1 &&this.i< grid.length-1 ){
            if(grid[this.i+1][this.j+1].mine) bombs=bombs+1;
        }
        if (this.j > 0&&this.i< grid.length-1 ){
            if(grid[this.i+1][this.j-1].mine) bombs=bombs+1;
        }
        if (this.j < grid[0].length-1  && this.i > 0){
            if(grid[this.i-1][this.j+1].mine) bombs=bombs+1;
        }
        if (this.j > 0 && this.i > 0){
            if(grid[this.i-1][this.j-1].mine) bombs=bombs+1;
        }
        if(!bombs)bombs= " ";
        return bombs
    }
}



let grid;
const cols = 10;
const rows = 10;
const w = 30;
const totalMines = 14;

function setup() {
    createCanvas(cols * w, rows * w);

    grid = make2dArray(cols, rows);

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
    for(let n=0;n<totalMines;n++){
        let i= floor(random(cols));
        let j= floor(random(rows));
        if(!grid[i][j].mine)grid[i][j].mine=true;
        else n-=1;
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].clue = grid[i][j].clue();
        }
    }

}

function draw() {
    background(0);
    grid.forEach(col => col.forEach(cell => cell.show()));
}
function mousePressed() {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].clicked(mouseX, mouseY);
        }
    }
}
