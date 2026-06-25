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

// single event definition table for barrier stage changes
// each stage change can have a set of commands that will be run when the stage is entered
// commands can be run on the server or per player
// commands are nested under the "fall" or "mend" keys to determine if the barrier is falling or mending
const barrierStageEvents = {
    fall: {
        disturbed: {
            commands: [
                'player:title @s title {"text":"The Barrier Trembles","color":"yellow"}',
                'player:title @s subtitle {"text":"Something ancient stirs."}',
                'player:execute as @s at @s run playsound barrier:barrier_tremble master @s ~ ~ ~',
                'server:weather thunder'
            ]
        },

        breached: {
            commands: [
                'player:title @s title {"text":"The Barrier Cracks","color":"red"}',
                'player:title @s subtitle {"text":"The dead remember the world."}',
                'player:execute as @s at @s run playsound minecraft:entity.ender_dragon.growl master @s ~ ~ ~'
            ]
        },

        corrupted: {
            commands: [
                'player:title @s title {"text":"The Barrier Fractures","color":"dark_purple"}',
                'player:title @s subtitle {"text":"The world begins to decay."}',
                'player:execute as @s at @s run playsound minecraft:entity.wither.spawn master @s ~ ~ ~'
            ]
        },

        collapse: {
            commands: [
                'player:title @s title {"text":"THE BARRIER FALLS","color":"dark_red"}',
                'player:title @s subtitle {"text":"Nothing remains to hold them back."}',
                'player:execute as @s at @s run playsound minecraft:entity.ender_dragon.death master @s ~ ~ ~'
            ]
        }
    },

    mend: {
        protected: {
            commands: [
                'player:title @s title {"text":"The Barrier is Restored","color":"green"}',
                'player:title @s subtitle {"text":"The world is safe once more."}',
                'player:execute as @s at @s run playsound minecraft:block.beacon.activate master @s ~ ~ ~'
            ]
        },
        disturbed: {
            commands: [
                'player:title @s title {"text":"The Barrier Trembles","color":"yellow"}',
                'player:title @s subtitle {"text":"Something ancient stirs."}',
                'player:execute as @s at @s run playsound minecraft:entity.ender_dragon.ambient master @s ~ ~ ~'
            ]
        },

        breached: {
            commands: [
                'player:title @s title {"text":"The Barrier Cracks","color":"red"}',
                'player:title @s subtitle {"text":"The dead remember the world."}',
                'player:execute as @s at @s run playsound minecraft:entity.ender_dragon.growl master @s ~ ~ ~'
            ]
        },

        corrupted: {
            commands: [
                'player:title @s title {"text":"The Barrier Fractures","color":"dark_purple"}',
                'player:title @s subtitle {"text":"The world begins to decay."}',
                'player:execute as @s at @s run playsound minecraft:entity.wither.spawn master @s ~ ~ ~'
            ]
        },

        collapse: {
            commands: [
                'player:title @s title {"text":"THE BARRIER FALLS","color":"dark_red"}',
                'player:title @s subtitle {"text":"Nothing remains to hold them back."}',
                'player:execute as @s at @s run playsound minecraft:entity.ender_dragon.death master @s ~ ~ ~'
            ]
        }
    }
}



// barrier game stage definitions used for determining what stages players are in based on the barrier stat
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

    const branch = isFalling ? 'fall' : 'mend'
    let eventData = barrierStageEvents[branch] && barrierStageEvents[branch][newStage]

    if (!eventData)
        return

    // If the event defines a `commands` array, run those commands.
    // Command strings that start with `player:` will be executed per-player
    // using `player.runCommandSilent(...)`. Strings that start with
    // `server:` (or have no prefix) will be executed once on the server
    // using `server.runCommandSilent(...)`.
    if (Array.isArray(eventData.commands) && eventData.commands.length > 0) {
        // Run server-level commands first
        eventData.commands.forEach(cmd => {
            if (typeof cmd !== 'string') return
            if (cmd.startsWith('player:')) return
            const actual = cmd.startsWith('server:') ? cmd.slice(7).trim() : cmd
            if (actual.length) server.runCommandSilent(actual)
        })

        // Run player-level commands for each player
        server.players.forEach(player => {
            eventData.commands.forEach(cmd => {
                if (typeof cmd !== 'string') return
                if (!cmd.startsWith('player:')) return
                const actual = cmd.slice(7).trim()
                if (actual.length) player.runCommandSilent(actual)
            })
        })

        return
    }

}