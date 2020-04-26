import React from "react";

const PatientInfo = ({ patient, height }) => {
    return (
        <div className="flex flex-column shadow rounded-md font-mono" style={{ height: height }}>
            <h2 className="px-3 py-3 border-t border-gray-300 font-semibold shadow rounded-t-md text-gray-700">
                Patient Info
            </h2>
            {patient && 
            <ul className="text-blue-700 font-mono p-3 overflow-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
                
                <li>Name: {patient.name}</li>
                <li>Address: {patient.address}</li>
                <li>Note: {patient.note}</li>
                <li>Verify Date: {patient.verifyDate}</li>
            </ul>
}
        </div>
    );
};

export default PatientInfo;
