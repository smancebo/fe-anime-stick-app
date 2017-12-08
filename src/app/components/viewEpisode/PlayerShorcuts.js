const SH_PLAY_PAUSE = { keyCode: 179, handle: (player, actions) => { player.paused === true ? actions.play({ action: 'play', source: 'shortcut' }) : actions.pause({ action: 'pause', source: 'shortcut' }) } }
const SH_FORWARD = { keyCode: 228, handle: (player, actions) => { actions.forward(30, { action: 'forward-30', source: 'shortcut' }) } }
const SH_BACKWARD = { keyCode: 227, handle: (player, actions) => { actions.replay(30, { action: 'replay-30', source: 'shortcut' }) } }
const SH_BACKWARD_0 = { keyCode: 66, handle: (player, actions) => { actions.replay(30, { action: 'replay-30', source: 'shortcut' }) } }

export const playerShortcuts = [
    SH_PLAY_PAUSE,
    SH_FORWARD,
    SH_BACKWARD,
    SH_BACKWARD_0
]