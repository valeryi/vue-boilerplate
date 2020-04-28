<template>
  <div class="users-component">
    <div v-if="$apollo.loading">Loading...</div>
    <table v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Comfirmed</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in allUsers" :key="user._id">
          <td>{{ index + 1 }}</td>
          <td>{{ user._id }}</td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.confirmed }}</td>
          <td>{{ user.createdAt | dateFormat("YYYY-MM-DD HH:mm") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import allUsersGQL from "@/graphql/allUsers.gql";
import moment from "moment";

export default {
  name: "Users",
  data: () => {
    return {
      users: null,
    };
  },
  apollo: {
    allUsers() {
      return {
        query: allUsersGQL,
      };
    },
  },
  created() {
    // this.$apollo
    //   .query({
    //     query: allUsersGQL
    //   })
    //   .then(({ data }) => {
    //     const { allUsers } = data;
    //     this.users = allUsers;
    //   });
  },
  mounted: async function() {
    this.users = this.allUsers;
  },
  filters: {
    dateFormat: function(value, format) {
      if (!value) return "";
      const fmt = format || "";

      return moment(value).format(fmt);
    },
  },
};
</script>

<style lang="scss">
.users-component {
  display: flex;
  justify-content: center;
  background-color: #fceed1;

  & > table {
    width: 70%;
  }
}
</style>
