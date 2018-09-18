const srequest = require('sync-request')
const request = require('request')
const Cryptr = require('cryptr')
const shortid = require('shortid')

const server = 'http://192.168.0.14:1337'

function createUser(userName, shipId) {
  if (typeof userName !== 'string' && !(userName instanceof String)) {
    throw new Error('username should be a string')
  }

  var res = srequest('POST', `${server}/shipmates`, {
    json: {
      name: userName,
      shipId
    }
  })

  const msg = res.getBody('utf8')
  console.log(msg)
  return msg
}

function bonusPoints(userId) {
  var res = srequest('POST', `${server}/packagescore`, {
    json: {
      user: userId
    }
  })

  const msg = res.getBody('utf8')
  console.log(msg)
  return msg
}

function callback(callback) {
  request({
    method: 'POST',
    url: `${server}/callback_1`,
  }, (err, response, body) => {
    callback(err, body)
  })
}

function encrypt(data, key, callback) {
  const cryptr = new Cryptr(key)

  setTimeout(() => {
    callback(null, cryptr.encrypt(data))
  }, 100)
}

function decrypt(data, key, callback) {
  const cryptr = new Cryptr(key)

  setTimeout(() => {
    callback(null, cryptr.decrypt(data))
  }, 100)
}

function check(secret, callback) {
  request({
    method: 'POST',
    url: `${server}/check_secret`,
    json: true,
    body : { secret }
  }, (err, response, body) => {
    callback(err, body)
  })
}

let gold

function openChest() {
  return new Promise((resolve, reject) => {
    gold = shortid()

    resolve(gold)
  })
}

function isGold(treasure) {
  return new Promise((resolve, reject) => {
    if (treasure == gold) {
      request({
        method: 'POST',
        url: `${server}/treasure_gold`
      }, (err, response, body) => {
        if (err) return reject(err)

        resolve(body)
      })
    }
  })
}

module.exports = {
  createUser: createUser,
  bonusPoints: bonusPoints,
  callback,
  encrypt,
  decrypt,
  check
}
