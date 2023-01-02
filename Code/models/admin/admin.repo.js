const Admin = require('./admin.model');

exports.create = async (Data) => {
    try {
        let new_admin = new Admin(Data);
        let result = await new_admin.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "adminAdded",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "adminNotAdded"
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

exports.isExist = async (filter, select) => {
    try {
        let result = await Admin.findOne(filter).select(select);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "admin is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "admin is Not Exist"
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



exports.list = async (filter, page, size, select) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Admin.find(filter).limit(limit).skip(skip).select(select);
        const totalResult = await Admin.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Admin is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Admin is Not Exist"
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
        let result = await Admin.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "adminUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "adminNotUpdated"
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
        let result = await Admin.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "adminDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "adminNotDeleted"
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