import {createSlice} from '@reduxjs/toolkit';
import {cat_type, seeting_db, setting_type} from '../../types/Genius/db';
import {actionType} from '../../types/Genius/action';
import utils from '../../utils';
import {payloadType} from '../../types/Genius/playload';
const initialState = {
  default_sound: true,
  cat_data: [] as cat_type,
  setting_data: {} as seeting_db,
  memory_data: [] as cat_type,
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
    get_setting_from_db: (state, action) => {
      return {...state, setting_data: action.payload};
    },
    update_setting_to_tb: (state, action) => {
      let payload = action.payload as payloadType;
      utils.updateSettings(payload.setting_data);
      payload.navigation.goBack();
      return {...state, setting_data: action.payload.setting_data};
    },
    get_memory_data_from_db: (state, action) => {
      return {...state, memory_data: action.payload};
    },
  },
});
export default GeniusReduc.reducer;
