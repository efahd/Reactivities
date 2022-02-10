export interface Activity {
    //use 'any' to get out of typescript restriction.
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
}