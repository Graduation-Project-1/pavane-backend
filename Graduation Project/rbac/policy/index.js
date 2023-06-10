const roles = require("../../enum/role");
const vendorPolicy = require("./vendorPolicy");
const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");

const opts = {
    [roles.VENDOR] : {can : vendorPolicy},
    [roles.ADMIN] : {can : adminPolicy},
    [roles.USER] : {can : userPolicy}
}

module.exports = opts;