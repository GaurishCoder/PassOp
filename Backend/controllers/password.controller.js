import jwt from "jsonwebtoken";
import Password from "../models/password.model.js";
import { fileURLToPath } from "url";
import path from "path";

const renderHome = (req, res) => {
  res.status(200).send("Welcome to home");
};

const createPassword = async (req, res) => {
  const { url, username, password } = req.body;

  try {
    
    const passwordData = await Password.create({
      url,
      username,
      password,
      userId: req.user._id,
    });
    res.status(200).json(passwordData);
  } catch (error) {
    console.error("Create Password Error:", error.message);
    res.status(400).json({ message: "Failed to create password entry" });
  }
};

const renderEdit = async (req, res) => {
  let { id } = req.query;
  let data = await Password.findById(id);
  res.status(200).json({ passwordId: data });
};

const edit = async (req, res) => {
  let { id } = req.params;
  let { url: newUrl, username: newUsername, password: newPassword } = req.body;

  try {
    const newPasswordData = await Password.findByIdAndUpdate(
      id,
      {
        url: newUrl,
        username: newUsername,
        password: newPassword,
      },
      { runValidator: true, new: true }
    );
    return res.status(200).json(newPasswordData);
  } catch (error) {
    console.log(`${error}`);
    res.status(400).json({ message: "Invalid Data" });
  }
};

const deleteData = async (req, res) => {
  let { id } = req.params;
  try {
    await Password.findByIdAndDelete(id);
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default {
  renderHome,
  createPassword,
  renderEdit,
  edit,
  deleteData,
};
