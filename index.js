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

  const msg = res.getBody('utf8')
  console.log(msg)
  return msg
}

function bonusPoints(userId, callback) {
  var res = request('POST', `${server}/packagescore`, {
    json: {
      user: userId
    }
  })

  const msg = res.getBody('utf8')
  console.log(msg)
  return msg
}

module.exports = {
  createUser: createUser,
  bonusPoints: bonusPoints
}
