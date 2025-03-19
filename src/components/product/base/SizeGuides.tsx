import { SIZES } from '@/lib/options'

const SizeGuides = () => {
    const filteredCategories = SIZES.filter(category => category.value !== "kids")

    return (
        <div className="min-w-max md:min-w-0 w-full">
            <div className="sticky top-0 inset-x-0 grid grid-cols-6 bg-primary-900 z-10">
                {filteredCategories.map((category) => (
                    <div
                        key={category.value}
                        className="place-content-center p-2 border-l border-primary-300 dark:border-border text-md text-center font-medium text-background"
                    >
                        {category.label}
                    </div>
                ))}
            </div>

            {Array.from({ length: Math.max(...filteredCategories.map(cat => cat.sizes.length)) }).map((_, index) => (
                <div key={index} className="grid grid-cols-6 border-primary-300 dark:border-border hover:bg-primary-100/50">
                    {filteredCategories.map((category) => (
                        <div
                            key={category.value}
                            className="place-content-center p-2 border-b border-l last:border-r border-primary-300 dark:border-border text-md text-center font-medium text-primary-700"
                        >
                            {category.sizes[index] ?? '-'}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SizeGuides
