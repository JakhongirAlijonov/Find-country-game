const img = document.querySelector('.img')
const counter = document.querySelector('.counter')
const btn = document.querySelectorAll('.btn')
const timer = document.querySelector('.time')
const level = document.getElementById('level')
const modal = document.querySelector('.modal')
const brackdrop = document.querySelector('.brackdrop')
const modalCounter = document.querySelector('.counter-modal')
const again = document.querySelector('.again')
mainFunc()
newGame()
let randomFlag

function mainFunc(main) {

    fetch('https://restcountries.com/v2/all')
        .then(function getDatas(data) {
            return data.json()
        })
        .then(getData)


    function getData(datas) {
        let raandomNum = Math.trunc((Math.random() * 250))
        randomFlag = datas[raandomNum]
        img.setAttribute('src', randomFlag.flags.png)
        console.log(randomFlag.name);
        trueBtn = randomFlag.name
        let falseBtn = datas[Math.trunc(Math.random() * 250)].name
        let randomBtn = Math.floor(Math.random() * 2)
        btn[randomBtn].textContent = trueBtn
        btn[Math.abs(randomBtn - 1)].textContent = falseBtn

    }

}


again.addEventListener('click', () => {
    newGame()
    modal.classList.add('hidden')
    brackdrop.classList.add('hidden')
})

function newGame() {


    let count = 0;
    // time
    let time = 15

    let levelChange = 'easy'

    for (let i = 0; i < 2; i++) {
        btn[i].addEventListener('click', () => {
            if (btn[i].textContent == trueBtn) {
                count++;
                counter.textContent = count
                levelChanger()

            } else {

                counter.textContent = count

            }

            mainFunc()
        })
    }


    level.addEventListener('change', () => {
        levelChanger()

    })

    function levelChanger() {

        levelChange = level.value
        console.log(levelChange);

        if (levelChange == 'easy') {
            time += 5
        } else if (levelChange == 'medium') {
            time += 3
        } else time += 2


    }



    const timeInterval = setInterval(() => {
        time--
        timer.textContent = time
        if (time == 0) {
            clearInterval(timeInterval)
            modal.classList.remove('hidden')
            brackdrop.classList.remove('hidden')
            modalCounter.textContent = count
        }
    }, 1000)
}