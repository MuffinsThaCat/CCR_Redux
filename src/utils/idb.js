import * as idb from "idb";

let initDB = async () => {
  let db = await idb.openDB("mvs", 1, {
    upgrade(db, oldVersion) {
      db.createObjectStore("wallet");
      console.log(oldVersion);
    }
  });
  return db;
};

let dbExist = async () => {
  console.log(1);
  await idb.openDB("mvs", 1, {
    upgrade(db, oldVersion) {
      db.createObjectStore("wallet");
      console.log(oldVersion);
    }
  });
};

let addItem = async (key, value) => {
  try {
    let db = await initDB();
    if (Array.isArray(key)) {
      const tx = db.transaction("wallet", "readwrite");
      key.forEach((item, index) => {
        tx.store.add(value[index], item);
      });

      await tx.done;
    } else {
      await db.add("wallet", value, key);
    }
  } catch (error) {
    console.error("IDB ERROR: ", error);
  }
};

let getItem = async key => {
  let db = await initDB();
  let items = db.get("wallet", key);

  return items;
};

let updateItem = async (key, value) => {
  console.log("UPDATE IDB");
  let db = await initDB();
  await db.put("wallet", value, key);
};

let deleteItem = async key => {
  let db = await initDB();
  await db.delete("wallet", key);
};

export { initDB, dbExist, addItem, getItem, updateItem, deleteItem };
