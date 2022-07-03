<template>
  <section class="mb-10">
    <div class="text-h5 my-5 ">
        SKILLS
    </div>
    <v-divider></v-divider>
  <v-card elevation="0" color="transparent">
   <div class="mt-2">
      <v-row v-for="skill in skills" :key="skill.name" dense>
      <v-col 
        cols="12"
        md="6"
      >
        <div class="text-h6">
        {{ skill.name }}
    </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
       <v-rating
      v-model="skill.rating"
      background-color="green lighten-3"
      color="green"
      length="5"
      meduim
      readonly
    ></v-rating>
      </v-col>
     
    </v-row>
    <!-- <v-rating
      v-model="rating"
      background-color="purple lighten-3"
      color="purple"
      large
      readonly
    ></v-rating>
    <v-rating
      v-model="rating"
      background-color="pink lighten-3"
      color="pink"
      large
    ></v-rating>
    <v-rating
      v-model="rating"
      background-color="orange lighten-3"
      color="orange"
      large
    ></v-rating>
    <v-rating
      v-model="rating"
      background-color="green lighten-3"
      color="green"
      large
    ></v-rating>
    <v-rating
      v-model="rating"
      background-color="red lighten-3"
      color="red"
      large
    ></v-rating>
    <v-rating
      v-model="rating"
      background-color="indigo lighten-3"
      color="indigo"
      large
    ></v-rating> -->
  </div>
  </v-card>

  </section>
</template>


<script>
  export default {
    data: () => ({
      rating: 4,
      skills: [
        {
            name: "C#",
            rating: 4,
            color: "purple"
        },
        {
            name: "ASP.Net MVC",
            rating: 4,
            color: "pink"
        },
        {
            name: "Asp.Net WebForms",
            rating: 4,
            color: "green"
        },
        {
            name: "Windows Desktop Applications - WinForms",
            rating: 4,
            color: "orange"
        },
        {
            name: "ASP.Net WebAPI",
            rating: 4,
            color: "red"
        },
        {
            name: "ASP.Net Core",
            rating: 3,
            color: "blue"
        },
        {
            name: "Blazor",
            rating: 3,
            color: "indigo"
        },
        {
            name: "Entity Framework",
            rating: 4,
            color: "red"
        },
        {
            name: "Linq",
            rating: 4,
            color: "yellow"
        },
        {
            name: "Azure DevOps",
            rating: 3,
            color: "blue"
        },
        {
            name: "VueJS",
            rating: 3,
            color: "purple"
        },
        {
            name: "Laravel",
            rating: 3,
            color: "pink"
        },
        {
            name: "Javacript",
            rating: 4,
            color: "yellow"
        },
        {
            name: "Vuetify",
            rating: 3,
            color: "green"
        },
        {
            name: "NuxtJS",
            rating: 3,
            color: "green"
        },
        {
            name: "SQL Server",
            rating: 4,
            color: "indigo"
        },
        {
            name: "MySQL",
            rating: 3,
            color: "pink"
        },
        {
            name: "Oracle",
            rating: 4,
            color: "blue"
        },
        {
            name: "Visual Studio/VS Code",
            rating: 4,
            color: "orange"
        },
        {
            name: "Microsoft Azure",
            rating: 3,
            color: "purple"
        },
        {
            name: "Windows Server Administration",
            rating: 4,
            color: "yellow"
        },
        {
            name: "VMWare vSphere/VCenter Administration",
            rating: 4,
            color: "green"
        },
        {
            name: "Docker",
            rating: 2,
            color: "indigo"
        },
        {
            name: "Ubuntu/Linux",
            rating: 2,
            color: "purple"
        },

      ]
    }),
  }
</script>