export interface Duck {
    name: string;
    numLegs: number;
    // putting '?' means it is optional, not mandatory
    // makeSound?: (sound: string) => void;

    makeSound: (sound: string) => void;
}

const duck1: Duck = {
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
    name: 'duey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

//adding '!' to override undefined objects. Avoid this method as much as you can
//duck1.makeSound!('quack');

duck1.makeSound('quack');

//export construct
export const ducks = [duck1, duck2]
