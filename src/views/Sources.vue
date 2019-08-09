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
   
  >
    <v-img
      min-height="100px"
      height="100px"
      v-bind:src="article.urlToImage"
      style="background-color:white"
    >
     </v-img>

    <v-card-text style="min-height:250px;overflow:hidden">
       <span class="align-end ">{{article.title}}</span><br>
    
      <hr>
      <p class="text-primary text-xs">{{article.description}}</p>
      
    </v-card-text>

    <v-card-actions >
      
      
      <span class="text-sm mr-16">{{formatDate(article.publishedAt)}}</span>
      <v-btn
        text
        color="white"
        v-on:click="showArticle(article.url)"
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
import loader from '../components/Loader';
export default {
    components:{
        loader
    },
    data :()=>({
        articles:[],
        error:null,
        source:null,
        loading:true
    }),
    created (){
        this.source = this.$route.params.name;
        this.fetchArticles();
        

    },
    methods: {

        fetchArticles(){
            this.loading = true;
        const newsurl = `https://newsapi.org/v2/top-headlines?sources=${this.source}&pageSize=100&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
        axios.get(newsurl)
        .then((response) =>{
            this.articles = response.data.articles;
            this.loading= false;
        })
        .catch(error =>{
            this.loading= false;
        })
        },
        showArticle(url){
            window.open(url,'_blank')

        }
        ,
        formatDate(dateString){
     var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString('us-US', options);
    }
    },
    watch :{
        '$route.params.name':{
            handler:function(name){
               this.source = name;
               this.fetchArticles();
            },
            deep:true,
            immediate:true
        }
    }
}
</script>
