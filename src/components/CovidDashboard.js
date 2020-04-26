import React, { useEffect, useState } from "react";
import PatientInfo from "./PatientInfo";
import CovidMap from "./CovidMap";
import PatientList from "./PatientList";
import SeekBar from "./SeekBar";

const CovidDashboard = (props) => {
    const startDate = "08-12-2019";
    const [date, setDate] = useState(startDate);
    const [currentPatient, setCurrentPatient] = useState();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list", {
            headers: {
                'Origin': 'localhost'
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setPatients(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            );
    }, []);

    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
    };

    const rangeSilderChangedHandler = (newDate) => {
        setDate(newDate);
    }

    return (
        <div className="container mx-auto">
            <div className="w-full">
                <h2 className="font-mono text-center text-3xl my-3 text-gray-700">
                    COVID MAP
                </h2>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-9">
                        <CovidMap
                            date={date}
                            currentPatient={currentPatient}
                            patients={patients}
                            onPatientMarkerClicked={patientMarkerClickedHandler}
                        />
                    </div>
                    <div className="col-span-3" style={{ height: 600 }}>
                        <div className="grid grid-rows-2 grid-flow-col gap-4">
                            <PatientList
                                date={date}
                                height={292}
                                patients={patients}
                                onPatientMarkerClicked={
                                    patientMarkerClickedHandler
                                }
                            />
                            <div>
                                <PatientInfo
                                    height={292}
                                    patient={currentPatient}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <SeekBar onRangeSliderChanged={rangeSilderChangedHandler} />
                </div>
            </div>
        </div>
    );
};

export default CovidDashboard;
