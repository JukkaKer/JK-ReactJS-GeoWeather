import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(0);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState('male');

  const [alco, setAlco] = useState(0);

  function genderMult() {
    if(gender === "male") return 0.7;
    if(gender === "female") return 0.6;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const litres = bottles * 0.33;
    const grams = litres * 8 * 4.5;
    const burning = weight / 10;
    const gramsLeft = grams - (burning * time);

    let alco = gramsLeft / (weight * genderMult())

    setAlco(alco.toFixed(2));
  }
  

  return (
    <div>
      <h3>Calculation blood alcohol level</h3>
      <Form submit={handleSubmit} 
            weight={setWeight} 
            bottles={setBottles} 
            time={setTime}
            gender={setGender}/>
      <div>
        <p>{alco}</p>
      </div>
    </div>
  )
}

function Form(props) {

  return (
    <form onSubmit={props.submit}>
        <label for="weight">Weight</label>
        <input id="weight" type="number" onChange={e => props.weight(e.target.value)}/>
        <br />
        <label for="bottles">Bottles</label>
        <input id="bottles" type="number" onChange={e => props.bottles(e.target.value)}/>
        <br />

        <label for="time">Time</label>
        <input id="time" type="number" onChange={e => props.time(e.target.value)}/>
        <br />

        <label>Gender</label>
        <input id="male" type="radio" name="gender" value="male" onChange={e => props.gender(e.target.value)} checked/><label for="male">Male</label>
        <input id="female" type="radio" name="gender" value="female" onChange={e => props.gender(e.target.value)}/><label for="female">Female</label>

        <button>Calculate</button>
      </form>
  )
}