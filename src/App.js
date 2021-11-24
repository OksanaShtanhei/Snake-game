import React, {useState, useEffect} from 'react'
import './App.css';
import Snake from './Snake';
import Food from './Food';
import Flag from './Flag';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2
    let y = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2
    return [x,y]
}
const initial = {
    snakeDots: [[0,0],[2,0]],
    food: getRandomCoordinates(),
    direction: 'right',
    speed: 300,
    snakeTail: []
}

const App = ({}) => {
    const [head, setHead] = useState(initial.snakeDots[initial.snakeDots.length - 1])
    const [flag, setFlag] = useState(false)

    window.addEventListener('keydown', (e) => {
        e = e || window.event
        switch (e.keyCode){
            case 38:
                initial.direction = 'up'
                break;
            case 40:
                initial.direction = 'down'
                break;
            case 37:
                initial.direction = 'left'
                break;
            case 39:
                initial.direction = 'right'
                break;
        }
    })
    const moveSnake = () => {
        let dots = [...initial.snakeDots]
        let headChanged = dots[dots.length - 1]
    
            switch (initial.direction){
                case 'right':
                    headChanged = [head[0] + 2, head[1]] 
                    break;
                case 'left':
                    headChanged = [head[0] - 2, head[1]]
                    break;
                case 'down':
                    headChanged = [head[0], head[1] + 2]
                    break;
                case 'up':
                    headChanged = [head[0], head[1] - 2]
                    break;
            }
            dots.push(headChanged)
            dots.shift()
            setHead(headChanged)
            initial.snakeDots = dots
            
    }
    
    useEffect(() => {
        if(!flag){
            const interval = setInterval(moveSnake, initial.speed)
           
            checkIfOut()
            if(head[0] === initial.food[0] && head[1] === initial.food[1]){
                eatFood()
                initial.speed -=20
                initial.food = getRandomCoordinates()
            }
            return () => {
                clearInterval(interval)
            }
        }
    },[head])

    const checkIfOut = ()  => {
        if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
            setFlag(true)
        }
    }

    const eatFood = () => {
        let head = initial.snakeDots[initial.snakeDots.length - 1]

            switch(initial.direction){
                case 'right':
                    initial.snakeTail = [head[0]+2, head[1]]
                    break;
                case 'left':
                    initial.snakeTail = [head[0]-2, head[1]]
                    break;
                case 'down':
                    initial.snakeTail = [head[0], head[1]+2]
                    break;
                case 'up':
                    initial.snakeTail = [head[0], head[1]-2]
                    break;
            }
            initial.snakeDots = [...initial.snakeDots, initial.snakeTail]
    }

    return (
        <>
           <div className="game-area">
               {flag ? <Flag /> : null}
               <Snake snakeDots={initial.snakeDots} />
               <Food food={initial.food} />
           </div>
        </>
    )
}
export default App