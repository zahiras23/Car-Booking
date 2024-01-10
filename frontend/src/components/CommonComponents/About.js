import React from 'react'

const About = () => {
  return (
    <>
      <div className='container pt-5 pb-5' >
        <div className='row' style={{ paddingTop: "5%" }}>
          <div className='col-sm-6'>
            <p className='h4'>About Us</p>
            <p>At our vehicle rent company, we are passionate about providing our customers with safe, reliable, and affordable vehicle services. From short road trips to quick in-city drives for groceries, supply pick-up, food runs, we have the cheapest vehicle rental options for all your needs! </p>
            <p>You can drive unlimited KMs, with 100% Free Cancellation up to 1 day before the booking.Car rent per KM starts as low as Rs. 49/hour. We understand the importance of getting to your destination on time, and our team of experienced drivers are committed to providing you with a smooth and comfortable ride.</p>
          </div>
          <div className='col-sm-6'>
            <img src='/images/homePagePic.jpg' />
          </div>
        </div>
      </div>
    </>
  )
}

export default About
