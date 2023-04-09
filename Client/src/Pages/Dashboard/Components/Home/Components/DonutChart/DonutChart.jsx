import React from 'react'

// Chart.Js : 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from "react-chartjs-2";

// CSS :
import "./DonutChart.scss"





// Registring Chart :
ChartJS.register(ArcElement, Tooltip, Legend);
////////////////////////////////////////////////////////////////////////
// Sample Chart Data :
const Sample = {
    labels: [],
    datasets: [
        {
            label: "Users",
            data: [40, 166],
            backgroundColor: ["#006400", "#FCD117"],
            borderWidth: 4
        }
    ]
};
////////////////////////////////////////////////////////////////////////



const DonutChart = ({ title, data = Sample }) => {
    const onClick = (e) => {
        console.log(e);
    };
    return (
        <>
            <div className="donutchart_container">
                {/* <div className='title'>
                    {title}
                </div> */}
                <div className='chart'>
                    <Pie data={data} onClick={(e) => onClick(e)} />
                </div>
                <div className='status_box'>
                    <div className='status'>
                        <div className='dot' style={{ backgroundColor: `${data.datasets[0]["backgroundColor"][0]}` }} > </div>
                        <div className='dot_title'>
                            Clients
                        </div>
                    </div>
                    <div className='status'>
                        <div className='dot' style={{ backgroundColor: `${data.datasets[0]["backgroundColor"][1]}` }}> </div>
                        <div className='dot_title'>
                            Contractor
                        </div>
                    </div>
                    <div className='status'>
                        <div className='dot' style={{ backgroundColor: `${data.datasets[0]["backgroundColor"][2]}` }}> </div>
                        <div className='dot_title'>
                            Constructors
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonutChart