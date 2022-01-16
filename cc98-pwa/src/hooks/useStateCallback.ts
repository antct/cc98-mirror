import { Reducer, useEffect, useReducer, useRef } from 'react'

export const useStateCallback = <S>(initialState: S) => {
    const [state, setState] = useReducer<Reducer<S, Partial<S>>>(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    )
    const cbRef = useRef<((state: S) => void) | null>(null)

    function setStateCallback(state: Partial<S>, cb: (state: S) => void) {
        cbRef.current = cb
        setState(state)
    }

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state)
            cbRef.current = null
        }
    }, [state])

    return [state, setStateCallback] as const
}