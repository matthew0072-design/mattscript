import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Thumbnail from '../../components/thumbnail'
import { IPOST } from '../../types/post'
import { getPost, getAllPosts } from '../../utils/mdxUtils';
import { ParsedUrlQuery } from 'querystring'

type Props = {

    source: MDXRemoteSerializeResult;
    frontMatter: Omit<IPOST, 'slug'>;

}



const PostPage = ({ source, frontMatter }: Props) => {

    return (
        <div>
            <article>
                <div>
                    <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
                </div>
                <h1> {frontMatter.title} </h1>
                <p> {frontMatter.description} </p>
                <MDXRemote {...source} />
            </article>
        </div>
    )
}

export default PostPage

interface IParams extends ParsedUrlQuery {
    
        slug: string
    

}

export const getStaticProps: GetStaticProps = async (context) => {

    const { slug } = context.params as IParams
    
    const { content, data } = getPost(slug);
    
    
    const mdxSource = await serialize( content, { scope: data })
    
    
    return {
        
        props: {
            source: mdxSource,
            frontMatter: data
        }
        
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts(['slug'])

    

    const paths = posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }))

    return {
        paths,
        fallback: false
    }
}