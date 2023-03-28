let userPaddle=document.querySelector('#user-paddle')
let compPaddle=document.querySelector('#comp-paddle')
let ball=document.querySelector('#ball')

userPaddle.style.marginLeft='30px'
userPaddle.style.marginTop='0px'
compPaddle.style.marginLeft='1048px'
compPaddle.style.margintop='0px'
ball.style.marginLeft='534px'
ball.style.marginTop='262px'

let W_pressed=false
let S_pressed=false

let ID

let Vx=-1
let Vy=-1
let V=Math.sqrt(Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)))
document.addEventListener('keydown',(e)=>{
    if(e.key=='w'){
        W_pressed= true
    }
    else if(e.key=='s'){
        S_pressed=true
    }
})

document.addEventListener('keyup',(e)=>{
    if(e.key=='w'){
        W_pressed= false
    }
    else if(e.key=='s'){
        S_pressed=false
    }
})

gameLoop()



function gameLoop(){
    setTimeout(()=>{
        ID=setInterval(()=>{
            if(marginLeft(ball)<0){
                document.querySelector('#comp-score').innerHTML=Number(document.querySelector('#comp-score').innerHTML)+1
                reset()
                return
            }
            if(marginLeft(ball)+20>1088){
                document.querySelector('#user-score').innerHTML=Number(document.querySelector('#user-score').innerHTML)+1
                reset()
                return
            }
            if(marginTop(ball)<0||(marginTop(ball)+20)>544){
                Vy=-Vy
            }

            let paddle=(marginLeft(ball)+10<544)?userPaddle:compPaddle

            if (collisionDetected(paddle)){
                let angle
                let type=(marginLeft(paddle)==30)?'user':'comp'
                if(ball.centerY<paddle.centerY){
                    angle=(type=='user'?-Math.PI/4:(-3*Math.PI)/4)
                }
                else if(ball.centerY>paddle.centerY){
                    angle=(type=='user'?Math.PI/4:(3*Math.PI)/4)
                }
                else if(ball.centerY==paddle.centerY){
                    angle=(type=='user'?0:Math.PI)
                }
                V+=0.5
                Vx=V*Math.cos(angle)
                Vy=V.Math.sin(angle)
            }
            let compLevel=0.01
            compPaddle.style.marginTop=`${marginTop(compPaddle)+((ball.centerY-(marginTop(compPaddle)+36)))*compLevel}px`

            ball.style.marginLeft=`${marginLeft(ball)+Vx}px`
            ball.style.marginTop=`${marginTop(ball)+Vy}px`

            if(W_pressed && marginTop(userPaddle)>0){
                userPaddle.style.marginTop=`${marginTop(userPaddle)-2}px`
            }
            else if(S_pressed && marginTop(userPaddle)<472){
                userPaddle.style.marginTop=`${marginTop(userPaddle)+2}px` 
            }
            if(marginTop(compPaddle)<0){
                compPaddle.style.marginTop='0px'
            }
            else if(marginTop(compPaddle)>472){
                compPaddle.style.marginTop='472px'
            }
        },5)
    },500)
}

function collisionDetected(paddle){
    ball.top=marginTop(ball)
    ball.bottom=marginTop(ball)+20
    ball.left=marginTop(ball)
    ball.right=marginTop(ball)+20
    ball.centerX=marginTop(ball)+10
    ball.centerY=marginTop(ball)+20

    paddle.top=marginTop(paddle)
    paddle.bottom=marginTop(paddle)+72
    paddle.left=marginTop(paddle)
    paddle.right=marginTop(paddle)+10
    paddle.centerX=marginTop(paddle)+5
    paddle.centerY=marginTop(paddle)+36

    let type=(marginLeft(paddle)==30)?'user':'comp'
    let boolean=false
    if(type=='user'&& Vx<0){
        boolean=true
    }
    else if(type=='comp'&& Vx>0){
        boolean=true
    }

    return ball.left<paddle.right&&ball.top<paddle.bottom&&ball.right>paddle.left&&ball.bottom>paddle.top &&boolean
}


