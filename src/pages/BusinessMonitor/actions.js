export const changeTable = (data, bool) => {
    return { type: 'GET_BASIC_DATA', data, bool };
}
export const tableLoading = (bool) => {
    return { type: 'TABLE_LOADING', bool };
}
