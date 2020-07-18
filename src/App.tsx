import React, { useEffect, useState } from 'react';
import './App.css';

function now(): number {
    return new Date().getTime();
}

function App() {
    const [currentTime, setCurrentTime] = useState(now());

    const updateViewTime = () => {
        setCurrentTime(now());
    };

    useEffect(() => {
        const intervalTimer = setInterval(updateViewTime, 1000);

        return () => {
            clearInterval(intervalTimer);
        };
    }, []);

    return (
        <div className='App'>
            <head></head>
            <body>
                <div>
                    <h1>{currentTime}</h1>
                </div>
            </body>
        </div>
    );
}

export default App;
