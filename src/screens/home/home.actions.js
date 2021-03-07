export let addItem = (payload) => {
  return {
    type: 'ADD_ITEM',
    payload: payload,
  };
};

export let editItem = (payload) => {
  return {
    type: 'EDIT_ITEM',
    payload: payload,
  };
};

export let deleteItem = (payload) => {
  return {
    type: 'DELETE_ITEM',
    payload: payload,
  };
};
