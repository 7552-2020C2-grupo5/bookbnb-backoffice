import React from "react";
import {Line} from "react-chartjs-2";

export default function TimeSeriesLineChart(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: props.legendLabel,
                data: props.data,
                fill: false,
                backgroundColor: 'rgb(255,99,132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                lineTension: 0
            },
        ],
    }

    const options = {
        title: {
            display: true,
            text: props.title,
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
        <React.Fragment>
            <div className='header'>
                <h1 className='title'>{props.title}</h1>
            </div>
            <Line data={data} options={options} />
        </React.Fragment>
    );
}