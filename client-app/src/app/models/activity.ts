export interface Activity {
    //use 'any' to get out of typescript restriction.
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
}