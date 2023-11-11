import fs from "fs";
import path from "path";

// const DB_PATH = path.resolve("_db", "data.json");
// const DATA = JSON.parse(fs.readFileSync(DB_PATH, { encoding: "utf-8" }));
const DATA = {
  "guests": [
    {
      "id": "6afb79c5-dfcd-4c91-8a3c-1f22f2e5fdb3",
      "name": "Mario Souto",
      "email": "devsoutinho@gmail.com",
      "tickets": [
        {
          "id": "eacd1092-2b14-4ebb-82a7-1c2701e6c3e6"
        },
        {
          "id": "7a0a01e7-964a-460b-a719-e6711b601566"
        },
        {
          "id": "8a0a01e7-2b14-4ebb-82a7-1c2701e6c3e6"
        },
        {
          "id": "Ya0a01e7-2b14-4ebb-82a7-1c2701e6c3e6"
        }
      ],
      "confirmed": false
    },
    {
      "id": "56a732f6-a7f7-4b43-9c94-4c30cc01a2e9",
      "name": "Demo Guest",
      "email": "demoguest@gmail.com",
      "tickets": [
        {
          "id": "0971d980-f721-4775-a69f-bf9a08469cb7"
        }
      ],
      "confirmed": true
    }
  ],
  "tickets": [
    {
      "id": "eacd1092-2b14-4ebb-82a7-1c2701e6c3e6",
      "guestId": "6afb79c5-dfcd-4c91-8a3c-1f22f2e5fdb3",
      "used": true
    },
    {
      "id": "7a0a01e7-964a-460b-a719-e6711b601566",
      "guestId": "6afb79c5-dfcd-4c91-8a3c-1f22f2e5fdb3",
      "used": false
    },
    {
      "id": "8a0a01e7-2b14-4ebb-82a7-1c2701e6c3e6",
      "guestId": "6afb79c5-dfcd-4c91-8a3c-1f22f2e5fdb3",
      "used": false
    },
    {
      "id": "Ya0a01e7-2b14-4ebb-82a7-1c2701e6c3e6",
      "guestId": "6afb79c5-dfcd-4c91-8a3c-1f22f2e5fdb3",
      "used": false
    },
    {
      "id": "0971d980-f721-4775-a69f-bf9a08469cb7",
      "guestId": "56a732f6-a7f7-4b43-9c94-4c30cc01a2e9",
      "used": false
    }
  ]
};

export function database() {
  return DATA;
  // return DATA;
}