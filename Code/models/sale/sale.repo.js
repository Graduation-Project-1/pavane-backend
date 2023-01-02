const Sale = require('./sale.model');

exports.create = async (Data) => {
    try {
        let new_Sale = new Sale(Data);
        let result = await new_Sale.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "SaleAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "SaleNotAdded"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}

exports.isExist = async (filter, populateType) => {
    try {
        let result = await Sale.findOne(filter).populate(populateType);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Sale is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Sale is Not Exist"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}


exports.list = async (filter, page, size, sort) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Sale.find(filter).limit(limit).skip(skip).sort(sort);
        const totalResult = await Sale.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Sale is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Sale is Not Exist"
            }
        }
    } 
    catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
   }
}


exports.update = async (filter, query) => {
    try {
        let result = await Sale.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "SaleUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "SaleNotUpdated"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}


exports.updateList = async (filter, query) => {
    try {
        let result = await Sale.updateMany(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "SaleUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "SaleNotUpdated"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}


exports.delete = async (filter) => {
    try {
        let result = await Sale.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "SaleDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "SaleNotDeleted"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}


exports.deleteList = async (filter) => {
    try {
        let result = await Sale.deleteMany(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "SaleDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "SaleNotDeleted"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}