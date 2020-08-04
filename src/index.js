import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const Bord = () => {
  const initialSqures = Array(9).fill(null); 
const [squares, setSqures] =  useState(initialSqures);
const [xIsNext, setXISNext]= useState(true);
const handleClickEvent= (i) =>{
 //make a copy of squares state array
  const newSqures= [...squares];

  const winnerDeclared = Boolean (calculateWinner(newSqures));
  const squareFilled= Boolean(newSqures[i]);
  if(winnerDeclared || squareFilled)
  {
    return ;
  }
  //mutatte the copy
  newSqures[i]=xIsNext ? 'x' :'O';
  //call the setSquare function with
  setSqures(newSqures);
  setXISNext(!xIsNext);
};
  const renderSqure = (i) =>{
    return(
      <Square value={squares[i]}
      onClickEvent={()=> handleClickEvent(i)}
      />
    );
  };
  const winner = calculateWinner(squares);

  const status = winner ? 
  `winner: ${winner}` :
  `Next Player : ${ xIsNext ? 'X' : 'O'}`;
  return(
    <div >
      <div className="status">{status}</div>
      <div className="bord-row">
         {renderSqure(0)}{renderSqure(1)}{renderSqure(2)}
       </div>
      <div className="bord-row">
        {renderSqure(3)}{renderSqure(4)}{renderSqure(5)}
      </div>
      <div className="bord-row">
        {renderSqure(6)}{renderSqure(7)}{renderSqure(8)}
      </div>
    </div>
  )
};

const Square = (props) => {
 const [value,setValue] = useState(null);


  return(
    <button class="squre"
     onClick ={props.onClickEvent}
    >
      {props.value}
    </button>
  )
};

const Game = () => {
  return (
    <div className = "game">
      Tik - Tak - To
      <Bord/>
      
       <button className="new-game" onClick={refreshPage}>New Game</button>
     </div>
  );
};

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

function refreshPage() {
  window.location.reload(false);
}

function calculateWinner(squares){
  const lines=[
     [0,1,2], [3,4,5], [6,7,8],
     [0,3,6], [1,4,7], [2,5,8],
     [0,4,8], [2,4,6],
  ];

  for (let line of lines){
    const [a,b,c]=line;

    if(squares[a] && squares [a] === squares[b] && squares[a] ===squares[c] ){
      return squares[a];
    }
  }
  return null;
}