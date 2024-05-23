import MuseumLogo from './M-full-01.svg';

export default function PageTitle ( props ) {
    const title = props.title;

    return (
        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
            <a href="/">
                <img src={ MuseumLogo } className="h-12" alt="Museum Entrance" />
            </a>
            <h1 className='text-3xl text-center px-6 font-bold my-2 uppercase'>
                <div dangerouslySetInnerHTML={{ __html: title }} />
            </h1>
        </div>
    )
}