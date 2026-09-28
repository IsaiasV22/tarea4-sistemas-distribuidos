<!-- PublisherIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
        <th>Name</th>
        <th>Country</th>
        <th>Founded</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='publisher in publishers' :key='publisher.id'>
       <td>{{publisher.publisher}}</td>
       <td>{{publisher.country}}</td>
       <td>{{publisher.founded}}</td>
       <td>
       <router-link class="button"
         :to="'/publisher/show/'+publisher.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/publisher/edit/'+publisher.id">Edit</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/publisher/delete/'+publisher.id">Erase</router-link>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/publisher/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Publisher Index",
  data() {
    return {
      title: 'Publisher List',
      publishers: []
    };
  },
  mounted() {
    this.allPublishers()
  },
  methods: {
    allPublishers() {
      fetch(this.url+'/.netlify/functions/publisherFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.publishers = items;
        })
     }
  }
};
</script>
