<template>
    <div id="app">
        <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#ff1d5e"
        />
    </div>
</template>

<script>
import {HalfCircleSpinner} from "epic-spinners"

export default {
    components: {
        HalfCircleSpinner
    },
    name: "Spinner"
}
</script>

<style scoped>

</style>

