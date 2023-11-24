import React from 'react';
import { Grid } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


// to display skeleton while loading
export default function SkeletonLoader() {
    return (
        <Grid container className="container card mt-4" style={{ width: '90%', height: 'auto', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Grid container alignItems="center">
                <Skeleton className="mr-4 mt-3" style={{ height: '50px', width: '50px' }} alt="avatar" />

                <Grid style={{ margin: '5px', paddingRight: '50px' }}>
                    <Skeleton count={1} style={{ width: '120px' }}></Skeleton>
                    <Skeleton count={1} style={{ width: '60px' }}></Skeleton>
                </Grid>

            </Grid>
            <Grid item style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '20px' }} >
                <Skeleton count={1} style={{ width: '300px' }}></Skeleton>
                <Skeleton count={1} style={{ width: '160px' }}></Skeleton>
                <Skeleton count={1} style={{ width: '130px' }}></Skeleton>
            </Grid>
            <Skeleton style={{ width: '20px', height: '20px', marginTop: '20px' }}></Skeleton>
        </Grid>
    )
}
