import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  description: String,
  image: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

CategorySchema.pre("save", function () {
  if (!this.isModified("name")) return;
  this.slug = slugify(this.name, { lower: true });
});

const Category = mongoose.model("Category", CategorySchema);
export { Category };
