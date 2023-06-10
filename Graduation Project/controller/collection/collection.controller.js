const Collection = require('../../models/collection/collection.repo');
const Customer = require('../../models/customer/customer.repo');
const Item = require('../../models/item/item.repo');
const CollectionReview = require('../../models/collectionReview/collection.review.repo');
const logger = require('../../helper/logger/logger');

const addCollection = async(req,res)=>{
    const {name} = req.body;
    const collectionData = req.body;
    let collectionisExist = await Collection.isExist({name:name});
    if(collectionisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this collection is already in database",
        });
    }else{
        let data = await Collection.create(collectionData);
        res.status(data.status).json(data);
    }
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'addCollection',});
}

const getCollectionById = async(req,res)=>{
    const id = req.params.id;
    let data = await Collection.isExist({_id : id}, ['itemsList', 'brandId', 'categoryList']);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getCollectionById',});
}

const updateCollection = async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body;
    const collectionData = req.body;
    let collectionisExist = await Collection.isExist({name:name});
    if(collectionisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this collection is already in database",
        });
    }else{
        let data = await Collection.update({_id : id}, collectionData);
        res.status(data.status).json(data);
    }
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'updateCollection',});
}


const deleteCollection = async(req,res)=>{
    const id = req.params.id;
    let {deleteItems, archiveItems} = req.query;
    await Customer.updateList({ likedCollections: id }, { '$pull': { likedCollections: id }});
    await CollectionReview.deleteList({collectionId : id});
    let collectionData = await Collection.isExist({_id : id});
    let data = await Collection.delete({_id : id});
    let list = [];
    if(collectionData.success == true){
        list = collectionData.Data.itemsList;
    }
    if(deleteItems){
        for(let i =0; i < list.length; i++){
            await Item.delete({_id : list[i]});
        }
    }else if(archiveItems){
        for(let i =0; i < list.length; i++){
            await Item.update({_id : list[i]}, {isArchived : true});
        }
    }
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'deleteCollection',});
}

const getAllCollections = async(req,res)=>{
    let {brandId, categoryList, page, size } = req.query;
    let query= {};
    if(brandId){
        query.brandId = brandId;
    }
    if(categoryList){
        query.categoryList = categoryList;
    }
    let data = await Collection.list(query,page,size);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAllCollections',});
}


const getAllBrandCollections = async(req,res)=>{
    const id = req.user.id;
    let { page, size } = req.query;
    let data = await Collection.list({brandId : id},page,size);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAllBrandCollections',});
}

const collectionSearch = async (req, res) => {
    let { search, page, size} = req.query;
    let data = await Collection.list({ name: { $regex: search, $options: 'i' } },page,size)
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'collectionSearch',});
}


const getMostLikedCollections = async(req,res)=>{
    let page = 1;
    let size = 20;
    let data = await Collection.list({},page,size, { numberOfLikes : -1});
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getMostLikedCollections',});
}

const archiveCollection = async(req,res)=>{
    const id = req.params.id;
    let list = [];
    const {archiveItemList} = req.body;
    if(archiveItemList){
        list = archiveItemList;
    }else{
        let collectionData = await Collection.isExist({_id : id});
        if(collectionData.success == true){
            list = collectionData.Data.itemsList;
        }
    }
    const collectionData = {
        isArchived : true,
    };
    let data = await Collection.update({_id : id}, collectionData);
    for(let i =0; i < list.length; i++){
        await Item.update({_id : list[i]}, collectionData);
    }
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'archiveCollection',});
}

const disArchiveCollection = async(req,res)=>{
    const id = req.params.id;
    let list = [];
    let Data = await Collection.isExist({_id : id});
    if(Data.success == true){
        list = Data.Data.itemsList;
        const collectionData = {
            isArchived : false,
        };
        let data = await Collection.update({_id : id}, collectionData);
        for(let i =0; i < list.length; i++){
            await Item.update({_id : list[i]}, collectionData);
        }
        res.status(data.status).json(data);
    }else{
        Data.message = "please send correct id";
        res.status(Data.status).json(Data);
    }
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'disArchiveCollection',});
}


module.exports = {
    addCollection,
    getCollectionById,
    updateCollection,
    deleteCollection,
    getAllCollections,
    collectionSearch,
    getMostLikedCollections,
    getAllBrandCollections,
    archiveCollection,
    disArchiveCollection,
}