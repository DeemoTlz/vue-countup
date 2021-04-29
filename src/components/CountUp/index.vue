<template>
  <span ref='countup'></span>
</template>

<script>
import { CountUp } from 'countup.js';

export default {
  name: "count-up",
  data() {
    return {
      numAnim: null
    }
  },
  props:{
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    if (this.autoplay) {
      this.initCountUp()
    }
  },
  methods: {
    initCountUp() {
      this.numAnim = new CountUp(this.$refs.countup,2017, {
        prefix: this.prefix,
        suffix: this.suffix
      })
      this.numAnim.start()
    }
  }
}
</script>

<style scoped>

</style>
