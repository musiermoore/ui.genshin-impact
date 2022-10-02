export default {
    methods: {
        getBaseCharacterCharacteristics() {
            return {
                'hp': 0,
                'atk': 0,
                'def': 0,
                'elemental-mastery': 0,
                'crit-rate': 5,
                'crit-dmg': 50,
                'healing-bonus': 0,
                'incoming-healing-bonus': 0,
                'energy-recharge': 100,
                'cd-reduction': 0,
                'shield-strength': 0,
                'pyro-dmg-bonus': 0,
                'pyro-res': 0,
                'hydro-dmg-bonus': 0,
                'hydro-res': 0,
                'dendro-dmg-bonus': 0,
                'dendro-res': 0,
                'electro-dmg-bonus': 0,
                'electro-res': 0,
                'anemo-dmg-bonus': 0,
                'anemo-res': 0,
                'cryo-dmg-bonus': 0,
                'cryo-res': 0,
                'geo-dmg-bonus': 0,
                'geo-res': 0,
                'physical-dmg-bonus': 0,
                'physical-res': 0,
            }
        },
        getBaseCharacter() {
            return {
                id: null,
                name: '-',
                element: {
                    element: '-',
                    slug: null
                },
                rarity: '-',
                weapon_type: {
                    type: '-',
                    slug: null
                },
                images: [],
                character_level: null,
                character_levels: []
            }
        }
    }
}
