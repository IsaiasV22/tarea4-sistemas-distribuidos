<!-- BookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <fieldset :disabled="show || $props.delete" style="border: none; padding: 0; margin: 0">
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Title</label>
       <input class="u-full-width" type="text"
         v-model="book.title">
      </div>
      <div class="six columns">
       <label for="authorInput">Author</label>
       <input class="u-full-width" type="text"
          v-model="book.author">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">Publisher</label>
       <input class="u-full-width" type="text"
          v-model="book.publisher">
      </div>
      <div class="six columns">
       <label for="editionInput">Edition</label>
       <input class="u-full-width" type="text"
         v-model="book.edition">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="copyrightInput">Copyright</label>
       <input class="u-full-width" type="number"
          v-model="book.copyright">
      </div>
      <div class="six columns">
       <label for="languageInput">Language</label>
       <input class="u-full-width" type="text"
         v-model="book.language">
      </div>
     </div>
     </fieldset>
     <div class="row">
      <router-link class="button button-primary" 
        to="/book">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateBook(book.id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createBook()">Create</a>
       <a v-if='$props.delete' class="button button-primary" style="float: right"
         v-on:click="deleteBook(book.id)">Delete</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Book Details",
  props: ['show','edit','create','delete'],
  data() {
    return {
      title: "Book Data",
      book: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findBook(route.params.id);
    else {
      this.book = {
        'id': Math.floor(Math.random()*100000000),'title':'','edition':'',
        'copyright':0,'language':'','pages':0,'author':'','author_id':0,
        'publisher':'','publisher_id':0 };
    }
  },
  methods: {
    findBook: function(id) {
      fetch(this.url+'/.netlify/functions/bookFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.book = items[0];
      })
    },
    updateBook: function(id) {
      fetch(this.url+'/.netlify/functions/bookUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.book)})
        .then((data) => {
          this.$router.push('/book');
        }
      )
    },
    deleteBook: function(id) {
      fetch(this.url+'/.netlify/functions/bookDelete/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'DELETE'})
        .then((data) => {
          this.$router.push('/book');
        }
      )
    },
    createBook: function() {
      fetch(this.url+'/.netlify/functions/bookInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.book)})
        .then((data) => {
           this.$router.push('/book');
        }
      )
    }
  }
};
</script>