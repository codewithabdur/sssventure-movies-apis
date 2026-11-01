import { getPool, sql } from "../Utills/Db.js";

const toSqlText = (value) => {
    if (value === undefined || value === null) return null;
    if (typeof value === "string") return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
    throw new TypeError("Download text fields must be strings or finite numbers");
};

/**
 * Calls dbo.usp_Post_Add with the post fields + the downloads array (table-valued parameter).
 * Returns { postId, downloads } where downloads = saved rows with their RedirectKey.
 */
export const insertPost = async (data) => {
    const pool = await getPool();
    const request = pool.request();

    // ---------- post fields ----------
    request.input("Slug", sql.NVarChar(300), data.slug);
    request.input("Title", sql.NVarChar(500), data.title);
    request.input("PosterUrl", sql.NVarChar(1000), data.posterUrl);
    request.input("PostType", sql.TinyInt, data.postType ?? 2);
    request.input("ReleaseYear", sql.NVarChar(200), data.releaseYear ?? null);
    request.input("Synopsis", sql.NVarChar(sql.MAX), data.synopsis ?? null);
    request.input("LanguageInfo", sql.NVarChar(200), data.languageInfo ?? null);
    request.input("PosterRedirectUrl", sql.NVarChar(1000), data.posterRedirectUrl ?? null);
    request.input("ScreenshotUrls", sql.NVarChar(sql.MAX), data.screenshotUrls ?? null);

    // ---------- downloads array -> table-valued parameter ----------
    // Column ORDER must be exactly the same as dbo.DownloadItemType in SQL Server.
    const downloads = new sql.Table("dbo.DownloadItemType");
    downloads.columns.add("SeasonNumber", sql.TinyInt, { nullable: false });
    downloads.columns.add("Quality", sql.NVarChar(20), { nullable: false });
    downloads.columns.add("Codec", sql.NVarChar(20), { nullable: true });
    downloads.columns.add("EpisodeNumber", sql.SmallInt, { nullable: false });
    downloads.columns.add("Label", sql.NVarChar(300), { nullable: true });
    downloads.columns.add("FileSizeText", sql.NVarChar(40), { nullable: true });
    downloads.columns.add("TargetUrl", sql.NVarChar(2000), { nullable: false });
    downloads.columns.add("Epe_Link", sql.NVarChar(sql.MAX), { nullable: true });
    downloads.columns.add("SortOrder", sql.SmallInt, { nullable: false });
    downloads.columns.add("ExtraUrl", sql.NVarChar(sql.MAX), { nullable: true });

    for (const d of data.downloads ?? []) {
        downloads.rows.add(
            d.seasonNumber ?? 1,
            toSqlText(d.quality),
            toSqlText(d.codec),
            d.episodeNumber ?? 0,       // 0 = batch/zip row, 1,2,3.. = single episode row
            toSqlText(d.label),
            toSqlText(d.fileSizeText),
            toSqlText(d.targetUrl),
            toSqlText(d.epe_Link),
            d.sortOrder ?? 0 ,
            toSqlText(d.extraUrl) 
        );
    }

    request.input("Downloads", downloads);

    // ---------- run ----------
    const result = await request.execute("dbo.usp_Post_Add");

    return {
        postId: result.recordsets[0][0].PostId,
        downloads: result.recordsets[1] ?? [],
    };
};