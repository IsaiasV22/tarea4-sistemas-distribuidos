import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import BookIndex from "./components/BookIndex.vue";
import BookDetails from "./components/BookDetails.vue";
import AuthorIndex from "./components/AuthorIndex.vue";
import AuthorDetails from "./components/AuthorDetails.vue";
import PublisherIndex from "./components/PublisherIndex.vue";
import PublisherDetails from "./components/PublisherDetails.vue";

const routes = [
  { path: "/", component: Home },
	
  { path: "/book", component: BookIndex },
  { path: "/book/show/:id", 
    component: BookDetails, props: {show:true} },
  { path: "/book/edit/:id", 
    component: BookDetails, props: {edit:true} },
  { path: "/book/create", 
    component: BookDetails, props: {create:true} },
  { path: "/book/delete/:id", 
    component: BookDetails, props: {delete:true} },

  { path: "/author", component: AuthorIndex },
  { path: "/author/show/:id", 
    component: AuthorDetails, props: {show:true} },
  { path: "/author/edit/:id", 
    component: AuthorDetails, props: {edit:true} },
  { path: "/author/create", 
    component: AuthorDetails, props: {create:true} },
  { path: "/author/delete/:id", 
    component: AuthorDetails, props: {delete:true} },

  { path: "/publisher", component: PublisherIndex },
  { path: "/publisher/show/:id", 
    component: PublisherDetails, props: {show:true} },
  { path: "/publisher/edit/:id", 
    component: PublisherDetails, props: {edit:true} },
  { path: "/publisher/create", 
    component: PublisherDetails, props: {create:true} },
  { path: "/publisher/delete/:id", 
    component: PublisherDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;