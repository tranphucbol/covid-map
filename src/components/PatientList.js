import React from "react";
import * as Scroll from "react-scroll";
import moment from "moment";

const Element = Scroll.Element;

const PatientList = ({ height, patients, onPatientMarkerClicked, date }) => {
    patients = patients ? patients : [];
    const dateMin = moment('08-12-2019', "DD-MM-YYYY")
        .valueOf(); 
    const dateMax = moment(date, "DD-MM-YYYY")
        .add(3600 * 24, "s")
        .valueOf();
    const orderedPatients = patients
        .filter((patient) => {
            const pDate = new Date(patient.verifyDate).getTime();
            return pDate >= dateMin && pDate < dateMax;
        })
        .sort((a, b) => b.verifyDate.localeCompare(a.verifyDate));
    return (
        <div
            className="flex flex-col shadow-lg rounded-md font-mono"
            style={{ height: height }}
        >
            <h2 className="px-3 py-3 border-t border-gray-300 font-semibold shadow-lg rounded-t-md text-gray-700">
                Patient List {date}
            </h2>
            <ul
                id="patient-list"
                className="covid-list text-blue-700 rounded-b-md overflow-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch"
            >
                {orderedPatients.map((patient, index) => (
                    <Element
                        key={index}
                        name={`[${patient.lat},${patient.lng}]`}
                    >
                        <li
                            className="px-3 py-2 border-t border-gray-300"
                            onClick={() => {
                                onPatientMarkerClicked(patient);
                            }}
                        >
                            Name: {patient.name}
                        </li>
                    </Element>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
