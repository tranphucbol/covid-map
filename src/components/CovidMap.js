import React from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import * as Scroll from 'react-scroll';
import moment from 'moment';

const scroller = Scroll.scroller;

const CovidMap = ({date, patients, currentPatient, onPatientMarkerClicked}) => {
    patients = patients ? patients : [];
    let center = currentPatient ? [currentPatient.lat, currentPatient.lng] : [10.762887, 106.6800684];
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
        <Map
            className="rounded-md border-gray-600 shadow"
            animate={true}
            center={center}
            zoom={4}
            style={{height: 600}}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
            />
            {orderedPatients.map((patient,index) => (
                <Marker
                    key={index}
                    position={[patient.lat, patient.lng]}
                    onClick={() => {
                        onPatientMarkerClicked(patient);
                        scroller.scrollTo(`[${patient.lat},${patient.lng}]`, {
                            containerId: "patient-list",
                            smooth: true,
                        });
                    }}
                >
                    <Popup>
                        <ul>
                            <li>Name: {patient.name}</li>
                            <li>Address: {patient.address}</li>
                            <li>Note: {patient.note}</li>
                            <li>Verify date: {patient.verifyDate}</li>
                        </ul>
                    </Popup>
                </Marker>
            ))}
        </Map>
    );
};

export default CovidMap;
