'use client';


interface ProfileCoverProps {
    email: string;
}

export default function ProfileCover({ email }: ProfileCoverProps) {
    return (
        <div className="relative h-[250px] md:h-[350px] w-full">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')` }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />
            </div>


        </div>
    );
}
