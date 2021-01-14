<template>
  <div
    class="hello h-full flex justify-center items-center flex-col p-4"
    style="height: calc(100vh - 64px)"
  >
    <h1 class="text-5xl font-bold my-12 text-center">Welcome to NodeMVC</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a
        href="https://github.com/alexdant91/node-mvc"
        target="_blank"
        rel="noopener"
      >
        github repository </a
      >.
    </p>

    <h3 class="text-2xl font-bold my-12">What is it?</h3>
    <br />
    <p>
      This is an MVC Node.js framework designed to simplify API and Web app in
      <br />
      general development. For further informations check out the
      <a
        href="https://github.com/alexdant91/node-mvc"
        target="_blank"
        rel="noopener"
      >
        github repository </a
      >.
    </p>
    <h3 class="text-2xl font-bold my-12">How it works?</h3>
    <br />
    <p>
      With CLI tool you can create Models, Controllers, Middleware and Database
      <br />
      schemas. For now, only MongoDB is supported. For further informations
      check out the
      <a
        href="https://github.com/alexdant91/node-mvc"
        target="_blank"
        rel="noopener"
      >
        github repository </a
      >.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
