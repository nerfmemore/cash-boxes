import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [cashBoxes, setCashBox] = useState([[10],[0],[10, 7]])
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const copy = Object.assign([], cashBoxes);
      copy.forEach((item) => {
        if (item[0] <= 1){
          item.shift();
        } else if (item.length != 0) {
          return item[0] = item[0] - 1;}
      })
      setCashBox(c => c = copy);}, 1000)
    
    return () => clearInterval(timer);
  }, [])

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

  function addBuyerToQueue(){
    const copy = Object.assign([], cashBoxes);
    const sumsOfArrays = copy.map((item) => item.reduce((sum, current) => sum + current, 0));

    let min = sumsOfArrays[0];
    let minIndex = 0;
    for (let i = 1; i < sumsOfArrays.length; ++i){
      if(sumsOfArrays[i] < min) {
        min = sumsOfArrays[i];
        minIndex = i;
    }}

    setNewNumber('');
    copy[minIndex].push(newNumber);
    setCashBox(copy);
  }

  return (
    <main>
        <input name='number' type='number' value={newNumber} onChange={e => setNewNumber(Number(e.target.value))}></input>
        <button onClick={addBuyerToQueue}>Check</button>
      <CashBoxes cashBoxes={cashBoxes}></CashBoxes>
    </main>
  )
}

export default App