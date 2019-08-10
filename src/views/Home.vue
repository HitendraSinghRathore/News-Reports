<template>
 <v-container grid-list-md text-center>
   <v-container v-if="loading==true">
   
   <loader></loader>
   
   </v-container>
   <v-container fill-height text-center v-if="(!articles||articles.length==0)&&loading==false">

     <h1 class="font-lg text-red-600 text-center mx-auto">No Headlines found..So sorry</h1>

   </v-container>
    <v-layout wrap>
         <v-flex v-for="article in articles" :key="article.title" md4 xs12>
         <v-card
    class="mx-auto "
   style="display: flex;flex-direction: column;align-content: flex-end;"
  >
    <v-img
      min-height="10vh"
      
      
      v-bind:src="article.urlToImage"
      style="min-height: 10vh; background-color: white;flex-grow: 0;"
    >
     </v-img>

    <v-card-text style="min-height:8vh;overflow:hidden">
       <span >{{article.title}}</span><br>
    
      <hr>
      <p class="text-primary text-xs"  >{{article.description}}</p>
      
    </v-card-text>

    <v-card-actions class="my-auto" >
      
      
      <span class="text-sm ">{{formatDate(article.publishedAt)}}</span>
      <v-btn
        text
        color="white"
        v-on:click="showArticle(article.url)"
        style="margin-left:1.3rem"
      >
        Explore More 
        <v-icon right dark>mdi-arrow-top-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-flex>
    </v-layout>
 </v-container>
</template>

<script>

import axios from 'axios';
import loader from '../components/Loader'
export default {
  components:{
    loader
  }
  ,
    data:()=>({
        articles:[],
        error:null,
        location:"in",
        loading:true
    })
    ,
    created (){
      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition,this.fetchArticles);
  } else { 
    alert("Location not supported, switching to Indian News...");
    this.fetchArticles();
  }     
    }
  ,

  methods:{

    showPosition(position){
      const locURL = `${process.env.VUE_APP_GEO_BASE_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
      
      axios.get(locURL)
      .then(response =>{
          this.location = response.address.country_code;
          this.fetchArticles();
      }).catch(error=>{
       this.fetchArticles();
      })
    },


    fetchArticles(){
      const newsURL = `https://newsapi.org/v2/top-headlines?country=${this.location}&pageSize=100&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`
axios.get(newsURL)
        .then((response)=>{
            this.articles = response.data.articles;
            this.loading = false;
           
        })
        .catch(error =>{
            this.error = error
            this.loading = false;
        })

    },
    showArticle(url){
            window.open(url,'_blank');
        }
        ,

    formatDate(dateString){
     var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString('us-US', options);
    }
  },
  watch:{
    '$route':{
      handler:function(name){
        this.loading = true;
        this.fetchArticles();
      },
      deep:true,
      immediate:true
    }
  }
};
</script>
