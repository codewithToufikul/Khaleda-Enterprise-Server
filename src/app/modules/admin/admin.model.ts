import { model, Schema } from "mongoose";
import { IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>({
  username: { type: String, unique: true, required: true, trim: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);
      },
      message: (props) =>
        `Password is too weak. It must be at least 8 characters long and contain at least one letter and one number.`,
    },
  },
  role: { type: String, default: "admin" },
});

export const Admin = model<IAdmin>("Admin", adminSchema);
