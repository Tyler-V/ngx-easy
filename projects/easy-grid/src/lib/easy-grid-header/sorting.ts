export enum EasySort {
    None = 'None',
    Ascending = 'Asc',
    Descending = 'Desc',
}

export class Sorting {
    public static sort(input: any): any[] {
        function parse(value: any) {
            if (isNaN(value)) {
                return value.toUpperCase();
            }
            if (typeof value === 'number') {
                return Number(value);
            }
            if (typeof value === 'boolean') {
                return Number(value);
            }
            if (value instanceof Date) {
                return value as Date;
            }
        }
        return input.data.sort((a, b) => {
            a = parse(a[input.field]);
            b = parse(b[input.field]);

            switch (input.sort) {
                case 'Asc':
                    return a <= b ? -1 : 1;
                case 'Desc':
                    return a >= b ? -1 : 1;
            }
        });
    }
}
