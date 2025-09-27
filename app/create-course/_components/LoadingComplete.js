import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import Link from 'next/link'

const LoadingComplete = ({ loadingComplete, id }) => {
    return (
        <AlertDialog open={loadingComplete}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <div className='flex flex-col items-center py-10 gap-5'>
                            <Image src="/tick.gif" width={100} height={100} alt='Loader' />
                            <h2>Success! Your course layout is ready</h2>
                            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                <Link href={"/create-course/" + id} >Go to Course Layout</Link>
                            </button>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default LoadingComplete;