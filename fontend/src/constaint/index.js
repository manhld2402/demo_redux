import { combineReducers } from "redux";
import dataPhotos from "./dataPhotos";
import dataComments from "./dataComment";
import dataRelatedImages from "./relatedImages";
export * from "../constaint";
export const reducer = combineReducers({
  dataPhotos,
  dataComments,
  dataRelatedImages,
});
