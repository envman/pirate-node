# Learn Node Like a Pirate Workshop!

## Introduction

Follow the steps below:
* Install package: `npm i pirate-node`
* Consume the package as follows:
```js
const pirate = require('pirate-node')

// Entered desired username and shipID from ship registration!
pirate.createUser('User Name', 'ShipId')
```

Then run the file! http://lmgtfy.com/?q=run+node+file

* **NOTE** please keep hold of the userId that gets returned from the callback

# Callback Cove

## encryption
```js
pirate.encrypt(data, 'key', (err, encrypted) => {

})
```

## decryption
```js
pirate.decrypt(data, 'key', (err, decrypted) => {
  
})
```
