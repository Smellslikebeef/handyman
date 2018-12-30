<template>
  <div class="home">
    <Jobs></Jobs>
  </div>
</template>

<script>
// @ is an alias to /src
import Jobs from '@/components/Jobs'

export default {
  name: 'home',
  components: {
    Jobs
  }
}
</script>
