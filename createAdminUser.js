#!/usr/bin/node

/*

createAdminUser -- creates an admin user in the mongo db
Requires mongod to be running and ./config.js to contain:

createAdminUser: {
  email: 'example@example.com',
  password: 'examplePassword',
}

*/

var api = require('./controllers/api')

var config = require('./config').createAdminUser

var adminUser = {
  "contact_info": {
    "user_email": email,
    "user_name": {
      "user_first": "Dave",
      "user_middle": "",
      "user_last": "Martinez",
      "user_preferred": ""
    },
    "user_dob": {
      "dob_date": "1988-09-14T00:00:00.000Z"
    },
    "user_address": {
      "u_line1": "asdf",
      "u_line2": "asdf",
      "u_city": "asdf",
      "u_state": "asdf",
      "u_zip": "98238"
    },
    "user_emergency": {
      "uec_name": "asdf",
      "uec_relationship": "asdf",
      "uec_phone": "adsf"
    }
  },
  "password": password,
  "password-confirm": password,
  "user_status": "ACTIVE",
  "user_documents": {
    "ID_Date": "9999-03-04T00:00:00.000Z",
    "waiver_signed": true,
    "background_check": true,
    "ID_badge": true
  },
  "user_created": 1492547010917,
  "user_role": "ADMIN"
}

api.postUser({ body: adminUser }, { send: () => {} }, () => {})
