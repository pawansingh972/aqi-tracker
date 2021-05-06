import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const getFormattedData = (cityAQIData) => {
  return cityAQIData.previousAQIs.map((item) => {
    return { name: new Date(item.updatedAt), aqi: item.aqi.toFixed(2) };
  });
};

const getStrokeColor = () => {
  return "red";
};

export default function CityAQILineChart(props) {
  console.log(props);
  return (
    <LineChart
      width={800}
      height={500}
      data={getFormattedData(props.cityAQIData)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="aqi"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        // dot={{ stroke: "red", strokeWidth: 1, r: 4, strokeDasharray: "" }}
      />
    </LineChart>
  );
}
