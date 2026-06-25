/*
 This script defines a hidden barrier stat for all aspect of the modpack to read
 Helper function for modifying the barrier stat is also listed here
*/



// initial declaration of barrier
ServerEvents.loaded(event => {

    if (event.server.persistentData.barrier == null) {
        event.server.persistentData.barrier = 100
    }
})


// connect barrier to game stages
global.updateBarrierStage = server => {

    let stage = global.getBarrierStage(server)

    server.players.forEach(player => {

        player.stages.remove('protected')
        player.stages.remove('disturbed')
        player.stages.remove('breached')
        player.stages.remove('corrupted')
        player.stages.remove('collapse')

        player.stages.add(stage)
    })
}

// helper function to interact with barrier strength
// can be called with global.changeBarrier(event.server, <integer>)
// note that for positive integers a + sign should not be included
global.changeBarrier = (server, amount) => {

    let barrier = server.persistentData.barrier ?? 100

    barrier += amount

    barrier = Math.max(0, Math.min(100, barrier)) //ensures barrier state has a minimum of 0 and a max of 100

    server.persistentData.barrier = barrier // sets new barrier stat
    global.updateBarrierStage(server) // sets barrier stage based on new stat
    global.checkBarrierTransition(server) // call transition helper to compare barrier stages
    
}

