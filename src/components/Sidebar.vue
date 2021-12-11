<template>
    <div class = "sidebar">
        <h1>Side bar</h1>
        <button class = "logout"
            type="button"
            @click="close"                
            aria-label="Log out button"
          >
          Logout
            <!-- <font-awesome-icon icon = "trash" /> -->
          </button>
    </div>
</template>

<script>
  export default {
    name: 'Sidebar',
     methods: {
      close() {
        this.$emit('close');
      },
    },
  };

</script>


<style>
.sidebar{
  width: 150px;
  line-height: 1.5;
  background: #51c2f6;
  border-right: 1px solid #d3e2e8;
  padding: 2em;
}

.logout{
  width: 150px;
}
</style>