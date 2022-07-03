<template>
  <section>
    <div class="text-h5 my-5 ">
      WORK EXPERIENCE
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
              <v-subheader>Projects Involved | Developed  | Maintained</v-subheader>
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
        company: "Tsuneishi Technical Services (Phils.), Inc.",
        position: "IT Supervisor | Lead Developer",
        year: 'June 2018 - June 2022',
        color: 'green',
        duties: [
          {
            duty: "Analyze, Design, Develop and Maintain in-house applications to improve business processes."
          },
          {
            duty: "Supervise and collaborate with developers/programmers on their assigned tasks/projects and provide updates."
          },
          {
            duty: "Provide Continuous improvement to existing applications and databases."
          },
          {
            duty: "Supervise, administer, and maintain (Servers, Networks, Backup, etc.) to avoid disruption and ensuring business continuity."
          },
          {
            duty: "Supervise and collaborate with the IT Staffs on their assigned tasks and ensure that they perform well to their duties and responsibilities."
          },
          {
            duty: "VMware vSphere Datacenter and Data Storage Administration."
          },
          {
            duty: "Involves in IT Strategic Planning, Budgeting, and ensuring that all IT policies and procedures are properly maintained and implemented."
          },
        ],
        projects: [
          {
            name: "Human Resource Information System",
            details: " - Manage information related to employees.",
            technologies: [
              {
                tech: "ASP.Net Web API"
              },
              {
                tech: "Blazor"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Azure DevOps"
              },
              {
                tech: "Visual Studio/VS Code"
              },
              {
                tech: "Entity Framework"
              },
              {
                tech: "Linq"
              },
              {
                tech: "MudBlazor"
              },
            ],
          },
          {
            name: "TDreams Drawing Delivery Monitoring System",
            details: " - Monitor drawings delivery and staff in-charged.",
            technologies: [
              {
                tech: "ASP.Net MVC"
              },
              {
                tech: "C#"
              },
              {
                tech: "Oracle"
              },
              {
                tech: "DevExpress"
              },
              {
                tech: "Javascript"
              },
              {
                tech: "Bitbucket"
              },
              {
                tech: "Git"
              },
              {
                tech: "Sourcetree"
              },
              {
                tech: "Visual Studio"
              },
              {
                tech: "Entity Framework"
              },
              {
                tech: "Linq"
              }
            ],
          },
        ]
      },
      {
        company: "BTC Power",
        position: "Software Developer (Project Based)",
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
        position: "Software Developer | System Administrator (Project Based)",
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
      {
        company: "Tsuneishi Technical Services (Phils.), Inc.",
        position: "Assistant IT Supervisor | Lead Developer",
        year: 'June 2012 - June 2018',
        color: 'amber',
        duties: [
          {
            duty: "Analyze, Design, Develop and Maintain in-house applications to improve business processes."
          }
        ],
        projects: [
          {
            name: "HR Employee Self Service",
            details: " - Handles employee related request (Promotion/Transfer Notice, Business Trip, Travel Authority)",
            technologies: [
              {
                tech: "ASP.Net MVC"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "JQuery"
              },
              {
                tech: "Javascript"
              },
              {
                tech: "Entity Framework"
              },
              {
                tech: "Linq"
              },
              {
                tech: "Visual Studio"
              },
              {
                tech: "TFS"
              },
            ],
          },
          {
            name: "HR Employee Feedback Survey",
            details: " - Handles employee feedback survey (Feedback 360, Company Events and Activities, etc.)",
            technologies: [
              {
                tech: "ASP.Net MVC"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "JQuery"
              },
              {
                tech: "Javascript"
              },
              {
                tech: "Entity Framework"
              },
              {
                tech: "Linq"
              },
              {
                tech: "Visual Studio"
              },
              {
                tech: "TFS"
              },
            ],
          },
          {
            name: "GA - Employee Concerns & Incident Report",
            details: " - Handles office/dorms related concerns and incidents reported by the employee",
            technologies: [
              {
                tech: "ASP.Net MVC"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "JQuery"
              },
              {
                tech: "Javascript"
              },
              {
                tech: "Entity Framework"
              },
              {
                tech: "Linq"
              },
              {
                tech: "Visual Studio"
              },
              {
                tech: "TFS"
              },
            ],
          },
        ]
      },
      {
        company: "Tsuneishi Technical Services (Phils.), Inc.",
        position: "Software Developer",
        year: 'June 2007 - June 2012',
        color: 'cyan',
        duties: [
          {
            duty: "Analyze, Design, Develop and Maintain in-house applications to improve business processes."
          }
        ],
        projects: [
          {
            name: "Office Supplies Inventory System",
            details: " - The project involves stock maintenance, user maintenance, requisition, withdrawal of supplies, stock transfers, purchase orders, suppliers, and receiving of supplies. It monitors the movement of stocks in and out as well as their availability.",
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
                tech: "Crystal Reports"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Manhour & Billing System",
            details: " - The project involves the Man-Hour Quotations, Price Quotations, Business Reports, Job Orders, Sales Invoices, Billings, and Statements that involve the computation of the charges during cut-off periods.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Business Report System",
            details: " - The system records the actual manhours and monitors the daily charging from all Design Engineers.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Drawings Delivery Monitoring",
            details: " - Monitors the delivery of all ship design drawings in the Design Department.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Copy Room Job Ticket",
            details: " - Monitors the printing/reproduction of design drawings requested from the end-users.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Meeting Room Reservation",
            details: " - Monitors reservation of all meeting rooms applied by the end-users to avoid conflict in meeting schedules.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "IT Service Request",
            details: " - To support end-user requirements in terms of computer problems encountered and software installation. The program record and monitor the computer maintenance request applied by the end-user.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "IT Assets Inventory System",
            details: " - The system will record all the computers assigned to the users and software licenses. And it helps to identify the available software licenses and standby computers.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Drawing Revision Verification Record",
            details: " - The application helps the design engineers to record and monitor all revised and affected drawings and also avoid the re-occurrence of the errors.",
            technologies: [
              {
                tech: "ASP.Net WebForms"
              },
              {
                tech: "C#"
              },
              {
                tech: "MSSQL"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
        ],
      },
      {
        company: "Gaisano Main, Inc.",
        position: "Programmer",
        year: 'September 2004 - June 2007',
        color: 'orange',
        duties: [
          {
            duty: "Developed and maintained in-house application."
          },
          {
            duty: "Managed and maintained all in-house servers to ensures it were up and running during store hours."
          },
          {
            duty: "Projects involved: (PO Card and Suki Card System)"
          }
        ],
        projects: [
           {
            name: "PO Card System",
            details: " - The system involves the membership for guarantor, p.o. card issuance, p.o. card verification, accounts withdrawal, billings, and billing statements, it automatically computes the charges during cut-off periods.",
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
                tech: "Crystal Reports"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Office Supply Requistion",
            details: " - The application allows employees to request to purchase the needed office supplies, fixed assets, and item inventory.",
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
                tech: "Crystal Reports"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
          {
            name: "Suki Card System",
            details: " - Maintained, supported and developed/modified new features of the existing desktop application. The application involves the membership, claiming gifts, downloading, and uploading of members’ daily purchases from the IBM Cash Registers main controller. Also monitors members’ points and gift inventory.",
            technologies: [
              {
                tech: "Desktop Application"
              },
              {
                tech: "WinForms"
              },
              {
                tech: "Visual Basic"
              },
              {
                tech: "MS Access"
              },
              {
                tech: "Crystal Reports"
              },
              {
                tech: "Visual Studio"
              },
            ],
          },
        ],
      },
    ],
  }),
}
</script>