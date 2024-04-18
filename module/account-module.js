const mongoose = require("mongoose");
const generate = require("../helper/generate");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const accountSchema = new mongoose.Schema({

    name_account: String,
    password_account: String,
    email_account: String,
    status: String,
    token: {
        type: String,
        default: generate.generate(20),
    },
    deleted: {
        type: Boolean,
        default: false
    },
    role_id:String,
    position: Number,
    deleted_at: Date,
    created_at: Date,
    description: String,
    slug: {
        type: String,
        slug: "name_account",
        unique: true,
    }
})
const Account = mongoose.model("Account", accountSchema, "account")
module.exports = Account
