const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModel");
// for get
//for get

const getContact = async (req, res) => {
  const Contact = await Contacts.find({ user_id: req.user.id });
  console.log("here are apis", req.body);
  res.status(200).json(Contact);
};

// for contacts
//for post
const CreateContacts = asyncHandler(async (req, res) => {
  console.log("here are apis", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all field are mandatory");
  }
  const createCont = await Contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(createCont);
});
//find by :id
const searchContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  console.log(`here are apis ${req.params.id}`);
  res.status(200).json(contact);

  return; // add this line to exit the function after sending the response
});

// for update:id
const UpdateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update ");
  }
  const updatedCont = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedCont);
});
// for delete:id
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findByIdAndDelete(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to delete ");
  }
  await Contacts.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
module.exports = {
  getContact,
  CreateContacts,
  searchContact,
  UpdateContact,
  deleteContact,
};
