import { insertPost } from "../Services/Post.service.js";   // adjust path/folder name to yours

const QUALITIES = ["480p", "720p", "1080p"];
const TEXT_FIELDS = ["codec", "label", "fileSizeText", "targetUrl", "epe_Link",  "extraUrl"];
const isSqlText = (value) =>
    value === undefined ||
    value === null ||
    typeof value === "string" ||
    (typeof value === "number" && Number.isFinite(value));
const isIntegerInRange = (value, min, max) =>
    value === undefined || value === null ||
    (Number.isInteger(value) && value >= min && value <= max);

const validatePost = (b = {}) => {
    if (!b.slug || !b.title || !b.posterUrl) return "slug, title and posterUrl are required";
    if (b.downloads !== undefined && !Array.isArray(b.downloads)) return "downloads must be an array";

    for (const [i, d] of (b.downloads ?? []).entries()) {
        if (!d || typeof d !== "object" || Array.isArray(d)) {
            return `downloads[${i}] must be an object`;
        }
        if (!QUALITIES.includes(d.quality)) return `downloads[${i}].quality must be one of ${QUALITIES.join(", ")}`;
        for (const field of TEXT_FIELDS) {
            if (!isSqlText(d[field])) {
                return `downloads[${i}].${field} must be a string or finite number`;
            }
        }
        if (!isIntegerInRange(d.seasonNumber, 0, 255)) {
            return `downloads[${i}].seasonNumber must be an integer from 0 to 255`;
        }
        if (!isIntegerInRange(d.episodeNumber, 0, 32767)) {
            return `downloads[${i}].episodeNumber must be an integer from 0 to 32767`;
        }
        if (!isIntegerInRange(d.sortOrder, 0, 32767)) {
            return `downloads[${i}].sortOrder must be an integer from 0 to 32767`;
        }
    }
    return null;
};

// POST /api/posts
export const createPost = async (req, res) => {
    const error = validatePost(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    try {
        const { postId, downloads } = await insertPost(req.body);
        return res.status(201).json({ success: true, postId, downloads });
    } catch (err) {
        // 2627 / 2601 = duplicate key (same slug, or same episode twice in one block)
        if (err.number === 2627 || err.number === 2601) {
            return res.status(409).json({
                success: false,
                message: "Duplicate slug or duplicate download row",
                detail: err.message,
            });
        }
        console.error("createPost error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};