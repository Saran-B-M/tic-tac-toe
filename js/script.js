//create an module(IIFE assigned to a variable that returns
//an object) called gameboard that stores the current state of the game
//board. it has the function of marking a tile depending on the player. Disabling
//a tile if it is marked. Checking whether the game is over.
let gameBoard = (function (){
    let tiles = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    let won = -1;
    let player = 1;
    let markTile = (tile) => {
        if(tiles[tile]===-1){
            if(gameBoard.player === 1){
                tiles[tile] = 1;
            }
            else {
                tiles[tile] = 0;
            }
            
            gameBoard.player = 1-gameBoard.player;
            
        }
    }
    let checkGameStatus = () => {
        if(tiles[0]===1 && tiles[1]===1 && tiles[2]===1){
            gameBoard.won = 1;
        }
        else if(tiles[0]===0 && tiles[1]===0 && tiles[2]===0){
            gameBoard.won = 0;
        }
        else if(tiles[0]===1 && tiles[3]===1 && tiles[6]===1){
            gameBoard.won = 1;
        }
        else if(tiles[0]===0 && tiles[3]===0 && tiles[6]===0){
            gameBoard.won = 0;
        }
        else if(tiles[0]===1 && tiles[4]===1 && tiles[8]===1){
            gameBoard.won = 1;
        }
        else if(tiles[0]===0 && tiles[4]===0 && tiles[8]===0){
            gameBoard.won = 0;
        }
        else if(tiles[8]===1 && tiles[5]===1 && tiles[2]===1){
            gameBoard.won = 1;
        }
        else if(tiles[8]===0 && tiles[5]===0 && tiles[2]===0){
            gameBoard.won = 0;
        }
        else if(tiles[8]===1 && tiles[7]===1 && tiles[6]===1){
            gameBoard.won = 1;
        }
        else if(tiles[8]===0 && tiles[7]===0 && tiles[6]===0){
            gameBoard.won = 0;
        }
        else if(tiles[1]===1 && tiles[4]===1 && tiles[7]===1){
            gameBoard.won = 1;
        }
        else if(tiles[1]===0 && tiles[4]===0 && tiles[7]===0){
            gameBoard.won = 0;
        }
        else if(tiles[3]===1 && tiles[4]===1 && tiles[5]===1){
            gameBoard.won = 1;
        }
        else if(tiles[3]===0 && tiles[4]===0 && tiles[5]===0){
            gameBoard.won = 0;
        }
        else if(tiles[6]===1 && tiles[4]===1 && tiles[2]===1){
            gameBoard.won = 1;
        }
        else if(tiles[6]===0 && tiles[4]===0 && tiles[2]===0){
            gameBoard.won = 0;
        }
        let draw=true;
        for(let tile of tiles){
                if(tile===-1)
                {
                    draw=false;
                    break;
            }
        }
        if(draw) return 'Draw';
        
        if(gameBoard.won === 1) return 'X Won';
        else if(gameBoard.won === 0) return 'O Won';
        else return

    }

    let resetGame = () => {
        tiles = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        gameBoard.tiles = tiles;
        gameBoard.won = -1;
        
        gameBoard.player = 1;
    }


    return {tiles, player, won,  markTile, resetGame, checkGameStatus};
})();

//create an object using module called displayController that has the function to 
//show the layout like the game board whose turn to play and
//play
let displayController = (function (){
    let replay = document.querySelector("button");
    let tiles = Array.from(document.querySelectorAll(".tile"));
    let player = document.querySelector("h1");
    let gameLayout = document.querySelector(".gameLayout");
    let gameOverDiv = document.querySelector(".gameOver");
    let addEventListeners = function(){
        for(let tile of tiles){
            tile.addEventListener("click", markTile);
        }
        replay.addEventListener("click", resetGame);
    };
    let markTile = (e) => {
        let tile = e.target.getAttribute("data-id");
        gameBoard.markTile(tile);
        showGame();
    }

    let showGame = () => {
        let gameStatus = gameBoard.checkGameStatus();
        if(gameStatus) gameOver(gameStatus);
        
        for(let i=0; i<tiles.length; i++){
            let tileContent;
            if(gameBoard.tiles[i]===1) tileContent="X";
            else if(gameBoard.tiles[i]===0) tileContent="O";
            else tileContent = " ";
            tiles[i].textContent = tileContent;
        }
        player.textContent = `Turn of ${gameBoard.player?'X':'O'}`;
    }

    let resetGame = () => {
        for(let i=0; i<tiles.length; i++){
            tiles[i].textContent = " ";
        }
        gameLayout.style.display = "grid";
        gameOverDiv.style.display = "none";
        gameBoard.resetGame();
        
        showGame();

    }

    let gameOver = (won) => {
        gameLayout.style.display = "none";
        gameOverDiv.style.display = "block";
        gameOverDiv.textContent = won;
        won = -1;

    }

    addEventListeners();
    return {showGame}
})()

displayController.showGame();