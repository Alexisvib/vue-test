<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue'
import AxiosHelpers from '@helpers/AxiosHelpers';

type Product = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[],
}

const products: Ref<Product[]> = ref([]);
const productsFiltered: Ref<Product[]> = ref([]);
const search = ref('');



onMounted(() => {
  const urlToFetch = 'https://dummyjson.com/products';
  AxiosHelpers.getRequest(urlToFetch)
    .then((response) => {
      const productData = response.data.products as Product[];
      products.value = productData ;
    })
})

watch([search, products, productsFiltered], () => {
  if (search.value) {
    productsFiltered.value = products.value.filter((user) => user.title.includes(search.value))
  } else {
    productsFiltered.value = products.value;
  }
})

</script>

<template>
  <header class="w-screen">
    <h1 class="font-sans hover:font-serif text-xl">Coucou</h1>
    <input type="search" v-model="search"  class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="search value" required>
    <div class="flex flex-row flex-wrap max-w-max h-screen ">
      <div v-for="product in productsFiltered" :key="product.id" class="text-center content-center min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] mr-5 mb-5 shadow-xl">
        <h1>{{ product.title }}</h1>
        <img :src="product.thumbnail" class="max-w-20 max-h-20" />
      </div>
    </div>
  </header>

</template>

<style scoped>

</style>
