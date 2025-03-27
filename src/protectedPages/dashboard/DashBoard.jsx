import {useState, useEffect} from'react';

function DashBoard() {
  let[countervisible,setCounterVisible]=useState(true);

  useEffect(function(){setInterval(()=>setCounterVisible(c=>!c),5000)},[]);
  
  return <div>
  <h1>
    <b>Counter</b>
    </h1> 
    {countervisible?<Counter></Counter>:null}
    <Clock></Clock>
    </div>
}
function Counter(){
          const[count,setCount] = useState(0);

          console.log("Counter");

  function increasecount(){
      
      setCount(count+1);
  }

  function decreasecount(){
        setCount(count-1);
  }
  return <div>
    <h1 id="text">{count}</h1>
    <button onClick={increasecount}>Increase count</button><br></br><br></br>
    <button onClick={decreasecount}>Decrease count</button><br></br><br></br>
    <button onClick={()=>setCount(0)}>Reset</button>
  </div>
}

function Clock(){

  const [timer,setCount] = useState(0);

  useEffect(function(){
    setInterval(function(){
      setCount(timer =>timer+1);
    },1000)},
    []);

  return<div>
    <h1>
      <b>
        {timer}
      </b>
    </h1>
  </div>
}

export default DashBoard
