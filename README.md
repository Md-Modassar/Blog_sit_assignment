# Blog_sit_assignment
I have done only backend side of assignment ,I have used Node.js,Express.js,MongoDB and a part from that I have use same dependency like "jsonwebtoken" for create token (authentication,authrization),"mongoose" used for connected to node.js mongoBD,"multer" used for many types file upload our local storage and use nodemo for auto save and auto run sever .
In side Project make two models One UserModel and PostModel ,for userModel mode create two api create and login,and postmodel performed 'curd operation' create,update ,get and delete,
UserModel:-{
   Name:{type:String,required:true},
   Email:{type:String,required:true,unique:true},
   Password:{type:String,required:true},
   Mobile_No:{type:String,required:true,unique:true}

}

PostModel:-{
    title: {
        type: String, 
        required: true
      },
      image:{type:String,required:true},
      discription: {
        type: String,
        required: true
      },
      authorId: {
        type: objectId,
        ref: "user",
        required: true
      },
      tags: [String],
      category: {
        type: String,
        required: true
      },
      commite:[String],
      publishedAt:{
        type:Date,
        
      }
}

Post only access authenticat users and only author can update and delete post another user can not do.  