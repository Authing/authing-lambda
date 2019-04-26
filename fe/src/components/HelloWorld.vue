<template>
  <div class="hello">
    <img alt="Vue logo" height="200" :src="userInfo.picture || 'https://cdn.authing.cn/authing-logo@2.png'">
    <h1>{{ msg }}</h1>
    <!--<p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>-->
    <h3>Open the Login Page</h3>
    <ul>
      <li><a href="https://aws.authing.cn/oauth/oidc/auth?client_id=5cc2b548d14c742db893ba55&redirect_uri=https://authing.cn&scope=openid profile&response_type=id_token token&state=jacket&nonce=1831289" rel="noopener">Login</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://github.com/Authing/authing-lambda" target="_blank" rel="noopener">Authing Lambda on Github</a></li>
      <li><a href="https://authing.cn" target="_blank" rel="noopener">Authing.cn</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',

  data() {
    return {
      msg: 'Welcome to Lambda + Authing Project',
      userInfo: {},
    }
  },

  async mounted() {
    const params = this.getHashParameters();
    const accessToken = params.access_token;

    if (accessToken) {
      await this.getUserInfo(accessToken);
    }

  },

  methods: {
    async getUserInfo(accessToken) {
      const result = await axios.get(`https://users.authing.cn/oauth/oidc/user/userinfo?access_token=${accessToken}`);
      this.userInfo = result.data;
    },

    getHashParameter(key){
      var params = this.getHashParameters();
      return params[key];
    },

    getHashParameters(){
      // eslint-disable-next-line
      var arr = (location.hash || "").replace(/^\#/,'').split("&");
      var params = {};
      for(var i=0; i<arr.length; i++){
        var data = arr[i].split("=");
        if(data.length == 2){
             params[data[0]] = data[1];
        }
      }
      return params;
    }
  }
}
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
