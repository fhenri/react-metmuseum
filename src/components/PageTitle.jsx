import { Link } from 'react-router-dom';

export default function PageTitle ( props ) {
    const title = props.title;

    const MuseumLogo = () => {

        return (
            <svg 
                viewBox="0 0 70 51.4857"
                className="max-w-8 max-h-8 md:max-w-12 md:max-h-12"
                width="70" height="51.4857"
                xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(0.6999999880790712, 0, 0, 0.6999999880790712, 0, -9.257500648498535)" fill="currentColor">
                    <polygon xmlns="http://www.w3.org/2000/svg" points="100,28.015 0,28.016 50,13.225 "/>
                    <g xmlns="http://www.w3.org/2000/svg">
                        <rect x="10.132" y="72.471" fillRule="evenodd" clipRule="evenodd" width="79.519" height="5.506"/>
                        <rect x="3.815" y="81.341" fillRule="evenodd" clipRule="evenodd" width="92.369" height="5.435"/>
                    </g>
                    <g xmlns="http://www.w3.org/2000/svg">
                        <rect x="75.159" y="33.833" fillRule="evenodd" clipRule="evenodd" width="10.02" height="33.796"/>
                        <rect x="55.029" y="33.833" fillRule="evenodd" clipRule="evenodd" width="10.02" height="33.796"/>
                        <rect x="34.99" y="33.833" fillRule="evenodd" clipRule="evenodd" width="10.02" height="33.796"/>
                        <rect x="14.821" y="33.833" fillRule="evenodd" clipRule="evenodd" width="10.02" height="33.796"/>
                    </g>
                </g>
            </svg>
        )
    }

    return (
        <div className='flex grow items-center md:space-x-3 rtl:space-x-reverse'>
            <Link to="/">
                <MuseumLogo />
            </Link>
            <h1 className='text-lg sm:text-2xl md:text-3xl text-center px-1 md:px-6 font-bold my-2 uppercase'>
                <div dangerouslySetInnerHTML={{ __html: title }} />
            </h1>
        </div>
    )

}