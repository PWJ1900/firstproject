function Httpuse(the,title,pageuse){
    the.$http.get( "http://127.0.0.1:8000/blog"+"/" + title,{params:{pageNum:pageuse}}).then(
        (response) => {
          console.log(response);
          let a = response.data;
          console.log(a);
          the.totalget = response.data[0]['count']
          the.tableData = a;
          //success callback
        },
        (response) => {
          // error callback
        }
      );

    



}

export{Httpuse}