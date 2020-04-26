import React, { useState } from "react";
import { ReactComponent as Play } from "../play.svg";
import { ReactComponent as Pause } from "../pause.svg";
import moment from "moment";

const SeekBar = ({ startDate, onRangeSliderChanged }) => {
    startDate = startDate ? startDate : "08-12-2019";

    const format = "DD-MM-YYYY";
    const then = moment(startDate, format);
    const now = moment();
    const diffInDays = now.diff(then, "days");

    const [data, setData] = useState({value: 0, label: then.format(format)});
    const [play, setPlay] = useState(false);
    const [intervalId, setIntervalId] = useState();
    // var interval;


    const handleChangedRangeInput = (e) => {

        const newValue = Number(e.target.value);
        const newLabel = moment(startDate, format)
            .add(newValue, "days")
            .format(format);
        setData({value: newValue, label: newLabel})
        onRangeSliderChanged(newLabel);
    };

    const handleClickedPlay = (e) => {
        const newPlay = !play;
        setPlay(newPlay);
        if(newPlay) {
            const interval = setInterval(() => {
                setData((data) => {
                    const newValue = data.value + 1;
                    if(newValue >= diffInDays - 1) clearInterval(interval)
                    const newLabel = moment(startDate, format)
                        .add(newValue, "days")
                        .format(format);
                    onRangeSliderChanged(newLabel);
                    return {value: newValue, label: newLabel};
                })
            }, 500);
            setIntervalId(interval);
        } else {
            clearInterval(intervalId);
        }
    };

    const button = !play ? (
        <Play className="svg-button mr-2" width="25" onClick={handleClickedPlay} />
    ) : (
        <Pause className="svg-button mr-2" width="25" onClick={handleClickedPlay} />
    );

    return (
        <div className="shadow rounded-md p-3">
            <h2 className="text-blue-700 font-mono mb-2 text-lg">
                Date: {data.label}
            </h2>
            <div className="flex flex-row items-center">
                {button}
                <input
                    type="range"
                    min="0"
                    max={diffInDays - 1}
                    value={data.value}
                    onChange={handleChangedRangeInput}
                    className="slider"
                />
            </div>
        </div>
    );
};

export default SeekBar;
