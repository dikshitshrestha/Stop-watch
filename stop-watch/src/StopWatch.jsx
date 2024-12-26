import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function StopWatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current);
            })
        }

        return()=>{
            if(intervalIdRef){
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            }
        }
    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setIsRunning(false);
        setElapsedTime(0);
    }

    function timeFormat(){
        let hour = Math.floor(elapsedTime/(1000*60*60));
        let minutes = Math.floor((elapsedTime/(1000*60))%60);
        let seconds = Math.floor((elapsedTime/1000)%60);
        let miliseconds = Math.floor((elapsedTime%1000)/10)

        hour = String(hour).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        miliseconds = String(miliseconds).padStart(2,"0");

        return`${minutes}:${seconds}:${miliseconds}`
    }
    return(
        <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
            <div className="bg-gray-800 h-1/4 w-1/4 text-center rounded-lg border-2 border-white">
            <h1 className="mt-1 text-xl text-white"><u>Stop Watch</u></h1>
            <div className="mt-2 text-5xl">
                {timeFormat()}
            </div>
            <div className="mt-5 flex justify-center items-center">
            <span className="bg-red-700 mr-6 h-12 w-12 flex items-center justify-center rounded-full border-white border-2 hover:bg-red-900">
            <button onClick={stop}><FontAwesomeIcon icon={faPause} className="text-4xl h-9"/></button>
            </span>
            <span className="bg-green-700 mr-6 h-12 w-12 flex items-center justify-center rounded-full border-white border-2 hover:bg-green-900">
            <button onClick={start}><FontAwesomeIcon icon={faPlay} className="text-4xl h-8"/></button>
            </span>
            <span className="bg-blue-700 h-12 w-12 flex items-center justify-center rounded-full border-white border-2 hover:bg-blue-900">
            <button onClick={reset}><FontAwesomeIcon icon={faRotateLeft} className="text-4xl h-8"/></button>
            </span>
            </div>
            </div>
        </div>
    )
}