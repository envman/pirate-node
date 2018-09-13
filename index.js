const request = require('request')

function createUser(userName, callback) {
  if (typeof userName !== 'string' && !(userName instanceof String)) {
    return callback(new Error('username should be a string'))
  }

  request(`http://192.168.0.14:1337/user/${userName}`, (err, response, body) => {
    if (err) return callback(err)

    if (response.statusCode != 200) return callback(new Error('failed request'))

    callback(null, body)
  })
}

function bonusPoints(userId, callback) {
  request({
    url: `http://192.168.0.14:1337/packagescore`,
    method: "POST",
    json: true,
    body: { user: userId }
  }, (err, response, _) => {
    if (err) callback(err)

    if (response.statusCode != 200) return callback(new Error('failed request'))

    callback(null, 'bonus achieved!!!')
  })
}

module.exports = {
  createUser: createUser,
  bonusPoints: bonusPoints
}
