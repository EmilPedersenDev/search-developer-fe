<template>
  <form @submit.prevent="submit" autocomplete="on">
    <h1>Create Account</h1>
    <div class="name-wrapper">
      <d-input
        name="given-name"
        class="name firstName"
        v-model="model.firstname"
        inputLabel="First name"
        autocomplete="given-name"
        required
        :invalid="$v.model.firstname.$error"
        :blur="$v.model.firstname.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.firstname.$dirty && !$v.model.firstname.required">First name required</span>
      </d-input>
      <d-input
        name="family-name"
        class="name lastName"
        v-model="model.lastname"
        inputLabel="Last name"
        autocomplete="family-name"
        required
        :invalid="$v.model.lastname.$error"
        :blur="$v.model.lastname.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.lastname.$dirty && !$v.model.lastname.required">Last name required</span></d-input
      >
    </div>
    <div class="email-wrapper">
      <d-input type="email" name="email" v-model="model.email" inputLabel="Email" autocomplete="email" required :invalid="$v.model.email.$error" :blur="$v.model.email.$touch">
        <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.email">Not a valid email</span>
        <span class="input-error" slot="error" v-if="$v.model.email.$dirty && !$v.model.email.required">Email is required</span>
      </d-input>
    </div>
    <div class="password-wrapper">
      <d-input
        type="password"
        name="password"
        v-model="model.password"
        inputLabel="Password"
        autocomplete="new-password"
        required
        :invalid="$v.model.password.$error"
        :blur="$v.model.password.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.required">Password required</span>
        <span class="input-error" slot="error" v-if="$v.model.password.$dirty && !$v.model.password.minLength">Password need to contain 8 characters</span>
      </d-input>
      <d-input
        type="password"
        name="password"
        v-model="model.confirmPassword"
        inputLabel="Confirm password"
        autocomplete="new-password"
        required
        :invalid="$v.model.confirmPassword.$error"
        :blur="$v.model.confirmPassword.$touch"
      >
        <span class="input-error" slot="error" v-if="$v.model.confirmPassword.$dirty && !$v.model.confirmPassword.sameAsPassword">Password differs</span>
      </d-input>
    </div>
    <div class="button-wrapper">
      <d-button type="submit" secondary :disabled="$v.$invalid">Submit</d-button>
    </div>
  </form>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import api from '../../api/index';
import model from '../../services/model/models';
export default {
  name: 'register',
  data() {
    return {
      model: model.registerModel
    };
  },
  validations: {
    model: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    submit() {
      api
        .post('auth/signup', this.model)
        .then((result) => {
          console.log('Successful');
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
form {
  padding: 0 40px;
}
h1 {
  text-align: center;
}

.name-wrapper {
  display: flex;
  justify-content: space-between;
  .name {
    flex-basis: 48%;
  }
}
.button-wrapper {
  margin-top: 40px;
  text-align: right;
  .d-button {
  }
}
</style>