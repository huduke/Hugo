const cookieName = '云闪付'
const cookieKey = 'cookie_unipay'
const chavy = init()
const resultInfo = {}

!(async () => {
  chavy.log(`${cookieName} 开始签到`)
  await checkin()
  await showNotify()
})()
.catch((e) => {
  chavy.notify(cookieName, '签到: 失败❌', `原因: ${e}`)
  chavy.log(`${cookieName}, 签到: 失败❌, 原因: ${e}`)
})
.finally(() => {
  chavy.log(`${cookieName} 结束签到`)
  chavy.done()
})


function checkin() {
  return new Promise((resolve, reject) => {
    let url = {
      url: `https://youhui.95516.com/newsign/api/daily_sign_in`,
      headers: {
        Cookie: chavy.getdata(cookieKey)
      }
    }
    chavy.post(url, (error, response, data) => {
      try {
        chavy.log(`${cookieName}, data: ${data}`)
        resultInfo.checkin = JSON.parse(data)
        resolve()
      } catch (e) {
        chavy.notify(cookieName, '签到: 失败❌', `原因: ${e}`)
        chavy.log(`${cookieName} - 签到: 失败❌, 原因: ${e}`)
        chavy.log(`${cookieName} - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

function showNotify() {
  return new Promise((resolve, reject) => {
    let subTitle = ''
    let detail = ''
    if (resultInfo.checkin) {
      subTitle = `签到: `
      if (!!resultInfo.checkin.signedIn) {
        if (resultInfo.checkin.signedIn == true) {
          subTitle += '成功🎉'
          var days = 0
          for (var i=0, len=resultInfo.checkin.days.length; i<len; i++){
            days += resultInfo.checkin.days[i]
          }
          detail = '已签到: ' + days + '天, 签到金: ' + resultInfo.checkin.coins
        } else {
          subTitle += '失败❌'
        }
      } else {
        subTitle += '失败❌'
      }
    }
    chavy.notify(cookieName, subTitle, detail)
    resolve()
  })
}

function init() {
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  notify = (title, subtitle, body) => {
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return {
    isQuanX,
    notify,
    log,
    getdata,
    setdata,
    get,
    post,
    done
  }
}
