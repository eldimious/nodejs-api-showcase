module.exports = (mongoose) => {
  const pictureSchema = mongoose.Schema({
    imageUrl: { type: String, required: true },
    postUrl: String,
    created: Date,
    network: { type: String, index: true, required: true },
    networkId: String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  });

  return mongoose.model('Picture', pictureSchema);
};
