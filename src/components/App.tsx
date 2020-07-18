import React from 'react';
import './App.css';
import { useTimer } from './timer';

interface Timer {
    seconds: number;
    minutes: number;
    hours: number;
}

function padInt(int: number): string {
    if (int.toString().length === 2) return int.toString();
    else return `0${int.toString()}`;
}

function App() {
    const { timerState, isTimerActive, toggleTimer } = useTimer();

    const timerText = (timerState: Timer): string => {
        return `${padInt(timerState.hours)}:${padInt(
            timerState.minutes
        )}:${padInt(timerState.seconds)}`;
    };

    const buttonText = (isTimerActive: boolean): string => {
        return isTimerActive ? 'Stop Timer' : 'Start Timer';
    };

    return (
        <div className='App'>
            <h1>{timerText(timerState)}</h1>

            <button onClick={toggleTimer}>{buttonText(isTimerActive)}</button>
        </div>
    );
}

export default App;
