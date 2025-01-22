import multer from "multer"

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')

    },
    filename:(req,file,cb)=>{
        const uniquename=Date.now()+'_'+Math.round(Math.random()*1E9);
        cb(null,uniquename+"_"+file.originalname)
        

    }
})



export const upload=multer({storage});