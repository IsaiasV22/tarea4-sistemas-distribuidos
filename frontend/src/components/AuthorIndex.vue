<!-- AuthorIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
        <th>Name</th>
        <th>Nationality</th>
        <th>Birth year</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='author in authors' :key='author.id'>
       <td>{{author.author}}</td>
       <td>{{author.nationality}}</td>
       <td>{{author.birth_year}}</td>
       <td>
       <router-link class="button"
         :to="'/author/show/'+author.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/author/edit/'+author.id">Edit</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/author/delete/'+author.id">Erase</router-link>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/author/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Author Index",
  data() {
    return {
      title: 'Author List',
      authors: []
    };
  },
  mounted() {
    this.allAuthors()
  },
  methods: {
    allAuthors() {
      fetch(this.url+'/.netlify/functions/authorFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.authors = items;
        })
     }
  }
};
</script>
