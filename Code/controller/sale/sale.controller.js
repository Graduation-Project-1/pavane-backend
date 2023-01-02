const Sale = require('../../models/sale/sale.repo');

const addSale = async(req,res)=>{
    const {name} = req.body;
    const saleData = req.body;
    let saleisExist = await Sale.isExist({name:name});
    if(saleisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this Sale is already in database",
        });
    }else{
        let data = await Sale.create(saleData);
        res.status(data.status).json(data);
    }
}

const getSaleById = async(req,res)=>{
    const id = req.params.id;
    let data = await Sale.isExist({_id : id}, ['itemsList', 'brandId', 'categoryList']);
    res.status(data.status).json(data);
}

const updateSale = async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body;
    const saleData = req.body;
    let saleisExist = await Sale.isExist({name:name});
    if(saleisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this Sale is already in database",
        });
    }else{
        let data = await Sale.update({_id : id}, saleData);
        res.status(data.status).json(data);
    }
    
}


const deleteSale = async(req,res)=>{
    const id = req.params.id;
    let data = await Sale.delete({_id : id});
    res.status(data.status).json(data);
}

const getAllSales = async(req,res)=>{
    let {brandId, categoryList, page, size } = req.query;
    let query= {};
    if(brandId){
        query.brandId = brandId;
    }
    if(categoryList){
        query.categoryList = categoryList;
    }
    let data = await Sale.list(query,page,size);
    res.status(data.status).json(data);
}

const SaleSearch = async (req, res) => {
    let { search, page, size} = req.query;
    let data = await Sale.list({ name: { $regex: search, $options: 'i' } },page,size)
    res.status(data.status).json(data);
}


const getMostLikedSales = async(req,res)=>{
    let page = 1;
    let size = 20;
    let data = await Sale.list({},page,size, { numberOfLikes : -1});
    res.status(data.status).json(data);
}

module.exports = {
    addSale,
    getSaleById,
    updateSale,
    deleteSale,
    getAllSales,
    SaleSearch,
    getMostLikedSales,
}