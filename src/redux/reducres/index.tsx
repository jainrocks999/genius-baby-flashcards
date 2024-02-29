import {createSlice} from '@reduxjs/toolkit';
import {cat_type} from '../../types/Genius/cate_types';
const initialState = {
  default_sound: true,
  cat_data: {} as cat_type,
  setting_data: {},
};

const GeniusReduc = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    baby_flash_them: (state, action) => {
      return {...state, default_sound: action.payload};
    },
    get_data_by_category: (state, action) => {
      return {...state, cat_data: action.payload};
    },
  },
});
export default GeniusReduc.reducer;
