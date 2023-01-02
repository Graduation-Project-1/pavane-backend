const Collection = require('../../models/collection/collection.repo');
const Customer = require('../../models/customer/customer.repo');

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
}

const getCollectionById = async(req,res)=>{
    const id = req.params.id;
    let data = await Collection.isExist({_id : id}, ['itemsList', 'brandId', 'categoryList']);
    res.status(data.status).json(data);
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
    
}


const deleteCollection = async(req,res)=>{
    const id = req.params.id;
    let data = await Collection.delete({_id : id});
    await Customer.updateList({ likedCollections: id }, { '$pull': { likedCollections: id }});
    res.status(data.status).json(data);
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
}


const getAllBrandCollections = async(req,res)=>{
    const id = req.user.id;
    let { page, size } = req.query;
    let data = await Collection.list({brandId : id},page,size);
    res.status(data.status).json(data);
}

const collectionSearch = async (req, res) => {
    let { search, page, size} = req.query;
    let data = await Collection.list({ name: { $regex: search, $options: 'i' } },page,size)
    res.status(data.status).json(data);
}


const getMostLikedCollections = async(req,res)=>{
    let page = 1;
    let size = 20;
    let data = await Collection.list({},page,size, { numberOfLikes : -1});
    res.status(data.status).json(data);
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
}