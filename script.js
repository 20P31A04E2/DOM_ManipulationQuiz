const data = [
    {
        question:"What does HTML stand for ?",
        a:"Hypertext MArkup Language",
        b:"Hypertext Markdown Language",
        c:"Hyperloop Machine Language",
        d:"Helicopters terminals Motorboats lamborginis",
        correct:"a",
    },
    {
        question:"The function and var are known as?",
        a:"Keywords",
        b:"Data types",
        c:"Declaration statements",
        d:"Prototypes",
        correct:"c",
    },
    {
        question:"What does CSS stand for ?",
        a:"Cascade style sheets",
        b:"Color and style sheets",
        c:"Cascading style sheets",
        d:"None of the above",
        correct:"c",
    },
    {
        question:"Which one of the following also known as Conditional Expression?",
        a:"Alternative to if-else",
        b:"Switch statement",
        c:"If-then-else statement",
        d:"immediate if",
        correct:"d",
    },
    {
        question:"Which of the following is the correct syntax for referring the external style sheet?",
        a:"<style src = example.css>",
        b:"<style src = 'example.css' >",
        c:"<stylesheet> example.css </stylesheet>",
        d:"None of the above",
        correct:"d",
    },
]
const quiz = document.getElementById("quiz");
const ans = document.querySelectorAll(".answer");
const qsn = document.getElementById("question");
const optA = document.getElementById("optA");
const optB = document.getElementById("optB");
const optC = document.getElementById("optC");
const optD = document.getElementById("optD");

const submitBtn = document.getElementById("submit");

let count = 0
let score = 0

loadQuiz()

function loadQuiz(){
    deselect()
    const countData = data[count]
    qsn.innerText = countData.question
    optionA.innerText = countData.a
    optionB.innerText = countData.b
    optionC.innerText = countData.c
    optionD.innerText = countData.d

}
function deselect(){
    ans.forEach((aswr)=>(
        aswr.checked = false
    ))
}
function selected(){
    let answer
    ans.forEach((aswr)=>{
        if(aswr.checked){
            answer=aswr.id
        }
    })
    return answer
}

submitBtn.addEventListener("click",()=>{
    const answer = selected()

    if(answer){
        if(answer === data[count].correct){
            score++
        }
        count++

        if (count < data.length){
            loadQuiz()
        }
        else{
           quiz.innerHTML =`
           <h2>You got ${score}/${data.length} marks...</h2>
           
            <center><button onclick="location.reload()">Do it Again</button></center>
           `
        }
    }
})