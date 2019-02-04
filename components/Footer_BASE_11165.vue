<template>
    <v-footer height="auto" color="primary lighten-1">
        <v-layout justify-center row wrap align-center>
            
            <v-flex primary lighten-2 text-center white--text xs12>
                <v-card flat tile class="primary lighten-1 white--text text-xs-center" >
                    <v-btn v-for="icon in icons" :key="icon.icon" class="mx-3 white--text" icon :href="icon.url">
                        <v-icon size="24px">{{ icon.icon }}</v-icon>
                    </v-btn>
                </v-card>
            </v-flex>
            

            <v-flex primary lighten-2 py-3 text-center white--text xs12>
                <span class="footer-item">CNPJ 30.249.014/0001-04</span>
                <span class="footer-item">SUSEP 20.2021328.0</span>
                <span class="footer-item">&copy;2018 — <strong>Cotamos.com</strong></span>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                icons: [
                    { icon:'fab fa-facebook', url: 'https://www.facebook.com/cotamoscorretora' },
                    // { icon:'fab fa-twitter' },
                    // { icon:'fab fa-google-plus' },
                    // { icon:'fab fa-linkedin' },
                    // { icon:'fab fa-instagram' }
                ]
            };
        },
        props: {
            hideLogo: {
                type: Boolean,
                default: false,
                required: false
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footer-item {
        display: block;
    }
</style>
