<template>
    <section>
      <div class="text-h5 my-5 ">
        OTHER PROJECTS
      </div>
      <v-divider></v-divider>
      <v-timeline align-top dense>
        <v-timeline-item v-for="(year, i) in years" :key="i" :color="year.color" small>
  
          <span :class="`h3 font-weight-light ${year.color}--text`" v-text="year.year"></span>
  
          <div class="py-4">
            <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">
              {{ year.position }}
            </h2>
            <h3 :class="`font-weight-light mb-4 ${year.color}--text`">
              {{ year.company }}
            </h3>
            <div>
              <v-list>
                <v-subheader>Duties and Responsibilities</v-subheader>
                <v-list-item v-for="item in year.duties" :key="item.duty">
                  <v-list-item-icon>
                    <v-icon color="green">
                      mdi-star
                    </v-icon>
                  </v-list-item-icon>
  
                  <v-list-item-content>
                    <v-list-item-title v-text="item.duty"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
  
            <div>
              <v-list three-line>
                <v-subheader>Project Details</v-subheader>
                <v-list-item v-for="project in year.projects" :key="project.name">
                  <v-list-item-icon>
                    <v-icon color="green">
                      mdi-record
                    </v-icon>
                  </v-list-item-icon>
  
                  <v-list-item-content>
                    <v-list-item-title v-text="project.name"></v-list-item-title>
                    <v-list-item-subtitle class="ma-2" v-text="project.details"></v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <div class="text-left">
                        <span v-for="stack in project.technologies" :key="stack.tech" >
                           <v-chip class="ma-1"  color="primary" outlined small>
                          {{ stack.tech }}
                        </v-chip>
                        </span>
                       
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </section>
  
  </template>
  
  
  <script>
  export default {
    data: () => ({
      years: [
        {
          company: "BTC Power",
          position: "Time Keeping Sytem",
          year: 'May 2021 - June 2021',
          color: 'indigo',
          duties: [
            {
              duty: "Designed and Developed Time Keeping Sytem."
            },
            {
              duty: "Integrate application to card reader device."
            },
            {
              duty: "Trained and assisted users on how to used the application."
            }
          ],
          projects: [
             {
              name: "Time Keeping Systems",
              details: " - The application captures employee clock In/Out and displays employee information and logs to screen.",
              technologies: [
                {
                  tech: "Desktop Application"
                },
                {
                  tech: "WinForms"
                },
                {
                  tech: "C#"
                },
                {
                  tech: "MS Access"
                },
                {
                  tech: "Visual Studio"
                },
              ],
            },
          ],
        },
        {
          company: "New Yutek Hardware",
          position: "Sales and Inventory Sytem",
          year: 'March 2018 - June 2019',
          color: 'red',
          duties: [
            {
              duty: "Designed and Developed Sales and Inventory Sytem."
            },
            {
              duty: "Setup and Configure Network and Server"
            },
            {
              duty: "Trained and assisted users on how to used the application."
            }
          ],
          projects: [
             {
              name: "Sales and Inventory Systems",
              details: " - The system involves the Sales Order, Sales Invoice, Purchaser Order, Receiving Report, Item Inventory, Return Items, and Reports.",
              technologies: [
                {
                  tech: "Desktop Application"
                },
                {
                  tech: "WinForms"
                },
                {
                  tech: "C#"
                },
                {
                  tech: "MSSQL"
                },
                {
                  tech: "Entity Framework"
                },
                {
                  tech: "Linq"
                },
                {
                  tech: "Microsoft Reporting"
                },
                {
                  tech: "Visual Studio"
                },
                {
                  tech: "TFS"
                },
              ],
            },
          ],
        },
      ],
    }),
  }
  </script>