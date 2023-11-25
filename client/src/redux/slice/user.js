// here we will create slices
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';


// create an action to delete the user
export const deleteUser = createAsyncThunk('deleteUser', async (userId) => {

    // making api call to delete the user
    return axios.delete(`http://localhost:8000/api/v1/users/${userId}`)
        .then(response => {
            toast.success(response?.data?.message || "Deleted!!")
            return response.data;
        })
        .catch(err => {
            toast.error(err?.response?.data?.message || "user not deleted")
            throw err;
        });

});


// creating an action to fetch all users
export const fetchUsers = createAsyncThunk('fetchUsers', async (_, { getState }) => {

    const searchText = getState().user.searchText;

    // to fetch all the users
    return axios.get(`http://localhost:8000/api/v1/users/?name=${searchText}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
});

// creating an action to fetch all users
export const fetchMoreUsers = createAsyncThunk('fetchMoreUsers', async (page, { getState }) => {

    const searchText = getState().user.searchText;
    const currPage = getState().user.currPage;

    // to fetch all the users
    return axios.get(`http://localhost:8000/api/v1/users/?name=${searchText}&page=${page}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
});

// Action creator for creating a user
export const createUser = createAsyncThunk('createUser', async (userData) => {
    const formData = new FormData();

    // Append other user data to the formData
    formData.append('first_name', userData.firstName);
    formData.append('last_name', userData.lastName);
    formData.append('email', userData.email);
    formData.append('gender', userData.gender);
    formData.append('available', userData.available);  // boolean input
    formData.append('avatar', userData.avatar); // file input
    formData.append('domain', userData.domain);

    // now, sent the data to the server
    return axios.post('http://localhost:8000/api/v1/users/', formData)
        .then(response => {
            toast.success(response?.data?.message || "Created!!")
            return response.data;
        })
        .catch(err => {
            console.error(err);
            toast.error(err?.response?.data?.message || "user not created")
            throw err;
        });

});

// creating slices
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        users: [],  // to store all users
        totalUsers: 0, 
        searchText: '',
        hasErrors: false,
        currPage: 2,
    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setPage: (state) => {
            state.currPage += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // to fetch all users
            .addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasErrors = false;
                state.users = action.payload.user;
                state.totalUsers = action.payload.totalUsers;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                console.error("Error: ", action.payload);
                state.hasErrors = true;
            })

            // to create users
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasErrors = false;

                // You can update the state with the created user data if needed
                state.users.push(action.payload.user);
            })
            .addCase(createUser.rejected, (state, action) => {
                console.error('Error creating user:', action.error.message);
                state.isLoading = false;
                state.hasErrors = true;
            })

            // to delete all users
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasErrors = false;

                // Assuming action.payload contains information about the deleted user
                const deletedUserId = action.payload.userId;

                // Filter out the deleted user from the data array
                state.totalUsers -= 2;
                state.users = state.users.filter(user => user._id !== deletedUserId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                console.error('Error deleting user:', action.error.message);
                state.isLoading = false;
                state.hasErrors = true;
            })

            // to fetch more users 
            .addCase(fetchMoreUsers.pending, (state, action) => {
                // state.isLoading = true;  // no need to this loading
                // this case is handled by the infinite scroller loader attribute
            })
            .addCase(fetchMoreUsers.fulfilled, (state, action) => {
                state.users = [...state.users, ...action.payload.user];
            })
            .addCase(fetchMoreUsers.rejected, (state, action) => {
                console.error("Error: ", action.payload);
                state.hasErrors = true;
            })
    }
});

// exporting the slice
export const { setSearchText, clearSearchText, setPage } = userSlice.actions;
export default userSlice.reducer;