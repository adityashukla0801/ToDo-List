import { ADD_TASK } from './action';
import { DELETE } from './action';
import { COMPLETE } from './action';
import { TRASH } from './action';
import { RESTORE } from './action';
import { EMPTY } from './action';

const initialState = {
  list: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case DELETE:
      let arr = state.list.filter((ele) => {
        return ele.id != action.payload;
      });
      return {
        ...state,
        list: arr,
      };

    case COMPLETE:
      let arr1 = state.list.map((ele) => {
        if (ele.id == action.payload) ele.flag = true;
        return ele;
      });
      return {
        ...state,
        list: arr1,
      };
    case TRASH:
      let arr2 = state.list.map((ele) => {
        if (ele.id == action.payload) ele.trash = true;
        return ele;
      });
      return {
        ...state,
        list: arr2,
      };
    case RESTORE:
      let arr3 = state.list.map((ele) => {
        if (ele.id == action.payload) ele.trash = false;
        return ele;
      });

      return {
        ...state,
        list: arr3,
      };
    case EMPTY:
      let arr4 = state.list.filter((ele) => {
        if (ele.trash == true) {
          ele = '';
        }
        return ele;
      });

      return {
        ...state,
        list: arr4,
      };
    default:
      return state;
  }
};
