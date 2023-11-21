// here we will create slices
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// creating an action
export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await fetch('http://localhost:8000/api/v1/users/');
    return response.json();
});

// Action creator for creating a user
export const createUser = createAsyncThunk('createUser', async (userData) => {
    const formData = new FormData();
  
    // Append other user data to the formData
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('email', userData.email);
    formData.append('gender', userData.gender);
    formData.append('available', userData.available);  // boolean input
    formData.append('avatar', userData.avatar); // file input
    formData.append('domain', userData.domain);

    // now, sent the data to the server
    const response = await fetch('http://localhost:8000/api/v1/users/', {
      method: 'POST',
      body: formData,
    });
  
    return response.json();
  });

// creating slices
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: null,
        hasErrors: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasErrors = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                console.log("Error: ", action.payload);
                state.hasErrors = true;
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasErrors = false;
                // You can update the state with the created user data if needed
                state.data = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                console.error('Error creating user:', action.error.message);
                state.isLoading = false;
                state.hasErrors = true;
            })
    }
});

// exporting the slice
export default userSlice.reducer;