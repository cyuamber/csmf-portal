import I from 'immutable';

const initialState = I.fromJS({
    toolbar: {
        loading: false
    },
    table: {
        data: [],
        loading: false,
    }
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_BASIC_DATA':
            return state
                .setIn(['table', 'loading'], action.bool)
                .setIn(['table', 'data'], I.fromJS(action.data))
        case 'TABLE_LOADING':
            return state
                .setIn(['table', 'loading'], action.bool)
        default:
            return state;
    }
}
