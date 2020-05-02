import React, { useEffect, useState } from "react";
import PatientInfo from "./PatientInfo";
import CovidMap from "./CovidMap";
import PatientList from "./PatientList";
import SeekBar from "./SeekBar";
import moment from "moment"

const CovidDashboard = (props) => {
    const now = moment();
    const [date, setDate] = useState(now.format("DD-MM-YYYY"));
    const [currentPatient, setCurrentPatient] = useState();
    const [patients, setPatients] = useState([]);
    
    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then((res) => res.json())
            .then(
                (result) => {
                    const ordered = result.data.sort((a, b) => b.verifyDate.localeCompare(a.verifyDate));
                    setPatients(ordered);
                    setCurrentPatient(ordered[0])
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
        <div className="container">
            <div className="w-full">
                <div className="grid grid-cols-6 lg:grid-cols-12 gap-4">
                    <div className="col-span-6 lg:col-span-9">
                        <CovidMap
                            date={date}
                            currentPatient={currentPatient}
                            patients={patients}
                            onPatientMarkerClicked={patientMarkerClickedHandler}
                        />
                    </div>
                    <div className="col-span-6 lg:col-span-3">
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="lg:col-span-2">
                                <PatientList
                                    date={date}
                                    height={292}
                                    patients={patients}
                                    onPatientMarkerClicked={
                                        patientMarkerClickedHandler
                                    }
                                />
                            </div>
                            <div className="lg:col-span-2">
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
