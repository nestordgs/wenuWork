<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This app list characters from <a href="https://rickandmortyapi.com/documentation">The Rick and Morty API</a> and if you have an user can create a favorite list.
      <!-- <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>. -->
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Build Using</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/axios/axios" target="_blank" rel="noopener">axios</a></li>
      <li><a href="https://bootstrap-vue.js.org/" target="_blank" rel="noopener">bootstrap-vue</a></li>
      <li><a href="https://v-charts.js.org/#/en/README" target="_blank" rel="noopener">v-charts</a></li>
      <li><a href="https://artemsky.github.io/vue-snotify/" target="_blank" rel="noopener">vue-snotify</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
