import React from "react";
import {Line} from "react-chartjs-2";
import {useStyles} from "../styles";

export default function TimeSeriesLineChart({metricData, title, legendLabel, color="rgb(255,99,132)"}) {
    const classes = useStyles();

    const data = {
        labels: metricData.labels,
        datasets: [
            {
                label: legendLabel,
                data: metricData.data,
                fill: false,
                borderColor: color,
                backgroundColor: color,
                lineTension: 0
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
            <Line data={data} options={options} />
        </div>
    );
}