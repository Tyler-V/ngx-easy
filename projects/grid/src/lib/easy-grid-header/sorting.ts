export enum EasySort {
    None = 'None',
    Ascending = 'Asc',
    Descending = 'Desc',
}

export class Sorting {
    public static FastSort(input: any): any[] {
        const sorter = function (direction: number, sortBy, thenBy, depth, a, b) {
            const valA = sortBy(a);
            const valB = sortBy(b);
            if (valA === valB) {
                if (thenBy && thenBy.length > depth) {
                    return sorter(direction, thenBy[depth], thenBy, depth + 1, a, b);
                }
                return 0;
            }
            if (valA < valB) {
                return -direction;
            }
            if (valA == null) {
                return 1;
            }
            if (valB == null) {
                return -1;
            }
            return direction;
        };

        const emptySortBy = (a) => a;

        const sort = function (direction: number, array: Array<any>, fields = emptySortBy) {
            if (!Array.isArray(array)) {
                return array;
            }
            const _sorter = Array.isArray(fields)
                ? sorter.bind(undefined, direction, fields.shift(), fields, 0)
                : sorter.bind(undefined, direction, fields, undefined, 0);
            return array.sort(_sorter);
        };

        const _sort = function (array: Array<any>) {
            return {
                asc: (fields) => sort(1, array, fields),
                desc: (fields) => sort(-1, array, fields)
            };
        };

        switch (input.sort) {
            case 'Asc':
                return _sort(input.data).asc([
                    d => d[input.field]
                ]);
            case 'Desc':
                return _sort(input.data).desc([
                    d => d[input.field]
                ]);
        }
    }
}
