<template>
  <div id="goods">
    <Table stripe :columns="columns" :data="goodsData"></Table>
    <Page :total=page @on-change="searchGoods" />
  </div>

</template>

<script>
  var $ = require("jquery");
  export default {
    name: "goods",
    data() {
      return {
        goodsData: [],
        page: null,
        columns: [
          {
            title: '商品编号',
            key: 'id',
            width: '150',
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'goodsName',
            width: '150',
            align: 'center'
          },
          {
            title: '数量',
            key: 'goodsCount',
            width: '100',
            align: 'center'
          },
          {
            title: '单位',
            key: 'goodsUnit',
            width: '65',
            align: 'center'
          },
          {
            title: '买入单价',
            key: 'goodsBuyPrice',
            width: '165',
            align: 'center'
          },
          {
            title: '卖出单价',
            key: 'goodsSellPrice',
            width: '165',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      searchCount: function () {
        var ref = this;
        $.ajax({
          url: ref.hr + "/goods/searchCount",
          async: false,
          type: "get",
          success: function (json) {
            ref.page = json
          },
          error: function () {
            ref.$Message.error('执行异常');
          }
        })

      },
      show(index) {
        this.$Modal.info({
          title: '商品详情',
          content: `商品编号：${this.goodsData[index].id}<br>商品名称：${this.goodsData[index].goodsName}<br>商品数量：${this.goodsData[index].goodsCount}`
        })
      }
      ,
      remove(index) {
        this.goodsData.splice(index, 1);
      },

      searchGoods:function (page) {

        var ref = this;
        this.searchCount();
        $.ajax({
          url: ref.hr + "/goods/searchAllGoods",
          async: false,
          type: "post",
          data:{
            "page":page
          },
          success: function (json) {
            ref.goodsData = json
          },
          error: function () {
            ref.$Message.error('执行异常');
          }
        })
      }

    },
    mounted: function () {
        this.searchGoods(1);
    }
  }
</script>

<style>
  #goods .ivu-page{
    margin-top: 20px;
  }
</style>
