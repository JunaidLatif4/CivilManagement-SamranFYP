import React from "react";


////////////////////////// Rechart/////////////////
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


//////////////////////////Sample Rechart Data/////////////////

const data = [
  {
    name: "October 2",
    Comments: 4000,
    Likes: 2400,
    "Story Replies": 2400,
  },
  {
    name: "October 3",
    Comments: 3000,
    Likes: 1398,
    "Story Replies": 2210,
  },
  {
    name: "October 4",
    Comments: 2000,
    Likes: 9800,
    "Story Replies": 2290,
  },
  {
    name: "October 5",
    Comments: 2780,
    Likes: 3908,
    "Story Replies": 2000,
  },
  {
    name: "October 6",
    Comments: 1890,
    Likes: 4800,
    "Story Replies": 2181,
  },
  {
    name: "October 7",
    Comments: 2390,
    Likes: 3800,
    "Story Replies": 2500,
  },
  {
    name: "October 8",
    Comments: 3490,
    Likes: 4300,
    "Story Replies": 2100,
  },
];




export default function ProgressBarChart() {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Likes" stackId="a" fill="#00caef" />
      <Bar dataKey="Comments" stackId="a" fill="orange" />
      <Bar dataKey="Story Replies" fill="#e13976" />
    </BarChart>
  );
}
