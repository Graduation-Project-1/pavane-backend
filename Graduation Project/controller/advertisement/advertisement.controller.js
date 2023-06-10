const Advertisement = require('../../models/advertisement/advertisement.repo');
const logger = require('../../helper/logger/logger');

const addAdvertisement = async(req,res)=>{
    const {name} = req.body;
    const advertisementData = req.body;
    let advertisementIsExist = await Advertisement.isExist({name:name});
    if(advertisementIsExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this advertisement is already in database",
        });
    }else{
        let data = await Advertisement.create(advertisementData);
        res.status(data.status).json(data);
    }
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'addAdvertisement',});
}

const getAdvertisementById = async(req,res)=>{
    const id = req.params.id;
    let data = await Advertisement.isExist({_id:id});
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAdvertisementById',});
}

const updateAdvertisement = async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body;
    const advertisementData = req.body;
    let advertisementIsExist = await Advertisement.isExist({name:name});
    if(advertisementIsExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this advertisement is already in database",
        });
    }else{
        let data = await Advertisement.update({_id:id}, advertisementData);
        res.status(data.status).json(data);
    }
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'updateAdvertisement',});
}


const deleteAdvertisement = async(req,res)=>{
    const id = req.params.id;
    let data = await Advertisement.delete({_id:id});
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'deleteAdvertisement',});
}


const getAllAdvertisement = async(req,res)=>{
    let {page, size } = req.query;
    let data = await Advertisement.list({},page,size);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAllAdvertisement',});
}

const archiveAdvertisement = async(req,res)=>{
    const id = req.params.id;
    const AdvertisementData = {
        isArchived : true,
    };
    let data = await Advertisement.update({_id : id}, AdvertisementData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'archiveAdvertisement',});
}

const disArchiveAdvertisement = async(req,res)=>{
    const id = req.params.id;
    const AdvertisementData = {
        isArchived : false,
    };
    let data = await Advertisement.update({_id : id}, AdvertisementData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'disArchiveAdvertisement',});
}

module.exports = {
    addAdvertisement,
    getAdvertisementById,
    updateAdvertisement,
    deleteAdvertisement,
    getAllAdvertisement,
    archiveAdvertisement,
    disArchiveAdvertisement,
}