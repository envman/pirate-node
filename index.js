const request = require('request')
const Cryptr = require('cryptr')
const shortid = require('shortid')

let current

const challenge = (level, challenge) => new Promise((resolve, reject) => {
  request.post('http://localhost:5000/sailing', {
    method: 'POST',
    json: true,
    body: {
      level,
      challenge
    }
  }, (err, response, body) => {
    if (err) return reject(err)

    resolve(body)
  })
})

module.exports = {
  ahoy: () => {
    challenge('Package Port', 'AE02jm8C')
      .then(r => r.map(c => console.log(c)))
  },

  callback: (callback) => {
    if (!callback) return
    if (typeof(callback) !== 'function') return

    challenge('Callback Cove', 'FZn54eNI')
      .then(r => callback(null, r))
  },

  encrypt: (data, key, callback) => {
    const cryptr = new Cryptr(key)

    setTimeout(() => {
      callback(null, cryptr.encrypt(data))
    }, 100)
  },

  decrypt: (data, key, callback) => {
    const cryptr = new Cryptr(key)

    setTimeout(() => {
      callback(null, cryptr.decrypt(data))
    }, 100)
  },

  bonusPoints: () => {
    challenge('Package Port', 'HIAAw-Ny')
  },

  checkDecrypted: (data, callback) => {
    request.post('http://localhost:5000/sailing', {
      method: 'POST',
      json: true,
      body: {
        level: 'Callback Cove',
        challenge: '4rsVEzrY',
        answer: data
      }
    }, (err, response, body) => {
      callback(err, body)
    })
  },

  openChest: () => new Promise((resolve, reject) => {
    current = shortid()
    resolve(current)
  }),

  isGold: data => new Promise((resolve, reject) => {
    if (data !== current) {
      return reject('Incorrect data passed!')
    }

    return challenge('Promise Land', 'CYPk-laD')
      .then(b => resolve(b.join('\r\n')))
  }),

  sendMessage: (message, callback) => {
    setTimeout(_ => {
      if (message == 'break') {
        callback(new Error('Invalid Message'))
      } else {
        callback(null, 'message sent!')
      }
    }, 100)
  },

  checkPromise: (fact) => {
    let good

    return fact('test')
      .then(d => {
        if (d == 'message sent!') {
          good = true
        } else {
          throw new Error('Invalid data passed out')
        }
      })
      .then(_ => fact('break'))
      .catch(err => {
        if (err.message == 'Invalid Message') {
          if (good) {
            return challenge('Promise Land', 'NDtwe8aa')
          }
        } else {
          throw new Error('Invalid error handling')
        }
      })
  },

  checkAll: (answer) => {
    request({
      method: 'POST',
      url: `http://localhost:5000/map_check`,
      json: true,
      body: {
        answer
      }
    }, (err, response, body) => {
      if (err) return console.error(err)

      if (response.statusCode !== 200) {
        return console.error(`Bad status code ${response.statusCode} ${body || ''}`)
      }

      console.log(body)
    })
  },

  checkTreasure: treasure => {
    challenge('Mongo Mountain', treasure)
  },

  userId: _ => new Promise((resolve, reject) => {
    request.get('http://localhost:5000/myuserid', (err, response, body) => {
      if (err) return reject(err)

      resolve(body)
    })
  })
}



