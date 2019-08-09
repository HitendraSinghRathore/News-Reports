<template>
 <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item v-on:click="selectSource(source.id)" v-for="source in sources" v-bind:key="source.id">
          <v-list-item-action >
            <v-avatar size="32px">
                <img
                  class="img-circle elevation-7 mb-1"
                  :src="getImage(source.id)" />
          </v-avatar>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{source.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>News Reports</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark small color="indigo" @click="goHome()">
        <v-icon dark>mdi-home</v-icon>

      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
      <router-view></router-view>
       
      </v-container>
    </v-content>

    
  </v-app>
</template>

<script>
import axios from 'axios';


export default {
   props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      sources:[],
      error:null
    }),
    created () {
      this.$vuetify.theme.dark = true;
      const url = 'https://newsapi.org/v2/sources?language=en&apiKey='+process.env.VUE_APP_NEWS_API_KEY;
      axios.get(url)
      .then(response =>{
        this.sources = response.data.sources
      })
      .catch(error =>{
        this.error = error;
      })

    },
    methods:{
      getImage(id){
        return(require('../src/assets/images/'+id+'.png'));
      },
      selectSource(id){
        this.$router.push({path:`/source/${id}`});
      },
      goHome(){
        this.$router.push({path:'/'})
      }
    }
};
</script>
