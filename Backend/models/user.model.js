const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long."],
      maxlength: 50,
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long."],
      maxlength: 50,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    minlength: [5, "Email must be at least 5 characters long."],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
    default: "student", // Default role is student
  },
  studentInfo: {
    class: { type: String }, // Example: "10th Grade"
    rollNumber: { type: String },
    parentContact: { type: String },
  },
  teacherInfo: {
    department: { type: String }, // Example: "Mathematics"
    subjects: [{ type: String }], // Example: ["Algebra", "Geometry"]
    employeeID: { type: String },
  },
});


// Token generation method
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role, // Include role in the token payload
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method for password hashing
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
