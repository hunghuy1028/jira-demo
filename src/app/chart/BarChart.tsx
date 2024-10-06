import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ data, title }) {

    const chartRef = useRef<Chart<"bar", (number | [number, number])[], unknown>>(null);

    useEffect(() => {
        chartRef.current.update();
    }, [data])

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={data}
                ref={chartRef}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}