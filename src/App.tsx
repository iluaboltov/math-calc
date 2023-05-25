import React, {useState} from 'react';
import './App.css';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const nerdamer = require('nerdamer/all.min')
const App = () => {
    const [isOpenModal, setIsOpen] = useState(false)
    const [textContext, setContext] = useState('')
    const triggerModal = () =>{
        setIsOpen(!isOpenModal)
        return;
    }
    const Modal = ({textContext}: {textContext: string}) => {
        return(
            <div className={'modal'}>
                <div className="modalContent">
                    <div>Your result is:</div>
                    <div id="mathContent">
                        <InlineMath math={textContext}/>
                    </div>
                    <div onClick={triggerModal} className={'closeButton'}>X</div>
                </div>
            </div>
        )
    }
    const calculate = () =>{
        if(textContext !== ''){
            setContext('')
        }
        let x = (document.getElementById('symb') as HTMLInputElement).value[1] || (document.getElementById('symb') as HTMLInputElement).value[0] || "x";
        let expression = (document.getElementById('exp') as HTMLInputElement).value;
        if (x !== null && expression !== null){
            console.log(x)
            let res = nerdamer.integrate(expression, x)
            setContext(res.toString())
            triggerModal()
        }
    }
    return (
        <div className="App">
            <div className={'content'}>
                <span className={'symbol'}>&#8747;</span>
                <input id={'exp'} type="text" className={'expression'} placeholder={'x^2 + 2x + 1'}/>
                <input id={'symb'} type="text" className={'variable'} placeholder={'dx'} maxLength={2}/>
                <button className={'button'} onClick={calculate}>Solve</button>
            </div>
            {isOpenModal && <Modal textContext={textContext}/>}
        </div>
  );
}

export default App;
