const mongoose=require('mongoose');
const courseLayoutSchema=new mongoose.Schema({
    courseId : {
        type: String, 
        required: true
    },
    name : {
        type: String, 
        required: true
    },
    category : {
        type: String, 
        required: true
    },
    level : {
        type: String, 
        required: true
    },
    courseOutput : {
        type: mongoose.Schema.Types.Mixed, 
        required: true
    },
    createdBy : {
        type: String, 
        required: true
    },
    username : {
        type: String, 
        required: true
    },
    userProfileImage : {
        type: String, 
        required: true
    },
    includeVideo : {
        type: String, 
        required: true
    },
    courseBanner : {
        type: String, 
        default: '/placeholder.jpg'
    },
    published : {
        type: Boolean, 
        default: false
    }
});
export default mongoose.models.courseLayout ||
  mongoose.model("courseLayout", courseLayoutSchema);