export default function ErrorMessage ( props ) {

    const errorMessage = props.message;
    const {mainMessage, subMessage } = props;

    return (
        <div className="flex flex-col items-center block max-w-2xl h-max m-20 md:p-12 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="text-3xl font-bold tracking-wide">{mainMessage}</div>
            <div className="leading-8">{subMessage}</div>
        </div>
    )

}