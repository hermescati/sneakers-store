import { SIZES } from '@/lib/options'

const SizeGuides = () => {
    const filteredCategories = Object.keys(SIZES).filter(category => category !== "US Kids")

    return (
        <div className="min-w-max md:min-w-0 w-full">
            <div className="sticky top-0 inset-x-0 grid grid-cols-6 bg-primary-900 z-10">
                {filteredCategories.map((category, index) => (
                    <div
                        key={index}
                        className="place-content-center p-2 border-l border-primary-300 dark:border-border text-md text-center font-medium text-background"
                    >
                        {category}
                    </div>
                ))}
            </div>

            {SIZES["US Mens"].map((_, index) => (
                <div key={index} className="grid grid-cols-6 border-primary-300 dark:border-border hover:bg-primary-100/50">
                    {filteredCategories.map((category, idx) => (
                        <div
                            key={idx}
                            className="place-content-center p-2 border-b border-l last:border-r border-primary-300 dark:border-border text-md text-center font-medium text-primary-700"
                        >
                            {SIZES[category][index] || '-'}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SizeGuides;
