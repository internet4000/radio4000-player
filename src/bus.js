// Instead of emitting property changes back up through
// one component after the other with $emit, do this in any component:

// import bus from './'bus
// bus.$emit('doSomething', 'it works!)

// and in your root component's `created` hook, do this:

// import bus from './'bus
// bus.$on('doSomething', ...)

import Vue from 'vue'
export default new Vue()