
import Link from 'next/link';
import Image from 'next/image';


type Props = {
    
    title: string;
    src: string;
    slug?:string;
}

const Thumbnail = ({ title, src, slug}: Props) => {
  // Add the Thumbnail cover image
    const image = (
        <Image
    
        src={src}
        alt={`Thumbnail cover image ${title}`}
        width ={200}
        height ={200}
        />
    );

    

    // return the Thumbnail cover image slug
    return (
        <>
            {slug ? (
                <Link href={`/posts/${slug}`}>
                {image}
                </Link>
            ) : (
                image
            )}
        </>
    )
}


export default Thumbnail;