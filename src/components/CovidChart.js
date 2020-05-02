import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2'

const CovidChart = () => {
    const initState = {labels: [], datasets: []}
    const [dataVN, setDataVN] = useState(initState);
    const [dataGb, setDataGb] = useState(initState);
    const optionsVN = {
        elements: {
            point: {
                radius: 0
            }
        },
        title: {
            display: true,
            text: "VietNam",
            fontSize: 16
        }
    };
    const optionsGb = {
        elements: {
            point: {
                radius: 0
            }
        },
        title: {
            display: true,
            text: "Global",
            fontSize: 16
        }
    }
    useEffect( () => {
        const fetchData = async (url, setData) => {
            const result = await (await fetch(url)).json()
            const labels = Object.keys(result);
            const datasets = [{
                label: "Infected Cases",
                data: [],
                backgroundColor: "#F86384",
                borderColor: "#F86384",
                fill: false
            }, {
                label: "Suspected Cases",
                data: [],
                backgroundColor: "#F89F41",
                borderColor: "#F89F41",
                fill: false
            }, {
                label: "Recovery Cases",
                data: [],
                backgroundColor: "#FACD56",
                borderColor: "#FACD56",
                fill: false
            }]
            Object.keys(result).forEach(date => {
                result[date].forEach((c, i) => datasets[i].data.push(c))
            })
            setData({labels, datasets})
        }
        fetchData("https://td.fpt.ai/corona/corona-chart-vn.json", setDataVN);
        fetchData("https://td.fpt.ai/corona/corona-total.json", setDataGb)
    }, [])
    return (
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Line data={dataVN} options={optionsVN} />
                </div>
                <div className="col-span-1">
                    <Line data={dataGb} options={optionsGb} />
                </div> 
            </div>
        </div>
    )
}

export default CovidChart;