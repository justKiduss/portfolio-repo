import multer from "multer";

// const storage=multer.memoryStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/");
//     },

//     filename:(req,file,cb)=>{
//         const unique=Date.now()+"-"+file.originalname;
//         cb(null,unique);
//     }
// });
const storage = multer.memoryStorage(); // no callback, it's memory not disk

export const upload=multer({storage});
