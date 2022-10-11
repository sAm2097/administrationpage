<template>
  <div class="users">    
    <PageUsers />
  </div>
</template>

<script>
// @ is an alias to /src
import PageUsers from '@/components/PageUsers'
export default {
  name: 'UsersView',
  components: {
    PageUsers
  }
}
</script>
