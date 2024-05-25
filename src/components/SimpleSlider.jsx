import React from "react";
import Slider from "react-slick";

export default function SimpleSlider( props ) {

    const myObject = props.mObject;
    console.log(myObject);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

  return (
    <Slider {...settings}>
        <div className="border">
            <img className='size-64 block m-auto' src={myObject.primaryImageSmall} alt={myObject.title} />
        </div>
        { myObject.additionalImages.map(image => (
            <div className="border" key={image}>
                <img className='size-64 block m-auto' src={image} />
            </div>))
        }
    </Slider>
  );
}