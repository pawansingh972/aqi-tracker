import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const getFormattedData = (cityAQIData) => {
  return cityAQIData.previousAQIs.map((item) => {
    return { name: new Date(item.updatedAt), aqi: item.aqi.toFixed(2) };
  });
};

export default function CityAQILineChart(props) {
  console.log(props);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={100}
        data={getFormattedData(props.cityAQIData)}
      ></LineChart>
    </ResponsiveContainer>
  );
}
