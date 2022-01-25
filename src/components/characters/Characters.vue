<template>
  <div>
    <div id="titleAndFilters">
      <h1 id="charactersListTitle">Rick & Morty Characters</h1>

      <div id="searchAndFilters">
        <div id="searchBar" @click="showInputSearchFn()">
          <span class="searchTitle"> <i class="bi-search" /> Search : </span>

          <input
            class="rounded-l-full w-full py-6 px-6 text-gray-700 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Rick, Morty, Jerry etc ..."
            v-model="search"
            ref="searchInput"
          />

          <span class="keyPress">F</span>
          <span class="keyPress">CTRL</span>
        </div>

        <div>
          <span
            class="filters"
            v-for="checkItem in filterOptions"
            :key="checkItem.id"
          >
            <Checkbox
              :id="checkItem.name + 'Checkbox'"
              :name="checkItem.id"
              :value="checkItem.name"
              :checked="checkItem.checked"
              @click="emitChange(checkItem)"
              :className="checkItem.class"
              :label="checkItem.name"
            />
          </span>

          <h5 v-if="info.count > 1 && req_status === 200" class="countMesg">
            There are {{ info.count }} characters with this search
          </h5>
          <h5 v-if="info.count === 1 && req_status === 200" class="countMesg">
            There is only one character with this search
          </h5>
        </div>
      </div>
    </div>

    <main role="main">
      <div v-if="!isCharactersListLoading" id="cardList">
        <div id="opacityDiv" :class="{ opacityDivTransition: scrolled }"></div>
        <div
          v-if="req_status === 200"
          class="row cardCharacter justify-content-start"
        >
          <div v-for="character in characters" :key="character.id">
            <CharactersListCard
              :id="character.id"
              :src="character.image"
              :alt="character.name"
              :title="character.name"
              :className="statusColorFn(character.status)"
              :status="character.status"
            />
          </div>
        </div>
        <div v-if="pagination.pages > 1" class="row justify-content-md-center">
          <v-pagination
            id="pagination"
            class="col-md-auto"
            v-if="req_status === 200"
            v-model="page"
            :pages="pagination.pages"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="updateHandler"
          />
        </div>
      </div>
    </main>

    <div v-if="isCharactersListLoading">
      <CharactersListSkeleton />
    </div>
    <div>
      <NetworkErrors
        :req_status="req_status"
        :search="this.search"
        :status="this.query.status"
        :classStatusColor="statusColorFn(this.query.status)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import Checkbox from "../Checkbox.vue";
import NetworkErrors from "../NetworkErrors.vue";
import CharactersListCard from "./CharactersListCard.vue";
import CharactersListSkeleton from "./CharactersListSkeleton.vue";
import VPagination from "@hennge/vue3-pagination";

export interface Filters {
  id?: number;
  name?: string;
  checked?: boolean;
  class?: string;
}

export default defineComponent({
  name: "Characters",
  components: {
    VPagination,
    CharactersListSkeleton,
    Checkbox,
    NetworkErrors,
    CharactersListCard,
  },
  data() {
    return {
      search: "",
      activeFilters: [],
      statusColor: {
        Alive: "badge-success",
        Dead: "badge-danger",
        unknown: "badge-secondary",
      },
      filterOptions: [
        {
          id: 0,
          name: "alive",
          checked: false,
          class: "badge-success",
        },
        {
          id: 1,
          name: "dead",
          checked: false,
          class: "badge-danger",
        },
        {
          id: 2,
          name: "unknown",
          checked: false,
          class: "badge-secondary",
        },
      ] as Filters[],
      query: {
        name: "" as string,
        status: "" as string,
      },
      page: 1,
      showInputSearch: false,
      scrolled: true,
    };
  },
  mounted() {
    this.$store.dispatch("loadData");
    this.$nextTick(() => {
      this.search = this.$store.getters.search;

      this.filterOptions.forEach((filter: Filters) => {
        if (filter.name === this.$store.getters.status) filter.checked = true;
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 70 && e.ctrlKey) {
        this.showInputSearch = true;
        this.$nextTick(() => {
          if (this.$refs.searchInput) {
            this.$refs.searchInput.focus();
          }
        });
      }
    });
  },
  computed: {
    ...mapState([
      "characters",
      "info",
      "req_status",
      "isCharactersListLoading",
      "status",
    ]),
    pagination() {
      return this.$store.getters.info;
    },
  },
  watch: {
    search: {
      handler: function (value: string) {
        this.query.name = value;
        if (this.status) this.query.status = this.status;
        this.$store.dispatch("getSearchResults", this.query);
      },
    },
  },
  created: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      this.scrolled = window.scrollY > 100;
    },
    ...mapActions(["getSearchResults"]),
    showInputSearchFn() {
      this.showInputSearch = true;

      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    emitChange(checkItem: Filters) {
      this.query.status = "";

      this.filterOptions.forEach((filter: Filters) => {
        filter.name === checkItem.name && !checkItem.checked
          ? (filter.checked = true)
          : (filter.checked = false);
      });

      let newQuery = {
        name: "",
        status: "",
      };

      if (checkItem.name && checkItem.checked) {
        newQuery.status = checkItem.name;
        this.query.status = checkItem.name;
      }

      if (this.query.name !== "") newQuery.name = this.query.name;

      this.$store.dispatch("getSearchResults", newQuery);
    },
    updateHandler() {
      let newQuery = `page=${this.page}`;

      if (this.query.name !== "") newQuery += `&name=${this.query.name}`;
      if (this.query.status !== "") newQuery += `&status=${this.query.status}`;

      this.$store.dispatch("getPageResults", newQuery);
    },
    statusColorFn(status: string) {
      if (status === "alive" || status === "dead")
        status = status.charAt(0).toUpperCase() + status.slice(1);
      return this.statusColor[status];
    },
  },
});
</script>

<style scoped>
#titleAndFilters {
  text-align: center;
  margin-top: 100px;
}

#charactersListTitle {
  text-align: center;
  font-family: "RickAndMorty", Helvetica, Arial;
  display: block;
}

#searchBar {
  border-radius: 5px;
  display: inline-block;
  padding: 5px;
}

#search {
  border: none;
  border-radius: 5px;
  background-color: #e8e8e8;
  width: 348px;
}

#searchBar,
#cardList,
#charactersListTitle,
.filters {
  margin-top: 15px;
}

#pagination {
  margin-bottom: 20px;
}

.searchTitle {
  display: block;
  float: left;
}

.keyPress {
  font-size: 12px;
  border: 1px solid grey;
  border-radius: 5px;
  float: right;
  margin-left: 5px;
}

.filters {
  margin-left: 10px;
}

@media screen and (max-width: 575px) {
  #charactersListTitle {
    display: none;
  }

  #titleAndFilters {
    text-align: center;
    margin-top: 75px;
  }

  #searchAndFilters {
    background-color: white;
    overflow: hidden;
    position: fixed;
    top: 76px;
    width: 100%;
    z-index: 3;
  }

  .countMesg {
    font-size: 12px;
  }

  #search {
    width: 250px;
  }

  .keyPress {
    display: none;
  }

  #cardList {
    background-color: white;
    position: relative;
    top: 120px;
    width: 100%;
    z-index: 1;
  }

  .cardCharacter {
    z-index: 2;
  }

  .hidden {
    background: linear-gradient(
      to bottom,
      rgb(214, 89, 89) 0%,
      rgba(233, 233, 233, 0) 100%
    );
    z-index: 1;
  }

  .opacityDivTransition {
    z-index: 4;
    width: 100%;
    height: 150px;
    position: fixed;
    top: 185px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}
</style>
