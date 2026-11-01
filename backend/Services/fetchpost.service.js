import {getPool , sql} from "../Utills/Db.js";

export const fetchPost = async (data) => {
    const pool = await getPool();
    const request = pool.request();

    request.input("Page", sql.Int, data.page ?? 1);
    request.input("PageSize", sql.Int, data.pageSize ?? 10);

    try{
        const response = await request.execute("dbo.usp_Post_List");
        return response.recordsets
    }catch(error){
        throw new Error(err.originalError?.info?.message || err.message);
    }
}

export const fetchPostSlug = async (data) => {
    const pool = await getPool();
    const request = pool.request();

    request.input("Slug", sql.NVarChar(300), data.slug);
    request.input("PostId", sql.Int, data.postId);

    try{
        const response = await request.execute("dbo.usp_Post_GetBySlug");
        return response.recordsets
    }catch(error){
        throw new Error(err.originalError?.info?.message || err.message);
    }
}
