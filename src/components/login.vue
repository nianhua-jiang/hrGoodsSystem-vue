<template>
  <div id="login" class="login" @keydown.enter="loginSystem">
    <div style="height: 200px"></div>
    <div class="content">
      <div style="height: 45px"></div>
      <h1>华瑞货物管理系统</h1>

      <p style="margin-top:30px;margin-bottom: 28px">
        <Input v-model="username" placeholder="请输入用户名" style="width: 300px"/>
      </p>
      <p style="margin-bottom: 28px">
        <Input v-model="password" type="password" placeholder="请输入密码" style="width: 300px"/>
      </p>
      <p>
        <Button type="primary" style="width: 150px" @click="loginSystem()">登陆系统</Button>
        <Button type="primary" style="width: 150px" @click="insertUser()">注册账号</Button>
      </p>
    </div>
  </div>
</template>

<script>
  var $ = require("jquery");
  export default {
    name: 'login',
    data: function () {
      return {
        username: null,
        password: null,
        flg:false
      }
    },
    methods: {

      loginSystem: function () {
        var ref = this;
        if (this.checkusername(this.username) && this.checkpassword(this.password)) {
          $.ajax({
            url: ref.hr + "/user/login",
            async:false,
            type: "post",
            data: {
              "username": ref.username,
              "password": ref.password
            },
            success: function (json) {
              if (json == '') {
                ref.$router.push({name: 'goods'});
              } else {
                ref.$Message.error(json);
              }

            },
            error: function () {
              ref.$Message.error('执行异常');
            }
          })
        }
      },
      checkusername: function (username) {
        var ref = this;
        var reg = /^[a-zA-Z0-9_]{3,20}$/
        return reg.test(username)
      },

      checkpassword: function (password) {
        var reg = /^[a-zA-Z0-9_]{6,15}$/
        if (!reg.test(password)) {
          this.$Message.error('密码格式错误');
        }
        return reg.test(password)
      },

      insertUser: function () {
        var ref = this;
        ref.$router.push({name: 'newUserInfo'});
      }
    },
    mounted: function () {

    }
  }
</script>

<style>

  .login {
    height: 100%;
    background-image: url("../assets/bgc/pg.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  #login .content {
    text-align: center;
    border-radius: 100px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    width: 30%;
    height: 46%;
  }

  #login h1 {
    font-family: 新宋体;
    margin-top: 20px;
    letter-spacing: 10px;
    color: #ddff90;
  }

</style>
