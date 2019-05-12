<template>
  <div class="row">
    <!--菜单-->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td><strong>{{item.name}}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td><button
              @click = "addToBasket(item,option)"
              class  = "btn btn-sm btn-outline-success">+</button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--购物车-->
    <div class="col-sm-12 col-md-4">
      <div v-if="baskets.length>0">
          <table class="table">
          <thead class="thead-default">
            <tr>
              <th>数量</th>
              <th>种类</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody v-for="item in baskets" :key="item.name">
            <tr>
              <td>
                <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                <span>{{item.quantity}}</span>
                <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
              </td>
              <td>{{item.naem}}{{item.size}}</td>
              <td>{{item.price*item.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <P>总价：{{total+'RMB'}}</P>
        <button class="btn btn-success btn-block" @click="submit">提交</button>
      </div>
      <div v-else>
        {{basketText}}
      </div>
    </div>
  </div>
</template>
<script>
/*import axios from 'axios';*/
  export default{
    data(){
      return{
        baskets   : [],
        basketText: '购物车为空！',
        //getMenuItems: {}
        }
      },
    computed:{
      getMenuItems(){
        //在vuex中获取数据
        //return this.$store.state.menuItems
        console.log(this.$store.state.menuItems)
        //通过getters 获取数据
        return this.$store.getters.getMenuItems
      },
      total(){
        let totalCost = 0

        for(let index in this.baskets){
          let individualItem  = this.baskets[index]
              totalCost      += individualItem.quantity*individualItem.price
        }

        return totalCost
      }
    },
    created(){
      this.fetchData()
    },
    methods:{
      submit(){
        alert('亲爱的顾客，您本次消费共计：'+this.total+'元')
      },
      fetchData(){
       /* fetch("https://wd2582462459eoscmh.wilddogio.com/menu.json")
        .then(res =>{
          return res.json()
        })
        .then(data=>{
          this.getMenuItems = data
        })*/
        /*axios.get("menu.json")
          .then(res => this.getMenuItems =res.data)*/
          //axios写入原型后使用方法：
          //this.http.get("menu.json")
            //  .then(res=> this.getMenuItems=res.data)

        //将请求来的数据存储到vueX中，
        this.http.get("menu.json")
            .then(res=> this.$store.commit("setMenuItems",res.data))

      },
      addToBasket(item,option){
        let basket = {
          name    : item.name,
          size    : option.size,
          price   : option.price,
          quantity: 1
        }

        if(this.baskets.length>0){
          //过滤
         let result = this.baskets.filter((basket)=>{
            return (basket.name === item.name && basket.price=== option.price)
          })

          if(result != null && result.length>0){
            result[0].quantity++
          }else{
            this.baskets.push(basket)
          }
        }else{
          this.baskets.push(basket)
        }


      },
      decreaseQuantity(item){
        item.quantity--
        if(item.quantity<=0){
          this.removeFromBasket(item)
        }
      },
      increaseQuantity(item){
        item.quantity++
    },
    removeFromBasket(item){
      this.baskets.splice(this.baskets.indexOf(item),1)
    }
    }
  }
</script>
