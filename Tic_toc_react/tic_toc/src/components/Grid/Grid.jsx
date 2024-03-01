import { useState } from "react";
import Card from '../Card/Card'
import './Grid.css'
import isWinner  from "../../helpers/checkWinner";
function Grid({numberOfCards})
{
const [board,setBoard]=useState(Array(numberOfCards).fill(""));
const [turn,setTurn]=useState(true);
const [winner,setwinner]=useState(null); 

function play(index){
    if(turn == true){
        board[index] = 'O';
    }else{
        board[index] = 'X';
    }
    const win=isWinner(board,turn?'O':'X');
    // console.log( `winner :- ${win}`)
    if(win){
        setwinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
}

function reset(){
    setTurn(true);
    setwinner(null);
    setBoard(Array(numberOfCards).fill(""));
}

return (

    <div className="grid-wrapper">
        {
            
            winner &&
            <>
            <h1 className="turn-highlight">Winner is {winner}</h1>
            <button className="reset" onClick={reset}> Reset Game</button>
            </>
        }
        <h1 className="turn-highlight">Current turn : {(turn)?'O':'X'}</h1>
        <button className="reset" onClick={reset}> Start new game </button>
    <div className="grid">
     { /**<Card key={idx} />: This JSX element renders a <Card> component. The key prop is set to idx, which is the index of the current element in the board array. The key prop is used by React to efficiently update the component when the array changes. */}  
          { board.map((el,idx) => <Card gameEnd={ winner ? true : false} key={idx} onplay={play} player={el} index={idx}/> )}
    </div>
    </div>
)
}
export default Grid