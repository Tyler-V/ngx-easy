export enum EasyFilter {
    Contains = 'Contains',
    Equals = 'Equals',
    DoesNotContain = 'Does Not Contain'
}

export class Filtering {
    public static filter(input: any): any[] {
        const Contains = (index, filterText) => value => {
            return value[Object.keys(value)[index]].includes(filterText);
        };
        let data = input.data;
        for (const column of input.columns) {
            data = data.filter(Contains(column.index, column.filterText));
        }
        return data;
    }
}
