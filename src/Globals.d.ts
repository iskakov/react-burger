declare module "*.module.css";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
declare module "*.png";

declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.png" {
    const value: any;
    export =value;
}