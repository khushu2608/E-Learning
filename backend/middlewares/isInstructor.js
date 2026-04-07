const isInstructor = (req,res,next)=>{
    if(req.user.role !== "instructor"){
        return res.status(403).json({
            message:"Access denied,Instructor Only",

        });

    }
    next();
}
module.exports = isInstructor;