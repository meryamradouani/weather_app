import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cities: [],
  weather:{},
  loading: false,
  error: null,
};
const API_KEY = "2f54064ca5e6dfe5f982869049311983"; // Votre clé OpenWeatherMap

// Thunk pour l'autocomplétion
export const fetchweather = createAsyncThunk(
  'weather/fetchweather', async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const weatherSlice = createSlice({

    name: 'weather',
    initialState,
    reducers: {
      resetresult:(state,action)=>{
        state.weather={};
        state.loading=false;
        state.error=null;
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchweather.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchweather.fulfilled, (state, action) => {
          state.loading = false;
          state.weather = action.payload;
          // Ajouter la ville à l'historique si elle n'existe pas déjà
          if (!state.cities.some(c => c.id === action.payload.id)) {
            state.cities.push({
              id: action.payload.id,
              name: action.payload.name,
              country: action.payload.sys.country
            });
          }
        })
        .addCase(fetchweather.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to fetch weather';
        });
    },
  });
  
  export const { resetresult } = weatherSlice.actions;
  export default weatherSlice.reducer;