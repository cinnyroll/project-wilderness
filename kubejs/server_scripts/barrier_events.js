// example of influencing the barrier through crafting a spellbook
// update to use flags to prevent multiple triggerings
ItemEvents.crafted(event => {
    let data = event.server.persistentData

    if (event.item.id == 'irons_spellbooks:diamond_spell_book') {
        if (!data.firstSpellbookCrafted) {
            data.firstSpellbookCrafted = true

            global.changeBarrier(event.server, -5)
        }
    }
})


