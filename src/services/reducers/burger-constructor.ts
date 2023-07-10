import { IBurgerTypeConstructor } from "../../utils/constants";
import { ADD_INGREDIENT, DEL_INGREDIENT, CLEAR_INGREDIENTS, SORT, CHANGE_ORDER, CHANGE_DRAG, ADD_BUN, DEL_BUN} from "../actions/burger-constructor";
interface IBurgerConstructorType {
  bun: IBurgerTypeConstructor | null;
  ingredients: Array<IBurgerTypeConstructor>;
}
const initialState: IBurgerConstructorType = {
  bun: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action):  IBurgerConstructorType => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, {...action.payload, order: action.order, uuid: action.uuid}]}
    case ADD_BUN:
      return {...state, bun: {...action.payload, order: action.order}}
    case DEL_BUN:
      return {...state, bun: null}
    case DEL_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter(item => item.uuid !== action.payload.uuid)}
    case CHANGE_ORDER:
      return {...state, ingredients: [...state.ingredients.map(item => action.dragIndex === item.order ? {...item, order: action.hoverIndex} : action.hoverIndex === item.order ?  {...item, order: action.dragIndex} : {...item})]}
    case SORT:
      return {...state, ingredients: [...state.ingredients.sort(action.sortingFunction)]}
    case CLEAR_INGREDIENTS:
      return {...state, ingredients: [], bun: null}
    case CHANGE_DRAG:
      return {...state, ingredients: [...state.ingredients.map((item) => item.uuid === action.uuid ? {...item, isDrag: action.isDrag} :  {...item})]}
    default: 
      return state;
  }
}
