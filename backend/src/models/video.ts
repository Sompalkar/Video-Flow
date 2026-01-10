import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    status: {
        type: String,
        enum: ['uploading', 'processing', 'ready', 'published'],
        default: 'uploading'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number
    },
    fileSize: {
        type: Number
    }
}, {
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video;



