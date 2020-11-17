function Usebs4(file){  //核心方法，将图片转成base64字符形式
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() { // 图片转base64完成后返回reader对象
        resolve(reader)
      }
      reader.onerror = reject
    })
  }

  export{Usebs4}