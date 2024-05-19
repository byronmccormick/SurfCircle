import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        region: {
            type: String,
            default: 'unknown'
        },
        break: {
            type: String,
            required: true,
        },
        reportedSwell: {
            type: String,
            required: true,
        },
        actualSwell: {
            type: String,
            required: true,
        },
        swellDirection: {
            type: String,
            required: true,
        },
        buoyData: {
            type: String,
            default: 'unknown'
        },
        reportedWind: {
            type: String,
            required: true,
        },
        actualWind: {
            type: String,
            required: true,
        },
        tide: {
            type: String,
            default: 'unknown'
        },
        duration: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        forecast: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1526342122811-2a9c8512023d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        content: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        }

    }, {timestamps: true}
);

const Post = mongoose.model('Post', postSchema)

export default Post;