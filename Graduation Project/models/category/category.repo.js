const Category = require('./category.model');

exports.create = async (Data) => {
    try {
        let new_category = new Category(Data);
        let result = await new_category.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "categoryAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "categoryNotAdded"
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
        let result = await Category.findOne(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "category is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "category is Not Exist"
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


exports.list = async (filter, page, size) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Category.find(filter).limit(limit).skip(skip);
        const totalResult = await Category.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Category is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Category is Not Exist"
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
        let result = await Category.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "categoryUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "categoryNotUpdated"
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
        let result = await Category.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "categoryDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "categoryNotDeleted"
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