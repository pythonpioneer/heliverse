// here we will create slices
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// creating an action
export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await fetch('http://localhost:8000/api/v1/users/');
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
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasErrors = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            console.log("Error: ", action.payload);
            state.hasErrors = true;
        });
    }
});

// exporting the slice
export default userSlice.reducer;