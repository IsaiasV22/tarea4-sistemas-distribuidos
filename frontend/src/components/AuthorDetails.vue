<!-- AuthorDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <fieldset :disabled="show || $props.delete" style="border: none; padding: 0; margin: 0">
     <div class="row">
      <div class="six columns">
       <label for="authorInput">Name</label>
       <input class="u-full-width" type="text"
         v-model="author.author">
      </div>
      <div class="six columns">
       <label for="nationalityInput">Nationality</label>
       <input class="u-full-width" type="text"
          v-model="author.nationality">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="birthYearInput">Birth year</label>
       <input class="u-full-width" type="number"
          v-model="author.birth_year">
      </div>
      <div class="six columns">
       <label for="fieldsInput">Fields</label>
       <input class="u-full-width" type="text"
         v-model="author.fields">
      </div>
     </div>
     </fieldset>
     <div class="row">
      <router-link class="button button-primary" 
        to="/author">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateAuthor(author.id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createAuthor()">Create</a>
       <a v-if='$props.delete' class="button button-primary" style="float: right"
         v-on:click="deleteAuthor(author.id)">Delete</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Author Details",
  props: ['show','edit','create','delete'],
  data() {
    return {
      title: "Author Data",
      author: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findAuthor(route.params.id);
    else {
      this.author = {
        'id': Math.floor(Math.random()*100000000),'author':'',
        'nationality':'','birth_year':0,'fields':'' };
    }
  },
  methods: {
    findAuthor: function(id) {
      fetch(this.url+'/.netlify/functions/authorFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.author = items[0];
      })
    },
    updateAuthor: function(id) {
      fetch(this.url+'/.netlify/functions/authorUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.author)})
        .then((data) => {
          this.$router.push('/author');
        }
      )
    },
    deleteAuthor: function(id) {
      fetch(this.url+'/.netlify/functions/authorDelete/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'DELETE'})
        .then((data) => {
          this.$router.push('/author');
        }
      )
    },
    createAuthor: function() {
      fetch(this.url+'/.netlify/functions/authorInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.author)})
        .then((data) => {
           this.$router.push('/author');
        }
      )
    }
  }
};
</script>
