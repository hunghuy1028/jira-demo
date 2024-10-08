import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ data, title }) {

    const chartRef = useRef<Chart<"pie", number[], unknown>>(null);

    useEffect(() => {
        chartRef.current.update();
    }, [data])


    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <Pie
                data={data}
                ref={chartRef}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title
                        }
                    }
                }}
            />
        </div>
    );
}