import './App.css';
import React,{ useEffect, useState } from 'react';

//Assets
import './Data/css/flag-icons.css'
import nation from './Data/nation'

function App() {
  const [country, setCountry] = useState([]);
  const [flagOfCountry, setFlagOfCountry] = useState("");
  const [score, setScore] = useState({"Total-Score":0,"Correct-Answers":0,"Incorrect-Answers":0})
  const [showAnswer, setShowAnswer] = useState(false)
  const [selected, setSelected] = useState({})


  const generateRandomNations = () =>{
    let countryOptions = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = (Math.floor(Math.random() * nation.length));
      countryOptions.push(nation[randomNumber])
    }
    setCountry(countryOptions);
    let correctAnswer = (Math.floor(Math.random() * 4))
    setFlagOfCountry(countryOptions[correctAnswer])
  }
  useEffect(()=>{
    generateRandomNations();
    // eslint-disable-next-line
  },[])

  const nextQuestion = ()=>{
    generateRandomNations();
  }

  const checkAnswer = (country) =>{
    setSelected(country)
    if(country.name === flagOfCountry.name){
      setScore({...score,"Correct-Answers":score['Correct-Answers']+1,"Total-Score":score['Total-Score']+1});
    }else{
      setScore({...score,"Incorrect-Answers":score['Incorrect-Answers']+1,"Total-Score":score['Total-Score']+1});
    }
    setShowAnswer(true)
    setTimeout(() => {
      setShowAnswer(false)
      nextQuestion();
    }, 2000);
  }
  return (
    <>
      <div className="container">
        <div className="gameContainer">
          <div className="textCenter">
          <h1 className='textCenter gameTitle'><span>Game of Flags</span></h1>
            {flagOfCountry && <span className={`fi fi-${(flagOfCountry["alpha-2"]).toLowerCase()}`}></span>} 
            <div>
              <h3>Guess the country?</h3>
              {country.map(item=> <button className='btn' key={item.name} onClick={(e)=>checkAnswer(item)}>{item.name}</button>)}
            </div>
          </div>
        </div>
        <div className="scoreContainer">
          <div className="scoreBox">
            <h2>Stats:</h2>
            <h2>Total Questions Attempted : {score['Total-Score']}</h2>
            <h2>Total Correct Answers: {score['Correct-Answers']}</h2>
            <h2>Total Incorrect Answers: {score['Incorrect-Answers']}</h2>
          </div>
          <div className="answerContainer">
            {showAnswer?<h2 className={flagOfCountry.name === selected.name?'correct':'incorrect'}>The Correct Option was : {flagOfCountry.name}</h2> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
