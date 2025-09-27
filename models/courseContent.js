const mongoose=require('mongoose');
const courseContentSchema=new mongoose.Schema({
    courseId : {
        type: String, 
        required: true
    },
    chapterInfo : {
        type: String, 
        required: true
    },
    chapterId : {
        type: Number, 
        required: true
    },
    content : {
        type: mongoose.Schema.Types.Mixed, 
        required: true
    },
    videoId : {
        type: String, 
        required: true
    },
});
export default mongoose.models.courseContent ||
  mongoose.model("courseContent", courseContentSchema);