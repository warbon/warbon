<template>
    <section class="mb-10">
        <div class="text-h5 my-5 ">
            PERSONAL PROJECTS
        </div>
        <v-divider></v-divider>
        <v-card elevation="0" color="transparent">
            <v-list three-line color="transparent">
                <v-list-item v-for="project in projects" :key="project.name">
                    <v-list-item-icon>
                        <v-icon color="green">
                            mdi-record
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="project.name"></v-list-item-title>
                        <v-list-item-subtitle class="ma-2" v-text="project.details"></v-list-item-subtitle>
                        <v-list-item-subtitle class="ma-2">
                            Project Link: 
                            <a :href="project.link">
                              {{ project.link }}
                            </a>
                        </v-list-item-subtitle>
                       <v-list-item-subtitle class="ma-2">
                            Test Account: {{ project.account }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                            <div class="text-left">
                                <span v-for="stack in project.technologies" :key="stack.tech">
                                    <v-chip class="ma-1" color="primary" outlined small>
                                        {{ stack.tech }}
                                    </v-chip>
                                </span>
                            </div>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>

    </section>
</template>


<script>
export default {
    data: () => ({
        projects: [
            {
                name: "Nicole's Closet - Online Store",
                details: " - A sample project of Clothing Online Store with Product Management.",
                link: "https://nicole-closet.herokuapp.com/",
                account: "Login: wba@acware.com, Pass: 12345678",
                technologies: [
                    {
                        tech: "VueJS"
                    },
                    {
                        tech: "Laravel"
                    },
                    {
                        tech: "Javascript"
                    },
                    {
                        tech: "MySQL"
                    },
                    {
                        tech: "Github"
                    },
                    {
                        tech: "VS Code"
                    },
                    {
                        tech: "Vuetify"
                    },
                    {
                        tech: "Heroku"
                    },
                    {
                        tech: "Git"
                    },
                ],
            },
            {
                name: "Event Calendar",
                details: " - A sample project for calendar of events.",
                link: "https://event-calendaryo.herokuapp.com/",
                account: "NA",
                technologies: [
                    {
                        tech: "VueJS"
                    },
                    {
                        tech: "Laravel"
                    },
                    {
                        tech: "Javascript"
                    },
                    {
                        tech: "MySQL"
                    },
                    {
                        tech: "Github"
                    },
                    {
                        tech: "VS Code"
                    },
                    {
                        tech: "Vuetify"
                    },
                    {
                        tech: "Heroku"
                    },
                    {
                        tech: "Git"
                    },
                ],
            },
            {
                name: "iLending",
                details: " - A sample project of money lending.",
                link: "https://ilending.herokuapp.com/",
                account: "Login: wba@acwares.com, Pass: 12345678",
                technologies: [
                    {
                        tech: "VueJS"
                    },
                    {
                        tech: "Laravel"
                    },
                    {
                        tech: "Javascript"
                    },
                    {
                        tech: "MySQL"
                    },
                    {
                        tech: "Github"
                    },
                    {
                        tech: "VS Code"
                    },
                    {
                        tech: "Vuetify"
                    },
                    {
                        tech: "Heroku"
                    },
                    {
                        tech: "Git"
                    },
                ],
            },
            // {
            //     name: "Personal Portfolio",
            //     details: " - My Personal Portfolio",
            //     link: "https://warbon.herokuapp.com/",
            //     account: "NA",
            //     technologies: [
            //         {
            //             tech: "VueJS"
            //         },
            //         {
            //             tech: "NuxtJS"
            //         },
            //         {
            //             tech: "Javascript"
            //         },
            //         {
            //             tech: "Github"
            //         },
            //         {
            //             tech: "VS Code"
            //         },
            //         {
            //             tech: "Vuetify"
            //         },
            //         {
            //             tech: "Heroku"
            //         },
            //         {
            //             tech: "Git"
            //         },
            //     ],
            // },
        ],
    }),
}
</script>


