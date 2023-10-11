import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { useLocalStorage as _useLocalStorage } from './useLocalStorage' ;
import { useAuth as _useAuth } from '../../features/authentication/AuthProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLocalStorage = _useLocalStorage;
export const useAuth = _useAuth