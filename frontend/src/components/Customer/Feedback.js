import React, { useState } from 'react'
import './Stylesheet/Rating.css'
import { useDispatch} from 'react-redux'
import { giveFeedback } from '../../slices/Feedback.slice'
import { toast } from 'react-toastify'


const Feedback = () => {
    const [rate, setRate] = useState("")
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()


    const ratingHandler = (event) => {
        event.preventDefault()
        const feedbackData = {
            rate, comment
        }
        if (rate === "") {
            toast.error("Please,give rate.")
        }
        else if (comment.trim().length === 0) {
            toast.error("Please,give comment description.")
        } else {
            dispatch(giveFeedback(feedbackData))
            setRate(0)
            setComment('')
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-center mt-200 " style={{ width: "50%", marginLeft: "26%", height: "500px" }}>
                <div className="row main_div">
                    <div className="col-md-12">
                        <div className="stars" style={{ marginLeft: "17%" }}>
                            <h4 style={{ marginLeft: "30%", color: "black" }}>Rate us</h4>
                            <input className="star star-5" id="star-5" type="radio" name="star" value="5" onChange={(event) => setRate(event.target.value)} />
                            <label className="star star-5" for="star-5"></label>

                            <input className="star star-4" id="star-4" type="radio" name="star" value="4" onChange={(event) => setRate(event.target.value)} />
                            <label className="star star-4" for="star-4"></label>

                            <input className="star star-3" id="star-3" type="radio" name="star" value="3" onChange={(event) => setRate(event.target.value)} />
                            <label className="star star-3" for="star-3"></label>

                            <input className="star star-2" id="star-2" type="radio" name="star" value="2" onChange={(event) => setRate(event.target.value)} />
                            <label className="star star-2" for="star-2"></label>

                            <input className="star star-1" id="star-1" type="radio" name="star" value="1" onChange={(event) => setRate(event.target.value)} />
                            <label className="star star-1" for="star-1"></label>
                        </div>
                    </div>
                    <textarea cols="8" className='form-control review_text' style={{ marginBottom: "5%", marginTop: "-20%" }} placeholder='Comment' onChange={(event) => setComment(event.target.value)} value={comment}></textarea>
                </div>
            </div>
            <br />
            <button type="button" className="btn" style={{ marginLeft: "49%", marginTop: "-10%", backgroundColor: "#F7752A" }} onClick={ratingHandler}>Submit</button>

        </>
    )
}

export default Feedback
