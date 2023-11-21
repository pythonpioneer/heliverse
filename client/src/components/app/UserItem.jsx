import React from 'react';
import { Grid } from '@mui/material';

export default function UserItem(props) {
    return (
        <>
            <Grid container className="container card mt-4" style={{ width: '90%', height: 'auto', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Grid item container alignItems="center">
                    <img className="mr-4" src={props.user.avatar} style={{ height: '50px' }} alt="avatar" />

                    <Grid style={{ margin: '5px', paddingRight: '50px' }}>
                        <h5>{props.user.first_name + " " + props.user.last_name}</h5>
                        <p>{props.user.gender}</p>
                    </Grid>

                </Grid>
                <Grid item style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    <p style={{ marginTop: '-12px' }}>Email: {props.user.email}</p>
                    <p style={{ marginTop: '-12px' }}>domain: {props.user.domain}</p>
                    <p style={{ marginTop: '-12px' }}>Availiblity: {props.user.available ? 'Yes' : 'No'}</p>
                </Grid>
                <i className="fa fa-trash" style={{ marginTop: '10px' }} aria-hidden="true"></i>
            </Grid>
        </>

    )
}
