<template>
  <div id="main">
    <Layout>
      <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="linkOut">

        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-stats"/>
            货物管理
          </template>
            <MenuItem name="1-1">货物信息</MenuItem>
            <MenuItem name="1-2">商品入库</MenuItem>
            <MenuItem name="1-3">退货处理</MenuItem>
            <MenuItem name="1-4">采购计划</MenuItem>
        </Submenu>

        <MenuItem name="2">
          <Icon type="ios-people"/>
          销售管理
        </MenuItem>

        <MenuItem name="3">
          <Icon type="ios-people"/>
          利润统计
        </MenuItem>
        <li style="margin-right:20px;float: right;color: antiquewhite;cursor: pointer" @click="logOut">安全退出</li>
        <li style="float: right;color: antiquewhite;margin-right:22px"> {{dateTime}}</li>
      </Menu>
      <Content :style="{margin: '28px 20px 0', background: '#fff', minHeight: '596px'}">
        <router-view>

        </router-view>
      </Content>
    </Layout>
  </div>
</template>

<script>
  var $ = require("jquery");
  export default {
    name: "main",
    data() {
      return {
        theme1: 'dark',
        i: null,
        dateTime: null
      }
    },
    methods: {
      logOut: function () {
        var ref = this;
        $.ajax({
          url: ref.hr + "/user/logOut",
          type: "post",
          data: null,
          success: function (json) {
            if (json) {
              ref.$router.push({name: "/login"});
            }
          },
          error: function () {
            ref.$Message.error('执行异常');
          }
        });
      },
      linkOut: function (name) {
        if (name == '1-1') {
          this.$router.push({name: "goods"});
        }else if(name=='1-2'){
          this.$router.push({name: "insertGoods"});
        }
      },
    }
    ,
    mounted: function () {
      var ref = this;
      //循环执行的定时器
      setInterval(function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        hour = hour < 10 ? "0" + hour : hour
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute
        var second = date.getSeconds();
        second = second < 10 ? "0" + second : second;
        var temp = year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second;
        ref.dateTime = temp
      }, 1000);
    }
  }
</script>

<style>

  #main {
    height: 100%;
    background-color: #f5f7f9;
    overflow-y: hidden;
  }

  #main .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

  }

  #main .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  #main .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
