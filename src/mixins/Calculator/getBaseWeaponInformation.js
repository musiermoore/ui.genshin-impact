export default {
    methods: {
        getBaseWeapon() {
            return {
                id: null,
                characteristics: [],
                images: [],
                name: '-',
                rarity: {
                    rarity: '-'
                },
                slug: '-',
                sub_stat: {
                    id: null,
                    name: "-",
                    slug: "-",
                    in_percent: 0
                },
                sub_stat_id: null,
                weapon_type: {
                    type: '-',
                    slug: '-'
                },
                selected_level_characteristics: {}
            }
        }
    }
}
