import {Router} from "express";
import { fetchPostController, fetchPostSlugController } from "../Controller/fecthpost.controller.js";


const route = Router();

route.post(["/fetch", "/fecth"], fetchPostController);
route.post(["/fetch/slug", "/fecth/slug"], fetchPostSlugController);

export default route;