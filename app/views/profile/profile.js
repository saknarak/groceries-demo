const camera = require("nativescript-camera")
var bghttp = require("nativescript-background-http");
 

exports.pageLoad = (args) => {
  page = args.object
  camera.requestPermissions()
//  page.bindingContext = pageData
}
exports.takePhoto = () => {
  let opt = {
    width: 300,
    height: 300,
    keepAspectRatio: true,
    saveToGallery: true,
  }
  camera.takePicture(opt).then((img) => {
    let photo = page.getViewById('photo')
    photo.src = img
    console.dump(img)

    var session = bghttp.session("image-upload");
 
    var request = {
        url: "http://192.168.8.208:3000/upload",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": "bigpig.jpg",
            'X-code': '59010001',
            'X-name': 'XXXX',
        },
        description: "{ 'uploading': 'bigpig.jpg' }"
    };
    
    var task = session.uploadFile(img.android || img.ios, request);
    
    task.on("progress", logEvent);
    task.on("error", () => {
//      dialogs.alert({})
    });
    task.on("complete", () => {
      console.log('UPLOAD DONE')
    });
    
    function logEvent(e) {
        console.log(e.eventName);
    }


  }).catch((e) => {
    camera.requestPermissions()
    console.log('error')
  })
}

