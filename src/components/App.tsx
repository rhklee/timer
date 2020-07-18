import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import { Timer, useTimer } from './use-timer';
import {useToggleWithInterval} from "./use-toggle-with-interval";

function padInt(int: number): string {
    if (int.toString().length === 2) return int.toString();
    else return `0${int.toString()}`;
}

function App() {
    const {
        timerState,
        setTimerState,
        isTimerActive,
        isEndState,
        toggleTimer
    } = useTimer();

    const {
        toggle,
        currentState,
        isActive: togglerIsActive
    } = useToggleWithInterval({states: [
        'App',
            'App tm_background_color_red',
            'App tm_background_color_orange',
            'App tm_background_color_yellow',
            'App tm_background_color_green',
            'App tm_background_color_blue',
            'App tm_background_color_purple'
        ], toggleInterval: 750})

    useEffect(() => {
        toggle(isEndState)
    }, [isEndState])

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

    const appClassName = currentState.state;

    return (
        <div className={appClassName}>
            {/*endstate: {isEndState.toString()}*/}
            {/*{JSON.stringify(currentState)}*/}
            {' '}

            <div>
                <h1 className={'tm_time_text'}>{timerText(timerState)}</h1>
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
                {togglerIsActive && (
                <button onClick={() => { toggle(false) }}>
                    Stop flashing
                </button>
                )}
            </div>
        </div>
    );
}

export default App;
