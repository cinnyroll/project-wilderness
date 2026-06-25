/*
 Command for all interaction and debugging of barrier
 /barrier is the root command and can be run to debug, set, add to, or remove from the barrier
*/




ServerEvents.commandRegistry(event => {

    const { commands: Commands, arguments: Arguments } = event

    event.register(
        Commands.literal("barrier")       
            .requires(source => source.hasPermission(2)) // check if the player as op privileges
            // argument for debugging the barrier
            .then(
                Commands.literal("debug")
                    .executes(ctx => {
                        let player = ctx.source.player
                        let server = ctx.source.server
                        let barrier = server.persistentData.barrier ?? 100
                        let stage = global.getBarrierStage(server)

                        // basic information on barrier stats
                        player.tell("§8==========")
                        player.tell(`§6Barrier: §e${barrier}`)
                        player.tell(`§6Stage: §e${stage}`)
                        player.tell(`§6GameStages:`)

                        let allStages = player.stages.all // creates an array of all gamestages held by the player

                        // loops through and displays each stage in the gamestages array
                        allStages.forEach(item => {
                            player.tell(` §7- ${item}`)
                        })

                        player.tell("§8==========")
                        return 1
                    })
            )
            
            // argument to set the barrier level
            .then(
                Commands.literal("set")
            
                .then(
                    Commands.argument(
                        "value",
                        Arguments.INTEGER.create(event)
                    )

                    .executes(ctx => {

                        let server = ctx.source.server

                        let value = Arguments.INTEGER.getResult(ctx, "value")

                        value = Math.max(0, Math.min(100, value))

                        server.persistentData.barrier = value

                        global.updateBarrierStage(server)

                        ctx.source.player.tell(
                            `§aBarrier set to ${value}`
                        )

                        return 1
                    })
                )
            )

            // argument to add to the barrier
            .then(
                Commands.literal("add")
              
                .then(
                    Commands.argument(
                        "value",
                        Arguments.INTEGER.create(event)
                    )

                    .executes(ctx => {

                        let value = Arguments.INTEGER.getResult(ctx, "value")

                        global.changeBarrier(
                          ctx.source.server,
                          value
                        )

                        global.updateBarrierStage(
                            ctx.source.server
                        )
                        

                        return 1
                    })
                )
            )

            // argument to remove from the barrier
            .then(
                Commands.literal("remove")
                
                .then(
                    Commands.argument(
                        "value",
                        Arguments.INTEGER.create(event)
                    )

                    .executes(ctx => {

                        let value = Arguments.INTEGER.getResult(ctx, "value")

                        global.changeBarrier(
                            ctx.source.server,
                            -value
                        )

                        global.updateBarrierStage(
                            ctx.source.server
                        )

                        return 1
                    })
                )
            )

        // dumps the raw persistent data from the minecraft world
        .then(
            Commands.literal("raw")

            .executes(ctx => {
                ctx.source.player.tell(
                    JSON.stringify(
                        ctx.source.server.persistentData,
                        null,
                        2
                    )
                )
                return 1
            })
        )

        // allows for updating barrier stage without modifiying the barrier while testing
        .then(
            Commands.literal("refresh")
            
            .executes(ctx => {
                global.updateBarrierStage(
                    ctx.source.server
                )
                ctx.source.server.persistentData.currentBarrierStage = "protected"
                return 1
            })
        )
    )
})