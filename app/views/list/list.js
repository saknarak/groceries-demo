let page
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var pageData = new observableModule.fromObject({
  groceryList: new ObservableArray([
    { name: 'Book', qty: 2 },
    { name: 'Notebook', qty: 1 },
    { name: 'Book', qty: 2 },
  ])
})

exports.pageLoad = (args) => {
  page = args.object
  page.bindingContext = pageData
//   setTimeout(() => {
//     context.list.push({
//       name: 'New Item',
//       qty: 5
//     })
// //  context.list.setItem(0, {name:'Hello', qty:5})
// //  context.list[0].name = 'Hello'
//   }, 5000)
}