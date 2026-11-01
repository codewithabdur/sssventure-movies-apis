import { getPool, sql } from "../Utills/Db.js";


export const addComment = async(data) =>{
    const pool = await getPool();
    const request = await pool.request();

    request.input("Name", sql.NVarChar(400), data.Name)
    request.input("Email", sql.NVarChar(400), data.Email)
    request.input("Comment", sql.NVarChar(sql.MAX), data.Comment)

    try {
        const result = await request.execute("dbo.usp_Add_Comment");
        return result.recordset
    } catch (error) {
        throw new Error(err.originalError?.info?.message || err.message);
    }
}

export const fetchComments = async(data) =>{
    const pool = await getPool();
    const request = await pool.request();

    request.input("ComentId", sql.Int, data.ComentId);

    try {
        const result = await request.execute("dbo.usp_Get_Comments");
        return result.recordset
    } catch (error) {
        throw new Error(err.originalError?.info?.message || err.message);
    }
}

