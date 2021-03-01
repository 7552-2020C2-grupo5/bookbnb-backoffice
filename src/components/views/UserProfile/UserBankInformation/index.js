import Grid from "@material-ui/core/Grid";
import StaticField from "../../../common/StaticField";
import React from "react";

export default function UserBankInformation({walletAddress, moneyInEth, moneyInUsd, moneyInEur}) {
    return (
        <Grid container direction="row">
            <Grid item md={6} xs={12}>
                <StaticField label='Wallet' value={walletAddress}/>
            </Grid>
            <Grid item md={2} xs={12}>
                <StaticField label='ETH' value={moneyInEth}/>
            </Grid>
            <Grid item md={2} xs={12}>
                <StaticField label='USD' value={moneyInUsd}/>
            </Grid>
            <Grid item md={2} xs={12}>
                <StaticField label='EUR' value={moneyInEur}/>
            </Grid>
        </Grid>
    );
}