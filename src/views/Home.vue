<template>
 <v-container grid-list-md text-center>
    <v-layout wrap>
         <v-flex v-for="article in articles" :key="article.title" xs6>
         <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text"
      height="200px"
      v-bind:src="article.urlToImage"
    >
      <v-card-title class="align-end fill-height ">{{article.title}}</v-card-title>
    </v-img>

    <v-card-text>
      <span class="align-left">{{article.source.name}}</span><br>
      <p class="text-primary">{{article.description}}</p>
      
    </v-card-text>

    <v-card-actions>
      
      <v-btn
        text
        color="white"
      >
        Explore More
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-flex>
    </v-layout>
 </v-container>
</template>

<script>

import axios from 'axios';
import key from '../file.js';
export default {
    data:()=>({
        articles:[],
        error:null
    })
    ,
    created (){
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey='+key.api_key)
        .then((response)=>{
            this.articles = response.data.articles;
            console.log(response.data);
        })
        .catch(error =>{
            this.error = error
        })
    }
  
};
</script>
