<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img src="../../src/assets/icon.png" alt="图标" class="mx-auto d-block">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email"
              class   = "form-control"
              v-model = "email">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password"
              class   = "form-control"
              v-model = "password">
            </div>
            <button class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
  export default{
    data(){
      return{
        email   : '',
        password: '',

      }
    },
    //组件内的守卫；
    beforeRouteEnter:(to, from, next) => {
      next(vm=>vm.$store.dispatch("setUser",null))
      
    },
    methods:{
      onSubmit(){
        axios.get('users.json')
          .then(res=>{
            const data  = res.data
            const users = []
            for(let key in data){
              const user = data[key]
              //console.log('1233');
              users.push(user)
            }
            
            //实现过滤
            let result = users.filter((user)=>{
              return user.email ===this.email && user.password ===this.password
            })
            //判断result的长度是否大于0
            if(result !=null && result.length>0){
              this.$store.dispatch("setUser",result[0].email)
              this.$router.push({name:'homeLink'})
            }else{
              alert("账号或密码错误！");
              this.$store.dispach("setUser",null)
            }
            //console.log(users);//拿到用户对象数组；
          })
      }
    }
  }
</script>
