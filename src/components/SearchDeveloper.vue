<template>
  <div class="search-wrapper">
    <h3>Search developer in <span></span></h3>
    <multi-select
      :filteredItems="filteredDevelopers"
      @input="searchDeveloper"
      :selectItem="addDeveloper"
      :searchAllDevelopers="allDevelopers"
      :lengthToDisplayDropdown="1"
      dropdownSize="large"
    >
      <template slot="dropdown-content" slot-scope="{ item }">
        <div class="developer-search-profile">
          <div class="profile-image col-2">
            <img src="male-avatar.svg" alt="" />
          </div>
          <div class="profile-name col-10">
            <p>{{ item.firstname + ' ' + item.lastname }}</p>
          </div>
        </div>
      </template>
    </multi-select>
    <d-error :error="error" warning></d-error>
    <d-table v-if="hasSelectedDeveloper" :developers="selectedDeveloper" />
  </div>
</template>

<script>
import _ from 'lodash';
import api from '../api/index';
import MultiSelect from './search/MultiSelect.vue';
export default {
  name: 'search-developer',
  data() {
    return {
      query: '',
      active: false,
      selectedDeveloper: [],
      filteredDevelopers: [],
      error: {}
    };
  },
  components: {
    MultiSelect
  },
  methods: {
    activate() {
      this.active = true;
    },
    deActivate() {
      this.active = false;
    },
    addDeveloper(developer) {
      this.selectedDeveloper = [];
      this.selectedDeveloper.push(developer);
    },
    allDevelopers() {
      this.selectedDeveloper = this.filteredDevelopers;
    },
    searchDeveloper(query) {
      this.fetchDevelopers(query);
    },
    fetchDevelopers: _.debounce(function (query) {
      api
        .get(`users?query=${encodeURIComponent(query)}`)
        .then((result) => {
          this.error = {};
          let filteredDevelopers = result.data.users;
          this.filteredDevelopers = filteredDevelopers.sort((a, b) => b.firstname - a.firstname);
        })
        .catch((err) => {
          this.filteredDevelopers = [];
          this.error = err.response.data;
          console.error(err);
        });
    }, 200)
  },
  computed: {
    hasSelectedDeveloper() {
      return Object.keys(this.selectedDeveloper).length !== 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.search-wrapper {
  position: relative;
  h3 {
    text-align: left;
    margin-bottom: 30px;
    span {
      @media (max-width: 768px) {
        display: block;
      }
      &::before {
        content: '';
        animation: wordSwapper infinite 20s;
        color: #00f2c3;
      }
    }
  }
  @media (min-width: 768px) {
    max-width: 500px;
    margin-bottom: 0px;
    padding-top: 80px;
  }
  margin: 20px auto 40px;
  max-width: 400px;
  width: 100%;

  .developer-search-profile {
    display: flex;
    .profile-image {
      img {
        @media (min-width: 500px) {
          padding: 10px;
        }
        @media (max-width: 500px) {
          padding: 5px;
        }
        @media (max-width: 400px) {
          padding: 2px;
        }
        max-width: 100%;
        height: auto;
      }
    }
    .profile-name {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        margin: 0;
      }
    }
  }
}
</style>