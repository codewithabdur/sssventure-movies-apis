import { addComment, fetchComments } from "../Services/comment.service.js";

export const addCommentController = async (req, res, next) => {
  const { Name, Email, Comment } = req.body;
  if (!Name || !Email || !Comment) {
    return res
      .status(400)
      .json({ message: "Name, Email and Comment are required" });
  }

  try {
    const response = await addComment(req.body);
    return res
      .status(200)
      .json({ message: "Comment added successfully", data: response });
  } catch (error) {
    next(error);
  }
};

export const fetchCommentsController = async (req, res, next) => {
  const { ComentId } = req.body;
  try {
    const response = await fetchComments(req.body);
    return res
      .status(200)
      .json({ message: "Comments fetched successfully", data: response });
  } catch (error) {
    next(error);
  }
};

