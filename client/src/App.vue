<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
  body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>
