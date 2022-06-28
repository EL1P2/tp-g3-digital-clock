import { useState, useEffect} from 'react';
import { useFormik,useFormikContext } from "formik";
import { Link } from "react-router-dom";
import './styles.css';

const Timer = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState({s:date.getSeconds(), m:date.getMinutes(), h:date.getHours()});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    // Not started = 0
    // started = 1
    // stopped = 2

    // HOOK useFormik
    const formik = useFormik({
        initialValues: {
          seconds: time.s,
          minutes: time.m,
          hours: time.h,
        },
        onSubmit: (values) => {
          console.log(values);
        }
    });

    const initialization = () => {
      formik.initialValues["seconds"]=parseInt(formik.values.seconds);
      formik.initialValues["minutes"]=formik.values.minutes;
      formik.initialValues["hours"]=formik.values.hours;
    };

    const start = () => {
      initialization();
      run();
      setStatus(1);
      setInterv(setInterval(run, 1000));
    };

    var updatedS = parseInt(formik.values.seconds), updatedM = formik.values.minutes, updatedH = formik.values.hours;

    const run = () => {
      if(updatedM === 0 && updatedH!==0){
        updatedH--;
        updatedM = 60;
      }
      if(updatedS === 0 && updatedM!==0){
        updatedM--;
        updatedS = 60;
      }

      if(updatedM === 0 && updatedS === 0 && updatedH === 0){
        stop();
        clearInterval(interv);
        alert("Time Up");
        return true;
      }

      updatedS--;

      formik.initialValues["seconds"]=updatedS;
      formik.initialValues["minutes"]=updatedM;
      formik.initialValues["hours"]=updatedH;

      console.log(formik.values.seconds,formik.values.minutes,formik.values.hours);
      console.log(formik.values.seconds);

      return setTime({s:updatedS, m:updatedM, h:updatedH});
    };

    const stop = () => {
      clearInterval(interv);
      setStatus(2);
    };

    const reset = () => {
      clearInterval(interv);
      setStatus(0);

      formik.initialValues["seconds"]=date.getSeconds();
      formik.initialValues["minutes"]=date.getMinutes();
      formik.initialValues["hours"]=date.getHours();
      setTime({s:date.getSeconds(), m:date.getMinutes(), h:date.getHours()})

    };

    const resume = () => start();

    return (
      <div className="main-section">
          <div className="test">
            <p className="timer-input-component">
                <input onSubmit={formik.handleSubmit} onChange={formik.handleChange} className= "timer-input-change" type="text" name="hours" value= {(formik.values.hours >= 10)? formik.values.hours : "0"+ formik.values.hours} id="hours"/>:
                <input onSubmit={formik.handleSubmit} onChange={formik.handleChange} className= "timer-input-change" type="text" name="minutes" value= {(formik.values.minutes >= 10)? formik.values.minutes : "0"+ formik.values.minutes} id="minutes"/>:
                <input onSubmit={formik.handleSubmit} onChange={formik.handleChange} className= "timer-input-change" type="text" name="seconds" value= {(formik.values.seconds >= 10)? formik.values.seconds : "0"+ formik.values.seconds} id="seconds"/>
            </p>
          </div>
          {/*<DisplayComponent time={time}/>*/}
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
          <button type = "submit" className="timer-btn timer-btn-gre"
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

export default Timer;