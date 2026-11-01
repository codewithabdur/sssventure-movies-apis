import {Router} from "express";
import { fetchPostController, fetchPostSearchController, fetchPostSlugController } from "../Controller/fecthpost.controller.js";


const route = Router();

route.post(["/fetch", "/fecth"], fetchPostController);
route.post(["/fetch/slug", "/fecth/slug"], fetchPostSlugController);
route.post(["/fetch/search", "/fecth/search"], fetchPostSearchController);

export default route;