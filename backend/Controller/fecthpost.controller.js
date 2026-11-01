import {fetchPost, fetchPostSearch, fetchPostSlug} from "../Services/fetchpost.service.js";

export const fetchPostController = async (req, res, next) => {
    const { page, pageSize } = req.body;
    
    try{
        const response  = await fetchPost(req.body);
        if(!response || response.length === 0){
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json(response);
    }catch(err){
        next(err)
    }
}

export const fetchPostSlugController = async (req, res, next) => {
    const { slug, postId } = req.body;

    if(!slug && !postId){
        return res.status(400).json({ message: "Slug or PostId is required" });
    }

    try{
        const response = await fetchPostSlug(req.body);
        if(!response || response.length === 0){
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(response);
    }catch(err){
        next(err)
    }
}


export const fetchPostSearchController = async (req, res, next) => {
    const { search } = req.body;

    if(!search){
        return res.status(400).json({ message: "Search term is required" });
    }

    try{
        const response = await fetchPostSearch(req.body);
        if(!response || response.length === 0){
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(response);
    }catch(err){
        next(err)
    }
}


