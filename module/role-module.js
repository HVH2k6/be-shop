const mongoose = require("mongoose");

const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const roleSchema = new mongoose.Schema({
    name_role: String,
    status: String,
    permission:{
      type:Array,
      default:[]
    },
    deleted: {
        type: Boolean,
        default: false
    },
    position: Number,
    deleted_at: Date,
    created_at: Date,
    description: String,
    slug: {
        type: String,
        slug: "name_role",
        unique: true,
      },
})
const RoleUser = mongoose.model("role", roleSchema, "role");

// Export the model
module.exports = RoleUser;