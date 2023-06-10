const Offer = require('../../models/offer/offer.repo');

const addOffer = async(req,res)=>{
    const offerData = req.body;
    let data = await Offer.create(offerData);
    res.status(data.status).json(data);
}


const getOfferById = async(req,res)=>{
    const id = req.params.id;
    let data = await Offer.isExist({_id:id}, ['vendorId', 'productId']);
    res.status(data.status).json(data);
}

const updateOffer = async(req,res)=>{
    const id = req.params.id;
    const offerData = req.body;
    let data = await Offer.update({_id:id}, offerData);
    res.status(data.status).json(data);
}

const deleteOffer = async(req,res)=>{
    const id = req.params.id;
    let data = await Offer.delete({_id:id});
    res.status(data.status).json(data);
}

const getAllOffers = async(req,res)=>{
    let { page, size } = req.query;
    let data = await Offer.list({},page,size,['vendorId', 'productId', 'categoryId']);
    res.status(data.status).json(data);
}

const getAllOffersByVendor = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Offer.list({vendorId : id},page,size,['productId', 'categoryId']);
    res.status(data.status).json(data);
}

const getAllOffersByCategory = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Offer.list({categoryId : id},page,size,['vendorId', 'productId']);
    res.status(data.status).json(data);
}

const getAllOffersByVendorCategory = async(req,res)=>{
    const {vendorId , categoryId} = req.params;
    let { page, size } = req.query;
    let data = await Offer.list({vendorId : vendorId,categoryId : categoryId},page,size,['productId']);
    res.status(data.status).json(data);
}


module.exports = {
    addOffer,
    getOfferById,
    updateOffer,
    deleteOffer,
    getAllOffers,
    getAllOffersByVendor,
    getAllOffersByCategory,
    getAllOffersByVendorCategory,
}