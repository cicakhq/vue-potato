<template lang="pug">
article(v-if="currentChannel").channel
  div#reverse-scroll
    mark(v-if="loading") loading messages…
    mark(v-if="usersTyping") {{ usersTyping }}
    ul(v-if="messages")
      Message(v-for="message in messages" :msg="message" :key="message.id")
</template>

<script>
import { SET_TITLE, SET_SUBTITLE } from '@/store'
import { FETCH_CHANNEL_MESSAGES, SUBSCRIBE_TO_CHANNEL_MESSAGES, FETCH_CHANNEL_DETAILS } from '@/store/channel'
import { FETCH_CHANNEL_USERS } from '@/store/users'

const pixelTolerance = 5
var scrollWasAtBottom = true

export default {
  computed: {
    channelId () { return this.$store.state.route.path.split('/')[2] },
    currentChannel () {
      let channel = this.$store.getters.getChannelById(this.channelId)
      if (!channel) {
        console.log('Channel ', this.channelId, ' does not exist, redirecting')
        this.$router.push('/')
      }
      this.$store.dispatch(SET_TITLE, channel.name)
      this.$store.dispatch(SET_SUBTITLE, channel.topic)
      return channel
    },
    usersTyping () {
      let list = this.$store.getters.getChannelTypingState(this.channelId)
      let result
      let count = 0
      let last = false
      if (list && list.length > 0) {
        list.forEach((u) => {
          let user = this.$store.getters.getUserById(u)
          let name
          last = (count === list.length - 1)
          if (user && user.hasOwnProperty('description')) {
            name = user.description
          } else {
            name = 'someone'
            last = true
          }
          if (count === 0) {
            result = name
          } else if (last) {
            result += ' and ' + name
          } else {
            result += ', ' + name
          }
          if (count > 4 && list.length > 4) {
            result += ' and others '
            return
          }
          count++
        })
        if (count > 1) {
          result += ' are typing…'
        } else {
          result += ' is typing…'
        }
        return result
      }
      return result
    },
    messages () {
      let msg = this.$store.getters.getMessagesFromChannelId(this.channelId)
      return msg
    },
    loading () {
      return this.$store.getters.getChannelLoadingState(this.channelId)
    },
    typing () {
      return this.$store.getters.getChannelTypingState(this.channelId)
    }
  },
  methods: {
    checkAndFixScrollPosition () {
      let scrollPositionBottom = this.$el.scrollHeight - this.$el.offsetHeight
      let scrollIsAtBottom = (this.$el.scrollTop === scrollPositionBottom)
      if (scrollWasAtBottom && !scrollIsAtBottom) {
        this.$el.scrollTop = scrollPositionBottom
      }
    }
  },
  beforeUpdate () {
    let scrollPositionBottom = this.$el.scrollHeight - this.$el.offsetHeight
    scrollWasAtBottom = (Math.abs(this.$el.scrollTop - scrollPositionBottom) <= pixelTolerance)
  },
  updated () {
    this.checkAndFixScrollPosition()
  },
  mounted () {
    // handle resize events to keep scroll position in check
    window.onresize = this.checkAndFixScrollPosition
    if (this.currentChannel) {
      this.$store.dispatch(FETCH_CHANNEL_MESSAGES, this.channelId)
      this.$store.dispatch(FETCH_CHANNEL_DETAILS, this.channelId)
      this.$store.dispatch(SUBSCRIBE_TO_CHANNEL_MESSAGES, this.channelId)
      this.$store.dispatch(FETCH_CHANNEL_USERS, this.channelId)
    }
    scrollWasAtBottom = true
    this.checkAndFixScrollPosition()
  }
}
</script>

<style lang="stylus" scoped>
mark
  position: fixed
  top: 100
  transform: translateY(1em)
  font-size: .8em
  filter: opacity(.8) saturate(.6)
  padding: .1em 1em

#reverse-scroll
  display: flex
  flex-direction:column-reverse

ul
  list-style-type: none
  padding: 0
  margin: 0
//  display: flex
//  flex-direction: column-reverse
</style>
