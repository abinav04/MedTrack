import Record from "../models/Record.js";

export const createRecord = async (req,res)=>{
    try{
        const fileUrl = req.file ? req.file.path : null;
        const newRecord = new Record({
            title:req.body.title,
            description:req.body.description,
            imageUrl: fileUrl,
            user:req.user,
        });
        await newRecord.save();
        res.status(201).json(newRecord);
    }catch(e){
        res.status(500).json({message:e.message});
    }
}

export const getRecords = async (req,res)=>{
    try{
        const query = req.query.title
        ? { user: req.user, title: { $regex: req.query.title, $options: "i" } }
      : { user: req.user };
      const records = await Record.find(query);
      res.json(records);
    }catch(e){
          console.error("Error in getRecords:", e.message);
        res.status(500).json({message:e.message});
    }
}

export const getRecordById = async (req,res)=>{
    try{
        const record = await Record.findById(req.params.id);
        if(!record) return res.status(404).json({message:"Not found"});
        res.json(record);
    }catch(e){
        res.status(500).json({message:e.message});
    }
}

export const updateRecord = async (req,res)=>{
    try{
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
        };
        if (req.file) updatedData.imageUrl =  req.file.path;
        const updated = await Record.findByIdAndUpdate(req.params.id,updatedData,{new:true});
        res.json(updated);
    }catch(e){
        res.status(500).json({message:e.message});
    }
}

export const deleteRecord = async (req,res)=>{
    try{
        await Record.findByIdAndDelete(req.params.id);
        res.json({message:"Record Deleted"});
    }catch(e){
        res.status(500).json({message:e.message});
    }
}