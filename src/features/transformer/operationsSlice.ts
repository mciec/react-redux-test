import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IOperations } from "../transformer/typings";
import { IOperation } from "../operation/typings";
import axios, { AxiosResponse } from "axios"


const initialState: IOperations = { operations: [] }

export const operationsSlice = createSlice({
    name: "operations",
    initialState: initialState,
    reducers: {
        setLoading: (state, actions: { payload: boolean }) => {
            state.loading = actions.payload
        },
        updateOperation: (state, actions: { payload: IOperation }) => {
            state.operations = state.operations.map((op) => op.id === actions.payload.id ? actions.payload : op)
        },
        deleteOperation: (state, actions: { payload: number }) => {
            state.operations = state.operations.filter((op) => op.id !== actions.payload)
        },
        addOperation: (state, actions: { payload: IOperation }) => {
            state.operations = [...state.operations, actions.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParamForOperation.fulfilled, (state, action) => {
            const newOperations = state.operations.map((op) => 
                (op.id === action.meta.arg.id) 
                    ? {...op, params: [action.payload]}
                    : op
                )
            state.operations = newOperations
        })
    }
});

export const {
    setLoading,
    updateOperation,
    deleteOperation,
    addOperation
} = operationsSlice.actions;

export const selectOperations = (state: RootState) =>
    state.operations

export default operationsSlice.reducer;

///////////////////////////////////////////////
type FetchParamForOperationParams = {
    id: number,
    name: string
}
export const fetchParamForOperation = createAsyncThunk(
    'fetchParamForOperation',
    async (params: FetchParamForOperationParams, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const response = (await axios.get(`/api/homecontrol/countChars?text=${params.name}`)) as AxiosResponse<number>
        thunkAPI.dispatch(setLoading(false))
        return response.data
    }
)