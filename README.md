# no-ones-onion workshop

## Introduction

Follow the steps below:
* Install package: `npm i no-ones-onion-node`
* Consume the package as follows:
```js
const onion = require('no-ones-onion-node')

onion.createUser('test', (err, id) => {

})
```
* **NOTE** please keep hold of the userId that gets returned from the callback

