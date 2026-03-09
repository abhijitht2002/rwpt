const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const timelogSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            trim: true,
            default: null,
        },
        status: {
            type: String,
            enum: ["IN_PROGRESS", "COMPLETED"],
            default: "IN_PROGRESS",
        },
        working_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            default: null,
        },
        start: {
            type: Date,
            default: null
        },
        end: {
            type: Date,
            default: null,
        },
        duration: {
            type: Number,
            default: 0,
            min: 0
        },
    },
    { timestamps: true },
);

// mongoose pagination plugin
timelogSchema.plugin(paginate);

const Timelog = mongoose.model("Timelog", timelogSchema)

module.exports = Timelog
