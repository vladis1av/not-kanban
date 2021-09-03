import { configureStore } from '@reduxjs/toolkit';

import * as reducers from '../redux/slices/';

export const store = configureStore({
  reducer: {
    ...reducers,
  },
});
