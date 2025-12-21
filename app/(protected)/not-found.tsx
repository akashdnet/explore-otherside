import NotFoundAnimation from '@/components/AnimatedIcons/404'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
    return (
        <main className='flex flex-col items-center justify-center '>
            <NotFoundAnimation />
            <Button asChild className='bg-[#F2F2F2] w-fit text-black hover:bg-[#F2F2F2] hover:text-black'>
                <Link href="/" className='w-fit'>
                    Back to Home
                </Link>
            </Button>
        </main>
    )
}
