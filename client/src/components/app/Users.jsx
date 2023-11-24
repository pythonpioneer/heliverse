import React, { useEffect } from 'react'
import UserItem from './UserItem';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreUsers, fetchUsers } from '../../redux/slice/user';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../spinner/Spinner';


// to display all the users
export default function Users() {

  // to dispatch the fetch user action
  const dispatch = useDispatch();

  // fetching data from store
  const totalUsers = useSelector(state => state.user.totalUsers);
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.user.isLoading)

  // to load more data
  const fetchMoreData = () => {

    // dispatch the fetch more users action
    dispatch(fetchMoreUsers());
    console.log("__next__")
  }

  useEffect(() => {
  
    // Fetch users when the component mounts
    dispatch(fetchUsers());
    console.log("in effect")
  }, []);


  return (
    <>
      <Grid>

        {/* fetching data from server */}
        {loading && <h1 className='container mt-5'>Loading...</h1>}

        {/* implementing pagenation */}
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreData}
          hasMore={users.length < totalUsers}  // there are alot of articles present, restricting after displaying some articles out of those
          loader={<Spinner />}
        >
          <Grid container>

            {/* traversing to display all users */}
            {!loading && users?.map((user, index) => {
              return <Grid key={index} item lg={4} xs={12} sm={6} md={4} >
                <UserItem user={user} />
              </Grid>
            })}

          </Grid>
        </InfiniteScroll>
      </Grid>
    </>
  )
}
