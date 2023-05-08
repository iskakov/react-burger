export const summReducer = (state, {type, payload}) => {
  switch (type) {
    case 'inc':
      return {summ: state.summ + payload};
    case 'dec':
      return {summ: state.summ - payload};
    default:
      return {...state};
  }
}