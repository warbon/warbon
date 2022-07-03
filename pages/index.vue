<template>
  <v-row justify="center" align="center">
    <!-- <v-col cols="12" sm="8" md="8"> -->
    <v-col>
      <div id="smooth-wrapper">
  <div id="smooth-content">
      <about-me id="aboutme" data-speed="0.5" />
      <summary-info id="summary"/>
      <work-experiences id="work" data-speed="0.8"/>
      <sample-projects id="sample"/>
      <skills id="skills" />
      <education id="edu" data-speed="1.5"/>
</div>
      </div>
      <!-- <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>.
          </p>
          <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card> -->
    </v-col>
  </v-row>
</template>

<script>

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";

export default {
    mounted() {
        // const smoother = ScrollSmoother.create({
        //   smooth: 2,   // seconds it takes to "catch up" to native scroll position
        //   effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
        // });
        gsap.fromTo("#aboutme", { opacity: 0, x: -500 }, { opacity: 1, x: 1, duration: 3 });
         gsap.fromTo("#summary", { opacity: 0, x: 500 }, { opacity: 1, x: 1, duration: 3 });
        gsap.fromTo("#work", { opacity: 0, x: -500 }, { opacity: 1, x: 1, duration: 3 });
        gsap.fromTo("#sample", { opacity: 0, x: 500 }, { opacity: 1, x: 1, duration: 3 });
        gsap.fromTo("#edu", { opacity: 0, x: -500 }, { opacity: 1, x: 1, duration: 3 });
        // pin box-c when it reaches the center of the viewport, for 300px
        ScrollTrigger.create({
            trigger: "#edu",
            pin: true,
            start: "center center",
            end: "+=500"
        });
        // scroll to the spot where .box-c is in the center.
        // parameters: element, smooth, position
        // smoother.scrollTo(".box-c", true, "center center");
        // or you could animate the scrollTop:
        // gsap.to(smoother, {
        //  scrollTop: smoother.offset(".box-c", "center center"),
        //  duration: 1
        // });
    },

}

</script>