module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    created: Date,
  });

  userSchema.index({ name: 1 });

  return mongoose.model('User', userSchema);
};
