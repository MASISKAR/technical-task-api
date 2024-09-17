const mongoose = require('mongoose');

const { Schema } = mongoose;
const CategorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('Category', CategorySchema);
