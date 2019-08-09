function make2dArray(c, r) {
    let arr = new Array(c);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(r);
    }
    return arr
}

class Cell {
    constructor(x, y) {
        this.mine = false
        this.revealed = false;
        this.x = x * w;
        this.y = y * w;
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
            fill(255);
            rect(this.x, this.y, w, w);
        }
    }

    clicked(x, y) {
        if (x > this.x && x < this.x + w && y > this.y && y < this.y + w) {
            this.revealed = true;
            if(this.clue==0)this.flood();
        }
    }
    flood(){
        let i = this.x / w;
        let j = this.y / w;


        if (j < grid.length - 1){
        if(!grid[i][j+1].revealed){
            grid[i][j+1].revealed=true;
            if(grid[i][j+1].clue==0)grid[i][j+1].flood();
        }}
        if (j > 0){
        if(!grid[i][j-1].revealed){
            grid[i][j-1].revealed=true;
            if(grid[i][j-1].clue==0)grid[i][j-1].flood();
        }}
        if (i < grid.length - 1) {
        if(!grid[i+1][j].revealed){
            grid[i+1][j].revealed=true;
            if(grid[i+1][j].clue==0)grid[i+1][j].flood();
        }}
        if (i > 0) {
        if(!grid[i-1][j].revealed){
            grid[i-1][j].revealed=true;
            if(grid[i-1][j].clue==0)grid[i-1][j].flood();
        }}
        if (i < grid.length - 1) { if (j < grid.length - 1){
        if(!grid[i+1][j+1].revealed){
            grid[i+1][j+1].revealed=true;
            if(grid[i+1][j+1].clue==0)grid[i+1][j+1].flood();
        }}}

        if (i < grid.length - 1) {if (j > 0){
        if(!grid[i+1][j-1].revealed){
            grid[i+1][j-1].revealed=true;
            if(grid[i+1][j-1].clue==0)grid[i+1][j-1].flood();
        }}}

        if (i > 0) {if (j < grid.length - 1){
        if(!grid[i-1][j+1].revealed){
            grid[i-1][j+1].revealed=true;
            if(grid[i-1][j+1].clue==0)grid[i-1][j+1].flood();
        }}}

        if (i > 0) {if (j > 0){
        if(!grid[i-1][j-1].revealed){
            grid[i-1][j-1].revealed=true;
            if(grid[i-1][j-1].clue==0)grid[i-1][j-1].flood();
        }}}                        
    }
    clue() {
        let i = this.x / w;
        let j = this.y / w;
        let bombs =null;

        if (i > 0) {
            if (j < grid.length - 1)
                if (grid[i - 1][j + 1].mine) bombs += 1;
            if (grid[i - 1][j].mine) bombs += 1;
            if (j > 0)
                if (grid[i - 1][j - 1].mine) bombs += 1;
        }

        if (i < grid.length - 1) {
            if (j < grid.length - 1)
                if (grid[i + 1][j + 1].mine) bombs += 1;
            if (grid[i + 1][j].mine) bombs += 1;
            if (j > 0)
                if (grid[i + 1][j - 1].mine) bombs += 1;
        }
        if (j < grid.length - 1)
            if (grid[i][j + 1].mine) bombs += 1;
        if (j > 0)
            if (grid[i][j - 1].mine) bombs += 1;
        if(!bombs)bombs= " ";
        return bombs
    }
}



let grid;
const cols = 20;
const rows = 20;
const w = 30;
const totalMines = 40;

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
