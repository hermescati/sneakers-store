export const SIZE_CATEGORIES: Record<string, number[]> = {
    "US Men": [
        3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
        11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18
    ],
    "US Women": [
        5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
        13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5
    ],
    "UK": [
        3, 3.5, 4, 4.5, 5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
        10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17
    ],
    "Europe": [
        35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44,
        44.5, 45, 45.5, 46, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5,
        52, 52.5
    ],
    "Foot Length (cm)": [
        22.5, 23, 23.5, 23.5, 24, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28,
        28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        35.5, 36
    ],
    "Foot Length (in)": [
        8.9, 9.1, 9.3, 9.3, 9.4, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8,
        11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.4, 12.6, 12.8, 13, 13.2, 13.4,
        13.6, 13.8, 14, 14.2
    ]
}

const SizeGuides = () => {
    return (
        <table className="table-auto md:table-fixed sm:mr-2 mb-1 border-separate border-spacing-0">
            <thead className="sticky top-0 z-10 bg-primary-100">
                <tr>
                    {Object.keys(SIZE_CATEGORIES).map((category, index) => (
                        <th
                            key={index}
                            className="px-5 py-2 text-md text-center font-medium text-primary-700 border-y border-r first:border-l border-primary-300 dark:border-border"
                        >
                            {category}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {SIZE_CATEGORIES["US Men"].map((_, index) => (
                    <tr key={index} className="hover:bg-primary-100/50 transition-colors duration-150 ease-in-out">
                        {Object.keys(SIZE_CATEGORIES).map((category, idx) => (
                            <td
                                key={idx}
                                className="px-5 py-2 text-md text-center font-medium text-primary-700 border-b border-r first:border-l border-primary-300 dark:border-border"
                            >
                                {SIZE_CATEGORIES[category][index] || '-'}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SizeGuides;
