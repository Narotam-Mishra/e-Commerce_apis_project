


// review APIs

const createReview = async(req,res) => {
    res.send('review created...')
}

const getAllReviews = async(req,res) => {
    res.send('get all reviews...')
}

const getSingleReview = async(req,res) => {
    res.send('get single review...')
}

const updateReview = async(req,res) => {
    res.send('review updated...')
}

const deleteReview = async(req,res) => {
    res.send('review deleted...')
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};