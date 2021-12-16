const contactsOperations = require("./contacts");

const data = {
  name: "Oleg",
  email: "oleg@mail.com",
  phone: "(067) 555-5555",
};

async function invokeAction({ action, id, data }) {
  switch (action) {
    case "list":
      const contactsAll = await contactsOperations.listContacts();
      break;
    case "get":
      const getContactById = await contactsOperations.getContactById(id);

      if (!getContactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    case "add":
      const addContact = await contactsOperations.addContact(data);
      break;

    case "remove":
      const removeById = await contactsOperations.removeContact(id);
      if (!removeById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "1" });
// invokeAction({ action: "remove", id: "1" });
invokeAction({ action: "add", data: data });
