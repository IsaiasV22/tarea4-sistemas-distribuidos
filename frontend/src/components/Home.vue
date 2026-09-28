<!-- Home.vue -->
<template>
  <div>
    <h2 style="margin-top: 15px">Bookstore Example Site</h2>
      <p>This website offers information on books, authors and publishers.</p>
    <ul>
      <li><router-link to='/book'>Books information</router-link></li>
      <li><router-link to='/author'>Authors information</router-link></li>
      <li><router-link to='/publisher'>Publishers information</router-link></li>
    </ul>
  </div>
</template>