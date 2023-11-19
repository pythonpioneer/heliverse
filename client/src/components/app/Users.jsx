import React from 'react'
import UserItem from '../UserItem';
import { Grid } from '@mui/material';

export default function Users() {
  return (
    <>
      <Grid container spacing={4}>

        <Grid item lg={4} xs={12} sm={6} md={4} ><UserItem /></Grid>
        <Grid item lg={4} xs={12} sm={6} md={4} ><UserItem /></Grid>
        <Grid item lg={4} xs={12} sm={6} md={4} ><UserItem /></Grid>
      </Grid>
    </>
  )
}
