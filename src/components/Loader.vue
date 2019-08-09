<template>
    <v-overlay :value="overlay">
 <v-progress-circular indeterminate :size="94" :width="7" color="white" ></v-progress-circular>

    </v-overlay>
</template>
<script>
export default {
    name:'loader'
}
</script>
