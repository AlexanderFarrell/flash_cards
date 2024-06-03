const scoreView = document.getElementById('score')
const questionView = document.getElementById('question')
const answerView = document.getElementById('answer')

let data = null;
let question = 0;
let score = 0
const file = 'test1.txt'

async function loadQuestionData(url) {
    let response = await fetch(url)
    let textData = await response.text()
    let lines = textData.split('\n')
    data = []
    lines.forEach(line => {
        let elements = line.split(',')
        data.push({
            question: elements[0],
            answer: elements[1]
        })
    })
}

function update_score() {
    scoreView.innerHTML = `Score: ${score}`
}

function show_question() {
    questionView.innerHTML = data[question].question
    answerView.innerHTML = ""
    let answers = []

    answers[0] = data[question].answer
    answers[1] = get_wrong_answer()
    answers[2] = get_wrong_answer()
    answers[3] = get_wrong_answer()

    answers = shuffle_array(answers);

    answers.forEach(a => {
        let element = document.createElement('button')
        element.innerHTML = a

        element.addEventListener('click', () => {
            if (data[question].answer == a) {
                score += 1
                
            } 
            question++;
            if (question < data.length) {
                show_question()
            } else {
                show_results()
            }
            update_score()
        })
        answerView.appendChild(element)
    })
}

function get_wrong_answer() {
    let answer = data[get_random_int(data.length)].answer

    if (data[question].answer == answer) {
        return get_wrong_answer()
    } else {
        return answer
    }
}
 
function get_random_int(max) {
    return Math.floor(Math.random() * max);
}

function show_results() {
    document.body.innerHTML  = `Your final score is ${score}`
}

async function start_game() {
    await loadQuestionData(file)
    show_question()
}

// Shuffle an array using the Fisher-Yates Sorting Algorithm
function shuffle_array(array) {
    // Imagine a deck of cards
    // For each card, we swap that card with another card
    // Until we are at the end of the deck
    
    // Copy our original array, so we don't mutate the original
    let copy = [];
    for (let i = 0; i < array.length; i++) {
        copy.push(array[i])
    }

    // Run through each card, randomly swapping it with another
    // Some cards may be swapped more than once. Some cards may
    // not move, but that's okay. That should be a possibility.
    for (let i = 0; i < copy.length; i++) {
        let random_spot = random_int(0, copy.length);
        
        // Perform the swap
        let temp = copy[random_spot]
        copy[random_spot] = copy[i]
        copy[i] = temp;
    }

    return copy;
}