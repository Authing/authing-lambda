<template>
  <!-- eslint-disable -->
  <div class="hello">
    <img alt="Vue logo" height="200" :src="userInfo.picture || 'https://cdn.authing.cn/authing-logo@2.png'">
    <h1>{{ msg }}</h1>
    <p v-if="userInfo.sub">
      Your Authing ID is <strong>{{ userInfo.sub }}</strong>
      <br>
      Whole userInfo is
      <code style="text-align:left">
        {{ userInfo }}
      </code>
    </p>
    <h3>Open the Login Page</h3>
    <ul>
      <li><a href="https://lambda.authing.cn/oauth/oidc/auth?client_id=5cc41c06d14c740a0c93ba6f&redirect_uri=https://sample.authing.cn/aws&scope=openid profile&response_type=id_token token&state=jacket&nonce=1831289&protocol=oidc" rel="noopener">Login</a></li>
    </ul>
    <h3>See the message from AWS Lambda</h3>
    <ul>
      <p>
        <li>Public: <a target="_blank" href="https://gmvhw2qh1m.execute-api.us-east-1.amazonaws.com/dev/api/public">/api/public</a></li>
        <p>{{publicMessage}}</p>
      </p>
      <p>
        <li>Private: <a target="_blank" href="https://gmvhw2qh1m.execute-api.us-east-1.amazonaws.com/dev/api/private">/api/private</a></li>
        <p>{{privateMessage}}</p>
      </p>
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

      publicMessage: '',
      privateMessage: '',

      idToken: '',
    }
  },

  async mounted() {
    const params = this.getHashParameters();
    const accessToken = params.access_token;
    this.idToken = params.id_token;

    this.getPublic();
    this.getPrivate();

    if (accessToken) {
      await this.getUserInfo(accessToken);
    }
  },

  methods: {
    async getUserInfo(accessToken) {
      const result = await axios.get(`https://users.authing.cn/oauth/oidc/user/userinfo?access_token=${accessToken}`);
      this.userInfo = result.data;
      this.getPrivate();
    },

    async getPublic(){
      const result = await axios.get('https://gmvhw2qh1m.execute-api.us-east-1.amazonaws.com/dev/api/public');
      this.publicMessage = result.data;
    },

    async getPrivate() {
      try {
        const result = await axios.get('https://gmvhw2qh1m.execute-api.us-east-1.amazonaws.com/dev/api/private', {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        });
        this.privateMessage = result.data;
      } catch(err) {
        this.privateMessage = err;
      }
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
