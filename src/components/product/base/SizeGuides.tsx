import Link from '@/components/base/Link'
import { SIZES } from '@/lib/options'
import { Drawer } from 'vaul'

const SizeGuides = () => {
    const filteredCategories = SIZES.filter(category => category.value !== "kids")

    return (
        <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
                <Link underline className='w-fit py-2 mb-4 font-medium text-md text-primary-600 hover:text-secondary cursor-pointer transition-colors ease-in-out duration-300'>Size Guide</Link>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className='fixed inset-0 bg-black/40 z-30' />
                <Drawer.Content className="flex flex-col fixed bottom-0 inset-x-0 z-30 mt-24 h-full max-h-[98%] bg-background rounded-t-2xl outline-none">
                    <div className="max-w-3xl w-full mx-auto h-full relative flex flex-col p-3">
                        <Drawer.Handle className="relative !mx-0 !w-full !flex !items-center !justify-center mb-6 !bg-transparent">
                            <div className="mx-auto mt-5 w-24 h-1 bg-primary-200 rounded-full"></div>
                        </Drawer.Handle>
                        <Drawer.Title className="font-semibold text-xl pb-2 mx-2">Size Guides</Drawer.Title>

                        <div className='px-2 w-full h-full divide-y divide-border overflow-auto'>
                            <table className="table-fixed w-full">
                                <thead className="sticky top-0 bg-primary-900 text-background z-10">
                                    <tr className="text-sm md:text-md">
                                        {filteredCategories.map((category) => (
                                            <th key={category.value} className="px-1 md:px-2 py-2 border-l border-primary-300 dark:border-border text-center font-medium">
                                                {category.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: Math.max(...filteredCategories.map(cat => cat.sizes.length)) }).map((_, index) => (
                                        <tr key={index} className="border-b border-primary-300 dark:border-border hover:bg-primary-100 transition-all duration-200 ease-in-out">
                                            {filteredCategories.map((category) => (
                                                <td key={category.value} className="p-2 border-l last:border-r border-primary-300 dark:border-border text-center font-medium text-md md:text-base text-primary-700">
                                                    {category.sizes[index] ?? '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default SizeGuides
