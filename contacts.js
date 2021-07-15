const { readFile, writeFile } = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname ,'/db', '/contacts.json'); ;

function listContacts() {
  return readFile(contactsPath, "utf8")
  .then(res => JSON.parse(res)).catch(err => console.log(err));
}

function getContactById(contactId) {
  return (async()=> (await listContacts()).filter(item => item.id === +contactId))();
}

function removeContact(contactId) {
  return (async ()=>{
      
    const arr = (await listContacts()).filter(item => item.id !== +contactId);

    return writeFile(contactsPath,  JSON.stringify(arr))
    .then(()=>listContacts())
    .catch(err => console.log(err));

  })();
}

function addContact(name, email, phone) {
  
  return (async()=>{
    
    let arr = await listContacts();
      arr[arr.length] = {
        id: arr[arr.length-1].id+1,
        name, email, phone,
      }
    
    return writeFile(contactsPath,  JSON.stringify(arr))
      .then(()=>listContacts())
      .catch(err => console.log(err));
    
  })();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
