<template lang="pug">
li(v-bind:id="msg.id")
  figure(v-bind:id="msg.hash")
    div#picture
      img(:src="imageUrl")
    figcaption
      address {{ msg.from_name }}
      time {{ createdDateInWords }}
    blockquote(v-html="msg.text")
</template>

<script>
import * as distanceInWords from 'date-fns/distance_in_words'
import * as dateMax from 'date-fns/max'

export default {
  props: ['msg'],
  computed: {
    createdDateInWords () {
      // this.$store.getters.now may be a few seconds before now
      // which would lead to messages being marked from the future.
      // Take the newest date to prevent that.
      return distanceInWords(dateMax(new Date(), this.$store.getters.now), this.msg.created_date,
        {includeSeconds: true, addSuffix: true})
    },
    imageUrl () {
      let user = this.$store.getters.getUserById(this.msg.from)
      if (user && user.hasOwnProperty('image_name')) {
        return 'http://localhost:8080' + user.image_name
      }
    }
  }
}
</script>

<style lang="stylus">
li
//  flex: 1
  margin: 0
  padding: 0
figure
  margin: .7em 0
  div#picture
    width: 0
    height: 0
    overflow: visible
    position: relative
    img
      width: 1.5em
      transform: translateY(.1em) translateX(-2em)
      filter: opacity(0.9) grayscale(.2)
figcaption
  font-size: .8em
address
  display: inline-block
  font-weight: 600
  font-style: normal
time
  display: inline-block
  font-size: .9em
  filter: contrast(10%) opacity(0.6)
time::before
  font-size: 80%
  content: '•'
  padding: 0em 0.6em
blockquote
  margin: 0.2em 0
  p
    overflow-wrap: break-word
    margin: 0
</style>
