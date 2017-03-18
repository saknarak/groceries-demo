let page
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
const moment = require('moment')
var pageData = new observableModule.fromObject({
  next30day: moment().add(30, 'days').format('D MMMM YYYY'),
  groceryList: new ObservableArray([
    { name: 'Book', qty: 2 },
    { name: 'Notebook', qty: 1 },
    { name: 'Book', qty: 2 },
  ])
})

exports.pageLoad = (args) => {
  page = args.object
  page.bindingContext = pageData
  console.log('test navigationContext')
  let data = page.navigationContext
  console.log(data.email)
  console.log(data.pass)
  setTimeout(() => {
    pageData.groceryList.push({
      name: 'New Item',
      qty: 5
    })
//  context.list.setItem(0, {name:'Hello', qty:5})
//  context.list[0].name = 'Hello'
  }, 5000)
}
