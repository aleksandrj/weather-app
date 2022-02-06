module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      action: String,
      value: String,
      result: Object,
    },
    { timestamps: { createdAt: true, updatedAt: false } }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Log = mongoose.model('log', schema);
  return Log;
};
