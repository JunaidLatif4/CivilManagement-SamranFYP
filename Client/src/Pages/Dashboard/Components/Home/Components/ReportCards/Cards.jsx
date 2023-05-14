import React, { useEffect, useState } from 'react';

// Assets | ICONS :
import { SiGoogleclassroom } from "react-icons/si";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";


// CSS :
import "./Cards.scss";





const Cards = ({ data }) => {

    const [allCardsData, setAllCardsData] = useState([
        {
            icon: FiUsers,
            // static: 80,
            value: 0,
            name: "Total Projects"
        },
        {
            icon: AiOutlineFileProtect,
            // static: -30,
            value: 0,
            name: "InProgress Projects"
        },
        {
            icon: SiGoogleclassroom,
            // static: 40,
            value: 0,
            name: "Completed Projects"
        },
        {
            icon: FaGraduationCap,
            // static: 60,
            value: 0,
            name: "Canceled Projects"
        },
    ])

    useEffect(() => {
        if (data) {
            setAllCardsData([
                {
                    icon: FiUsers,
                    // static: 80,
                    value: data?.allProjets,
                    name: "Total Projects"
                },
                {
                    icon: AiOutlineFileProtect,
                    // static: -30,
                    value: data?.inprogress,
                    name: "InProgress Projects"
                },
                {
                    icon: SiGoogleclassroom,
                    // static: 40,
                    value: data?.completed,
                    name: "Completed Projects"
                },
                {
                    icon: FaGraduationCap,
                    // static: 60,
                    value: data?.canceled,
                    name: "Canceled Projects"
                },
            ])
        }
    }, [data])

    return (
        <>
            <div className="cardsContainer">
                {
                    allCardsData.map((data, index) => {
                        return (
                            <div className="hoverEffect" key={index}>
                                <div className="card">
                                    <div className="bottomLine" />
                                    <div className="iconBox">
                                        <data.icon className='icon' />
                                        {data?.static && <div className="counts" style={data.static < 0 ? { backgroundColor: "red" } : {}}>{data.static}% {data.static < 0 ? <RiArrowDownSLine /> : <RiArrowUpSLine />}</div>}
                                    </div>
                                    <div className="detials">
                                        <div className="value">{data.value}</div>
                                        <div className="title">{data.name}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cards