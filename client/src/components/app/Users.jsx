import React, { useEffect } from 'react'
import UserItem from './UserItem';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slice/user';
import InfiniteScroll from 'react-infinite-scroll-component';


// to display all the users
export default function Users() {

  // to dispatch the fetch user action
  const dispatch = useDispatch();

  // fetching data from store
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.user.isLoading)

  console.log("users", users)

  // to fetch users details
  useEffect(() => {
    dispatch(fetchUsers());
    return (() => { });  // will write clening function
  }, [dispatch]);


  return (
    <>
      <Grid container spacing={4}>

        {/* fetching data from server */}
        {loading && <h1 className='container mt-5'>Loading...</h1>}

        {/* implementing pagenation */}
        <InfiniteScroll
          dataLength={50}
          next={() => {}}
          hasMore={true}  // there are alot of articles present, restricting after displaying some articles out of those
          loader={<h2>Loading...</h2>}
        >
          <Grid container>


            {/* traversing to display all users */}
            {!loading && users?.map((user, index) => {
              return <Grid key={index} item lg={4} xs={12} sm={6} md={4} >
                <UserItem user={user} />
              </Grid>
            })
            }

          </Grid>
        </InfiniteScroll>
      </Grid>
    </>
  )
}
