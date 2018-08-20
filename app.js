Vue.use(vuelidate.default)

const pizzaOrBurger = value => value === 'pizza' || value === 'burger' || !validators.helpers.req(value)
const oldEnoughAndAlive = validators.between(12, 120)

new Vue({
  el: '#app',

  data () {
    return {
      form: {
        name: null,
        age: null,
        email: null,
        newsletter: null,
        githubUsername: null,
        food: null
      }
    }
  },

  validations: {
    form: {
      name: {
        required: validators.required
      },

      age: {
        required: validators.required, // $v.form.age.required
        integer: validators.integer, // $v.form.age.integer
        oldEnoughAndAlive // $v.form.age.oldEnoughAndAlive
      },

      email: {
        email: validators.email,
        required: validators.requiredIf(function () {
          return !!this.form.newsletter
        })
      },

      githubUsername: {
        exists (value) {
          if (!validators.helpers.req(value)) {
            return true
          }
          return axios.get(`//api.github.com/users/${value}`)
        }
      },

      food: {
        pizzaOrBurger
      }
    }
  },

  methods: {
    shouldAppendValidClass (field) { // ex: field = $v.form.email
      return !field.$invalid && field.$model && field.$dirty
    },

    shouldAppendErrorClass (field) { // ex: field = $v.form.email
      return field.$error
    },

    submitForm () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        console.log('📝 Form Submitted', this.form)
      } else {
        console.log('❌ Invalid form')
      }
    }
  }
})