<template lang="pug">
article#welcome
  button(@click="refreshAll").alone refresh
</template>

<script>
import { SET_TITLE, SET_SUBTITLE } from '@/store'
import { FETCH_USER_SESSION } from '@/store/about-me'

export default {
  computed: {
    myself () {
      return this.$store.getters.myself
    }
  },
  methods: {
    refreshAll () {
      this.$store.dispatch(FETCH_USER_SESSION)
    }
  },
  mounted () {
    this.$store.dispatch(SET_TITLE, 'Welcome ' + this.myself.description)
    this.$store.dispatch(SET_SUBTITLE, undefined)
  }
}
</script>

<style lang="stylus" >
.alone
  display: block
  margin-left: auto
  margin-right: auto
</style>
