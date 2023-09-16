<template>
    <div class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <router-view />
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="small">
                            <div class="text-muted text-center">Copyright &copy; Reddy Tech 2023</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg-primary {
    background: #f5f7fb !important;
}
</style>
