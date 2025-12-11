export interface Review {
    id: number;
    author: string;
    authorImage: string;
    location: string;
    date: string;
    rating: number;
    content: string;
}

export interface Destination {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
}

export interface TravelInterest {
    id: number;
    name: string;
}

export interface UserProfile {
    name: string;
    age: number;
    location: string;
    bio: string;
    profileImage: string;
    rating: number;
    reviewCount: number;
    availability: {
        start: string;
        end: string;
    };
}