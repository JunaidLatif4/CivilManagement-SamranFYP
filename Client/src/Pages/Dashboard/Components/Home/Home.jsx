import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { DatePicker } from 'antd'

// Components :
import Cards from './Components/ReportCards/Cards'
import LineChart from "./Components/SalesReportChart/SalesChart"
import DonutChart from './Components/DonutChart/DonutChart'
// import GrowChart from "./Components/Growthchart/Growthchart"

// API :
import { ProjectStaticsAPI } from 'API/project'

// CSS :
import './Home.scss'
import { toast } from 'react-toastify'




let { RangePicker } = DatePicker;
const Home = () => {

    const [staticData, setStaticData] = useState(null)
    const [donutData, setDonutData] = useState(null)

    const gettingProjectStaticData = async () => {
        let res = await ProjectStaticsAPI()
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setStaticData(res.data.result)
        }
    }
    useEffect(() => {
        gettingProjectStaticData()
    }, [])

    useEffect(() => {
        if (staticData) {
            setDonutData({
                labels: [],
                datasets: [
                    {
                        label: "Project Progress",
                        data: [staticData?.canceled, staticData?.completed],
                        backgroundColor: ["#006400", "#FCD117"],
                        borderWidth: 4
                    }
                ]
            })
        }
    }, [staticData])
    return (
        <div className='dashboardHomeContainer'>
            <div className="heading">DASHBOARD</div>
            <Cards data={staticData} />
            <div className="reportBox">
                <div className="chartsBox">
                    <div className="flexLineSpace">
                        <div className="subHeading">Projects Report</div>
                        <RangePicker className='datePicker' />
                    </div>
                    <div className="charts">
                        <LineChart />
                    </div>
                </div>
                <div className="donutBox">
                    <div className="flexLineSpace">
                        <div className="subHeading">Application Report</div>
                        <RangePicker className='datePicker' />
                    </div>
                    {
                        donutData &&
                        <div className="donuts">
                            <DonutChart data={donutData} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home