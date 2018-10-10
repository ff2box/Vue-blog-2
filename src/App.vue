<!--<template>-->
<!--<div id="app">-->
<!--<img src="./assets/logo.png">-->
<!--<router-view/>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--name: 'App'-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!-- -webkit-font-smoothing: antialiased;-->
<!-- -moz-osx-font-smoothing: grayscale;-->
<!--text-align: center;-->
<!--color: #2c3e50;-->
<!--margin-top: 60px;-->
<!--}-->
<!--</style>-->

<template>
    <!--<div>-->
    <!--<navigation-header></navigation-header>-->
    <div id="app" class="container-fluid" style="padding: 0;margin: 0">
        <router-view/>
    </div>
    <!--</div>-->
</template>
<script>
    // import NavigationHeader from '@/pages/common/NavigationHeader';

    export default {
        name: 'App',
        // components: {
        //     NavigationHeader
        // }
    }
</script>
<style>
</style>
