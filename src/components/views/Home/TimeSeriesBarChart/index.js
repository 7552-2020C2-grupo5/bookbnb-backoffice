import React from "react";
import {Bar} from "react-chartjs-2";

export default function TimeSeriesBarChart(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: props.legendLabel,
                data: props.data,
                backgroundColor: 'rgb(255,99,132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    const options = {
        responsive: true,
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
        <React.Fragment>
            <div className='header'>
                <h1 className='title'>{props.title}</h1>
            </div>
            <Bar data={data} options={options} />
        </React.Fragment>
    );
}