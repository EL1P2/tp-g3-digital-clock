import { useState, useEffect } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import BtnComponent from '../ButtonComponent/ButtonCmpt';

export default function Clock() {
  const [date, setDate] = useState(new Date());
  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });
  
  return (
  <div className="clock-container">
    <div className ="timer-container">
      <Link to="/Timer">
        <BtnComponent btn_component="Timer" class_name="timer-btn"/>
      </Link>
    </div>
    <div className ="clock-move">
      <p className="clock">
        <span>{date.getHours().toString().padStart(2, '0')}</span>:
        <span>{date.getMinutes().toString().padStart(2, '0')}</span>:
        <span>{date.getSeconds().toString().padStart(2, '0')}</span>
      </p>
    </div>
  </div>
  )
}