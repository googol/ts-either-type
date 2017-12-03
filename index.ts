export type Either<E, T> = Left<E> | Right<T>;

const Either = {
    toString<E, T>(this: Either<E, T>) {
        return `(${this.type} ${this.value})`;
    },
};

export interface Right<T> {
    readonly type: 'right';
    readonly value: T;
}

export interface Left<E> {
    readonly type: 'left';
    readonly value: E;
}

function getPropertyDescriptor<E, T>(type: 'right', value: T): PropertyDescriptorMap;
function getPropertyDescriptor<E, T>(type: 'left', value: E): PropertyDescriptorMap;
function getPropertyDescriptor<E, T>(type: 'right' | 'left', value: E | T): PropertyDescriptorMap {
    return {
        type: {
            value: type,
            enumerable: true,
        },
        value: {
            value,
            enumerable: true,
        },
    };
}

export const Right = <E, T>(value: T): Either<E, T> => Object.freeze(Object.create(Either, getPropertyDescriptor<E, T>('right', value)) as Either<E, T>);

export const Left = <E, T>(value: E): Either<E, T> => Object.freeze(Object.create(Either, getPropertyDescriptor<E, T>('left', value)) as Either<E, T>);

export const isRight = <E, T>(value: Either<E, T>): value is Right<T> => value.type === 'right';
export const isLeft = <E, T>(value: Either<E, T>): value is Left<E> => value.type === 'left';
