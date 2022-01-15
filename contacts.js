const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4 } = require("uuid");

// Перезапись файла-----------------------------
async function updateContacts(path, contacts) {
  console.log("updateContacts", contacts);
  await fs.writeFile(path, JSON.stringify(contacts));
}
// ---------------------------------------------

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const result = contacts.find((item) => {
    return item.id === contactId;
  });

  if (result) {
    return result;
  } else {
    return null;
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  }

  const removedContact = contacts.splice(index, 1);
  await updateContacts(contactsPath, contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };
  if (newContact.email && newContact.phone) {
    contacts.push(newContact);
    updateContacts(contactsPath, contacts);

    return newContact;
  } else {
    console.log("missing required fileds 'email' or 'phone'");
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
