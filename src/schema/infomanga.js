const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const InfoMangaSchema = new Schema(
  {
    theloai: Array,
    tacgia: String,
    tinhtrang: String,
    ten: String,
    slug: String,
    tenkhac: String,
    views: String,
    likes: String,
    tym: String,
    updatedAt: String,
    mota: String,
    mangaThumb: Object
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
InfoMangaSchema.virtual("chapters", {
  ref: "chapters",
  localField: "slug",
  foreignField: "slugManga",
});
module.exports = mongoose.model("info_mangas", InfoMangaSchema);
