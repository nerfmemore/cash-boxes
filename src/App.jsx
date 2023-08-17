import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [cashBoxes, setCashBox] = useState([[10],[0],[10, 7]])
  const [newNumber, setNewNumber] = useState();
  const ref = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      const copy = Object.assign([], cashBoxes);
      copy.forEach((item) => {
        if (item[0] <= 1){
          item.shift();
        } else if (item.length != 0) {
          return item[0] = item[0] - 1;}
      })
      setCashBox(copy);}, 1000)

    return () => clearInterval(timer);
  }, [cashBoxes])

  function addBuyerToQueue(){
    const copy = Object.assign([], cashBoxes);
    const sumsOfArrays = [];

    copy.forEach((item) => {
      const result = item.reduce((sum, current) => sum + current, 0);
      sumsOfArrays.push(result);
    })

    let min = sumsOfArrays[0];
    let minIndex = 0;
    for (let i = 1; i < sumsOfArrays.length; ++i){
      if(sumsOfArrays[i] < min) {
        min = sumsOfArrays[i];
        minIndex = i;
    }}

    ref.current.value = '';
    copy[minIndex].push(newNumber);
    setCashBox(copy);
  }

  function addNewNumber(event){
    setNewNumber(Number(event.target.value));
  }

  return (
    <main>
        <input name='number' type='number' onChange={addNewNumber} ref={ref}></input>
        <button onClick={addBuyerToQueue}>Check</button>
      <CashBoxes cashBoxes={cashBoxes}></CashBoxes>
    </main>
  )
}


function CashBoxes(props){
  const cashBoxes = props.cashBoxes;
  const allQueues = cashBoxes.map((queue, index) => {
    const buyers = queue.map((item, index) => {
      return <div className='buyer' key={index}>{item}</div>
    })
    return (<div className='queue' key={index}>
    <div className='cashbox' key={index}>{index + 1}</div>
    {buyers}
    </div>);
  })
  return (<div className='allqueues'>{allQueues}</div>)
}
console.clear = () => {}
export default App