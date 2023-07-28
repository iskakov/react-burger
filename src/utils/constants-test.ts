import { IBurgerType, IBurgerTypeConstructor, IFeedApi, IOrderBody, IResetPassword, IUser } from './constants';

export const BurgerConstructorObject : IBurgerTypeConstructor = {
  _id: '643d69a5c3f7b9001cfa093c',
  name:' Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  uuid: '77800c46-f606-49ef-bbd7-2a9789844274',
  order: 1, 
  count: 0
}

export const BurgerObject : IBurgerType = {
  _id: '643d69a5c3f7b9001cfa093c',
  name:' Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0, 
  count: 0
}


export const FeedObject: IFeedApi = {
  createdAt: '2023-07-23T09:31:00.353Z',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093d'],
  name: 'Space флюоресцентный бургер',
  number: 14009,
  status: 'done',
  updatedAt: '2023-07-23T09:31:00.511Z',
  _id: '64bcf35482e277001bfa324b'
}

export const OrderObject: IOrderBody = {
  createdAt: "2023-07-23T09:41:14.438Z",
  ingredients: [BurgerObject],
  name: "Люминесцентный флюоресцентный бургер",
  number: 14014,
  ownner: {name: "alex111", email: "ma3ca3@gmail.com"},
  price: 1976,
  status: "done",
  updatedAt: "2023-07-23T09:41:14.634Z",
  _id: "64bcf5ba82e277001bfa3259"
}

export const UserObject: IUser = {
  name: 'Alex',
  email: 'test@gmail.com',
  password: '12345'
}

