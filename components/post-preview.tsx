import React from "react";
import Link from 'next/link'
import Thumbnail from "./thumbnail";



type Props = {
    title: string
    date: string
    description: string
    slug: string
    thumbnail: string
}


const PostPreview = ( { title, date, description, slug, thumbnail } : Props) => {

    return (
        <div>
        <div>
            { (<Thumbnail slug={slug} title={title} src={thumbnail} />)}
        </div>

        <h2>
                        <Link href={`/posts/${slug}`}>
                          {title}
                        </Link>
                      </h2>
                      <p>{description}</p>
        
        
        </div>
    )
}

export default PostPreview