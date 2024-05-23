import MuseumLogo from './M-full-01.svg';

export default function MuseumNav() {
    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={ MuseumLogo } className="h-12" alt="Museum Entrance" />
                    <span className="self-center text-2xl font-semibold uppercase whitespace-nowrap dark:text-white">Museum Entrance</span>
                </a>
            </div>
        </nav>
    )
}