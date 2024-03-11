import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const baseURL = 'https://images-api.nasa.gov';

const fetchNasaByQuery = createAsyncThunk('nasa/fetchData', async (input: string) => {
    const query = `${baseURL}/search?q=${input}`

    const resp = await fetch(query, { method: 'GET'}).then(response => response.json());
    return resp;
})

const nasaSlice = createSlice({
    name: 'nasaSlice',
    initialState: { data: {collection: {items:[]}}, status: 'idle', error: null },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNasaByQuery.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchNasaByQuery.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchNasaByQuery.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
});

export {fetchNasaByQuery};

export default nasaSlice;