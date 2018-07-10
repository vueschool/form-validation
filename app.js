new Vue({
  el: '#app',

  data () {
    return {
      form: {
        name: null,
        age: null
      }
    }
  },
  
  methods: {
    submitForm () {
      console.log('📝 Form Submitted', this.form)
    }
  }
})