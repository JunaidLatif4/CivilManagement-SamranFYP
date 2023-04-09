import React from 'react'

// Chart.Js : 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";

// CSS :
import "./SalesChart.scss"






// Registring Chart :
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const SalesChart = () => {

    let data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "# of Votes",
            data: [0, 200, 250, 200, 700, 550, 650, 1050, 950, 1100, 900, 1200],
            borderWidth: 2,
            // borderColor: "#2D5F72",
            borderColor: "#FCD117",
            backgroundColor: "transparent",
            pointBorderColor: "transparent",
            tension: 0.4
        }, {
            label: "# of Votes",
            data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
            borderWidth: 2,
            borderDash: [2, 2],
            // borderColor: "#B5BFCE",
            borderColor: "#00A859",
            backgroundColor: "transparent",
            pointBorderColor: "transparent",
            tension: 0.4
        }]
    }

    let options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12
                    },
                    // color: "#2D5F72"
                    color: "#006400"
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 12
                    },
                    color: "#006400",
                    callback: function callback(value, index, values) {
                        return "$" + value;
                    }
                },
                grid: {
                    color: "#B5BFCE",
                    drawBorder: true
                },
                border: {
                    dash: [2, 2]
                }
            }
        }
    }

    return (
        <>
            <div className="saleschartContainer">
                <div className="chart">
                    <Line options={options} data={data} />
                </div>
            </div>
        </>
    )
}

export default SalesChart