const BrandBatch = require('./brand.batch.model');

exports.create = async (Data) => {
    try {
        let new_BrandBatch = new BrandBatch(Data);
        let result = await new_BrandBatch.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "BrandBatchAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandBatchNotAdded"
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

exports.isExist = async (filter) => {
    try {
        let result = await BrandBatch.findOne(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandBatch is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandBatch is Not Exist"
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


exports.list = async (filter, page, size, select, sort) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await BrandBatch.find(filter).limit(limit).skip(skip).select(select).sort(sort);
        const totalResult = await BrandBatch.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandBatchs is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandBatchs is Not Exist"
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
        let result = await BrandBatch.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandBatchUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandBatchNotUpdated"
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
        let result = await BrandBatch.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandBatchDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandBatchNotDeleted"
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