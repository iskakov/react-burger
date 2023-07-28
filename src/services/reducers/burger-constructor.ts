import { IBurgerTypeConstructor } from "../../utils/constants";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { ADD_INGREDIENT, DEL_INGREDIENT, CLEAR_INGREDIENTS, SORT, CHANGE_ORDER, CHANGE_DRAG, ADD_BUN, DEL_BUN} from "../constants/burger-constructor";
interface IBurgerConstructorType {
  bun: IBurgerTypeConstructor | null;
  ingredients: Array<IBurgerTypeConstructor>;
}
export const initialState: IBurgerConstructorType = {
  bun: null,
  ingredients: []
}

export const burgerConstructorReducer = (state:IBurgerConstructorType = initialState, action: TBurgerConstructorActions):  IBurgerConstructorType => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, {...action.payload.ingredient, order: action.payload.order, uuid: action.payload.uuid}]}
    case ADD_BUN:
      return {...state, bun: {...action.payload}}
    case DEL_BUN:
      return {...state, bun: null}
    case DEL_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter(item => item.uuid !== action.payload.uuid)}
    case CHANGE_ORDER:
      return {...state, ingredients: [...state.ingredients.map(item => action.payload.dragIndex === item.order ? {...item, order: action.payload.hoverIndex} : action.payload.hoverIndex === item.order ?  {...item, order: action.payload.dragIndex} : {...item})]}
    case SORT:
      return {...state, ingredients: [...state.ingredients.sort(action.payload.sortingFunction)]}
    case CLEAR_INGREDIENTS:
      return {...state, ingredients: [], bun: null}
    case CHANGE_DRAG:
      return {...state, ingredients: [...state.ingredients.map((item) => item.uuid === action.payload.uuid ? {...item, isDrag: action.payload.isDrag} :  {...item})]}
    default: 
      return state;
  }
}
