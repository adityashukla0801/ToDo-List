export const ADD_TASK = 'ADD_TASK';
export const DELETE = 'DELETE';
export const COMPLETE = 'COMPLETE';
export const TRASH = 'TRASH';
export const RESTORE = 'RESTORE';
export const EMPTY = 'EMPTY';

export const addTodo = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};

export const remove = (payload) => {
  return {
    type: DELETE,
    payload,
  };
};

export const complete = (payload) => {
  return {
    type: COMPLETE,
    payload,
  };
};

export const taskTrash = (payload) => {
  return {
    type: TRASH,
    payload,
  };
};
export const restore = (payload) => {
  return {
    type: RESTORE,
    payload,
  };
};
export const empty = (payload) => {
  return {
    type: EMPTY,
    payload,
  };
};
