export interface InputProps<T> {
    value: T;
    onChange: (value: T) => void;
    onEnter?: () => void;
}