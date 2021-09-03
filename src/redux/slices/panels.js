import { createSlice } from '@reduxjs/toolkit';
import reorderCards from '../../utils/reorderCards';

const initialState = [
  {
    title: 'План на месяц',
    cards: [
      'Пройти курс по React',
      'Отметить день рождения',
      'Записаться на курсы японского языка, чтобы уехать жить в Токио',
    ],
  },
  {
    title: 'План на день',
    cards: [
      'Записаться на курс по React',
      'Забронировать тир на субботу',
      'Накидать тем для статей в блог',
    ],
  },
];

export const panels = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    addPanel: (state, action) => [
      ...state,
      { title: action.payload, cards: [] },
    ],

    removePanel: (state, action) =>
      state.filter((_, index) => action.payload !== index),

    addCard: (state, action) => {
      const { panelIndex, text } = action.payload;
      return state.map((item, index) => {
        if (panelIndex === index) {
          return {
            ...item,
            cards: [...item.cards, text],
          };
        }
        return item;
      });
    },

    reorderCard: (state, action) => {
      const { source, destination } = action.payload;
      return void reorderCards({ state, source, destination });
    },
  },
  extraReducers: {},
});

export const { addPanel, removePanel, addCard, reorderCard } = panels.actions;

export default panels.reducer;
