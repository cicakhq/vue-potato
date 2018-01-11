<template lang="pug">
fieldset#input-box
  div#channel-input(contenteditable=true @keydown="keydown")
</template>

<script>
import api from '@/api/potato'

const sendTypingEveryMilliseconds = 5000
var lastSent = 0

export default {
  props: ['channelid'],
  data: function () {
    return { value: '' }
  },
  mounted () {
    let observer = new MutationObserver(this.reactToMutation)
    observer.observe(this.$el, { characterData: true, subtree: true })
  },
  methods: {
    sendTyping () {
      if (Date.now() - lastSent > sendTypingEveryMilliseconds) {
        console.log('send /channel/' + this.channelid + '/type')
        api.potato('channel/' + this.channelid + '/type', 'POST', {state: true}).then(function () { lastSent = Date.now() })
      }
    },
    reactToMutation (mutations) {
      console.log(mutations)
      for (let mutation of mutations) {
        if (mutation.type === 'characterData') {
          this.value = mutation.target.textContent
        }
      }
    },
    sendMessage () {
      let payload = { text: this.value }
      console.log('send message: ', payload)
      api.potato('channel/' + this.channelid + '/create', 'POST', payload).then((r) => { console.log(r) })
      this.value = ''
    },
    keydown (event) {
      // detect special keys
      this.sendTyping()
      if (event.code === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        this.$el.firstChild.textContent = ''
        return this.sendMessage()
      }
      // TODO check not locked
      // DONE send is typing
      // TODO callback for the resize, still required?
      // DONE ENTER sends, but not shift-ENTER
      // TODO ESC cancels
      // TODO search for magic characters (@, :)
      // TODO manage placeholder
      // TODO create TAGS (uneditable and place them)
      // TODO manage automatic focus
    }
  }
}
</script>

<style lang="stylus">
#input-box
  margin: 0
  padding: 0
  border: 0
  height: 100%
#channel-input
  padding: 0
  box-shadow: none
  outline: 0
  height: 100%
</style>
