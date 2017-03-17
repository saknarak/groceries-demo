const Observable = require("data/observable").Observable;
const frameModule = require("ui/frame")
const dialogs = require("ui/dialogs")
let page

let login = new Observable({
  email: '',
  pass: '',
  remember: true,
})
exports.pageLoad = (args) => {
  page = args.object
  page.bindingContext = login
}
exports.checkLogin = () => {

  fetch('http://192.168.8.208:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: login.email,
      pass: login.pass,
    })
  }).then(res => res.json())
  .then((res) => {
    return res.json()
  }).then((data) => {
    console.log('ok')
    console.dump(data)
    if (data.status) {
      // login success

    } else {
      dialogs.alert({
        title: 'เกิดข้อผิดพลาด',
        message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        okButtonText: 'รับทราบ',
      }).then(() => {
        console.log('alert closed')
      })
    }
  }).catch((err) => {
    dialogs.alert({
      title: 'เกิดข้อผิดพลาด',
      message: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
      okButtonText: 'รับทราบ',
    }).then(() => {
      console.log('alert closed')
    })
  })
  console.log('test')
}
exports.goRegister = () => {
  const topmost = frameModule.topmost()
  topmost.navigate("views/register/register")
}

