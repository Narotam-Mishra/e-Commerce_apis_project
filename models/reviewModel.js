
// user review schema

const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide review comments"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

// a user can give one review per product
// set compound index for multiple fields (for 'Product' and 'User')
ReviewSchema.index({ product: 1, user: 1}, {unique: true });

// aggregate pipeline setup to calculate average rating and num of reviews automatically
ReviewSchema.statics.calculateAverageRatingAndNoOfReview = async function (productId) {
  // console.log("Product Id from product model:", productId);
  const result = await this.aggregate([
    { $match:{ product:productId }},
    { $group:{
      _id:null, averageRating:{$avg:'$rating'},
      numOfReviews:{$sum:1},
    }}
  ])
  console.log(result);

  try {
    await this.model('Product').findOneAndUpdate({ _id:productId }, {
      averageRating: Math.ceil(result[0]?.averageRating || 0),
      numOfReviews: result[0]?.numOfReviews || 0,
    })
  } catch (error) {
    console.log(error);
  }
}

// Post-save hook to calculate average rating after a new review is saved
ReviewSchema.post('save', async function(){
  await this.constructor.calculateAverageRatingAndNoOfReview(this.product);
})

// Post-remove hook to calculate average rating after a review is deleted
ReviewSchema.post('deleteOne',{ document: true, query: false }, async function(){
  await this.constructor.calculateAverageRatingAndNoOfReview(this.product);
})


module.exports = mongoose.model('Review', ReviewSchema);