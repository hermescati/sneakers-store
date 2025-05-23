import { SIZES } from '@/lib/options'

const GuidesTable = () => {
  const filteredCategories = SIZES.filter(category => category.value !== 'kids')

  return (
    <table className="w-full table-fixed">
      <thead className="sticky top-0 z-10 bg-primary-900 text-background">
        <tr className="text-sm md:text-md">
          {filteredCategories.map(category => (
            <th
              key={category.value}
              className="border-l border-primary-300 px-1 py-2 text-center font-medium dark:border-border md:px-2"
            >
              {category.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({
          length: Math.max(...filteredCategories.map(cat => cat.sizes.length))
        }).map((_, index) => (
          <tr
            key={index}
            className="border-b border-primary-300 transition-all duration-200 ease-in-out hover:bg-primary-100 dark:border-border"
          >
            {filteredCategories.map(category => (
              <td
                key={category.value}
                className="border-l border-primary-300 p-2 text-center text-md font-medium text-primary-700 last:border-r dark:border-border md:text-base"
              >
                {category.sizes[index] ?? '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default GuidesTable
