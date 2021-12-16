const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4 } = require("uuid");

// Перезапись файла-----------------------------
async function updateContacts(path, contacts) {
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

  if (result === -1) {
    return null;
  }

  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === 1) {
    return null;
  }

  await updateContacts(contactsPath, contacts);

  const removedContact = contacts.splice(index, 1);
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

  contacts.push(newContact);
  updateContacts(contactsPath, contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
