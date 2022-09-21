function player()  {
    const musicas = [
        {
            nome: "Gorillaz-Fire Flies",
            img: "public/Gorillaz18(fire flies).webp",
            src: "musics/Gorillaz - Fire Flies (Visualiser).mp3"
        },
        {
            nome: "Joji-Slow Dance in the Dark",
            img: "public/SLOW_DANCING_IN_THE_DARK.webp",
            src: "musics/Joji - SLOW DANCING IN THE DARK.mp3"
        },
        {
            nome: "Rex Orange County-Pluto Projector",
            img: "public/st,small,845x845-pad,1000x1000,f8f8f8(pluto projector).jpg",
            src: "musics/Rex Orange County - Pluto Projector (Official Audio).mp3"
        },
        {
            nome: "A Sad Song About a girl i no longer know",
            img: "public/sddefault.jpg",
            src: "musics/charles irwin - a sad song about a girl i no longer know.m4a"
        },
        {
            nome: "Tyler the Creator-IFHY",
            img: "public/ifhy.jpg",
            src: "musics/IFHY (Feat. Pharrell) - Tyler, The Creator.mp3"
        }
    ]
    
    const cantor = document.querySelector("#nome-cantor")
    const imagem = document.querySelector("img")
    const audio = document.querySelector("audio")
    const barra = document.querySelector("#barra")
    
    let inicio = document.querySelector(".fa-play")
    let puloFrente = document.querySelector(".fa-forward-fast")
    let puloTras = document.querySelector(".fa-backward-fast")
    let pause = document.querySelector(".fa-pause")

    let i = 0


    arranjoMusical()
    
    function arranjoMusical() {
        let {nome, img, src} = musicas[i]
        cantor.innerHTML = nome
        imagem.src = img
        audio.setAttribute("src", src)
    }

    function duraçãoFinal() {
        const tempoFim = document.querySelector("#fim")
        tempoFim.innerHTML = contagemMinutos(Math.floor(audio.duration))
    }

    function displayPause() {
        inicio.style.display = "none"
        pause.style.display = "block"
        audio.play()
    }

    function contagemMinutos(segundos) {
        let mostraMinutos = Math.floor(segundos / 60)
        let mostraSegundos = Math.floor(segundos % 60)
        if (mostraSegundos < 10) { mostraSegundos = "0" + mostraSegundos}
        return mostraMinutos + ":" + mostraSegundos
    }
    

    audio.addEventListener('loadeddata', () => {
        duraçãoFinal()
    })
    
    audio.addEventListener('timeupdate', () => {
        const progresso = document.querySelector("progress")
        const tempoInicio = document.querySelector("#inicio")
        
        progresso.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%' 
        tempoInicio.innerHTML = contagemMinutos(audio.currentTime)

        if (audio.currentTime === audio.duration) {
        i < 4 ? i++ : i === 0
        arranjoMusical()
        displayPause()
        }
    })

    barra.addEventListener('click', (e) => {
        const width = barra.clientWidth
        const clique = e.offsetX

        audio.currentTime = (clique / width) * audio.duration
    })
    
    inicio.addEventListener('click', () => {
        displayPause()
    })
    
    puloFrente.addEventListener('click', () => {
        i < 4 ? i++ : i === 0
        arranjoMusical()
        displayPause()
    })
    
    puloTras.addEventListener('click', () => {
        i > 0 ? i-- : i === 4
        arranjoMusical()
        displayPause()
    })
    
    pause.addEventListener('click', () => {
        audio.pause()
        inicio.style.display = "block"
        pause.style.display = "none"
    })
}
player()