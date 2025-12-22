interface profile {
    name: string;
    email: string;
    photo: string;
    reviews: {
        tripId: string;
        participantId: string;
        rating: number;
        comment: string;
    }[];
}

export interface Trip {
    id?: string;
    name: string;
    description: string;
    price: number;
    days: number;
    image: string;
    location: string;
    startDate: Date;
    endDate: Date;
    guide: profile;
    participants: {
        pending: string[];
        approved: string[];
    };
    itinerary: string[];
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    difficulty: "Easy" | "Moderate" | "Challenging" | "Moderate to Challenging";
    groupSize: number;
    faq: {
        q: string;
        a: string;
    }[];
    status: "Open" | "Full" | "Completed";
    createdAt?: Date;
    updatedAt?: Date;
}




// review interface

export interface Review {
    id?: string;
    comment: string;
    rating: number;
    userId: profile;
    createdAt?: Date;
}

