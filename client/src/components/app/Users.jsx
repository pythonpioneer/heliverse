import React, { useEffect } from 'react'
import UserItem from './UserItem';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import user, { fetchUsers } from '../../redux/slice/user';


// to display all the users
export default function Users() {

  // to dispatch the fetch user action
  const dispatch = useDispatch();

  const state = useSelector(state => state.user);
  const users = state?.data?.user;
  const loading = state?.isLoading;
  console.log(state)

  // to fetch users details
  useEffect(() => {
    dispatch(fetchUsers());
    return (()=> {});  // will write clening function
  }, []);


  return (
    <>
      <Grid container spacing={4}>

        {/* fetching data from server */}
        { loading && <h1 className='container mt-5'>Loading...</h1>}

        {/* traversing to display all users */}
        { !loading && users?.map((user, index) => {
          return <Grid key={index} item lg={4} xs={12} sm={6} md={4} >
              <UserItem user={user} />
            </Grid>
        })
        }
      </Grid>
    </>
  )
}
