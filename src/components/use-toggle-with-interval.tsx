import React, { useEffect, useReducer, useState } from 'react';

enum ActionType {
    NEXT_STATE,
    RESET
}

interface Action {
    type: ActionType;
}

interface CurrentState<T> {
    state: T;
    stateIndex: number;
}

function reducerWith(states: any[]) {
    const numStates = states.length;

    return function reducer(
        currentState: CurrentState<any>,
        action: Action
    ): CurrentState<any> {
        console.log('numStates = ', numStates);
        switch (action.type) {
            case ActionType.NEXT_STATE:
                return {
                    state:
                        states[(currentState.stateIndex + 1) % states.length],
                    stateIndex: currentState.stateIndex + 1
                };

            case ActionType.RESET:
                return {
                    state: states[0],
                    stateIndex: 0
                };
            default:
                return currentState;
        }
    };
}

interface ReturnType<T> {
    toggle: (isOn: boolean) => void;
    currentState: T;
    isActive: boolean;
}

interface Props<T> {
    states: T[];
    toggleInterval: number; // in ms
}

export function useToggleWithInterval(props: Props<string>): ReturnType<any> {
    const [isActive, setIsActive] = useState(false);
    const [state, dispatch] = useReducer(reducerWith(props.states), {
        state: props.states[0],
        stateIndex: 0
    });
    const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | undefined>(
        undefined
    );

    const toggle = (isOn: boolean) => {
        if (!isOn) dispatch({ type: ActionType.RESET });
        setIsActive(isOn);
    };

    useEffect(() => {
        if (isActive) {
            const intervalRef = setInterval(() => {
                dispatch({ type: ActionType.NEXT_STATE });
            }, props.toggleInterval);
            setIntervalRef(intervalRef);
        } else {
            if (intervalRef !== undefined) clearInterval(intervalRef);
        }
    }, [isActive]);

    return {
        toggle,
        currentState: state,
        isActive
    };
}
