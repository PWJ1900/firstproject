<template>
<el-row>
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="success" @click="make()">你好</el-button>
<el-card>{{music}}</el-card>
</el-row>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      music:''
    }
  },
  methods:{
    make(){
      this.$http.get('http://127.0.0.1:8000/blog/peopleuse').then(response => {
        console.log(response.bodyText)
        let a = response.bodyText
       
        // this.music = b[0]
        console.log(a)
  // success callback
 }, response => {
  // error callback
 });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
