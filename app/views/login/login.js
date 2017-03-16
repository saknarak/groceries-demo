const Observable = require("data/observable").Observable;
const frameModule = require("ui/frame")
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
  fetch('http://192.168.8.179:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: login.email,
      pass: login.pass,
    })
  }).then((res) => {
    return res.json()
  }).then((data) => {
    console.log('ok')
    console.dump(data)
  }).catch((err) => {
    console.log('error')
  })
  console.log('test')
}
exports.goRegister = () => {
  const topmost = frameModule.topmost()
  topmost.navigate("views/register/register")
}

