<template>
  <div style="width: 20%;margin: 120px">
    <Form ref="formItem" :model="formItem" :label-width="80">
      <FormItem label="商品名称" prop="goodsName">
        <Input v-model="formItem.goodsName"/>
      </FormItem>
      <FormItem label="数量" prop="goodsCount">
        <Input v-model="formItem.goodsCount"/>
      </FormItem>
      <FormItem label="单位" prop="goodsUnit">
        <Input v-model="formItem.goodsUnit"/>
      </FormItem>
      <FormItem label="进货单价" prop="goodsBuyPrice">
        <Input v-model="formItem.goodsBuyPrice"/>
      </FormItem>
      <FormItem label="卖出单价" prop="goodsSellPrice">
        <Input v-model="formItem.goodsSellPrice"/>
      </FormItem>
      <FormItem>
        <Button @click="submit" type="primary">提交</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>

  var $ = require("jquery");

  export default {
    name: "insertGoods",
    data() {
      return {
          formItem:{
            goodsName: null,
            goodsCount: null,
            goodsUnit: null,
            goodsBuyPrice: null,
            goodsSellPrice: null
          },

      }
    },
    methods: {
      submit: function () {
        var ref = this;
        $.ajax({
          url: ref.hr + "/goods/insertGoods",
          async: false,
          type: "post",
          data:{
            "goodsName":ref.formItem.goodsName,
            "goodsCount":ref.formItem.goodsCount,
            "goodsUnit":ref.formItem.goodsUnit,
            "goodsBuyPrice":ref.formItem.goodsBuyPrice,
            "goodsSellPrice":ref.formItem.goodsSellPrice
          },
          success: function (json) {
            alert("添加成功")
          },
          error: function () {
            ref.$Message.error('执行异常');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
