import React, {useState, useEffect} from 'react'
import useSound from 'use-sound'
import Play from '../assets/play.mp3'
import Correct from '../assets/correct.mp3'
import Wrong from '../assets/wrong.mp3'
import Wait from '../assets/wait.mp3'

export default function Sufyan({
    data, 
    setStop, 
    questionNumber, 
    setQuestionNumber,
}) {

    const [question, setQuestion] = useState(null)
    const [selectAnswer, setSelectAnswer] = useState(null)
    const [className, setClassName] = useState('answer')
    const [letsPlay] = useSound(Play)
    const [correctAnswer] = useSound(Correct)
    const [wrongAnswer] = useSound(Wrong)


    useEffect(() => {
        letsPlay()
      }, [letsPlay])


    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration);
    }

    const handleClick = (a) => {
        setSelectAnswer(a)
        setClassName('answer active')
        delay(3000, () => setClassName(a.correct ? 'answer correct' : 'answer wrong'))
        delay(5000, () => {
            if(a.correct){
                correctAnswer()
                delay(1000, () => {
                setQuestionNumber((prev) => prev + 1)
                setSelectAnswer(null)
            })
            }else {
                wrongAnswer()
                delay(1000, () => {
                setStop(true)
            })
            }
        } )

    }

    return (
        <div className = 'sufyan'>
            <div  className = 'question'>{question?.question}</div>
            <div className = 'answers'>
                {question?.answers.map((a) => (
                    <div  className = {selectAnswer === a ? className : 'answer'}  onClick = {() => handleClick(a)} >{a.text}</div>
                ))}
            </div>
        </div>
    )
}
