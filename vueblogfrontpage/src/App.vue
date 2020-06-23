<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">Login</router-link> |
      <router-link to="/blogs">Blogs</router-link> |
      <router-link to="/blog/add">Add Blog</router-link> |
      <router-link to="/blog/1">See Blog</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  max-width: 960px;
  margin: 0 auto;
}

#nav {
  text-align: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
