export default {
    data() {
        return {
            body: null
        }
    },
    mounted() {
        this.body = document.querySelector('body')
    },
    methods: {
        fixBody() {
            this.body.classList.add('position-fixed')
            this.body.classList.add('w-100')
            this.body.classList.add('h-100')
        },
        unfixBody() {
            this.body.classList.remove('position-fixed')
            this.body.classList.remove('w-100')
            this.body.classList.remove('h-100')
        }
    }
}
