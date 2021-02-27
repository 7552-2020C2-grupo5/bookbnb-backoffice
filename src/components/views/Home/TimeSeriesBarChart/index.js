import React from "react";
import {Bar} from "react-chartjs-2";
import {useStyles} from "../styles";

export default function TimeSeriesBarChart({metricData, title, legendLabel, color="rgb(255,99,132)"}) {
    const classes = useStyles();

    const data = {
        labels: metricData.labels,
        datasets: [
            {
                label: legendLabel,
                data: metricData.data,
                backgroundColor: color,
            },
        ],
    }

    const options = {
        title: {
            display: true,
            text: title,
            fontSize: 20
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [{
                offset: true,
                distribution: 'linear',
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: "D-M-YYYY"
                    }
                }
            }]
        },
    }

    return (
        <div className={classes.chart}>
            <Bar data={data} options={options} />
        </div>
    );
}