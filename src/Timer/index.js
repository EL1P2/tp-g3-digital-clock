import { useState} from 'react';
import { useFormik } from "formik";
import { Link } from "react-router-dom";
// import BtnComponent from '../ButtonComponent/ButtonCmpt';
import './styles.css';

const Timer = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState({s:date.getSeconds(), m:date.getMinutes(), h:date.getHours()});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    // Not started = 0
    // started = 1
    // stopped = 2

    const start = () => {
      run();
      setStatus(1);
      setInterv(setInterval(run, 1000));
    };

    var updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
      if(updatedM === 0){
        updatedH--;
        updatedM = 60;
      }
      if(updatedS === 0){
        updatedM--;
        updatedS = 60;
      }
      updatedS--;
      return setTime({s:updatedS, m:updatedM, h:updatedH});
    };

    const stop = () => {
      clearInterval(interv);
      setStatus(2);
    };

    const reset = () => {
      clearInterval(interv);
      setStatus(0);
      setTime({s:date.getSeconds(), m:date.getMinutes(), h:date.getHours()})
    };

    const resume = () => start();


    return (
      <div className="main-section">
          <DisplayComponent time={time}/>
         <div className="clock-holder">
              <div className="timer">
                   <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
              </div>
         </div>
      </div>
    );
};


function BtnComponent(props) {
  return (
    <div>
      {(props.status === 0)? 
        <div>
          <button className="timer-btn timer-btn-gre"
                  onClick={props.start}>Start</button> 
          <Link to="/Clock">
                  <button className="timer-btn timer-btn-yel">Cancel</button>
          </Link>
        </div> : ""
      }

      {(props.status === 1)? 
        <div>
          <button className="timer-btn timer-btn-red"
                  onClick={props.stop}>Stop</button>
          <button className="timer-btn timer-btn-yel"
                  onClick={props.reset}>Reset</button>
          <Link to="/Clock">
                  <button className="timer-btn timer-btn-yel">Cancel</button>
          </Link>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="timer-btn timer-btn-gre"
                  onClick={props.resume}>Resume</button>
          <button className="timer-btn timer-btn-yel"
                  onClick={props.reset}>Reset</button>
          <Link to="/Clock">
                  <button className="timer-btn timer-btn-yel">Cancel</button>
          </Link>

        </div> : ""
      }
     
    </div>
  );
}

function DisplayComponent(props) {
  return (
    <div className="test">
      <p className="timer-input-component">
          <input className= "timer-input-change" type="text" name="name" pattern="[^a-zA-Z]+" required minlength="0" maxlength="2" />:
          <input className= "timer-input-change" type="int" name="name" value={(props.time.m >= 10)? props.time.m : "0"+ props.time.m} id="name"/>:
          <input className= "timer-input-change" type="int" name="name" value={(props.time.s >= 10)? props.time.s : "0"+ props.time.s} id="name"/>
      </p>
    </div>
  );
}

function _DisplayComponent(props) {
  const h = () => {
     if(props.time.h === 0){
       return '';
     }else {
       return <span>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</span>;
     }
  }
  return (
    <div className="timer-component">
       {h()}&nbsp;:&nbsp;
       <span>{(props.time.m >= 10)? props.time.m : "0"+ props.time.m}</span>&nbsp;:&nbsp;
       <span>{(props.time.s >= 10)? props.time.s : "0"+ props.time.s}</span>
    </div>
  );
}

function handleChangeSecond(event){
  console.log(event.target.value);
}


export default Timer;