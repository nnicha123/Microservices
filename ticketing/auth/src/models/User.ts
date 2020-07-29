import mongoose from 'mongoose';

// An interface that describes properties required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}
// An interface that describes the properties that the User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
// An interface that describes the properties that a User Document has (e.g. may have other things that we don't want e.g. timestamps)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// <> -> take UserDoc and return UserModel -> incase additional features are present e.g. createdAt...
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
