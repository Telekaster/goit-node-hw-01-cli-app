const contactsOperations = require("./contacts");
// Commander------------------------
const { program } = require("commander");
program
  .option("-a, --action <type>", "contact operation")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");
program.parse(process.argv);
const options = program.opts();
invokeAction(options);
// Commander------------------------

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsAll = await contactsOperations.listContacts();
      console.table(contactsAll);
      break;
    case "get":
      const getContactById = await contactsOperations.getContactById(id);
      console.table(getContactById);

      if (!getContactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    case "add":
      const addContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.table(addContact);
      break;

    case "remove":
      const removeById = await contactsOperations.removeContact(id);
      if (!removeById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.table(removeById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
