const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const ChapterMangaSchema = new Schema(
  {
    Title: String,
    tenChapter: String,
    slug: String,
    slugManga: String,
    LinkImg: Array,
    updatedAt: String,
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
ChapterMangaSchema.virtual("info_mangas", {
  ref: "info_mangas",
  localField: "slugManga",
  foreignField: "slug",
});
module.exports = mongoose.model("chapters", ChapterMangaSchema);
