import { useEffect, useState } from 'react';

export interface Timer {
    seconds: number;
    minutes: number;
    hours: number;
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

interface ReturnType {
    timerState: Timer;
    setTimerState: (newTimerState: Timer) => void;
    isTimerActive: boolean;
    isEndState: boolean;
    toggleTimer: () => void;
}

export function useTimer(): ReturnType {
    const [timerState, setTimerState] = useState<Timer>(defaultTimer());
    const [intervalTimerRef, setIntervalTimerRef] = useState<
        NodeJS.Timeout | undefined
    >(undefined);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isEndState, setIsEndState] = useState(false);

    const updateTimerState = () => {
        setTimerState((prevState) => {
            const updatedTime = secondsToTimer(convertToSeconds(prevState) - 1);
            if (timerEnd(updatedTime)) {
                setIsTimerActive(false);
                setIsEndState(true);
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
            setIsEndState(false);
        } else {
            document.title = 'Timer Stopped';
            if (intervalTimerRef !== undefined) clearInterval(intervalTimerRef);
        }
    }, [isTimerActive]);

    const toggleTimer = () => {
        if (!timerEnd(timerState)) setIsTimerActive(!isTimerActive);
    };

    return {
        timerState,
        setTimerState,
        isTimerActive,
        isEndState,
        toggleTimer
    };
}
