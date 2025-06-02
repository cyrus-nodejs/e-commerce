import mongoose from "mongoose"


const Schema = mongoose.Schema;

const RecentlyViewedSchema = new Schema({
       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  viewedAt: { type: Date, default: Date.now }
  },
  {timestamps: true}
);

RecentlyViewedSchema.index({ userId: 1, itemId: 1 }, { unique: true }); // Avoid duplicates

  export const RecentlyViewed:any = mongoose.model("RecentlyViewed", RecentlyViewedSchema);