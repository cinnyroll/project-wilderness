/*
 This script contains all events related to barrier stages and the events that notify the player
 changes to the barrier stage.
*/


// definition of order of barrier stage changes
const barrierStageOrder = {
    protected: 4,
    disturbed: 3,
    breached: 2,
    corrupted: 1,
    collapse: 0
}

// array of event definitions for when the barrier falls
const barrierFallEvents = {
    disturbed: {
        title: "The Barrier Trembles",
        subtitle: "Something ancient stirs.",
        sound: "barrier:barrier_tremble"
    },

    breached: {
        title: "The Barrier Cracks",
        subtitle: "The dead remember the world.",
        sound: "minecraft:entity.ender_dragon.growl"
    },

    corrupted: {
        title: "The Barrier Fractures",
        subtitle: "The world begins to decay.",
        sound: "minecraft:entity.wither.spawn"
    },

    collapse: {
        title: "THE BARRIER FALLS",
        subtitle: "Nothing remains to hold them back.",
        sound: "minecraft:entity.ender_dragon.death"
    }
}

// array of event definitions for when the barrier rises
const barrierMendEvents = {
    protected: {
        title: "The Barrier is Restored",
        subtitle: "The world is safe once more.",
        sound: "playsound minecraft:block.beacon.activate master"
    },
    disturbed: {
        title: "The Barrier Trembles",
        subtitle: "Something ancient stirs.",
        sound: "minecraft:entity.ender_dragon.ambient"
    },

    breached: {
        title: "The Barrier Cracks",
        subtitle: "The dead remember the world.",
        sound: "minecraft:entity.ender_dragon.growl"
    },

    corrupted: {
        title: "The Barrier Fractures",
        subtitle: "The world begins to decay.",
        sound: "minecraft:entity.wither.spawn"
    },

    collapse: {
        title: "THE BARRIER FALLS",
        subtitle: "Nothing remains to hold them back.",
        sound: "minecraft:entity.ender_dragon.death"
    }
}



// barrier game stage definitions that will be used by other mods
global.getBarrierStage = server => {
     let b = server.persistentData.barrier

     if (b > 80) return 'protected'
     if (b > 60) return 'disturbed'
     if (b > 40) return 'breached'
     if (b > 20) return 'corrupted'

     return 'collapse'
}

// helper function to check barrier stage transitions
global.checkBarrierTransition = server => {
    let oldStage = server.persistentData.currentBarrierStage ?? "protected"
    let newStage = global.getBarrierStage(server)

    if (oldStage != newStage) {
        
        global.onBarrierStageChange(server, oldStage, newStage)
        server.persistentData.currentBarrierStage = newStage
    }
}



// barrier stage change notifications event handler
global.onBarrierStageChange = (
    server,
    oldStage,
    newStage
) => {
    
    let isFalling = 
        barrierStageOrder[newStage] <
        barrierStageOrder[oldStage]

    let eventData = isFalling
        ? barrierFallEvents[newStage]
        : barrierMendEvents[newStage]
    
    if (!eventData)
        return

    server.players.forEach(player => {

        player.runCommandSilent(
            `title @a title {"text":"${eventData.title}"}`
        )
        server.runCommandSilent (
            `title @a subtitle {"text":"${eventData.subtitle}"}`
        )
        server.runCommandSilent (
            `execute as @a at @s run playsound ${eventData.sound} master @s ~ ~ ~`
        )
    })
    
    
    /* old
    if (newStage == "disturbed") {
        
        
        
        
        server.runCommandSilent (
            'title @a title {"text":"The Barrier Trembles", "color":"yellow"}'
        )

        server.runCommandSilent (
            'title @a subtitle {"text":"Something ancient stirs."}'
        )

        server.runCommandSilent (
            'execute as @a at @s run playsound minecraft:entity.ender_dragon.ambient master @s ~ ~ ~'
        )

        server.runCommandSilent (
            'weather thunder'
        )
    }
        */
}