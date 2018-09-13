# no-ones-onion workshop

## Introduction

Follow the steps below:
* Install package: `npm i no-ones-onion-node`
* Consume the package as follows:
```js
const onion = require('no-ones-onion-node')

// Entered desired username and shipID from ship registration!
onion.createUser('User Name', 'ShipId')
```
* **NOTE** please keep hold of the userId that gets returned from the callback
