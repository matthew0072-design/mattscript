import React from "react";
import Link from 'next/link';


const Header = () => {
    
    return (
        <header className="w-full border h-12">
            <ul className="flex justify-center gap-8 items-center h-12">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/latest">Latest Posts</Link></li>
            <li><Link href="/"> About us</Link></li>
            <li><Link href="/">Register</Link></li>
            </ul>
        </header>
    )
}


export default Header;