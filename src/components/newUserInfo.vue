<template>
  <div id="newUserInfo" class="main">
    <div class="container">
      <div class="panel">
        <h1>账号注册</h1>
        <p>
          <Input style="display: inline" placeholder="用户名（数字字母下划线（3-20位））" v-model="newUsername"/>
        </p>
        <p>
          <Input type="password" v-model="newPassword" placeholder="密码（数字字母下划线（6-15位））"/>
        </p>
        <p>
          <Input type="password" v-model="confirmNewPassword" placeholder="确认密码"/>
        </p>
        <p>
          <Input v-model="tel" placeholder="电话号码(邮箱和电话任选其一)" @blur="checkTel(tel)"/>
        </p>
        <p style="margin-bottom: 20px">
          <Input v-model="email" placeholder="Email(邮箱和电话任选其一)"/>
        </p>

        <p>
          <Button class="btn" type="primary" round @click="submit">注册</Button>
          <Button class="btn" type="primary" round @click="back">返回</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  var $ = require("jquery");
  export default {
    name: 'newUserInfo',
    data() {
      return {
        newUsername: null,
        newPassword: null,
        confirmNewPassword: null,
        tel: null,
        email: null
      }
    },
    methods: {

      //验证用户名
      checkusername: function (username) {
        var ref = this;
        var flg = false;
        var reg = /^[a-zA-Z0-9_]{3,20}$/;

        if (!reg.test(username)) {
          this.$Message.error('用户名格式不正确');
          return false;
        } else {
          //验证用户名是否重复
          $.ajax({
            url: ref.hr + '/user/checkUsername',
            type: "post",
            async: false,
            data: {
              "checkUsername": username
            },
            success: function (json) {
              if (json == false) {
                flg = true;
              } else {
                ref.$Message.error('对不起，这个名字太受欢迎了');
                return false;
              }
            },
            error: function () {
              ref.$Message.error('执行错误');
            }
          })
        }
      },

      //验证密码
      checkpassword: function (password) {
        var reg = /^[a-zA-Z0-9_]{6,15}$/
        if (!reg.test(password)) {
          return false;
        }
        ;
        return reg.test(password);
      },

      //确认密码
      checkconfirmNewPassword: function (confirmPassword) {
        var reg = /^[a-zA-Z0-9_]{6,15}$/
        if (!reg.test(confirmPassword) || confirmPassword != this.newPassword) {
          return false;
        }
        ;
        return reg.test(confirmPassword);
      },

      //验证手机号
      checkTel: function (tel) {
        if (tel == null || tel == '') {
          this.tel = null;
          return false;
        } else {
          var reg = /^1(3|4|5|7|8)\d{9}$/
          if (!reg.test(tel)) {
            return false;
          }
          ;
          return reg.test(tel);
        }
      },

      //验证邮箱
      checkEmail: function (email) {
        if (email == null || email == '') {
          this.email = null;
          return false;
        } else {
          var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if (!reg.test(email)) {
            return false;
          }
          return reg.test(email);
        }
      },

      //注册
      submit: function () {
        var ref = this;
        if (!this.checkTel(this.tel) && !this.checkEmail(this.email)) {
          this.$Message.error('电话号码或邮箱格式错误');
        } else if (!this.checkusername(ref.newUsername) && this.checkpassword(ref.newPassword) && this.checkconfirmNewPassword(ref.confirmNewPassword) && (this.checkTel(ref.tel) || this.checkEmail(ref.email))) {
          $.ajax({
            url: ref.hr + "/user/insertUser",
            type: "post",
            data: {
              "userName": ref.newUsername,
              "password": ref.newPassword,
              "tel": ref.tel,
              "email": ref.email,
            },
            success: function (json) {
              if (json) {
                alert("注册成功!!!");
                ref.$router.push({name: 'login'});
              } else {
                ref.$Message.error('执行错误');
              }
            },
            error: function () {
              ref.$Message.error('执行错误');
            }
          })
        }
      },
      back: function () {
        this.$router.push({name: 'login'});
      },
    }
  }
</script>

<style>

  #newUserInfo {
    overflow-y: hidden;
    height: 100%;
  }

  #newUserInfo h1 {
    margin-top: 20px;
    color: #ffffff;
    text-align: center;
  }

  #newUserInfo .ivu-input {
    margin-top: 20px;
    width: 300px;
  }

  #newUserInfo label {
    color: #ffffff;
  }

  #newUserInfo button {
    width: 150px;
    margin-bottom: 30px;
  }

  .main {
    background-image: url('../assets/bgc/pg.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  #newUserInfo .container {
    width: 1200px;
    margin-right: auto;
    height: 100%;
  }

  #newUserInfo .panel {
    background-color: rgba(0, 0, 0, 0.3);
    margin: 173px 196px;
    width: 494px;
    float: right;
    border-radius: 100px;
  }

  #newUserInfo p {
    text-align: center;
  }

</style>
