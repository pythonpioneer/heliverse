import React from 'react';
import { Grid } from '@mui/material';

export default function UserItem(props) {
    return (
        <>
            <Grid container className="container card">
                <Grid item lg={12} sm={12} xs={12}>
                    <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbRaxlxQVfs3QBxs7QpGtixpAV47sMBqkMoA&usqp=CAU" style={{ height: '250px' }} alt="Card image cap" />
                </Grid>

                <Grid item lg={12} sm={12} xs={12} className="card-body">
                    <h5 className="card-title">helooo</h5>
                    <p className="card-text">{props.desc?.length > 91 ? props?.desc?.slice(0, 91) + '...' : props.desc}</p>
                    <a href={props?.newsUrl} className="btn btn-primary" style={{ backgroundColor: '#01283b' }}>Read More</a>
                </Grid>
            </Grid>
        </>
    )
}
