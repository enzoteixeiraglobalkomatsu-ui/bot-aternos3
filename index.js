const mineflayer = require('mineflayer')
const express = require('express')

// Servidor web falso para o Render manter o bot acordado
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Bot do Aternos está ativo!'))
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))

function criarBot() {
    const bot = mineflayer.createBot({
        host: 'Zenith6700-sieJ-cPGa.aternos.me',
        port: 12503,
        username: 'Bot_AFK_Aternos',
        version: '26.3' // Atualizado para a versão correta do seu Aternos
    })

    bot.on('spawn', () => {
        console.log('O bot entrou no servidor com sucesso!')
        
        // Sistema Anti-AFK: A cada 3 minutos, ele anda para a frente
        setInterval(() => {
            console.log('Movimentando para evitar o AFK...')
            bot.look(Math.random() * Math.PI * 2, 0)
            bot.setControlState('forward', true)
            setTimeout(() => {
                bot.setControlState('forward', false)
            }, 2000)
        }, 180000)
    })

    bot.on('end', () => {
        console.log('O bot caiu. Tentando reconectar em 10 segundos...')
        setTimeout(criarBot, 10000)
    })

    bot.on('error', (err) => {
        console.log('Erro no bot:', err)
    })
}

criarBot()