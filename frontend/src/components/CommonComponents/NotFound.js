import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <img src='/images/pageNotFound.png' style={{ marginLeft: "30%", marginTop: "5%" }} alt="page not found" />
            <p className='h4' style={{ marginTop: "-8%", marginLeft: "45%" }}>PAGE NOT FOUND</p> */}
      <div
        style={
          {
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
          }
        }
      >
        <img src="/images/pageNotFound.png" alt="page not found"  />
        <p className="h4" style={{ display: "block", textAlign: 'center', fontSize: '45px' }}>
          PAGE NOT FOUND
        </p>
      </div>
    </div>
  );
};

export default NotFound;
