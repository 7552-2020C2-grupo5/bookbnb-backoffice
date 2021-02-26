import React from "react";
import Layout from "../../common/Layout";
import {Line, Bar} from "react-chartjs-2";
import {Card} from "@material-ui/core";
import TimeSeriesBarChart from "./TimeSeriesBarChart";




export default function Home() {

    const labels = ['2020-01-22', '2020-01-23', '2020-01-24', '2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28',
        '2020-01-29', '2020-01-30', '2020-01-31', '2020-02-01', '2020-02-02', '2020-02-12'
    ];
    const values = [1, 2, 3, 4, 5, 6, 8, 1, 2, 3, 10, 50, 30];

    let data = [];
    for (const x of Array(labels.length).keys()) {
       data.push({t: new Date(labels[x]), y: labels[x]})
    }


    const content = () => {
        return (
            <Card>
                <TimeSeriesBarChart legendLabel={"Cantidad de usuarios"} labels={labels} data={values} title={"Prueba"}/>
            </Card>

        );
    };

    return (
        <Layout content={content()}/>
    );
}