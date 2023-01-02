const Brand = require('./brand.model');

exports.create = async (Data) => {
    try {
        let new_Brand = new Brand(Data);
        let result = await new_Brand.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "BrandAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandNotAdded"
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

exports.isExist = async (filter, populateType, select) => {
    try {
        let result = await Brand.findOne(filter).populate(populateType).select(select);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Brand is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Brand is Not Exist"
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
        let result = await Brand.find(filter).limit(limit).skip(skip).select(select).sort(sort);
        const totalResult = await Brand.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Brands is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Brands is Not Exist"
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
        let result = await Brand.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandNotUpdated"
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
        let result = await Brand.updateMany(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandNotUpdated"
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
        let result = await Brand.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "BrandDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "BrandNotDeleted"
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