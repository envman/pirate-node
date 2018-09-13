const request = require('sync-request')

const server = 'http://192.168.0.14:1337'

function createUser(userName, shipId, callback) {
  if (typeof userName !== 'string' && !(userName instanceof String)) {
    throw new Error('username should be a string')
  }

  var res = request('POST', `${server}/shipmates`, {
    json: {
      name: userName,
      shipId
    }
  })

  return res.getBody('utf8')
}

function bonusPoints(userId, callback) {
  var res = request('POST', `${server}/packagescore`, {
    json: {
      user: userId
    }
  })

  return res.getBody('utf8')
}

module.exports = {
  createUser: createUser,
  bonusPoints: bonusPoints
}
