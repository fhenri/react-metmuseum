import { Link } from 'react-router-dom';
import MuseumLogo from './logo.svg';

export default function PageTitle ( props ) {
    const title = props.title;

    return (
        <div className='flex grow items-center md:space-x-3 rtl:space-x-reverse'>
            <Link to="/">
                <img src={ MuseumLogo } className="max-w-8 max-h-8" alt="Museum Entrance" />
            </Link>
            <h1 className='text-lg sm:text-2xl md:text-3xl text-center px-1 md:px-6 font-bold my-2 uppercase'>
                <div dangerouslySetInnerHTML={{ __html: title }} />
            </h1>
        </div>
    )
}