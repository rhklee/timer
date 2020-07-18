import React, { useEffect, useState } from 'react';
import './App.css';

interface Timer {
    seconds: number;
    minutes: number;
    hours: number;
}

function timerEnd(timer: Timer): boolean {
    return timer.seconds === 0 && timer.minutes === 0 && timer.hours === 0;
}

function defaultTimer(): Timer {
    return {
        seconds: 5,
        minutes: 0,
        hours: 0
    };
}

function padInt(int: number): string {
    if (int.toString().length === 2) return int.toString();
    else return `0${int.toString()}`;
}

function convertToSeconds(timerState: Timer): number {
    return (
        timerState.seconds +
        timerState.minutes * 60 +
        timerState.hours * 60 * 60
    );
}

function secondsToTimer(totalSeconds: number): Timer {
    const hours = Math.floor(totalSeconds / (60 * 60));

    const secondsWithoutHours = totalSeconds % (60 * 60);
    const minutes = Math.floor(secondsWithoutHours / 60);

    const seconds = totalSeconds % 60;
    return {
        hours,
        minutes,
        seconds
    };
}

function App() {
    const [timerState, setTimerState] = useState<Timer>(defaultTimer());
    const [intervalTimerRef, setIntervalTimerRef] = useState<
        NodeJS.Timeout | undefined
    >(undefined);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const updateTimerState = () => {
        setTimerState((prevState) => {
            const updatedTime = secondsToTimer(convertToSeconds(prevState) - 1);
            if (timerEnd(updatedTime)) {
                setIsTimerActive(false);
            }
            return updatedTime;
        });
    };

    useEffect(() => {
        if (isTimerActive) {
            document.title = 'Timer On';
            const intervalId = setInterval(updateTimerState, 1000);
            // @ts-ignore
            setIntervalTimerRef(intervalId);
        } else {
            document.title = 'Timer Stopped';
            if (intervalTimerRef !== undefined) clearInterval(intervalTimerRef);
        }
    }, [isTimerActive]);

    const timerText = (timerState: Timer): string => {
        return `${padInt(timerState.hours)}:${padInt(
            timerState.minutes
        )}:${padInt(timerState.seconds)}`;
    };
    
    const buttonText = (isTimerActive: boolean): string => {
        return isTimerActive ? 'Stop Timer' : 'Start Timer';
    };

    const toggleTimer = () => {
        setIsTimerActive(!isTimerActive);
    };

    return (
        <div className='App'>
            <h1>{timerText(timerState)}</h1>

            <button onClick={toggleTimer}>{buttonText(isTimerActive)}</button>
        </div>
    );
}

export default App;
