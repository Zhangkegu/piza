<template>
  <div class="card text-dark bg-light mb-3">
    <div class="card-header">联系我们</div>
    <div class="card-body">
      <h4 class="card-title">联系我们</h4>
      <p class="card-text">zhangmingxin@neuspoft.com</p>

      <router-link :to="{name:'phoneNumber'}">电话</router-link>
    <router-link :to="{name:'personName'}">联系人</router-link>
    </div>
    
    <router-view></router-view>
  </div>
</template>
