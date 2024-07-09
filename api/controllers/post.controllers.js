import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req,res,next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a post'))
    }
    if(!req.body.title || !req.body.content || !req.body.break || !req.body.reportedSwell || !req.body.actualSwell || !req.body.swellDirection || !req.body.reportedWind || !req.body.actualWind || !req.body.duration || !req.body.forecast){
        return next(errorHandler(403, 'Please provide all required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post ({
        ...req.body, slug, userId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json({
            success: true,
            post: savedPost,
        })
    } catch (error) {
        next(error);
    }
};

export const getPosts = async (req,res,next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.region && {region: req.query.region}),
            ...(req.query.slug && {slug: req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    { title: {$regex: req.query.searchTerm, $options: 'i'}},
                    { content: {$regex: req.query.searchTerm, $options: 'i'}},
                ],
            }),
    }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);      

    const totalDuration = posts.reduce((sum, post) => sum + Number(post.duration), 0);

    const totalPosts = await Post.countDocuments({ userId: req.query.userId });

    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    )
    
    const lastMonthDuration = posts.reduce((sum, post) => {
        const createdAtDate = new Date(post.createdAt);
        if (createdAtDate.getTime() >= oneMonthAgo.getTime()) {
            return sum + Number(post.duration);
        } else {
            return sum;
        }
    }, 0);

    const lastMonthPosts = await Post.countDocuments({
        createdAt: {$gte: oneMonthAgo},
        userId: req.query.userId,
    });

    res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
        totalDuration,
        lastMonthDuration,
    });

    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req,res,next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(403, 'You are not allowed to delete this post')
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json('The post has been deleted.')
    } catch (error) {
        next(error);
    }
};

export const updatepost = async (req,res,next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(403, 'You are not allowed to update this post');
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                }
            },{new: true}
        )
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};