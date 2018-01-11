<template lang="pug">
main#potato-root
  header
    h3
      router-link(:to="{ name: 'welcome' }") Potato
  summary
    h1 {{ title || 'Potato' }}
    h2(v-if="subtitle") {{ subtitle }}
  mark#loading(v-if="loading") loading…
  router-view(v-else :key="$route.fullPath")
  footer
    InputBox(v-if="inChannel" :channelid="inChannelId")
    p(v-else) All rights reserved © 2014-2018, The Potato development group.
  nav
    div(v-for="domain in domains")
      h3(v-if="domain.channels.length > 0") {{ domain.name }}
      ul
        li(v-for="channel in domain.channels")
          router-link(:to="{ name: 'channel', params: { id: channel.id }}")
            mark(v-if="inChannelId === channel.id") {{ channel.name }}
            span(v-else) {{ channel.name }}
  aside
    p Preferences
</template>

<script>
export default {
  computed: {
    domains () {
      return this.$store.getters.domains
    },
    loading () {
      return this.$store.getters.loading
    },
    title () {
      return this.$store.getters.title
    },
    subtitle () {
      return this.$store.getters.subtitle
    },
    inChannelId () {
      return this.$store.state.route.params.id
    },
    inChannel () {
      return this.$store.state.route.name === 'channel'
    }
  },
  created () {
    this.$store.dispatch('fetchUserSession')
    this.$store.dispatch('startTimerUpdate', 30) // MODIFY for prod
  }
}
</script>

<style lang="stylus">
@import "/static/normalize.css"
greyish-background = #fcfcfc
blueish-background = #fffffd
shadow-color = #e1e1e4
potato-color = #b79268
potato-text = #3d3022
default-horizontal-margin = 30px

#potato-root
  font-family: 'Inter UI', 'Avenir', Helvetica, Arial, sans-serif
  display: grid
  grid-template-areas: "header summary" "navigation main" "aside footer"
  grid-template-columns: minmax(200px, 2fr) 9fr
  grid-template-rows: 4em 1fr fit-content(8em)
  height: 100vh
  max-height: 100vh

#loading
  position: fixed
  left: 50%
  top: 50%

header
  font-weight: 700
  padding: 0 default-horizontal-margin
  grid-area: header
  border-bottom: 1px solid shadow-color
  box-shadow: 0 1px 1px -1px rgba(0,0,0,0.1)
  background-color: potato-color
  color: potato-text
  a
    color: inherit
    text-decoration: none

summary
  font-weight: 700
  grid-area: summary
  background-color: greyish-background
  border-bottom: 1px solid shadow-color
  box-shadow: 0 1px 1px -1px rgba(0,0,0,0.1)
  padding: 1em default-horizontal-margin
  margin-left: 1em
  h1
    text-transform: uppercase
    font-size: 1em
    margin: 0
  h2
    font-size: .8em
    font-style: italic
    font-weight: 200
    margin: 0

footer
  grid-area: footer
  background-color: blueish-background
  overflow-y: auto
  border: 0
  border-top: #93a1a1 solid 1px
  padding: 1em default-horizontal-margin
  margin: 0
  margin-left: 1em
  p
    margin: 0

article
  grid-area: main
  overflow-y: auto
  margin-left: 1em
  padding: 0 default-horizontal-margin

nav
  grid-area: navigation
  background-color: potato-color
  border-right: #93a1a1 solid 1px
  padding-left: default-horizontal-margin
  overflow-x: auto
  color: potato-text
  ul
    list-style-type: none
    padding-left: 1em
    li
      padding-bottom: 1em
  a
    color: inherit
    text-decoration: none

aside
  grid-area: aside
  background-color: potato-color
  color: potato-text
  border-right: #93a1a1 solid 1px
  border-top: 1px solid shadow-color
  box-shadow: 0 1px 1px -1px rgba(0,0,0,0.1)
  padding: 0 default-horizontal-margin

</style>
