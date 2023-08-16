let currentBoard = ["r","n","b","q","k","b","n","r","p","p","p","p","p","p","p","p","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","P","P","P","P","P","P","P","P","R","N","B","Q","K","B","N","R"];
let hintShown = false;
let move = 0;
let correct = true;
let turn = "b";
let p1 = 0;
let p2 = 0;
let currentPiece = "r"; 
let boardMoves = true;
let totalBoardPositions = 0;
let currentBoardPosition = 0;
let boardPositions = [];
let puzzleCompleted = false;
let moveCount = 0;
let prevMovesStr = "";
let letter = 0;
let letterStr = "";
let prevMovesPadding = 0;
let lines = 1;
let prevPosition = 0;
let kingCheck = false;
let enPassant = -1
let enPassant2 = -1
let savedBoard = ["r","n","b","q","k","b","n","r","p","p","p","p","p","p","p","p","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","P","P","P","P","P","P","P","P","R","N","B","Q","K","B","N","R"]
let wLongCastle = true
let bLongCastle = true
let wShortCastle = true
let bShortCastle = true

function setup(){
    hideDots();
    p1 = 0;
    p2 = 0;
    currentBoardPosition = 0;
    totalBoardPositions = 0;
    boardPositions = [];
    boardMoves = true;
    correct = true;
    boardSetup();
    lines = 0;
    move = 1;
    moveCount = 0;
    turn = "w";
    p1 = 0;
    p2 = 0;
}

function boardSetup(){
    arrayBoard()
    if(turn == "w"){
        turn = "b"
    } 
    else{
        turn = "w"
    }
}

function squareClicked(id){
    if(boardMoves == true){
        if(p1 == 0){
            hideDots()
            if((currentBoard[parseInt(id)-1] == currentBoard[parseInt(id)-1].toLowerCase() && turn == "b") || (currentBoard[parseInt(id)-1] == currentBoard[parseInt(id)-1].toUpperCase() && turn == "w")){
                p1 = parseInt(id);
                legalMoves();
            }
        } 
        else {
            if((currentBoard[id-1] != currentBoard[id-1].toUpperCase() && turn == "w") || (currentBoard[id-1] != currentBoard[id-1].toLowerCase() && turn == "b") || (currentBoard[id-1] == "x")){
                p2 = parseInt(id);
                console.log(p2)
                if(p2 != p1){
                    console.log(document.getElementById("dot"+p2).style.visibility)
                    console.log(p2)
                    if(document.getElementById("dot"+p2).style.visibility == "visible"){
                        if((currentBoard[id-1] != currentBoard[id-1].toUpperCase() && turn == "w") || (currentBoard[id-1] != currentBoard[id-1].toLowerCase() && turn == "b") || (currentBoard[id-1] == "x")){
                            currentPiece = currentPiece.toLowerCase();
                            if(p2 == enPassant){
                                currentBoard[enPassant2-1] = "x"
                            }
                            enPassant = -1
                            console.log(currentBoard[p1-1])
                            if(currentBoard[p1-1].toLowerCase() == "p"){
                                if(p2-p1 == -16){
                                    enPassant = p2+8
                                }
                                else if(p2-p1 == 16){
                                    enPassant = p1+8
                                }
                            }
                            else if(currentBoard[p1-1].toLowerCase() == "k"){
                                if(turn == "w"){
                                    wLongCastle = false
                                    wShortCastle = false
                                }
                                else if(turn == "b"){
                                    bLongCastle = false
                                    bShortCastle = false
                                }
                            }
                            else if(currentBoard[p1-1].toLowerCase() == "r"){
                                if(turn == "w"){
                                    if(p1%8 == 0 && Math.floor((p1-1)/8) == 7){
                                        wShortCastle = false
                                    }
                                    else if(p1%8 == 1 && Math.floor((p1-1)/8) == 7){
                                        wLongCastle = false
                                    }
                                }
                                else if(turn == "b"){
                                    if(p1%8 == 0 && Math.floor((p1-1)/8) == 0){
                                        bShortCastle = false
                                    }
                                    else if(p1%8 == 1 && Math.floor((p1-1)/8) == 0){
                                        bLongCastle = false
                                    }
                                }
                            }
                            currentBoard[p2-1] =  currentBoard[p1-1];
                            currentBoard[p1-1] = "x";
                            boardSetup();
                        }
                    }
                    p1 = 0;
                    p2 = 0;
                    hideDots()
                }
                else if(p1 == p2){
                    p1 = 0;
                    p2 = 0;
                    hideDots()
                }
            }
            else if((currentBoard[parseInt(id)-1] == currentBoard[parseInt(id)-1].toLowerCase() && turn == "b") || (currentBoard[parseInt(id)-1] == currentBoard[parseInt(id)-1].toUpperCase() && turn == "w") && currentBoard[parseInt(id)-1] != "x"){
                p1 = 0;
                hideDots()
                if(p1 != id){
                    squareClicked(id)
                }
                else{
                    hideDots()
                }
            }
        }
        
    }
}

function back(){
    if(currentBoardPosition > 1){
        currentBoardPosition -= 1;
        currentBoard = boardPositions[currentBoardPosition-1].slice();
        boardMoves = false;
        arrayBoard()
    }
}

function forward(){
    if(currentBoardPosition < totalBoardPositions){
        currentBoardPosition += 1;
        currentBoard = boardPositions[currentBoardPosition-1].slice();
        boardMoves = false;
        if(currentBoardPosition == totalBoardPositions && puzzleCompleted == false){
            boardMoves = true;
        }
        arrayBoard()
    }
}

function fback(){
    currentBoardPosition = 1;
    currentBoard = boardPositions[currentBoardPosition-1].slice();
    boardMoves = false;
    arrayBoard()
}

function fforward(){
    currentBoardPosition = totalBoardPositions;
    currentBoard = boardPositions[currentBoardPosition-1].slice();
    boardMoves = false;
    if(currentBoardPosition == totalBoardPositions && puzzleCompleted == false){
        boardMoves = true;
    }
    arrayBoard()
}

function legalMoves(){
    hideDots();
    stop = false;
    if(currentBoard[p1-1] == "P"){
        if(currentBoard[p1-9] == "x"){
            document.getElementById("dot" + (p1-8)).style.visibility = "visible";
        }
        else{
            stop = true;
        }
        if(currentBoard[p1-17] == "x" && stop == false){
            if(Math.floor((p1-1)/8) == 6){
                document.getElementById("dot" + (p1-16)).style.visibility = "visible";
            }
        }
        for(let i=0;i>-3;i-=2){
            if(currentBoard[p1-7+i-1] == currentBoard[p1-7+i-1].toLowerCase() && currentBoard[p1-7+i-1] != "x"){
                document.getElementById("dot" + (p1+(-7+i))).style.visibility = "visible";
            }
            else if(p1-7+i == enPassant & currentBoard[p1-7+i-1+8] == "p"){
                document.getElementById("dot" + (p1+(-7+i))).style.visibility = "visible";
                enPassant2 = p1-7+i+8
            }
        } //pawn
    }
    if(currentBoard[p1-1] == "R" || currentBoard[p1-1] == "Q"){
        for(let j=-1;j<2;j+=2){
            stop = false;
            for(let i=8*j;i!=64*j;i += 8*j){
                if(stop == false){
                    if(p1-i > 0 && p1-i<65){
                        if(currentBoard[p1-i-1] == "x"){
                            document.getElementById("dot" + (p1-i)).style.visibility = "visible";
                        }
                        else if(currentBoard[p1-i-1] == currentBoard[p1-i-1].toLowerCase()){
                            document.getElementById("dot" + (p1-i)).style.visibility = "visible";
                            stop = true;
                        }
                        else{
                            stop = true;
                        }
                    }
                }
            }//up
            stop = false;
            for(let i=j;i!=8*j;i+=j){
                if(stop == false){
                    if(Math.floor((p1+i-1)/8) == Math.floor((p1-1)/8)){
                        if(currentBoard[p1+i-1] == "x"){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                        }
                        else if(currentBoard[p1+i-1] == currentBoard[p1+i-1].toLowerCase()){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                            stop = true;
                        }
                        else{
                            stop = true;
                        }
                    }
                }
            }//right
        }
    }
    if(currentBoard[p1-1] == "B" || currentBoard[p1-1] == "Q"){
        for(let j=-1;j<2;j+=2){
            stop = false;
            for(let i=-7*j;i!=-56*j;i -= 7*j){
                if((p1+i)%8 == (j+1)/2){
                    stop = true;
                }
                if(stop == false){
                    if(p1+i > 0 && p1+i <65){
                        if(currentBoard[p1+i-1] == "x"){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                        }
                        else if(currentBoard[p1+i-1] == currentBoard[p1+i-1].toLowerCase()){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                            stop = true;
                        }
                        else{
                            stop = true;
                        }
                    }
                }
            } //NE
            stop = false;
            for(let i=-9*j;i!=-72*j;i -= 9*j){
                if(p1+i > 0 && p1+i < 65){
                    if(Math.floor((p1+i-1)/8)-Math.floor((p1+i+8)/8) == -1){
                        if(stop == false){
                            if(p1+i > 0){
                                if(currentBoard[p1+i-1] == "x"){
                                    document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                                }
                                else if(currentBoard[p1+i-1] == currentBoard[p1+i-1].toLowerCase()){
                                    document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                                    stop = true;
                                }
                                else{
                                    stop = true;
                                }
                            }
                        }
                    }
                    else{
                        stop = true;
                    }
                }
            }
        }
    }
    if(currentBoard[p1-1] == "N"){
        for(let j=-1;j<2;j+=2){
            console.log("N")
            if((p1+10*j) > 0 && (p1+10*j) < 64){
                if(currentBoard[p1+10*j-1] != currentBoard[p1+10*j-1].toUpperCase()){
                    if((p1+10*j)%8 - p1%8 == -6*j ||(p1+10*j)%8 - p1%8 == 2*j){
                        if(Math.floor((p1+10*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                            document.getElementById("dot" + (p1+10*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            if((p1+17*j) > 0 && (p1+17*j) < 64){
                if(currentBoard[p1+17*j-1] != currentBoard[p1+17*j-1].toUpperCase()){
                    if((p1+17*j)%8 - p1%8 == -7*j ||(p1+17*j)%8 - p1%8 == 1*j ){
                        if(Math.floor((p1+17*j-1)/8) - Math.floor((p1-1)/8) == 2*j){
                            document.getElementById("dot" + (p1+17*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            if((p1+15*j) > 0 && (p1+15*j) < 64){
                if(currentBoard[p1+15*j-1] != currentBoard[p1+15*j-1].toUpperCase()){
                    if((p1+15*j)%8 - p1%8 == 7*j ||(p1+15*j)%8 - p1%8 == -1*j ){
                        if(Math.floor((p1+15*j-1)/8) - Math.floor((p1-1)/8) == 2*j){
                            document.getElementById("dot" + (p1+15*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            if((p1+6*j) > 0 && (p1+6*j) < 64){
                if(currentBoard[p1+6*j-1] != currentBoard[p1+6*j-1].toUpperCase()){
                    if((p1+6*j)%8 - p1%8 == 6*j ||(p1+6*j)%8 - p1%8 == -2*j ){
                        if(Math.floor((p1+6*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                            document.getElementById("dot" + (p1+6*j)).style.visibility = "visible";
                        }
                    }
                }
            }
        }
    }
    if(currentBoard[p1-1] == "K"){
        for(let j=-1;j<2;j+=2){
            if(p1+1*j<65 && p1+1*j>0){
                if((p1+1*j)%8 - p1%8 == 1*j || (p1+1*j)%8 - p1%8 == -7*j){
                    if(Math.floor((p1+1*j-1)/8) - Math.floor((p1-1)/8) == 0*j){
                        if(currentBoard[p1+1*j-1] != currentBoard[p1+1*j-1].toUpperCase()){
                            kingInCheck(p1+1*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+1*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
            if(p1+7*j<65 && p1+7*j>0){
                if((p1+7*j)%8 - p1%8 == -1*j || (p1+7*j)%8 - p1%8 == 7*j){
                    if(Math.floor((p1+7*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                        if(currentBoard[p1+7*j-1] != currentBoard[p1+7*j-1].toUpperCase()){
                            kingInCheck(p1+7*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+7*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
            if(p1+8*j<65 && p1+8*j>0){
                if((p1+8*j)%8 - p1%8 == 0*j){
                    if(Math.floor((p1+8*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                        if(currentBoard[p1+8*j-1] != currentBoard[p1+8*j-1].toUpperCase()){
                            kingInCheck(p1+8*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+8*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
            if(p1+9*j<65 && p1+9*j>0){
                if((p1+9*j)%8 - p1%8 == 1*j || (p1+9*j)%8 - p1%8 == -7*j){
                    if(Math.floor((p1+9*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                        if(currentBoard[p1+9*j-1] != currentBoard[p1+9*j-1].toUpperCase()){
                            kingInCheck(p1+9*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+9*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
        }
        if(wLongCastle == true){
            if(currentBoard[p1-2] == "x" && currentBoard[p1-3] == "x" && currentBoard[p1-4] == "x"){
                document.getElementById("dot" + (p1-2)).style.visibility = "visible";
            }
        }
        if(wShortCastle == true){
            if(currentBoard[p1] == "x" && currentBoard[p1+1] == "x"){
                document.getElementById("dot" + (p1+2)).style.visibility = "visible";
            }
        }
    }
    if(currentBoard[p1-1] == "p"){
        if(currentBoard[p1+7] == "x"){
            document.getElementById("dot" + (p1+8)).style.visibility = "visible";
        }
        else{
            stop = true;
        }
        if(currentBoard[p1+31] == "x" && stop == false){
            if(Math.floor((p1-1)/8) == 1){
                document.getElementById("dot" + (p1+16)).style.visibility = "visible";
            }
        }
        for(let i=0;i>-3;i-=2){
            if(currentBoard[p1+7-i-1] == currentBoard[p1+7-i-1].toUpperCase() && currentBoard[p1+7-i-1] != "x"){
                document.getElementById("dot" + (p1+(+7-i))).style.visibility = "visible";
            }
            else if(p1+7-i == enPassant & currentBoard[p1+7-i-1-8] == "P"){
                document.getElementById("dot" + (p1+(+7-i))).style.visibility = "visible";
                enPassant2 = p1+7-i-8
            }
        } //pawn
    }
    if(currentBoard[p1-1] == "r" || currentBoard[p1-1] == "q"){
        for(let j=-1;j<2;j+=2){
            stop = false;
            for(let i=8*j;i!=64*j;i += 8*j){
                if(stop == false){
                    if(p1-i > 0 && p1-i<65){
                        if(currentBoard[p1-i-1] == "x"){
                            document.getElementById("dot" + (p1-i)).style.visibility = "visible";
                        }
                        else if(currentBoard[p1-i-1] == currentBoard[p1-i-1].toUpperCase()){
                            document.getElementById("dot" + (p1-i)).style.visibility = "visible";
                            stop = true;
                        }
                        else{
                            stop = true;
                        }
                    }
                }
            }//up
            stop = false;
            for(let i=j;i!=8*j;i+=j){
                if(stop == false){
                    if(Math.floor((p1+i-1)/8) == Math.floor((p1-1)/8)){
                        if(currentBoard[p1+i-1] == "x"){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                        }
                        else if(currentBoard[p1+i-1] == currentBoard[p1+i-1].toUpperCase()){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                            stop = true;
                        }
                        else{
                            stop = true;
                        }
                    }
                }
            }//right
        }
    }
    if(currentBoard[p1-1] == "b" || currentBoard[p1-1] == "q"){
        for(let j=-1;j<2;j+=2){
            stop = false;
            for(let i=-7*j;i!=-56*j;i -= 7*j){
                if((p1+i)%8 == (j+1)/2){
                    stop = true;
                }
                if(stop == false){
                    if(p1+i > 0 && p1+i <65){
                        if(currentBoard[p1+i-1] == "x"){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                        }
                        else if(currentBoard[p1+i-1] == currentBoard[p1+i-1].toUpperCase()){
                            document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                            stop = true;
                        }
                        else{
                            stop = true;
                        }
                    }
                }
            } //NE
            stop = false;
            for(let i=-9*j;i!=-72*j;i -= 9*j){
                if(p1+i > 0 && p1+i < 65){
                    if(Math.floor((p1+i-1)/8)-Math.floor((p1+i+8)/8) == -1){
                        if(stop == false){
                            if(p1+i > 0){
                                if(currentBoard[p1+i-1] == "x"){
                                    document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                                }
                                else if(currentBoard[p1+i-1] == currentBoard[p1+i-1].toUpperCase()){
                                    document.getElementById("dot" + (p1+i)).style.visibility = "visible";
                                    stop = true;
                                }
                                else{
                                    stop = true;
                                }
                            }
                        }
                    }
                    else{
                        stop = true;
                    }
                }
            }
        }
    }
    if(currentBoard[p1-1] == "n"){
        for(let j=1;j>-2;j-=2){
            console.log("n")
            if((p1+10*j) > 0 && (p1+10*j) < 64){
                if((currentBoard[p1+10*j-1] != currentBoard[p1+10*j-1].toLowerCase()) || (currentBoard[p1+10*j-1] == "x")){
                    if((p1+10*j)%8 - p1%8 == -6*j ||(p1+10*j)%8 - p1%8 == 2*j){
                        if(Math.floor((p1+10*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                            document.getElementById("dot" + (p1+10*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            console.log(1)
            if((p1+17*j) > 0 && (p1+17*j) < 64){
                if((currentBoard[p1+17*j-1] != currentBoard[p1+17*j-1].toLowerCase()) || (currentBoard[p1+17*j-1] == "x")){
                    if((p1+17*j)%8 - p1%8 == -7*j ||(p1+17*j)%8 - p1%8 == 1*j ){
                        if(Math.floor((p1+17*j-1)/8) - Math.floor((p1-1)/8) == 2*j){
                            document.getElementById("dot" + (p1+17*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            console.log(2)
            if((p1+15*j) > 0 && (p1+15*j) < 64){
                if((currentBoard[p1+15*j-1] != currentBoard[p1+15*j-1].toLowerCase()) || (currentBoard[p1+15*j-1] == "x")){
                    if((p1+15*j)%8 - p1%8 == 7*j ||(p1+15*j)%8 - p1%8 == -1*j ){
                        if(Math.floor((p1+15*j-1)/8) - Math.floor((p1-1)/8) == 2*j){
                            document.getElementById("dot" + (p1+15*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            console.log(3)
            if((p1+6*j) > 0 && (p1+6*j) < 64){
                if((currentBoard[p1+6*j-1] != currentBoard[p1+6*j-1].toLowerCase()) || (currentBoard[p1+6*j-1] == "x")){
                    if((p1+6*j)%8 - p1%8 == 6*j ||(p1+6*j)%8 - p1%8 == -2*j ){
                        if(Math.floor((p1+6*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                            document.getElementById("dot" + (p1+6*j)).style.visibility = "visible";
                        }
                    }
                }
            }
            console.log(4)
        }
    }
    if(currentBoard[p1-1] == "k"){
        for(let j=-1;j<2;j+=2){
            if(p1+1*j<65 && p1+1*j>0){
                if((p1+1*j)%8 - p1%8 == 1*j || (p1+1*j)%8 - p1%8 == -7*j){
                    if(Math.floor((p1+1*j-1)/8) - Math.floor((p1-1)/8) == 0*j){
                        if(currentBoard[p1+1*j-1] != currentBoard[p1+1*j-1].toLowerCase() || currentBoard[p1+1*j-1] == "x"){
                            kingInCheckBlack(p1+1*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+1*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
            if(p1+7*j<65 && p1+7*j>0){
                if((p1+7*j)%8 - p1%8 == -1*j || (p1+7*j)%8 - p1%8 == 7*j){
                    if(Math.floor((p1+7*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                        if(currentBoard[p1+7*j-1] != currentBoard[p1+7*j-1].toLowerCase() || currentBoard[p1+7*j-1] == "x"){
                            kingInCheckBlack(p1+7*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+7*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
            if(p1+8*j<65 && p1+8*j>0){
                if((p1+8*j)%8 - p1%8 == 0*j){
                    if(Math.floor((p1+8*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                        if(currentBoard[p1+8*j-1] != currentBoard[p1+8*j-1].toLowerCase() || currentBoard[p1+8*j-1] == "x"){
                            kingInCheckBlack(p1+8*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+8*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
            if(p1+9*j<65 && p1+9*j>0){
                if((p1+9*j)%8 - p1%8 == 1*j || (p1+9*j)%8 - p1%8 == -7*j){
                    if(Math.floor((p1+9*j-1)/8) - Math.floor((p1-1)/8) == 1*j){
                        if(currentBoard[p1+9*j-1] != currentBoard[p1+9*j-1].toLowerCase() || currentBoard[p1+9*j-1] == "x"){
                            kingInCheckBlack(p1+9*j);
                            if(kingCheck == false){
                                document.getElementById("dot" + (p1+9*j)).style.visibility = "visible";
                            }
                        }
                    }
                }
            }
        }
    }
}

function hideDots(){
    for(let i=1;i<65;i++){
        document.getElementById("dot" + i).style.visibility = "hidden";
    }
}

function kingInCheck(newPosition){
    kingCheck = false;
    for(let j=-1;j<2;j+=2){
        stop = false;
        for(let i=8*j;i!=64*j;i+=8*j){
            if (stop == false){
                if(i+newPosition > 0 && i+newPosition < 65){
                    if(currentBoard[i+newPosition-1] == "r" || currentBoard[i+newPosition-1] == "q"){
                        kingCheck = true;
                        stop = true;
                    }
                    else if(currentBoard[newPosition+i-1] != "x"){
                        stop = true;
                    }
                }
            }
        }
        stop = false
        for(let i=-1*j;i!=-8*j;i -= 1*j){
            if(stop == false){
                if(Math.floor((newPosition+i-1)/8) == Math.floor((newPosition-1)/8)){
                    if(currentBoard[newPosition+i-1] == "r" || currentBoard[newPosition+i-1] == "q"){
                        kingCheck = true;
                    }
                    else if(currentBoard[newPosition+i-1] != "x"){
                        stop = true;
                    }
                }
            }
        }
        if(newPosition+1*j<65){
            if((newPosition+1*j)%8 - newPosition%8 == 1 || (newPosition+1*j)%8 - newPosition%8 == -7){
                if(Math.floor((newPosition+1*j-1)/8) - Math.floor((newPosition-1)/8) == 0){
                    if(currentBoard[newPosition+1*j-1] == "k"){
                        kingCheck = true;
                    }
                }
            }
        }
        if(newPosition+7*j<65){
            if((newPosition+7*j)%8 - newPosition%8 == -1 || (newPosition+7*j)%8 - newPosition%8 == 7){
                if(Math.floor((newPosition+7*j-1)/8) - Math.floor((newPosition-1)/8) == 1*j){
                    if(currentBoard[newPosition+7*j-1] == "k"){
                        kingCheck = true;
                    }
                }
            }
        }
        if(newPosition+8*j<65){
            if((newPosition+8*j)%8 - newPosition%8 == 0){
                if(Math.floor((newPosition+8*j-1)/8) - Math.floor((newPosition-1)/8) == 1*j){
                    if(currentBoard[newPosition+8*j-1] == "k"){
                        kingCheck = true;
                    }
                }
            }
        }
        if(newPosition+9*j<65){
            if((newPosition+9*j)%8 - newPosition%8 == 1 || (newPosition+9*j)%8 - newPosition%8 == -7){
                if(Math.floor((newPosition+9*j-1)/8) - Math.floor((newPosition-1)/8) == 1){
                    if(currentBoard[newPosition+9*j-1] == "k"){
                        kingCheck = true;
                    }
                }
            }
        }
        stop = false;
        for(let i=-7*j;i!=j*-56;i -= 7*j){
            if((newPosition+i)%8 == 1){
                stop = true;
            }
            if(stop == false){
                if(newPosition+i > 0){
                    if(currentBoard[newPosition+i-1] == "b" || currentBoard[newPosition+i-1] == "q"){
                        kingCheck = true;
                        stop = true;
                    }
                    else if(currentBoard[newPosition+i-1] != "x"){
                        stop = true;
                    }
                }
            }
        }
        stop = false;
        for(let i=9*j;i!=72*j;i += 9*j){
            if(newPosition+i > 0 && newPosition+i < 65){
                if(Math.floor((newPosition+i-1)/8)-Math.floor((newPosition+i-10)/8) == 1){
                    if(stop == false){
                        if(newPosition+i > 0){
                            if(currentBoard[newPosition+i-1] == "b" || currentBoard[newPosition+i-1] == "q"){
                                kingCheck = true;
                                stop = true;
                            }
                            else if(currentBoard[newPosition+i-1] != "x"){
                                stop = true;
                            }
                        }
                    }
                }
                else{
                    stop = true;
                }
            }
        }
        if(currentBoard[newPosition-6*j-1] == "n"){
            if((newPosition-6*j)%8 - newPosition%8 == -6 ||(newPosition-6*j)%8 - newPosition%8 == 2 ){
                if(Math.floor((newPosition-6*j-1)/8) - Math.floor((newPosition-1)/8) == -1*j){
                    kingCheck = true;
                }
            }
        }//knight
        if(currentBoard[newPosition-10*j-1] == "n"){
            if((newPosition-10*j)%8 - newPosition%8 == 6 ||(newPosition-10*j)%8 - newPosition%8 == -2 ){
                if(Math.floor((newPosition-10*j-1)/8) - Math.floor((newPosition-1)/8) == -1*j){
                    kingCheck = true;
                }
            }
        }//knight
        if(currentBoard[newPosition-15*j-1] == "n"){
            if((newPosition-15*j)%8 - newPosition%8 == -7 ||(newPosition-15*j)%8 - newPosition%8 == 1 ){
                if(Math.floor((newPosition-15*j-1)/8) - Math.floor((newPosition-1)/8) == -2*j){
                    kingCheck = true;
                }
            }
        }//knight
        if(currentBoard[newPosition-17*j-1] == "n"){
            if((newPosition-17*j)%8 - newPosition%8 == 7 ||(newPosition-17*j)%8 - newPosition%8 == -1 ){
                if(Math.floor((newPosition-17*j-1)/8) - Math.floor((newPosition-1)/8) == -2*j){
                    kingCheck = true;
                }
            }
        }//knight
    }//rook/queen/bishop
    for(let i=0;i>-3;i-=2){
        if(currentBoard[newPosition-7+i-1] == "p"){
            kingCheck = true;
        }//pawn
    } //pawn
}

function kingInCheckBlack(newPosition){
    kingCheck = false;
    for(let j=-1;j<2;j+=2){
        stop = false;
        for(let i=8*j;i!=64*j;i+=8*j){
            if (stop == false){
                if(i+newPosition > 0 && i+newPosition < 65){
                    if(currentBoard[i+newPosition-1] == "R" || currentBoard[i+newPosition-1] == "Q"){
                        kingCheck = true;
                        stop = true;
                    }
                    else if(currentBoard[newPosition+i-1] != "x"){
                        stop = true;
                    }
                }
            }
        }
        stop = false
        for(let i=-1*j;i!=-8*j;i -= 1*j){
            if(stop == false){
                if(Math.floor((newPosition+i-1)/8) == Math.floor((newPosition-1)/8)){
                    if(currentBoard[newPosition+i-1] == "R" || currentBoard[newPosition+i-1] == "Q"){
                        kingCheck = true;
                    }
                    else if(currentBoard[newPosition+i-1] != "x"){
                        stop = true;
                    }
                }
            }
        }
        if(newPosition+1*j<65){
            if((newPosition+1*j)%8 - newPosition%8 == 1 || (newPosition+1*j)%8 - newPosition%8 == -7){
                if(Math.floor((newPosition+1*j-1)/8) - Math.floor((newPosition-1)/8) == 0){
                    if(currentBoard[newPosition+1*j-1] == "K"){
                        kingCheck = true;
                    }
                }
            }
        }
        if(newPosition+7*j<65){
            if((newPosition+7*j)%8 - newPosition%8 == -1 || (newPosition+7*j)%8 - newPosition%8 == 7){
                if(Math.floor((newPosition+7*j-1)/8) - Math.floor((newPosition-1)/8) == 1*j){
                    if(currentBoard[newPosition+7*j-1] == "K"){
                        kingCheck = true;
                    }
                }
            }
        }
        if(newPosition+8*j<65){
            if((newPosition+8*j)%8 - newPosition%8 == 0){
                if(Math.floor((newPosition+8*j-1)/8) - Math.floor((newPosition-1)/8) == 1*j){
                    if(currentBoard[newPosition+8*j-1] == "K"){
                        kingCheck = true;
                    }
                }
            }
        }
        if(newPosition+9*j<65){
            if((newPosition+9*j)%8 - newPosition%8 == 1 || (newPosition+9*j)%8 - newPosition%8 == -7){
                if(Math.floor((newPosition+9*j-1)/8) - Math.floor((newPosition-1)/8) == 1){
                    if(currentBoard[newPosition+9*j-1] == "K"){
                        kingCheck = true;
                    }
                }
            }
        }
        stop = false;
        for(let i=-7*j;i!=j*-56;i -= 7*j){
            if((newPosition+i)%8 == 1){
                stop = true;
            }
            if(stop == false){
                if(newPosition+i > 0){
                    if(currentBoard[newPosition+i-1] == "B" || currentBoard[newPosition+i-1] == "Q"){
                        kingCheck = true;
                        stop = true;
                    }
                    else if(currentBoard[newPosition+i-1] != "x"){
                        stop = true;
                    }
                }
            }
        }
        stop = false;
        for(let i=9*j;i!=72*j;i += 9*j){
            if(newPosition+i > 0 && newPosition+i < 65){
                if(Math.floor((newPosition+i-1)/8)-Math.floor((newPosition+i-10)/8) == 1){
                    if(stop == false){
                        if(newPosition+i > 0){
                            if(currentBoard[newPosition+i-1] == "B" || currentBoard[newPosition+i-1] == "Q"){
                                kingCheck = true;
                                stop = true;
                            }
                            else if(currentBoard[newPosition+i-1] != "x"){
                                stop = true;
                            }
                        }
                    }
                }
                else{
                    stop = true;
                }
            }
        }
        if(currentBoard[newPosition-6*j-1] == "N"){
            if((newPosition-6*j)%8 - newPosition%8 == -6 ||(newPosition-6*j)%8 - newPosition%8 == 2 ){
                if(Math.floor((newPosition-6*j-1)/8) - Math.floor((newPosition-1)/8) == -1*j){
                    kingCheck = true;
                }
            }
        }//knight
        if(currentBoard[newPosition-10*j-1] == "N"){
            if((newPosition-10*j)%8 - newPosition%8 == 6 ||(newPosition-10*j)%8 - newPosition%8 == -2 ){
                if(Math.floor((newPosition-10*j-1)/8) - Math.floor((newPosition-1)/8) == -1*j){
                    kingCheck = true;
                }
            }
        }//knight
        if(currentBoard[newPosition-15*j-1] == "N"){
            if((newPosition-15*j)%8 - newPosition%8 == -7 ||(newPosition-15*j)%8 - newPosition%8 == 1 ){
                if(Math.floor((newPosition-15*j-1)/8) - Math.floor((newPosition-1)/8) == -2*j){
                    kingCheck = true;
                }
            }
        }//knight
        if(currentBoard[newPosition-17*j-1] == "N"){
            if((newPosition-17*j)%8 - newPosition%8 == 7 ||(newPosition-17*j)%8 - newPosition%8 == -1 ){
                if(Math.floor((newPosition-17*j-1)/8) - Math.floor((newPosition-1)/8) == -2*j){
                    kingCheck = true;
                }
            }
        }//knight
    }//rook/queen/bishop
    for(let i=0;i>-3;i-=2){
        if(currentBoard[newPosition+9+i-1] == "P"){
            kingCheck = true;
        }//pawn
    } //pawn
}

function arrayBoard(){
    for(let i=0;i<currentBoard.length;i++){
        let currentPiece = currentBoard[i];
        let currentColor = "w";
        if(currentPiece == currentPiece.toLowerCase()){
            currentColor = "b";
        }
        document.getElementById("img" + (i+1)).src = currentColor+ currentPiece.toLowerCase() +".png";
    }
}