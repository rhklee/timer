import React, { ChangeEvent } from 'react';
import './App.css';
import { Timer, useTimer } from './timer';

function padInt(int: number): string {
    if (int.toString().length === 2) return int.toString();
    else return `0${int.toString()}`;
}

function App() {
    const {
        timerState,
        setTimerState,
        isTimerActive,
        toggleTimer
    } = useTimer();

    const timerText = (timerState: Timer): string => {
        return `${padInt(timerState.hours)}:${padInt(
            timerState.minutes
        )}:${padInt(timerState.seconds)}`;
    };

    const buttonText = (isTimerActive: boolean): string => {
        return isTimerActive ? 'Stop Timer' : 'Start Timer';
    };

    const handleTimerChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (
            !Number.isInteger(e.target.valueAsNumber) ||
            e.target.valueAsNumber < 0
        ) {
            return;
        }

        switch (e.target.name) {
            case 'hours':
                setTimerState({
                    ...timerState,
                    hours: e.target.valueAsNumber
                });
                return;
            case 'minutes':
                setTimerState({
                    ...timerState,
                    minutes: e.target.valueAsNumber
                });
                return;
            case 'seconds':
                setTimerState({
                    ...timerState,
                    seconds: e.target.valueAsNumber
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className='App'>
            <div className={'tm_rows'}>
                <h1>{timerText(timerState)}</h1>
            </div>

            {!isTimerActive && (
                <div className={'tm_rows'}>
                    Time to Countdown:
                    <input
                        type='number'
                        name='hours'
                        value={timerState.hours}
                        onChange={handleTimerChange}
                    />
                    <input
                        type='number'
                        name='minutes'
                        value={timerState.minutes}
                        onChange={handleTimerChange}
                    />
                    <input
                        type='number'
                        name='seconds'
                        value={timerState.seconds}
                        onChange={handleTimerChange}
                    />
                </div>
            )}

            <div className={'tm_rows'}>
                <button onClick={toggleTimer}>
                    {buttonText(isTimerActive)}
                </button>
            </div>
        </div>
    );
}

export default App;
